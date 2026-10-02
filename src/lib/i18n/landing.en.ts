import type { QrType } from "@/lib/qr/types";
import type { LandingCopy, UseCaseId } from "./index";

/** English long-form copy for the per-type landing pages (/wifi-qr-code, …). */
export const landingEn: Record<QrType, LandingCopy> = {
  url: {
    title: "URL QR Code Generator",
    subtitle: "Turn any web address into a QR code that opens the page in one scan.",
    metaTitle: "URL QR Code Generator — Free, No Sign-up",
    metaDescription:
      "Make a QR code that opens any web page. Static codes that never expire, made in your browser. Save as PNG or SVG, or print an A4 sheet. Free, no sign-up.",
    sections: {
      howTitle: "How a URL QR code works",
      how: [
        "The code holds the web address itself, character for character. If you type example.com/menu, the generator adds https:// for you, so the code contains https://example.com/menu. When someone points a phone camera at it, the phone recognizes the link and offers to open it in the browser. Nothing sits in between: there is no redirect service and no account that has to stay active.",
        "On iPhone, the built-in Camera app shows a banner with the address; tapping it opens Safari. Most Android phones do the same through the camera app or Google Lens. Because the person sees the address before opening it, a short, recognizable domain builds more trust than a long string of tracking parameters.",
        "The longer the address, the more squares the code needs. A 30-character link gives a coarse, easy-to-scan pattern; a 300-character link with many parameters produces a dense one that needs a bigger print. Links that start with javascript: or data: are refused, since a scanner should never run code.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "A restaurant prints the code on table cards so guests can open the menu page instead of waiting for a paper copy.",
        "A shop window shows a code that leads to opening hours and online ordering, useful for people passing by after closing time.",
        "A product label links to the setup guide or warranty page, so the printed manual can stay short.",
        "A speaker puts a code on the last slide that opens the talk's notes, so nobody has to copy a URL from the screen.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "The code is static: if the address changes, you need a new code. Point it at a page you control, such as yourdomain.com/menu, so you can change what that page shows without reprinting.",
        "Trim tracking parameters you don't need. A shorter link gives a cleaner pattern that scans faster from a distance.",
        "As a rule of thumb, make the code at least one tenth of the scanning distance wide: about 2 cm (0.8 in) for something held in the hand, 30 cm (12 in) for a poster read from 3 m away.",
        "Open the link on your own phone after saving. A typo in the address is the most common reason a printed code fails.",
      ],
    },
    faq: [
      {
        q: "Does a URL QR code expire?",
        a: "No. The address is stored in the image, so the code works as long as the web page itself is online. This site does not need to exist for it to keep working.",
      },
      {
        q: "Can I change the link after printing?",
        a: "Not in the code itself, because it is static. You can, however, change what the linked page shows or set up a redirect on your own website.",
      },
      {
        q: "Do I need to type https://?",
        a: "No. If you leave it out, https:// is added automatically. Type http:// explicitly only if your site really does not support HTTPS.",
      },
      {
        q: "Can I see how many people scanned it?",
        a: "Not here. The code opens your page directly, so scans are counted only if your own website analytics record the visit. Adding a campaign parameter such as ?utm_source=poster to the link helps you tell those visits apart.",
      },
    ],
  },

  social: {
    title: "Social Media QR Code Generator",
    subtitle: "Type a username and get a code that opens your profile on Instagram, TikTok, YouTube and more.",
    metaTitle: "Social Media QR Code Generator — Free, No Sign-up",
    metaDescription:
      "Create a QR code for your Instagram, TikTok, YouTube, LinkedIn or Linktree profile from just a username. Static, never expires, free and with no sign-up.",
    sections: {
      howTitle: "How a social media QR code works",
      how: [
        "You pick a platform and type your username; the generator builds the standard profile address for you. An Instagram handle @harborbakery becomes https://www.instagram.com/harborbakery/, a YouTube handle becomes https://www.youtube.com/@channel, and a LinkedIn profile ID becomes https://www.linkedin.com/in/profile-id/. A leading @ is removed where the platform does not use it in the address, and spaces or slashes are dropped.",
        "If you already have the profile link, paste it instead and the platform is recognized automatically. On scan, the phone sees an ordinary https link. If the app is installed, iOS and Android usually hand the link to it and the profile opens there; otherwise it opens in the browser.",
        "Some platforms use codes rather than names: Discord needs an invite code, Google Review needs a Place ID, and Spotify uses an artist ID. The placeholder text in each field shows what to enter.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "A café adds an Instagram code to the receipt so customers can follow without searching for a name that has three lookalikes.",
        "A musician puts a Spotify artist code on the merch table and a Linktree code on the flyer for everything else.",
        "A local business asks for reviews with a Google Review code on the counter, which opens the review form directly.",
        "A job seeker prints a LinkedIn code on a resume or name badge for career fairs.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "Check the handle by opening the link in the result line before saving. A single missing letter can lead to someone else's account.",
        "For Discord, create an invite that never expires; the default invite stops working after seven days, and the printed code would stop with it.",
        "If you might rename your account, a code to a Linktree page or your own website survives the change better than a direct profile link.",
        "Put the platform name or logo next to the code so people know what will open before they scan.",
      ],
    },
    faq: [
      {
        q: "Does the code open the app or the website?",
        a: "It contains a normal profile link. On most phones the link opens in the app when it is installed and in the browser when it is not.",
      },
      {
        q: "What happens if I change my username?",
        a: "The code keeps pointing at the old address, which may stop working or later belong to someone else. Make a new code after renaming.",
      },
      {
        q: "Can I put several profiles in one code?",
        a: "No, one code opens one address. Use a link-in-bio page such as Linktree and make a code for that page.",
      },
      {
        q: "Where do I find a Google Place ID?",
        a: "Google provides a Place ID Finder in its Maps documentation. Search for your business there and copy the ID that starts with ChIJ.",
      },
      {
        q: "Is my profile private if I make a code?",
        a: "The code only contains the public profile address. What people see after scanning depends on your account's privacy settings.",
      },
    ],
  },

  whatsapp: {
    title: "WhatsApp QR Code Generator",
    subtitle: "Let customers start a WhatsApp chat with you by scanning, with an optional message already typed.",
    metaTitle: "WhatsApp QR Code Generator — Free, No Sign-up",
    metaDescription:
      "Make a QR code that opens a WhatsApp chat with your number and a pre-filled message. Works on iPhone and Android, never expires, free and no sign-up needed.",
    sections: {
      howTitle: "How a WhatsApp QR code works",
      how: [
        "The code uses WhatsApp's official click-to-chat link. Your number is reduced to digits only, without the plus sign, spaces or leading zeros, and any message is added as URL-encoded text: https://wa.me/14155552671?text=Hi%2C%20I%27d%20like%20to%20book%20a%20table.",
        "When someone scans it, the phone opens the link, WhatsApp starts, and a chat with your number appears with the message waiting in the input box. Nothing is sent until they tap send, so they can edit it first. If WhatsApp is not installed, the link opens a web page that offers to download it or use WhatsApp Web.",
        "The number must include the country code, because wa.me has no way to guess the country. The generator accepts 7 to 15 digits, which covers international numbers. A WhatsApp Business account works the same way as a personal one.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "A hair salon prints a code on its business card with the message “I'd like to book an appointment”, so bookings arrive in one predictable format.",
        "An online seller adds a code to the packing slip for questions about the order, which is easier than looking up a support address.",
        "A tour guide shows a code at the meeting point so the group can reach them on the day.",
        "A landlord puts a code in the apartment welcome folder for maintenance requests.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "Write the number in international form, for example +44 7700 900123, not 07700 900123. A local leading zero is removed, but the country code cannot be added for you.",
        "Keep the pre-filled message short and specific, such as a booking request or an order number prompt. Long messages make the code denser.",
        "Scan the finished code yourself and check that the chat opens with the right name. A wrong digit sends people to a stranger.",
        "If you change your number, the printed code will keep opening the old one, so plan to reprint.",
      ],
    },
    faq: [
      {
        q: "Does it work if the person has not saved my number?",
        a: "Yes. That is the point of the wa.me link: the chat opens without adding you as a contact first.",
      },
      {
        q: "Is the message sent automatically?",
        a: "No. It appears in the text box, and the person decides whether to send it as is, edit it, or delete it.",
      },
      {
        q: "Does it work with WhatsApp Business?",
        a: "Yes. Use the number registered with your WhatsApp Business account.",
      },
      {
        q: "Why doesn't my code open a chat?",
        a: "The most common cause is a missing or wrong country code. Check that the number in the result line starts with your country code and has no extra zero after it.",
      },
    ],
  },

  text: {
    title: "Text QR Code Generator",
    subtitle: "Put a note, code or short message into a QR code that shows the text when scanned.",
    metaTitle: "Text QR Code Generator — Free, No Sign-up",
    metaDescription:
      "Encode plain text in a QR code: notes, serial numbers, instructions or short messages. No link or internet needed to read it. Free, static and no sign-up.",
    sections: {
      howTitle: "How a text QR code works",
      how: [
        "A text code holds exactly the characters you type, with no prefix and no link. Scanning it does not need the internet: the text is read straight out of the pattern. That makes it suitable for places without a signal, or for information that should not depend on a website staying online.",
        "What the phone does with plain text varies. Many Android scanners and Google Lens show the text with a copy button. The iPhone Camera app may show it in a banner or offer a search, depending on the iOS version. If what you need is for people to open a page, use a URL code instead; if they should read a sentence, text is the right choice.",
        "Capacity is the main limit. Accented letters, Asian scripts and emoji take two to four bytes each, so they fill the code faster than plain English letters. In practice, a few hundred characters still scan comfortably; when content gets too long, the preview tells you.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "A workshop labels equipment with codes that contain the serial number and last service date, readable even in a basement with no reception.",
        "A teacher hides the answer to a puzzle in a code on the worksheet, so students check their work only when they are ready.",
        "A warehouse prints bin locations or part numbers as text codes that any phone can read without special software.",
        "A gift tag carries a short personal message that appears when the recipient scans it.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "Keep it short. Every extra sentence makes the squares smaller, and small squares need a larger print and better light.",
        "If the preview says the content is too long, set Error correction to Standard under Style, or move the text to a web page and use a URL code.",
        "Do not use a text code for secrets. Anyone who scans it can read every character.",
        "Test with both an iPhone and an Android phone, since plain text is displayed differently on each.",
      ],
    },
    faq: [
      {
        q: "How much text fits in a QR code?",
        a: "The format allows roughly 2,300 characters of plain English text at the default error correction, but anything over a few hundred characters becomes hard to scan from a phone. Non-Latin characters take more space.",
      },
      {
        q: "Does reading the text require the internet?",
        a: "No. The text is stored in the image itself, so any scanner can read it offline.",
      },
      {
        q: "Can I use line breaks?",
        a: "Yes. Line breaks are kept as part of the text, though some scanner apps display them as spaces.",
      },
      {
        q: "Why does my iPhone not show the text clearly?",
        a: "The iPhone Camera app is designed mainly for links and actions. For plain text, try the Code Scanner in Control Center or a scanner app, which shows the full text.",
      },
    ],
  },

  wifi: {
    title: "Wi-Fi QR Code Generator",
    subtitle: "Let guests join your Wi-Fi by scanning, without reading out or typing the password.",
    metaTitle: "Wi-Fi QR Code Generator — Free, No Sign-up",
    metaDescription:
      "Make a Wi-Fi QR code that connects iPhone and Android phones to your network in one scan. Supports WPA/WPA2/WPA3, WEP and hidden networks. Free, no sign-up.",
    sections: {
      howTitle: "How a Wi-Fi QR code works",
      how: [
        "The code stores your network details in a short, widely supported format: WIFI:T:WPA;S:CafeGuest;P:sunny-day-42;;. T is the security type (WPA, WEP or nopass for an open network), S is the network name and P the password. For a hidden network, H:true; is added. Characters that have a special meaning in this format, such as a semicolon, colon, comma, quote or backslash, are escaped with a backslash, so passwords containing them still work.",
        "On iPhone (iOS 11 and later), pointing the Camera app at the code shows a “Join network” prompt. Most Android phones from Android 10 onward offer the same through the camera, Google Lens or the Wi-Fi settings screen, which has its own QR scan button. The phone connects directly; no app or internet access is needed to read the code.",
        "The WPA option covers WPA, WPA2 and WPA3 networks. Choose WEP only for very old routers.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "A table tent at a café lets guests connect while they wait for their order, and staff no longer spell out the password at the counter.",
        "A vacation rental frames the code next to the front door, so new guests get online even when the host is not reachable.",
        "A meeting room shows the guest network code on the wall for visitors who bring their own laptop and phone.",
        "At home, a code on the fridge saves you from looking up the router sticker every time friends visit.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "When you change the Wi-Fi password, the printed code stops working. Make a new code and replace the old prints at the same time.",
        "Use a separate guest network if your router has one. Anyone who photographs the code can read the password from it.",
        "Type the network name exactly as it appears, including capital letters and any _5G suffix. Names are case-sensitive.",
        "The Print sheet adds a “Connect to Wi-Fi” headline and the network name, so people who cannot scan can still type it in.",
      ],
    },
    faq: [
      {
        q: "Does a Wi-Fi QR code work on iPhone?",
        a: "Yes. Since iOS 11, the built-in Camera app recognizes Wi-Fi codes and shows a prompt to join the network.",
      },
      {
        q: "Can I change the password later without reprinting?",
        a: "No. The password is stored inside the code, which is static. After a password change you need to generate and print a new code.",
      },
      {
        q: "Is my Wi-Fi password stored on your server?",
        a: "The code is generated in your browser. When you save, copy or print, what you entered may be logged as described in the Privacy Policy, but Wi-Fi passwords are always masked before storage.",
      },
      {
        q: "Does it work for hidden networks?",
        a: "Yes. Tick Hidden network and the code tells the phone to look for a network that does not broadcast its name. Support for hidden networks is less consistent on older phones, so test it.",
      },
      {
        q: "Will it work for a hotel network with a login page?",
        a: "It connects the phone to the network, but any sign-in page that appears afterward still has to be completed by hand.",
      },
    ],
  },

  vcard: {
    title: "vCard QR Code Generator",
    subtitle: "Put your contact details in a QR code that saves straight to the phone's address book.",
    metaTitle: "vCard QR Code Generator — Free, No Sign-up",
    metaDescription:
      "Create a vCard QR code with your name, phone, email, company and website. One scan saves the contact on iPhone or Android. Free, never expires, no sign-up.",
    sections: {
      howTitle: "How a vCard QR code works",
      how: [
        "The code contains a contact card in vCard 3.0, the format address books have shared for decades. A short example looks like this: BEGIN:VCARD, VERSION:3.0, N:Smith;Jane;;;, ORG:Acme Inc., TITLE:Manager, TEL;TYPE=CELL:+14155552671, EMAIL:jane@example.com, END:VCARD, each on its own line. Work phone, website, address and a note are added only if you fill them in.",
        "Scanning it with the iPhone Camera app or most Android cameras shows a contact preview with a button to add it. The person can review and edit the details before saving. No internet connection is needed, because the whole card is inside the code.",
        "Every field adds characters, and characters add squares. A card with name, mobile and email is compact; adding a long address and note can double the density.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "A business card carries a code on the back, so a new contact lands in the phone with the name spelled correctly and the number already formatted.",
        "A conference badge includes a vCard code, which is quicker than exchanging cards and typing details after the event.",
        "A real estate agent adds a code to yard signs and flyers so buyers can save the agent's number while standing outside the house.",
        "A front desk keeps a code for the after-hours support line, so visitors save it before they leave.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "Fewer fields mean a less dense code. On a small business card, name, mobile, email and website are usually enough.",
        "Write phone numbers with the country code, such as +1 415 555 2671, so they dial correctly for contacts abroad.",
        "Leave the note short or empty. It is the field most likely to push the code into a size that is hard to scan on a card.",
        "Save the contact from your own code on both an iPhone and an Android phone, and check that names and numbers land in the right fields.",
      ],
    },
    faq: [
      {
        q: "Will the contact save automatically?",
        a: "No. The phone shows a preview and the person taps to add it. Nothing is saved without their confirmation.",
      },
      {
        q: "What if my phone number or job changes?",
        a: "The details are fixed inside the code. Make a new code and update your printed cards.",
      },
      {
        q: "Can I add a photo to the vCard?",
        a: "Not here. A photo would be far too large for a QR code. Keep to text fields.",
      },
      {
        q: "Does it work on iPhone and Android?",
        a: "Yes. vCard 3.0 is supported by the iPhone Camera app and by most Android camera and scanner apps, including Google Lens.",
      },
    ],
  },

  email: {
    title: "Email QR Code Generator",
    subtitle: "Open a new email with the address, subject and message already filled in.",
    metaTitle: "Email QR Code Generator — Free, No Sign-up",
    metaDescription:
      "Create an email QR code that opens a new message with the recipient, subject and body filled in. Good for feedback, support and sign-ups. Free, no sign-up.",
    sections: {
      howTitle: "How an email QR code works",
      how: [
        "The code holds a standard mailto: link. The recipient comes first, then the subject and message as encoded text: mailto:support@example.com?subject=Order%20question&body=Hello%2C%20my%20order%20number%20is. Spaces become %20 so every mail app reads them the same way.",
        "When scanned, the phone opens its default mail app, such as Mail on iPhone or Gmail on Android, with a new draft ready. The person can edit any part and decides when to send. If no mail app is set up on the phone, the system may ask which app to use or show nothing useful, which is worth keeping in mind for audiences who mostly use web mail.",
        "Only the To field is required. Subject and message are optional but save the sender time and make incoming mail easier to sort.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "A hotel room card opens an email to the front desk with the subject “Room request”, so staff can route it quickly.",
        "A product manual includes a support code that pre-fills the model name in the subject line.",
        "An event table asks visitors to scan and send a one-line email to join a mailing list, giving them a copy of their own request.",
        "A school uses a code on a printed notice for parents to reply about attendance, with the class name in the subject.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "Use a subject people can recognize later in their sent folder, such as the event name or a product model.",
        "Write the body as a prompt the sender completes, for example “My order number is”, instead of a long finished message.",
        "Use an address you will keep. A personal address that may change is a poor fit for printed material.",
        "Scan the code on a phone that uses a different mail app than yours to confirm the subject and body arrive intact.",
      ],
    },
    faq: [
      {
        q: "Does scanning send the email?",
        a: "No. It only opens a draft. The person reviews it and taps send themselves.",
      },
      {
        q: "Can I add attachments?",
        a: "No. The mailto: format does not support attachments. You can include a link to a file in the message text.",
      },
      {
        q: "Which mail app opens?",
        a: "Whichever app the phone uses for email by default, typically Mail on iPhone and Gmail on most Android phones.",
      },
      {
        q: "Can I use special characters in the subject?",
        a: "Yes. Accented letters, punctuation and other scripts are encoded so the mail app shows them correctly.",
      },
    ],
  },

  sms: {
    title: "SMS QR Code Generator",
    subtitle: "Open a text message to your number with the words already typed in.",
    metaTitle: "SMS QR Code Generator — Free, No Sign-up",
    metaDescription:
      "Make an SMS QR code that opens a new text message with your number and message pre-filled. Useful for opt-ins, bookings and keyword replies. Free, no sign-up.",
    sections: {
      howTitle: "How an SMS QR code works",
      how: [
        "The code uses the SMSTO format that phone scanners widely recognize: SMSTO:+14155552671:JOIN. The number is cleaned to digits and a leading plus sign, and the message follows the second colon exactly as you typed it.",
        "On scan, the iPhone Camera app and most Android cameras open the Messages app with the number in the recipient field and the text in the message box. Sending is always the person's choice. Standard messaging rates from their carrier apply, which matters if your audience is traveling.",
        "Because the message travels as a regular text, this works on any phone with a mobile plan, without an app or data connection. It is a good fit for short keyword replies, such as JOIN, STOP or a booking code, that an automated system can read.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "A shop's counter sign invites customers to text a keyword to join a promotions list, which is faster than filling in a form.",
        "A parking lot posts a code that texts the space number to the operator, so drivers do not have to remember it.",
        "A charity event displays a code that starts a text pledge with the campaign keyword already written.",
        "A repair service puts a code on its van so people can text for a callback with the word “Quote”.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "Include the country code in the number if anyone abroad might scan the code.",
        "Keep the message to a keyword or one short sentence. Long messages make the code denser and are more likely to be edited by mistake.",
        "If you run an opt-in list, make sure your messaging provider handles the keyword you print before the materials go out.",
        "Test on both iPhone and Android. A few older scanner apps open Messages with the number but leave the body empty.",
      ],
    },
    faq: [
      {
        q: "Is the text sent automatically when someone scans?",
        a: "No. The phone only prepares the message. The person has to tap send.",
      },
      {
        q: "Does it work on iPhone?",
        a: "Yes. The iPhone Camera app recognizes SMSTO codes and opens Messages with the number and text filled in.",
      },
      {
        q: "Can I send to more than one number?",
        a: "No. An SMS code addresses a single number. For group messages, consider a WhatsApp or email code.",
      },
      {
        q: "Will it work without mobile data?",
        a: "Reading the code needs no connection, and SMS goes over the regular mobile network, so data is not required.",
      },
    ],
  },

  phone: {
    title: "Phone Number QR Code Generator",
    subtitle: "Let people call you by scanning, without typing your number.",
    metaTitle: "Phone Number QR Code Generator — Free, No Sign-up",
    metaDescription:
      "Create a phone number QR code that opens the dialer with your number ready to call. Ideal for signs, vehicles and flyers. Static, free and no sign-up needed.",
    sections: {
      howTitle: "How a phone number QR code works",
      how: [
        "The code contains a tel: link, the same kind a “Call us” button uses on a website: tel:+14155552671. Spaces, dashes and brackets are removed, and only digits and a leading plus sign are kept.",
        "When scanned, the phone shows the number and offers to call it. On iPhone the Camera app displays a banner; on Android the camera or Google Lens shows a call button. The phone never dials by itself; the person always confirms. The code is among the smallest you can make, so it scans easily even when printed small.",
        "Because only digits and the plus sign are kept, extensions and pauses written as commas or “ext.” are dropped. If callers need an extension, print it next to the code.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "A plumber's van carries a large code on the side, so someone stuck in traffic behind it can save the call for later without writing anything down.",
        "A “For sale” sign in a car window opens a call to the seller, which is safer than squinting at a number while walking past.",
        "A clinic's appointment card links to the booking line, reducing misdialed calls.",
        "An apartment building posts the property manager's emergency number as a code in the lobby.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "Write the number in international form, starting with + and the country code, so it works for visitors and roaming phones.",
        "Print the number as text beside the code as well. Some people prefer to dial, and it helps anyone without a camera.",
        "For vehicles and outdoor signs, size the code for the real viewing distance: roughly one tenth of the distance, so 30 cm (12 in) for someone 3 m away.",
        "Use the SVG file for vinyl lettering and large signs so the edges stay sharp.",
      ],
    },
    faq: [
      {
        q: "Does the phone call automatically when scanned?",
        a: "No. It shows the number and the person taps to call.",
      },
      {
        q: "Can I include an extension?",
        a: "Not in the code. Extensions are removed when the number is cleaned up, so print the extension as text next to it.",
      },
      {
        q: "Does it work for landlines and toll-free numbers?",
        a: "Yes. Any number a phone can dial works, including toll-free numbers, as long as the caller's carrier allows the call.",
      },
      {
        q: "What if my number changes?",
        a: "The number is stored in the code, so you will need a new code and new prints.",
      },
    ],
  },

  geo: {
    title: "Location QR Code Generator",
    subtitle: "Point people to an exact spot on the map with a code that holds the coordinates.",
    metaTitle: "Location QR Code Generator — Free, No Sign-up",
    metaDescription:
      "Make a location QR code from latitude and longitude that opens a maps app at the exact spot. Good for entrances, trailheads and venues. Free, no sign-up.",
    sections: {
      howTitle: "How a location QR code works",
      how: [
        "The code holds a geo: link with two numbers, latitude and longitude, separated by a comma: geo:40.748817,-73.985428. Latitude must be between -90 and 90 and longitude between -180 and 180. You can type them in or use the Use my location button while standing at the spot.",
        "On Android, scanning usually opens Google Maps or another maps app with a pin on the coordinates, ready for directions. iPhone support for geo: links is less consistent; depending on the iOS version and the scanner app, it may open Apple Maps or only show the coordinates. If most of your visitors use iPhones, a URL code with a Google Maps or Apple Maps share link can be the more reliable choice.",
        "Coordinates point to a position, not a business listing. That is the advantage: they work for places without an address, like a side gate, a parking area or a meeting point in a park.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "A wedding invitation includes a code for the exact entrance of a venue that maps place on the wrong side of a large estate.",
        "A trailhead sign links to the coordinates of the parking area, useful when there is no street address.",
        "A delivery note for a warehouse points drivers to the correct loading dock rather than the main entrance.",
        "A festival map marks the first-aid tent or lost-and-found with codes for people who get turned around.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "To get coordinates, long-press or right-click the spot in Google Maps and copy the two numbers shown.",
        "Five decimal places are precise to about one meter, which is plenty. Extra digits only add density.",
        "Check the sign of the numbers. Locations west of Greenwich have a negative longitude, and locations south of the equator have a negative latitude.",
        "Scan the code on an iPhone and an Android phone before printing, since map apps handle it differently.",
      ],
    },
    faq: [
      {
        q: "Does a location QR code work on iPhone?",
        a: "Sometimes. Android handles geo: links well, while iPhone behavior depends on the iOS version and scanner. Test it, and consider a maps share link in a URL code if iPhone users are your main audience.",
      },
      {
        q: "Can I use an address instead of coordinates?",
        a: "This type uses coordinates only. For an address, open it in a maps app, copy the share link and use the URL type.",
      },
      {
        q: "Does scanning need an internet connection?",
        a: "Reading the coordinates does not. Showing the map and directions does, unless the maps app has offline maps downloaded.",
      },
      {
        q: "Does it share my location with anyone?",
        a: "No. The code contains only the coordinates you entered. Use my location reads your position in the browser to fill the fields.",
      },
    ],
  },

  event: {
    title: "Calendar Event QR Code Generator",
    subtitle: "Add your event to people's calendars with one scan, including time, place and details.",
    metaTitle: "Calendar Event QR Code Generator — Free, No Sign-up",
    metaDescription:
      "Make a calendar event QR code with title, date, time, location and notes. One scan adds it to the phone's calendar, with time zones handled. Free, no sign-up.",
    sections: {
      howTitle: "How a calendar event QR code works",
      how: [
        "The code contains an iCalendar event, the same format calendar invitations use: BEGIN:VEVENT, SUMMARY:Product launch, DTSTART:20261015T170000Z, DTEND:20261015T183000Z, LOCATION:Room 3, END:VEVENT. Times are converted from your device's time zone to UTC, marked by the Z, so each phone shows the event in its own local time.",
        "For an all-day event, dates are written without a time, as DTSTART;VALUE=DATE:20261015. The end date in this format is exclusive, so a one-day event on October 15 ends on October 16 in the code; that is how calendars expect it, and it displays as a single day.",
        "On iPhone, the Camera app recognizes the event and offers to add it to Calendar. On Android, support depends on the scanner: Google Lens and many camera apps show an add-to-calendar option, while some older ones only display the raw text.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "A concert poster carries a code that saves the date and venue, so people who walk past do not have to remember it.",
        "A school newsletter adds codes for parent evenings, putting the time and room straight into busy calendars.",
        "A conference badge lists codes for each workshop, each with its room in the location field.",
        "A clinic prints the next appointment as a code on the reminder card.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "Check your device's time zone before creating the code. The time you enter is read as local time where you are, then stored in UTC.",
        "Put the room or full address in Location; many calendars turn it into a map link.",
        "Keep the description short. Practical notes such as “Bring a laptop” fit well; a full agenda makes the code dense.",
        "Add the event from your own code and confirm the date, time and duration before printing.",
      ],
    },
    faq: [
      {
        q: "Will the time be right for people in other time zones?",
        a: "Yes. The time is stored in UTC, so each calendar shows it in the viewer's local time. A 5 pm event in London appears at noon in New York.",
      },
      {
        q: "Can I change the event after printing?",
        a: "No. The details live inside the code. If the time or place changes, make and print a new code.",
      },
      {
        q: "Can I make a recurring event?",
        a: "Not with this generator. Each code describes a single event.",
      },
      {
        q: "Does it add the event automatically?",
        a: "No. The phone shows the event and the person chooses to add it to their calendar.",
      },
    ],
  },

  payment: {
    title: "PayPal & Payment Link QR Code Generator",
    subtitle: "Get paid by scan with a code that opens your PayPal.Me, Venmo, Cash App or tip page.",
    metaTitle: "PayPal & Payment Link QR Code Generator — Free, No Sign-up",
    metaDescription:
      "Create a QR code for PayPal.Me, Venmo, Cash App, Ko-fi, Buy Me a Coffee and more, with an optional amount on PayPal, Venmo and Cash App. Free and no sign-up.",
    sections: {
      howTitle: "How a payment QR code works",
      how: [
        "The code holds the public payment link of your account. You choose the service and type your username, and the link is built for you. With an amount, PayPal becomes https://paypal.me/yourname/25.00, Venmo becomes https://venmo.com/u/yourname?txn=pay&amount=25.00, and Cash App becomes https://cash.app/$yourtag/25.00. Buy Me a Coffee, Ko-fi, Patreon, Revolut.Me and Wise links open your page without an amount.",
        "Scanning opens the link in the payment app if it is installed, or in the browser if not. The payer logs in to their own account, checks the recipient and amount, and confirms. The code itself contains no card or bank details, only your public page address.",
        "This site does not process payments, take a fee or see transactions. The money moves entirely within the payment service, under its usual terms and fees.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "A market stall shows a PayPal or Venmo code at the till for customers who carry no cash.",
        "A street musician sets out a Ko-fi or Cash App code on the instrument case for tips.",
        "A sports club prints a code with the season fee already filled in, so parents do not have to type the amount.",
        "A freelancer adds a payment code to the bottom of a printed invoice.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "The amount is optional. Leave it empty for tips and donations so the payer chooses; fill it in for fixed prices.",
        "Amounts use digits with up to two decimal places, such as 12.50. The currency is the one set on your account, not on the code.",
        "Open the result link yourself and confirm it shows your name and photo. A typo in a username could send money to a stranger.",
        "Venmo works only between US accounts, and other services have their own country limits. Choose the one your customers already use.",
      ],
    },
    faq: [
      {
        q: "Is it safe to show my payment QR code in public?",
        a: "The code contains only your public payment page, the same link you would share in a message. It cannot be used to take money from you.",
      },
      {
        q: "Can I change the amount later?",
        a: "The amount is part of the code. To change it, make a new code. If prices change often, leave the amount empty.",
      },
      {
        q: "Why can't I set an amount for Ko-fi or Patreon?",
        a: "Their public links do not accept a pre-filled amount, so the payer chooses it on the page.",
      },
      {
        q: "Does this site take a cut of payments?",
        a: "No. The code simply opens your payment page. Fees, if any, are those of PayPal, Venmo or the other service.",
      },
    ],
  },

  crypto: {
    title: "Bitcoin & Crypto QR Code Generator",
    subtitle: "Share a wallet address as a QR code that fills in the address and amount in a wallet app.",
    metaTitle: "Bitcoin & Crypto QR Code Generator — Free, No Sign-up",
    metaDescription:
      "Make a Bitcoin, Ethereum, Litecoin, Dogecoin, Bitcoin Cash or Solana QR code with your wallet address and an optional amount. Static, free and no sign-up.",
    sections: {
      howTitle: "How a crypto QR code works",
      how: [
        "The code holds a payment URI that wallet apps understand. For Bitcoin it follows the BIP-21 format: bitcoin:bc1qexampleaddress?amount=0.0015&label=Coffee%20stand. The scheme names the coin, followed by your address and, optionally, the amount in coins and a short label of up to 60 characters. Litecoin, Dogecoin, Bitcoin Cash and Solana use the same pattern with their own scheme.",
        "For Ethereum, the code contains only ethereum: and the address. Wallets handle Ethereum amounts in different ways, so the amount is left for the sender to type.",
        "The code is meant to be scanned from inside a wallet app, using its scan or send button. The phone's camera may also recognize it and offer to open an installed wallet. The wallet then shows the address and amount for review; nothing is sent until the sender confirms.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "A shop that accepts Bitcoin displays a code at the register, so customers do not have to copy a 42-character address by hand.",
        "A creator adds a donation code for a Solana or Litecoin wallet to the end of a video or a printed zine.",
        "A conference booth shows a code with a fixed amount for a ticket or merchandise payment.",
        "Someone receiving a transfer from a friend shows the code on their screen instead of sending the address through a chat app.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "Double-check the address character by character against your wallet. Crypto transfers cannot be reversed, and a wrong address means lost funds.",
        "Make sure the coin matches the wallet. Sending one coin to an address for another network can lose the funds.",
        "Amounts are in coins, not dollars, with up to eight decimal places. Since prices move, leave the amount empty for anything printed to last.",
        "Consider using a dedicated receiving address. Anyone who scans a public code can look up that address's history on the blockchain.",
      ],
    },
    faq: [
      {
        q: "Is it safe to share my wallet QR code?",
        a: "Sharing a receiving address is normal and does not let anyone spend from the wallet. Never put a private key or recovery phrase in a QR code.",
      },
      {
        q: "Why is there no amount option for Ethereum?",
        a: "Ethereum wallets interpret amounts in payment links differently, so to avoid sending the wrong value, the code contains only the address.",
      },
      {
        q: "Can I accept tokens such as USDT?",
        a: "Tokens on other networks need their own wallet and network settings. This generator covers the six native coins listed.",
      },
      {
        q: "Which wallets can read the code?",
        a: "Most mainstream wallets read the bitcoin: style payment format. If a wallet ignores the amount or label, the address still works.",
      },
    ],
  },

  file: {
    title: "PDF QR Code Generator",
    subtitle: "Link a QR code to a PDF or other file you have shared from Google Drive, Dropbox or your website.",
    metaTitle: "PDF QR Code Generator — Free, No Sign-up",
    metaDescription:
      "Create a QR code that opens a PDF, menu, brochure or manual hosted on Google Drive, Dropbox or your site. Static, never expires, free and no sign-up needed.",
    sections: {
      howTitle: "How a PDF QR code works",
      how: [
        "A QR code cannot hold a whole PDF; even a short document is far bigger than the few kilobytes a code can store. Instead, the code holds a link to where the file lives, such as https://drive.google.com/file/d/1AbC…/view. This site does not upload or host files, so the first step is to put the PDF somewhere online.",
        "Upload it to Google Drive, Dropbox, OneDrive or your own website, then copy the share link and set its access to “anyone with the link”. Paste that link here. When someone scans the code, their phone opens the link in the browser, where the PDF can be viewed or downloaded.",
        "The code keeps working as long as the link does. If the file is deleted, moved to a new link or made private, people will see an error or a sign-in page instead.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "A restaurant links a code to the menu PDF, and updates the file each season without changing the table cards.",
        "A product box includes a code to the full user manual, so the printed leaflet only needs safety basics.",
        "A real estate listing sign opens the floor plan and brochure for anyone passing by.",
        "A conference hands out a single code for the slide deck and handouts after the talk.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "Test the link in a private browser window where you are not signed in. If it asks for a login there, the sharing setting is wrong.",
        "To update a file without changing the link, replace it in place rather than uploading a new copy. Google Drive's Manage versions option keeps the same link.",
        "Avoid links that expire, such as temporary download links from some file transfer services.",
        "Keep the PDF reasonably small and readable on a phone screen. A 50 MB scan is slow to open on mobile data.",
      ],
    },
    faq: [
      {
        q: "Can I upload my PDF here?",
        a: "No. This site creates the code only. Host the file on Google Drive, Dropbox or your own site and paste its share link.",
      },
      {
        q: "Why do people see “Request access” when they scan?",
        a: "The file is not shared publicly. Change its sharing setting to “anyone with the link can view”.",
      },
      {
        q: "Can I change the PDF after printing the code?",
        a: "Yes, as long as the link stays the same. Replace the file's contents at the same address; uploading a new copy creates a new link.",
      },
      {
        q: "Does it work for files other than PDFs?",
        a: "Yes. Any file with a shareable link works, including images, presentations and audio. Whether it previews on the phone depends on the file type.",
      },
    ],
  },
};

/** English copy for the use-case landing pages (/restaurant-menu-qr-code, …). */
export const useCasesEn: Record<UseCaseId, LandingCopy> = {
  restaurant_menu: {
    title: "Restaurant Menu QR Code Generator",
    subtitle: "Print one code for every table that opens your current menu on a guest's phone.",
    metaTitle: "Restaurant Menu QR Code Generator — Free, No Sign-up",
    metaDescription:
      "Make a QR code for your restaurant menu that opens your menu page or PDF. Static, never expires, ready for table tents and window stickers. Free, no sign-up.",
    sections: {
      howTitle: "How a menu QR code works",
      how: [
        "A menu QR code does not contain the menu. It contains a link, such as `https://yourrestaurant.com/menu`, and the phone opens whatever that address shows. So the first step is deciding where the menu lives: a page on your own website, a PDF shared from Google Drive or Dropbox, or the page a menu or ordering service gives you. This site makes the code only; it does not host menus or files.",
        "Because the code is static, the link inside it is fixed the moment you print. What you can change is the content behind the link. If the menu sits at one stable address and you update that page or replace the PDF in place, every table card keeps working through price changes and new seasons. If the address itself changes, for example after switching menu services, the printed codes have to be replaced.",
        "Guests scan with the phone camera, see the address and tap to open it, with no app to install. A short link on your own domain also looks more trustworthy than a long third-party one.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "Table tents or stickers on each table, so guests can browse while they wait instead of sharing one laminated menu.",
        "A window sticker by the door that lets people passing by check dishes and prices before they come in, even after closing time.",
        "A takeaway bag insert or receipt that links to the menu for the next order from home.",
        "A separate code at the counter for the allergen and ingredient page, so staff can point to it when guests ask.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "Use an address you control, such as yourdomain.com/menu, and redirect it to wherever the menu currently lives. Then a change of menu service does not mean reprinting every table card.",
        "Open the menu on a phone over mobile data, not the restaurant Wi-Fi. A large PDF of scanned pages loads slowly and is hard to read on a small screen; a simple web page works better.",
        "Keep printed menus available. Some guests have no smartphone, a flat battery or poor eyesight, and a QR code should be a convenience, not the only way to order.",
        "Show allergen information online as clearly as on paper, and update it whenever a dish changes.",
        "Print the code at least 2 to 3 cm (about 1 in) wide on table cards. For the window, Print sheet / PDF makes an A4 poster with a headline you can edit, such as “Scan for our menu”.",
      ],
    },
    faq: [
      {
        q: "Can I upload my menu here?",
        a: "No. This site makes the code only. Put the menu on your website, share a PDF from Google Drive or Dropbox with “anyone with the link”, or use the link from your menu service, then paste that address here.",
      },
      {
        q: "Do I need a new code when the menu changes?",
        a: "Not if the address stays the same. Update the page or replace the PDF at the same link, and the printed codes keep showing the latest version.",
      },
      {
        q: "Will the code stop working after a while?",
        a: "No. It is a static code with the link stored in the image, so there is no subscription to lapse. It works as long as the menu page itself is online.",
      },
      {
        q: "Should I use one code for all tables or one per table?",
        a: "One code is enough when every table sees the same menu. Separate codes only help if your ordering system gives each table its own link; you can turn that list into codes on the Batch page, up to 200 at a time in one ZIP.",
      },
    ],
  },

  wedding: {
    title: "Wedding QR Code Generator",
    subtitle: "Link invitations to your wedding website or RSVP form, and gather reception photos in one shared album.",
    metaTitle: "Wedding QR Code Generator — Free, No Sign-up",
    metaDescription:
      "Make a wedding QR code for invitations, RSVP forms, directions and a shared photo album. Static codes that never expire, ready to print. Free, no sign-up.",
    sections: {
      howTitle: "How a wedding QR code works",
      how: [
        "A wedding QR code holds a link, and the link decides what guests see. On an invitation, that is usually your wedding website or the RSVP form itself, whether you built it with a wedding website service, Google Forms or something else. The guest scans, the page opens, and they reply without typing a long address from the card.",
        "The same approach works for the rest of the day. A code with a Google Maps or Apple Maps share link takes guests to the venue, and a code at the reception that opens a Google Photos or iCloud shared album lets everyone add the pictures they took. Each purpose needs its own code, because one code opens one address.",
        "Codes made here are static: the link is stored in the image and never expires, so it will still open years from now if the page is still online. The other side of that is that the link cannot be swapped after printing. Settle the addresses of your website, form and album before the invitations go to the printer.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "The back of the invitation or an insert card links to the RSVP form, so replies arrive in one place instead of by text, email and phone.",
        "A save-the-date or details card opens the wedding website with travel, accommodation and dress code information.",
        "A directions card or welcome sign opens a map link for a venue that is hard to find, such as a barn down a private road.",
        "Table cards at the reception open a shared photo album, so guests upload their pictures before they forget.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "On an invitation, about 2 to 2.5 cm (0.8 to 1 in) is comfortable for a phone held in the hand. A shorter link gives a coarser pattern that prints more reliably at that size.",
        "Dark ink on cream, ivory or kraft paper usually scans well; gold foil, pastel ink and light gray often do not. Choose a dark color under Style and test a printed proof on the actual paper.",
        "Keep the quiet zone, the empty margin around the code, free of flourishes, borders and illustrations. Scanners need it to find the code.",
        "Check sharing settings: the album link must let guests add photos, and the form must be open to anyone with the link, not only to your account.",
        "Before ordering the full run, scan one proof with an iPhone and an Android phone, submit a test RSVP and ask a friend to upload a photo to the album.",
      ],
    },
    faq: [
      {
        q: "Can I change where the code goes after the invitations are printed?",
        a: "Not the code itself, because it is static. You can still edit what the page shows, so update the website or form rather than replacing the link.",
      },
      {
        q: "Will the code still work after the wedding?",
        a: "The code has no expiry date. It keeps working as long as the website, form or album at the link is online, so guests can revisit the photos later if you keep the album shared.",
      },
      {
        q: "Can each guest get a personal RSVP code?",
        a: "If your RSVP service gives each guest a separate link, you can turn the list into codes on the Batch page, up to 200 at a time, as a ZIP of PNG files.",
      },
      {
        q: "Should I send PNG or SVG to the printer?",
        a: "Send the SVG file to a printer or designer. It is a vector file, so it stays sharp at any size. The PNG is fine for a wedding website or a message to guests.",
      },
    ],
  },

  business_card: {
    title: "Business Card QR Code Generator",
    subtitle: "Put a contact card on your business card that saves your details to a phone in one scan.",
    metaTitle: "Business Card QR Code Generator — Free, No Sign-up",
    metaDescription:
      "Make a business card QR code that saves your name, number, email and website to a phone's contacts. vCard 3.0, static and never expires. Free, no sign-up.",
    sections: {
      howTitle: "How a business card QR code works",
      how: [
        "A business card code made here holds a vCard 3.0 contact card, the format phone address books read. When someone scans it, the phone shows your name, company, number and email in a contact preview, and one tap adds it. Nothing has to load, so it works in a conference hall with poor reception, and your name is saved exactly as you spell it.",
        "The alternative is a code that links to a profile, such as your website or LinkedIn page. A link can show more and its page can be updated without reprinting, but the person still has to save your number themselves. A contact code does the saving for them. Some people use both: the contact code on the back, and a short website address printed as text.",
        "Every field you fill in is stored in the image, so the code grows with the information. A card with name, company, mobile, email and website stays compact; adding a full street address and a note makes the pattern denser and harder to read at business card size.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "Networking events and trade fairs, where you hand out dozens of cards and want each one to end up in a phone rather than a drawer.",
        "Freelancers and consultants who meet clients in person and want the right email and number saved, not guessed from a photo of the card.",
        "A sales team's cards, where each person gets a code with their own direct line.",
        "A reception card that saves the general office contact for visitors.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "On a standard 85 × 55 mm (3.5 × 2 in) card, print the code at least 2 cm (0.8 in) wide, with a clear margin around it. If it has the back to itself, 2.5 to 3 cm is more comfortable.",
        "Keep to the fields people need: name, company, mobile, email and website. Leave the address and note empty unless they matter.",
        "Write numbers with the country code, such as +1 415 555 2671, so they work for contacts abroad.",
        "The Batch page makes link and text codes, not contact cards. For a team, make each person's code on this page and save the SVG file for each card design.",
        "Scan a printed proof with an iPhone and an Android phone and check that name, number and email land in the right fields.",
      ],
    },
    faq: [
      {
        q: "What happens when my number or job title changes?",
        a: "The details are fixed inside the code. Make a new code and reprint the cards, as you would for the printed text.",
      },
      {
        q: "Should I use a contact code or a link to my website?",
        a: "A contact code saves your details directly and works offline. A link can lead to a page you update later. If your details rarely change, the contact code is the more useful choice on a card.",
      },
      {
        q: "Can I add my logo?",
        a: "Not to the contact itself, but you can place a small logo in the middle of the code under Style. Error correction is then raised to the maximum automatically, so the code still scans.",
      },
      {
        q: "Can people edit the contact before saving it?",
        a: "Yes. The phone shows a preview, and the person can review and change the details before adding them.",
      },
    ],
  },

  google_review: {
    title: "Google Review QR Code Generator",
    subtitle: "Make a code that opens the Google review form for your business, ready for counters and receipts.",
    metaTitle: "Google Review QR Code Generator — Free, No Sign-up",
    metaDescription:
      "Create a QR code that opens your Google review form from your Place ID or review link. For counter cards, receipts and follow-up cards. Free, no sign-up.",
    sections: {
      howTitle: "How a Google review QR code works",
      how: [
        "The code opens Google's review form for your business directly, so customers do not have to search for you, pick the right listing and look for the review button. With the Google Review platform selected, you enter your Place ID, and the code contains `https://search.google.com/local/writereview?placeid=ChIJ…` with your ID in place of the dots.",
        "There are two ways to fill the field. The first is the Place ID: search for your business in Google's Place ID Finder, part of the Google Maps Platform documentation, and copy the ID, which usually starts with ChIJ. The second is the review link from your Google Business Profile: open your profile, choose the option to ask for reviews and copy the short link it shows. A full link that starts with https:// is accepted as it is.",
        "On scan, the phone opens the form in Google Maps or the browser. The customer needs to be signed in to a Google account to post, and they choose the stars and write the review themselves. The code is static and contains only a public link, so it keeps working as long as your listing does.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "A small card by the register, where customers have a moment while paying.",
        "The bottom of a printed receipt, which goes home with the customer.",
        "A thank-you card left after a delivery, a hotel stay or a service visit, once the job is done.",
        "An A4 poster near the exit made with Print sheet / PDF, with a short headline you can edit.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "Scan the code yourself and check that the form shows your business name. Businesses with similar names in the same city are easy to mix up in the Place ID Finder.",
        "Ask in plain words, such as “Tell us how we did on Google”, and place the code where people have a free moment, not where they rush out.",
        "Google's policies do not allow discounts, gifts or other incentives in exchange for reviews, so keep the card to a simple request.",
        "Ask every customer the same way. Google also prohibits review gating: inviting only satisfied customers, or sending unhappy ones somewhere else first.",
      ],
    },
    faq: [
      {
        q: "Where do I find my Place ID?",
        a: "Use the Place ID Finder in Google's Maps documentation: search for your business and copy the ID shown. Alternatively, paste the review link from your Google Business Profile into the field.",
      },
      {
        q: "Does the customer need a Google account?",
        a: "Yes. Posting a Google review requires signing in to a Google account. People without one can still read your listing.",
      },
      {
        q: "Can I offer a discount for a review?",
        a: "No. Google's policies prohibit incentives for reviews, including discounts and free items. A polite request on a card is fine.",
      },
      {
        q: "Will the code break if I change my business name?",
        a: "Usually not, because the Place ID refers to the listing, not its name. Google notes that Place IDs can change in some cases, such as when listings are merged, so scan the code again after major changes to your profile.",
      },
    ],
  },

  wifi_cafe: {
    title: "Wi-Fi QR Code for Cafés, Hotels & Rentals",
    subtitle: "Let guests join your guest network with one scan, from table tents, room cards or the rental door.",
    metaTitle: "Wi-Fi QR Code for Cafés, Hotels & Rentals — Free, No Sign-up",
    metaDescription:
      "Make a Wi-Fi QR code for your café, hotel or vacation rental. Guests join with one scan on iPhone or Android. Print table tents or room cards. Free, no sign-up.",
    sections: {
      howTitle: "How a guest Wi-Fi QR code works",
      how: [
        "In many cafés, the most repeated question at the counter is the Wi-Fi password. A Wi-Fi code answers it on paper: it holds the network name, password and security type in a short format, such as `WIFI:T:WPA;S:Cafe-Guest;P:espresso-2026;;`, and the phone camera turns that into a “Join network” prompt. Guests type nothing, so there are no mistakes with capital letters or a zero that looks like an O.",
        "Set up a separate guest network before making the code, if your router or access points support one. The password sits in the code in readable form, and anyone who photographs a table tent can read it. A guest network keeps the card terminal, the office computer and the security cameras on a network guests cannot reach.",
        "The code is static, so the password is fixed in it. If you change the guest password every month or after each rental stay, print new codes at the same time. Hotel networks with a sign-in or terms page, called a captive portal, still show that page after the phone connects; the code joins the network but does not complete the sign-in.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "Table tents in a café or restaurant, so guests connect while they wait for their order.",
        "A card in each hotel room or in the key card sleeve, next to checkout time and breakfast hours.",
        "A framed code inside the front door of a vacation rental or in the welcome folder, for guests who arrive late when the host is not around.",
        "A coworking desk, waiting room or salon chair, where visitors stay long enough to want a connection.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "Print sheet / PDF makes an A4 sign with a “Connect to Wi-Fi” headline and the network name, so people who cannot scan still know which network to pick. You can add a subline such as “Ask staff for help”.",
        "Type the network name exactly as it is broadcast, including capital letters and suffixes such as _5G.",
        "When you rotate the password, replace every printed code the same day. A stale code still shows the join prompt but fails to connect, which looks like a broken network to guests.",
        "Test the printed code on an iPhone and an Android phone from where guests actually sit, under your real lighting.",
      ],
    },
    faq: [
      {
        q: "Is it safe to put the Wi-Fi password on a table?",
        a: "Anyone who scans or photographs the code can read the password, so use a guest network that is separate from the one your business systems use.",
      },
      {
        q: "Do I need to reprint when I change the password?",
        a: "Yes. The password is stored in the code itself, so every password change needs a new code and new prints.",
      },
      {
        q: "Does it work with a hotel login page?",
        a: "The code connects the phone to the network. If the network then shows a sign-in or terms page, guests still complete it by hand.",
      },
      {
        q: "Can I make a code for each room with its own password?",
        a: "Yes, one at a time on this page. The Batch page is built for lists of links and text and has no Wi-Fi fields.",
      },
    ],
  },
};
