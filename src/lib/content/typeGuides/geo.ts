import type { TypeGuide } from "../types";

export const guide: TypeGuide = {
  title: "Guide: Location QR codes",
  blocks: [
    { h3: "What the geo URI actually says" },
    { p: "`geo:37.5665,126.9780` follows the URI scheme defined in RFC 5870, and it describes a point on the WGS 84 datum, the same reference GPS receivers and every mainstream map app use. The first number is latitude, the second longitude, both in decimal degrees. The scheme allows an altitude and an uncertainty value, but phones ignore them, so a plain pair of numbers is all a code needs." },
    { p: "Coordinates copied from older sources sometimes arrive as degrees, minutes and seconds. Convert them before use: degrees plus minutes divided by 60 plus seconds divided by 3600, with a minus sign for south and west. Many map apps accept the DMS form in their search box and display the decimal equivalent, which saves reaching for a calculator." },
    { h3: "How much precision you need" },
    { p: "Each decimal place in latitude narrows the position roughly tenfold. Two decimals locate a town, three a street, four a building, and five put the pin within about a metre. Six or seven decimals are what GPS chips report, but they imply more accuracy than a phone can deliver between tall buildings or under tree cover, where the fix drifts by several metres." },
    { h3: "geo URI or a Maps share link" },
    { p: "The two approaches solve different problems. A geo URI is neutral: Android asks which installed map app should open it, and it works even when the person relies on an offline map or a niche hiking app. What it cannot carry is a name, an address, opening hours or reviews, so the destination appears as a bare pin. A Google Maps share link, placed in a [URL code](/url-qr-code), opens one specific app or its web page with the full place card, which is better for a shop or restaurant that wants to be found by name." },
    { p: "Coverage matters too. In South Korea, for instance, Google Maps offers limited routing and local apps such as Naver Map and Kakao Map dominate; a geo URI lets the phone hand the pin to whichever of those is installed, while a Google link would strand the visitor. The reverse applies in regions where only Google has detailed data." },
    { h3: "Where codes with coordinates earn their place" },
    { p: "Trail markers, mountain huts and dive sites rarely have postal addresses, and a code on a post or map board gives hikers a reliable return point. Delivery notes for farms, construction sites and campuses with several gates benefit the same way, as do parking-spot reminders and real-estate signs on undeveloped plots." },
    { p: "A few mistakes come up repeatedly. Swapping the two numbers sends people to the open ocean or the wrong hemisphere, and a single test scan will reveal it. Indoor readings taken by phone are often off by a building's width, so capture the position outside at the entrance. For a venue invitation you can pair this code with a [calendar event code](/calendar-event-qr-code) on the same card, and the [wedding QR page](/wedding-qr-code) shows how couples combine the two." },
  ],
};
