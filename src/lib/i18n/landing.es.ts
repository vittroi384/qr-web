import type { QrType } from "@/lib/qr/types";
import type { LandingCopy, UseCaseId } from "./index";

/** Spanish long-form copy for the per-type landing pages (/es/wifi-qr-code, …). */
export const landingEs: Record<QrType, LandingCopy> = {
  url: {
    title: "Generador de códigos QR para URL",
    subtitle: "Convierte cualquier dirección web en un código QR que abre la página con un solo escaneo.",
    metaTitle: "Generador de códigos QR para URL — Gratis, sin registro",
    metaDescription:
      "Crea un código QR que abre cualquier página web. Códigos estáticos que nunca caducan, creados en tu navegador. Descárgalo en PNG o SVG o imprime una hoja A4. Gratis.",
    sections: {
      howTitle: "Cómo funciona un código QR para URL",
      how: [
        "El código contiene la propia dirección web, carácter por carácter. Si escribes example.com/menu, el generador añade https:// por ti, así que el código contiene https://example.com/menu. Cuando alguien apunta la cámara del móvil, el teléfono reconoce el enlace y ofrece abrirlo en el navegador. No hay nada en medio: ningún servicio de redirección ni una cuenta que tenga que seguir activa.",
        "En iPhone, la app Cámara muestra un aviso con la dirección; al tocarlo se abre Safari. La mayoría de los Android hacen lo mismo desde la cámara o Google Lens. Como la persona ve la dirección antes de abrirla, un dominio corto y reconocible genera más confianza que una larga cadena de parámetros de seguimiento.",
        "Cuanto más larga es la dirección, más cuadritos necesita el código. Un enlace de 30 caracteres da un patrón amplio y fácil de escanear; uno de 300 caracteres con muchos parámetros genera un código denso que hay que imprimir más grande. Los enlaces que empiezan por javascript: o data: se rechazan, porque un lector nunca debería ejecutar código.",
      ],
      usesTitle: "Dónde resulta útil",
      uses: [
        "Un restaurante imprime el código en los carteles de mesa para que los clientes abran la carta sin esperar a que les traigan una en papel.",
        "El escaparate de una tienda muestra un código que lleva al horario y a los pedidos en línea, útil para quien pasa por delante después del cierre.",
        "La etiqueta de un producto enlaza a la guía de instalación o a la página de garantía, y así el manual impreso puede ser breve.",
        "Un ponente pone un código en la última diapositiva que abre los apuntes de la charla, para que nadie tenga que copiar una URL de la pantalla.",
      ],
      tipsTitle: "Consejos antes de imprimir",
      tips: [
        "El código es estático: si la dirección cambia, necesitas un código nuevo. Apúntalo a una página que controles, como tudominio.com/menu, para cambiar lo que muestra sin reimprimir.",
        "Quita los parámetros de seguimiento que no necesites. Un enlace más corto da un patrón más limpio que se escanea más rápido y desde más lejos.",
        "Como regla general, el código debe medir al menos una décima parte de la distancia de escaneo: unos 2 cm para algo que se sostiene en la mano y 30 cm para un póster que se lee a 3 m.",
        "Después de guardarlo, abre el enlace en tu propio teléfono. Una errata en la dirección es la causa más común de que un código impreso no funcione.",
      ],
    },
    faq: [
      {
        q: "¿Un código QR para URL caduca?",
        a: "No. La dirección está guardada en la imagen, así que el código funciona mientras la página web siga en línea. Este sitio no necesita existir para que siga funcionando.",
      },
      {
        q: "¿Puedo cambiar el enlace después de imprimirlo?",
        a: "En el código no, porque es estático. Lo que sí puedes es cambiar lo que muestra la página enlazada o configurar una redirección en tu propio sitio web.",
      },
      {
        q: "¿Tengo que escribir https://?",
        a: "No. Si no lo pones, se añade https:// automáticamente. Escribe http:// solo si tu sitio de verdad no admite HTTPS.",
      },
      {
        q: "¿Puedo ver cuántas personas lo escanearon?",
        a: "Aquí no. El código abre tu página directamente, así que los escaneos solo se cuentan si la analítica de tu sitio registra la visita. Añadir un parámetro de campaña como ?utm_source=cartel al enlace te ayuda a distinguir esas visitas.",
      },
    ],
  },

  social: {
    title: "Generador de códigos QR para redes sociales",
    subtitle: "Escribe tu nombre de usuario y obtén un código que abre tu perfil de Instagram, TikTok, YouTube y más.",
    metaTitle: "Código QR para redes sociales — Gratis, sin registro",
    metaDescription:
      "Crea un código QR para tu perfil de Instagram, TikTok, YouTube, LinkedIn o Linktree solo con tu nombre de usuario. Estático, nunca caduca, gratis y sin registro.",
    sections: {
      howTitle: "Cómo funciona un código QR para redes sociales",
      how: [
        "Eliges la plataforma y escribes tu nombre de usuario; el generador crea la dirección estándar del perfil. Un usuario de Instagram @panaderiaespiga se convierte en https://www.instagram.com/panaderiaespiga/, un usuario de YouTube en https://www.youtube.com/@canal y un ID de LinkedIn en https://www.linkedin.com/in/id-de-perfil/. La @ inicial se elimina cuando la plataforma no la usa en la dirección, y se quitan espacios y barras.",
        "Si ya tienes el enlace del perfil, pégalo y la plataforma se detecta automáticamente. Al escanear, el teléfono ve un enlace https normal. Si la app está instalada, iOS y Android suelen abrir el perfil en ella; si no, se abre en el navegador.",
        "Algunas plataformas usan códigos en lugar de nombres: Discord necesita un código de invitación, Google Review un Place ID y Spotify un ID de artista. El texto de ejemplo de cada campo indica qué escribir.",
      ],
      usesTitle: "Dónde resulta útil",
      uses: [
        "Una cafetería imprime un código de Instagram en el tique para que los clientes la sigan sin buscar un nombre que tiene tres parecidos.",
        "Un músico pone un código de artista de Spotify en el puesto de merchandising y un código de Linktree en el folleto para todo lo demás.",
        "Un negocio de barrio pide reseñas con un código de Google Review en el mostrador, que abre directamente el formulario de reseña.",
        "Una persona que busca empleo imprime un código de LinkedIn en su currículum o en su acreditación para ferias de empleo.",
      ],
      tipsTitle: "Consejos antes de imprimir",
      tips: [
        "Comprueba el usuario abriendo el enlace de la línea de resultado antes de guardar. Una sola letra de menos puede llevar a la cuenta de otra persona.",
        "En Discord, crea una invitación que no caduque; la invitación por defecto deja de funcionar a los siete días, y el código impreso con ella.",
        "Si quizá cambies el nombre de tu cuenta, un código a una página de Linktree o a tu propio sitio web resiste mejor el cambio que un enlace directo al perfil.",
        "Pon el nombre o el logotipo de la plataforma junto al código para que la gente sepa qué se abrirá antes de escanear.",
      ],
    },
    faq: [
      {
        q: "¿El código abre la app o el sitio web?",
        a: "Contiene un enlace de perfil normal. En la mayoría de los teléfonos se abre en la app si está instalada y en el navegador si no lo está.",
      },
      {
        q: "¿Qué pasa si cambio mi nombre de usuario?",
        a: "El código sigue apuntando a la dirección antigua, que puede dejar de funcionar o acabar perteneciendo a otra persona. Crea un código nuevo después del cambio.",
      },
      {
        q: "¿Puedo poner varios perfiles en un solo código?",
        a: "No, un código abre una sola dirección. Usa una página de enlaces como Linktree y crea un código para esa página.",
      },
      {
        q: "¿Dónde encuentro el Place ID de Google?",
        a: "Google ofrece el Place ID Finder en la documentación de Maps. Busca tu negocio allí y copia el ID que empieza por ChIJ.",
      },
      {
        q: "¿Mi perfil sigue siendo privado si creo un código?",
        a: "El código solo contiene la dirección pública del perfil. Lo que ve la gente al escanear depende de la configuración de privacidad de tu cuenta.",
      },
    ],
  },

  whatsapp: {
    title: "Generador de QR de WhatsApp",
    subtitle: "Permite que tus clientes te escriban por WhatsApp escaneando un código, con un mensaje ya preparado si quieres.",
    metaTitle: "QR de WhatsApp — Gratis, sin registro",
    metaDescription:
      "Crea un código QR de WhatsApp que abre un chat con tu número y un mensaje predefinido. Funciona en iPhone y Android, nunca caduca, gratis y sin registro.",
    sections: {
      howTitle: "Cómo funciona un QR de WhatsApp",
      how: [
        "El código usa el enlace oficial de WhatsApp para iniciar chats. Tu número se reduce a solo dígitos, sin el signo +, espacios ni ceros iniciales, y el mensaje se añade como texto codificado para URL: https://wa.me/34600123456?text=Hola%2C%20quisiera%20reservar%20una%20mesa.",
        "Al escanearlo, el teléfono abre el enlace, se inicia WhatsApp y aparece un chat con tu número con el mensaje esperando en el cuadro de texto. No se envía nada hasta que la persona toca enviar, así que puede editarlo antes. Si no tiene WhatsApp instalado, el enlace abre una página que ofrece descargarlo o usar WhatsApp Web.",
        "El número debe incluir el código de país, porque wa.me no tiene forma de adivinarlo. El generador acepta de 7 a 15 dígitos, lo que cubre los números internacionales. Una cuenta de WhatsApp Business funciona igual que una personal.",
      ],
      usesTitle: "Dónde resulta útil",
      uses: [
        "Una peluquería imprime el código en su tarjeta con el mensaje “Quisiera pedir cita”, así las reservas llegan siempre con el mismo formato.",
        "Una tienda en línea añade un código al albarán del pedido para consultas, más cómodo que buscar una dirección de atención al cliente.",
        "Un guía turístico muestra un código en el punto de encuentro para que el grupo pueda contactarlo ese día.",
        "El propietario de un piso de alquiler deja un código en la carpeta de bienvenida para avisos de mantenimiento.",
      ],
      tipsTitle: "Consejos antes de imprimir",
      tips: [
        "Escribe el número en formato internacional, por ejemplo +52 55 1234 5678 o +34 600 123 456. Un cero inicial local se elimina, pero el código de país no se puede añadir por ti.",
        "Mantén el mensaje predefinido corto y concreto, como una solicitud de reserva o “Mi número de pedido es”. Los mensajes largos hacen el código más denso.",
        "Escanea tú mismo el código terminado y comprueba que el chat se abre con el nombre correcto. Un dígito equivocado envía a la gente a un desconocido.",
        "Si cambias de número, el código impreso seguirá abriendo el antiguo, así que tendrás que reimprimirlo.",
      ],
    },
    faq: [
      {
        q: "¿Funciona si la persona no tiene mi número guardado?",
        a: "Sí. Para eso sirve el enlace wa.me: el chat se abre sin tener que añadirte antes como contacto.",
      },
      {
        q: "¿El mensaje se envía automáticamente?",
        a: "No. Aparece en el cuadro de texto y la persona decide si lo envía tal cual, lo edita o lo borra.",
      },
      {
        q: "¿Funciona con WhatsApp Business?",
        a: "Sí. Usa el número registrado en tu cuenta de WhatsApp Business.",
      },
      {
        q: "¿Por qué mi código no abre un chat?",
        a: "La causa más común es un código de país incorrecto o ausente. Comprueba que el número de la línea de resultado empiece por tu código de país y no tenga un cero de más detrás.",
      },
    ],
  },

  text: {
    title: "Generador de códigos QR de texto",
    subtitle: "Guarda una nota, un código o un mensaje corto en un código QR que muestra el texto al escanearlo.",
    metaTitle: "Código QR de texto — Gratis, sin registro",
    metaDescription:
      "Codifica texto simple en un código QR: notas, números de serie, instrucciones o mensajes cortos. No necesita enlace ni internet para leerse. Gratis y sin registro.",
    sections: {
      howTitle: "Cómo funciona un código QR de texto",
      how: [
        "Un código de texto contiene exactamente los caracteres que escribes, sin prefijo ni enlace. Para escanearlo no hace falta internet: el texto se lee directamente del patrón. Eso lo hace útil en lugares sin cobertura o para información que no debe depender de que un sitio web siga en línea.",
        "Lo que hace el teléfono con el texto varía. Muchos lectores de Android y Google Lens muestran el texto con un botón para copiarlo. La app Cámara del iPhone puede mostrarlo en un aviso u ofrecer una búsqueda, según la versión de iOS. Si quieres que la gente abra una página, usa un código de URL; si deben leer una frase, el texto es la opción correcta.",
        "La capacidad es el límite principal. Las letras con tilde, la ñ, los alfabetos asiáticos y los emojis ocupan de dos a cuatro bytes cada uno, así que llenan el código antes que las letras sin acento. En la práctica, unos cientos de caracteres se escanean sin problema; si el contenido es demasiado largo, la vista previa te avisa.",
      ],
      usesTitle: "Dónde resulta útil",
      uses: [
        "Un taller etiqueta sus equipos con códigos que contienen el número de serie y la fecha de la última revisión, legibles incluso en un sótano sin cobertura.",
        "Una profesora esconde la solución de un acertijo en un código de la ficha, para que los alumnos la comprueben solo cuando estén listos.",
        "Un almacén imprime ubicaciones o referencias de piezas como códigos de texto que cualquier teléfono puede leer sin software especial.",
        "Una etiqueta de regalo lleva un mensaje personal corto que aparece cuando la persona lo escanea.",
      ],
      tipsTitle: "Consejos antes de imprimir",
      tips: [
        "Sé breve. Cada frase extra hace los cuadritos más pequeños, y los cuadritos pequeños necesitan una impresión más grande y mejor luz.",
        "Si la vista previa dice que el contenido es demasiado largo, pon la corrección de errores en Estándar en Estilo, o pasa el texto a una página web y usa un código de URL.",
        "No uses un código de texto para secretos. Cualquiera que lo escanee puede leer todos los caracteres.",
        "Prueba con un iPhone y con un Android, porque cada uno muestra el texto de forma distinta.",
      ],
    },
    faq: [
      {
        q: "¿Cuánto texto cabe en un código QR?",
        a: "El formato admite unos 2300 caracteres de texto latino sin tildes con la corrección de errores por defecto, pero a partir de unos cientos de caracteres cuesta escanearlo con el móvil. Las tildes y los caracteres no latinos ocupan más espacio.",
      },
      {
        q: "¿Hace falta internet para leer el texto?",
        a: "No. El texto está guardado en la propia imagen, así que cualquier lector puede leerlo sin conexión.",
      },
      {
        q: "¿Puedo usar saltos de línea?",
        a: "Sí. Los saltos de línea se conservan como parte del texto, aunque algunas apps lectoras los muestran como espacios.",
      },
      {
        q: "¿Por qué mi iPhone no muestra bien el texto?",
        a: "La app Cámara del iPhone está pensada sobre todo para enlaces y acciones. Para texto simple, prueba el Escáner de códigos del Centro de control o una app lectora, que muestran el texto completo.",
      },
    ],
  },

  wifi: {
    title: "Generador de código QR para WiFi",
    subtitle: "Deja que tus invitados se conecten a tu Wi-Fi escaneando, sin dictar ni escribir la contraseña.",
    metaTitle: "Código QR para WiFi — Gratis, sin registro",
    metaDescription:
      "Crea un código QR para WiFi que conecta iPhone y Android a tu red con un solo escaneo. Compatible con WPA/WPA2/WPA3, WEP y redes ocultas. Gratis y sin registro.",
    sections: {
      howTitle: "Cómo funciona un código QR para WiFi",
      how: [
        "El código guarda los datos de tu red en un formato corto y ampliamente compatible: WIFI:T:WPA;S:CafeInvitados;P:dia-soleado-42;;. T es el tipo de seguridad (WPA, WEP o nopass para una red abierta), S el nombre de la red y P la contraseña. En una red oculta se añade H:true;. Los caracteres con significado especial en este formato, como el punto y coma, los dos puntos, la coma, las comillas o la barra invertida, se escapan con una barra invertida, así que las contraseñas que los contienen también funcionan.",
        "En iPhone (iOS 11 o posterior), al apuntar la app Cámara al código aparece el aviso “Conectarse a la red”. La mayoría de los Android desde Android 10 ofrecen lo mismo con la cámara, Google Lens o la pantalla de ajustes de Wi-Fi, que tiene su propio botón para escanear QR. El teléfono se conecta directamente; no hace falta ninguna app ni conexión a internet para leer el código.",
        "La opción WPA cubre las redes WPA, WPA2 y WPA3. Elige WEP solo para routers muy antiguos.",
      ],
      usesTitle: "Dónde resulta útil",
      uses: [
        "Un cartel de mesa en una cafetería permite a los clientes conectarse mientras esperan su pedido, y el personal deja de deletrear la contraseña en la barra.",
        "Un apartamento turístico enmarca el código junto a la puerta de entrada, para que los huéspedes se conecten aunque no puedan localizar al anfitrión.",
        "Una sala de reuniones muestra en la pared el código de la red de invitados para las visitas que traen su portátil y su móvil.",
        "En casa, un código en la nevera te ahorra buscar la pegatina del router cada vez que vienen amigos.",
      ],
      tipsTitle: "Consejos antes de imprimir",
      tips: [
        "Cuando cambies la contraseña del Wi-Fi, el código impreso dejará de funcionar. Crea uno nuevo y sustituye las copias impresas al mismo tiempo.",
        "Usa una red de invitados separada si tu router la tiene. Cualquiera que fotografíe el código puede leer la contraseña.",
        "Escribe el nombre de la red exactamente como aparece, con mayúsculas y cualquier sufijo _5G. Los nombres distinguen mayúsculas y minúsculas.",
        "La hoja para imprimir añade el título “Conéctate al Wi-Fi” y el nombre de la red, para que quien no pueda escanear la escriba a mano.",
      ],
    },
    faq: [
      {
        q: "¿Un código QR para WiFi funciona en iPhone?",
        a: "Sí. Desde iOS 11, la app Cámara reconoce los códigos de Wi-Fi y muestra un aviso para conectarse a la red.",
      },
      {
        q: "¿Puedo cambiar la contraseña después sin reimprimir?",
        a: "No. La contraseña está guardada dentro del código, que es estático. Tras cambiarla, tienes que generar e imprimir un código nuevo.",
      },
      {
        q: "¿Se guarda mi contraseña del Wi-Fi en su servidor?",
        a: "El código se genera en tu navegador. Al guardar, copiar o imprimir, lo que escribiste puede registrarse según se describe en la Política de privacidad, pero las contraseñas de Wi-Fi siempre se ocultan antes de guardarse.",
      },
      {
        q: "¿Funciona con redes ocultas?",
        a: "Sí. Marca Red oculta y el código le indicará al teléfono que busque una red que no emite su nombre. En teléfonos antiguos el soporte de redes ocultas es menos fiable, así que pruébalo.",
      },
      {
        q: "¿Funciona con la red de un hotel que tiene página de inicio de sesión?",
        a: "Conecta el teléfono a la red, pero la página de acceso que aparezca después hay que completarla a mano.",
      },
    ],
  },

  vcard: {
    title: "Generador de códigos QR vCard",
    subtitle: "Pon tus datos de contacto en un código QR que se guarda directamente en la agenda del teléfono.",
    metaTitle: "Código QR vCard — Gratis, sin registro",
    metaDescription:
      "Crea un código QR vCard con tu nombre, teléfono, correo, empresa y sitio web. Con un escaneo se guarda el contacto en iPhone o Android. Gratis, sin registro.",
    sections: {
      howTitle: "Cómo funciona un código QR vCard",
      how: [
        "El código contiene una tarjeta de contacto en vCard 3.0, el formato que comparten las agendas desde hace décadas. Un ejemplo corto: BEGIN:VCARD, VERSION:3.0, N:García;Lucía;;;, ORG:Panadería La Espiga, TITLE:Gerente, TEL;TYPE=CELL:+34600123456, EMAIL:lucia@example.com, END:VCARD, cada uno en su propia línea. El teléfono del trabajo, el sitio web, la dirección y la nota solo se añaden si los rellenas.",
        "Al escanearlo con la app Cámara del iPhone o con la mayoría de las cámaras Android, aparece una vista previa del contacto con un botón para añadirlo. La persona puede revisar y editar los datos antes de guardar. No hace falta conexión a internet, porque toda la tarjeta está dentro del código.",
        "Cada campo añade caracteres, y los caracteres añaden cuadritos. Una tarjeta con nombre, móvil y correo es compacta; añadir una dirección larga y una nota puede duplicar la densidad.",
      ],
      usesTitle: "Dónde resulta útil",
      uses: [
        "Una tarjeta de presentación lleva un código en el reverso, así el nuevo contacto llega al teléfono con el nombre bien escrito y el número ya con formato.",
        "Una acreditación de congreso incluye un código vCard, más rápido que intercambiar tarjetas y teclear los datos después del evento.",
        "Un agente inmobiliario añade un código a los carteles y folletos para que los compradores guarden su número desde la puerta de la casa.",
        "Una recepción tiene a mano un código con la línea de soporte fuera de horario, para que las visitas lo guarden antes de irse.",
      ],
      tipsTitle: "Consejos antes de imprimir",
      tips: [
        "Menos campos, código menos denso. En una tarjeta pequeña suelen bastar nombre, móvil, correo y sitio web.",
        "Escribe los teléfonos con el código de país, como +34 600 123 456, para que se marquen bien desde el extranjero.",
        "Deja la nota corta o vacía. Es el campo que más fácilmente hace que el código sea difícil de escanear en una tarjeta.",
        "Guarda el contacto desde tu propio código en un iPhone y en un Android, y comprueba que nombres y números quedan en los campos correctos.",
      ],
    },
    faq: [
      {
        q: "¿El contacto se guarda automáticamente?",
        a: "No. El teléfono muestra una vista previa y la persona toca para añadirlo. No se guarda nada sin su confirmación.",
      },
      {
        q: "¿Y si cambia mi número o mi puesto?",
        a: "Los datos quedan fijos dentro del código. Crea un código nuevo y actualiza tus tarjetas impresas.",
      },
      {
        q: "¿Puedo añadir una foto a la vCard?",
        a: "Aquí no. Una foto sería demasiado grande para un código QR. Limítate a campos de texto.",
      },
      {
        q: "¿Funciona en iPhone y Android?",
        a: "Sí. La app Cámara del iPhone y la mayoría de las apps de cámara y lectores de Android, incluido Google Lens, admiten vCard 3.0.",
      },
    ],
  },

  email: {
    title: "Generador de códigos QR para correo electrónico",
    subtitle: "Abre un correo nuevo con la dirección, el asunto y el mensaje ya escritos.",
    metaTitle: "Código QR para correo electrónico — Gratis, sin registro",
    metaDescription:
      "Crea un código QR de correo que abre un mensaje nuevo con destinatario, asunto y texto ya rellenados. Ideal para opiniones, soporte e inscripciones. Gratis.",
    sections: {
      howTitle: "Cómo funciona un código QR de correo electrónico",
      how: [
        "El código contiene un enlace mailto: estándar. Primero va el destinatario y después el asunto y el mensaje como texto codificado: mailto:soporte@example.com?subject=Consulta%20pedido&body=Hola%2C%20mi%20n%C3%BAmero%20de%20pedido%20es. Los espacios se convierten en %20 para que todas las apps de correo los lean igual.",
        "Al escanearlo, el teléfono abre su app de correo predeterminada, como Mail en iPhone o Gmail en Android, con un borrador nuevo listo. La persona puede editar cualquier parte y decide cuándo enviarlo. Si el teléfono no tiene ninguna app de correo configurada, puede preguntar qué app usar o no mostrar nada útil, algo a tener en cuenta si tu público usa sobre todo el correo web.",
        "Solo el campo Para es obligatorio. El asunto y el mensaje son opcionales, pero ahorran tiempo a quien escribe y facilitan ordenar el correo que recibes.",
      ],
      usesTitle: "Dónde resulta útil",
      uses: [
        "Una tarjeta en la habitación de un hotel abre un correo a recepción con el asunto “Petición de habitación”, para que el personal lo gestione rápido.",
        "El manual de un producto incluye un código de soporte que rellena el nombre del modelo en el asunto.",
        "En un evento, una mesa pide a los visitantes que escaneen y envíen un correo de una línea para apuntarse a la lista de novedades, y así tienen una copia de su solicitud.",
        "Un colegio pone un código en una circular impresa para que las familias respondan sobre la asistencia, con el nombre de la clase en el asunto.",
      ],
      tipsTitle: "Consejos antes de imprimir",
      tips: [
        "Usa un asunto que la gente reconozca después en sus enviados, como el nombre del evento o el modelo del producto.",
        "Escribe el mensaje como una frase para completar, por ejemplo “Mi número de pedido es”, en lugar de un mensaje largo ya terminado.",
        "Usa una dirección que vayas a mantener. Una dirección personal que puede cambiar no es buena idea para material impreso.",
        "Escanea el código en un teléfono que use una app de correo distinta a la tuya para confirmar que el asunto y el mensaje llegan intactos.",
      ],
    },
    faq: [
      {
        q: "¿Al escanear se envía el correo?",
        a: "No. Solo abre un borrador. La persona lo revisa y toca enviar ella misma.",
      },
      {
        q: "¿Puedo añadir archivos adjuntos?",
        a: "No. El formato mailto: no admite adjuntos. Puedes incluir un enlace a un archivo en el texto del mensaje.",
      },
      {
        q: "¿Qué app de correo se abre?",
        a: "La que el teléfono use por defecto para el correo; normalmente Mail en iPhone y Gmail en la mayoría de los Android.",
      },
      {
        q: "¿Puedo usar tildes y caracteres especiales en el asunto?",
        a: "Sí. Las tildes, la ñ, los signos de puntuación y otros alfabetos se codifican para que la app de correo los muestre correctamente.",
      },
    ],
  },

  sms: {
    title: "Generador de códigos QR para SMS",
    subtitle: "Abre un SMS a tu número con el mensaje ya escrito.",
    metaTitle: "Código QR para SMS — Gratis, sin registro",
    metaDescription:
      "Crea un código QR para SMS que abre un mensaje nuevo con tu número y el texto ya escritos. Útil para altas, reservas y respuestas con palabra clave. Gratis.",
    sections: {
      howTitle: "Cómo funciona un código QR para SMS",
      how: [
        "El código usa el formato SMSTO, que los lectores de los teléfonos reconocen ampliamente: SMSTO:+34600123456:ALTA. El número se limpia para dejar solo dígitos y un signo + inicial, y el mensaje va después de los segundos dos puntos tal como lo escribiste.",
        "Al escanearlo, la app Cámara del iPhone y la mayoría de las cámaras Android abren la app Mensajes con el número en el destinatario y el texto en el cuadro del mensaje. Enviarlo siempre es decisión de la persona. Se aplican las tarifas normales de SMS de su operador, algo importante si tu público está de viaje.",
        "Como el mensaje viaja como un SMS normal, funciona en cualquier teléfono con línea móvil, sin app ni datos. Es ideal para respuestas cortas con palabra clave, como ALTA, BAJA o un código de reserva, que un sistema automático pueda leer.",
      ],
      usesTitle: "Dónde resulta útil",
      uses: [
        "Un cartel en el mostrador de una tienda invita a enviar una palabra clave para recibir promociones, más rápido que rellenar un formulario.",
        "Un aparcamiento muestra un código que envía el número de plaza al operador, para que los conductores no tengan que recordarlo.",
        "Un evento benéfico muestra un código que inicia un donativo por SMS con la palabra clave de la campaña ya escrita.",
        "Un servicio de reparaciones pone un código en su furgoneta para que la gente pida que la llamen con la palabra “Presupuesto”.",
      ],
      tipsTitle: "Consejos antes de imprimir",
      tips: [
        "Incluye el código de país en el número si alguien del extranjero puede escanear el código.",
        "Limita el mensaje a una palabra clave o una frase corta. Los mensajes largos hacen el código más denso y es más fácil modificarlos por error.",
        "Si gestionas una lista de altas, asegúrate de que tu proveedor de SMS procesa la palabra clave que imprimes antes de distribuir el material.",
        "Prueba en iPhone y en Android. Algunas apps lectoras antiguas abren Mensajes con el número pero dejan el texto vacío.",
      ],
    },
    faq: [
      {
        q: "¿El SMS se envía automáticamente al escanear?",
        a: "No. El teléfono solo prepara el mensaje. La persona tiene que tocar enviar.",
      },
      {
        q: "¿Funciona en iPhone?",
        a: "Sí. La app Cámara del iPhone reconoce los códigos SMSTO y abre Mensajes con el número y el texto ya escritos.",
      },
      {
        q: "¿Puedo enviarlo a más de un número?",
        a: "No. Un código SMS va dirigido a un único número. Para mensajes de grupo, considera un código de WhatsApp o de correo.",
      },
      {
        q: "¿Funciona sin datos móviles?",
        a: "Leer el código no necesita conexión, y el SMS va por la red móvil normal, así que no hacen falta datos.",
      },
    ],
  },

  phone: {
    title: "Generador de códigos QR para número de teléfono",
    subtitle: "Permite que te llamen escaneando un código, sin teclear tu número.",
    metaTitle: "Código QR para teléfono — Gratis, sin registro",
    metaDescription:
      "Crea un código QR de teléfono que abre el marcador con tu número listo para llamar. Ideal para carteles, vehículos y folletos. Estático, gratis y sin registro.",
    sections: {
      howTitle: "Cómo funciona un código QR de teléfono",
      how: [
        "El código contiene un enlace tel:, el mismo que usa un botón “Llámanos” en una web: tel:+34600123456. Se eliminan espacios, guiones y paréntesis, y solo se conservan los dígitos y un signo + inicial.",
        "Al escanearlo, el teléfono muestra el número y ofrece llamar. En iPhone la app Cámara muestra un aviso; en Android la cámara o Google Lens muestran un botón de llamada. El teléfono nunca marca solo; la persona siempre confirma. Es uno de los códigos más pequeños que se pueden crear, así que se escanea bien aunque se imprima pequeño.",
        "Como solo se conservan los dígitos y el +, las extensiones y pausas escritas con comas o “ext.” se eliminan. Si quien llama necesita una extensión, imprímela junto al código.",
      ],
      usesTitle: "Dónde resulta útil",
      uses: [
        "La furgoneta de un fontanero lleva un código grande en el lateral, para que quien va detrás en un atasco guarde la llamada para después sin apuntar nada.",
        "Un cartel de “Se vende” en la ventanilla de un coche abre una llamada al vendedor, más cómodo que intentar leer el número al pasar.",
        "La tarjeta de citas de una clínica enlaza con la línea de reservas y reduce las llamadas a números equivocados.",
        "Un edificio de viviendas muestra en el portal el teléfono de urgencias del administrador como código.",
      ],
      tipsTitle: "Consejos antes de imprimir",
      tips: [
        "Escribe el número en formato internacional, empezando por + y el código de país, para que funcione con visitantes y teléfonos en itinerancia.",
        "Imprime también el número como texto junto al código. Hay quien prefiere marcar, y ayuda a quien no tiene cámara.",
        "En vehículos y carteles exteriores, ajusta el tamaño a la distancia real: aproximadamente una décima parte, es decir, 30 cm para alguien a 3 m.",
        "Usa el archivo SVG para vinilos y carteles grandes, así los bordes se mantienen nítidos.",
      ],
    },
    faq: [
      {
        q: "¿El teléfono llama automáticamente al escanear?",
        a: "No. Muestra el número y la persona toca para llamar.",
      },
      {
        q: "¿Puedo incluir una extensión?",
        a: "En el código no. Las extensiones se eliminan al limpiar el número, así que imprímela como texto al lado.",
      },
      {
        q: "¿Funciona con fijos y números gratuitos?",
        a: "Sí. Funciona cualquier número que un teléfono pueda marcar, incluidos los gratuitos, siempre que el operador de quien llama permita la llamada.",
      },
      {
        q: "¿Y si cambia mi número?",
        a: "El número está guardado en el código, así que necesitarás un código nuevo y nuevas impresiones.",
      },
    ],
  },

  geo: {
    title: "Generador de códigos QR de ubicación",
    subtitle: "Lleva a la gente a un punto exacto del mapa con un código que contiene las coordenadas.",
    metaTitle: "Código QR de ubicación — Gratis, sin registro",
    metaDescription:
      "Crea un código QR de ubicación con latitud y longitud que abre una app de mapas en el punto exacto. Ideal para entradas, rutas y recintos. Gratis y sin registro.",
    sections: {
      howTitle: "Cómo funciona un código QR de ubicación",
      how: [
        "El código contiene un enlace geo: con dos números, latitud y longitud, separados por una coma: geo:40.416775,-3.703790. La latitud debe estar entre -90 y 90 y la longitud entre -180 y 180. Puedes escribirlas o usar el botón Usar mi ubicación estando en el lugar.",
        "En Android, al escanearlo suele abrirse Google Maps u otra app de mapas con un marcador en las coordenadas, listo para pedir indicaciones. En iPhone, el soporte de los enlaces geo: es menos uniforme; según la versión de iOS y la app lectora, puede abrir Apple Maps o solo mostrar las coordenadas. Si la mayoría de tus visitantes usan iPhone, un código de URL con un enlace compartido de Google Maps o Apple Maps puede ser más fiable.",
        "Las coordenadas señalan una posición, no la ficha de un negocio. Esa es su ventaja: sirven para lugares sin dirección, como una puerta lateral, una zona de aparcamiento o un punto de encuentro en un parque.",
      ],
      usesTitle: "Dónde resulta útil",
      uses: [
        "Una invitación de boda incluye un código con la entrada exacta de una finca que los mapas sitúan en el lado equivocado.",
        "El cartel del inicio de una ruta de senderismo enlaza con las coordenadas del aparcamiento, útil cuando no hay dirección postal.",
        "Una nota de entrega para un almacén lleva a los conductores al muelle de carga correcto y no a la entrada principal.",
        "El mapa de un festival marca la carpa de primeros auxilios o los objetos perdidos con códigos para quien se desoriente.",
      ],
      tipsTitle: "Consejos antes de imprimir",
      tips: [
        "Para obtener las coordenadas, mantén pulsado o haz clic derecho sobre el punto en Google Maps y copia los dos números que aparecen.",
        "Cinco decimales dan una precisión de un metro aproximadamente, más que suficiente. Más dígitos solo añaden densidad.",
        "Comprueba el signo de los números. Los lugares al oeste de Greenwich, como toda América, tienen longitud negativa, y los del hemisferio sur, latitud negativa.",
        "Escanea el código con un iPhone y con un Android antes de imprimir, porque las apps de mapas lo tratan de forma distinta.",
      ],
    },
    faq: [
      {
        q: "¿Un código QR de ubicación funciona en iPhone?",
        a: "A veces. Android gestiona bien los enlaces geo:, mientras que en iPhone depende de la versión de iOS y del lector. Pruébalo y, si tu público usa sobre todo iPhone, considera un enlace compartido de mapas en un código de URL.",
      },
      {
        q: "¿Puedo usar una dirección en lugar de coordenadas?",
        a: "Este tipo solo usa coordenadas. Para una dirección, ábrela en una app de mapas, copia el enlace para compartir y usa el tipo URL.",
      },
      {
        q: "¿Hace falta conexión a internet para escanear?",
        a: "Para leer las coordenadas, no. Para mostrar el mapa y las indicaciones, sí, salvo que la app de mapas tenga mapas sin conexión descargados.",
      },
      {
        q: "¿Comparte mi ubicación con alguien?",
        a: "No. El código solo contiene las coordenadas que introdujiste. Usar mi ubicación lee tu posición en el navegador únicamente para rellenar los campos.",
      },
    ],
  },

  event: {
    title: "Generador de códigos QR para eventos de calendario",
    subtitle: "Añade tu evento al calendario de la gente con un escaneo, con hora, lugar y detalles.",
    metaTitle: "Código QR para eventos de calendario — Gratis, sin registro",
    metaDescription:
      "Crea un código QR de evento con título, fecha, hora, lugar y notas. Con un escaneo se añade al calendario del teléfono, con zonas horarias resueltas. Gratis.",
    sections: {
      howTitle: "Cómo funciona un código QR de evento",
      how: [
        "El código contiene un evento iCalendar, el mismo formato que usan las invitaciones de calendario: BEGIN:VEVENT, SUMMARY:Presentación del producto, DTSTART:20261015T170000Z, DTEND:20261015T183000Z, LOCATION:Sala 3, END:VEVENT. Las horas se convierten de la zona horaria de tu dispositivo a UTC, indicado con la Z, así que cada teléfono muestra el evento en su hora local.",
        "En un evento de todo el día, las fechas se escriben sin hora, como DTSTART;VALUE=DATE:20261015. En este formato la fecha de fin es exclusiva, así que un evento de un día el 15 de octubre termina el 16 de octubre en el código; así lo esperan los calendarios, y se muestra como un solo día.",
        "En iPhone, la app Cámara reconoce el evento y ofrece añadirlo a Calendario. En Android depende del lector: Google Lens y muchas apps de cámara muestran la opción de añadir al calendario, mientras que algunas antiguas solo muestran el texto sin procesar.",
      ],
      usesTitle: "Dónde resulta útil",
      uses: [
        "El cartel de un concierto lleva un código que guarda la fecha y el lugar, para que quien pasa por delante no tenga que recordarlo.",
        "El boletín de un colegio añade códigos para las reuniones de familias, que llevan la hora y el aula directamente a calendarios muy llenos.",
        "La acreditación de un congreso incluye un código para cada taller, cada uno con su sala en el campo de lugar.",
        "Una clínica imprime la próxima cita como código en la tarjeta recordatorio.",
      ],
      tipsTitle: "Consejos antes de imprimir",
      tips: [
        "Revisa la zona horaria de tu dispositivo antes de crear el código. La hora que introduces se interpreta como hora local donde estás y se guarda en UTC.",
        "Pon la sala o la dirección completa en Lugar; muchos calendarios lo convierten en un enlace al mapa.",
        "Mantén la descripción corta. Notas prácticas como “Trae tu portátil” encajan bien; una agenda completa hace el código denso.",
        "Añade el evento desde tu propio código y confirma la fecha, la hora y la duración antes de imprimir.",
      ],
    },
    faq: [
      {
        q: "¿La hora será correcta para personas en otras zonas horarias?",
        a: "Sí. La hora se guarda en UTC, así que cada calendario la muestra en la hora local de quien lo ve. Un evento a las 18:00 en Madrid aparece a las 10:00 en Ciudad de México.",
      },
      {
        q: "¿Puedo cambiar el evento después de imprimirlo?",
        a: "No. Los datos están dentro del código. Si cambia la hora o el lugar, crea e imprime un código nuevo.",
      },
      {
        q: "¿Puedo crear un evento periódico?",
        a: "Con este generador no. Cada código describe un único evento.",
      },
      {
        q: "¿El evento se añade automáticamente?",
        a: "No. El teléfono muestra el evento y la persona elige añadirlo a su calendario.",
      },
    ],
  },

  payment: {
    title: "Generador de QR para PayPal y enlaces de pago",
    subtitle: "Cobra con un escaneo gracias a un código que abre tu PayPal.Me, Venmo, Cash App o página de propinas.",
    metaTitle: "QR para PayPal y enlaces de pago — Gratis, sin registro",
    metaDescription:
      "Crea un QR para PayPal.Me, Venmo, Cash App, Ko-fi, Buy Me a Coffee y más, con importe opcional en PayPal, Venmo y Cash App. Gratis y sin registro.",
    sections: {
      howTitle: "Cómo funciona un código QR de pago",
      how: [
        "El código contiene el enlace de pago público de tu cuenta. Eliges el servicio, escribes tu nombre de usuario y el enlace se crea por ti. Con importe, PayPal queda como https://paypal.me/tunombre/25.00, Venmo como https://venmo.com/u/tunombre?txn=pay&amount=25.00 y Cash App como https://cash.app/$tuetiqueta/25.00. Los enlaces de Buy Me a Coffee, Ko-fi, Patreon, Revolut.Me y Wise abren tu página sin importe.",
        "Al escanearlo, el enlace se abre en la app de pago si está instalada, o en el navegador si no. Quien paga inicia sesión en su propia cuenta, comprueba el destinatario y el importe, y confirma. El código no contiene datos de tarjeta ni bancarios, solo la dirección de tu página pública.",
        "Este sitio no procesa pagos, no cobra comisiones ni ve las transacciones. El dinero se mueve íntegramente dentro del servicio de pago, con sus condiciones y comisiones habituales.",
      ],
      usesTitle: "Dónde resulta útil",
      uses: [
        "Un puesto de mercado muestra un código de PayPal en la caja para los clientes que no llevan efectivo.",
        "Un músico callejero deja un código de Ko-fi o PayPal en el estuche del instrumento para recibir propinas.",
        "Un club deportivo imprime un código con la cuota de la temporada ya indicada, para que las familias no tengan que teclear el importe.",
        "Un profesional autónomo añade un código de pago al pie de una factura impresa.",
      ],
      tipsTitle: "Consejos antes de imprimir",
      tips: [
        "El importe es opcional. Déjalo vacío para propinas y donativos, para que quien paga elija; rellénalo para precios fijos.",
        "Los importes usan dígitos con un máximo de dos decimales y punto decimal, como 12.50. La moneda (EUR, MXN, USD…) es la configurada en tu cuenta, no en el código.",
        "Abre tú mismo el enlace del resultado y confirma que aparecen tu nombre y tu foto. Una errata en el usuario podría enviar el dinero a un desconocido.",
        "Venmo y Cash App solo funcionan con cuentas de Estados Unidos, y otros servicios tienen sus propias restricciones por país. En España y Latinoamérica, PayPal suele ser la opción más extendida; elige la que ya usan tus clientes.",
      ],
    },
    faq: [
      {
        q: "¿Es seguro mostrar mi código QR de pago en público?",
        a: "El código solo contiene tu página de pago pública, el mismo enlace que compartirías en un mensaje. No se puede usar para quitarte dinero.",
      },
      {
        q: "¿Puedo cambiar el importe después?",
        a: "El importe forma parte del código. Para cambiarlo, crea un código nuevo. Si los precios cambian a menudo, deja el importe vacío.",
      },
      {
        q: "¿Por qué no puedo indicar un importe en Ko-fi o Patreon?",
        a: "Sus enlaces públicos no aceptan un importe predefinido, así que quien paga lo elige en la página.",
      },
      {
        q: "¿Este sitio se queda con una parte de los pagos?",
        a: "No. El código simplemente abre tu página de pago. Las comisiones, si las hay, son las de PayPal, Venmo o el servicio que uses.",
      },
    ],
  },

  crypto: {
    title: "Generador de códigos QR para Bitcoin y criptomonedas",
    subtitle: "Comparte la dirección de tu billetera como un código QR que rellena la dirección y el importe en la app de billetera.",
    metaTitle: "Código QR para Bitcoin y criptomonedas — Gratis, sin registro",
    metaDescription:
      "Crea un código QR de Bitcoin, Ethereum, Litecoin, Dogecoin, Bitcoin Cash o Solana con tu dirección de billetera y un importe opcional. Estático y gratis.",
    sections: {
      howTitle: "Cómo funciona un código QR de criptomonedas",
      how: [
        "El código contiene una URI de pago que entienden las apps de billetera. Para Bitcoin sigue el formato BIP-21: bitcoin:bc1qexampleaddress?amount=0.0015&label=Puesto%20de%20cafe. El esquema indica la moneda, seguido de tu dirección y, opcionalmente, el importe en monedas y una etiqueta corta de hasta 60 caracteres. Litecoin, Dogecoin, Bitcoin Cash y Solana usan el mismo patrón con su propio esquema.",
        "Para Ethereum, el código contiene solo ethereum: y la dirección. Las billeteras tratan los importes de Ethereum de formas distintas, así que el importe lo escribe quien envía.",
        "El código está pensado para escanearse desde dentro de una app de billetera, con su botón de escanear o enviar. La cámara del teléfono también puede reconocerlo y ofrecer abrir una billetera instalada. La billetera muestra entonces la dirección y el importe para revisarlos; no se envía nada hasta que quien envía confirma.",
      ],
      usesTitle: "Dónde resulta útil",
      uses: [
        "Una tienda que acepta Bitcoin muestra un código en la caja, para que los clientes no tengan que copiar a mano una dirección de 42 caracteres.",
        "Un creador de contenido añade un código de donativos para una billetera de Solana o Litecoin al final de un vídeo o en un fanzine impreso.",
        "Un stand en un congreso muestra un código con un importe fijo para pagar una entrada o productos.",
        "Alguien que recibe una transferencia de un amigo muestra el código en su pantalla en lugar de enviar la dirección por chat.",
      ],
      tipsTitle: "Consejos antes de imprimir",
      tips: [
        "Comprueba la dirección carácter por carácter con la de tu billetera. Las transferencias de criptomonedas no se pueden revertir, y una dirección equivocada significa fondos perdidos.",
        "Asegúrate de que la moneda coincide con la billetera. Enviar una moneda a una dirección de otra red puede hacer que se pierdan los fondos.",
        "Los importes van en monedas, no en euros ni en pesos, con un máximo de ocho decimales. Como los precios varían, deja el importe vacío en lo que vaya a imprimirse para mucho tiempo.",
        "Considera usar una dirección exclusiva para recibir. Cualquiera que escanee un código público puede consultar el historial de esa dirección en la blockchain.",
      ],
    },
    faq: [
      {
        q: "¿Es seguro compartir el código QR de mi billetera?",
        a: "Compartir una dirección para recibir es normal y no permite a nadie gastar desde la billetera. Nunca pongas una clave privada ni una frase de recuperación en un código QR.",
      },
      {
        q: "¿Por qué no hay opción de importe para Ethereum?",
        a: "Las billeteras de Ethereum interpretan los importes de los enlaces de pago de forma distinta, así que, para evitar enviar una cantidad equivocada, el código solo contiene la dirección.",
      },
      {
        q: "¿Puedo aceptar tokens como USDT?",
        a: "Los tokens de otras redes necesitan su propia billetera y configuración de red. Este generador cubre las seis monedas nativas de la lista.",
      },
      {
        q: "¿Qué billeteras pueden leer el código?",
        a: "La mayoría de las billeteras populares leen el formato de pago tipo bitcoin:. Si una billetera ignora el importe o la etiqueta, la dirección sigue funcionando.",
      },
    ],
  },

  file: {
    title: "Generador de códigos QR para PDF",
    subtitle: "Enlaza un código QR a un PDF u otro archivo que hayas compartido desde Google Drive, Dropbox o tu sitio web.",
    metaTitle: "Código QR para PDF — Gratis, sin registro",
    metaDescription:
      "Crea un código QR que abre un PDF, carta, folleto o manual alojado en Google Drive, Dropbox o tu sitio web. Estático, nunca caduca, gratis y sin registro.",
    sections: {
      howTitle: "Cómo funciona un código QR para PDF",
      how: [
        "Un código QR no puede contener un PDF entero; incluso un documento corto pesa mucho más que los pocos kilobytes que caben en un código. Lo que contiene es un enlace al lugar donde está el archivo, como https://drive.google.com/file/d/1AbC…/view. Este sitio no sube ni aloja archivos, así que el primer paso es poner el PDF en línea.",
        "Súbelo a Google Drive, Dropbox, OneDrive o tu propio sitio web, copia el enlace para compartir y configura el acceso como “cualquier persona con el enlace”. Pega ese enlace aquí. Cuando alguien escanea el código, su teléfono abre el enlace en el navegador, donde puede ver o descargar el PDF.",
        "El código funciona mientras funcione el enlace. Si el archivo se borra, se mueve a otro enlace o se hace privado, la gente verá un error o una página de inicio de sesión.",
      ],
      usesTitle: "Dónde resulta útil",
      uses: [
        "Un restaurante enlaza un código al PDF de la carta y actualiza el archivo cada temporada sin cambiar los carteles de mesa.",
        "La caja de un producto incluye un código al manual completo, así el folleto impreso solo necesita lo básico de seguridad.",
        "El cartel de un inmueble en venta abre el plano y el folleto para quien pase por delante.",
        "Un congreso reparte un único código con las diapositivas y los materiales después de la charla.",
      ],
      tipsTitle: "Consejos antes de imprimir",
      tips: [
        "Prueba el enlace en una ventana privada del navegador sin haber iniciado sesión. Si ahí te pide acceso, la configuración de compartir es incorrecta.",
        "Para actualizar un archivo sin cambiar el enlace, sustitúyelo en lugar de subir una copia nueva. La opción Gestionar versiones de Google Drive mantiene el mismo enlace.",
        "Evita enlaces que caducan, como los enlaces de descarga temporales de algunos servicios de transferencia de archivos.",
        "Mantén el PDF ligero y legible en la pantalla de un móvil. Un escaneo de 50 MB tarda en abrirse con datos móviles.",
      ],
    },
    faq: [
      {
        q: "¿Puedo subir mi PDF aquí?",
        a: "No. Este sitio solo crea el código. Aloja el archivo en Google Drive, Dropbox o tu propio sitio y pega su enlace para compartir.",
      },
      {
        q: "¿Por qué la gente ve “Solicitar acceso” al escanear?",
        a: "El archivo no está compartido públicamente. Cambia la configuración para que “cualquier persona con el enlace pueda ver”.",
      },
      {
        q: "¿Puedo cambiar el PDF después de imprimir el código?",
        a: "Sí, siempre que el enlace siga siendo el mismo. Sustituye el contenido del archivo en la misma dirección; subir una copia nueva crea un enlace nuevo.",
      },
      {
        q: "¿Funciona con archivos que no sean PDF?",
        a: "Sí. Funciona cualquier archivo con un enlace para compartir, incluidas imágenes, presentaciones y audio. Que se previsualice en el teléfono depende del tipo de archivo.",
      },
    ],
  },

  pix: {
    title: "Generador de códigos QR Pix",
    subtitle: "Crea un código Pix estático con tu clave Pix, tu nombre y un importe opcional que cualquier app bancaria de Brasil paga con un solo escaneo.",
    metaTitle: "Código QR Pix (BR Code estático) — Gratis, sin registro",
    metaDescription:
      "Crea un código QR Pix estático (BR Code) a partir de tu clave Pix, nombre, ciudad y un importe opcional. Sigue la norma del Banco Central de Brasil y se genera en tu navegador. Gratis, sin registro.",
    sections: {
      howTitle: "Cómo funciona un código QR Pix",
      how: [
        "El código contiene un BR Code: el formato de texto que el Banco Central do Brasil definió para Pix, el sistema de pagos instantáneos de Brasil, basado en el estándar EMV para códigos QR presentados por el comercio. Cada dato se escribe como un identificador, una longitud de dos dígitos y el valor. El bloque de la cuenta del comercio lleva el identificador br.gov.bcb.pix y tu clave Pix; después vienen la categoría de comercio 0000, la moneda 986 del real, el importe opcional, el país BR, tu nombre (hasta 25 letras), tu ciudad (hasta 15) y el ID de transacción. Una suma de comprobación CRC-16 cierra la cadena, de modo que la app del banco rechaza un código dañado o manipulado en lugar de pagar a la persona equivocada.",
        "Es un código estático, el mismo tipo que un banco te da para imprimir junto a la caja. No llama a ninguna API ni a un servicio de pagos, así que el ID de transacción se fija en *** cuando lo dejas vacío, exactamente como muestra el manual del Banco Central para los códigos estáticos. Si escribes uno (letras y números, hasta 25), viaja con el pago y aparece en tu extracto, lo que facilita la conciliación.",
        "Quien paga abre su app bancaria o billetera (Nubank, Itaú, Bradesco, Caixa, PicPay, Mercado Pago y cualquier otro participante de Pix), elige Pix y escanea. La app busca la clave en el directorio central y muestra el nombre registrado del titular de la cuenta, no el nombre que va en el código, para que quien paga confirme quién recibe el dinero. Si el código lleva importe, aparece ya rellenado; si no, lo escribe quien paga. La misma cadena es también el texto Pix copia e cola que se muestra bajo el formulario y que puedes pegar en un mensaje.",
      ],
      usesTitle: "Dónde resulta útil",
      uses: [
        "Un vendedor ambulante o un puesto de mercado imprime un código sin importe, y cada cliente escanea y escribe lo que debe.",
        "Una tienda pequeña coloca junto a un producto un código con precio fijo, por ejemplo un plato del día de R$ 25,00.",
        "Un condominio o un club envía un código con la cuota mensual y un ID de transacción como COTA2026MAR, para que los pagos sean fáciles de identificar.",
        "Una iglesia, una feria escolar o una ONG muestra un código de donación en un cartel o en la pantalla de una transmisión en directo.",
      ],
      tipsTitle: "Consejos antes de imprimir",
      tips: [
        "Las claves de teléfono deben empezar por +55, por ejemplo +5511912345678. Once dígitos sin más se interpretan como un CPF, que es una clave distinta.",
        "Escribe el nombre y la ciudad cortos y sin acentos. La norma admite 25 y 15 caracteres, y los acentos se eliminan automáticamente; de todos modos, las apps bancarias muestran el nombre registrado con la clave.",
        "Prueba el código con tu propia app bancaria antes de imprimir. La app muestra el nombre registrado del titular de la clave; si no es el tuyo, la clave tiene una errata.",
        "Para precios que cambian, deja el importe vacío y escribe el precio junto al código. Un código con importe hay que generarlo de nuevo cada vez que cambia el precio.",
      ],
    },
    faq: [
      {
        q: "¿Es un código Pix oficial?",
        a: "Sigue la norma BR Code del Banco Central do Brasil para códigos Pix estáticos, el mismo formato que usa tu banco. Cualquier app compatible con Pix lo lee. El sitio no es una institución de pago y no participa en la transferencia.",
      },
      {
        q: "¿El código caduca?",
        a: "No. Un código Pix estático funciona mientras la clave siga registrada en tu cuenta. Si eliminas la clave o la trasladas a otro banco, crea un código nuevo.",
      },
      {
        q: "¿Puedo ver quién pagó?",
        a: "Los pagos llegan a tu cuenta bancaria como cualquier transferencia Pix, con el nombre de quien paga. Añadir un ID de transacción (txid) al código te ayuda a distinguir en el extracto los pagos de ese código de los demás.",
      },
      {
        q: "¿Por qué la app muestra un nombre distinto del que escribí?",
        a: "Las apps bancarias muestran el nombre registrado con la clave Pix en el directorio central (DICT) e ignoran el nombre que va dentro del código. La norma exige igualmente ese nombre, así que escribe el tuyo; quien paga verá tu nombre registrado.",
      },
    ],
  },

  upi: {
    title: "Generador de códigos QR UPI",
    subtitle: "Convierte tu UPI ID en un código QR de pago que PhonePe, Google Pay, Paytm y cualquier otra app UPI de India pueden escanear.",
    metaTitle: "Código QR UPI — Gratis, sin registro",
    metaDescription:
      "Crea un código QR de pago UPI a partir de tu UPI ID y tu nombre, con importe y nota opcionales. Usa el formato upi://pay de NPCI y se genera en tu navegador. Gratis, sin registro.",
    sections: {
      howTitle: "Cómo funciona un código QR UPI",
      how: [
        "El código contiene un enlace UPI en el formato publicado por NPCI, el organismo que gestiona UPI, el sistema de pagos instantáneos de India: upi://pay?pa=tuid@banco&pn=Tu%20Nombre&am=250.00&cu=INR&tn=Mesa%204. El parámetro pa es tu UPI ID (también llamado VPA), pn es el nombre del beneficiario que ve quien paga, am es el importe opcional, cu es siempre INR y tn es una nota opcional. Los espacios y caracteres especiales del nombre y la nota se codifican con porcentajes, de modo que el enlace es una sola cadena sin cortes.",
        "Todas las apps UPI de India están obligadas a entender este enlace, así que el mismo código funciona en PhonePe, Google Pay, Paytm, BHIM, Amazon Pay y en las apps de los bancos. Quien paga abre la app, toca Escanear y la app rellena tu UPI ID, el nombre y el importe si lo fijaste. Confirma con su PIN de UPI y el dinero pasa de una cuenta bancaria a otra en segundos.",
        "Es la forma estática del enlace, la que presenta el comercio. Los campos que usan las pasarelas de pago en los códigos dinámicos, como una referencia de transacción, un código de comercio o una firma, se omiten a propósito. Así el código es simple y válido para un UPI ID personal; una cuenta de comercio registrada también funciona, porque la app solo necesita el ID.",
      ],
      usesTitle: "Dónde resulta útil",
      uses: [
        "Una tienda de barrio o un puesto de té imprime un código sin importe, y los clientes escriben lo que deben tras cada venta.",
        "Una repostera o un sastre que trabaja desde casa comparte un código con precio fijo en un mensaje de WhatsApp o en un folleto.",
        "Una comunidad de vecinos o una escuela cobra una cuota con un código que lleva el importe y una nota como Mantenimiento marzo.",
        "Un templo, una ONG o un festival universitario muestra un código de donación en una pancarta o en pantalla durante un evento.",
      ],
      tipsTitle: "Consejos antes de imprimir",
      tips: [
        "Revisa el UPI ID carácter por carácter. Entre los sufijos habituales están @okaxis, @oksbi, @ybl, @paytm, @ibl y @upi; una letra equivocada envía el dinero a otra persona o hace fallar el pago.",
        "Escribe el nombre del beneficiario tal como figura en tu banco, para que quien paga vea un nombre que reconoce. La app muestra tanto este nombre como el nombre verificado del titular de la cuenta.",
        "Deja el importe vacío en comercios con cuentas variables. Para cobros fijos, rellénalo para que quien paga no pueda equivocarse al teclearlo.",
        "Escanea el código terminado con dos apps UPI distintas antes de imprimir. Si una muestra un nombre o un importe incorrecto, corrígelo ahora y no después de cien copias.",
      ],
    },
    faq: [
      {
        q: "¿Funciona con PhonePe, Google Pay y Paytm?",
        a: "Sí. El código usa el enlace estándar upi://pay que NPCI exige a todas las apps UPI, así que funciona sin importar qué app use quien paga ni a qué banco pertenezca tu UPI ID.",
      },
      {
        q: "¿Necesito una cuenta de comercio?",
        a: "No. Un UPI ID personal funciona. Los códigos de comercio que genera un proveedor de pagos pueden llevar campos adicionales, como una categoría de comercio o una firma; este código es la forma simple, que solo necesita tu UPI ID y tu nombre.",
      },
      {
        q: "¿El sitio procesa o ve los pagos?",
        a: "No. El código solo contiene el enlace descrito arriba. El pago ocurre por completo dentro de la app UPI de quien paga y tu banco; nada pasa por este sitio.",
      },
      {
        q: "¿Puedo elegir la moneda o poner un importe en paise?",
        a: "La moneda es siempre INR, la única que admite UPI. Los importes aceptan hasta dos decimales, por ejemplo 99.50, así que los paise están cubiertos.",
      },
    ],
  },

  epc: {
    title: "Generador de códigos QR EPC (GiroCode)",
    subtitle: "Crea un código QR de transferencia SEPA con tu IBAN, tu nombre y un importe opcional que las apps bancarias europeas rellenan automáticamente.",
    metaTitle: "Código QR EPC / GiroCode para transferencias SEPA — Gratis, sin registro",
    metaDescription:
      "Crea un código QR EPC (GiroCode) para una transferencia SEPA a partir de tu IBAN, nombre, importe y concepto. Sigue la guía del Consejo Europeo de Pagos. Gratis, sin registro.",
    sections: {
      howTitle: "Cómo funciona un código QR EPC",
      how: [
        "El código contiene un texto corto definido por el Consejo Europeo de Pagos (EPC) en su guía EPC069-12 para transferencias SEPA. Tiene hasta doce líneas separadas por saltos de línea: BCD, la versión 002, el juego de caracteres 1 para UTF-8, el servicio SCT, el BIC opcional, el nombre del beneficiario (hasta 70 caracteres), el IBAN, el importe en la forma EUR12.50, un código de propósito que se deja vacío, una referencia de acreedor estructurada o un concepto de texto libre (hasta 140 caracteres) y una nota para quien paga (hasta 70). Las líneas vacías del final se eliminan y el contenido completo se mantiene dentro de los 331 bytes que exige la guía.",
        "Las apps bancarias de Alemania y Austria conocen este formato como GiroCode; en Países Bajos y Bélgica, como EPC QR; en Finlandia, como código QR de pago. También se admite en Luxemburgo, Italia, Estonia, Letonia y Lituania. Quien paga abre la app, elige escanear o fotografiar una transferencia, y el beneficiario, el IBAN, el importe y el concepto aparecen en el formulario. Revisa los datos y aprueba la transferencia como siempre.",
        "El IBAN se limpia y se verifica antes de construir el código: se quitan los espacios, las letras pasan a mayúsculas, se comprueba la longitud según el país y se validan los dígitos de control con el algoritmo mod-97. Una referencia que sea una referencia de acreedor ISO 11649 válida (RF seguido de dígitos de control) se coloca automáticamente en el campo estructurado; cualquier otro texto va al campo no estructurado.",
      ],
      usesTitle: "Dónde resulta útil",
      uses: [
        "Un autónomo o una pequeña empresa imprime el código en la factura junto a los datos bancarios, para que el cliente pague sin teclear el IBAN.",
        "Un club o una asociación pone en la carta a sus socios un código con la cuota anual y un concepto como Cuota 2026.",
        "Un arrendador comparte con sus inquilinos un código del alquiler, con el importe y el concepto que debe aparecer en el extracto.",
        "Una ONG o una parroquia muestra un código de donación sin importe en un cartel o en un boletín.",
      ],
      tipsTitle: "Consejos antes de imprimir",
      tips: [
        "El BIC es opcional para transferencias SEPA dentro de la UE desde la versión 002, así que déjalo vacío salvo que tu banco lo pida.",
        "Escribe un concepto significativo pero corto: un número de factura o de cliente es lo que luego buscarás en tu extracto.",
        "Para el importe puedes usar punto o coma; ambos se aceptan y se escriben como EUR49.90 en el código. Este formato solo admite importes en euros.",
        "Escanea el código con tu propia app bancaria antes de imprimir. Si el IBAN o el nombre no coinciden con tu cuenta, corrige la errata ahora.",
      ],
    },
    faq: [
      {
        q: "¿Qué apps bancarias pueden leer este código?",
        a: "La mayoría de las apps bancarias de Alemania, Austria, Países Bajos, Bélgica, Finlandia y otros países SEPA, incluidas Sparkasse, Volksbank, Deutsche Bank, Commerzbank, ING, Rabobank, ABN AMRO, Erste Bank y muchas fintech. En Francia y España la compatibilidad todavía es limitada y varía según el banco: no es un pago Bizum, sino una transferencia SEPA con los datos ya rellenados, así que prueba con las apps que usan tus pagadores.",
      },
      {
        q: "¿Es lo mismo que GiroCode?",
        a: "Sí. GiroCode es el nombre alemán del código QR EPC descrito en la guía del Consejo Europeo de Pagos. Otros países usan otros nombres para el mismo formato.",
      },
      {
        q: "¿Quien paga puede cambiar el importe o el concepto?",
        a: "Sí. El código solo rellena el formulario de transferencia en la app de quien paga; todos los campos siguen siendo editables antes de aprobar la transferencia.",
      },
      {
        q: "¿Sirve para transferencias inmediatas?",
        a: "El código describe una transferencia SEPA. Que se ejecute como transferencia inmediata depende del banco de quien paga y de la opción que elija en la app, no del código.",
      },
    ],
  },
};

/** Spanish copy for the use-case landing pages (/es/restaurant-menu-qr-code, …). */
export const useCasesEs: Record<UseCaseId, LandingCopy> = {
  restaurant_menu: {
    title: "Menú QR para restaurante",
    subtitle: "Imprime un código para cada mesa que abre tu carta actual en el móvil del cliente.",
    metaTitle: "Menú QR para restaurante — Gratis, sin registro",
    metaDescription:
      "Crea el código QR de la carta de tu restaurante que abre tu página de menú o PDF. Estático, nunca caduca, listo para carteles de mesa y escaparates. Gratis.",
    sections: {
      howTitle: "Cómo funciona un menú QR",
      how: [
        "Un menú QR no contiene la carta. Contiene un enlace, como `https://turestaurante.com/menu`, y el teléfono abre lo que muestre esa dirección. Así que el primer paso es decidir dónde vive la carta: una página de tu propio sitio web, un PDF compartido desde Google Drive o Dropbox, o la página que te da un servicio de cartas digitales o pedidos. Este sitio solo crea el código; no aloja cartas ni archivos.",
        "Como el código es estático, el enlace queda fijo en cuanto lo imprimes. Lo que sí puedes cambiar es el contenido detrás del enlace. Si la carta está siempre en la misma dirección y actualizas esa página o sustituyes el PDF en el mismo sitio, todos los carteles de mesa siguen funcionando con cambios de precios y de temporada. Si cambia la propia dirección, por ejemplo al cambiar de servicio de cartas, hay que sustituir los códigos impresos.",
        "Los clientes escanean con la cámara del móvil, ven la dirección y tocan para abrirla, sin instalar ninguna app. Un enlace corto en tu propio dominio, además, inspira más confianza que uno largo de un tercero.",
      ],
      usesTitle: "Dónde resulta útil",
      uses: [
        "Carteles o pegatinas en cada mesa, para que los clientes consulten la carta mientras esperan en lugar de compartir una carta plastificada.",
        "Una pegatina en el escaparate junto a la puerta para que quien pasa vea platos y precios antes de entrar, incluso con el local cerrado.",
        "Un folleto en la bolsa de comida para llevar o en el tique que enlaza a la carta para el próximo pedido desde casa.",
        "Un código aparte en la barra para la página de alérgenos e ingredientes, para que el personal pueda señalarlo cuando pregunten.",
      ],
      tipsTitle: "Consejos antes de imprimir",
      tips: [
        "Usa una dirección que controles, como tudominio.com/menu, y redirígela a donde esté la carta en cada momento. Así, cambiar de servicio de cartas no obliga a reimprimir todos los carteles de mesa.",
        "Abre la carta en un móvil con datos móviles, no con el Wi-Fi del restaurante. Un PDF grande de páginas escaneadas carga lento y se lee mal en una pantalla pequeña; una página web sencilla funciona mejor.",
        "Ten cartas impresas disponibles. Algunos clientes no tienen smartphone, se han quedado sin batería o ven mal, y un código QR debe ser una comodidad, no la única forma de pedir.",
        "Muestra la información de alérgenos en línea con la misma claridad que en papel, y actualízala cada vez que cambie un plato.",
        "Imprime el código de al menos 2 a 3 cm de ancho en los carteles de mesa. Para el escaparate, Hoja para imprimir / PDF crea un póster A4 con un título editable, como “Escanea para ver nuestra carta”.",
      ],
    },
    faq: [
      {
        q: "¿Puedo subir mi carta aquí?",
        a: "No. Este sitio solo crea el código. Publica la carta en tu sitio web, comparte un PDF desde Google Drive o Dropbox con “cualquier persona con el enlace” o usa el enlace de tu servicio de cartas, y pega esa dirección aquí.",
      },
      {
        q: "¿Necesito un código nuevo cuando cambia la carta?",
        a: "No, si la dirección sigue siendo la misma. Actualiza la página o sustituye el PDF en el mismo enlace, y los códigos impresos mostrarán siempre la versión más reciente.",
      },
      {
        q: "¿El código dejará de funcionar con el tiempo?",
        a: "No. Es un código estático con el enlace guardado en la imagen, así que no hay ninguna suscripción que pueda vencer. Funciona mientras la página de la carta siga en línea.",
      },
      {
        q: "¿Uso un código para todas las mesas o uno por mesa?",
        a: "Basta con un código si todas las mesas ven la misma carta. Los códigos separados solo sirven si tu sistema de pedidos da un enlace propio a cada mesa; puedes convertir esa lista en códigos en la página Por lotes, hasta 200 a la vez en un ZIP.",
      },
    ],
  },

  wedding: {
    title: "Generador de códigos QR para bodas",
    subtitle: "Enlaza las invitaciones a la web de tu boda o al formulario de confirmación, y reúne las fotos del banquete en un álbum compartido.",
    metaTitle: "Código QR para bodas — Gratis, sin registro",
    metaDescription:
      "Crea un código QR para tu boda: invitaciones, confirmación de asistencia, cómo llegar y álbum de fotos compartido. Estático, nunca caduca, listo para imprimir.",
    sections: {
      howTitle: "Cómo funciona un código QR para bodas",
      how: [
        "Un código QR de boda contiene un enlace, y el enlace decide qué ven los invitados. En una invitación suele ser la web de la boda o directamente el formulario de confirmación de asistencia, ya sea de un servicio de webs de boda, de Google Forms o de otro. El invitado escanea, se abre la página y responde sin teclear una dirección larga de la tarjeta.",
        "Lo mismo sirve para el resto del día. Un código con un enlace compartido de Google Maps o Apple Maps lleva a los invitados al lugar, y un código en el banquete que abre un álbum compartido de Google Fotos o iCloud permite que todos suban las fotos que hicieron. Cada propósito necesita su propio código, porque un código abre una sola dirección.",
        "Los códigos creados aquí son estáticos: el enlace está guardado en la imagen y nunca caduca, así que se abrirá dentro de años si la página sigue en línea. La otra cara es que el enlace no se puede cambiar después de imprimir. Deja definidas las direcciones de la web, el formulario y el álbum antes de mandar las invitaciones a la imprenta.",
      ],
      usesTitle: "Dónde resulta útil",
      uses: [
        "El reverso de la invitación o una tarjeta adicional enlaza al formulario de confirmación, para que las respuestas lleguen a un solo sitio y no por mensaje, correo y teléfono.",
        "Un save the date o una tarjeta de información abre la web de la boda con datos de viaje, alojamiento y código de vestimenta.",
        "Una tarjeta de cómo llegar o un cartel de bienvenida abre un enlace de mapa para un lugar difícil de encontrar, como una finca al final de un camino privado.",
        "Tarjetas en las mesas del banquete abren un álbum de fotos compartido, para que los invitados suban sus fotos antes de que se les olvide.",
      ],
      tipsTitle: "Consejos antes de imprimir",
      tips: [
        "En una invitación, unos 2 a 2,5 cm son cómodos para un móvil en la mano. Un enlace más corto da un patrón más amplio que se imprime con más fiabilidad a ese tamaño.",
        "La tinta oscura sobre papel crema, marfil o kraft suele escanearse bien; el dorado en relieve, las tintas pastel y el gris claro a menudo no. Elige un color oscuro en Estilo y prueba una muestra impresa en el papel definitivo.",
        "Deja la zona de silencio, el margen vacío alrededor del código, libre de adornos, bordes e ilustraciones. Los lectores la necesitan para encontrar el código.",
        "Revisa los permisos: el enlace del álbum debe permitir que los invitados añadan fotos, y el formulario debe estar abierto a cualquier persona con el enlace, no solo a tu cuenta.",
        "Antes de encargar la tirada completa, escanea una prueba con un iPhone y un Android, envía una confirmación de prueba y pide a alguien que suba una foto al álbum.",
      ],
    },
    faq: [
      {
        q: "¿Puedo cambiar adónde lleva el código después de imprimir las invitaciones?",
        a: "El código en sí no, porque es estático. Sí puedes editar lo que muestra la página, así que actualiza la web o el formulario en lugar de cambiar el enlace.",
      },
      {
        q: "¿El código seguirá funcionando después de la boda?",
        a: "El código no tiene fecha de caducidad. Funciona mientras la web, el formulario o el álbum del enlace sigan en línea, así que los invitados podrán volver a ver las fotos si mantienes el álbum compartido.",
      },
      {
        q: "¿Puede cada invitado tener su propio código de confirmación?",
        a: "Si tu servicio de confirmaciones da un enlace distinto a cada invitado, puedes convertir la lista en códigos en la página Por lotes, hasta 200 a la vez, como un ZIP de archivos PNG.",
      },
      {
        q: "¿Envío PNG o SVG a la imprenta?",
        a: "Envía el archivo SVG a la imprenta o al diseñador. Es un archivo vectorial, así que se mantiene nítido a cualquier tamaño. El PNG sirve para la web de la boda o para un mensaje a los invitados.",
      },
    ],
  },

  business_card: {
    title: "Código QR para tarjetas de presentación",
    subtitle: "Pon en tu tarjeta un contacto que guarda tus datos en el teléfono con un solo escaneo.",
    metaTitle: "Código QR para tarjetas de presentación — Gratis, sin registro",
    metaDescription:
      "Crea un código QR para tu tarjeta de presentación que guarda tu nombre, teléfono, correo y web en los contactos del móvil. vCard 3.0, estático y gratis.",
    sections: {
      howTitle: "Cómo funciona un código QR en una tarjeta de presentación",
      how: [
        "El código para tarjetas creado aquí contiene una tarjeta de contacto vCard 3.0, el formato que leen las agendas de los teléfonos. Al escanearlo, el teléfono muestra tu nombre, empresa, número y correo en una vista previa del contacto, y con un toque se añade. No hay nada que cargar, así que funciona en un pabellón de congresos con mala cobertura, y tu nombre se guarda tal como lo escribes.",
        "La alternativa es un código que enlaza a un perfil, como tu web o tu página de LinkedIn. Un enlace puede mostrar más y su página se puede actualizar sin reimprimir, pero la persona tiene que guardar tu número ella misma. Un código de contacto lo guarda por ella. Hay quien usa ambos: el código de contacto en el reverso y una dirección web corta impresa como texto.",
        "Cada campo que rellenas se guarda en la imagen, así que el código crece con la información. Una tarjeta con nombre, empresa, móvil, correo y web sigue siendo compacta; añadir una dirección postal completa y una nota hace el patrón más denso y más difícil de leer al tamaño de una tarjeta.",
      ],
      usesTitle: "Dónde resulta útil",
      uses: [
        "Eventos de networking y ferias, donde repartes decenas de tarjetas y quieres que cada una acabe en un teléfono y no en un cajón.",
        "Autónomos y consultores que se reúnen con clientes en persona y quieren que se guarden el correo y el número correctos, no adivinados a partir de una foto de la tarjeta.",
        "Las tarjetas de un equipo comercial, donde cada persona tiene un código con su línea directa.",
        "Una tarjeta en recepción que guarda el contacto general de la oficina para las visitas.",
      ],
      tipsTitle: "Consejos antes de imprimir",
      tips: [
        "En una tarjeta estándar de 85 × 55 mm, imprime el código de al menos 2 cm de ancho, con un margen libre alrededor. Si tiene el reverso para él solo, 2,5 a 3 cm es más cómodo.",
        "Limítate a los campos que la gente necesita: nombre, empresa, móvil, correo y web. Deja vacías la dirección y la nota salvo que importen.",
        "Escribe los números con el código de país, como +34 600 123 456, para que funcionen con contactos del extranjero.",
        "La página Por lotes crea códigos de enlace y de texto, no tarjetas de contacto. Para un equipo, crea el código de cada persona en esta página y guarda el archivo SVG para cada diseño de tarjeta.",
        "Escanea una prueba impresa con un iPhone y un Android y comprueba que el nombre, el número y el correo quedan en los campos correctos.",
      ],
    },
    faq: [
      {
        q: "¿Qué pasa si cambia mi número o mi cargo?",
        a: "Los datos quedan fijos dentro del código. Crea un código nuevo y reimprime las tarjetas, igual que harías con el texto impreso.",
      },
      {
        q: "¿Uso un código de contacto o un enlace a mi web?",
        a: "Un código de contacto guarda tus datos directamente y funciona sin conexión. Un enlace puede llevar a una página que actualices más adelante. Si tus datos cambian poco, el código de contacto es la opción más útil en una tarjeta.",
      },
      {
        q: "¿Puedo añadir mi logotipo?",
        a: "Al contacto no, pero puedes poner un logotipo pequeño en el centro del código desde Estilo. La corrección de errores sube entonces al máximo automáticamente, así que el código sigue escaneándose.",
      },
      {
        q: "¿Se puede editar el contacto antes de guardarlo?",
        a: "Sí. El teléfono muestra una vista previa y la persona puede revisar y cambiar los datos antes de añadirlos.",
      },
    ],
  },

  google_review: {
    title: "Código QR para reseñas de Google",
    subtitle: "Crea un código que abre el formulario de reseñas de Google de tu negocio, listo para el mostrador y los tiques.",
    metaTitle: "Código QR para reseñas de Google — Gratis, sin registro",
    metaDescription:
      "Crea un código QR que abre el formulario de reseñas de Google de tu negocio a partir de tu Place ID o enlace de reseñas. Para mostradores y tiques. Gratis.",
    sections: {
      howTitle: "Cómo funciona un código QR para reseñas de Google",
      how: [
        "El código abre directamente el formulario de reseñas de Google de tu negocio, así los clientes no tienen que buscarte, elegir la ficha correcta y encontrar el botón de reseña. Con la plataforma Google Review seleccionada, introduces tu Place ID y el código contiene `https://search.google.com/local/writereview?placeid=ChIJ…` con tu ID en lugar de los puntos suspensivos.",
        "Hay dos formas de rellenar el campo. La primera es el Place ID: busca tu negocio en el Place ID Finder de Google, dentro de la documentación de Google Maps Platform, y copia el ID, que suele empezar por ChIJ. La segunda es el enlace de reseñas de tu Perfil de Empresa de Google: abre tu perfil, elige la opción de pedir reseñas y copia el enlace corto que aparece. Un enlace completo que empiece por https:// se acepta tal cual.",
        "Al escanearlo, el teléfono abre el formulario en Google Maps o en el navegador. El cliente necesita haber iniciado sesión con una cuenta de Google para publicar, y elige las estrellas y escribe la reseña él mismo. El código es estático y solo contiene un enlace público, así que funciona mientras exista tu ficha.",
      ],
      usesTitle: "Dónde resulta útil",
      uses: [
        "Una tarjeta pequeña junto a la caja, donde los clientes tienen un momento mientras pagan.",
        "El pie de un tique impreso, que el cliente se lleva a casa.",
        "Una tarjeta de agradecimiento que se deja tras una entrega, una estancia de hotel o una visita técnica, cuando el trabajo ya está hecho.",
        "Un póster A4 cerca de la salida creado con Hoja para imprimir / PDF, con un título corto editable.",
      ],
      tipsTitle: "Consejos antes de imprimir",
      tips: [
        "Escanea tú mismo el código y comprueba que el formulario muestra el nombre de tu negocio. En el Place ID Finder es fácil confundir negocios con nombres parecidos en la misma ciudad.",
        "Pídelo con palabras sencillas, como “Cuéntanos en Google qué tal te atendimos”, y coloca el código donde la gente tenga un momento libre, no donde salga con prisa.",
        "Las políticas de Google no permiten descuentos, regalos ni otros incentivos a cambio de reseñas, así que limita la tarjeta a una petición sencilla.",
        "Pídelo a todos los clientes por igual. Google también prohíbe filtrar reseñas: invitar solo a los clientes satisfechos o enviar primero a los descontentos a otro sitio.",
      ],
    },
    faq: [
      {
        q: "¿Dónde encuentro mi Place ID?",
        a: "Usa el Place ID Finder de la documentación de Maps de Google: busca tu negocio y copia el ID que aparece. También puedes pegar en el campo el enlace de reseñas de tu Perfil de Empresa de Google.",
      },
      {
        q: "¿El cliente necesita una cuenta de Google?",
        a: "Sí. Para publicar una reseña en Google hay que iniciar sesión con una cuenta de Google. Quien no tenga una puede seguir leyendo tu ficha.",
      },
      {
        q: "¿Puedo ofrecer un descuento a cambio de una reseña?",
        a: "No. Las políticas de Google prohíben los incentivos por reseñas, incluidos descuentos y productos gratis. Una petición amable en una tarjeta está bien.",
      },
      {
        q: "¿El código dejará de funcionar si cambio el nombre de mi negocio?",
        a: "Normalmente no, porque el Place ID se refiere a la ficha, no a su nombre. Google indica que los Place ID pueden cambiar en algunos casos, como cuando se fusionan fichas, así que vuelve a escanear el código después de cambios importantes en tu perfil.",
      },
    ],
  },

  wifi_cafe: {
    title: "Código QR de WiFi para cafeterías, hoteles y alojamientos",
    subtitle: "Deja que tus clientes se conecten a la red de invitados con un escaneo, desde carteles de mesa, tarjetas de habitación o la puerta del alojamiento.",
    metaTitle: "Código QR de WiFi para cafeterías, hoteles y alojamientos — Gratis, sin registro",
    metaDescription:
      "Crea un código QR de WiFi para tu cafetería, hotel o apartamento turístico. Los clientes se conectan con un escaneo en iPhone o Android. Gratis y sin registro.",
    sections: {
      howTitle: "Cómo funciona un código QR de WiFi para invitados",
      how: [
        "En muchas cafeterías, la pregunta que más se repite en la barra es la contraseña del Wi-Fi. Un código de Wi-Fi la responde en papel: contiene el nombre de la red, la contraseña y el tipo de seguridad en un formato corto, como `WIFI:T:WPA;S:Cafe-Invitados;P:espresso-2026;;`, y la cámara del teléfono lo convierte en un aviso de “Conectarse a la red”. Los clientes no teclean nada, así que no hay errores con mayúsculas ni con un cero que parece una O.",
        "Antes de crear el código, configura una red de invitados separada si tu router o tus puntos de acceso lo permiten. La contraseña va en el código de forma legible, y cualquiera que fotografíe un cartel de mesa puede leerla. Una red de invitados mantiene el datáfono, el ordenador de la oficina y las cámaras de seguridad en una red a la que los clientes no llegan.",
        "El código es estático, así que la contraseña queda fija en él. Si cambias la contraseña de invitados cada mes o después de cada estancia, imprime códigos nuevos al mismo tiempo. Las redes de hotel con página de acceso o de condiciones, lo que se llama portal cautivo, siguen mostrando esa página después de que el teléfono se conecta; el código une el teléfono a la red pero no completa el inicio de sesión.",
      ],
      usesTitle: "Dónde resulta útil",
      uses: [
        "Carteles de mesa en una cafetería o restaurante, para que los clientes se conecten mientras esperan su pedido.",
        "Una tarjeta en cada habitación de hotel o en el sobre de la llave, junto a la hora de salida y el horario del desayuno.",
        "Un código enmarcado junto a la puerta de un apartamento turístico o en la carpeta de bienvenida, para huéspedes que llegan tarde cuando el anfitrión no está.",
        "Un puesto de coworking, una sala de espera o un sillón de peluquería, donde las visitas se quedan el tiempo suficiente como para querer conexión.",
      ],
      tipsTitle: "Consejos antes de imprimir",
      tips: [
        "Hoja para imprimir / PDF crea un cartel A4 con el título “Conéctate al Wi-Fi” y el nombre de la red, para que quien no pueda escanear sepa qué red elegir. Puedes añadir un subtítulo como “Pide ayuda al personal”.",
        "Escribe el nombre de la red exactamente como se emite, con mayúsculas y sufijos como _5G.",
        "Cuando cambies la contraseña, sustituye todos los códigos impresos el mismo día. Un código desactualizado sigue mostrando el aviso para conectarse pero falla, y los clientes pensarán que la red no funciona.",
        "Prueba el código impreso con un iPhone y un Android desde donde se sientan los clientes, con la iluminación real del local.",
      ],
    },
    faq: [
      {
        q: "¿Es seguro poner la contraseña del Wi-Fi en una mesa?",
        a: "Cualquiera que escanee o fotografíe el código puede leer la contraseña, así que usa una red de invitados separada de la que usan los sistemas de tu negocio.",
      },
      {
        q: "¿Tengo que reimprimir cuando cambio la contraseña?",
        a: "Sí. La contraseña está guardada en el propio código, así que cada cambio de contraseña requiere un código nuevo y nuevas impresiones.",
      },
      {
        q: "¿Funciona con la página de acceso de un hotel?",
        a: "El código conecta el teléfono a la red. Si después la red muestra una página de acceso o de condiciones, los clientes la completan a mano.",
      },
      {
        q: "¿Puedo crear un código para cada habitación con su propia contraseña?",
        a: "Sí, de uno en uno en esta página. La página Por lotes está pensada para listas de enlaces y texto y no tiene campos de Wi-Fi.",
      },
    ],
  },

  with_logo: {
    title: "Generador de códigos QR con logo",
    subtitle: "Pon tu logo en el centro de un código QR que sigue escaneándose bien, y descárgalo en PNG o SVG.",
    metaTitle: "Código QR con logo — Gratis, sin registro",
    metaDescription:
      "Añade tu logo al centro de un código QR sin que deje de escanearse. Sube un PNG, JPG, SVG o WEBP, elige los colores y descarga PNG o SVG para imprimir. Gratis, sin registro.",
    sections: {
      howTitle: "Cómo funciona un código QR con logo",
      how: [
        "Un código QR resiste daños porque lleva corrección de errores: datos adicionales que permiten al lector reconstruir los módulos que no ve. Un logo en el centro es un daño hecho a propósito. Cuando subes uno aquí, la corrección de errores pasa a Máxima (nivel H), que tolera que alrededor del 30 % de los módulos esté tapado, y el ajuste queda bloqueado mientras el logo esté presente. Si quitas el logo, puedes volver a cambiarlo.",
        "En esta página la sección Estilo está abierta y el campo del logotipo, listo. Arrastra un PNG, JPG, SVG o WEBP de hasta 1 MB, o elige un archivo. El logo se coloca sobre una pequeña placa de esquinas redondeadas del color del fondo y ocupa una proporción fija del ancho del código, alrededor de una quinta parte, de modo que nunca cubre los tres cuadrados de las esquinas que los lectores usan para localizar el código.",
        "La vista previa se actualiza mientras trabajas, así que puedes probar a la vez un color de marca para los módulos. El código sigue siendo estático: el logo se dibuja en la imagen y el contenido sigue siendo el enlace que escribiste. Descarga un PNG para pantallas y documentos, o un SVG para archivos de imprenta, donde el logo va incrustado en el archivo vectorial y se escala sin perder nitidez.",
      ],
      usesTitle: "Dónde resulta útil",
      uses: [
        "Envases y etiquetas, donde un código negro sin más parece un código de barras y uno con marca parece parte del diseño.",
        "Tarjetas de presentación y folletos, para que el código de tu sitio o tu perfil combine con el resto de la tarjeta.",
        "Carteles y escaparates, donde la gente decide en un segundo si merece la pena escanear un código.",
        "Imágenes para redes sociales y diapositivas, donde el logo dice de quién es el enlace antes de escanearlo.",
      ],
      tipsTitle: "Consejos antes de imprimir",
      tips: [
        "La corrección de errores máxima mete más módulos en el mismo espacio, así que mantén el contenido corto. Un enlace largo con parámetros de seguimiento hace los módulos diminutos y el logo más difícil de leer alrededor; una dirección corta se escanea mejor.",
        "Usa un logo con fondo sólido o una forma simple. Las líneas finas y el texto diminuto se vuelven ilegibles al tamaño que permite un código.",
        "Mantén el color de los módulos oscuro y el fondo claro. El aviso de color de la sección Estilo te indica cuándo el contraste baja demasiado para las cámaras de los teléfonos.",
        "Escanea el archivo final con un iPhone y un Android, al tamaño impreso y desde una distancia normal, antes de encargar la tirada.",
      ],
    },
    faq: [
      {
        q: "¿Por qué se bloquea el ajuste de corrección de errores al añadir un logo?",
        a: "El logo oculta parte del código, y solo Máxima (nivel H) puede reconstruir tanto. El ajuste se desbloquea de nuevo cuando quitas el logo.",
      },
      {
        q: "¿Qué tamaño puede tener el logo?",
        a: "El archivo puede pesar hasta 1 MB. En el código, el logo ocupa una proporción fija del ancho, alrededor de una quinta parte, que lo mantiene dentro de lo que la corrección de errores máxima puede recuperar.",
      },
      {
        q: "¿El logo cambia lo que contiene el código?",
        a: "No. El contenido sigue siendo el enlace o el texto que escribiste. El logo solo se dibuja encima de la imagen que descargas.",
      },
      {
        q: "¿Descargo PNG o SVG?",
        a: "PNG para sitios web, documentos y mensajería. SVG para imprentas y herramientas de diseño, porque se escala sin perder nitidez.",
      },
    ],
  },

  instagram: {
    title: "Generador de códigos QR de Instagram",
    subtitle: "Convierte tu nombre de usuario de Instagram en un código que abre tu perfil, para tarjetas, cartas de menú y escaparates.",
    metaTitle: "Código QR de Instagram — Gratis, sin registro",
    metaDescription:
      "Crea un código QR de tu perfil de Instagram a partir de tu @usuario. Abre instagram.com/tunombre en cualquier teléfono. Descarga PNG o SVG para tarjetas y carteles. Gratis, sin registro.",
    sections: {
      howTitle: "Cómo funciona un código QR de Instagram",
      how: [
        "En esta página Instagram ya está seleccionado, así que solo escribes tu nombre de usuario. Introduce `@tunombre` o `tunombre`; la @ inicial se quita, los espacios y las barras se eliminan, y el código contiene la dirección pública del perfil `https://www.instagram.com/tunombre/`. Si pegas un enlace completo de perfil que empiece por https://, se acepta tal cual, así que también sirve un enlace copiado desde la app.",
        "Al escanear, el teléfono muestra la dirección y la abre. Si la app de Instagram está instalada, el sistema suele pasarle el enlace y aterriza en tu perfil con el botón de seguir a la vista. Sin la app, el perfil se abre en el navegador, donde los visitantes pueden ver igualmente tus publicaciones y tu biografía.",
        "El código es estático: contiene solo la dirección, nada se guarda en este sitio para que funcione y nunca caduca. Si cambias el nombre de tu cuenta, instagram.com/tunombre cambia con él y los códigos impresos dejan de funcionar, así que elige un nombre de usuario que pienses conservar antes de imprimir.",
      ],
      usesTitle: "Dónde resulta útil",
      uses: [
        "Tarjetas de presentación de fotógrafos, estilistas, artesanos y cualquier persona cuyo portafolio vive en Instagram.",
        "Carteles de mesa y el reverso de la carta, invitando a los clientes a etiquetar al restaurante en sus fotos.",
        "Escaparates, envases y tarjetas de agradecimiento en los pedidos en línea, para convertir compradores en seguidores.",
        "Señalización de eventos y fondos para fotos, donde los invitados quieren encontrar rápido la cuenta oficial.",
      ],
      tipsTitle: "Consejos antes de imprimir",
      tips: [
        "Escanea el código tú mismo y comprueba que llega a tu perfil y no a un nombre parecido. Una letra que falta lleva a la cuenta de otra persona o a una página de error.",
        "Apunta el código al perfil, no a una publicación concreta. Las publicaciones envejecen; el perfil conserva todas las nuevas.",
        "Añade una línea corta bajo el código, como “Síguenos en Instagram”, y tu nombre de usuario en texto, para quien prefiera buscarlo.",
        "Haz el código de al menos 2 cm de ancho en una tarjeta y más grande en carteles que se leen a distancia. Hoja para imprimir / PDF te da una versión A4 con título.",
      ],
    },
    faq: [
      {
        q: "¿Escribo mi nombre de usuario con o sin la @?",
        a: "Da igual. La @ se quita y el código contiene instagram.com/tunombre.",
      },
      {
        q: "¿El código puede abrir directamente la app de Instagram?",
        a: "El código contiene una dirección web normal. Los teléfonos con la app instalada suelen abrirla ahí; los demás usan el navegador.",
      },
      {
        q: "¿Qué pasa si cambio mi nombre de usuario?",
        a: "El código sigue apuntando a la dirección antigua, que deja de funcionar. Crea un código nuevo y vuelve a imprimir.",
      },
      {
        q: "¿Puedo enlazar una publicación o un reel en vez del perfil?",
        a: "Sí. Copia el enlace para compartir de la publicación y pega la dirección completa con https:// en el campo. Para material impreso, el perfil es la opción más segura.",
      },
    ],
  },

  youtube: {
    title: "Generador de códigos QR de YouTube",
    subtitle: "Crea un código que abre tu canal de YouTube a partir de su @identificador, para envases, carteles y tarjetas.",
    metaTitle: "Código QR de YouTube — Gratis, sin registro",
    metaDescription:
      "Crea un código QR de tu canal de YouTube a partir de su @identificador, o pega el enlace de un video o una lista de reproducción. Se abre en la app de YouTube. Descarga PNG o SVG. Gratis, sin registro.",
    sections: {
      howTitle: "Cómo funciona un código QR de YouTube",
      how: [
        "En esta página YouTube ya está seleccionado. Escribe el identificador de tu canal, con o sin la @, y el código contiene la dirección del canal `https://www.youtube.com/@tucanal`. Los identificadores son los nombres cortos que YouTube asigna a cada canal; aparecen bajo el nombre del canal y en su URL. Si no estás seguro del tuyo, abre tu canal en la app y cópialo desde la página.",
        "También puedes pegar un enlace completo que empiece por https://, y se usa sin cambios. Es la forma de apuntar un código a un solo video, a una lista de reproducción o a una transmisión en directo: copia el enlace de Compartir de YouTube y pégalo en el campo. Un enlace acortado de youtu.be también funciona.",
        "Al escanear, el teléfono abre la dirección y, cuando la app de YouTube está instalada, suele tomar el control y muestra el canal con su botón de suscribirse, o reproduce el video. El código es estático y contiene solo la dirección, así que sigue funcionando mientras exista el canal o el video.",
      ],
      usesTitle: "Dónde resulta útil",
      uses: [
        "Envases y manuales de producto, que llevan a un video de desembalaje o de instalación en lugar de una guía impresa.",
        "Carteles y folletos de músicos, iglesias, escuelas y clubes, que conducen a un canal o a un evento grabado.",
        "Tarjetas de presentación de creadores y formadores cuyo trabajo es más fácil de mostrar que de describir.",
        "Material de clase y diapositivas de talleres, donde una lista de reproducción reúne las lecciones en orden.",
      ],
      tipsTitle: "Consejos antes de imprimir",
      tips: [
        "Apunta los códigos impresos al canal o a una lista de reproducción antes que a un solo video, salvo que el video sea el producto. Los canales duran más que una subida concreta.",
        "Si enlazas un video, abre primero el enlace de Compartir en un teléfono y comprueba que es público, no oculto ni privado, y que empieza donde esperas.",
        "Añade bajo el código una línea que diga qué obtiene quien lo escanea, como “Mira el video de instalación (2 min)”. La gente escanea cuando sabe qué va a encontrar.",
        "Haz el código de al menos 2 cm de ancho y pruébalo con un iPhone y un Android desde el lugar donde estará la gente.",
      ],
    },
    faq: [
      {
        q: "¿Dónde encuentro el identificador de mi canal de YouTube?",
        a: "Abre la página de tu canal; el identificador empieza por @ y aparece bajo el nombre del canal y en la barra de direcciones. Escríbelo con o sin la @.",
      },
      {
        q: "¿El código puede abrir un video o una lista de reproducción concretos?",
        a: "Sí. Usa el botón Compartir del video o de la lista, copia el enlace y pega la dirección completa con https:// en el campo.",
      },
      {
        q: "¿Se abre en la app de YouTube?",
        a: "El código contiene una dirección web normal. Los teléfonos con la app instalada suelen abrirla ahí; los demás la reproducen en el navegador.",
      },
      {
        q: "¿El código deja de funcionar si cambio el nombre de mi canal?",
        a: "Cambiar el nombre del canal no afecta; cambiar el identificador cambia la dirección, así que crea un código nuevo y vuelve a imprimir.",
      },
    ],
  },

  bulk: {
    title: "Generador de códigos QR en masa",
    subtitle: "Pega una lista de enlaces o textos y descarga todos los códigos a la vez en un ZIP con índice.",
    metaTitle: "Generar códigos QR en masa — Gratis, sin registro",
    metaDescription:
      "Crea hasta 200 códigos QR a la vez a partir de una lista pegada o de columnas de una hoja de cálculo. Descarga un ZIP de PNG numerados con un index.csv. Funciona en tu navegador. Gratis, sin registro.",
    sections: {
      howTitle: "Cómo funciona la generación de códigos QR por lotes",
      how: [
        "La herramienta de arriba acepta una lista en lugar de un solo enlace. Escribe una entrada por línea, o copia dos columnas de Excel o Google Sheets, nombre y enlace, y pégalas en la tabla; el tabulador entre celdas separa cada línea en su nombre y su contenido, y si el enlace está en la primera columna, se intercambian por ti. Una sola columna también funciona y rellena las celdas de contenido. La lista admite hasta 200 filas por descarga.",
        "Cada fila se comprueba por separado. Lo que tiene forma de dirección web, como `https://example.com/menu` o `tienda.example.com`, se convierte en enlace, y todo lo demás se guarda como texto sin formato, así que una lista puede mezclar ambos. Una etiqueta junto a la fila indica cuál es, y la vista previa aparece en cuanto la fila es válida. Las filas con algún problema se marcan, por ejemplo un texto demasiado largo para un código QR o una dirección con un esquema bloqueado, y el resto se puede descargar igualmente.",
        "Al descargar obtienes `qr-codes.zip`. Dentro hay PNG numerados con tus nombres, como `001-menu-mesa-1.png`, o simplemente `001.png` para las filas sin nombre, más un `index.csv` con las columnas archivo, nombre y contenido, para que veas qué archivo contiene cada enlace. Todo se genera en tu navegador; al descargar, solo se guardan la cantidad y una breve muestra de las primeras líneas, nunca la lista completa.",
      ],
      usesTitle: "Dónde resulta útil",
      uses: [
        "Mesas numeradas en un restaurante o un evento, cada código abriendo el mismo menú o un enlace de pedido específico de la mesa.",
        "Etiquetas de inventario para equipos, salas o estanterías, donde cada código lleva un ID o una página de inventario.",
        "Credenciales y entradas de un congreso, con un perfil o un enlace de registro por asistente.",
        "Etiquetas de producto, donde cada artículo de un catálogo tiene su propia página o enlace de soporte.",
      ],
      tipsTitle: "Consejos antes de imprimir",
      tips: [
        "Rellena la columna de nombre. Los nombres se convierten en los nombres de archivo y en el índice, lo que ahorra mucho trabajo de emparejar cuando colocas doscientos códigos en una maquetación.",
        "Los nombres se adaptan para que sean válidos como nombre de archivo: los espacios y símbolos pasan a guiones y lo que supera los 40 caracteres se recorta, así que mantenlos cortos y distintos entre sí.",
        "Elige el tamaño de salida antes de descargar. 512 px va bien para etiquetas y tarjetas; 1024 px es mejor para carteles y archivos que se van a ampliar.",
        "Antes de imprimir, comprueba en un teléfono algunos PNG del principio, del medio y del final del ZIP, y guarda index.csv junto a las imágenes.",
      ],
    },
    faq: [
      {
        q: "¿Cuántos códigos puedo crear a la vez?",
        a: "Hasta 200 por descarga. Para listas más largas, divídelas y descarga por partes; la numeración empieza en 001 en cada ZIP.",
      },
      {
        q: "¿Puedo pegar desde Excel o Google Sheets?",
        a: "Sí. Copia dos columnas, nombre y enlace, y pégalas en la tabla. Cada fila de la hoja de cálculo se convierte en una línea con los campos en su sitio; una sola columna también funciona.",
      },
      {
        q: "¿Qué contiene el ZIP?",
        a: "Un PNG por cada fila válida, con nombres del tipo 001-nombre.png en orden, y un index.csv que indica archivo, nombre y contenido de cada uno.",
      },
      {
        q: "¿Puedo crear códigos de Wi-Fi, vCard u otros formatos por lotes?",
        a: "No. La herramienta por lotes gestiona enlaces y texto sin formato. Los demás formatos se crean de uno en uno en sus propias páginas.",
      },
    ],
  },
};
