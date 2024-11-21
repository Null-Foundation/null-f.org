// oh hai there :3
// i wrote this in a rush
// don't judge me

const rsaFingerprintUrl = "/.well-known/tor-relay/rsa-fingerprint.txt";
const onionooLookupUrlPrefix = "https://onionoo.torproject.org/details?lookup=";

function formatOrAddress(orAddress) {
  if (!orAddress) {
    return null;
  }

  if (orAddress.includes("]:")) {
    return `${orAddress.split("]:")[0]}]`;
  }

  return orAddress.split(":")[0];
}

async function fetchData() {
  const rsaFingerprint = await fetch(rsaFingerprintUrl).then((response) => response.text());
  const relayIds = rsaFingerprint.split("\n").filter(line => line);
  return await (await fetch(`${onionooLookupUrlPrefix}${relayIds.join(",")}`)).json();
}

async function populateRelayListHtml() {
  const data = await fetchData();
  const relayListElement = document.querySelector(".node-list");
  relayListElement.innerHTML = '';

  data.relays
    .sort((a, b) => a.advertised_bandwidth > b.advertised_bandwidth ? -1 : 1)
    .forEach((relay, index) => {
      const bandwidthHtml = relay.running ? `
            <div class="ip">
                <span>traffic: ${Math.round(relay.advertised_bandwidth * 0.000001)} MiB/s</span>
            </div>` : `
            <div class="ip">
                <span class="offline">offline</span>
            </div>
      `.trim();

      const isMultiInstance = data.relays.filter(r => r.nickname === relay.nickname).length > 1;

      relayListElement.innerHTML += `
            <li>
              <div>
                <a href="https://metrics.torproject.org/rs.html#search/${relay.fingerprint}" target="_blank">${relay.nickname}.null-f.org</a>
                ${isMultiInstance ? "<cite>*</cite>" : ""}
              </div>
              <div class="ips">
                <div class="ip">
                  <span>${formatOrAddress(relay.or_addresses[0])}</span>
                </div>

                <div class="ip">
                  <span>${formatOrAddress(relay.or_addresses[1]) || "no IPv6 connectivity"}</span>
                </div>

                ${bandwidthHtml}

                <div class="ip">
                  <span>${relay.as_name}</span>
                  <img src="./assets/us-flag.svg" alt="USA Flag" draggable="false" />
                </div>
              </div>
          </li>
        `.trim();

      if (index === data.relays.length - 1 && isMultiInstance) {
        relayListElement.innerHTML += `<p class="multi-instance-message">* This server is running multiple relay instances.</p>`;
      }
    });
}

document.addEventListener("DOMContentLoaded", async () => {
  setTimeout(populateRelayListHtml, 500);
});
