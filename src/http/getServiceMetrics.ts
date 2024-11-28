import type { Service } from '@/types/Service';

const rsaFingerprintUrl = "/.well-known/tor-relay/rsa-fingerprint.txt";
const onionooLookupUrlPrefix = "https://onionoo.torproject.org/details?lookup=";

export const getServiceMetrics = async (): Promise<{ relays: Service[], lastUpdated: string }> => {
    async function fetchData() {
        const rsaFingerprint = await fetch(rsaFingerprintUrl).then((response) => response.text());
        const relayIds = rsaFingerprint.split("\n").filter(line => line);
        return await (await fetch(`${onionooLookupUrlPrefix}${relayIds.join(",")}`)).json();
    }

    function formatOrAddress(orAddress: string | undefined) {
        return orAddress;
    }

    const data = await fetchData();

    return {
        relays: data.relays
            .sort((a: any, b: any) => a.advertised_bandwidth > b.advertised_bandwidth ? -1 : 1)
            .map((relay: any) => ({
                metricsUrl: `https://metrics.torproject.org/rs.html#search/${relay.fingerprint}`,
                hostname: `${relay.nickname}.null-f.org`,
                ipv4: formatOrAddress(relay.or_addresses[0]),
                ipv6: formatOrAddress(relay.or_addresses[1]) || "no IPv6 connectivity",
                asName: relay.as_name,
                bandwidth: Math.round(relay.advertised_bandwidth * 0.000001),
                offline: !relay.running,
                isMultiInstance: data.relays.filter((r: any) => r.nickname === relay.nickname).length > 1,
                countryCode: relay.country.toUpperCase(),
            })),
        lastUpdated: data.relays_published,
    };
}