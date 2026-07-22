/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
    app(input) {
        if (!['dev', 'prod'].includes(input.stage)) {
            throw new Error(
                "You are trying to deploy to an invalid stage. Make sure you pass in 'dev' or 'prod' when making deployments.",
            );
        }

        return {
            name: 'todo',
            home: 'aws',
            providers: {
                aws: { region: 'us-west-2', version: '7.7.0' },
            },
        };
    },
    async run() {
        const { devAccountId, prodAccountId, primaryApexDomain, hostedZoneId } =
            await import('./packages/infrastructure/config');

        const current = await aws.getCallerIdentity({});
        const accountId = current.accountId;

        if (accountId !== devAccountId && accountId !== prodAccountId) {
            throw new Error(
                `You're deploying to an unknown AWS account (${accountId}). Make sure your AWS credentials are set up correctly.`,
            );
        }

        if (!['dev', 'prod'].includes($app.stage)) {
            throw new Error(
                "You're trying to deploy to an invalid stage. Make sure you pass in 'dev', or 'prod' when making deployments.",
            );
        }

        const { createApi } = await import(
            './packages/infrastructure/components/api'
        );
        const { createStorage } = await import(
            './packages/infrastructure/components/storage'
        );
        const { createWebApp } = await import(
            './packages/infrastructure/components/webApp'
        );

        const stage = $app.stage;
        const stageIsProd = stage === 'prod';
        const primaryDomain = stageIsProd
            ? primaryApexDomain
            : `${stage}.${primaryApexDomain}`;

        const { todosTable } = createStorage();

        createApi({
            domain: primaryDomain,
            hostedZoneId,
            todosTable,
        });

        createWebApp({
            domain: primaryDomain,
            hostedZoneId,
        });
    },
});
