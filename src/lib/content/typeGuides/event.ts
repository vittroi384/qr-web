import type { TypeGuide } from "../types";

export const guide: TypeGuide = {
  title: "Guide: Calendar event QR codes",
  blocks: [
    { h3: "Anatomy of the VEVENT block" },
    { p: "iCalendar is defined in RFC 5545, and a VEVENT is the smallest useful unit of it: a handful of property lines between `BEGIN:VEVENT` and `END:VEVENT`. `SUMMARY` is the title that shows in the calendar list, `DTSTART` and `DTEND` give the bounds, `LOCATION` is a free-text place, and `DESCRIPTION` holds notes. Scanner apps accept the event without the surrounding `VCALENDAR` wrapper, which keeps the code compact. Every character adds density, so those five properties are the practical limit for a code that still scans from a poster across a room." },
    { h3: "Time zones without surprises" },
    { p: "A timestamp ending in `Z` is Coordinated Universal Time. `20261015T170000Z` means 17:00 UTC, which a phone in Seoul displays as 02:00 the next morning and a phone in Los Angeles as 10:00. That is exactly right for a webinar with scattered attendees, but it can mislead for a local concert if the organiser made the code while travelling in another zone. Daylight-saving time adds a second trap: a code made in summer for a winter date gets the winter offset automatically, yet if the venue's country changes its clock rules before the event, the stored UTC instant no longer matches the intended local time." },
    { p: "All-day events sidestep the issue. `DTSTART;VALUE=DATE:20261015` has no clock time and no zone, so it stays on October 15 everywhere. The end value is the morning after the last day, so a three-day festival from the 15th to the 17th is written with an end of the 18th." },
    { h3: "What happens on the phone" },
    { p: "iOS Camera reads the block natively and shows an event card with an Add button; Apple Calendar then creates a normal, editable entry. Google Lens and most recent Android camera apps do the same, but a bare camera app on some budget devices may only show raw text, and the person then needs a calendar app that can import from a scan. Nothing is added silently in either case." },
    { p: "Beyond the basics, reliability drops quickly. Recurrence rules, alarm reminders, attendee lists and attachments are legal iCalendar, yet scanner apps strip or ignore most of them, and a long block becomes a dense code. Keep the event single and let people set their own reminder." },
    { h3: "Printing and planning around it" },
    { p: "Invitations, conference agendas with one code per session, class timetables and appointment reminder cards all work well because the date is fixed before printing. Where a date might slip, print the code on a separate insert or sticker rather than the main card. Give the end time deliberately too: a missing `DTEND` makes some calendars default to a zero-length or one-hour slot, which hides the event in a day view." },
    { p: "A venue that is hard to find pairs naturally with a [location code](/location-qr-code), an RSVP can go through a [WhatsApp code](/whatsapp-qr-code), and the [print size guide](/guides/qr-code-size-for-printing) explains how big the event code needs to be on a poster compared with a card." },
  ],
};
