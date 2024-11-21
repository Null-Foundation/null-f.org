// oh hai there :3
// i wrote this in a rush
// don't judge me

document.addEventListener("DOMContentLoaded", async () => {
  const rsaFingerprint = await fetch("/.well-known/tor-relay/rsa-fingerprint.txt").then((response) => response.text());
  const relayIds = rsaFingerprint.split("\n").filter(line => line);
  const response = await fetch("https://onionoo.torproject.org/details?lookup=" + relayIds.join(","));
  const data = await response.json();

  document.querySelector(".node-list").innerHTML = '';

  data.relays
    .sort((a, b) => a.advertised_bandwidth > b.advertised_bandwidth ? -1 : 1)
    .forEach(relay => {
      const bandwidthHtml = relay.running ? `
            <div class="ip">
                <span>contrib. ${Math.round(relay.advertised_bandwidth * 0.000001)} MiB/s</span>
            </div>` : `
            <div class="ip">
                <span class="offline">offline</span>
            </div>`.trim();

      document.querySelector(".node-list").innerHTML += `
            <li>
              <a href="https://metrics.torproject.org/rs.html#search/${relay.fingerprint}" target="_blank">${relay.nickname}.null-f.org</a>
              <div class="ips">
                <div class="ip">
                  <span>${relay.or_addresses[0]}</span>
                </div>
                <div class="ip">
                  <span>${relay.or_addresses[1] || "no IPv6 connectivity"}</span>
                </div>
                ${bandwidthHtml}
                <div class="ip">
                  <span>${relay.as_name}</span>
                  <img src="./assets/us-flag.svg" alt="USA Flag" draggable="false" />
                </div>
              </div>
          </li>
        `.trim();
    });
});