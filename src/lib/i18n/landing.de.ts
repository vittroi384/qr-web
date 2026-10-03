import type { QrType } from "@/lib/qr/types";
import type { LandingCopy, UseCaseId } from "./index";

/** Deutsche Langtexte für die Landingpages je Typ (/de/wifi-qr-code, …). Sie-Form. */
export const landingDe: Record<QrType, LandingCopy> = {
  url: {
    title: "URL QR-Code Generator",
    subtitle: "Machen Sie aus jeder Webadresse einen QR-Code, der die Seite mit einem Scan öffnet.",
    metaTitle: "URL QR-Code Generator — Kostenlos, ohne Anmeldung",
    metaDescription:
      "Erstellen Sie einen QR-Code, der jede Webseite öffnet. Statische Codes, die nie ablaufen, direkt im Browser erstellt. Als PNG, SVG oder A4-Druckvorlage. Kostenlos.",
    sections: {
      howTitle: "So funktioniert ein URL QR-Code",
      how: [
        "Der Code enthält die Webadresse selbst, Zeichen für Zeichen. Geben Sie example.com/speisekarte ein, ergänzt der Generator https://, sodass der Code https://example.com/speisekarte enthält. Hält jemand die Handykamera darauf, erkennt das Smartphone den Link und bietet an, ihn im Browser zu öffnen. Dazwischen steht nichts: kein Weiterleitungsdienst und kein Konto, das aktiv bleiben muss.",
        "Auf dem iPhone zeigt die integrierte Kamera-App ein Banner mit der Adresse; ein Tippen öffnet Safari. Die meisten Android-Smartphones machen es genauso über die Kamera-App oder Google Lens. Da die Person die Adresse vor dem Öffnen sieht, schafft eine kurze, wiedererkennbare Domain mehr Vertrauen als eine lange Kette von Tracking-Parametern.",
        "Je länger die Adresse, desto mehr Kästchen braucht der Code. Ein Link mit 30 Zeichen ergibt ein grobes, leicht scanbares Muster; ein Link mit 300 Zeichen und vielen Parametern ein dichtes, das größer gedruckt werden muss. Links, die mit javascript: oder data: beginnen, werden abgelehnt, denn ein Scanner sollte niemals Code ausführen.",
      ],
      usesTitle: "Wo er hilft",
      uses: [
        "Ein Restaurant druckt den Code auf Tischaufsteller, damit Gäste die Speisekarte öffnen können, statt auf eine gedruckte Karte zu warten.",
        "Ein Schaufenster zeigt einen Code zu Öffnungszeiten und Online-Bestellung — praktisch für Passanten nach Ladenschluss.",
        "Ein Produktetikett verlinkt auf die Einrichtungsanleitung oder die Garantieseite, sodass die gedruckte Anleitung kurz bleiben kann.",
        "Eine Referentin zeigt auf der letzten Folie einen Code zu den Vortragsunterlagen, damit niemand eine URL von der Leinwand abtippen muss.",
      ],
      tipsTitle: "Tipps vor dem Druck",
      tips: [
        "Der Code ist statisch: Ändert sich die Adresse, brauchen Sie einen neuen Code. Verlinken Sie deshalb auf eine Seite, die Sie selbst verwalten, etwa ihredomain.de/speisekarte. Dann können Sie den Inhalt ändern, ohne neu zu drucken.",
        "Entfernen Sie überflüssige Tracking-Parameter. Ein kürzerer Link ergibt ein klareres Muster, das sich auch aus der Entfernung schneller scannen lässt.",
        "Faustregel: Der Code sollte mindestens ein Zehntel der Scan-Entfernung breit sein — etwa 2 cm für etwas, das man in der Hand hält, 30 cm für ein Plakat, das aus 3 m gelesen wird.",
        "Öffnen Sie den Link nach dem Speichern auf Ihrem eigenen Smartphone. Ein Tippfehler in der Adresse ist der häufigste Grund, warum ein gedruckter Code nicht funktioniert.",
      ],
    },
    faq: [
      {
        q: "Läuft ein URL QR-Code ab?",
        a: "Nein. Die Adresse ist im Bild gespeichert, daher funktioniert der Code, solange die Webseite selbst online ist. Diese Website muss dafür nicht weiter bestehen.",
      },
      {
        q: "Kann ich den Link nach dem Druck ändern?",
        a: "Nicht im Code selbst, denn er ist statisch. Sie können aber ändern, was die verlinkte Seite anzeigt, oder auf Ihrer eigenen Website eine Weiterleitung einrichten.",
      },
      {
        q: "Muss ich https:// eingeben?",
        a: "Nein. Lassen Sie es weg, wird https:// automatisch ergänzt. Geben Sie http:// nur dann ausdrücklich ein, wenn Ihre Website tatsächlich kein HTTPS unterstützt.",
      },
      {
        q: "Kann ich sehen, wie oft der Code gescannt wurde?",
        a: "Hier nicht. Der Code öffnet Ihre Seite direkt, daher werden Scans nur gezählt, wenn Ihre eigene Website-Statistik den Besuch erfasst. Ein Kampagnenparameter wie ?utm_source=plakat im Link hilft, diese Besuche zu unterscheiden.",
      },
    ],
  },

  social: {
    title: "Social Media QR-Code Generator",
    subtitle: "Benutzernamen eingeben und einen Code erhalten, der Ihr Profil auf Instagram, TikTok, YouTube und mehr öffnet.",
    metaTitle: "Social Media QR-Code Generator — Kostenlos, ohne Anmeldung",
    metaDescription:
      "Erstellen Sie einen QR-Code für Ihr Instagram-, TikTok-, YouTube-, LinkedIn- oder Linktree-Profil – nur mit dem Benutzernamen. Statisch, läuft nie ab, kostenlos.",
    sections: {
      howTitle: "So funktioniert ein Social Media QR-Code",
      how: [
        "Sie wählen eine Plattform und geben Ihren Benutzernamen ein; der Generator baut daraus die übliche Profiladresse. Aus dem Instagram-Namen @baeckerei_sonnenschein wird https://www.instagram.com/baeckerei_sonnenschein/, ein YouTube-Handle wird zu https://www.youtube.com/@kanal und eine LinkedIn-Profil-ID zu https://www.linkedin.com/in/profil-id/. Ein vorangestelltes @ wird entfernt, wo die Plattform es in der Adresse nicht verwendet, ebenso Leerzeichen und Schrägstriche.",
        "Haben Sie den Profillink schon, fügen Sie ihn einfach ein — die Plattform wird automatisch erkannt. Beim Scannen sieht das Smartphone einen ganz normalen https-Link. Ist die App installiert, geben iOS und Android den Link in der Regel an sie weiter und das Profil öffnet sich dort, sonst im Browser.",
        "Manche Plattformen arbeiten mit Codes statt Namen: Discord braucht einen Einladungscode, Google-Rezensionen eine Place ID und Spotify eine Künstler-ID. Der Platzhaltertext im jeweiligen Feld zeigt, was einzugeben ist.",
      ],
      usesTitle: "Wo er hilft",
      uses: [
        "Ein Café druckt einen Instagram-Code auf den Kassenbon, damit Gäste folgen können, ohne zwischen drei ähnlichen Namen suchen zu müssen.",
        "Eine Band legt einen Spotify-Code an den Merch-Stand und einen Linktree-Code auf den Flyer für alles andere.",
        "Ein lokales Geschäft bittet mit einem Google-Rezension-Code an der Theke um Bewertungen; er öffnet direkt das Bewertungsformular.",
        "Bewerberinnen und Bewerber drucken einen LinkedIn-Code auf den Lebenslauf oder das Namensschild für die Jobmesse.",
      ],
      tipsTitle: "Tipps vor dem Druck",
      tips: [
        "Prüfen Sie den Namen, indem Sie den Link in der Ergebniszeile vor dem Speichern öffnen. Ein einziger fehlender Buchstabe kann zum Konto einer anderen Person führen.",
        "Erstellen Sie für Discord eine Einladung ohne Ablaufdatum; die Standard-Einladung gilt nur sieben Tage, und der gedruckte Code wäre dann ebenfalls wertlos.",
        "Wenn Sie Ihr Konto vielleicht umbenennen, übersteht ein Code zu einer Linktree-Seite oder Ihrer eigenen Website die Änderung besser als ein direkter Profillink.",
        "Setzen Sie Namen oder Logo der Plattform neben den Code, damit klar ist, was sich beim Scannen öffnet.",
      ],
    },
    faq: [
      {
        q: "Öffnet der Code die App oder die Website?",
        a: "Er enthält einen normalen Profillink. Auf den meisten Smartphones öffnet er sich in der App, wenn sie installiert ist, sonst im Browser.",
      },
      {
        q: "Was passiert, wenn ich meinen Benutzernamen ändere?",
        a: "Der Code zeigt weiter auf die alte Adresse, die dann womöglich nicht mehr funktioniert oder später jemand anderem gehört. Erstellen Sie nach der Umbenennung einen neuen Code.",
      },
      {
        q: "Kann ich mehrere Profile in einen Code packen?",
        a: "Nein, ein Code öffnet genau eine Adresse. Nutzen Sie eine Link-in-Bio-Seite wie Linktree und erstellen Sie einen Code für diese Seite.",
      },
      {
        q: "Wo finde ich eine Google Place ID?",
        a: "Google bietet in der Maps-Dokumentation einen Place ID Finder an. Suchen Sie dort Ihr Unternehmen und kopieren Sie die ID, die mit ChIJ beginnt.",
      },
      {
        q: "Bleibt mein Profil privat, wenn ich einen Code erstelle?",
        a: "Der Code enthält nur die öffentliche Profiladresse. Was andere nach dem Scannen sehen, hängt von den Privatsphäre-Einstellungen Ihres Kontos ab.",
      },
    ],
  },

  whatsapp: {
    title: "WhatsApp QR-Code Generator",
    subtitle: "Kundinnen und Kunden starten per Scan einen WhatsApp-Chat mit Ihnen — auf Wunsch mit vorbereiteter Nachricht.",
    metaTitle: "WhatsApp QR-Code Generator — Kostenlos, ohne Anmeldung",
    metaDescription:
      "Erstellen Sie einen WhatsApp QR-Code, der einen Chat mit Ihrer Nummer und einer vorausgefüllten Nachricht öffnet. Für iPhone und Android, läuft nie ab, kostenlos.",
    sections: {
      howTitle: "So funktioniert ein WhatsApp QR-Code",
      how: [
        "Der Code nutzt den offiziellen Click-to-Chat-Link von WhatsApp. Ihre Nummer wird auf reine Ziffern reduziert, ohne Pluszeichen, Leerzeichen oder führende Nullen, und eine Nachricht wird als URL-kodierter Text angehängt: https://wa.me/4915123456789?text=Hallo%2C%20ich%20m%C3%B6chte%20einen%20Tisch%20reservieren.",
        "Beim Scannen öffnet das Smartphone den Link, WhatsApp startet und ein Chat mit Ihrer Nummer erscheint, die Nachricht steht bereits im Eingabefeld. Gesendet wird erst, wenn die Person auf Senden tippt — sie kann den Text vorher also noch ändern. Ist WhatsApp nicht installiert, öffnet der Link eine Webseite, die den Download oder WhatsApp Web anbietet.",
        "Die Nummer muss die Ländervorwahl enthalten, denn wa.me kann das Land nicht erraten. Der Generator akzeptiert 7 bis 15 Ziffern, was internationale Nummern abdeckt. Ein WhatsApp-Business-Konto funktioniert genauso wie ein privates.",
      ],
      usesTitle: "Wo er hilft",
      uses: [
        "Ein Friseursalon druckt einen Code mit der Nachricht „Ich möchte einen Termin vereinbaren“ auf die Visitenkarte, sodass Anfragen immer im gleichen Format ankommen.",
        "Ein Onlinehändler legt einen Code für Fragen zur Bestellung auf den Lieferschein — einfacher, als eine Support-Adresse herauszusuchen.",
        "Eine Stadtführerin zeigt am Treffpunkt einen Code, damit die Gruppe sie am Tag der Führung erreichen kann.",
        "Ein Vermieter legt für Reparaturmeldungen einen Code in die Begrüßungsmappe der Ferienwohnung.",
      ],
      tipsTitle: "Tipps vor dem Druck",
      tips: [
        "Schreiben Sie die Nummer international, z. B. +49 151 23456789 statt 0151 23456789. Eine führende Null wird entfernt, die Ländervorwahl kann aber nicht automatisch ergänzt werden.",
        "Halten Sie die vorausgefüllte Nachricht kurz und konkret, etwa eine Terminanfrage oder die Bitte um die Bestellnummer. Lange Nachrichten machen den Code dichter.",
        "Scannen Sie den fertigen Code selbst und prüfen Sie, ob sich der Chat mit dem richtigen Namen öffnet. Eine falsche Ziffer schickt Menschen zu Fremden.",
        "Wechseln Sie Ihre Nummer, öffnet der gedruckte Code weiter die alte — planen Sie dann einen Neudruck ein.",
      ],
    },
    faq: [
      {
        q: "Funktioniert es, wenn meine Nummer nicht gespeichert ist?",
        a: "Ja. Genau dafür gibt es den wa.me-Link: Der Chat öffnet sich, ohne dass man Sie vorher als Kontakt speichern muss.",
      },
      {
        q: "Wird die Nachricht automatisch gesendet?",
        a: "Nein. Sie erscheint im Textfeld, und die Person entscheidet, ob sie sie so sendet, ändert oder löscht.",
      },
      {
        q: "Funktioniert es mit WhatsApp Business?",
        a: "Ja. Verwenden Sie die Nummer, mit der Ihr WhatsApp-Business-Konto registriert ist.",
      },
      {
        q: "Warum öffnet mein Code keinen Chat?",
        a: "Meist fehlt die Ländervorwahl oder sie ist falsch. Prüfen Sie, ob die Nummer in der Ergebniszeile mit Ihrer Ländervorwahl beginnt (z. B. 49) und danach keine zusätzliche Null folgt.",
      },
    ],
  },

  text: {
    title: "Text QR-Code Generator",
    subtitle: "Packen Sie eine Notiz, einen Code oder eine kurze Nachricht in einen QR-Code, der beim Scannen den Text anzeigt.",
    metaTitle: "Text QR-Code Generator — Kostenlos, ohne Anmeldung",
    metaDescription:
      "Speichern Sie einfachen Text in einem QR-Code: Notizen, Seriennummern, Anleitungen oder kurze Nachrichten. Lesbar ohne Link und Internet. Kostenlos und statisch.",
    sections: {
      howTitle: "So funktioniert ein Text QR-Code",
      how: [
        "Ein Text-Code enthält genau die Zeichen, die Sie eingeben — ohne Präfix und ohne Link. Zum Scannen braucht es kein Internet: Der Text wird direkt aus dem Muster gelesen. Das eignet sich für Orte ohne Empfang oder für Informationen, die nicht davon abhängen sollen, ob eine Website online bleibt.",
        "Was das Smartphone mit reinem Text macht, ist unterschiedlich. Viele Android-Scanner und Google Lens zeigen den Text mit einer Kopieren-Schaltfläche. Die iPhone-Kamera zeigt ihn je nach iOS-Version als Banner oder bietet eine Suche an. Sollen Menschen eine Seite öffnen, nehmen Sie besser einen URL-Code; sollen sie einen Satz lesen, ist Text die richtige Wahl.",
        "Die Kapazität ist die wichtigste Grenze. Umlaute wie ä, ö, ü und ß, asiatische Schriftzeichen und Emojis belegen zwei bis vier Bytes pro Zeichen und füllen den Code schneller als einfache lateinische Buchstaben. In der Praxis lassen sich einige hundert Zeichen noch bequem scannen; wird der Inhalt zu lang, weist die Vorschau darauf hin.",
      ],
      usesTitle: "Wo er hilft",
      uses: [
        "Eine Werkstatt kennzeichnet Geräte mit Codes, die Seriennummer und letztes Wartungsdatum enthalten — lesbar auch im Keller ohne Empfang.",
        "Eine Lehrerin versteckt die Lösung eines Rätsels in einem Code auf dem Arbeitsblatt, damit die Klasse erst nachschaut, wenn sie so weit ist.",
        "Ein Lager druckt Lagerplätze oder Teilenummern als Text-Codes, die jedes Smartphone ohne Spezialsoftware lesen kann.",
        "Ein Geschenkanhänger trägt eine kurze persönliche Botschaft, die beim Scannen erscheint.",
      ],
      tipsTitle: "Tipps vor dem Druck",
      tips: [
        "Fassen Sie sich kurz. Jeder zusätzliche Satz macht die Kästchen kleiner, und kleine Kästchen brauchen einen größeren Druck und besseres Licht.",
        "Meldet die Vorschau, dass der Inhalt zu lang ist, stellen Sie unter Stil die Fehlerkorrektur auf Standard — oder legen Sie den Text auf eine Webseite und nutzen Sie einen URL-Code.",
        "Verwenden Sie keinen Text-Code für Geheimnisse. Wer ihn scannt, kann jedes Zeichen lesen.",
        "Testen Sie mit einem iPhone und einem Android-Smartphone, denn reiner Text wird auf beiden unterschiedlich angezeigt.",
      ],
    },
    faq: [
      {
        q: "Wie viel Text passt in einen QR-Code?",
        a: "Das Format erlaubt bei Standard-Fehlerkorrektur rund 2.300 Zeichen einfachen lateinischen Text, doch alles über einige hundert Zeichen lässt sich mit dem Handy nur noch schwer scannen. Umlaute und nicht-lateinische Zeichen brauchen mehr Platz.",
      },
      {
        q: "Braucht man zum Lesen Internet?",
        a: "Nein. Der Text ist im Bild selbst gespeichert, daher kann jeder Scanner ihn offline lesen.",
      },
      {
        q: "Kann ich Zeilenumbrüche verwenden?",
        a: "Ja. Zeilenumbrüche bleiben Teil des Textes, manche Scanner-Apps zeigen sie allerdings als Leerzeichen an.",
      },
      {
        q: "Warum zeigt mein iPhone den Text nicht richtig an?",
        a: "Die iPhone-Kamera ist vor allem für Links und Aktionen gedacht. Für reinen Text nutzen Sie den Code-Scanner im Kontrollzentrum oder eine Scanner-App, die den vollständigen Text zeigt.",
      },
    ],
  },

  wifi: {
    title: "WLAN QR-Code Generator",
    subtitle: "Gäste verbinden sich per Scan mit Ihrem WLAN — ohne Passwort vorlesen oder abtippen.",
    metaTitle: "WLAN QR-Code Generator — Kostenlos, ohne Anmeldung",
    metaDescription:
      "WLAN QR-Code erstellen: iPhone und Android verbinden sich mit einem Scan mit Ihrem Netzwerk. Unterstützt WPA/WPA2/WPA3, WEP und versteckte Netze. Kostenlos.",
    sections: {
      howTitle: "So funktioniert ein WLAN QR-Code",
      how: [
        "Der Code speichert Ihre Netzwerkdaten in einem kurzen, weit verbreiteten Format (international als Wi-Fi-QR-Code bekannt): WIFI:T:WPA;S:CafeGast;P:sonniger-tag-42;;. T ist der Verschlüsselungstyp (WPA, WEP oder nopass für ein offenes Netz), S der Netzwerkname und P das Passwort. Bei einem versteckten Netzwerk kommt H:true; hinzu. Zeichen mit Sonderbedeutung in diesem Format, etwa Semikolon, Doppelpunkt, Komma, Anführungszeichen oder Backslash, werden mit einem Backslash maskiert, sodass auch Passwörter mit diesen Zeichen funktionieren.",
        "Auf dem iPhone (ab iOS 11) zeigt die Kamera-App beim Blick auf den Code die Meldung „Mit Netzwerk verbinden“. Die meisten Android-Smartphones ab Android 10 bieten das ebenfalls an — über die Kamera, Google Lens oder die WLAN-Einstellungen, die eine eigene QR-Scan-Schaltfläche haben. Das Smartphone verbindet sich direkt; zum Lesen des Codes braucht es weder App noch Internet.",
        "Die Option WPA deckt WPA-, WPA2- und WPA3-Netzwerke ab. Wählen Sie WEP nur bei sehr alten Routern.",
      ],
      usesTitle: "Wo er hilft",
      uses: [
        "Ein Tischaufsteller im Café lässt Gäste ins WLAN, während sie auf ihre Bestellung warten — und das Personal muss das Passwort nicht mehr an der Theke buchstabieren.",
        "Eine Ferienwohnung hängt den Code gerahmt neben die Eingangstür, damit neue Gäste online kommen, auch wenn der Gastgeber nicht erreichbar ist.",
        "Ein Besprechungsraum zeigt den Code für das Gästenetz an der Wand, für Besucher mit eigenem Laptop und Smartphone.",
        "Zu Hause erspart ein Code am Kühlschrank die Suche nach dem Aufkleber auf dem Router, wenn Freunde zu Besuch kommen.",
      ],
      tipsTitle: "Tipps vor dem Druck",
      tips: [
        "Ändern Sie das WLAN-Passwort, funktioniert der gedruckte Code nicht mehr. Erstellen Sie einen neuen Code und tauschen Sie die alten Ausdrucke gleichzeitig aus.",
        "Nutzen Sie ein separates Gästenetz, wenn Ihr Router (z. B. eine FRITZ!Box) eines anbietet. Wer den Code fotografiert, kann das Passwort daraus lesen.",
        "Geben Sie den Netzwerknamen genau so ein, wie er angezeigt wird, inklusive Groß- und Kleinschreibung und Zusätzen wie _5G.",
        "Die Druckvorlage ergänzt die Überschrift „Mit dem WLAN verbinden“ und den Netzwerknamen, damit auch Menschen ohne Scanner sich manuell verbinden können.",
      ],
    },
    faq: [
      {
        q: "Funktioniert ein WLAN QR-Code auf dem iPhone?",
        a: "Ja. Seit iOS 11 erkennt die integrierte Kamera-App WLAN-Codes und bietet an, sich mit dem Netzwerk zu verbinden.",
      },
      {
        q: "Kann ich das Passwort später ändern, ohne neu zu drucken?",
        a: "Nein. Das Passwort steckt im Code, und der ist statisch. Nach einer Passwortänderung müssen Sie einen neuen Code erstellen und drucken.",
      },
      {
        q: "Wird mein WLAN-Passwort auf Ihrem Server gespeichert?",
        a: "Der Code wird in Ihrem Browser erstellt. Beim Speichern, Kopieren oder Drucken können Ihre Eingaben wie in der Datenschutzerklärung beschrieben protokolliert werden, WLAN-Passwörter werden vor der Speicherung jedoch immer unkenntlich gemacht.",
      },
      {
        q: "Funktioniert es mit versteckten Netzwerken?",
        a: "Ja. Aktivieren Sie „Verstecktes Netzwerk“, dann sucht das Smartphone nach einem Netz, das seinen Namen nicht aussendet. Ältere Geräte unterstützen das weniger zuverlässig, also bitte testen.",
      },
      {
        q: "Funktioniert es bei Hotel-WLAN mit Anmeldeseite?",
        a: "Der Code verbindet das Smartphone mit dem Netzwerk. Eine danach erscheinende Anmeldeseite muss aber weiterhin von Hand ausgefüllt werden.",
      },
    ],
  },

  vcard: {
    title: "vCard QR-Code Generator",
    subtitle: "Ihre Kontaktdaten in einem QR-Code, der direkt im Adressbuch des Smartphones landet.",
    metaTitle: "vCard QR-Code Generator — Kostenlos, ohne Anmeldung",
    metaDescription:
      "Erstellen Sie einen vCard QR-Code mit Name, Telefon, E-Mail, Firma und Website. Ein Scan speichert den Kontakt auf iPhone oder Android. Kostenlos, läuft nie ab.",
    sections: {
      howTitle: "So funktioniert ein vCard QR-Code",
      how: [
        "Der Code enthält eine Kontaktkarte im Format vCard 3.0, das Adressbücher seit Jahrzehnten untereinander austauschen. Ein kurzes Beispiel sieht so aus: BEGIN:VCARD, VERSION:3.0, N:Müller;Anna;;;, ORG:Muster GmbH, TITLE:Geschäftsführerin, TEL;TYPE=CELL:+4915123456789, EMAIL:anna@example.com, END:VCARD, jeweils in einer eigenen Zeile. Geschäftstelefon, Website, Adresse und Notiz kommen nur dazu, wenn Sie sie ausfüllen.",
        "Beim Scannen mit der iPhone-Kamera oder den meisten Android-Kameras erscheint eine Kontaktvorschau mit einer Schaltfläche zum Hinzufügen. Die Person kann die Angaben vor dem Speichern prüfen und bearbeiten. Eine Internetverbindung ist nicht nötig, denn die ganze Karte steckt im Code.",
        "Jedes Feld fügt Zeichen hinzu, und Zeichen bedeuten mehr Kästchen. Eine Karte mit Name, Handynummer und E-Mail bleibt kompakt; eine lange Adresse und eine Notiz können die Dichte verdoppeln.",
      ],
      usesTitle: "Wo er hilft",
      uses: [
        "Auf der Rückseite einer Visitenkarte landet ein neuer Kontakt mit korrekt geschriebenem Namen und fertig formatierter Nummer im Smartphone.",
        "Ein Messe- oder Konferenzausweis trägt einen vCard-Code — schneller als Karten tauschen und Daten nach der Veranstaltung abtippen.",
        "Ein Immobilienmakler setzt einen Code auf Verkaufsschilder und Exposés, damit Interessenten seine Nummer direkt vor dem Haus speichern können.",
        "Am Empfang hängt ein Code für die Notfall-Hotline außerhalb der Geschäftszeiten, den Besucher vor dem Gehen speichern.",
      ],
      tipsTitle: "Tipps vor dem Druck",
      tips: [
        "Weniger Felder ergeben einen weniger dichten Code. Auf einer kleinen Visitenkarte reichen meist Name, Handynummer, E-Mail und Website.",
        "Schreiben Sie Telefonnummern mit Ländervorwahl, z. B. +49 151 23456789, damit sie auch bei Kontakten im Ausland richtig gewählt werden.",
        "Halten Sie die Notiz kurz oder lassen Sie sie leer. Sie ist das Feld, das den Code am ehesten so groß macht, dass er sich auf einer Karte schwer scannen lässt.",
        "Speichern Sie den Kontakt aus Ihrem eigenen Code auf einem iPhone und einem Android-Smartphone und prüfen Sie, ob Namen und Nummern im richtigen Feld landen.",
      ],
    },
    faq: [
      {
        q: "Wird der Kontakt automatisch gespeichert?",
        a: "Nein. Das Smartphone zeigt eine Vorschau, und die Person tippt auf Hinzufügen. Ohne Bestätigung wird nichts gespeichert.",
      },
      {
        q: "Was, wenn sich meine Nummer oder Position ändert?",
        a: "Die Angaben sind fest im Code gespeichert. Erstellen Sie einen neuen Code und aktualisieren Sie Ihre gedruckten Karten.",
      },
      {
        q: "Kann ich der vCard ein Foto hinzufügen?",
        a: "Hier nicht. Ein Foto wäre viel zu groß für einen QR-Code. Bleiben Sie bei Textfeldern.",
      },
      {
        q: "Funktioniert es auf iPhone und Android?",
        a: "Ja. vCard 3.0 wird von der iPhone-Kamera und den meisten Android-Kamera- und Scanner-Apps unterstützt, auch von Google Lens.",
      },
    ],
  },

  email: {
    title: "E-Mail QR-Code Generator",
    subtitle: "Öffnet eine neue E-Mail mit Adresse, Betreff und Nachricht — bereits ausgefüllt.",
    metaTitle: "E-Mail QR-Code Generator — Kostenlos, ohne Anmeldung",
    metaDescription:
      "Erstellen Sie einen E-Mail QR-Code, der eine neue Nachricht mit Empfänger, Betreff und Text öffnet. Ideal für Feedback, Support und Anmeldungen. Kostenlos.",
    sections: {
      howTitle: "So funktioniert ein E-Mail QR-Code",
      how: [
        "Der Code enthält einen üblichen mailto:-Link. Zuerst kommt der Empfänger, dann Betreff und Nachricht als kodierter Text: mailto:support@example.com?subject=Frage%20zur%20Bestellung&body=Guten%20Tag%2C%20meine%20Bestellnummer%20lautet. Leerzeichen werden zu %20, damit jede Mail-App sie gleich liest.",
        "Beim Scannen öffnet das Smartphone die Standard-Mail-App, etwa Mail auf dem iPhone oder Gmail auf Android, mit einem fertigen Entwurf. Die Person kann alles ändern und entscheidet selbst, wann sie sendet. Ist auf dem Gerät keine Mail-App eingerichtet, fragt das System womöglich nach einer App oder zeigt nichts Brauchbares — wichtig für Zielgruppen, die vor allem Webmail nutzen.",
        "Nur das Feld An ist Pflicht. Betreff und Nachricht sind optional, sparen dem Absender aber Zeit und machen eingehende Mails leichter sortierbar.",
      ],
      usesTitle: "Wo er hilft",
      uses: [
        "Eine Karte im Hotelzimmer öffnet eine E-Mail an die Rezeption mit dem Betreff „Zimmerwunsch“, sodass das Team sie schnell zuordnen kann.",
        "Eine Bedienungsanleitung enthält einen Support-Code, der die Modellbezeichnung im Betreff vorausfüllt.",
        "Am Messestand scannen Besucher einen Code und senden eine kurze E-Mail, um sich für den Newsletter einzutragen — mit einer Kopie ihrer Anfrage im Postausgang.",
        "Eine Schule nutzt auf einem Elternbrief einen Code für Rückmeldungen zur Teilnahme, mit dem Klassennamen im Betreff.",
      ],
      tipsTitle: "Tipps vor dem Druck",
      tips: [
        "Wählen Sie einen Betreff, den man später im Gesendet-Ordner wiedererkennt, etwa den Veranstaltungsnamen oder ein Produktmodell.",
        "Formulieren Sie den Text als Anfang, den der Absender ergänzt, z. B. „Meine Bestellnummer lautet“, statt einer langen fertigen Nachricht.",
        "Verwenden Sie eine Adresse, die Sie behalten. Eine persönliche Adresse, die sich ändern könnte, passt schlecht auf Gedrucktes.",
        "Scannen Sie den Code auf einem Smartphone mit einer anderen Mail-App als Ihrer, um zu prüfen, ob Betreff und Text vollständig ankommen.",
      ],
    },
    faq: [
      {
        q: "Wird die E-Mail beim Scannen gesendet?",
        a: "Nein. Es öffnet sich nur ein Entwurf. Die Person prüft ihn und tippt selbst auf Senden.",
      },
      {
        q: "Kann ich Anhänge hinzufügen?",
        a: "Nein. Das mailto:-Format unterstützt keine Anhänge. Sie können aber einen Link zu einer Datei in den Nachrichtentext schreiben.",
      },
      {
        q: "Welche Mail-App öffnet sich?",
        a: "Die App, die das Smartphone standardmäßig für E-Mails verwendet — meist Mail auf dem iPhone und Gmail auf den meisten Android-Geräten.",
      },
      {
        q: "Kann ich Umlaute und Sonderzeichen im Betreff verwenden?",
        a: "Ja. Umlaute, Satzzeichen und andere Schriften werden kodiert, sodass die Mail-App sie korrekt anzeigt.",
      },
    ],
  },

  sms: {
    title: "SMS QR-Code Generator",
    subtitle: "Öffnet eine SMS an Ihre Nummer, in der der Text schon steht.",
    metaTitle: "SMS QR-Code Generator — Kostenlos, ohne Anmeldung",
    metaDescription:
      "Erstellen Sie einen SMS QR-Code, der eine neue SMS mit Ihrer Nummer und vorausgefülltem Text öffnet. Praktisch für Anmeldungen, Buchungen und Stichwörter. Kostenlos.",
    sections: {
      howTitle: "So funktioniert ein SMS QR-Code",
      how: [
        "Der Code nutzt das SMSTO-Format, das Smartphone-Scanner weithin erkennen: SMSTO:+4915123456789:ANMELDEN. Die Nummer wird auf Ziffern und ein führendes Pluszeichen bereinigt, und die Nachricht folgt nach dem zweiten Doppelpunkt genau so, wie Sie sie eingegeben haben.",
        "Beim Scannen öffnen die iPhone-Kamera und die meisten Android-Kameras die Nachrichten-App mit der Nummer im Empfängerfeld und dem Text im Nachrichtenfeld. Ob gesendet wird, entscheidet immer die Person. Es gelten die üblichen SMS-Tarife ihres Anbieters — wichtig, wenn Ihr Publikum auf Reisen ist.",
        "Da die Nachricht als normale SMS verschickt wird, funktioniert das mit jedem Handy mit Mobilfunkvertrag, ohne App und ohne Datenverbindung. Gut geeignet für kurze Stichwörter wie START, STOP oder einen Buchungscode, die ein automatisches System auswerten kann.",
      ],
      usesTitle: "Wo er hilft",
      uses: [
        "Ein Aufsteller an der Ladentheke lädt Kundschaft ein, per SMS-Stichwort Angebote zu abonnieren — schneller als ein Formular.",
        "Ein Parkplatz zeigt einen Code, der die Stellplatznummer an den Betreiber schickt, sodass niemand sie sich merken muss.",
        "Eine Benefizveranstaltung zeigt einen Code, der eine Spenden-SMS mit dem Kampagnen-Stichwort vorbereitet.",
        "Ein Handwerksbetrieb klebt einen Code auf seinen Transporter, damit Interessierte mit dem Wort „Angebot“ um Rückruf bitten können.",
      ],
      tipsTitle: "Tipps vor dem Druck",
      tips: [
        "Geben Sie die Nummer mit Ländervorwahl ein, falls jemand aus dem Ausland den Code scannen könnte.",
        "Beschränken Sie die Nachricht auf ein Stichwort oder einen kurzen Satz. Lange Nachrichten machen den Code dichter und werden eher versehentlich geändert.",
        "Betreiben Sie eine Anmeldeliste, stellen Sie sicher, dass Ihr SMS-Anbieter das gedruckte Stichwort verarbeitet, bevor die Materialien verteilt werden.",
        "Testen Sie auf iPhone und Android. Einige ältere Scanner-Apps öffnen die Nachrichten-App mit der Nummer, lassen den Text aber leer.",
      ],
    },
    faq: [
      {
        q: "Wird die SMS beim Scannen automatisch gesendet?",
        a: "Nein. Das Smartphone bereitet die Nachricht nur vor. Die Person muss auf Senden tippen.",
      },
      {
        q: "Funktioniert es auf dem iPhone?",
        a: "Ja. Die iPhone-Kamera erkennt SMSTO-Codes und öffnet die Nachrichten-App mit Nummer und Text.",
      },
      {
        q: "Kann ich an mehrere Nummern senden?",
        a: "Nein. Ein SMS-Code richtet sich an genau eine Nummer. Für Gruppennachrichten eignet sich eher ein WhatsApp- oder E-Mail-Code.",
      },
      {
        q: "Funktioniert es ohne mobile Daten?",
        a: "Zum Lesen des Codes braucht es keine Verbindung, und SMS laufen über das normale Mobilfunknetz — mobile Daten sind also nicht nötig.",
      },
    ],
  },

  phone: {
    title: "Telefonnummer QR-Code Generator",
    subtitle: "Man ruft Sie per Scan an, ohne Ihre Nummer eintippen zu müssen.",
    metaTitle: "Telefonnummer QR-Code Generator — Kostenlos, ohne Anmeldung",
    metaDescription:
      "Erstellen Sie einen Telefonnummer QR-Code, der die Telefon-App mit Ihrer Nummer öffnet. Ideal für Schilder, Fahrzeuge und Flyer. Statisch, kostenlos, ohne Anmeldung.",
    sections: {
      howTitle: "So funktioniert ein Telefonnummer QR-Code",
      how: [
        "Der Code enthält einen tel:-Link, wie ihn auch ein „Jetzt anrufen“-Button auf einer Website nutzt: tel:+4915123456789. Leerzeichen, Bindestriche und Klammern werden entfernt; nur Ziffern und ein führendes Pluszeichen bleiben.",
        "Beim Scannen zeigt das Smartphone die Nummer an und bietet den Anruf an. Auf dem iPhone erscheint ein Banner in der Kamera-App, auf Android zeigen Kamera oder Google Lens eine Anrufen-Schaltfläche. Das Smartphone wählt nie von selbst; die Person bestätigt immer. Der Code gehört zu den kleinsten überhaupt und lässt sich daher auch klein gedruckt gut scannen.",
        "Da nur Ziffern und Pluszeichen erhalten bleiben, fallen Durchwahlen und Pausen, die als Komma oder „Durchwahl“ geschrieben sind, weg. Brauchen Anrufer eine Durchwahl, drucken Sie sie neben den Code.",
      ],
      usesTitle: "Wo er hilft",
      uses: [
        "Ein Sanitärbetrieb hat einen großen Code auf dem Firmenwagen, sodass jemand im Stau dahinter den Anruf für später festhalten kann, ohne etwas aufzuschreiben.",
        "Ein „Zu verkaufen“-Schild im Autofenster startet einen Anruf beim Verkäufer — sicherer, als im Vorbeigehen eine Nummer zu entziffern.",
        "Die Terminkarte einer Arztpraxis verlinkt auf die Terminhotline und verringert verwählte Anrufe.",
        "Ein Mehrfamilienhaus zeigt im Eingang die Notrufnummer der Hausverwaltung als Code.",
      ],
      tipsTitle: "Tipps vor dem Druck",
      tips: [
        "Schreiben Sie die Nummer international mit + und Ländervorwahl, damit sie auch für Besucher und Handys im Roaming funktioniert.",
        "Drucken Sie die Nummer zusätzlich als Text neben den Code. Manche wählen lieber selbst, und es hilft allen ohne Kamera.",
        "Bemessen Sie den Code bei Fahrzeugen und Außenschildern für die tatsächliche Entfernung: etwa ein Zehntel der Distanz, also 30 cm für jemanden in 3 m Abstand.",
        "Nutzen Sie die SVG-Datei für Folienbeschriftung und große Schilder, damit die Kanten scharf bleiben.",
      ],
    },
    faq: [
      {
        q: "Ruft das Smartphone beim Scannen automatisch an?",
        a: "Nein. Es zeigt die Nummer, und die Person tippt auf Anrufen.",
      },
      {
        q: "Kann ich eine Durchwahl hinzufügen?",
        a: "Nicht im Code. Durchwahlen werden beim Bereinigen der Nummer entfernt, drucken Sie sie daher als Text daneben.",
      },
      {
        q: "Funktioniert es mit Festnetz- und kostenlosen 0800-Nummern?",
        a: "Ja. Jede Nummer, die ein Handy wählen kann, funktioniert — auch kostenlose Servicenummern, sofern der Mobilfunkanbieter des Anrufers den Anruf zulässt.",
      },
      {
        q: "Was, wenn sich meine Nummer ändert?",
        a: "Die Nummer ist im Code gespeichert, daher brauchen Sie einen neuen Code und neue Ausdrucke.",
      },
    ],
  },

  geo: {
    title: "Standort QR-Code Generator",
    subtitle: "Führen Sie Menschen zu einem genauen Punkt auf der Karte — mit einem Code, der die Koordinaten enthält.",
    metaTitle: "Standort QR-Code Generator — Kostenlos, ohne Anmeldung",
    metaDescription:
      "Erstellen Sie aus Breiten- und Längengrad einen Standort QR-Code, der eine Karten-App am genauen Punkt öffnet. Für Eingänge, Wanderparkplätze und Veranstaltungsorte.",
    sections: {
      howTitle: "So funktioniert ein Standort QR-Code",
      how: [
        "Der Code enthält einen geo:-Link mit zwei Zahlen, Breiten- und Längengrad, getrennt durch ein Komma: geo:52.516275,13.377704. Der Breitengrad muss zwischen -90 und 90 liegen, der Längengrad zwischen -180 und 180. Wichtig: Als Dezimaltrennzeichen dient der Punkt, nicht das Komma. Sie können die Werte eintippen oder vor Ort auf „Meinen Standort verwenden“ tippen.",
        "Auf Android öffnet der Scan meist Google Maps oder eine andere Karten-App mit einer Markierung an den Koordinaten, bereit für die Navigation. Auf dem iPhone werden geo:-Links weniger einheitlich unterstützt; je nach iOS-Version und Scanner-App öffnet sich Apple Karten oder es werden nur die Koordinaten angezeigt. Nutzen die meisten Ihrer Besucher ein iPhone, ist ein URL-Code mit einem Google-Maps- oder Apple-Karten-Teilen-Link oft zuverlässiger.",
        "Koordinaten bezeichnen eine Position, keinen Firmeneintrag. Genau das ist der Vorteil: Sie funktionieren auch für Orte ohne Adresse, etwa ein Seitentor, einen Parkplatz oder einen Treffpunkt im Park.",
      ],
      usesTitle: "Wo er hilft",
      uses: [
        "Eine Hochzeitseinladung enthält einen Code zum genauen Eingang eines Guts, das Kartendienste auf der falschen Seite des großen Geländes verorten.",
        "Ein Schild am Wanderweg verlinkt auf die Koordinaten des Wanderparkplatzes — hilfreich, wenn es keine Straßenadresse gibt.",
        "Ein Lieferschein für ein Lager führt Fahrer zur richtigen Laderampe statt zum Haupteingang.",
        "Ein Festivalplan markiert Sanitätszelt oder Fundbüro mit Codes für alle, die die Orientierung verloren haben.",
      ],
      tipsTitle: "Tipps vor dem Druck",
      tips: [
        "Für die Koordinaten halten Sie in Google Maps den Finger lange auf den Punkt (am Computer: Rechtsklick) und kopieren die beiden angezeigten Zahlen.",
        "Fünf Nachkommastellen sind auf etwa einen Meter genau — das reicht völlig. Weitere Stellen machen den Code nur dichter.",
        "Achten Sie auf das Vorzeichen. Orte westlich von Greenwich haben einen negativen Längengrad, Orte südlich des Äquators einen negativen Breitengrad.",
        "Scannen Sie den Code vor dem Druck mit einem iPhone und einem Android-Smartphone, da Karten-Apps ihn unterschiedlich behandeln.",
      ],
    },
    faq: [
      {
        q: "Funktioniert ein Standort QR-Code auf dem iPhone?",
        a: "Teilweise. Android kommt mit geo:-Links gut zurecht, auf dem iPhone hängt es von iOS-Version und Scanner ab. Testen Sie es und nutzen Sie bei überwiegend iPhone-Publikum lieber einen Karten-Teilen-Link in einem URL-Code.",
      },
      {
        q: "Kann ich statt Koordinaten eine Adresse verwenden?",
        a: "Dieser Typ nutzt nur Koordinaten. Für eine Adresse öffnen Sie sie in einer Karten-App, kopieren den Teilen-Link und verwenden den URL-Typ.",
      },
      {
        q: "Braucht man zum Scannen Internet?",
        a: "Zum Lesen der Koordinaten nicht. Für Karte und Navigation schon, es sei denn, die Karten-App hat Offline-Karten heruntergeladen.",
      },
      {
        q: "Wird mein Standort mit jemandem geteilt?",
        a: "Nein. Der Code enthält nur die eingegebenen Koordinaten. „Meinen Standort verwenden“ liest Ihre Position nur im Browser aus, um die Felder zu füllen.",
      },
    ],
  },

  event: {
    title: "Termin QR-Code Generator",
    subtitle: "Bringen Sie Ihren Termin mit einem Scan in fremde Kalender — mit Uhrzeit, Ort und Details.",
    metaTitle: "Termin QR-Code Generator — Kostenlos, ohne Anmeldung",
    metaDescription:
      "Erstellen Sie einen Kalender QR-Code mit Titel, Datum, Uhrzeit, Ort und Notizen. Ein Scan trägt den Termin in den Handykalender ein, inklusive Zeitzonen. Kostenlos.",
    sections: {
      howTitle: "So funktioniert ein Termin QR-Code",
      how: [
        "Der Code enthält einen iCalendar-Termin, das gleiche Format wie Kalendereinladungen: BEGIN:VEVENT, SUMMARY:Produktvorstellung, DTSTART:20261015T170000Z, DTEND:20261015T183000Z, LOCATION:Raum 3, END:VEVENT. Die Zeiten werden aus der Zeitzone Ihres Geräts in UTC umgerechnet, gekennzeichnet durch das Z, sodass jedes Smartphone den Termin in seiner eigenen Ortszeit anzeigt.",
        "Bei ganztägigen Terminen steht das Datum ohne Uhrzeit, als DTSTART;VALUE=DATE:20261015. Das Enddatum zählt in diesem Format nicht mit, daher endet ein eintägiger Termin am 15. Oktober im Code am 16. Oktober; so erwarten es Kalender, und angezeigt wird ein einzelner Tag.",
        "Auf dem iPhone erkennt die Kamera-App den Termin und bietet an, ihn zum Kalender hinzuzufügen. Auf Android hängt das vom Scanner ab: Google Lens und viele Kamera-Apps zeigen eine Option zum Eintragen, einige ältere zeigen nur den Rohtext.",
      ],
      usesTitle: "Wo er hilft",
      uses: [
        "Ein Konzertplakat trägt einen Code, der Datum und Veranstaltungsort speichert, damit Passanten nichts im Kopf behalten müssen.",
        "Ein Schulrundbrief ergänzt Codes für Elternabende, die Uhrzeit und Raum direkt in volle Kalender bringen.",
        "Ein Konferenzprogramm listet für jeden Workshop einen Code, jeweils mit dem Raum im Ortsfeld.",
        "Eine Praxis druckt den nächsten Termin als Code auf die Erinnerungskarte.",
      ],
      tipsTitle: "Tipps vor dem Druck",
      tips: [
        "Prüfen Sie vor dem Erstellen die Zeitzone Ihres Geräts. Die eingegebene Uhrzeit gilt als Ortszeit an Ihrem Standort und wird dann in UTC gespeichert.",
        "Tragen Sie Raum oder vollständige Adresse unter Ort ein; viele Kalender machen daraus einen Kartenlink.",
        "Halten Sie die Beschreibung kurz. Praktische Hinweise wie „Bitte Laptop mitbringen“ passen gut, ein komplettes Programm macht den Code dicht.",
        "Tragen Sie den Termin aus Ihrem eigenen Code ein und prüfen Sie Datum, Uhrzeit und Dauer vor dem Druck.",
      ],
    },
    faq: [
      {
        q: "Stimmt die Uhrzeit für Menschen in anderen Zeitzonen?",
        a: "Ja. Die Zeit wird in UTC gespeichert, daher zeigt jeder Kalender sie in der Ortszeit des Betrachters. Ein Termin um 18 Uhr in Berlin erscheint in London um 17 Uhr.",
      },
      {
        q: "Kann ich den Termin nach dem Druck ändern?",
        a: "Nein. Die Angaben stecken im Code. Ändern sich Zeit oder Ort, erstellen und drucken Sie einen neuen Code.",
      },
      {
        q: "Kann ich einen Serientermin erstellen?",
        a: "Mit diesem Generator nicht. Jeder Code beschreibt einen einzelnen Termin.",
      },
      {
        q: "Wird der Termin automatisch eingetragen?",
        a: "Nein. Das Smartphone zeigt den Termin, und die Person entscheidet, ob sie ihn in ihren Kalender übernimmt.",
      },
    ],
  },

  payment: {
    title: "PayPal & Zahlungslink QR-Code Generator",
    subtitle: "Lassen Sie sich per Scan bezahlen — mit einem Code zu Ihrer PayPal.Me-, Venmo-, Cash-App- oder Trinkgeld-Seite.",
    metaTitle: "PayPal QR-Code Generator — Kostenlos, ohne Anmeldung",
    metaDescription:
      "Erstellen Sie einen PayPal QR-Code für PayPal.Me, dazu Codes für Venmo, Cash App, Ko-fi, Buy Me a Coffee und mehr – optional mit Betrag. Kostenlos, ohne Anmeldung.",
    sections: {
      howTitle: "So funktioniert ein PayPal QR-Code",
      how: [
        "Der Code enthält den öffentlichen Zahlungslink Ihres Kontos. Sie wählen den Dienst, geben Ihren Benutzernamen ein, und der Link wird erstellt. Mit Betrag wird PayPal zu https://paypal.me/ihrname/25.00, Venmo zu https://venmo.com/u/ihrname?txn=pay&amount=25.00 und Cash App zu https://cash.app/$ihrtag/25.00. Links zu Buy Me a Coffee, Ko-fi, Patreon, Revolut.Me und Wise öffnen Ihre Seite ohne Betrag.",
        "Beim Scannen öffnet sich der Link in der Zahlungs-App, falls installiert, sonst im Browser. Die zahlende Person meldet sich bei ihrem eigenen Konto an, prüft Empfänger und Betrag und bestätigt. Der Code selbst enthält keine Karten- oder Bankdaten, nur die Adresse Ihrer öffentlichen Seite.",
        "Diese Website wickelt keine Zahlungen ab, erhebt keine Gebühren und sieht keine Transaktionen. Das Geld fließt vollständig innerhalb des Zahlungsdienstes, zu dessen üblichen Bedingungen und Gebühren.",
      ],
      usesTitle: "Wo er hilft",
      uses: [
        "Ein Marktstand zeigt an der Kasse einen PayPal-Code für Kundschaft ohne Bargeld.",
        "Ein Straßenmusiker legt einen PayPal- oder Ko-fi-Code für Trinkgeld in den Instrumentenkoffer.",
        "Ein Sportverein druckt einen Code mit bereits eingetragenem Mitgliedsbeitrag von 25,00 EUR, damit Eltern den Betrag nicht eintippen müssen.",
        "Eine Freiberuflerin setzt einen Zahlungscode unten auf ihre gedruckte Rechnung.",
      ],
      tipsTitle: "Tipps vor dem Druck",
      tips: [
        "Der Betrag ist optional. Lassen Sie ihn bei Trinkgeld und Spenden leer, damit die zahlende Person selbst wählt; bei festen Preisen tragen Sie ihn ein.",
        "Beträge bestehen aus Ziffern mit höchstens zwei Nachkommastellen und einem Punkt als Trennzeichen, z. B. 12.50 statt 12,50. Die Währung ist die Ihres Kontos (etwa EUR), nicht die des Codes.",
        "Öffnen Sie den Ergebnislink selbst und prüfen Sie, ob Ihr Name und Foto erscheinen. Ein Tippfehler im Benutzernamen könnte Geld an Fremde schicken.",
        "Venmo und Cash App funktionieren nur in den USA (Cash App auch im Vereinigten Königreich), andere Dienste haben eigene Länderbeschränkungen. Wählen Sie den Dienst, den Ihre Kundschaft bereits nutzt — in Deutschland, Österreich und der Schweiz meist PayPal.",
      ],
    },
    faq: [
      {
        q: "Ist es sicher, meinen PayPal QR-Code öffentlich zu zeigen?",
        a: "Der Code enthält nur Ihre öffentliche Zahlungsseite, denselben Link, den Sie auch per Nachricht teilen würden. Damit kann niemand Geld von Ihnen abbuchen.",
      },
      {
        q: "Kann ich den Betrag später ändern?",
        a: "Der Betrag ist Teil des Codes. Zum Ändern erstellen Sie einen neuen Code. Ändern sich die Preise häufig, lassen Sie den Betrag leer.",
      },
      {
        q: "Warum kann ich bei Ko-fi oder Patreon keinen Betrag festlegen?",
        a: "Deren öffentliche Links nehmen keinen vorausgefüllten Betrag an, daher wählt die zahlende Person ihn auf der Seite.",
      },
      {
        q: "Verdient diese Website an den Zahlungen mit?",
        a: "Nein. Der Code öffnet lediglich Ihre Zahlungsseite. Etwaige Gebühren sind die von PayPal, Venmo oder dem jeweiligen Dienst.",
      },
    ],
  },

  crypto: {
    title: "Bitcoin & Krypto QR-Code Generator",
    subtitle: "Teilen Sie eine Wallet-Adresse als QR-Code, der Adresse und Betrag in einer Wallet-App ausfüllt.",
    metaTitle: "Bitcoin & Krypto QR-Code Generator — Kostenlos, ohne Anmeldung",
    metaDescription:
      "Erstellen Sie einen QR-Code für Bitcoin, Ethereum, Litecoin, Dogecoin, Bitcoin Cash oder Solana mit Wallet-Adresse und optionalem Betrag. Statisch und kostenlos.",
    sections: {
      howTitle: "So funktioniert ein Krypto QR-Code",
      how: [
        "Der Code enthält eine Zahlungs-URI, die Wallet-Apps verstehen. Bei Bitcoin folgt sie dem Format BIP-21: bitcoin:bc1qexampleaddress?amount=0.0015&label=Kaffeestand. Das Schema nennt die Währung, dann folgen Ihre Adresse und optional der Betrag in Coins sowie ein kurzes Label mit bis zu 60 Zeichen. Litecoin, Dogecoin, Bitcoin Cash und Solana nutzen dasselbe Muster mit ihrem eigenen Schema.",
        "Bei Ethereum enthält der Code nur ethereum: und die Adresse. Wallets behandeln Ethereum-Beträge unterschiedlich, daher gibt der Absender den Betrag selbst ein.",
        "Der Code ist zum Scannen aus einer Wallet-App heraus gedacht, über deren Scan- oder Senden-Schaltfläche. Auch die Handykamera erkennt ihn unter Umständen und bietet an, eine installierte Wallet zu öffnen. Die Wallet zeigt dann Adresse und Betrag zur Prüfung; gesendet wird erst nach Bestätigung.",
      ],
      usesTitle: "Wo er hilft",
      uses: [
        "Ein Laden, der Bitcoin akzeptiert, zeigt an der Kasse einen Code, damit niemand eine 42-stellige Adresse abtippen muss.",
        "Eine Kreative ergänzt am Ende eines Videos oder in einem gedruckten Heft einen Spendencode für eine Solana- oder Litecoin-Wallet.",
        "Ein Messestand zeigt einen Code mit festem Betrag für Ticket oder Merchandise.",
        "Wer eine Überweisung von einem Freund erwartet, zeigt den Code auf dem Bildschirm, statt die Adresse per Chat zu schicken.",
      ],
      tipsTitle: "Tipps vor dem Druck",
      tips: [
        "Vergleichen Sie die Adresse Zeichen für Zeichen mit Ihrer Wallet. Krypto-Überweisungen lassen sich nicht rückgängig machen; eine falsche Adresse bedeutet verlorenes Geld.",
        "Achten Sie darauf, dass Währung und Wallet zusammenpassen. Wer eine Währung an eine Adresse eines anderen Netzwerks sendet, kann das Geld verlieren.",
        "Beträge werden in Coins angegeben, nicht in Euro, mit bis zu acht Nachkommastellen und einem Punkt als Trennzeichen. Da Kurse schwanken, lassen Sie den Betrag bei langlebigen Drucksachen leer.",
        "Nutzen Sie am besten eine eigene Empfangsadresse. Wer einen öffentlichen Code scannt, kann den Verlauf dieser Adresse in der Blockchain einsehen.",
      ],
    },
    faq: [
      {
        q: "Ist es sicher, meinen Wallet-QR-Code zu teilen?",
        a: "Eine Empfangsadresse zu teilen ist üblich und erlaubt niemandem, Geld aus der Wallet auszugeben. Packen Sie aber niemals einen privaten Schlüssel oder eine Wiederherstellungsphrase in einen QR-Code.",
      },
      {
        q: "Warum gibt es bei Ethereum keine Betragsoption?",
        a: "Ethereum-Wallets lesen Beträge in Zahlungslinks unterschiedlich. Um falsche Beträge zu vermeiden, enthält der Code nur die Adresse.",
      },
      {
        q: "Kann ich Token wie USDT empfangen?",
        a: "Token auf anderen Netzwerken brauchen eigene Wallet- und Netzwerkeinstellungen. Dieser Generator deckt die sechs aufgeführten nativen Coins ab.",
      },
      {
        q: "Welche Wallets können den Code lesen?",
        a: "Die meisten gängigen Wallets lesen das bitcoin:-Zahlungsformat. Ignoriert eine Wallet Betrag oder Label, funktioniert die Adresse trotzdem.",
      },
    ],
  },

  file: {
    title: "PDF QR-Code Generator",
    subtitle: "Verknüpfen Sie einen QR-Code mit einer PDF oder anderen Datei, die Sie über Google Drive, Dropbox oder Ihre Website teilen.",
    metaTitle: "PDF QR-Code Generator — Kostenlos, ohne Anmeldung",
    metaDescription:
      "Erstellen Sie einen QR-Code, der eine PDF, Speisekarte, Broschüre oder Anleitung auf Google Drive, Dropbox oder Ihrer Website öffnet. Statisch, läuft nie ab, kostenlos.",
    sections: {
      howTitle: "So funktioniert ein PDF QR-Code",
      how: [
        "Ein QR-Code kann keine ganze PDF aufnehmen; schon ein kurzes Dokument ist viel größer als die wenigen Kilobyte, die ein Code speichern kann. Stattdessen enthält der Code einen Link zum Speicherort der Datei, etwa https://drive.google.com/file/d/1AbC…/view. Diese Website lädt keine Dateien hoch und hostet keine, daher legen Sie die PDF zuerst online ab.",
        "Laden Sie sie bei Google Drive, Dropbox, OneDrive oder auf Ihre eigene Website hoch, kopieren Sie den Freigabelink und stellen Sie den Zugriff auf „Jeder mit dem Link“. Fügen Sie diesen Link hier ein. Wer den Code scannt, öffnet den Link im Browser, wo sich die PDF ansehen oder herunterladen lässt.",
        "Der Code funktioniert, solange der Link funktioniert. Wird die Datei gelöscht, unter einen neuen Link verschoben oder auf privat gestellt, sehen Nutzer stattdessen eine Fehlermeldung oder eine Anmeldeseite.",
      ],
      usesTitle: "Wo er hilft",
      uses: [
        "Ein Restaurant verlinkt einen Code auf die Speisekarte als PDF und aktualisiert die Datei jede Saison, ohne die Tischaufsteller zu ändern.",
        "Eine Produktverpackung enthält einen Code zur vollständigen Bedienungsanleitung, sodass das gedruckte Faltblatt nur die Sicherheitshinweise braucht.",
        "Ein Verkaufsschild für eine Immobilie öffnet Grundriss und Exposé für alle, die vorbeikommen.",
        "Eine Konferenz verteilt nach dem Vortrag einen einzigen Code für Folien und Handouts.",
      ],
      tipsTitle: "Tipps vor dem Druck",
      tips: [
        "Testen Sie den Link in einem privaten Browserfenster, in dem Sie nicht angemeldet sind. Verlangt er dort eine Anmeldung, ist die Freigabe falsch eingestellt.",
        "Um eine Datei zu aktualisieren, ohne den Link zu ändern, ersetzen Sie sie an Ort und Stelle, statt eine neue Kopie hochzuladen. Die Funktion „Versionen verwalten“ in Google Drive behält denselben Link.",
        "Vermeiden Sie Links mit Ablaufdatum, etwa temporäre Download-Links mancher Dateiübertragungsdienste.",
        "Halten Sie die PDF schlank und auf dem Handybildschirm lesbar. Ein 50-MB-Scan lädt über mobile Daten nur langsam.",
      ],
    },
    faq: [
      {
        q: "Kann ich meine PDF hier hochladen?",
        a: "Nein. Diese Website erstellt nur den Code. Legen Sie die Datei bei Google Drive, Dropbox oder auf Ihrer eigenen Website ab und fügen Sie den Freigabelink ein.",
      },
      {
        q: "Warum sehen Nutzer beim Scannen „Zugriff anfordern“?",
        a: "Die Datei ist nicht öffentlich freigegeben. Stellen Sie die Freigabe auf „Jeder mit dem Link kann ansehen“ um.",
      },
      {
        q: "Kann ich die PDF nach dem Druck des Codes ändern?",
        a: "Ja, solange der Link gleich bleibt. Ersetzen Sie den Dateiinhalt unter derselben Adresse; eine neu hochgeladene Kopie erzeugt einen neuen Link.",
      },
      {
        q: "Funktioniert es auch für andere Dateien als PDFs?",
        a: "Ja. Jede Datei mit teilbarem Link funktioniert, auch Bilder, Präsentationen und Audiodateien. Ob eine Vorschau auf dem Handy erscheint, hängt vom Dateityp ab.",
      },
    ],
  },

  // TODO(i18n): localize — temporary English copy
  pix: {
    title: "Pix QR Code Generator",
    subtitle: "Make a static Pix code with your Pix key, name and an optional amount that any Brazilian bank app can pay in one scan.",
    metaTitle: "Pix QR Code Generator — Static BR Code, Free, No Sign-up",
    metaDescription:
      "Create a static Pix QR code (BR Code) from your Pix key, name, city and an optional amount. Follows the Banco Central standard, made in your browser. Free, no sign-up.",
    sections: {
      howTitle: "How a Pix QR code works",
      how: [
        "The code holds a BR Code: the text format defined by the Banco Central do Brasil for Pix, built on the EMV standard for merchant-presented QR codes. Every item is written as an id, a two-digit length and the value. The merchant account block carries the identifier br.gov.bcb.pix and your Pix key; then come the merchant category 0000, the currency 986 for the real, the optional amount, the country BR, your name (up to 25 letters), your city (up to 15) and the transaction id. A CRC-16 checksum closes the string, so a damaged or edited code is rejected by the bank app rather than paid to the wrong person.",
        "This is a static code, the same kind a bank gives you to print at the till. It does not call an API or a payment service, so the transaction id is set to *** when you leave it empty, exactly as the Banco Central manual shows for static codes. If you type one (letters and digits, up to 25), it travels with the payment and appears in your statement, which helps with reconciliation.",
        "The payer opens their bank or wallet app (Nubank, Itaú, Bradesco, Caixa, PicPay, Mercado Pago and every other Pix participant), chooses Pix and scans. The app looks up the key in the central directory and shows the account holder's registered name, not the name in the code, so the payer can confirm who receives the money. With an amount in the code it is filled in; without one, the payer types it. The same string is also the Pix copia e cola text shown under the form, which you can paste into a message.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "A street vendor or market stall prints a code with no amount, so each customer scans and types what they owe.",
        "A small shop puts a code with a fixed price next to a product, for example a R$ 25.00 lunch plate.",
        "A condominium or club sends a code with the monthly fee and a transaction id such as COTA2026MAR, so payments are easy to match.",
        "A church, school fair or charity shows a donation code on a poster or on the screen of a live stream.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "Phone keys must start with +55, for example +5511912345678. Eleven plain digits are read as a CPF, which is a different key.",
        "Keep the name and city short and without accents. The standard allows 25 and 15 characters, and accents are removed for you; bank apps show the name registered with the key anyway.",
        "Test the code with your own bank app before printing. The app shows the registered name of the key holder; if it is not yours, the key has a typo.",
        "For prices that change, leave the amount empty and write the price next to the code. A code with an amount has to be regenerated every time the price changes.",
      ],
    },
    faq: [
      {
        q: "Is this an official Pix code?",
        a: "It follows the Banco Central do Brasil's BR Code standard for static Pix codes, the same format your bank uses. Any Pix-enabled app reads it. The site is not a payment institution and does not take part in the transfer.",
      },
      {
        q: "Does the code expire?",
        a: "No. A static Pix code works for as long as the key stays registered to your account. If you delete the key or move it to another bank, make a new code.",
      },
      {
        q: "Can I see who paid?",
        a: "Payments arrive in your bank account like any Pix transfer, with the payer's name. Adding a transaction id (txid) to the code helps you tell payments from one code apart from others in your statement.",
      },
      {
        q: "Why does the app show a different name from the one I typed?",
        a: "Bank apps display the name registered with the Pix key in the central directory (DICT) and ignore the name inside the code. The name in the code is still required by the standard, so type yours; the payer will see your registered name.",
      },
    ],
  },

  // TODO(i18n): localize — temporary English copy
  upi: {
    title: "UPI QR Code Generator",
    subtitle: "Turn your UPI ID into a payment QR code that PhonePe, Google Pay, Paytm and every other UPI app can scan.",
    metaTitle: "UPI QR Code Generator — Free, No Sign-up",
    metaDescription:
      "Create a UPI payment QR code from your UPI ID and name, with an optional amount and note. Uses the NPCI upi://pay format, made in your browser. Free, no sign-up.",
    sections: {
      howTitle: "How a UPI QR code works",
      how: [
        "The code holds a UPI deep link in the format published by NPCI: upi://pay?pa=yourid@bank&pn=Your%20Name&am=250.00&cu=INR&tn=Table%204. The pa parameter is your UPI ID (also called a VPA), pn is the payee name shown to the payer, am is the optional amount, cu is always INR and tn is an optional note. Spaces and special characters in the name and note are percent-encoded, so the link is one unbroken string.",
        "Every UPI app in India is required to understand this link, so the same code works in PhonePe, Google Pay, Paytm, BHIM, Amazon Pay and bank apps. The payer opens the app, taps Scan, and the app fills in your UPI ID, the name and the amount if one was set. The payer confirms with their UPI PIN and the money moves between bank accounts in seconds.",
        "This is the static, merchant-presented form of the link. Fields used by payment gateways for dynamic codes, such as a transaction reference, merchant code or signature, are left out on purpose. That keeps the code simple and valid for a personal UPI ID; a registered merchant account works too, since the app only needs the ID.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "A kirana store or tea stall prints a code with no amount, so customers type what they owe after each sale.",
        "A home baker or tailor shares a code with a fixed price in a WhatsApp message or on a flyer.",
        "A housing society or school collects a fee with a code that has the amount and a note such as Maintenance March.",
        "A temple, NGO or college festival displays a donation code on a banner or on screen at an event.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "Check the UPI ID character by character. Common handles include @okaxis, @oksbi, @ybl, @paytm, @ibl and @upi; a wrong letter sends money to someone else or fails.",
        "Type the payee name as it appears in your bank, so the payer sees a name they recognize. The app shows both this name and the verified account holder name.",
        "Leave the amount empty for shops with varying bills. For fixed charges, fill it in so the payer cannot mistype it.",
        "Scan the finished code with two different UPI apps before printing. If one shows the wrong name or amount, fix it now rather than after a hundred copies.",
      ],
    },
    faq: [
      {
        q: "Will this work with PhonePe, Google Pay and Paytm?",
        a: "Yes. The code uses the standard upi://pay link that NPCI requires every UPI app to support, so it works regardless of which app the payer uses or which bank your UPI ID belongs to.",
      },
      {
        q: "Do I need a merchant account?",
        a: "No. A personal UPI ID works. Merchant codes generated by a payment provider can carry extra fields like a merchant category or a signature; this code is the plain form that needs only your UPI ID and name.",
      },
      {
        q: "Does the site process or see the payments?",
        a: "No. The code only contains the link above. The payment happens entirely inside the payer's UPI app and your bank; nothing passes through this site.",
      },
      {
        q: "Can I set the currency or an amount in paise?",
        a: "The currency is always INR, the only one UPI supports. Amounts use up to two decimal places, for example 99.50, so paise are covered.",
      },
    ],
  },

  // TODO(i18n): localize — temporary English copy
  epc: {
    title: "EPC QR Code (GiroCode) Generator",
    subtitle: "Make a SEPA transfer QR code with your IBAN, name and an optional amount that European banking apps fill in automatically.",
    metaTitle: "EPC QR Code / GiroCode Generator — SEPA Transfer, Free, No Sign-up",
    metaDescription:
      "Create an EPC QR code (GiroCode) for a SEPA credit transfer from your IBAN, name, amount and payment reference. Follows the European Payments Council guideline. Free, no sign-up.",
    sections: {
      howTitle: "How an EPC QR code works",
      how: [
        "The code holds a short text defined by the European Payments Council in its guideline EPC069-12 for SEPA credit transfers. It has up to twelve lines separated by line feeds: BCD, the version 002, the character set 1 for UTF-8, the service SCT, the optional BIC, the recipient's name (up to 70 characters), the IBAN, the amount as EUR12.50, a purpose code that is left empty, either a structured creditor reference or a free-text reference (up to 140 characters), and a note to the payer (up to 70). Empty lines at the end are dropped and the whole payload is kept within 331 bytes, as the guideline requires.",
        "Banking apps in Germany and Austria know this format as GiroCode, in the Netherlands and Belgium as EPC QR, in Finland as the payment QR code; it is also supported in Luxembourg, Italy, Estonia, Latvia and Lithuania. The payer opens the app, chooses to scan or photograph a transfer, and the recipient, IBAN, amount and reference appear in the transfer form. The payer checks the details and approves the transfer as usual.",
        "The IBAN is cleaned and verified before the code is built: spaces are removed, letters are capitalized, the length is checked against the country and the check digits are validated with the mod-97 algorithm. A reference that is a valid ISO 11649 creditor reference (RF followed by check digits) is placed in the structured field automatically; any other text goes into the unstructured field.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "A freelancer or small business prints the code on an invoice next to the bank details, so the customer pays without typing the IBAN.",
        "A club or association puts a code with the yearly fee and a reference like Membership 2026 on its letter to members.",
        "A landlord shares a rent code with tenants, with the amount and the reference the bank statement should show.",
        "A charity or parish displays a donation code with no amount on a poster or in a newsletter.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "The BIC is optional for SEPA transfers within the EU since version 002, so leave it empty unless your bank asks for it.",
        "Keep the reference meaningful but short: an invoice number or customer id is what you will search for in your statement later.",
        "Use a dot or a comma for the amount; both are accepted and written as EUR49.90 in the code. Only euro amounts are possible in this format.",
        "Scan the code with your own banking app before printing. If the IBAN or name does not match your account, fix the typo now.",
      ],
    },
    faq: [
      {
        q: "Which banking apps can read this code?",
        a: "Most banking apps in Germany, Austria, the Netherlands, Belgium, Finland and several other SEPA countries, including Sparkasse, Volksbank, Deutsche Bank, Commerzbank, ING, Rabobank, ABN AMRO, Erste Bank and many fintech apps. Support in France and Spain is still limited, so test with the apps your payers use.",
      },
      {
        q: "Is this the same as GiroCode?",
        a: "Yes. GiroCode is the German name for the EPC QR code described in the European Payments Council guideline. Other countries use other names for the same format.",
      },
      {
        q: "Can the payer change the amount or the reference?",
        a: "Yes. The code only pre-fills the transfer form in the payer's app; every field can still be edited before the transfer is approved.",
      },
      {
        q: "Does the code work for instant payments?",
        a: "The code describes a SEPA credit transfer. Whether it is executed as an instant payment depends on the payer's bank and the option they pick in the app, not on the code.",
      },
    ],
  },
};

/** Deutsche Texte für die Anwendungsfall-Seiten (/de/restaurant-menu-qr-code, …). */
export const useCasesDe: Record<UseCaseId, LandingCopy> = {
  restaurant_menu: {
    title: "QR-Code für Speisekarte",
    subtitle: "Ein Code für alle Tische, der Ihre aktuelle Speisekarte auf dem Smartphone der Gäste öffnet.",
    metaTitle: "QR-Code für Speisekarte — Kostenlos, ohne Anmeldung",
    metaDescription:
      "Erstellen Sie einen QR-Code für die Speisekarte Ihres Restaurants, der Ihre Menüseite oder PDF öffnet. Statisch, läuft nie ab, für Tischaufsteller und Fenster.",
    sections: {
      howTitle: "So funktioniert ein Speisekarten-QR-Code",
      how: [
        "Ein Speisekarten-QR-Code enthält nicht die Speisekarte selbst, sondern einen Link, etwa `https://ihrrestaurant.de/speisekarte`, und das Smartphone öffnet, was unter dieser Adresse steht. Der erste Schritt ist daher die Entscheidung, wo die Karte liegt: auf einer Seite Ihrer eigenen Website, als PDF über Google Drive oder Dropbox oder auf der Seite, die Ihnen ein Menü- oder Bestelldienst bereitstellt. Diese Website erstellt nur den Code; sie hostet weder Speisekarten noch Dateien.",
        "Da der Code statisch ist, steht der Link darin ab dem Druck fest. Ändern können Sie aber den Inhalt hinter dem Link. Liegt die Karte unter einer festen Adresse und Sie aktualisieren diese Seite oder ersetzen die PDF an Ort und Stelle, funktionieren alle Tischaufsteller auch nach Preisänderungen und Saisonwechseln weiter. Ändert sich die Adresse selbst, etwa nach einem Wechsel des Menüdienstes, müssen die gedruckten Codes ersetzt werden.",
        "Gäste scannen mit der Handykamera, sehen die Adresse und tippen zum Öffnen — ohne App-Installation. Ein kurzer Link auf Ihrer eigenen Domain wirkt außerdem vertrauenswürdiger als ein langer Link eines Drittanbieters.",
      ],
      usesTitle: "Wo er hilft",
      uses: [
        "Tischaufsteller oder Aufkleber auf jedem Tisch, damit Gäste beim Warten stöbern können, statt sich eine laminierte Karte zu teilen.",
        "Ein Fensteraufkleber neben der Tür, mit dem Passanten Gerichte und Preise schon vor dem Eintreten prüfen können — auch nach Feierabend.",
        "Eine Beilage in der To-go-Tüte oder ein Hinweis auf dem Kassenbon, der zur Karte für die nächste Bestellung von zu Hause führt.",
        "Ein eigener Code an der Theke für die Seite mit Allergenen und Zutaten, auf den das Personal bei Nachfragen verweisen kann.",
      ],
      tipsTitle: "Tipps vor dem Druck",
      tips: [
        "Verwenden Sie eine Adresse, die Sie selbst verwalten, etwa ihredomain.de/speisekarte, und leiten Sie sie dorthin weiter, wo die Karte gerade liegt. Dann bedeutet ein Wechsel des Menüdienstes nicht, alle Tischaufsteller neu zu drucken.",
        "Öffnen Sie die Karte auf dem Handy über mobile Daten, nicht über das Restaurant-WLAN. Eine große PDF aus eingescannten Seiten lädt langsam und ist auf kleinen Bildschirmen schwer lesbar; eine einfache Webseite funktioniert besser.",
        "Halten Sie gedruckte Speisekarten bereit. Manche Gäste haben kein Smartphone, einen leeren Akku oder sehen schlecht — ein QR-Code sollte eine Erleichterung sein, nicht der einzige Weg zur Bestellung.",
        "Stellen Sie Allergeninformationen online genauso deutlich dar wie auf Papier und aktualisieren Sie sie, sobald sich ein Gericht ändert.",
        "Drucken Sie den Code auf Tischaufstellern mindestens 2 bis 3 cm breit. Für das Fenster erstellt „Druckvorlage / PDF“ ein A4-Plakat mit bearbeitbarer Überschrift, etwa „Hier geht’s zur Speisekarte“.",
      ],
    },
    faq: [
      {
        q: "Kann ich meine Speisekarte hier hochladen?",
        a: "Nein. Diese Website erstellt nur den Code. Stellen Sie die Karte auf Ihre Website, geben Sie eine PDF über Google Drive oder Dropbox für „Jeder mit dem Link“ frei oder nutzen Sie den Link Ihres Menüdienstes und fügen Sie diese Adresse hier ein.",
      },
      {
        q: "Brauche ich einen neuen Code, wenn sich die Karte ändert?",
        a: "Nicht, solange die Adresse gleich bleibt. Aktualisieren Sie die Seite oder ersetzen Sie die PDF unter demselben Link, dann zeigen die gedruckten Codes immer die neueste Version.",
      },
      {
        q: "Hört der Code irgendwann auf zu funktionieren?",
        a: "Nein. Es ist ein statischer Code, der Link ist im Bild gespeichert, es gibt also kein Abo, das ausläuft. Er funktioniert, solange die Speisekartenseite online ist.",
      },
      {
        q: "Ein Code für alle Tische oder einer pro Tisch?",
        a: "Ein Code reicht, wenn alle Tische dieselbe Karte sehen. Separate Codes lohnen sich nur, wenn Ihr Bestellsystem jedem Tisch einen eigenen Link gibt; diese Liste können Sie auf der Stapel-Seite in Codes umwandeln, bis zu 200 auf einmal in einer ZIP-Datei.",
      },
    ],
  },

  wedding: {
    title: "QR-Code für die Hochzeit",
    subtitle: "Verknüpfen Sie Einladungen mit Ihrer Hochzeitswebsite oder dem Zusageformular und sammeln Sie Fotos der Feier in einem gemeinsamen Album.",
    metaTitle: "QR-Code für die Hochzeit — Kostenlos, ohne Anmeldung",
    metaDescription:
      "Erstellen Sie einen Hochzeits-QR-Code für Einladungen, Zusageformulare, Anfahrt und ein gemeinsames Fotoalbum. Statische Codes, die nie ablaufen. Kostenlos.",
    sections: {
      howTitle: "So funktioniert ein Hochzeits-QR-Code",
      how: [
        "Ein Hochzeits-QR-Code enthält einen Link, und der Link bestimmt, was Gäste sehen. Auf einer Einladung ist das meist Ihre Hochzeitswebsite oder direkt das Zusageformular, ob mit einem Hochzeitswebsite-Dienst, Google Formulare oder etwas anderem erstellt. Der Gast scannt, die Seite öffnet sich, und er antwortet, ohne eine lange Adresse von der Karte abzutippen.",
        "Das funktioniert auch für den Rest des Tages. Ein Code mit einem Google-Maps- oder Apple-Karten-Link führt Gäste zur Location, und ein Code bei der Feier, der ein geteiltes Album in Google Fotos oder iCloud öffnet, lässt alle ihre Bilder hinzufügen. Jeder Zweck braucht einen eigenen Code, denn ein Code öffnet genau eine Adresse.",
        "Die hier erstellten Codes sind statisch: Der Link steckt im Bild und läuft nie ab, er öffnet sich also auch in Jahren noch, solange die Seite online ist. Die Kehrseite: Der Link lässt sich nach dem Druck nicht austauschen. Legen Sie die Adressen von Website, Formular und Album fest, bevor die Einladungen in den Druck gehen.",
      ],
      usesTitle: "Wo er hilft",
      uses: [
        "Die Rückseite der Einladung oder eine Antwortkarte verlinkt auf das Zusageformular, sodass alle Antworten an einem Ort ankommen statt per SMS, E-Mail und Telefon.",
        "Eine Save-the-Date- oder Infokarte öffnet die Hochzeitswebsite mit Anreise, Unterkünften und Dresscode.",
        "Eine Anfahrtskarte oder ein Willkommensschild öffnet einen Kartenlink zu einer schwer auffindbaren Location, etwa einer Scheune an einem Privatweg.",
        "Tischkarten bei der Feier öffnen ein gemeinsames Fotoalbum, damit Gäste ihre Bilder hochladen, bevor sie es vergessen.",
      ],
      tipsTitle: "Tipps vor dem Druck",
      tips: [
        "Auf einer Einladung sind etwa 2 bis 2,5 cm angenehm für ein Handy in der Hand. Ein kürzerer Link ergibt ein gröberes Muster, das sich in dieser Größe zuverlässiger drucken lässt.",
        "Dunkle Farbe auf Creme-, Elfenbein- oder Kraftpapier lässt sich meist gut scannen; Goldfolie, Pastelltöne und Hellgrau oft nicht. Wählen Sie unter Stil eine dunkle Farbe und testen Sie einen Probedruck auf dem echten Papier.",
        "Halten Sie die Ruhezone, den leeren Rand um den Code, frei von Verzierungen, Rahmen und Illustrationen. Scanner brauchen sie, um den Code zu finden.",
        "Prüfen Sie die Freigaben: Der Albumlink muss Gästen das Hinzufügen von Fotos erlauben, und das Formular muss für alle mit dem Link offen sein, nicht nur für Ihr Konto.",
        "Scannen Sie vor der Bestellung der ganzen Auflage einen Probedruck mit iPhone und Android, senden Sie eine Test-Zusage und bitten Sie jemanden, ein Foto ins Album hochzuladen.",
      ],
    },
    faq: [
      {
        q: "Kann ich das Ziel des Codes nach dem Druck der Einladungen ändern?",
        a: "Den Code selbst nicht, denn er ist statisch. Sie können aber den Inhalt der Seite bearbeiten — aktualisieren Sie also Website oder Formular, statt den Link zu ersetzen.",
      },
      {
        q: "Funktioniert der Code auch nach der Hochzeit noch?",
        a: "Der Code hat kein Ablaufdatum. Er funktioniert, solange Website, Formular oder Album unter dem Link online sind — Gäste können die Fotos also später wieder ansehen, wenn das Album geteilt bleibt.",
      },
      {
        q: "Kann jeder Gast einen persönlichen Zusage-Code bekommen?",
        a: "Wenn Ihr Zusagedienst jedem Gast einen eigenen Link gibt, können Sie die Liste auf der Stapel-Seite in Codes umwandeln, bis zu 200 auf einmal, als ZIP mit PNG-Dateien.",
      },
      {
        q: "Soll ich PNG oder SVG an die Druckerei schicken?",
        a: "Schicken Sie die SVG-Datei an Druckerei oder Gestalter. Sie ist eine Vektordatei und bleibt in jeder Größe scharf. Das PNG eignet sich für die Hochzeitswebsite oder eine Nachricht an die Gäste.",
      },
    ],
  },

  business_card: {
    title: "QR-Code für die Visitenkarte",
    subtitle: "Ein Kontakt-Code auf Ihrer Visitenkarte, der Ihre Daten mit einem Scan im Smartphone speichert.",
    metaTitle: "QR-Code für die Visitenkarte — Kostenlos, ohne Anmeldung",
    metaDescription:
      "Erstellen Sie einen Visitenkarten-QR-Code, der Name, Nummer, E-Mail und Website in den Handykontakten speichert. vCard 3.0, statisch, läuft nie ab. Kostenlos.",
    sections: {
      howTitle: "So funktioniert ein Visitenkarten-QR-Code",
      how: [
        "Ein hier erstellter Visitenkarten-Code enthält eine Kontaktkarte im Format vCard 3.0, das Adressbücher auf dem Smartphone lesen. Beim Scannen zeigt das Handy Ihren Namen, Ihre Firma, Nummer und E-Mail in einer Kontaktvorschau, und ein Tippen fügt sie hinzu. Es muss nichts geladen werden, daher funktioniert es auch in einer Messehalle mit schlechtem Empfang, und Ihr Name wird genau so gespeichert, wie Sie ihn schreiben.",
        "Die Alternative ist ein Code, der auf ein Profil verlinkt, etwa Ihre Website oder Ihr LinkedIn-Profil. Ein Link kann mehr zeigen, und die Seite lässt sich ohne Neudruck aktualisieren — die Nummer muss die Person aber selbst speichern. Ein Kontakt-Code nimmt ihr das ab. Manche nutzen beides: den Kontakt-Code auf der Rückseite und eine kurze Webadresse als Text.",
        "Jedes ausgefüllte Feld wird im Bild gespeichert, der Code wächst also mit den Angaben. Eine Karte mit Name, Firma, Handynummer, E-Mail und Website bleibt kompakt; eine vollständige Anschrift und eine Notiz machen das Muster dichter und im Visitenkartenformat schwerer lesbar.",
      ],
      usesTitle: "Wo er hilft",
      uses: [
        "Netzwerkveranstaltungen und Messen, auf denen Sie Dutzende Karten verteilen und möchten, dass jede im Smartphone landet statt in der Schublade.",
        "Selbstständige und Beraterinnen, die Kunden persönlich treffen und wollen, dass die richtige E-Mail und Nummer gespeichert wird, statt sie von einem Foto der Karte abzuschreiben.",
        "Visitenkarten eines Vertriebsteams, bei denen jede Person einen Code mit ihrer eigenen Durchwahl erhält.",
        "Eine Karte am Empfang, die Besuchern den allgemeinen Kontakt des Büros speichert.",
      ],
      tipsTitle: "Tipps vor dem Druck",
      tips: [
        "Drucken Sie den Code auf einer Standard-Visitenkarte (85 × 55 mm) mindestens 2 cm breit, mit freiem Rand ringsum. Hat er die Rückseite für sich, sind 2,5 bis 3 cm angenehmer.",
        "Beschränken Sie sich auf die Felder, die man braucht: Name, Firma, Handynummer, E-Mail und Website. Lassen Sie Adresse und Notiz leer, sofern sie nicht wichtig sind.",
        "Schreiben Sie Nummern mit Ländervorwahl, z. B. +49 151 23456789, damit sie auch für Kontakte im Ausland funktionieren.",
        "Die Stapel-Seite erstellt Link- und Text-Codes, keine Kontaktkarten. Erstellen Sie für ein Team den Code jeder Person auf dieser Seite und speichern Sie für jedes Kartendesign die SVG-Datei.",
        "Scannen Sie einen Probedruck mit iPhone und Android und prüfen Sie, ob Name, Nummer und E-Mail in den richtigen Feldern landen.",
      ],
    },
    faq: [
      {
        q: "Was passiert, wenn sich meine Nummer oder Position ändert?",
        a: "Die Angaben stehen fest im Code. Erstellen Sie einen neuen Code und drucken Sie die Karten neu — wie beim gedruckten Text auch.",
      },
      {
        q: "Kontakt-Code oder Link zu meiner Website?",
        a: "Ein Kontakt-Code speichert Ihre Daten direkt und funktioniert offline. Ein Link kann zu einer Seite führen, die Sie später aktualisieren. Ändern sich Ihre Daten selten, ist der Kontakt-Code auf einer Visitenkarte die nützlichere Wahl.",
      },
      {
        q: "Kann ich mein Logo hinzufügen?",
        a: "Nicht zum Kontakt selbst, aber Sie können unter Stil ein kleines Logo in die Mitte des Codes setzen. Die Fehlerkorrektur wird dann automatisch auf Maximum gestellt, damit der Code scanbar bleibt.",
      },
      {
        q: "Kann man den Kontakt vor dem Speichern bearbeiten?",
        a: "Ja. Das Smartphone zeigt eine Vorschau, und die Person kann die Angaben vor dem Hinzufügen prüfen und ändern.",
      },
    ],
  },

  google_review: {
    title: "QR-Code für Google-Bewertungen",
    subtitle: "Ein Code, der das Google-Bewertungsformular für Ihr Unternehmen öffnet — für Theke und Kassenbon.",
    metaTitle: "QR-Code für Google-Bewertungen — Kostenlos, ohne Anmeldung",
    metaDescription:
      "Erstellen Sie einen QR-Code, der Ihr Google-Bewertungsformular über Place ID oder Bewertungslink öffnet. Für Thekenaufsteller, Kassenbons und Dankeskarten. Kostenlos.",
    sections: {
      howTitle: "So funktioniert ein QR-Code für Google-Bewertungen",
      how: [
        "Der Code öffnet direkt das Google-Bewertungsformular Ihres Unternehmens, sodass Kunden Sie nicht suchen, den richtigen Eintrag auswählen und den Bewertungsknopf finden müssen. Mit der Plattform „Google-Rezension“ geben Sie Ihre Place ID ein, und der Code enthält `https://search.google.com/local/writereview?placeid=ChIJ…` mit Ihrer ID anstelle der Punkte.",
        "Es gibt zwei Wege, das Feld zu füllen. Der erste ist die Place ID: Suchen Sie Ihr Unternehmen im Place ID Finder von Google, Teil der Dokumentation der Google Maps Platform, und kopieren Sie die ID, die meist mit ChIJ beginnt. Der zweite ist der Bewertungslink aus Ihrem Google-Unternehmensprofil: Öffnen Sie Ihr Profil, wählen Sie die Option, um Rezensionen zu bitten, und kopieren Sie den angezeigten Kurzlink. Ein vollständiger Link, der mit https:// beginnt, wird unverändert übernommen.",
        "Beim Scannen öffnet das Smartphone das Formular in Google Maps oder im Browser. Zum Veröffentlichen muss die Person in einem Google-Konto angemeldet sein; Sterne und Text wählt sie selbst. Der Code ist statisch und enthält nur einen öffentlichen Link, er funktioniert also, solange Ihr Eintrag besteht.",
      ],
      usesTitle: "Wo er hilft",
      uses: [
        "Ein kleiner Aufsteller an der Kasse, wo Kunden beim Bezahlen einen Moment Zeit haben.",
        "Der untere Rand eines gedruckten Kassenbons, den die Kundschaft mit nach Hause nimmt.",
        "Eine Dankeskarte nach einer Lieferung, einem Hotelaufenthalt oder einem Serviceeinsatz, wenn die Arbeit erledigt ist.",
        "Ein A4-Plakat am Ausgang, erstellt mit „Druckvorlage / PDF“, mit einer kurzen, bearbeitbaren Überschrift.",
      ],
      tipsTitle: "Tipps vor dem Druck",
      tips: [
        "Scannen Sie den Code selbst und prüfen Sie, ob das Formular Ihren Firmennamen zeigt. Unternehmen mit ähnlichen Namen in derselben Stadt werden im Place ID Finder leicht verwechselt.",
        "Bitten Sie in einfachen Worten, etwa „Wie war es bei uns? Bewerten Sie uns auf Google“, und platzieren Sie den Code dort, wo Menschen einen ruhigen Moment haben, nicht dort, wo sie hinauseilen.",
        "Die Richtlinien von Google verbieten Rabatte, Geschenke und andere Anreize für Bewertungen. Belassen Sie es auf der Karte bei einer einfachen Bitte.",
        "Fragen Sie alle Kunden auf dieselbe Weise. Google verbietet auch „Review Gating“: nur zufriedene Kunden einzuladen oder unzufriedene zuerst woandershin zu schicken.",
      ],
    },
    faq: [
      {
        q: "Wo finde ich meine Place ID?",
        a: "Nutzen Sie den Place ID Finder in der Maps-Dokumentation von Google: Suchen Sie Ihr Unternehmen und kopieren Sie die angezeigte ID. Alternativ fügen Sie den Bewertungslink aus Ihrem Google-Unternehmensprofil in das Feld ein.",
      },
      {
        q: "Braucht die Kundschaft ein Google-Konto?",
        a: "Ja. Um eine Google-Rezension zu veröffentlichen, muss man in einem Google-Konto angemeldet sein. Lesen können Ihren Eintrag auch Menschen ohne Konto.",
      },
      {
        q: "Darf ich einen Rabatt für eine Bewertung anbieten?",
        a: "Nein. Die Richtlinien von Google verbieten Anreize für Bewertungen, auch Rabatte und Gratisartikel. Eine freundliche Bitte auf einer Karte ist in Ordnung.",
      },
      {
        q: "Funktioniert der Code nicht mehr, wenn ich meinen Firmennamen ändere?",
        a: "Meist schon, denn die Place ID bezieht sich auf den Eintrag, nicht auf den Namen. Laut Google können sich Place IDs in manchen Fällen ändern, etwa beim Zusammenführen von Einträgen — scannen Sie den Code daher nach größeren Änderungen am Profil erneut.",
      },
    ],
  },

  wifi_cafe: {
    title: "WLAN QR-Code für Café, Hotel & Ferienwohnung",
    subtitle: "Gäste verbinden sich mit einem Scan mit Ihrem Gästenetz — per Tischaufsteller, Zimmerkarte oder an der Wohnungstür.",
    metaTitle: "WLAN QR-Code für Café, Hotel & Ferienwohnung — Kostenlos, ohne Anmeldung",
    metaDescription:
      "WLAN QR-Code für Café, Hotel oder Ferienwohnung erstellen. Gäste verbinden sich mit einem Scan auf iPhone oder Android. Für Tischaufsteller und Zimmerkarten. Kostenlos.",
    sections: {
      howTitle: "So funktioniert ein WLAN QR-Code für Gäste",
      how: [
        "In vielen Cafés ist die Frage nach dem WLAN-Passwort die häufigste an der Theke. Ein WLAN-Code beantwortet sie auf Papier: Er enthält Netzwerkname, Passwort und Verschlüsselungstyp in einem kurzen Format, etwa `WIFI:T:WPA;S:Cafe-Gast;P:espresso-2026;;`, und die Handykamera macht daraus die Meldung „Mit Netzwerk verbinden“. Gäste tippen nichts ein — also keine Fehler mehr bei Großbuchstaben oder einer Null, die wie ein O aussieht.",
        "Richten Sie vor dem Erstellen des Codes ein separates Gästenetz ein, sofern Ihr Router oder Ihre Access Points das unterstützen. Das Passwort steht lesbar im Code, und wer einen Tischaufsteller fotografiert, kann es auslesen. Ein Gästenetz hält Kartenterminal, Bürorechner und Überwachungskameras in einem Netz, das Gäste nicht erreichen.",
        "Der Code ist statisch, das Passwort steckt also fest darin. Ändern Sie das Gästepasswort jeden Monat oder nach jedem Aufenthalt, drucken Sie gleichzeitig neue Codes. Hotelnetze mit Anmelde- oder Nutzungsbedingungsseite, einem sogenannten Captive Portal, zeigen diese Seite auch nach dem Verbinden; der Code verbindet mit dem Netz, erledigt aber nicht die Anmeldung.",
      ],
      usesTitle: "Wo er hilft",
      uses: [
        "Tischaufsteller im Café oder Restaurant, damit sich Gäste verbinden, während sie auf ihre Bestellung warten.",
        "Eine Karte in jedem Hotelzimmer oder in der Schlüsselkartenhülle, neben Check-out-Zeit und Frühstückszeiten.",
        "Ein gerahmter Code innen an der Eingangstür der Ferienwohnung oder in der Begrüßungsmappe, für Gäste, die spät ankommen, wenn niemand vor Ort ist.",
        "Ein Coworking-Platz, ein Wartezimmer oder ein Friseurstuhl, wo Besucher lange genug bleiben, um eine Verbindung zu wollen.",
      ],
      tipsTitle: "Tipps vor dem Druck",
      tips: [
        "„Druckvorlage / PDF“ erstellt ein A4-Schild mit der Überschrift „Mit dem WLAN verbinden“ und dem Netzwerknamen, damit auch Menschen ohne Scanner wissen, welches Netz sie wählen sollen. Sie können eine Unterzeile wie „Fragen Sie gern unser Team“ ergänzen.",
        "Geben Sie den Netzwerknamen genau so ein, wie er ausgesendet wird, inklusive Groß- und Kleinschreibung und Zusätzen wie _5G.",
        "Wenn Sie das Passwort wechseln, ersetzen Sie alle gedruckten Codes am selben Tag. Ein veralteter Code zeigt zwar die Verbindungsmeldung, verbindet aber nicht — für Gäste sieht das nach einem kaputten WLAN aus.",
        "Testen Sie den gedruckten Code mit iPhone und Android von dort, wo Gäste tatsächlich sitzen, bei Ihrer echten Beleuchtung.",
      ],
    },
    faq: [
      {
        q: "Ist es sicher, das WLAN-Passwort auf den Tisch zu stellen?",
        a: "Wer den Code scannt oder fotografiert, kann das Passwort lesen. Nutzen Sie daher ein Gästenetz, das von dem Netz Ihrer Geschäftssysteme getrennt ist.",
      },
      {
        q: "Muss ich nach einer Passwortänderung neu drucken?",
        a: "Ja. Das Passwort ist im Code selbst gespeichert, daher braucht jede Passwortänderung einen neuen Code und neue Ausdrucke.",
      },
      {
        q: "Funktioniert es mit einer Hotel-Anmeldeseite?",
        a: "Der Code verbindet das Smartphone mit dem Netzwerk. Zeigt das Netz danach eine Anmelde- oder Bedingungsseite, müssen Gäste diese weiterhin selbst ausfüllen.",
      },
      {
        q: "Kann ich für jedes Zimmer einen Code mit eigenem Passwort erstellen?",
        a: "Ja, einzeln auf dieser Seite. Die Stapel-Seite ist für Listen von Links und Text gedacht und hat keine WLAN-Felder.",
      },
    ],
  },
};
