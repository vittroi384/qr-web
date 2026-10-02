import type { QrType } from "@/lib/qr/types";
import type { LandingCopy, UseCaseId } from "./index";

/** Textes longs en français pour les pages d'atterrissage par type (/wifi-qr-code, …). */
export const landingFr: Record<QrType, LandingCopy> = {
  url: {
    title: "Générateur de QR code URL",
    subtitle: "Transformez n'importe quelle adresse web en QR code qui ouvre la page en un seul scan.",
    metaTitle: "Générateur de QR code URL — Gratuit, sans inscription",
    metaDescription:
      "Créez un QR code qui ouvre n'importe quelle page web. Codes statiques qui n'expirent jamais, générés dans votre navigateur. PNG, SVG ou feuille A4. Gratuit, sans inscription.",
    sections: {
      howTitle: "Comment fonctionne un QR code URL",
      how: [
        "Le code contient l'adresse web elle-même, caractère par caractère. Si vous saisissez example.com/menu, le générateur ajoute https:// pour vous : le code contient donc https://example.com/menu. Quand quelqu'un pointe l'appareil photo de son téléphone vers le code, le téléphone reconnaît le lien et propose de l'ouvrir dans le navigateur. Aucun intermédiaire : pas de service de redirection, pas de compte qui doit rester actif.",
        "Sur iPhone, l'app Appareil photo affiche un bandeau avec l'adresse ; un appui l'ouvre dans Safari. La plupart des téléphones Android font de même via l'appareil photo ou Google Lens. Comme la personne voit l'adresse avant de l'ouvrir, un nom de domaine court et reconnaissable inspire plus confiance qu'une longue suite de paramètres de suivi.",
        "Plus l'adresse est longue, plus le code comporte de carrés. Un lien de 30 caractères donne un motif aéré, facile à scanner ; un lien de 300 caractères avec de nombreux paramètres produit un motif dense qui demande une impression plus grande. Les liens qui commencent par javascript: ou data: sont refusés, car un scan ne doit jamais exécuter de code.",
      ],
      usesTitle: "Exemples d'utilisation",
      uses: [
        "Un restaurant imprime le code sur des chevalets de table : les clients ouvrent la carte en ligne sans attendre un menu papier.",
        "Une vitrine affiche un code qui mène aux horaires et à la commande en ligne, pratique pour les passants après la fermeture.",
        "Une étiquette produit renvoie vers le guide d'installation ou la page de garantie, ce qui permet de garder une notice imprimée courte.",
        "Un intervenant place un code sur sa dernière diapositive pour ouvrir les notes de sa présentation : personne n'a à recopier une URL affichée à l'écran.",
      ],
      tipsTitle: "Conseils avant d'imprimer",
      tips: [
        "Le code est statique : si l'adresse change, il faut un nouveau code. Faites-le pointer vers une page que vous maîtrisez, comme votredomaine.fr/menu, pour pouvoir modifier son contenu sans réimprimer.",
        "Supprimez les paramètres de suivi inutiles. Un lien plus court donne un motif plus net, qui se scanne plus vite à distance.",
        "En règle générale, le code doit mesurer au moins un dixième de la distance de lecture : environ 2 cm pour un support tenu en main, 30 cm pour une affiche lue à 3 m.",
        "Ouvrez le lien sur votre propre téléphone après l'enregistrement. Une faute de frappe dans l'adresse est la cause la plus fréquente d'un code imprimé qui ne fonctionne pas.",
      ],
    },
    faq: [
      {
        q: "Un QR code URL expire-t-il ?",
        a: "Non. L'adresse est stockée dans l'image : le code fonctionne tant que la page web est en ligne. Ce site n'a même pas besoin d'exister pour que le code continue de marcher.",
      },
      {
        q: "Puis-je modifier le lien après l'impression ?",
        a: "Pas dans le code lui-même, puisqu'il est statique. Vous pouvez en revanche modifier le contenu de la page liée ou mettre en place une redirection sur votre propre site.",
      },
      {
        q: "Dois-je saisir https:// ?",
        a: "Non. Si vous l'omettez, https:// est ajouté automatiquement. Ne saisissez http:// que si votre site ne prend vraiment pas en charge HTTPS.",
      },
      {
        q: "Puis-je savoir combien de personnes ont scanné le code ?",
        a: "Pas ici. Le code ouvre directement votre page : les scans ne sont comptés que si les statistiques de votre site enregistrent la visite. Ajouter un paramètre de campagne comme ?utm_source=affiche au lien permet de distinguer ces visites.",
      },
    ],
  },

  social: {
    title: "Générateur de QR code réseaux sociaux",
    subtitle: "Saisissez un nom d'utilisateur et obtenez un code qui ouvre votre profil Instagram, TikTok, YouTube et plus.",
    metaTitle: "Générateur de QR code réseaux sociaux — Gratuit, sans inscription",
    metaDescription:
      "Créez un QR code pour votre profil Instagram, TikTok, YouTube, LinkedIn ou Linktree à partir d'un simple nom d'utilisateur. Statique, sans expiration, gratuit et sans inscription.",
    sections: {
      howTitle: "Comment fonctionne un QR code réseaux sociaux",
      how: [
        "Vous choisissez une plateforme et saisissez votre nom d'utilisateur ; le générateur construit l'adresse de profil standard pour vous. Le compte Instagram @boulangeriedupont devient https://www.instagram.com/boulangeriedupont/, un identifiant YouTube devient https://www.youtube.com/@chaine, et un identifiant de profil LinkedIn devient https://www.linkedin.com/in/identifiant-profil/. Le @ initial est retiré lorsque la plateforme ne l'utilise pas dans l'adresse, et les espaces ou barres obliques sont supprimés.",
        "Si vous avez déjà le lien du profil, collez-le : la plateforme est reconnue automatiquement. Au scan, le téléphone voit un lien https ordinaire. Si l'application est installée, iOS et Android lui transmettent généralement le lien et le profil s'ouvre dans l'app ; sinon, il s'ouvre dans le navigateur.",
        "Certaines plateformes utilisent des codes plutôt que des noms : Discord demande un code d'invitation, Avis Google un Place ID et Spotify un identifiant d'artiste. Le texte d'exemple de chaque champ indique quoi saisir.",
      ],
      usesTitle: "Exemples d'utilisation",
      uses: [
        "Un café ajoute un code Instagram sur le ticket de caisse : les clients s'abonnent sans chercher un nom qui a trois homonymes.",
        "Un musicien place un code d'artiste Spotify sur son stand de merchandising et un code Linktree sur ses flyers pour tout le reste.",
        "Un commerce de quartier sollicite des avis avec un code Avis Google sur le comptoir, qui ouvre directement le formulaire d'avis.",
        "Une personne en recherche d'emploi imprime un code LinkedIn sur son CV ou son badge lors des salons de recrutement.",
      ],
      tipsTitle: "Conseils avant d'imprimer",
      tips: [
        "Vérifiez le nom d'utilisateur en ouvrant le lien affiché dans la ligne de résultat avant d'enregistrer. Une seule lettre manquante peut mener au compte de quelqu'un d'autre.",
        "Pour Discord, créez une invitation sans expiration : l'invitation par défaut cesse de fonctionner au bout de sept jours, et le code imprimé avec elle.",
        "Si vous risquez de renommer votre compte, un code vers une page Linktree ou votre propre site résiste mieux au changement qu'un lien direct vers le profil.",
        "Placez le nom ou le logo de la plateforme à côté du code pour que l'on sache ce qui va s'ouvrir avant de scanner.",
      ],
    },
    faq: [
      {
        q: "Le code ouvre-t-il l'application ou le site web ?",
        a: "Il contient un lien de profil classique. Sur la plupart des téléphones, le lien s'ouvre dans l'application si elle est installée, et dans le navigateur sinon.",
      },
      {
        q: "Que se passe-t-il si je change de nom d'utilisateur ?",
        a: "Le code continue de pointer vers l'ancienne adresse, qui peut cesser de fonctionner ou être reprise par quelqu'un d'autre. Créez un nouveau code après le changement.",
      },
      {
        q: "Puis-je mettre plusieurs profils dans un seul code ?",
        a: "Non, un code ouvre une seule adresse. Utilisez une page de liens comme Linktree et créez un code pour cette page.",
      },
      {
        q: "Où trouver un Place ID Google ?",
        a: "Google propose un outil Place ID Finder dans la documentation de Google Maps. Recherchez-y votre établissement et copiez l'identifiant qui commence par ChIJ.",
      },
      {
        q: "Mon profil reste-t-il privé si je crée un code ?",
        a: "Le code ne contient que l'adresse publique du profil. Ce que les gens voient après le scan dépend des paramètres de confidentialité de votre compte.",
      },
    ],
  },

  whatsapp: {
    title: "Générateur de QR code WhatsApp",
    subtitle: "Permettez à vos clients de démarrer une discussion WhatsApp avec vous en un scan, avec un message déjà rédigé si vous le souhaitez.",
    metaTitle: "Générateur de QR code WhatsApp — Gratuit, sans inscription",
    metaDescription:
      "Créez un QR code WhatsApp qui ouvre une discussion avec votre numéro et un message pré-rempli. Fonctionne sur iPhone et Android, n'expire jamais. Gratuit et sans inscription.",
    sections: {
      howTitle: "Comment fonctionne un QR code WhatsApp",
      how: [
        "Le code utilise le lien officiel « click to chat » de WhatsApp. Votre numéro est réduit à ses seuls chiffres, sans le signe plus, les espaces ni le zéro initial, et le message éventuel est ajouté sous forme de texte encodé pour URL : https://wa.me/33612345678?text=Bonjour%2C%20je%20voudrais%20r%C3%A9server%20une%20table.",
        "Au scan, le téléphone ouvre le lien, WhatsApp démarre et une discussion avec votre numéro s'affiche, le message en attente dans la zone de saisie. Rien n'est envoyé avant que la personne appuie sur Envoyer : elle peut donc le modifier. Si WhatsApp n'est pas installé, le lien ouvre une page web qui propose de le télécharger ou d'utiliser WhatsApp Web.",
        "Le numéro doit inclure l'indicatif du pays, car wa.me n'a aucun moyen de le deviner. Le générateur accepte de 7 à 15 chiffres, ce qui couvre les numéros internationaux. Un compte WhatsApp Business fonctionne exactement comme un compte personnel.",
      ],
      usesTitle: "Exemples d'utilisation",
      uses: [
        "Un salon de coiffure imprime un code sur sa carte de visite avec le message « Je souhaite prendre rendez-vous » : les demandes arrivent toujours sous la même forme.",
        "Un vendeur en ligne ajoute un code sur le bon de livraison pour les questions sur la commande, plus simple que de chercher une adresse de service client.",
        "Un guide touristique affiche un code au point de rendez-vous pour que le groupe puisse le joindre le jour même.",
        "Un propriétaire glisse un code dans le livret d'accueil du logement pour les demandes d'entretien.",
      ],
      tipsTitle: "Conseils avant d'imprimer",
      tips: [
        "Écrivez le numéro au format international, par exemple +33 6 12 34 56 78, et non 06 12 34 56 78. Le zéro initial est retiré, mais l'indicatif du pays ne peut pas être ajouté à votre place.",
        "Gardez un message pré-rempli court et précis, comme une demande de réservation ou une invitation à indiquer un numéro de commande. Un long message rend le code plus dense.",
        "Scannez vous-même le code terminé et vérifiez que la discussion s'ouvre avec le bon nom. Un chiffre erroné envoie les gens chez un inconnu.",
        "Si vous changez de numéro, le code imprimé continuera d'ouvrir l'ancien : prévoyez une réimpression.",
      ],
    },
    faq: [
      {
        q: "Cela fonctionne-t-il si la personne n'a pas enregistré mon numéro ?",
        a: "Oui. C'est tout l'intérêt du lien wa.me : la discussion s'ouvre sans avoir à vous ajouter d'abord aux contacts.",
      },
      {
        q: "Le message est-il envoyé automatiquement ?",
        a: "Non. Il apparaît dans la zone de texte, et la personne décide de l'envoyer tel quel, de le modifier ou de l'effacer.",
      },
      {
        q: "Cela fonctionne-t-il avec WhatsApp Business ?",
        a: "Oui. Utilisez le numéro enregistré sur votre compte WhatsApp Business.",
      },
      {
        q: "Pourquoi mon code n'ouvre-t-il pas de discussion ?",
        a: "La cause la plus fréquente est un indicatif de pays absent ou erroné. Vérifiez que le numéro dans la ligne de résultat commence par l'indicatif de votre pays, sans zéro supplémentaire juste après.",
      },
    ],
  },

  text: {
    title: "Générateur de QR code texte",
    subtitle: "Placez une note, un code ou un court message dans un QR code qui affiche le texte au scan.",
    metaTitle: "Générateur de QR code texte — Gratuit, sans inscription",
    metaDescription:
      "Encodez du texte brut dans un QR code : notes, numéros de série, consignes ou courts messages. Aucun lien ni connexion Internet nécessaire pour le lire. Gratuit, statique, sans inscription.",
    sections: {
      howTitle: "Comment fonctionne un QR code texte",
      how: [
        "Un code texte contient exactement les caractères que vous saisissez, sans préfixe ni lien. Le scanner ne demande pas de connexion Internet : le texte est lu directement dans le motif. Il convient donc aux lieux sans réseau, ou aux informations qui ne doivent pas dépendre d'un site web toujours en ligne.",
        "Ce que fait le téléphone d'un texte brut varie. De nombreux lecteurs Android et Google Lens affichent le texte avec un bouton Copier. L'app Appareil photo de l'iPhone peut l'afficher dans un bandeau ou proposer une recherche, selon la version d'iOS. Si vous voulez que les gens ouvrent une page, choisissez plutôt un code URL ; s'ils doivent lire une phrase, le texte est le bon choix.",
        "La capacité est la principale limite. Les lettres accentuées, les écritures asiatiques et les emoji occupent chacun deux à quatre octets : ils remplissent le code plus vite que des lettres sans accent. En pratique, quelques centaines de caractères se scannent encore sans difficulté ; si le contenu devient trop long, l'aperçu vous le signale.",
      ],
      usesTitle: "Exemples d'utilisation",
      uses: [
        "Un atelier étiquette son matériel avec des codes contenant le numéro de série et la date de la dernière révision, lisibles même dans un sous-sol sans réseau.",
        "Un enseignant cache la réponse d'une énigme dans un code sur la fiche d'exercices : les élèves vérifient leur travail quand ils sont prêts.",
        "Un entrepôt imprime les emplacements ou références de pièces sous forme de codes texte lisibles par n'importe quel téléphone, sans logiciel spécial.",
        "Une étiquette cadeau porte un court message personnel qui apparaît quand le destinataire la scanne.",
      ],
      tipsTitle: "Conseils avant d'imprimer",
      tips: [
        "Restez bref. Chaque phrase supplémentaire rapetisse les carrés, et de petits carrés exigent une impression plus grande et un meilleur éclairage.",
        "Si l'aperçu indique que le contenu est trop long, réglez la correction d'erreur sur Standard dans Style, ou placez le texte sur une page web et utilisez un code URL.",
        "N'utilisez pas de code texte pour des secrets. Toute personne qui le scanne peut en lire chaque caractère.",
        "Testez avec un iPhone et un téléphone Android, car le texte brut s'affiche différemment sur chacun.",
      ],
    },
    faq: [
      {
        q: "Combien de texte peut contenir un QR code ?",
        a: "Le format permet environ 2 300 caractères de texte simple sans accents avec la correction d'erreur par défaut, mais au-delà de quelques centaines de caractères, le code devient difficile à scanner avec un téléphone. Les caractères accentués et non latins prennent plus de place.",
      },
      {
        q: "Faut-il Internet pour lire le texte ?",
        a: "Non. Le texte est stocké dans l'image elle-même : n'importe quel lecteur peut le lire hors connexion.",
      },
      {
        q: "Puis-je utiliser des retours à la ligne ?",
        a: "Oui. Les retours à la ligne font partie du texte, même si certaines applications de lecture les affichent comme des espaces.",
      },
      {
        q: "Pourquoi mon iPhone n'affiche-t-il pas bien le texte ?",
        a: "L'app Appareil photo de l'iPhone est surtout conçue pour les liens et les actions. Pour du texte brut, essayez le Scanner de code du Centre de contrôle ou une application de lecture, qui affiche le texte complet.",
      },
    ],
  },

  wifi: {
    title: "Générateur de QR code WiFi",
    subtitle: "Vos invités se connectent à votre Wi-Fi en un scan, sans avoir à dicter ni saisir le mot de passe.",
    metaTitle: "Générateur de QR code WiFi — Gratuit, sans inscription",
    metaDescription:
      "Créez un QR code WiFi qui connecte iPhone et Android à votre réseau en un scan. Compatible WPA/WPA2/WPA3, WEP et réseaux masqués. Gratuit, sans inscription.",
    sections: {
      howTitle: "Comment fonctionne un QR code WiFi",
      how: [
        "Le code enregistre les informations de votre réseau dans un format court et largement reconnu : WIFI:T:WPA;S:CafeInvites;P:soleil-du-midi-42;;. T indique le type de sécurité (WPA, WEP ou nopass pour un réseau ouvert), S le nom du réseau et P le mot de passe. Pour un réseau masqué, H:true; est ajouté. Les caractères qui ont un sens particulier dans ce format, comme le point-virgule, les deux-points, la virgule, les guillemets ou la barre oblique inverse, sont échappés par une barre oblique inverse : les mots de passe qui en contiennent fonctionnent donc quand même.",
        "Sur iPhone (iOS 11 et versions ultérieures), pointer l'app Appareil photo vers le code affiche une invite « Rejoindre le réseau ». La plupart des téléphones Android à partir d'Android 10 proposent la même chose via l'appareil photo, Google Lens ou l'écran des paramètres Wi-Fi, qui possède son propre bouton de scan QR. Le téléphone se connecte directement ; aucune application ni accès Internet n'est nécessaire pour lire le code.",
        "L'option WPA couvre les réseaux WPA, WPA2 et WPA3. Ne choisissez WEP que pour de très vieux routeurs.",
      ],
      usesTitle: "Exemples d'utilisation",
      uses: [
        "Un chevalet de table dans un café permet aux clients de se connecter en attendant leur commande, et le personnel n'a plus à épeler le mot de passe au comptoir.",
        "Une location saisonnière encadre le code près de la porte d'entrée : les nouveaux voyageurs se connectent même quand l'hôte est injoignable.",
        "Une salle de réunion affiche au mur le code du réseau invités pour les visiteurs qui viennent avec leur ordinateur et leur téléphone.",
        "À la maison, un code sur le frigo vous évite de chercher l'étiquette de la box à chaque visite d'amis.",
      ],
      tipsTitle: "Conseils avant d'imprimer",
      tips: [
        "Si vous changez le mot de passe Wi-Fi, le code imprimé ne fonctionne plus. Créez un nouveau code et remplacez les anciennes impressions en même temps.",
        "Utilisez un réseau invités séparé si votre box ou routeur le permet. Toute personne qui photographie le code peut y lire le mot de passe.",
        "Saisissez le nom du réseau exactement tel qu'il apparaît, majuscules et suffixe _5G compris. Les noms sont sensibles à la casse.",
        "La feuille à imprimer ajoute le titre « Connectez-vous au Wi-Fi » et le nom du réseau, pour que les personnes qui ne peuvent pas scanner puissent le saisir à la main.",
      ],
    },
    faq: [
      {
        q: "Un QR code WiFi fonctionne-t-il sur iPhone ?",
        a: "Oui. Depuis iOS 11, l'app Appareil photo reconnaît les codes Wi-Fi et propose de rejoindre le réseau.",
      },
      {
        q: "Puis-je changer le mot de passe plus tard sans réimprimer ?",
        a: "Non. Le mot de passe est stocké dans le code, qui est statique. Après un changement de mot de passe, il faut générer et imprimer un nouveau code.",
      },
      {
        q: "Mon mot de passe Wi-Fi est-il stocké sur votre serveur ?",
        a: "Le code est généré dans votre navigateur. Lorsque vous enregistrez, copiez ou imprimez, ce que vous avez saisi peut être journalisé comme décrit dans la Politique de confidentialité, mais les mots de passe Wi-Fi sont toujours masqués avant stockage.",
      },
      {
        q: "Cela fonctionne-t-il pour les réseaux masqués ?",
        a: "Oui. Cochez Réseau masqué : le code indique au téléphone de chercher un réseau qui ne diffuse pas son nom. La prise en charge des réseaux masqués est moins fiable sur les anciens téléphones, testez donc le code.",
      },
      {
        q: "Cela fonctionne-t-il avec un réseau d'hôtel à page de connexion ?",
        a: "Le code connecte le téléphone au réseau, mais la page de connexion qui s'affiche ensuite doit toujours être remplie à la main.",
      },
    ],
  },

  vcard: {
    title: "Générateur de QR code vCard",
    subtitle: "Placez vos coordonnées dans un QR code qui les enregistre directement dans le carnet d'adresses du téléphone.",
    metaTitle: "Générateur de QR code vCard — Gratuit, sans inscription",
    metaDescription:
      "Créez un QR code vCard avec votre nom, téléphone, e-mail, entreprise et site web. Un scan enregistre le contact sur iPhone ou Android. Gratuit, sans expiration, sans inscription.",
    sections: {
      howTitle: "Comment fonctionne un QR code vCard",
      how: [
        "Le code contient une fiche contact au format vCard 3.0, le format qu'utilisent les carnets d'adresses depuis des décennies. Un exemple court ressemble à ceci : BEGIN:VCARD, VERSION:3.0, N:Martin;Claire;;;, ORG:Boulangerie Dupont, TITLE:Gérante, TEL;TYPE=CELL:+33612345678, EMAIL:claire@example.com, END:VCARD, chaque élément sur sa propre ligne. Le téléphone pro, le site web, l'adresse et la note ne sont ajoutés que si vous les remplissez.",
        "Scanné avec l'app Appareil photo de l'iPhone ou la plupart des appareils photo Android, il affiche un aperçu du contact avec un bouton pour l'ajouter. La personne peut vérifier et modifier les informations avant d'enregistrer. Aucune connexion Internet n'est nécessaire : toute la fiche se trouve dans le code.",
        "Chaque champ ajoute des caractères, et chaque caractère ajoute des carrés. Une fiche avec nom, mobile et e-mail reste compacte ; ajouter une longue adresse et une note peut doubler la densité.",
      ],
      usesTitle: "Exemples d'utilisation",
      uses: [
        "Une carte de visite porte un code au verso : le nouveau contact arrive dans le téléphone avec le nom bien orthographié et le numéro déjà formaté.",
        "Un badge de salon professionnel inclut un code vCard, plus rapide que d'échanger des cartes et de recopier les informations après l'événement.",
        "Un agent immobilier ajoute un code sur ses panneaux et flyers : les acheteurs enregistrent son numéro devant la maison.",
        "Un accueil affiche un code pour la ligne d'assistance en dehors des heures d'ouverture, que les visiteurs enregistrent avant de partir.",
      ],
      tipsTitle: "Conseils avant d'imprimer",
      tips: [
        "Moins de champs, c'est un code moins dense. Sur une petite carte de visite, le nom, le mobile, l'e-mail et le site web suffisent généralement.",
        "Écrivez les numéros avec l'indicatif du pays, comme +33 6 12 34 56 78, pour qu'ils fonctionnent aussi pour vos contacts à l'étranger.",
        "Laissez la note courte ou vide. C'est le champ qui risque le plus de rendre le code trop dense pour être scanné sur une carte.",
        "Enregistrez le contact depuis votre propre code sur un iPhone et un téléphone Android, et vérifiez que noms et numéros arrivent dans les bons champs.",
      ],
    },
    faq: [
      {
        q: "Le contact s'enregistre-t-il automatiquement ?",
        a: "Non. Le téléphone affiche un aperçu et la personne appuie pour l'ajouter. Rien n'est enregistré sans sa confirmation.",
      },
      {
        q: "Et si mon numéro ou mon poste change ?",
        a: "Les informations sont figées dans le code. Créez un nouveau code et mettez à jour vos cartes imprimées.",
      },
      {
        q: "Puis-je ajouter une photo à la vCard ?",
        a: "Pas ici. Une photo serait bien trop volumineuse pour un QR code. Limitez-vous aux champs texte.",
      },
      {
        q: "Cela fonctionne-t-il sur iPhone et Android ?",
        a: "Oui. Le format vCard 3.0 est pris en charge par l'app Appareil photo de l'iPhone et par la plupart des applications photo et de lecture Android, dont Google Lens.",
      },
    ],
  },

  email: {
    title: "Générateur de QR code e-mail",
    subtitle: "Ouvrez un nouvel e-mail avec l'adresse, l'objet et le message déjà remplis.",
    metaTitle: "Générateur de QR code e-mail — Gratuit, sans inscription",
    metaDescription:
      "Créez un QR code e-mail qui ouvre un nouveau message avec le destinataire, l'objet et le texte pré-remplis. Idéal pour les avis, le support et les inscriptions. Gratuit, sans inscription.",
    sections: {
      howTitle: "Comment fonctionne un QR code e-mail",
      how: [
        "Le code contient un lien mailto: standard. Le destinataire vient en premier, puis l'objet et le message sous forme de texte encodé : mailto:support@example.com?subject=Question%20commande&body=Bonjour%2C%20mon%20num%C3%A9ro%20de%20commande%20est. Les espaces deviennent %20 et les lettres accentuées sont encodées, pour que toutes les applications de messagerie les lisent de la même façon.",
        "Au scan, le téléphone ouvre son application de messagerie par défaut, comme Mail sur iPhone ou Gmail sur Android, avec un nouveau brouillon prêt. La personne peut en modifier chaque partie et décide quand l'envoyer. Si aucune messagerie n'est configurée sur le téléphone, le système peut demander quelle application utiliser ou n'afficher rien d'utile : gardez-le à l'esprit si votre public utilise surtout un webmail.",
        "Seul le champ Destinataire est obligatoire. L'objet et le message sont facultatifs, mais ils font gagner du temps à l'expéditeur et facilitent le tri des e-mails reçus.",
      ],
      usesTitle: "Exemples d'utilisation",
      uses: [
        "Une carte dans une chambre d'hôtel ouvre un e-mail à la réception avec l'objet « Demande chambre », pour que le personnel le traite rapidement.",
        "Une notice de produit inclut un code d'assistance qui pré-remplit le nom du modèle dans l'objet.",
        "Sur un stand, les visiteurs scannent et envoient un e-mail d'une ligne pour s'inscrire à une newsletter, et gardent une copie de leur demande.",
        "Une école utilise un code sur une circulaire pour que les parents répondent au sujet de la présence de leur enfant, avec le nom de la classe dans l'objet.",
      ],
      tipsTitle: "Conseils avant d'imprimer",
      tips: [
        "Choisissez un objet que les gens reconnaîtront plus tard dans leurs messages envoyés, comme le nom de l'événement ou un modèle de produit.",
        "Rédigez le message comme une phrase à compléter, par exemple « Mon numéro de commande est », plutôt qu'un long message déjà fini.",
        "Utilisez une adresse durable. Une adresse personnelle susceptible de changer convient mal à un support imprimé.",
        "Scannez le code sur un téléphone qui utilise une autre messagerie que la vôtre pour vérifier que l'objet et le message arrivent intacts.",
      ],
    },
    faq: [
      {
        q: "Le scan envoie-t-il l'e-mail ?",
        a: "Non. Il ouvre seulement un brouillon. La personne le relit et appuie elle-même sur Envoyer.",
      },
      {
        q: "Puis-je ajouter des pièces jointes ?",
        a: "Non. Le format mailto: ne prend pas en charge les pièces jointes. Vous pouvez inclure un lien vers un fichier dans le texte du message.",
      },
      {
        q: "Quelle application de messagerie s'ouvre ?",
        a: "Celle que le téléphone utilise par défaut pour les e-mails, généralement Mail sur iPhone et Gmail sur la plupart des téléphones Android.",
      },
      {
        q: "Puis-je utiliser des caractères spéciaux dans l'objet ?",
        a: "Oui. Les lettres accentuées, la ponctuation et les autres alphabets sont encodés pour que l'application de messagerie les affiche correctement.",
      },
    ],
  },

  sms: {
    title: "Générateur de QR code SMS",
    subtitle: "Ouvrez un SMS vers votre numéro avec le texte déjà saisi.",
    metaTitle: "Générateur de QR code SMS — Gratuit, sans inscription",
    metaDescription:
      "Créez un QR code SMS qui ouvre un nouveau message avec votre numéro et un texte pré-rempli. Utile pour les inscriptions, réservations et réponses par mot-clé. Gratuit, sans inscription.",
    sections: {
      howTitle: "Comment fonctionne un QR code SMS",
      how: [
        "Le code utilise le format SMSTO, largement reconnu par les lecteurs des téléphones : SMSTO:+33612345678:INSCRIPTION. Le numéro est nettoyé pour ne garder que les chiffres et le signe plus initial, et le message suit le second deux-points exactement tel que vous l'avez saisi.",
        "Au scan, l'app Appareil photo de l'iPhone et la plupart des appareils photo Android ouvrent l'application Messages avec le numéro dans le champ destinataire et le texte dans la zone de message. L'envoi reste toujours le choix de la personne. Les tarifs SMS habituels de son opérateur s'appliquent, ce qui compte si votre public voyage.",
        "Comme le message part en SMS classique, cela fonctionne sur tout téléphone avec un forfait mobile, sans application ni connexion de données. C'est idéal pour de courtes réponses par mot-clé, comme INSCRIPTION, STOP ou un code de réservation, qu'un système automatisé peut lire.",
      ],
      usesTitle: "Exemples d'utilisation",
      uses: [
        "Une affichette en caisse invite les clients à envoyer un mot-clé par SMS pour recevoir les promotions, plus rapide qu'un formulaire.",
        "Un parking affiche un code qui envoie le numéro de la place à l'exploitant : les conducteurs n'ont pas à le retenir.",
        "Un événement caritatif affiche un code qui prépare un SMS de promesse de don avec le mot-clé de la campagne déjà écrit.",
        "Un artisan dépanneur colle un code sur sa camionnette pour qu'on lui demande d'être rappelé avec le mot « Devis ».",
      ],
      tipsTitle: "Conseils avant d'imprimer",
      tips: [
        "Indiquez l'indicatif du pays dans le numéro si des personnes à l'étranger risquent de scanner le code.",
        "Limitez le message à un mot-clé ou une courte phrase. Un long message rend le code plus dense et risque davantage d'être modifié par erreur.",
        "Si vous gérez une liste d'abonnés, vérifiez que votre prestataire SMS traite bien le mot-clé imprimé avant de diffuser vos supports.",
        "Testez sur iPhone et sur Android. Quelques anciennes applications de lecture ouvrent Messages avec le numéro mais laissent le texte vide.",
      ],
    },
    faq: [
      {
        q: "Le SMS est-il envoyé automatiquement au scan ?",
        a: "Non. Le téléphone prépare seulement le message. La personne doit appuyer sur Envoyer.",
      },
      {
        q: "Cela fonctionne-t-il sur iPhone ?",
        a: "Oui. L'app Appareil photo de l'iPhone reconnaît les codes SMSTO et ouvre Messages avec le numéro et le texte remplis.",
      },
      {
        q: "Puis-je envoyer à plusieurs numéros ?",
        a: "Non. Un code SMS ne vise qu'un seul numéro. Pour des messages de groupe, envisagez un code WhatsApp ou e-mail.",
      },
      {
        q: "Cela fonctionne-t-il sans données mobiles ?",
        a: "La lecture du code ne demande aucune connexion, et le SMS passe par le réseau mobile classique : les données mobiles ne sont pas nécessaires.",
      },
    ],
  },

  phone: {
    title: "Générateur de QR code numéro de téléphone",
    subtitle: "Permettez qu'on vous appelle en un scan, sans taper votre numéro.",
    metaTitle: "Générateur de QR code numéro de téléphone — Gratuit, sans inscription",
    metaDescription:
      "Créez un QR code téléphone qui ouvre le clavier d'appel avec votre numéro prêt à composer. Idéal pour enseignes, véhicules et flyers. Statique, gratuit et sans inscription.",
    sections: {
      howTitle: "Comment fonctionne un QR code numéro de téléphone",
      how: [
        "Le code contient un lien tel:, le même type de lien qu'un bouton « Appelez-nous » sur un site web : tel:+33612345678. Les espaces, tirets, points et parenthèses sont supprimés ; seuls les chiffres et le signe plus initial sont conservés.",
        "Au scan, le téléphone affiche le numéro et propose de l'appeler. Sur iPhone, l'app Appareil photo affiche un bandeau ; sur Android, l'appareil photo ou Google Lens affiche un bouton d'appel. Le téléphone ne compose jamais seul : la personne confirme toujours. C'est l'un des plus petits codes possibles, il se scanne donc facilement même imprimé en petit.",
        "Comme seuls les chiffres et le signe plus sont conservés, les numéros de poste et les pauses écrits avec des virgules ou « poste » sont supprimés. Si vos correspondants ont besoin d'un poste, imprimez-le à côté du code.",
      ],
      usesTitle: "Exemples d'utilisation",
      uses: [
        "La camionnette d'un plombier porte un grand code sur le côté : quelqu'un coincé derrière dans les bouchons peut garder l'appel pour plus tard sans rien noter.",
        "Une affichette « À vendre » derrière la vitre d'une voiture ouvre un appel vers le vendeur, plus sûr que de déchiffrer un numéro en passant.",
        "La carte de rendez-vous d'un cabinet médical renvoie vers la ligne de prise de rendez-vous, ce qui limite les erreurs de numérotation.",
        "Un immeuble affiche dans le hall le numéro d'urgence du syndic sous forme de code.",
      ],
      tipsTitle: "Conseils avant d'imprimer",
      tips: [
        "Écrivez le numéro au format international, avec + et l'indicatif du pays, pour qu'il fonctionne aussi pour les visiteurs et les téléphones en itinérance.",
        "Imprimez aussi le numéro en clair à côté du code. Certaines personnes préfèrent le composer, et cela aide ceux qui n'ont pas d'appareil photo.",
        "Pour les véhicules et les enseignes extérieures, dimensionnez le code selon la distance de lecture réelle : environ un dixième de la distance, soit 30 cm pour une personne à 3 m.",
        "Utilisez le fichier SVG pour le lettrage adhésif et les grands panneaux, afin que les bords restent nets.",
      ],
    },
    faq: [
      {
        q: "Le téléphone appelle-t-il automatiquement au scan ?",
        a: "Non. Il affiche le numéro et la personne appuie pour appeler.",
      },
      {
        q: "Puis-je inclure un numéro de poste ?",
        a: "Pas dans le code. Les numéros de poste sont supprimés lors du nettoyage du numéro : imprimez le poste en texte à côté.",
      },
      {
        q: "Cela fonctionne-t-il pour les fixes et les numéros gratuits ?",
        a: "Oui. Tout numéro qu'un téléphone peut composer fonctionne, y compris les numéros verts, tant que l'opérateur de l'appelant autorise l'appel.",
      },
      {
        q: "Et si mon numéro change ?",
        a: "Le numéro est stocké dans le code : il vous faudra un nouveau code et de nouvelles impressions.",
      },
    ],
  },

  geo: {
    title: "Générateur de QR code localisation",
    subtitle: "Guidez les gens vers un point précis sur la carte grâce à un code qui contient les coordonnées.",
    metaTitle: "Générateur de QR code localisation — Gratuit, sans inscription",
    metaDescription:
      "Créez un QR code de localisation à partir de la latitude et de la longitude, qui ouvre une app de cartes au point exact. Idéal pour entrées, départs de randonnée et lieux d'événement. Gratuit.",
    sections: {
      howTitle: "Comment fonctionne un QR code de localisation",
      how: [
        "Le code contient un lien geo: avec deux nombres, la latitude et la longitude, séparés par une virgule : geo:48.858370,2.294481. La latitude doit être comprise entre -90 et 90 et la longitude entre -180 et 180. Vous pouvez les saisir ou utiliser le bouton Utiliser ma position en vous tenant sur place.",
        "Sur Android, le scan ouvre généralement Google Maps ou une autre app de cartes avec une épingle sur les coordonnées, prête pour l'itinéraire. Sur iPhone, la prise en charge des liens geo: est moins régulière : selon la version d'iOS et l'application de lecture, Plans d'Apple peut s'ouvrir ou seules les coordonnées s'affichent. Si la plupart de vos visiteurs utilisent un iPhone, un code URL avec un lien de partage Google Maps ou Plans peut être plus fiable.",
        "Les coordonnées désignent une position, pas une fiche d'établissement. C'est tout l'intérêt : elles fonctionnent pour des lieux sans adresse, comme une entrée latérale, un parking ou un point de rendez-vous dans un parc.",
      ],
      usesTitle: "Exemples d'utilisation",
      uses: [
        "Un faire-part de mariage inclut un code vers l'entrée exacte d'un domaine que les applications de cartes placent du mauvais côté de la propriété.",
        "Un panneau de départ de randonnée renvoie vers les coordonnées du parking, utile quand il n'y a pas d'adresse.",
        "Un bon de livraison pour un entrepôt guide les chauffeurs vers le bon quai de chargement plutôt que vers l'entrée principale.",
        "Le plan d'un festival signale le poste de secours ou les objets trouvés avec des codes pour ceux qui se perdent.",
      ],
      tipsTitle: "Conseils avant d'imprimer",
      tips: [
        "Pour obtenir des coordonnées, faites un appui long ou un clic droit sur le lieu dans Google Maps et copiez les deux nombres affichés.",
        "Cinq décimales donnent une précision d'environ un mètre, c'est largement suffisant. Les chiffres en plus ne font qu'augmenter la densité.",
        "Vérifiez le signe des nombres. Les lieux à l'ouest de Greenwich (comme la pointe de la Bretagne) ont une longitude négative, et ceux au sud de l'équateur une latitude négative.",
        "Scannez le code sur un iPhone et un téléphone Android avant d'imprimer, car les applications de cartes le traitent différemment.",
      ],
    },
    faq: [
      {
        q: "Un QR code de localisation fonctionne-t-il sur iPhone ?",
        a: "Parfois. Android gère bien les liens geo:, tandis que le comportement de l'iPhone dépend de la version d'iOS et de l'application de lecture. Testez-le, et envisagez un lien de partage de carte dans un code URL si votre public utilise surtout des iPhone.",
      },
      {
        q: "Puis-je utiliser une adresse au lieu de coordonnées ?",
        a: "Ce type n'utilise que des coordonnées. Pour une adresse, ouvrez-la dans une app de cartes, copiez le lien de partage et utilisez le type URL.",
      },
      {
        q: "Le scan nécessite-t-il une connexion Internet ?",
        a: "La lecture des coordonnées, non. L'affichage de la carte et de l'itinéraire, oui, sauf si l'app de cartes dispose de cartes hors connexion.",
      },
      {
        q: "Ma position est-elle partagée avec quelqu'un ?",
        a: "Non. Le code ne contient que les coordonnées que vous avez saisies. Le bouton Utiliser ma position lit votre position dans le navigateur uniquement pour remplir les champs.",
      },
    ],
  },

  event: {
    title: "Générateur de QR code événement (calendrier)",
    subtitle: "Ajoutez votre événement aux agendas en un scan, avec l'heure, le lieu et les détails.",
    metaTitle: "Générateur de QR code événement — Gratuit, sans inscription",
    metaDescription:
      "Créez un QR code d'événement avec titre, date, heure, lieu et notes. Un scan l'ajoute au calendrier du téléphone, fuseaux horaires compris. Gratuit, sans inscription.",
    sections: {
      howTitle: "Comment fonctionne un QR code d'événement",
      how: [
        "Le code contient un événement iCalendar, le même format que les invitations d'agenda : BEGIN:VEVENT, SUMMARY:Lancement produit, DTSTART:20261015T150000Z, DTEND:20261015T163000Z, LOCATION:Salle 3, END:VEVENT. Les heures sont converties du fuseau horaire de votre appareil vers l'UTC, signalé par le Z, pour que chaque téléphone affiche l'événement à son heure locale.",
        "Pour un événement sur toute la journée, les dates sont écrites sans heure, sous la forme DTSTART;VALUE=DATE:20261015. Dans ce format, la date de fin est exclusive : un événement d'un jour le 15 octobre se termine le 16 octobre dans le code. C'est ce qu'attendent les calendriers, et il s'affiche bien sur une seule journée.",
        "Sur iPhone, l'app Appareil photo reconnaît l'événement et propose de l'ajouter à Calendrier. Sur Android, cela dépend de l'application de lecture : Google Lens et de nombreuses applications photo proposent l'ajout au calendrier, tandis que certaines plus anciennes n'affichent que le texte brut.",
      ],
      usesTitle: "Exemples d'utilisation",
      uses: [
        "Une affiche de concert porte un code qui enregistre la date et la salle : les passants n'ont pas à s'en souvenir.",
        "La lettre d'information d'une école ajoute des codes pour les réunions parents-professeurs, avec l'heure et la salle directement dans les agendas chargés.",
        "Le programme d'un congrès liste un code par atelier, chacun avec sa salle dans le champ Lieu.",
        "Un cabinet médical imprime le prochain rendez-vous sous forme de code sur la carte de rappel.",
      ],
      tipsTitle: "Conseils avant d'imprimer",
      tips: [
        "Vérifiez le fuseau horaire de votre appareil avant de créer le code. L'heure saisie est lue comme l'heure locale de l'endroit où vous êtes, puis enregistrée en UTC.",
        "Indiquez la salle ou l'adresse complète dans Lieu ; de nombreux calendriers la transforment en lien vers une carte.",
        "Gardez une description courte. Des notes pratiques comme « Apportez un ordinateur portable » conviennent bien ; un programme complet rend le code dense.",
        "Ajoutez l'événement depuis votre propre code et vérifiez la date, l'heure et la durée avant d'imprimer.",
      ],
    },
    faq: [
      {
        q: "L'heure sera-t-elle correcte pour les personnes dans d'autres fuseaux horaires ?",
        a: "Oui. L'heure est enregistrée en UTC, chaque calendrier l'affiche donc à l'heure locale de la personne. Un événement à 17 h à Paris apparaît à 11 h à New York.",
      },
      {
        q: "Puis-je modifier l'événement après l'impression ?",
        a: "Non. Les informations sont dans le code. Si l'heure ou le lieu change, créez et imprimez un nouveau code.",
      },
      {
        q: "Puis-je créer un événement récurrent ?",
        a: "Pas avec ce générateur. Chaque code décrit un seul événement.",
      },
      {
        q: "L'événement est-il ajouté automatiquement ?",
        a: "Non. Le téléphone affiche l'événement et la personne choisit de l'ajouter à son calendrier.",
      },
    ],
  },

  payment: {
    title: "Générateur de QR code PayPal et lien de paiement",
    subtitle: "Encaissez par scan avec un code qui ouvre votre page PayPal.Me, Venmo, Cash App ou de pourboires.",
    metaTitle: "Générateur de QR code PayPal et paiement — Gratuit, sans inscription",
    metaDescription:
      "Créez un QR code PayPal.Me, Revolut.Me, Wise, Ko-fi, Buy Me a Coffee et plus, avec un montant facultatif sur PayPal, Venmo et Cash App. Gratuit, sans inscription.",
    sections: {
      howTitle: "Comment fonctionne un QR code de paiement",
      how: [
        "Le code contient le lien de paiement public de votre compte. Vous choisissez le service et saisissez votre nom d'utilisateur, et le lien est construit pour vous. Avec un montant, PayPal devient https://paypal.me/votrenom/25.00, Venmo devient https://venmo.com/u/votrenom?txn=pay&amount=25.00 et Cash App devient https://cash.app/$votretag/25.00. Les liens Buy Me a Coffee, Ko-fi, Patreon, Revolut.Me et Wise ouvrent votre page sans montant.",
        "Le scan ouvre le lien dans l'application de paiement si elle est installée, sinon dans le navigateur. Le payeur se connecte à son propre compte, vérifie le bénéficiaire et le montant, puis confirme. Le code ne contient aucune donnée de carte ni coordonnée bancaire, seulement l'adresse de votre page publique.",
        "Ce site ne traite aucun paiement, ne prend aucune commission et ne voit aucune transaction. L'argent circule entièrement au sein du service de paiement, selon ses conditions et frais habituels.",
      ],
      usesTitle: "Exemples d'utilisation",
      uses: [
        "Un stand de marché affiche un code PayPal ou Revolut à la caisse pour les clients qui n'ont pas d'espèces.",
        "Un musicien de rue pose un code Ko-fi ou PayPal sur l'étui de son instrument pour les pourboires.",
        "Un club sportif imprime un code avec la cotisation de la saison déjà remplie, par exemple 120.00 EUR : les parents n'ont pas à saisir le montant.",
        "Un indépendant ajoute un code de paiement en bas de sa facture imprimée.",
      ],
      tipsTitle: "Conseils avant d'imprimer",
      tips: [
        "Le montant est facultatif. Laissez-le vide pour les pourboires et les dons afin que le payeur choisisse ; remplissez-le pour les prix fixes.",
        "Les montants s'écrivent en chiffres avec deux décimales maximum et un point comme séparateur, par exemple 12.50. La devise est celle de votre compte, pas du code.",
        "Ouvrez vous-même le lien de résultat et vérifiez qu'il affiche votre nom et votre photo. Une faute de frappe dans le nom d'utilisateur pourrait envoyer l'argent à un inconnu.",
        "Venmo et Cash App ne fonctionnent qu'aux États-Unis, et les autres services ont aussi leurs restrictions géographiques. En France et en Europe, PayPal, Revolut et Wise sont les plus répandus : choisissez celui que vos clients utilisent déjà.",
      ],
    },
    faq: [
      {
        q: "Est-il sûr d'afficher mon QR code de paiement en public ?",
        a: "Le code ne contient que votre page de paiement publique, le même lien que vous partageriez dans un message. Il ne permet pas de vous prélever de l'argent.",
      },
      {
        q: "Puis-je modifier le montant plus tard ?",
        a: "Le montant fait partie du code. Pour le changer, créez un nouveau code. Si vos prix changent souvent, laissez le montant vide.",
      },
      {
        q: "Pourquoi ne puis-je pas indiquer de montant pour Ko-fi ou Patreon ?",
        a: "Leurs liens publics n'acceptent pas de montant pré-rempli : le payeur le choisit sur la page.",
      },
      {
        q: "Ce site prend-il une commission sur les paiements ?",
        a: "Non. Le code ouvre simplement votre page de paiement. Les éventuels frais sont ceux de PayPal, Revolut ou de l'autre service.",
      },
    ],
  },

  crypto: {
    title: "Générateur de QR code Bitcoin et crypto",
    subtitle: "Partagez une adresse de portefeuille sous forme de QR code qui remplit l'adresse et le montant dans une app de portefeuille.",
    metaTitle: "Générateur de QR code Bitcoin et crypto — Gratuit, sans inscription",
    metaDescription:
      "Créez un QR code Bitcoin, Ethereum, Litecoin, Dogecoin, Bitcoin Cash ou Solana avec votre adresse de portefeuille et un montant facultatif. Statique, gratuit, sans inscription.",
    sections: {
      howTitle: "Comment fonctionne un QR code crypto",
      how: [
        "Le code contient une URI de paiement que les applications de portefeuille comprennent. Pour Bitcoin, elle suit le format BIP-21 : bitcoin:bc1qexampleaddress?amount=0.0015&label=Stand%20caf%C3%A9. Le préfixe indique la cryptomonnaie, suivi de votre adresse et, si vous le souhaitez, du montant en unités de la crypto et d'un court libellé de 60 caractères maximum. Litecoin, Dogecoin, Bitcoin Cash et Solana suivent le même schéma avec leur propre préfixe.",
        "Pour Ethereum, le code ne contient que ethereum: et l'adresse. Les portefeuilles gèrent les montants Ethereum de manières différentes : le montant est donc laissé à la saisie de l'expéditeur.",
        "Le code est conçu pour être scanné depuis une application de portefeuille, via son bouton Scanner ou Envoyer. L'appareil photo du téléphone peut aussi le reconnaître et proposer d'ouvrir un portefeuille installé. Le portefeuille affiche alors l'adresse et le montant pour vérification ; rien n'est envoyé avant la confirmation de l'expéditeur.",
      ],
      usesTitle: "Exemples d'utilisation",
      uses: [
        "Une boutique qui accepte le Bitcoin affiche un code en caisse : les clients n'ont pas à recopier à la main une adresse de 42 caractères.",
        "Un créateur ajoute un code de don vers un portefeuille Solana ou Litecoin à la fin d'une vidéo ou dans un fanzine imprimé.",
        "Un stand de salon affiche un code avec un montant fixe pour un billet ou un produit.",
        "Une personne qui reçoit un virement d'un ami affiche le code sur son écran au lieu d'envoyer l'adresse par messagerie.",
      ],
      tipsTitle: "Conseils avant d'imprimer",
      tips: [
        "Comparez l'adresse caractère par caractère avec votre portefeuille. Les transferts crypto sont irréversibles, et une adresse erronée signifie des fonds perdus.",
        "Vérifiez que la cryptomonnaie correspond au portefeuille. Envoyer une crypto vers une adresse d'un autre réseau peut faire perdre les fonds.",
        "Les montants sont exprimés en unités de la crypto, pas en euros, avec huit décimales maximum. Les cours évoluant, laissez le montant vide pour tout support destiné à durer.",
        "Envisagez une adresse de réception dédiée. Toute personne qui scanne un code public peut consulter l'historique de cette adresse sur la blockchain.",
      ],
    },
    faq: [
      {
        q: "Est-il sûr de partager le QR code de mon portefeuille ?",
        a: "Partager une adresse de réception est normal et ne permet à personne de dépenser depuis le portefeuille. Ne mettez jamais une clé privée ou une phrase de récupération dans un QR code.",
      },
      {
        q: "Pourquoi n'y a-t-il pas d'option de montant pour Ethereum ?",
        a: "Les portefeuilles Ethereum interprètent différemment les montants des liens de paiement : pour éviter d'envoyer une mauvaise somme, le code ne contient que l'adresse.",
      },
      {
        q: "Puis-je accepter des jetons comme l'USDT ?",
        a: "Les jetons sur d'autres réseaux nécessitent leurs propres réglages de portefeuille et de réseau. Ce générateur couvre les six cryptomonnaies natives listées.",
      },
      {
        q: "Quels portefeuilles peuvent lire le code ?",
        a: "La plupart des portefeuilles courants lisent le format de paiement de type bitcoin:. Si un portefeuille ignore le montant ou le libellé, l'adresse fonctionne quand même.",
      },
    ],
  },

  file: {
    title: "Générateur de QR code PDF",
    subtitle: "Reliez un QR code à un PDF ou à un autre fichier partagé depuis Google Drive, Dropbox ou votre site.",
    metaTitle: "Générateur de QR code PDF — Gratuit, sans inscription",
    metaDescription:
      "Créez un QR code qui ouvre un PDF, une carte, une brochure ou une notice hébergés sur Google Drive, Dropbox ou votre site. Statique, sans expiration, gratuit et sans inscription.",
    sections: {
      howTitle: "Comment fonctionne un QR code PDF",
      how: [
        "Un QR code ne peut pas contenir un PDF entier : même un document court dépasse de loin les quelques kilo-octets qu'un code peut stocker. Le code contient donc un lien vers l'emplacement du fichier, comme https://drive.google.com/file/d/1AbC…/view. Ce site n'héberge pas de fichiers et ne permet pas d'en déposer : la première étape consiste à mettre le PDF en ligne.",
        "Déposez-le sur Google Drive, Dropbox, OneDrive ou votre propre site, puis copiez le lien de partage et réglez son accès sur « Tous les utilisateurs disposant du lien ». Collez ce lien ici. Quand quelqu'un scanne le code, son téléphone ouvre le lien dans le navigateur, où le PDF peut être consulté ou téléchargé.",
        "Le code fonctionne tant que le lien fonctionne. Si le fichier est supprimé, déplacé vers un nouveau lien ou rendu privé, les gens verront une erreur ou une page de connexion.",
      ],
      usesTitle: "Exemples d'utilisation",
      uses: [
        "Un restaurant relie un code au PDF de sa carte et met à jour le fichier à chaque saison sans changer les chevalets de table.",
        "Un emballage de produit inclut un code vers le mode d'emploi complet : la notice imprimée se limite aux consignes de sécurité.",
        "Un panneau d'agence immobilière ouvre le plan et la plaquette du bien pour tous les passants.",
        "Un congrès distribue un seul code pour les diapositives et les supports après la conférence.",
      ],
      tipsTitle: "Conseils avant d'imprimer",
      tips: [
        "Testez le lien dans une fenêtre de navigation privée où vous n'êtes pas connecté. S'il demande une connexion, le réglage de partage est incorrect.",
        "Pour mettre à jour un fichier sans changer le lien, remplacez-le sur place au lieu de déposer une nouvelle copie. L'option Gérer les versions de Google Drive conserve le même lien.",
        "Évitez les liens qui expirent, comme les liens de téléchargement temporaires de certains services de transfert de fichiers.",
        "Gardez un PDF raisonnablement léger et lisible sur un écran de téléphone. Un scan de 50 Mo est lent à ouvrir en données mobiles.",
      ],
    },
    faq: [
      {
        q: "Puis-je déposer mon PDF ici ?",
        a: "Non. Ce site crée uniquement le code. Hébergez le fichier sur Google Drive, Dropbox ou votre propre site et collez son lien de partage.",
      },
      {
        q: "Pourquoi les gens voient-ils « Demander l'accès » au scan ?",
        a: "Le fichier n'est pas partagé publiquement. Réglez son partage sur « Tous les utilisateurs disposant du lien peuvent consulter ».",
      },
      {
        q: "Puis-je modifier le PDF après avoir imprimé le code ?",
        a: "Oui, tant que le lien reste le même. Remplacez le contenu du fichier à la même adresse ; déposer une nouvelle copie crée un nouveau lien.",
      },
      {
        q: "Cela fonctionne-t-il pour d'autres fichiers que des PDF ?",
        a: "Oui. Tout fichier doté d'un lien de partage fonctionne, y compris les images, présentations et fichiers audio. L'aperçu sur le téléphone dépend du type de fichier.",
      },
    ],
  },
};

/** Textes en français pour les pages par cas d'usage (/restaurant-menu-qr-code, …). */
export const useCasesFr: Record<UseCaseId, LandingCopy> = {
  restaurant_menu: {
    title: "QR code menu restaurant",
    subtitle: "Imprimez un code pour chaque table qui ouvre votre carte à jour sur le téléphone des clients.",
    metaTitle: "QR code menu restaurant — Gratuit, sans inscription",
    metaDescription:
      "Créez un QR code menu restaurant qui ouvre votre carte en ligne ou en PDF. Statique, sans expiration, prêt pour chevalets de table et vitrines. Gratuit, sans inscription.",
    sections: {
      howTitle: "Comment fonctionne un QR code menu",
      how: [
        "Un QR code menu ne contient pas la carte. Il contient un lien, comme `https://votrerestaurant.fr/menu`, et le téléphone ouvre ce que cette adresse affiche. La première étape consiste donc à décider où se trouve la carte : une page de votre site, un PDF partagé depuis Google Drive ou Dropbox, ou la page fournie par un service de menu ou de commande en ligne. Ce site crée uniquement le code ; il n'héberge ni cartes ni fichiers.",
        "Comme le code est statique, le lien qu'il contient est figé dès l'impression. Ce que vous pouvez modifier, c'est le contenu derrière le lien. Si la carte reste à une adresse stable et que vous mettez à jour cette page ou remplacez le PDF sur place, chaque chevalet de table continue de fonctionner malgré les changements de prix et de saison. Si l'adresse elle-même change, par exemple après un changement de prestataire, les codes imprimés doivent être remplacés.",
        "Les clients scannent avec l'appareil photo du téléphone, voient l'adresse et appuient pour l'ouvrir, sans application à installer. Un lien court sur votre propre nom de domaine inspire aussi plus confiance qu'un long lien d'un service tiers.",
      ],
      usesTitle: "Exemples d'utilisation",
      uses: [
        "Des chevalets ou autocollants sur chaque table, pour que les clients consultent la carte en attendant au lieu de partager un menu plastifié.",
        "Un autocollant sur la vitrine, près de la porte, qui permet aux passants de voir plats et prix avant d'entrer, même après la fermeture.",
        "Un encart dans le sac à emporter ou sur le ticket qui renvoie vers la carte pour la prochaine commande depuis chez soi.",
        "Un code distinct au comptoir pour la page des allergènes et ingrédients, que le personnel peut montrer quand un client pose la question.",
      ],
      tipsTitle: "Conseils avant d'imprimer",
      tips: [
        "Utilisez une adresse que vous maîtrisez, comme votredomaine.fr/menu, et redirigez-la vers l'emplacement actuel de la carte. Changer de service de menu ne vous obligera alors pas à réimprimer tous les chevalets.",
        "Ouvrez la carte sur un téléphone en données mobiles, pas sur le Wi-Fi du restaurant. Un gros PDF de pages scannées se charge lentement et se lit mal sur un petit écran ; une simple page web fonctionne mieux.",
        "Gardez des cartes papier à disposition. Certains clients n'ont pas de smartphone, ont une batterie vide ou une mauvaise vue : le QR code doit rester une commodité, pas le seul moyen de commander.",
        "Présentez les informations sur les allergènes en ligne aussi clairement que sur papier, et mettez-les à jour à chaque changement de plat.",
        "Imprimez le code sur au moins 2 à 3 cm de large sur les chevalets de table. Pour la vitrine, Feuille à imprimer / PDF crée une affiche A4 avec un titre modifiable, comme « Scannez pour voir notre carte ».",
      ],
    },
    faq: [
      {
        q: "Puis-je déposer ma carte ici ?",
        a: "Non. Ce site crée uniquement le code. Publiez la carte sur votre site, partagez un PDF depuis Google Drive ou Dropbox avec « Tous les utilisateurs disposant du lien », ou utilisez le lien de votre service de menu, puis collez cette adresse ici.",
      },
      {
        q: "Faut-il un nouveau code quand la carte change ?",
        a: "Non, si l'adresse reste la même. Mettez à jour la page ou remplacez le PDF au même lien : les codes imprimés affichent toujours la dernière version.",
      },
      {
        q: "Le code va-t-il cesser de fonctionner au bout d'un moment ?",
        a: "Non. C'est un code statique dont le lien est stocké dans l'image : aucun abonnement ne peut expirer. Il fonctionne tant que la page de la carte est en ligne.",
      },
      {
        q: "Un code pour toutes les tables ou un par table ?",
        a: "Un seul code suffit si toutes les tables voient la même carte. Des codes distincts ne servent que si votre système de commande attribue un lien à chaque table ; vous pouvez alors transformer cette liste en codes sur la page En lot, jusqu'à 200 à la fois dans un ZIP.",
      },
    ],
  },

  wedding: {
    title: "QR code mariage",
    subtitle: "Reliez vos faire-part à votre site de mariage ou à votre formulaire de réponse, et rassemblez les photos de la réception dans un album partagé.",
    metaTitle: "QR code mariage — Gratuit, sans inscription",
    metaDescription:
      "Créez un QR code mariage pour faire-part, formulaire de réponse, plan d'accès et album photo partagé. Codes statiques qui n'expirent jamais, prêts à imprimer. Gratuit, sans inscription.",
    sections: {
      howTitle: "Comment fonctionne un QR code de mariage",
      how: [
        "Un QR code de mariage contient un lien, et c'est ce lien qui détermine ce que voient les invités. Sur un faire-part, il s'agit généralement de votre site de mariage ou directement du formulaire de réponse, que vous l'ayez créé avec un service de site de mariage, Google Forms ou autre. L'invité scanne, la page s'ouvre, et il répond sans recopier une longue adresse imprimée sur la carte.",
        "Le même principe vaut pour le reste de la journée. Un code avec un lien de partage Google Maps ou Plans mène les invités au lieu de réception, et un code à la réception qui ouvre un album partagé Google Photos ou iCloud permet à chacun d'ajouter ses photos. Chaque usage nécessite son propre code, car un code ouvre une seule adresse.",
        "Les codes créés ici sont statiques : le lien est stocké dans l'image et n'expire jamais, il s'ouvrira donc encore dans des années si la page est toujours en ligne. La contrepartie, c'est que le lien ne peut pas être changé après l'impression. Arrêtez les adresses de votre site, formulaire et album avant d'envoyer les faire-part chez l'imprimeur.",
      ],
      usesTitle: "Exemples d'utilisation",
      uses: [
        "Le verso du faire-part ou un carton glissé à l'intérieur renvoie vers le formulaire de réponse : les réponses arrivent au même endroit plutôt que par SMS, e-mail et téléphone.",
        "Un « save the date » ou une carte d'informations ouvre le site du mariage avec le transport, l'hébergement et le dress code.",
        "Une carte d'accès ou un panneau d'accueil ouvre un lien de carte vers un lieu difficile à trouver, comme une grange au bout d'un chemin privé.",
        "Des marque-places à la réception ouvrent un album photo partagé, pour que les invités y déposent leurs photos avant d'oublier.",
      ],
      tipsTitle: "Conseils avant d'imprimer",
      tips: [
        "Sur un faire-part, 2 à 2,5 cm conviennent bien pour un téléphone tenu en main. Un lien plus court donne un motif plus aéré, qui s'imprime de façon plus fiable à cette taille.",
        "Une encre foncée sur papier crème, ivoire ou kraft se scanne généralement bien ; la dorure, les encres pastel et le gris clair, souvent pas. Choisissez une couleur foncée dans Style et testez une épreuve imprimée sur le vrai papier.",
        "Laissez la zone de silence, la marge vide autour du code, libre de toute arabesque, bordure ou illustration. Les lecteurs en ont besoin pour repérer le code.",
        "Vérifiez les réglages de partage : l'album doit permettre aux invités d'ajouter des photos, et le formulaire doit être ouvert à toute personne disposant du lien, pas seulement à votre compte.",
        "Avant de lancer toute l'impression, scannez une épreuve avec un iPhone et un téléphone Android, envoyez une réponse test et demandez à un ami d'ajouter une photo à l'album.",
      ],
    },
    faq: [
      {
        q: "Puis-je changer la destination du code après l'impression des faire-part ?",
        a: "Pas le code lui-même, puisqu'il est statique. Vous pouvez toujours modifier le contenu de la page : mettez à jour le site ou le formulaire plutôt que de changer de lien.",
      },
      {
        q: "Le code fonctionnera-t-il encore après le mariage ?",
        a: "Le code n'a pas de date d'expiration. Il fonctionne tant que le site, le formulaire ou l'album est en ligne : les invités peuvent revoir les photos plus tard si vous laissez l'album partagé.",
      },
      {
        q: "Chaque invité peut-il avoir son propre code de réponse ?",
        a: "Si votre service de réponse fournit un lien distinct par invité, vous pouvez transformer la liste en codes sur la page En lot, jusqu'à 200 à la fois, dans un ZIP de fichiers PNG.",
      },
      {
        q: "Dois-je envoyer un PNG ou un SVG à l'imprimeur ?",
        a: "Envoyez le fichier SVG à l'imprimeur ou au graphiste. C'est un fichier vectoriel : il reste net à toutes les tailles. Le PNG convient pour un site de mariage ou un message aux invités.",
      },
    ],
  },

  business_card: {
    title: "QR code carte de visite",
    subtitle: "Ajoutez à votre carte de visite une fiche contact qui enregistre vos coordonnées dans un téléphone en un scan.",
    metaTitle: "QR code carte de visite — Gratuit, sans inscription",
    metaDescription:
      "Créez un QR code carte de visite qui enregistre votre nom, numéro, e-mail et site web dans les contacts du téléphone. vCard 3.0, statique, sans expiration. Gratuit, sans inscription.",
    sections: {
      howTitle: "Comment fonctionne un QR code carte de visite",
      how: [
        "Un code de carte de visite créé ici contient une fiche contact vCard 3.0, le format que lisent les carnets d'adresses des téléphones. Au scan, le téléphone affiche votre nom, votre entreprise, votre numéro et votre e-mail dans un aperçu, et un appui suffit pour l'ajouter. Rien n'a besoin de se charger : cela fonctionne même dans un hall de salon sans réseau, et votre nom est enregistré exactement comme vous l'écrivez.",
        "L'autre option est un code qui renvoie vers un profil, comme votre site ou votre page LinkedIn. Un lien peut montrer davantage et sa page peut être mise à jour sans réimpression, mais la personne doit encore enregistrer votre numéro elle-même. Un code contact le fait pour elle. Certains combinent les deux : le code contact au verso, et une adresse de site courte imprimée en texte.",
        "Chaque champ rempli est stocké dans l'image : le code grossit avec les informations. Une fiche avec nom, entreprise, mobile, e-mail et site web reste compacte ; ajouter une adresse postale complète et une note rend le motif plus dense et plus difficile à lire au format carte de visite.",
      ],
      usesTitle: "Exemples d'utilisation",
      uses: [
        "Les événements de réseautage et salons professionnels, où vous distribuez des dizaines de cartes et voulez qu'elles finissent dans un téléphone plutôt que dans un tiroir.",
        "Les indépendants et consultants qui rencontrent leurs clients en personne et veulent que le bon e-mail et le bon numéro soient enregistrés, pas devinés à partir d'une photo de la carte.",
        "Les cartes d'une équipe commerciale, où chacun a un code avec sa ligne directe.",
        "Une carte d'accueil qui enregistre le contact général du bureau pour les visiteurs.",
      ],
      tipsTitle: "Conseils avant d'imprimer",
      tips: [
        "Sur une carte standard de 85 × 55 mm, imprimez le code sur au moins 2 cm de large, avec une marge dégagée autour. S'il occupe seul le verso, 2,5 à 3 cm sont plus confortables.",
        "Limitez-vous aux champs utiles : nom, entreprise, mobile, e-mail et site web. Laissez l'adresse et la note vides sauf si elles comptent vraiment.",
        "Écrivez les numéros avec l'indicatif du pays, comme +33 6 12 34 56 78, pour qu'ils fonctionnent aussi pour vos contacts à l'étranger.",
        "La page En lot crée des codes de liens et de texte, pas des fiches contact. Pour une équipe, créez le code de chaque personne sur cette page et enregistrez le fichier SVG pour chaque maquette de carte.",
        "Scannez une épreuve imprimée avec un iPhone et un téléphone Android, et vérifiez que le nom, le numéro et l'e-mail arrivent dans les bons champs.",
      ],
    },
    faq: [
      {
        q: "Que se passe-t-il si mon numéro ou mon poste change ?",
        a: "Les informations sont figées dans le code. Créez un nouveau code et réimprimez les cartes, comme vous le feriez pour le texte imprimé.",
      },
      {
        q: "Code contact ou lien vers mon site ?",
        a: "Un code contact enregistre directement vos coordonnées et fonctionne hors connexion. Un lien peut mener à une page que vous mettez à jour plus tard. Si vos coordonnées changent rarement, le code contact est le choix le plus utile sur une carte.",
      },
      {
        q: "Puis-je ajouter mon logo ?",
        a: "Pas dans la fiche contact elle-même, mais vous pouvez placer un petit logo au centre du code dans Style. La correction d'erreur passe alors automatiquement au maximum, et le code reste lisible.",
      },
      {
        q: "Les gens peuvent-ils modifier le contact avant de l'enregistrer ?",
        a: "Oui. Le téléphone affiche un aperçu, et la personne peut vérifier et modifier les informations avant de les ajouter.",
      },
    ],
  },

  google_review: {
    title: "QR code avis Google",
    subtitle: "Créez un code qui ouvre le formulaire d'avis Google de votre établissement, prêt pour le comptoir et les tickets de caisse.",
    metaTitle: "QR code avis Google — Gratuit, sans inscription",
    metaDescription:
      "Créez un QR code qui ouvre votre formulaire d'avis Google à partir de votre Place ID ou de votre lien d'avis. Pour cartes de comptoir, tickets et cartes de remerciement. Gratuit, sans inscription.",
    sections: {
      howTitle: "Comment fonctionne un QR code avis Google",
      how: [
        "Le code ouvre directement le formulaire d'avis Google de votre établissement : vos clients n'ont pas à vous chercher, choisir la bonne fiche et trouver le bouton d'avis. Avec la plateforme Avis Google sélectionnée, vous saisissez votre Place ID, et le code contient `https://search.google.com/local/writereview?placeid=ChIJ…` avec votre identifiant à la place des points.",
        "Il y a deux façons de remplir le champ. La première est le Place ID : recherchez votre établissement dans l'outil Place ID Finder de Google, dans la documentation de Google Maps Platform, et copiez l'identifiant, qui commence généralement par ChIJ. La seconde est le lien d'avis de votre fiche d'établissement Google (Google Business Profile) : ouvrez votre fiche, choisissez l'option pour demander des avis et copiez le lien court affiché. Un lien complet commençant par https:// est accepté tel quel.",
        "Au scan, le téléphone ouvre le formulaire dans Google Maps ou le navigateur. Le client doit être connecté à un compte Google pour publier, et il choisit lui-même les étoiles et rédige son avis. Le code est statique et ne contient qu'un lien public : il fonctionne tant que votre fiche existe.",
      ],
      usesTitle: "Exemples d'utilisation",
      uses: [
        "Une petite carte près de la caisse, là où les clients ont un moment en payant.",
        "Le bas d'un ticket de caisse imprimé, que le client emporte chez lui.",
        "Une carte de remerciement laissée après une livraison, un séjour à l'hôtel ou une intervention, une fois le travail terminé.",
        "Une affiche A4 près de la sortie, créée avec Feuille à imprimer / PDF, avec un court titre modifiable.",
      ],
      tipsTitle: "Conseils avant d'imprimer",
      tips: [
        "Scannez vous-même le code et vérifiez que le formulaire affiche bien le nom de votre établissement. Dans Place ID Finder, il est facile de confondre des commerces aux noms proches dans la même ville.",
        "Formulez la demande simplement, par exemple « Donnez-nous votre avis sur Google », et placez le code là où les gens ont un moment libre, pas là où ils sortent en hâte.",
        "Le règlement de Google interdit les remises, cadeaux ou autres contreparties en échange d'avis : limitez la carte à une simple demande.",
        "Sollicitez tous les clients de la même façon. Google interdit aussi le filtrage des avis : n'inviter que les clients satisfaits, ou rediriger d'abord les mécontents ailleurs.",
      ],
    },
    faq: [
      {
        q: "Où trouver mon Place ID ?",
        a: "Utilisez l'outil Place ID Finder de la documentation Google Maps : recherchez votre établissement et copiez l'identifiant affiché. Vous pouvez aussi coller dans le champ le lien d'avis de votre fiche d'établissement Google.",
      },
      {
        q: "Le client a-t-il besoin d'un compte Google ?",
        a: "Oui. Publier un avis Google nécessite d'être connecté à un compte Google. Les personnes sans compte peuvent tout de même consulter votre fiche.",
      },
      {
        q: "Puis-je offrir une remise en échange d'un avis ?",
        a: "Non. Le règlement de Google interdit les contreparties aux avis, y compris les remises et les produits offerts. Une demande polie sur une carte est en revanche autorisée.",
      },
      {
        q: "Le code cessera-t-il de fonctionner si je change le nom de mon établissement ?",
        a: "Généralement non, car le Place ID désigne la fiche, pas son nom. Google précise toutefois qu'un Place ID peut changer dans certains cas, par exemple lors de la fusion de fiches : scannez à nouveau le code après toute modification importante de votre fiche.",
      },
    ],
  },

  wifi_cafe: {
    title: "QR code WiFi pour cafés, hôtels et locations",
    subtitle: "Vos clients rejoignent le réseau invités en un scan, depuis un chevalet de table, une carte de chambre ou la porte du logement.",
    metaTitle: "QR code WiFi pour cafés, hôtels et locations — Gratuit, sans inscription",
    metaDescription:
      "Créez un QR code WiFi pour votre café, hôtel ou location saisonnière. Les clients se connectent en un scan sur iPhone ou Android. Chevalets de table ou cartes de chambre. Gratuit, sans inscription.",
    sections: {
      howTitle: "Comment fonctionne un QR code WiFi pour vos clients",
      how: [
        "Dans beaucoup de cafés, la question la plus fréquente au comptoir est le mot de passe Wi-Fi. Un code Wi-Fi y répond sur papier : il contient le nom du réseau, le mot de passe et le type de sécurité dans un format court, comme `WIFI:T:WPA;S:Cafe-Invites;P:espresso-2026;;`, et l'appareil photo du téléphone le transforme en invite « Rejoindre le réseau ». Les clients ne saisissent rien : plus d'erreurs de majuscules ni de zéro confondu avec un O.",
        "Créez un réseau invités séparé avant de générer le code, si votre box ou vos points d'accès le permettent. Le mot de passe figure en clair dans le code, et quiconque photographie un chevalet de table peut le lire. Un réseau invités garde le terminal de paiement, l'ordinateur du bureau et les caméras de surveillance sur un réseau inaccessible aux clients.",
        "Le code est statique : le mot de passe y est figé. Si vous changez le mot de passe invités chaque mois ou après chaque séjour, imprimez de nouveaux codes en même temps. Les réseaux d'hôtel avec une page de connexion ou d'acceptation des conditions, appelée portail captif, affichent toujours cette page une fois le téléphone connecté ; le code rejoint le réseau mais ne remplit pas la connexion.",
      ],
      usesTitle: "Exemples d'utilisation",
      uses: [
        "Des chevalets de table dans un café ou un restaurant, pour que les clients se connectent en attendant leur commande.",
        "Une carte dans chaque chambre d'hôtel ou dans la pochette de la carte-clé, à côté de l'heure de départ et des horaires du petit-déjeuner.",
        "Un code encadré derrière la porte d'entrée d'une location saisonnière ou dans le livret d'accueil, pour les voyageurs qui arrivent tard en l'absence de l'hôte.",
        "Un poste de coworking, une salle d'attente ou un fauteuil de salon de coiffure, où les visiteurs restent assez longtemps pour vouloir se connecter.",
      ],
      tipsTitle: "Conseils avant d'imprimer",
      tips: [
        "Feuille à imprimer / PDF crée une affiche A4 avec le titre « Connectez-vous au Wi-Fi » et le nom du réseau, pour que ceux qui ne peuvent pas scanner sachent quel réseau choisir. Vous pouvez ajouter un sous-titre comme « Demandez de l'aide au personnel ».",
        "Saisissez le nom du réseau exactement tel qu'il est diffusé, majuscules et suffixes comme _5G compris.",
        "Quand vous changez le mot de passe, remplacez tous les codes imprimés le jour même. Un code périmé affiche toujours l'invite de connexion mais échoue, ce qui donne aux clients l'impression d'un réseau en panne.",
        "Testez le code imprimé sur un iPhone et un téléphone Android, depuis l'endroit où les clients s'assoient vraiment, sous votre éclairage réel.",
      ],
    },
    faq: [
      {
        q: "Est-il sûr de mettre le mot de passe Wi-Fi sur une table ?",
        a: "Toute personne qui scanne ou photographie le code peut lire le mot de passe : utilisez un réseau invités distinct de celui de vos systèmes professionnels.",
      },
      {
        q: "Dois-je réimprimer quand je change le mot de passe ?",
        a: "Oui. Le mot de passe est stocké dans le code lui-même : chaque changement de mot de passe nécessite un nouveau code et de nouvelles impressions.",
      },
      {
        q: "Cela fonctionne-t-il avec une page de connexion d'hôtel ?",
        a: "Le code connecte le téléphone au réseau. Si le réseau affiche ensuite une page de connexion ou de conditions, les clients doivent toujours la remplir à la main.",
      },
      {
        q: "Puis-je créer un code par chambre avec son propre mot de passe ?",
        a: "Oui, un par un sur cette page. La page En lot est conçue pour des listes de liens et de texte et ne propose pas de champs Wi-Fi.",
      },
    ],
  },
};
