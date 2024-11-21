document.addEventListener("DOMContentLoaded", async () => {
    const rsaFingerprint = await fetch("/.well-known/tor-relay/rsa-fingerprint.txt").then((response) => response.text());
    const relayIds = rsaFingerprint.split("\n").filter(line => line);
    const relayData = [];

    relayIds.forEach(async (relayId, index) => {
        const response = await fetch("https://onionoo.torproject.org/details?lookup=" + relayId);
        const data = await response.json();
        relayData.push(data);

        if (relayData.length === relayIds.length) {
            buildHtml()
        }
    });

    function buildHtml() {
        document.querySelector(".node-list").innerHTML = '';

        relayData
            .sort((a, b) => a.relays[0].nickname.localeCompare(b.relays[0].nickname))
            .forEach(data => {
                const bandwidthHtml = data.relays[0].running ? `
            <div class="ip">
                <span>contrib. ${Math.round(data.relays[0].advertised_bandwidth * 0.000001)} MiB/s</span>
            </div>` : `
            <div class="ip">
                <span class="offline">offline</span>
            </div>`.trim();

                document.querySelector(".node-list").innerHTML += `
            <li>
              <a href="https://metrics.torproject.org/rs.html#search/${data.relays[0].fingerprint}" target="_blank">${data.relays[0].nickname}.null-f.org</a>
              <div class="ips">
                <div class="ip">
                  <span>${data.relays[0].or_addresses[0]}</span>
                </div>
                <div class="ip">
                  <span>${data.relays[0].or_addresses[1] || "no IPv6 connectivity"}</span>
                </div>
                ${bandwidthHtml}
                <div class="ip">
                  <span>${data.relays[0].as_name}</span>
                  <img src="./assets/us-flag.svg" alt="USA Flag" draggable="false" />
                </div>
              </div>
          </li>
        `.trim();
            });
    }
})