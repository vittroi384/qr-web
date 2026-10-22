import type { TypeGuide } from "../types";

export const guide: TypeGuide = {
  title: "Guide: Wi-Fi QR codes",
  blocks: [
    { h3: "What the security type tells the phone" },
    { p: "The `T` field decides which kind of handshake the phone attempts. `WPA` covers almost every router sold today: the format has no separate token for WPA2 or WPA3, so the phone negotiates the strongest protocol the access point offers, and a router running WPA3 in transition mode accepts a `T:WPA` code as readily as a plain WPA2 one." },
    { p: "`WEP` remains for routers from the 2000s; newer Android versions have been dropping support for it and iPhones flag such networks as insecure, so a WEP code is only worth printing when the scanning devices are as old as the router. `nopass` means no password: the phone joins at once, which suits an open café network, but the code then carries nothing secret." },
    { h3: "Hidden networks and awkward passwords" },
    { p: "A hidden network does not broadcast its name, so `H:true;` tells the phone to probe for it directly. Recent iOS and Android handle that, but probing costs battery, announces the name to anyone listening, and some phones ignore the flag and report the network as out of range. Hiding the SSID adds no real security; for a guest network, stop hiding it." },
    { p: "Semicolons, colons, commas, backslashes and quotation marks in a password are escaped with a backslash in the string, and a space at the start or end of a password is a frequent cause of failed joins because the router keeps it while nobody notices. If you can choose the guest password, letters, digits and hyphens sidestep the issue." },
    { h3: "Printing for cafés, hotels and rentals" },
    { p: "Place the code where people are already sitting or standing still, at or below eye level, not behind a counter where a queue hides it. About 3 cm across is enough on a table card; a sign read across a room needs more, and the [print size guide](/guides/qr-code-size-for-printing) gives the distance rule. Laminate or frame table cards, since coffee rings and daily wiping wear down the dark squares, and print the network name and password in plain text beside the code for laptops and older phones that cannot scan it." },
    { h3: "When the code scans but nothing connects" },
    { p: "A code that shows the join prompt and then fails usually carries a typo in the SSID: names are matched exactly, so “CafeGuest” and “Cafe Guest” are different networks. A name ending in `_5G` may sit on a band a budget phone cannot see; prefer the 2.4 GHz or combined name. Captive portals accept the join and then demand a sign-in page that no code can complete, and enterprise networks using 802.1X with a username and certificate cannot be expressed in this format at all." },
    { p: "If the camera does not react to the code at all, the [troubleshooting guide](/guides/qr-code-wont-scan) covers contrast and lighting; the [café and hotel page](/wifi-qr-code-for-cafe) has table-tent and room-card ideas, and the [full Wi-Fi guide](/guides/wifi-qr-code-guide) walks through the format field by field." },
  ],
};
