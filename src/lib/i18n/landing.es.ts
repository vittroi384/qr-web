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

  // TODO(i18n): localize — temporary English copy
  with_logo: {
    title: "QR Code Generator with Logo",
    subtitle: "Put your logo in the middle of a QR code that still scans, and download it as PNG or SVG.",
    metaTitle: "QR Code Generator with Logo — Free, No Sign-up",
    metaDescription:
      "Add your logo to the centre of a QR code and keep it scannable. Upload PNG, JPG, SVG or WEBP, pick colours, download PNG or SVG for print. Free, no sign-up.",
    sections: {
      howTitle: "How a QR code with a logo works",
      how: [
        "A QR code survives damage because it carries error correction: extra data that lets a scanner rebuild modules it cannot see. A logo in the middle is damage on purpose. When you upload one here, error correction switches to Maximum (level H), which tolerates about 30% of the modules being covered, and the setting is locked while the logo stays. Remove the logo and you can set it back.",
        "The Style section is open on this page, with the logo field ready. Drop a PNG, JPG, SVG or WEBP up to 1 MB, or choose a file. The logo is placed on a small rounded plate in the background colour and takes a fixed share of the code's width, about a fifth, so it never covers the three corner squares scanners use to find the code.",
        "The preview updates as you work, so you can try a brand colour for the modules at the same time. The code stays static: the logo is drawn into the image, and the content stays the link you typed. Download a PNG for screens and documents, or an SVG for print files, where the logo is embedded in the vector file and scales without blur.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "Packaging and labels, where a plain black code looks like a barcode and a branded one looks like part of the design.",
        "Business cards and brochures, so the code to your site or profile matches the rest of the card.",
        "Posters and shop windows, where people decide in a second whether a code is worth scanning.",
        "Social media graphics and presentation slides, where the logo tells viewers whose link it is before they scan.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "Maximum error correction packs more modules into the same space, so keep the content short. A long tracking link makes the modules tiny and the logo harder to read around; a short address scans better.",
        "Use a logo with a solid background or a simple shape. Thin lines and tiny text turn to mush at the size a code allows.",
        "Keep the module colour dark and the background light. The colour warning in the Style section tells you when the contrast gets too low for phone cameras.",
        "Scan the final file on an iPhone and an Android phone, at the printed size and from a normal distance, before you order a print run.",
      ],
    },
    faq: [
      {
        q: "Why does the error-correction setting lock when I add a logo?",
        a: "The logo hides part of the code, and only Maximum (level H) can rebuild that much. The setting unlocks again when you remove the logo.",
      },
      {
        q: "How large can the logo be?",
        a: "The file can be up to 1 MB. In the code the logo takes a fixed share of the width, about a fifth, which keeps it inside what Maximum error correction can recover.",
      },
      {
        q: "Does the logo change what the code contains?",
        a: "No. The content is still the link or text you entered. The logo is only drawn on top of the image you download.",
      },
      {
        q: "Should I download PNG or SVG?",
        a: "PNG for websites, documents and messaging. SVG for print shops and design tools, because it scales without blur.",
      },
    ],
  },

  // TODO(i18n): localize — temporary English copy
  instagram: {
    title: "Instagram QR Code Generator",
    subtitle: "Turn your Instagram handle into a code that opens your profile, for cards, menus and shop windows.",
    metaTitle: "Instagram QR Code Generator — Free, No Sign-up",
    metaDescription:
      "Make a QR code for your Instagram profile from your @handle. Opens instagram.com/yourname on any phone. Download PNG or SVG for cards and signs. Free, no sign-up.",
    sections: {
      howTitle: "How an Instagram QR code works",
      how: [
        "Instagram is selected on this page, so you only type your handle. Enter `@yourname` or `yourname`; the leading @ is removed, spaces and slashes are dropped, and the code holds the public profile address `https://www.instagram.com/yourname/`. Pasting a full profile link that starts with https:// is accepted as it is, so a link copied from the app works too.",
        "On scan, the phone shows the address and opens it. If the Instagram app is installed, the system usually hands the link to the app and lands on your profile with the follow button in view. Without the app, the profile opens in the browser, where visitors can still see posts and your bio.",
        "The code is static: it contains only the address, nothing is stored on this site to make it work, and it never expires. If you rename your account, instagram.com/yourname changes with it and printed codes stop working, so pick a handle you plan to keep before you print.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "Business cards for photographers, stylists, makers and anyone whose portfolio lives on Instagram.",
        "Table tents and the back of a menu, inviting guests to tag the restaurant in their photos.",
        "Shop windows, packaging and thank-you cards in online orders, turning buyers into followers.",
        "Event signage and photo backdrops, where guests want to find the official account quickly.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "Scan the code yourself and check that it lands on your profile, not a similar handle. A missing letter leads to someone else's account or an error page.",
        "Keep the code pointed at the profile, not at a single post. Posts age; your profile keeps every new one.",
        "Add a short line under the code, such as “Follow us on Instagram”, and your handle in text, for people who prefer to search.",
        "Make the code at least 2 cm wide on a card and larger on signs read from a distance. Print sheet / PDF gives you an A4 version with a headline.",
      ],
    },
    faq: [
      {
        q: "Do I enter my handle with or without the @?",
        a: "Either works. The @ is removed and the code contains instagram.com/yourname.",
      },
      {
        q: "Can the code open the Instagram app directly?",
        a: "The code holds a normal web address. Phones with the app installed usually open it there; others use the browser.",
      },
      {
        q: "What happens if I change my username?",
        a: "The code still points at the old address, which stops working. Make a new code and reprint.",
      },
      {
        q: "Can I link a single post or reel instead?",
        a: "Yes. Copy the post's share link and paste the whole https:// address into the field. For printed material, the profile is the safer choice.",
      },
    ],
  },

  // TODO(i18n): localize — temporary English copy
  youtube: {
    title: "YouTube QR Code Generator",
    subtitle: "Make a code that opens your YouTube channel from your @handle, for packaging, posters and cards.",
    metaTitle: "YouTube QR Code Generator — Free, No Sign-up",
    metaDescription:
      "Create a QR code for your YouTube channel from its @handle, or paste a video or playlist link. Opens in the YouTube app. Download PNG or SVG. Free, no sign-up.",
    sections: {
      howTitle: "How a YouTube QR code works",
      how: [
        "YouTube is selected on this page. Type your channel handle, with or without the @, and the code holds the channel address `https://www.youtube.com/@yourchannel`. Handles are the short names YouTube gives every channel, shown under the channel name and in the channel URL. If you are not sure of yours, open your channel in the app and copy it from the page.",
        "You can also paste a full link that starts with https://, and it is used unchanged. That is the way to point a code at a single video, a playlist or a live stream: copy the Share link from YouTube and paste it into the field. A shortened youtu.be link works as well.",
        "On scan, the phone opens the address, and when the YouTube app is installed it usually takes over and shows the channel with its Subscribe button, or starts the video. The code is static and holds only the address, so it keeps working as long as the channel or video exists.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "Product packaging and manuals, pointing to an unboxing or setup video instead of a printed guide.",
        "Posters and flyers for musicians, churches, schools and clubs, leading to a channel or a recorded event.",
        "Business cards for creators and trainers whose work is easier to show than to describe.",
        "Classroom handouts and workshop slides, where a playlist collects the lessons in order.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "Point printed codes at the channel or a playlist rather than one video, unless the video is the product. Channels outlive single uploads.",
        "If you link a video, open the Share link on a phone first and check that it is public, not unlisted or private, and that it starts where you expect.",
        "Add a line under the code that says what the viewer gets, such as “Watch the setup video (2 min)”. People scan when they know the payoff.",
        "Keep the code at least 2 cm wide and test it on an iPhone and an Android phone from where people will stand.",
      ],
    },
    faq: [
      {
        q: "Where do I find my YouTube handle?",
        a: "Open your channel page; the handle starts with @ and appears under the channel name and in the address bar. Enter it with or without the @.",
      },
      {
        q: "Can the code open a specific video or playlist?",
        a: "Yes. Use the Share button on the video or playlist, copy the link and paste the whole https:// address into the field.",
      },
      {
        q: "Does it open in the YouTube app?",
        a: "The code holds a normal web address. Phones with the app installed usually open it there; others play in the browser.",
      },
      {
        q: "Will the code break if I rename my channel?",
        a: "Changing the channel name is fine; changing the handle changes the address, so make a new code and reprint.",
      },
    ],
  },

  // TODO(i18n): localize — temporary English copy
  bulk: {
    title: "Bulk QR Code Generator",
    subtitle: "Paste a list of links or text and download every code at once as a ZIP with an index.",
    metaTitle: "Bulk QR Code Generator — Free, No Sign-up",
    metaDescription:
      "Make up to 200 QR codes at once from a pasted list or spreadsheet columns. Download a ZIP of numbered PNGs with an index.csv. Runs in your browser. Free, no sign-up.",
    sections: {
      howTitle: "How bulk QR code generation works",
      how: [
        "The tool above takes a list instead of a single link. Type one entry per line, or copy two columns from Excel or Google Sheets, name and link, and paste them into the table; the Tab between cells splits each line into its name and content, and if the link is in the first column the two are swapped for you. A single column works too and fills the content cells. The list holds up to 200 rows per download.",
        "Each row is checked on its own. Anything shaped like a web address, such as `https://example.com/menu` or `shop.example.com`, becomes a link, and everything else is stored as plain text, so a list can mix the two. A label next to the row shows which one it is, and a preview appears as soon as the row is valid. Rows with a problem are marked, for example text too long for a QR code or an address with a blocked scheme, and the rest can still be downloaded.",
        "Download gives you `qr-codes.zip`. Inside are numbered PNGs named after your names, such as `001-menu-table-1.png`, or just `001.png` for rows without a name, plus an `index.csv` with the columns file, name and content, so you can see which file holds which link. Everything is generated in your browser; when you download, only the count and a short sample of the first lines are kept, never the whole list.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "Numbered tables in a restaurant or event, each code opening the same menu or a table-specific order link.",
        "Asset tags for equipment, rooms or shelves, where each code carries an ID or an inventory page.",
        "Name badges and tickets for a conference, one profile or check-in link per attendee.",
        "Product labels, where every item in a catalogue has its own page or support link.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "Fill the name column. The names become the file names and the index, which saves a lot of matching when you place two hundred codes into a layout.",
        "Names are made file-safe: spaces and symbols become hyphens, and anything beyond 40 characters is cut, so keep them short and distinct.",
        "Pick the output size before you download. 512 px suits labels and cards; 1024 px is better for posters and files that will be enlarged.",
        "Spot-check a few PNGs from the start, middle and end of the ZIP on a phone before printing, and keep index.csv next to the images.",
      ],
    },
    faq: [
      {
        q: "How many codes can I make at once?",
        a: "Up to 200 per download. For longer lists, split them and download in parts; the numbering starts at 001 in each ZIP.",
      },
      {
        q: "Can I paste from Excel or Google Sheets?",
        a: "Yes. Copy two columns, name and link, and paste into the table. Each spreadsheet row becomes a line with the fields in the right place; a single column works too.",
      },
      {
        q: "What is in the ZIP?",
        a: "One PNG per valid row, named 001-name.png in order, and an index.csv listing file, name and content for each one.",
      },
      {
        q: "Can I make Wi-Fi, vCard or other formats in bulk?",
        a: "No. The bulk tool handles links and plain text. Other formats are made one at a time on their own pages.",
      },
    ],
  },
};
