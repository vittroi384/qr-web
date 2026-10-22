import type { GuidePost } from "../types";

export const post: GuidePost = {
  slug: "wifi-qr-code-guide",
  title: "QR codes for Wi-Fi: a complete guide for cafés, hotels and rentals",
  description:
    "What a Wi-Fi QR code encodes, which phones read it, how to set up a guest network, where to place it in a café, hotel or rental, and how to fix scan problems.",
  published: "2026-10-22",
  intro:
    "A Wi-Fi QR code moves the password question off your staff and onto a card. This guide covers the format, the phones, the network behind it and the printing habits that keep it working.",
  blocks: [
    { h2: "What the code actually contains" },
    {
      p: "The payload is one line of text: `WIFI:T:WPA;S:Cafe-Guest;P:espresso-2026;;`. `T` carries the security type, `S` the network name and `P` the password, and a final semicolon ends the record. `H:true;` marks a network that does not broadcast its name, and `T:nopass;` with no `P` field describes an open one. Nothing is looked up online; the phone parses the line itself.",
    },
    {
      p: "`T:WPA` covers WPA2-Personal and WPA3-Personal, which is nearly every current router; `T:WEP` exists for legacy hardware and is better treated as a reason to replace the router. The format cannot express an enterprise network: WPA2-Enterprise and 802.1X identify each user with a username, a password and often a certificate, and there is no field for those. Captive portals are a related limit: the code joins the phone to the network, and any sign-in page that appears afterwards is still completed by the guest.",
    },
    { h3: "Which phones read it" },
    {
      p: "The iPhone Camera app has recognised Wi-Fi codes since iOS 11. On Android the path depends on the maker: from Android 10 the camera app or Google Lens usually offers to connect, and the Wi-Fi settings screen has its own scan icon. Phones on Android 9 and earlier need a third-party scanner that understands the `WIFI:` prefix.",
    },
    { h2: "The network behind the code" },
    {
      p: "First decide which network the code will open. Anyone who scans or photographs the code can read the password, so it must never be the network your card terminal, office PC or camera system sits on. Nearly every router offers a guest network: a separate name with its own password, isolated from the main LAN. Many routers also let you cap guest bandwidth, and changing the guest password never disturbs the devices that matter.",
    },
    { h3: "Rotating the password" },
    {
      p: "Tie reprints to a schedule: monthly suits a café, while a rental might change the password between stays. Make the new code before touching the router and swap the cards within the hour the new password goes live. Because the code is static, made in the browser and never expiring, there is nothing on this site to update; a replacement means making a new one on [the Wi-Fi generator](/wifi-qr-code) and printing it. [Static vs dynamic QR codes](/guides/static-vs-dynamic-qr-codes) explains why a dynamic code would not help here.",
    },
    { h2: "Where to put it, by venue" },
    { h3: "Café or restaurant" },
    {
      ul: [
        "Table tents with a code about 3 cm wide, scannable from a seat.",
        "A 6 to 8 cm print at the counter or where people queue, since they stand further away.",
        "A small card beside the power sockets, where laptop users end up.",
      ],
    },
    { h3: "Hotel" },
    {
      ul: [
        "An in-room card on the desk or bedside table, 2.5 to 3 cm, naming the floor’s network if they differ.",
        "A framed lobby sign, 5 cm or more, at eye level rather than on the reception desk.",
        "A sticker on the TV stand, because guests look for the network name on the TV menu.",
      ],
    },
    { h3: "Vacation rental" },
    {
      ul: [
        "A framed card in the entry hall at the height people hold a phone.",
        "A magnet on the fridge, the most-passed spot in any kitchen.",
        "A page in the welcome binder.",
      ],
    },
    {
      p: "Whatever the size, set the network name and password in plain text under the code with a caption such as “Scan to join Wi-Fi”. The A4 print sheet on this site already places a “Connect to Wi-Fi” headline and the network name above the code. Laminate anything on a table, but choose matte pouches: gloss film throws overhead lights back at the camera, and a highlight across the code is a common reason scans fail. [The sizing guide](/guides/qr-code-size-for-printing) has the distance-to-size rule.",
    },
    { h2: "When a guest says it does not work" },
    {
      ul: [
        "Wrong band name: if `Cafe-Guest` and `Cafe-Guest-5G` are separate networks, the code must name the one the phone can see, typed exactly, including case.",
        "5 GHz only: cheap tablets and older phones may have a 2.4 GHz radio only. Enable both bands or merge them under one name.",
        "MAC filtering or a device limit: the phone joins and then gets no address. Raise the limit for the guest network.",
        "Hidden SSID: hidden networks join unreliably on some Android builds even with `H:true`. A guest network has no reason to hide its name.",
        "A stale print: one card was missed at the last rotation. Keep a list of where every copy hangs.",
        "A web page opened after connecting: that is the captive portal, not a fault.",
      ],
    },
    {
      p: "If the camera will not read the code at all, the problem is the print: too small, too glossy or too low in contrast. [QR code won’t scan](/guides/qr-code-wont-scan) covers the rest.",
    },
    { h2: "Etiquette, terms and printing many cards" },
    {
      p: "Share only the guest network, and check your internet contract: some residential plans restrict offering access to the public, and a café may belong on a business plan anyway.",
    },
    {
      p: "For a stack of identical cards you need one code, not many: download the SVG once, place it in your card layout, and print as many copies as the venue needs. The [café and rental page](/wifi-qr-code-for-cafe) has the Wi-Fi fields and print sheet ready. If each hotel room has its own password, name each file after the room before it goes to the printer.",
    },
  ],
};
