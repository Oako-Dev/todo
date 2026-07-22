export function createWebApp({
    domain,
    hostedZoneId,
}: {
    domain: string;
    hostedZoneId: string;
}) {
    return new sst.aws.StaticSite('WebApp', {
        path: 'packages/web-app',
        build: {
            command: 'bun run build',
            output: 'dist',
        },
        domain: {
            name: domain,
            dns: sst.aws.dns({ zone: hostedZoneId }),
        },
    });
}
