import type { QrType } from "@/lib/qr/types";
import type { LandingCopy, UseCaseId } from "./index";

/** Textos longos em português (Brasil) para as páginas de cada tipo (/pt/wifi-qr-code, …). */
export const landingPt: Record<QrType, LandingCopy> = {
  url: {
    title: "Gerador de QR Code para Link (URL)",
    subtitle: "Transforme qualquer endereço da web em um QR Code que abre a página em uma leitura.",
    metaTitle: "Gerador de QR Code para Link — Grátis, sem cadastro",
    metaDescription:
      "Crie um QR Code que abre qualquer página da web. Códigos estáticos que nunca expiram, gerados no seu navegador. Salve em PNG ou SVG ou imprima em A4. Grátis.",
    sections: {
      howTitle: "Como funciona um QR Code de link",
      how: [
        "O código guarda o próprio endereço da web, caractere por caractere. Se você digitar example.com/menu, o gerador adiciona https:// para você, e o código passa a conter https://example.com/menu. Quando alguém aponta a câmera do celular, o aparelho reconhece o link e oferece abri-lo no navegador. Não há nada no meio: nenhum serviço de redirecionamento e nenhuma conta que precise continuar ativa.",
        "No iPhone, o app Câmera mostra um aviso com o endereço; basta tocar para abrir no Safari. A maioria dos celulares Android faz o mesmo pela câmera ou pelo Google Lens. Como a pessoa vê o endereço antes de abrir, um domínio curto e conhecido passa mais confiança do que uma sequência longa de parâmetros de rastreamento.",
        "Quanto maior o endereço, mais quadradinhos o código precisa. Um link de 30 caracteres gera um desenho simples e fácil de ler; um link de 300 caracteres cheio de parâmetros gera um desenho denso, que exige impressão maior. Links que começam com javascript: ou data: são recusados, porque um QR Code nunca deve executar código.",
      ],
      usesTitle: "Onde ajuda",
      uses: [
        "Um restaurante imprime o código nos displays de mesa para o cliente abrir o cardápio sem esperar o garçom trazer o de papel.",
        "A vitrine de uma loja mostra um código que leva ao horário de funcionamento e aos pedidos on-line, útil para quem passa depois que a loja fechou.",
        "A etiqueta de um produto leva ao manual de instalação ou à página de garantia, e o manual impresso pode ser bem mais curto.",
        "Um palestrante coloca um código no último slide que abre o material da palestra, e ninguém precisa copiar um endereço da tela.",
        "Uma loja de bairro coloca o código na sacola ou na nota fiscal com o link da loja virtual, para o cliente voltar a comprar de casa.",
      ],
      tipsTitle: "Dicas antes de imprimir",
      tips: [
        "O código é estático: se o endereço mudar, você precisa de um código novo. Aponte para uma página que você controla, como seudominio.com.br/cardapio, assim pode mudar o conteúdo sem reimprimir.",
        "Corte parâmetros de rastreamento que você não usa. Um link mais curto gera um desenho mais limpo, que é lido mais rápido e de mais longe.",
        "Regra prática: o código deve ter pelo menos um décimo da distância de leitura. Cerca de 2 cm para algo que fica na mão, 30 cm para um cartaz lido a 3 m.",
        "Depois de salvar, abra o link no seu próprio celular. Um erro de digitação no endereço é o motivo mais comum de um código impresso não funcionar.",
      ],
    },
    faq: [
      {
        q: "O QR Code de link expira?",
        a: "Não. O endereço fica gravado na imagem, então o código funciona enquanto a página estiver no ar. Este site nem precisa continuar existindo para ele funcionar.",
      },
      {
        q: "Posso trocar o link depois de imprimir?",
        a: "No código em si, não, porque ele é estático. Mas você pode mudar o que a página mostra ou criar um redirecionamento no seu próprio site.",
      },
      {
        q: "Preciso digitar https://?",
        a: "Não. Se você deixar de fora, o https:// é adicionado automaticamente. Digite http:// só se o seu site realmente não tiver HTTPS.",
      },
      {
        q: "Consigo ver quantas pessoas escanearam?",
        a: "Aqui não. O código abre sua página diretamente, então as leituras só são contadas se o analytics do seu site registrar a visita. Acrescentar um parâmetro de campanha como ?utm_source=cartaz ao link ajuda a separar essas visitas.",
      },
    ],
  },

  social: {
    title: "Gerador de QR Code para Redes Sociais",
    subtitle: "Digite um nome de usuário e receba um código que abre seu perfil no Instagram, TikTok, YouTube e outros.",
    metaTitle: "QR Code para Instagram e Redes Sociais — Grátis, sem cadastro",
    metaDescription:
      "Crie um QR Code para seu perfil no Instagram, TikTok, YouTube, LinkedIn ou Linktree só com o nome de usuário. Estático, nunca expira, grátis e sem cadastro.",
    sections: {
      howTitle: "Como funciona um QR Code de rede social",
      how: [
        "Você escolhe a plataforma e digita seu nome de usuário; o gerador monta o endereço padrão do perfil. O perfil @padariapaodourado no Instagram vira https://www.instagram.com/padariapaodourado/, um handle do YouTube vira https://www.youtube.com/@canal e um ID do LinkedIn vira https://www.linkedin.com/in/profile-id/. O @ inicial é removido quando a plataforma não o usa no endereço, e espaços ou barras são descartados.",
        "Se você já tem o link do perfil, é só colar que a plataforma é reconhecida automaticamente. Na leitura, o celular vê um link https comum. Se o app estiver instalado, o iOS e o Android normalmente abrem o perfil direto nele; se não, abre no navegador.",
        "Algumas plataformas usam códigos em vez de nomes: o Discord precisa de um código de convite, o Google Review precisa de um Place ID e o Spotify usa um ID de artista. O texto de exemplo em cada campo mostra o que digitar.",
      ],
      usesTitle: "Onde ajuda",
      uses: [
        "Uma cafeteria coloca o código do Instagram no cupom para o cliente seguir sem procurar um nome que tem três perfis parecidos.",
        "Um músico coloca o código do artista no Spotify na banca de produtos e um código do Linktree no flyer para todo o resto.",
        "Um negócio local pede avaliações com um código do Google Review no balcão, que abre direto o formulário de avaliação.",
        "Quem está procurando emprego imprime um código do LinkedIn no currículo ou no crachá de feiras de carreira.",
        "Uma loja de roupas cola o código do Instagram no provador para as clientes marcarem a loja nas fotos.",
      ],
      tipsTitle: "Dicas antes de imprimir",
      tips: [
        "Confira o nome de usuário abrindo o link da linha de resultado antes de salvar. Uma letra a menos pode levar ao perfil de outra pessoa.",
        "No Discord, crie um convite que nunca expira; o convite padrão para de funcionar em sete dias, e o código impresso para junto.",
        "Se você pode mudar o nome da conta no futuro, um código para o Linktree ou para seu site resiste melhor à mudança do que um link direto do perfil.",
        "Coloque o nome ou o logo da plataforma ao lado do código para as pessoas saberem o que vai abrir antes de escanear.",
      ],
    },
    faq: [
      {
        q: "O código abre o app ou o site?",
        a: "Ele contém um link normal de perfil. Na maioria dos celulares, abre no app quando ele está instalado e no navegador quando não está.",
      },
      {
        q: "O que acontece se eu mudar meu nome de usuário?",
        a: "O código continua apontando para o endereço antigo, que pode parar de funcionar ou depois pertencer a outra pessoa. Crie um código novo depois de trocar o nome.",
      },
      {
        q: "Posso colocar vários perfis em um código só?",
        a: "Não, um código abre um endereço. Use uma página de links na bio, como o Linktree, e crie o código para essa página.",
      },
      {
        q: "Onde encontro o Place ID do Google?",
        a: "O Google oferece o Place ID Finder na documentação do Maps. Procure seu negócio lá e copie o ID que começa com ChIJ.",
      },
      {
        q: "Meu perfil fica exposto se eu criar um código?",
        a: "O código contém só o endereço público do perfil. O que as pessoas veem depois de escanear depende das configurações de privacidade da sua conta.",
      },
    ],
  },

  whatsapp: {
    title: "Gerador de QR Code do WhatsApp",
    subtitle: "Deixe seus clientes iniciarem uma conversa no WhatsApp com você só escaneando, com uma mensagem já digitada.",
    metaTitle: "QR Code do WhatsApp — Grátis, sem cadastro",
    metaDescription:
      "Crie um QR Code que abre uma conversa no WhatsApp com seu número e uma mensagem pronta. Funciona no iPhone e no Android, nunca expira, grátis e sem cadastro.",
    sections: {
      howTitle: "Como funciona o QR Code do WhatsApp",
      how: [
        "O código usa o link oficial de conversa do WhatsApp (click to chat). Seu número fica só com os dígitos, sem o sinal de mais, espaços ou zeros à esquerda, e a mensagem é adicionada como texto codificado para URL: https://wa.me/5511912345678?text=Ol%C3%A1%2C%20quero%20fazer%20um%20pedido.",
        "Quando alguém escaneia, o celular abre o link, o WhatsApp inicia e a conversa com o seu número aparece com a mensagem esperando na caixa de texto. Nada é enviado até a pessoa tocar em enviar, então ela pode editar antes. Se o WhatsApp não estiver instalado, o link abre uma página que oferece baixar o app ou usar o WhatsApp Web.",
        "O número precisa ter o código do país, porque o wa.me não tem como adivinhar o país. Para o Brasil, é 55 + DDD + número: um celular de São Paulo fica +55 11 91234-5678. O gerador aceita de 7 a 15 dígitos, o que cobre números internacionais. Uma conta do WhatsApp Business funciona do mesmo jeito que uma conta pessoal.",
      ],
      usesTitle: "Onde ajuda",
      uses: [
        "Um salão de beleza imprime o código no cartão de visita com a mensagem “Quero agendar um horário”, e os agendamentos chegam sempre no mesmo formato.",
        "Uma pizzaria ou lanchonete cola o código no folheto de delivery e na caixa da pizza com “Quero fazer um pedido”, e o próximo pedido vem direto para o WhatsApp da casa.",
        "Uma loja virtual coloca o código na nota que vai dentro da embalagem para dúvidas sobre o pedido, bem mais fácil do que procurar um e-mail de suporte.",
        "Um prestador de serviço (eletricista, diarista, técnico de ar-condicionado) adesiva o código no carro ou na fachada, com a mensagem “Quero um orçamento”.",
        "O dono de um imóvel de temporada deixa o código no manual da casa para o hóspede pedir ajuda ou relatar um problema.",
      ],
      tipsTitle: "Dicas antes de imprimir",
      tips: [
        "Escreva o número no formato internacional, por exemplo +55 11 91234-5678, e não (11) 91234-5678 ou 011 91234-5678. Um zero local à esquerda é removido, mas o código do país não pode ser adicionado por você.",
        "Lembre do nono dígito: celulares brasileiros têm 9 dígitos depois do DDD. Se o número estiver errado, a conversa não abre.",
        "Mantenha a mensagem pronta curta e objetiva, como um pedido de orçamento ou “Meu pedido é o nº”. Mensagens longas deixam o código mais denso.",
        "Escaneie o código pronto e confira se a conversa abre com o nome certo. Um dígito trocado manda as pessoas para um desconhecido.",
        "Se você trocar de número, o código impresso continua abrindo o antigo, então programe uma reimpressão.",
      ],
    },
    faq: [
      {
        q: "Funciona se a pessoa não tiver meu número salvo?",
        a: "Sim. Essa é a vantagem do link wa.me: a conversa abre sem precisar adicionar você aos contatos antes.",
      },
      {
        q: "A mensagem é enviada automaticamente?",
        a: "Não. Ela aparece na caixa de texto, e a pessoa decide se envia como está, edita ou apaga.",
      },
      {
        q: "Funciona com o WhatsApp Business?",
        a: "Sim. Use o número cadastrado na sua conta do WhatsApp Business.",
      },
      {
        q: "Por que meu código não abre a conversa?",
        a: "A causa mais comum é o código do país faltando ou errado. Confira se o número na linha de resultado começa com 55 (no Brasil), seguido do DDD sem zero e do número com o 9 na frente.",
      },
      {
        q: "Posso usar o mesmo código no Instagram e no Google?",
        a: "Pode. Salve o PNG e publique nos stories, no perfil do Google ou no site. Para a bio, o próprio link wa.me que aparece no resultado também funciona como link clicável.",
      },
    ],
  },

  text: {
    title: "Gerador de QR Code de Texto",
    subtitle: "Coloque um recado, código ou mensagem curta em um QR Code que mostra o texto ao ser escaneado.",
    metaTitle: "Gerador de QR Code de Texto — Grátis, sem cadastro",
    metaDescription:
      "Coloque texto simples em um QR Code: recados, números de série, instruções ou mensagens curtas. Não precisa de link nem internet para ler. Grátis e sem cadastro.",
    sections: {
      howTitle: "Como funciona um QR Code de texto",
      how: [
        "Um código de texto guarda exatamente os caracteres que você digita, sem prefixo e sem link. Para ler, não precisa de internet: o texto sai direto do desenho. Isso é ideal para lugares sem sinal ou para informações que não devem depender de um site no ar.",
        "O que o celular faz com texto simples varia. Muitos leitores do Android e o Google Lens mostram o texto com um botão de copiar. A Câmera do iPhone pode mostrar o texto em um aviso ou oferecer uma pesquisa, dependendo da versão do iOS. Se você quer que as pessoas abram uma página, use um código de link; se elas devem ler uma frase, o texto é a escolha certa.",
        "A capacidade é o principal limite. Letras acentuadas (como ç, ã e é), alfabetos asiáticos e emojis ocupam de dois a quatro bytes cada, então enchem o código mais rápido do que letras sem acento. Na prática, algumas centenas de caracteres ainda são lidas com conforto; quando o conteúdo passa do limite, a prévia avisa.",
      ],
      usesTitle: "Onde ajuda",
      uses: [
        "Uma oficina identifica equipamentos com códigos que contêm o número de série e a data da última revisão, legíveis até em um subsolo sem sinal.",
        "Uma professora esconde a resposta de um desafio em um código na folha de exercícios, e os alunos só conferem quando estiverem prontos.",
        "Um depósito imprime a posição das prateleiras ou o código das peças como texto, que qualquer celular lê sem app especial.",
        "Um cartão de presente leva uma mensagem curta e pessoal que aparece quando a pessoa escaneia.",
      ],
      tipsTitle: "Dicas antes de imprimir",
      tips: [
        "Seja breve. Cada frase a mais deixa os quadradinhos menores, e quadradinhos pequenos exigem impressão maior e boa iluminação.",
        "Se a prévia disser que o conteúdo é longo demais, ajuste a Correção de erros para Padrão em Estilo, ou passe o texto para uma página da web e use um código de link.",
        "Não use código de texto para segredos. Qualquer pessoa que escanear consegue ler cada caractere.",
        "Teste em um iPhone e em um Android, já que o texto simples aparece de forma diferente em cada um.",
      ],
    },
    faq: [
      {
        q: "Quanto texto cabe em um QR Code?",
        a: "O formato permite cerca de 2.300 caracteres de texto simples sem acento na correção de erros padrão, mas acima de algumas centenas de caracteres fica difícil de ler com o celular. Acentos e caracteres especiais ocupam mais espaço.",
      },
      {
        q: "Preciso de internet para ler o texto?",
        a: "Não. O texto fica gravado na própria imagem, então qualquer leitor consegue ler sem conexão.",
      },
      {
        q: "Posso usar quebras de linha?",
        a: "Sim. As quebras de linha fazem parte do texto, embora alguns apps de leitura as mostrem como espaços.",
      },
      {
        q: "Por que meu iPhone não mostra o texto direito?",
        a: "A Câmera do iPhone foi feita principalmente para links e ações. Para texto simples, use o Leitor de Código da Central de Controle ou um app leitor, que mostra o texto completo.",
      },
    ],
  },

  wifi: {
    title: "Gerador de QR Code para Wi-Fi",
    subtitle: "Deixe os visitantes entrarem no seu Wi-Fi só escaneando, sem ditar nem digitar a senha.",
    metaTitle: "QR Code para Wi-Fi — Grátis, sem cadastro",
    metaDescription:
      "Crie um QR Code para Wi-Fi que conecta iPhone e Android à sua rede em uma leitura. Funciona com WPA/WPA2/WPA3, WEP e redes ocultas. Grátis, sem cadastro.",
    sections: {
      howTitle: "Como funciona o QR Code para Wi-Fi",
      how: [
        "O código guarda os dados da sua rede em um formato curto e amplamente suportado: WIFI:T:WPA;S:CafeGuest;P:sunny-day-42;;. T é o tipo de segurança (WPA, WEP ou nopass para rede aberta), S é o nome da rede e P é a senha. Para rede oculta, é adicionado H:true;. Caracteres com significado especial nesse formato, como ponto e vírgula, dois-pontos, vírgula, aspas ou barra invertida, recebem uma barra invertida antes, então senhas com eles continuam funcionando.",
        "No iPhone (iOS 11 ou mais recente), basta apontar a Câmera para o código e aparece a opção “Conectar à rede”. A maioria dos Android a partir do Android 10 oferece o mesmo pela câmera, pelo Google Lens ou pela tela de configurações de Wi-Fi, que tem um botão próprio para ler QR Code. O celular conecta direto; não precisa de app nem de internet para ler o código.",
        "A opção WPA vale para redes WPA, WPA2 e WPA3. Escolha WEP só para roteadores muito antigos.",
      ],
      usesTitle: "Onde ajuda",
      uses: [
        "Um display de mesa na cafeteria deixa o cliente conectar enquanto espera o pedido, e a equipe para de soletrar a senha no balcão.",
        "Um apartamento de temporada (Airbnb) deixa o código emoldurado perto da porta, e o hóspede entra na internet mesmo quando o anfitrião não está disponível.",
        "Uma sala de reunião mostra na parede o código da rede de visitantes para quem traz notebook e celular.",
        "Em casa, um código na geladeira evita procurar a etiqueta do roteador toda vez que chegam visitas.",
        "Um consultório ou salão deixa o código na recepção para quem fica esperando.",
      ],
      tipsTitle: "Dicas antes de imprimir",
      tips: [
        "Quando você muda a senha do Wi-Fi, o código impresso para de funcionar. Crie um código novo e troque as impressões antigas ao mesmo tempo.",
        "Use uma rede de visitantes separada, se o seu roteador tiver. Quem fotografar o código consegue ler a senha.",
        "Digite o nome da rede exatamente como aparece, com maiúsculas e qualquer final como _5G. O nome diferencia maiúsculas de minúsculas.",
        "A Folha para impressão adiciona o título “Conecte-se ao Wi-Fi” e o nome da rede, para quem não consegue escanear poder digitar.",
      ],
    },
    faq: [
      {
        q: "O QR Code de Wi-Fi funciona no iPhone?",
        a: "Sim. Desde o iOS 11, o app Câmera reconhece códigos de Wi-Fi e mostra a opção de conectar à rede.",
      },
      {
        q: "Posso mudar a senha depois sem reimprimir?",
        a: "Não. A senha fica gravada dentro do código, que é estático. Depois de trocar a senha, gere e imprima um código novo.",
      },
      {
        q: "Minha senha do Wi-Fi fica salva no servidor de vocês?",
        a: "O código é gerado no seu navegador. Quando você salva, copia ou imprime, o que você digitou pode ser registrado conforme a Política de Privacidade, mas as senhas de Wi-Fi são sempre mascaradas antes do armazenamento.",
      },
      {
        q: "Funciona com rede oculta?",
        a: "Sim. Marque Rede oculta e o código avisa o celular para procurar uma rede que não divulga o nome. O suporte a redes ocultas é menos consistente em celulares antigos, então teste.",
      },
      {
        q: "Funciona em rede de hotel com página de login?",
        a: "O código conecta o celular à rede, mas a página de login que aparece depois ainda precisa ser preenchida à mão.",
      },
    ],
  },

  vcard: {
    title: "Gerador de QR Code vCard (Contato)",
    subtitle: "Coloque seus dados de contato em um QR Code que salva direto na agenda do celular.",
    metaTitle: "Gerador de QR Code vCard — Grátis, sem cadastro",
    metaDescription:
      "Crie um QR Code vCard com nome, telefone, e-mail, empresa e site. Uma leitura salva o contato no iPhone ou Android. Grátis, nunca expira, sem cadastro.",
    sections: {
      howTitle: "Como funciona um QR Code vCard",
      how: [
        "O código contém um cartão de contato no formato vCard 3.0, usado pelas agendas há décadas. Um exemplo curto: BEGIN:VCARD, VERSION:3.0, N:Silva;Ana;;;, ORG:Padaria Pão Dourado, TITLE:Gerente, TEL;TYPE=CELL:+5511912345678, EMAIL:ana@example.com, END:VCARD, cada um em uma linha. Telefone comercial, site, endereço e observação só entram se você preencher.",
        "Ao escanear com a Câmera do iPhone ou com a maioria das câmeras Android, aparece uma prévia do contato com um botão para adicionar. A pessoa pode revisar e editar antes de salvar. Não precisa de internet, porque o cartão inteiro está dentro do código.",
        "Cada campo adiciona caracteres, e caracteres adicionam quadradinhos. Um cartão com nome, celular e e-mail é compacto; incluir um endereço longo e uma observação pode dobrar a densidade.",
      ],
      usesTitle: "Onde ajuda",
      uses: [
        "Um cartão de visita leva o código no verso, e o novo contato cai no celular com o nome escrito certo e o número já formatado.",
        "Um crachá de evento traz um código vCard, mais rápido do que trocar cartões e digitar os dados depois.",
        "Um corretor de imóveis coloca o código nas placas e nos panfletos para o interessado salvar o número ali mesmo, na frente do imóvel.",
        "Uma recepção deixa o código do atendimento fora do horário comercial para o visitante salvar antes de sair.",
      ],
      tipsTitle: "Dicas antes de imprimir",
      tips: [
        "Menos campos, código menos denso. Em um cartão de visita pequeno, nome, celular, e-mail e site costumam bastar.",
        "Escreva os telefones com o código do país, como +55 11 91234-5678, para funcionarem também para contatos no exterior.",
        "Deixe a observação curta ou vazia. É o campo que mais facilmente deixa o código grande demais para ler em um cartão.",
        "Salve o contato do seu próprio código em um iPhone e em um Android e confira se nomes e números caem nos campos certos.",
      ],
    },
    faq: [
      {
        q: "O contato é salvo automaticamente?",
        a: "Não. O celular mostra uma prévia e a pessoa toca para adicionar. Nada é salvo sem confirmação.",
      },
      {
        q: "E se meu telefone ou cargo mudar?",
        a: "Os dados ficam fixos dentro do código. Crie um código novo e atualize os cartões impressos.",
      },
      {
        q: "Posso colocar foto no vCard?",
        a: "Aqui não. Uma foto seria grande demais para um QR Code. Use só campos de texto.",
      },
      {
        q: "Funciona no iPhone e no Android?",
        a: "Sim. O vCard 3.0 é suportado pela Câmera do iPhone e pela maioria das câmeras e apps leitores do Android, incluindo o Google Lens.",
      },
    ],
  },

  email: {
    title: "Gerador de QR Code para E-mail",
    subtitle: "Abra um novo e-mail com endereço, assunto e mensagem já preenchidos.",
    metaTitle: "Gerador de QR Code para E-mail — Grátis, sem cadastro",
    metaDescription:
      "Crie um QR Code de e-mail que abre uma nova mensagem com destinatário, assunto e texto preenchidos. Bom para sugestões, suporte e inscrições. Grátis, sem cadastro.",
    sections: {
      howTitle: "Como funciona um QR Code de e-mail",
      how: [
        "O código guarda um link mailto: padrão. Primeiro vem o destinatário, depois o assunto e a mensagem como texto codificado: mailto:support@example.com?subject=Order%20question&body=Hello%2C%20my%20order%20number%20is. Os espaços viram %20 para que todo app de e-mail leia do mesmo jeito.",
        "Ao escanear, o celular abre o app de e-mail padrão, como o Mail no iPhone ou o Gmail no Android, com um rascunho pronto. A pessoa pode editar qualquer parte e decide quando enviar. Se não houver app de e-mail configurado, o sistema pode perguntar qual app usar ou não mostrar nada útil, algo a considerar se o seu público usa mais o webmail.",
        "Só o campo Para é obrigatório. Assunto e mensagem são opcionais, mas poupam tempo de quem envia e facilitam organizar os e-mails que chegam.",
      ],
      usesTitle: "Onde ajuda",
      uses: [
        "Um cartão no quarto de hotel abre um e-mail para a recepção com o assunto “Pedido do quarto”, e a equipe encaminha rápido.",
        "O manual de um produto traz um código de suporte que já preenche o modelo no assunto.",
        "Em um estande de evento, o visitante escaneia e envia um e-mail de uma linha para entrar na lista de novidades, e fica com uma cópia do próprio pedido.",
        "Uma escola usa um código no bilhete impresso para os pais responderem sobre a presença, com o nome da turma no assunto.",
      ],
      tipsTitle: "Dicas antes de imprimir",
      tips: [
        "Use um assunto que a pessoa reconheça depois na pasta de enviados, como o nome do evento ou o modelo do produto.",
        "Escreva a mensagem como um começo que a pessoa completa, por exemplo “Meu número de pedido é”, em vez de um texto longo e pronto.",
        "Use um endereço que você vai manter. Um e-mail pessoal que pode mudar não combina com material impresso.",
        "Escaneie o código em um celular com outro app de e-mail para confirmar que assunto e mensagem chegam inteiros.",
      ],
    },
    faq: [
      {
        q: "Escanear envia o e-mail?",
        a: "Não. Só abre um rascunho. A pessoa revisa e toca em enviar.",
      },
      {
        q: "Posso incluir anexos?",
        a: "Não. O formato mailto: não aceita anexos. Você pode colocar o link de um arquivo no texto da mensagem.",
      },
      {
        q: "Qual app de e-mail abre?",
        a: "O app que o celular usa como padrão para e-mail, normalmente o Mail no iPhone e o Gmail na maioria dos Android.",
      },
      {
        q: "Posso usar acentos no assunto?",
        a: "Sim. Letras acentuadas, pontuação e outros alfabetos são codificados para o app de e-mail mostrar corretamente.",
      },
    ],
  },

  sms: {
    title: "Gerador de QR Code para SMS",
    subtitle: "Abra um SMS para o seu número com o texto já digitado.",
    metaTitle: "Gerador de QR Code para SMS — Grátis, sem cadastro",
    metaDescription:
      "Crie um QR Code de SMS que abre uma nova mensagem com seu número e o texto preenchidos. Útil para cadastros, reservas e palavras-chave. Grátis, sem cadastro.",
    sections: {
      howTitle: "Como funciona um QR Code de SMS",
      how: [
        "O código usa o formato SMSTO, amplamente reconhecido pelos leitores: SMSTO:+5511912345678:QUERO. O número fica só com dígitos e o sinal de mais inicial, e a mensagem vem depois do segundo dois-pontos, exatamente como você digitou.",
        "Na leitura, a Câmera do iPhone e a maioria das câmeras Android abrem o app de Mensagens com o número no destinatário e o texto na caixa de mensagem. Enviar é sempre escolha da pessoa. Vale a tarifa normal de SMS da operadora dela, o que importa se o seu público estiver viajando.",
        "Como a mensagem vai como um SMS comum, funciona em qualquer celular com plano, sem app nem dados móveis. É ótimo para palavras-chave curtas, como QUERO, SAIR ou um código de reserva, que um sistema automático consegue ler.",
      ],
      usesTitle: "Onde ajuda",
      uses: [
        "Um aviso no balcão convida o cliente a mandar uma palavra-chave por SMS para receber promoções, mais rápido do que preencher um formulário.",
        "Um estacionamento exibe um código que envia o número da vaga para o operador, e o motorista não precisa decorar.",
        "Um evento beneficente mostra um código que inicia uma doação por SMS com a palavra-chave da campanha já escrita.",
        "Uma assistência técnica coloca um código no carro da empresa para as pessoas pedirem retorno com a palavra “Orçamento”.",
      ],
      tipsTitle: "Dicas antes de imprimir",
      tips: [
        "Inclua o código do país no número se alguém do exterior puder escanear o código.",
        "Limite a mensagem a uma palavra-chave ou uma frase curta. Mensagens longas deixam o código mais denso e são editadas sem querer com mais facilidade.",
        "Se você tem uma lista de cadastro por SMS, confirme que seu provedor de mensagens reconhece a palavra-chave impressa antes de distribuir o material.",
        "Teste no iPhone e no Android. Alguns leitores antigos abrem o app de Mensagens com o número, mas deixam o texto vazio.",
      ],
    },
    faq: [
      {
        q: "O SMS é enviado automaticamente quando alguém escaneia?",
        a: "Não. O celular só prepara a mensagem. A pessoa precisa tocar em enviar.",
      },
      {
        q: "Funciona no iPhone?",
        a: "Sim. A Câmera do iPhone reconhece códigos SMSTO e abre o app de Mensagens com número e texto preenchidos.",
      },
      {
        q: "Posso enviar para mais de um número?",
        a: "Não. Um código de SMS aponta para um único número. Para mensagens em grupo, considere um código de WhatsApp ou de e-mail.",
      },
      {
        q: "Funciona sem dados móveis?",
        a: "Ler o código não exige conexão, e o SMS vai pela rede celular comum, então não precisa de dados.",
      },
    ],
  },

  phone: {
    title: "Gerador de QR Code para Telefone",
    subtitle: "Deixe as pessoas ligarem para você só escaneando, sem digitar o número.",
    metaTitle: "Gerador de QR Code para Telefone — Grátis, sem cadastro",
    metaDescription:
      "Crie um QR Code de telefone que abre o discador com seu número pronto para ligar. Ideal para placas, veículos e panfletos. Estático, grátis e sem cadastro.",
    sections: {
      howTitle: "Como funciona um QR Code de telefone",
      how: [
        "O código contém um link tel:, o mesmo tipo usado por um botão “Ligue para nós” em um site: tel:+5511912345678. Espaços, traços e parênteses são removidos, e só ficam os dígitos e o sinal de mais inicial.",
        "Ao escanear, o celular mostra o número e oferece ligar. No iPhone, a Câmera mostra um aviso; no Android, a câmera ou o Google Lens mostram um botão de chamada. O celular nunca liga sozinho; a pessoa sempre confirma. É um dos menores códigos possíveis, então é lido com facilidade mesmo impresso pequeno.",
        "Como só os dígitos e o sinal de mais são mantidos, ramais e pausas escritos com vírgula ou “ramal” são descartados. Se quem liga precisar de um ramal, imprima-o ao lado do código.",
      ],
      usesTitle: "Onde ajuda",
      uses: [
        "O carro de um encanador leva um código grande na lateral, e quem está parado no trânsito atrás pode guardar o contato sem anotar nada.",
        "Uma placa de “Vende-se” no vidro do carro abre uma ligação para o vendedor, mais seguro do que tentar ler um número enquanto passa.",
        "O cartão de retorno de uma clínica leva direto à central de agendamento, com menos ligações para números errados.",
        "Um condomínio deixa o número de emergência do síndico ou da administradora como código no hall de entrada.",
      ],
      tipsTitle: "Dicas antes de imprimir",
      tips: [
        "Escreva o número no formato internacional, começando com + e o código do país, para funcionar para turistas e celulares em roaming.",
        "Imprima também o número em texto ao lado do código. Algumas pessoas preferem discar, e isso ajuda quem não tem câmera.",
        "Em veículos e placas externas, dimensione o código para a distância real de leitura: cerca de um décimo da distância, ou seja, 30 cm para alguém a 3 m.",
        "Use o arquivo SVG para adesivos de vinil e placas grandes, assim as bordas ficam nítidas.",
      ],
    },
    faq: [
      {
        q: "O celular liga automaticamente ao escanear?",
        a: "Não. Ele mostra o número e a pessoa toca para ligar.",
      },
      {
        q: "Posso incluir um ramal?",
        a: "No código, não. Os ramais são removidos quando o número é limpo, então imprima o ramal em texto ao lado.",
      },
      {
        q: "Funciona com telefone fixo e 0800?",
        a: "Sim. Qualquer número que um celular consiga discar funciona, incluindo 0800, desde que a operadora de quem liga permita a chamada.",
      },
      {
        q: "E se meu número mudar?",
        a: "O número fica gravado no código, então você vai precisar de um código novo e novas impressões.",
      },
    ],
  },

  geo: {
    title: "Gerador de QR Code de Localização",
    subtitle: "Mostre um ponto exato no mapa com um código que guarda as coordenadas.",
    metaTitle: "Gerador de QR Code de Localização — Grátis, sem cadastro",
    metaDescription:
      "Crie um QR Code de localização com latitude e longitude que abre o app de mapas no ponto exato. Bom para entradas, trilhas e locais de evento. Grátis, sem cadastro.",
    sections: {
      howTitle: "Como funciona um QR Code de localização",
      how: [
        "O código guarda um link geo: com dois números, latitude e longitude, separados por vírgula: geo:-23.561414,-46.655881. A latitude deve ficar entre -90 e 90 e a longitude entre -180 e 180. Você pode digitar os números ou tocar em Usar minha localização estando no próprio lugar.",
        "No Android, a leitura normalmente abre o Google Maps ou outro app de mapas com um alfinete nas coordenadas, pronto para traçar a rota. No iPhone o suporte a links geo: é menos consistente; dependendo da versão do iOS e do app leitor, pode abrir o Apple Maps ou só mostrar as coordenadas. Se a maioria do seu público usa iPhone, um código de link com o link de compartilhamento do Google Maps ou do Apple Maps pode ser mais confiável.",
        "As coordenadas apontam para uma posição, não para o cadastro de um negócio. Essa é a vantagem: funcionam para lugares sem endereço, como um portão lateral, um estacionamento ou um ponto de encontro no parque.",
      ],
      usesTitle: "Onde ajuda",
      uses: [
        "Um convite de casamento traz um código para a entrada exata de um sítio que os mapas marcam do lado errado da propriedade.",
        "A placa do início de uma trilha leva às coordenadas do estacionamento, útil quando não há endereço.",
        "Uma nota de entrega de um galpão indica ao motorista a doca de carga certa, e não a entrada principal.",
        "O mapa de um festival marca o posto médico ou os achados e perdidos com códigos para quem se perder.",
      ],
      tipsTitle: "Dicas antes de imprimir",
      tips: [
        "Para pegar as coordenadas, toque e segure (ou clique com o botão direito) no ponto do Google Maps e copie os dois números que aparecem.",
        "Cinco casas decimais dão precisão de cerca de um metro, o que é mais que suficiente. Dígitos a mais só aumentam a densidade.",
        "Confira o sinal dos números. No Brasil, a longitude é sempre negativa (o país fica a oeste de Greenwich) e a latitude também, exceto no extremo norte, acima do Equador.",
        "Escaneie o código em um iPhone e em um Android antes de imprimir, já que os apps de mapas tratam o link de formas diferentes.",
      ],
    },
    faq: [
      {
        q: "O QR Code de localização funciona no iPhone?",
        a: "Às vezes. O Android lida bem com links geo:, enquanto no iPhone depende da versão do iOS e do leitor. Teste e, se o seu público for principalmente de iPhone, considere um código de link com o compartilhamento do mapa.",
      },
      {
        q: "Posso usar um endereço em vez de coordenadas?",
        a: "Este tipo usa só coordenadas. Para um endereço, abra-o em um app de mapas, copie o link de compartilhamento e use o tipo URL.",
      },
      {
        q: "Escanear precisa de internet?",
        a: "Ler as coordenadas, não. Mostrar o mapa e a rota, sim, a menos que o app de mapas tenha mapas off-line baixados.",
      },
      {
        q: "Isso compartilha minha localização com alguém?",
        a: "Não. O código contém só as coordenadas que você digitou. Usar minha localização lê sua posição no navegador apenas para preencher os campos.",
      },
    ],
  },

  event: {
    title: "Gerador de QR Code de Evento (Agenda)",
    subtitle: "Coloque seu evento na agenda das pessoas com uma leitura, com horário, local e detalhes.",
    metaTitle: "Gerador de QR Code de Evento — Grátis, sem cadastro",
    metaDescription:
      "Crie um QR Code de evento com título, data, horário, local e observações. Uma leitura adiciona à agenda do celular, com fuso horário ajustado. Grátis, sem cadastro.",
    sections: {
      howTitle: "Como funciona um QR Code de evento",
      how: [
        "O código contém um evento iCalendar, o mesmo formato dos convites de agenda: BEGIN:VEVENT, SUMMARY:Lançamento, DTSTART:20261015T170000Z, DTEND:20261015T183000Z, LOCATION:Sala 3, END:VEVENT. Os horários são convertidos do fuso do seu aparelho para UTC, indicado pelo Z, e cada celular mostra o evento no próprio horário local.",
        "Para um evento de dia inteiro, as datas são escritas sem horário, como DTSTART;VALUE=DATE:20261015. Nesse formato a data final é exclusiva, então um evento de um dia em 15 de outubro termina em 16 de outubro no código; é assim que as agendas esperam, e aparece como um único dia.",
        "No iPhone, a Câmera reconhece o evento e oferece adicionar ao Calendário. No Android, depende do leitor: o Google Lens e muitos apps de câmera mostram a opção de adicionar à agenda, enquanto alguns mais antigos só mostram o texto bruto.",
      ],
      usesTitle: "Onde ajuda",
      uses: [
        "O cartaz de um show traz um código que salva a data e o local, e quem passa não precisa lembrar.",
        "O informativo de uma escola inclui códigos para as reuniões de pais, colocando horário e sala direto em agendas cheias.",
        "O crachá de um congresso lista códigos para cada oficina, cada um com a sala no campo de local.",
        "Uma clínica imprime a próxima consulta como código no cartão de lembrete.",
      ],
      tipsTitle: "Dicas antes de imprimir",
      tips: [
        "Confira o fuso horário do seu aparelho antes de criar o código. O horário digitado é lido como horário local de onde você está e depois salvo em UTC.",
        "Coloque a sala ou o endereço completo em Local; muitas agendas transformam isso em um link de mapa.",
        "Mantenha a descrição curta. Observações práticas como “Traga seu notebook” cabem bem; uma programação completa deixa o código denso.",
        "Adicione o evento a partir do seu próprio código e confira data, horário e duração antes de imprimir.",
      ],
    },
    faq: [
      {
        q: "O horário fica certo para quem está em outro fuso?",
        a: "Sim. O horário é salvo em UTC, então cada agenda mostra no horário local de quem vê. Um evento às 17h em Lisboa aparece às 13h ou às 14h em São Paulo, dependendo da época do ano.",
      },
      {
        q: "Posso alterar o evento depois de imprimir?",
        a: "Não. Os detalhes ficam dentro do código. Se o horário ou o local mudar, crie e imprima um código novo.",
      },
      {
        q: "Posso criar um evento recorrente?",
        a: "Não com este gerador. Cada código descreve um único evento.",
      },
      {
        q: "O evento é adicionado automaticamente?",
        a: "Não. O celular mostra o evento e a pessoa escolhe adicionar à agenda.",
      },
    ],
  },

  payment: {
    title: "Gerador de QR Code PayPal e Link de Pagamento",
    subtitle: "Receba pagamentos por leitura com um código que abre seu PayPal.Me, Venmo, Cash App ou página de apoio.",
    metaTitle: "QR Code PayPal e Link de Pagamento — Grátis, sem cadastro",
    metaDescription:
      "Crie um QR Code para PayPal.Me, Venmo, Cash App, Ko-fi, Buy Me a Coffee e outros, com valor opcional no PayPal, Venmo e Cash App. Grátis e sem cadastro.",
    sections: {
      howTitle: "Como funciona um QR Code de pagamento",
      how: [
        "O código guarda o link público de pagamento da sua conta. Você escolhe o serviço e digita seu nome de usuário, e o link é montado para você. Com valor, o PayPal vira https://paypal.me/seunome/25.00, o Venmo vira https://venmo.com/u/seunome?txn=pay&amount=25.00 e o Cash App vira https://cash.app/$suatag/25.00. Os links do Buy Me a Coffee, Ko-fi, Patreon, Revolut.Me e Wise abrem sua página sem valor.",
        "A leitura abre o link no app de pagamento, se estiver instalado, ou no navegador. Quem paga entra na própria conta, confere o destinatário e o valor e confirma. O código não contém dados de cartão nem de banco, só o endereço público da sua página.",
        "Este site não processa pagamentos, não cobra taxa e não vê transações. O dinheiro circula inteiramente dentro do serviço de pagamento, com os termos e taxas de sempre.",
      ],
      usesTitle: "Onde ajuda",
      uses: [
        "Uma barraca de feira mostra um código do PayPal no caixa para turistas e clientes sem dinheiro vivo.",
        "Um músico de rua deixa um código do Ko-fi ou do PayPal no estojo do instrumento para receber gorjetas.",
        "Um clube esportivo imprime um código com a mensalidade já preenchida, e os pais não precisam digitar o valor.",
        "Um freelancer que atende clientes no exterior coloca um código de pagamento no rodapé da fatura impressa.",
      ],
      tipsTitle: "Dicas antes de imprimir",
      tips: [
        "O valor é opcional. Deixe em branco para gorjetas e doações, assim quem paga escolhe; preencha para preços fixos.",
        "Nos links do PayPal, Venmo e Cash App, o valor usa números com até duas casas decimais separadas por ponto, como 12.50. A moeda é a configurada na sua conta, não no código. Para receber em reais, com valor escrito como 12,50, use o QR Code Pix em /pt/pix-qr-code.",
        "Abra você mesmo o link do resultado e confira se aparecem seu nome e sua foto. Um erro no nome de usuário pode mandar dinheiro para um desconhecido.",
        "O Venmo e o Cash App funcionam basicamente só nos EUA, e outros serviços têm seus próprios limites por país. Escolha o que seus clientes já usam; no Brasil, o PayPal é o mais comum desta lista, mas para clientes brasileiros o QR Code Pix (/pt/pix-qr-code) é o caminho natural.",
      ],
    },
    faq: [
      {
        q: "É seguro mostrar meu QR Code de pagamento em público?",
        a: "O código contém só sua página pública de pagamento, o mesmo link que você mandaria em uma mensagem. Ele não pode ser usado para tirar dinheiro de você.",
      },
      {
        q: "Posso mudar o valor depois?",
        a: "O valor faz parte do código. Para mudar, crie um código novo. Se os preços mudam com frequência, deixe o valor em branco.",
      },
      {
        q: "Por que não dá para definir valor no Ko-fi ou no Patreon?",
        a: "Os links públicos deles não aceitam valor preenchido, então quem paga escolhe na página.",
      },
      {
        q: "Este site fica com parte dos pagamentos?",
        a: "Não. O código só abre sua página de pagamento. As taxas, se houver, são as do PayPal, do Venmo ou do outro serviço.",
      },
    ],
  },

  crypto: {
    title: "Gerador de QR Code de Bitcoin e Cripto",
    subtitle: "Compartilhe o endereço da carteira como um QR Code que preenche endereço e valor no app da carteira.",
    metaTitle: "QR Code de Bitcoin e Cripto — Grátis, sem cadastro",
    metaDescription:
      "Crie um QR Code de Bitcoin, Ethereum, Litecoin, Dogecoin, Bitcoin Cash ou Solana com o endereço da sua carteira e valor opcional. Estático, grátis e sem cadastro.",
    sections: {
      howTitle: "Como funciona um QR Code de cripto",
      how: [
        "O código guarda uma URI de pagamento que os apps de carteira entendem. Para Bitcoin, segue o formato BIP-21: bitcoin:bc1qexampleaddress?amount=0.0015&label=Cafe%20da%20feira. O esquema indica a moeda, seguido do seu endereço e, se quiser, do valor em moedas e de um rótulo curto de até 60 caracteres. Litecoin, Dogecoin, Bitcoin Cash e Solana usam o mesmo padrão, cada um com seu esquema.",
        "Para Ethereum, o código contém só ethereum: e o endereço. As carteiras tratam valores em Ethereum de formas diferentes, então o valor fica para quem envia digitar.",
        "O código foi feito para ser lido de dentro de um app de carteira, pelo botão de escanear ou enviar. A câmera do celular também pode reconhecê-lo e oferecer abrir uma carteira instalada. A carteira mostra endereço e valor para revisão; nada é enviado até quem paga confirmar.",
      ],
      usesTitle: "Onde ajuda",
      uses: [
        "Uma loja que aceita Bitcoin mostra o código no caixa, e o cliente não precisa copiar à mão um endereço de 42 caracteres.",
        "Um criador de conteúdo coloca um código de doação para uma carteira Solana ou Litecoin no fim de um vídeo ou em uma revista independente.",
        "Um estande em um evento mostra um código com valor fixo para o pagamento de ingresso ou produto.",
        "Quem vai receber uma transferência de um amigo mostra o código na tela em vez de mandar o endereço pelo chat.",
      ],
      tipsTitle: "Dicas antes de imprimir",
      tips: [
        "Confira o endereço caractere por caractere com a sua carteira. Transferências de cripto não podem ser desfeitas, e um endereço errado significa dinheiro perdido.",
        "Garanta que a moeda corresponde à carteira. Enviar uma moeda para um endereço de outra rede pode fazer os fundos se perderem.",
        "Os valores são em moedas (BTC, LTC…), não em reais, com até oito casas decimais separadas por ponto. Como o preço oscila, deixe o valor em branco em qualquer material impresso que vá durar.",
        "Considere usar um endereço exclusivo para recebimentos. Qualquer pessoa que escanear um código público pode consultar o histórico desse endereço na blockchain.",
      ],
    },
    faq: [
      {
        q: "É seguro compartilhar o QR Code da minha carteira?",
        a: "Compartilhar um endereço de recebimento é normal e não permite que ninguém gaste da carteira. Nunca coloque uma chave privada ou frase de recuperação em um QR Code.",
      },
      {
        q: "Por que não há opção de valor para Ethereum?",
        a: "As carteiras Ethereum interpretam valores em links de pagamento de formas diferentes; para evitar enviar o valor errado, o código contém só o endereço.",
      },
      {
        q: "Posso receber tokens como USDT?",
        a: "Tokens em outras redes precisam da própria carteira e das configurações de rede. Este gerador cobre as seis moedas nativas listadas.",
      },
      {
        q: "Quais carteiras leem o código?",
        a: "A maioria das carteiras conhecidas lê o formato de pagamento no estilo bitcoin:. Se uma carteira ignorar o valor ou o rótulo, o endereço continua funcionando.",
      },
    ],
  },

  file: {
    title: "Gerador de QR Code para PDF",
    subtitle: "Ligue um QR Code a um PDF ou outro arquivo que você compartilhou pelo Google Drive, Dropbox ou seu site.",
    metaTitle: "QR Code para PDF — Grátis, sem cadastro",
    metaDescription:
      "Crie um QR Code que abre um PDF, cardápio, catálogo ou manual hospedado no Google Drive, Dropbox ou seu site. Estático, nunca expira, grátis e sem cadastro.",
    sections: {
      howTitle: "Como funciona um QR Code para PDF",
      how: [
        "Um QR Code não consegue guardar um PDF inteiro; até um documento curto é muito maior do que os poucos kilobytes que um código armazena. Em vez disso, o código guarda um link para onde o arquivo está, como https://drive.google.com/file/d/1AbC…/view. Este site não recebe nem hospeda arquivos, então o primeiro passo é colocar o PDF on-line.",
        "Envie o arquivo para o Google Drive, Dropbox, OneDrive ou seu site, copie o link de compartilhamento e deixe o acesso como “qualquer pessoa com o link”. Cole esse link aqui. Quando alguém escanear o código, o celular abre o link no navegador, onde o PDF pode ser visto ou baixado.",
        "O código funciona enquanto o link funcionar. Se o arquivo for apagado, ganhar um link novo ou ficar privado, as pessoas vão ver um erro ou uma tela de login.",
      ],
      usesTitle: "Onde ajuda",
      uses: [
        "Um restaurante liga o código ao PDF do cardápio e atualiza o arquivo a cada estação sem trocar os displays de mesa.",
        "A caixa de um produto traz um código para o manual completo, e o folheto impresso só precisa das instruções de segurança.",
        "A placa de um imóvel à venda abre a planta e o material de divulgação para quem passa.",
        "Um congresso distribui um único código para os slides e o material de apoio depois da palestra.",
        "Uma loja que vende pelo atacado deixa o código do catálogo em PDF no balcão e no cartão de visita.",
      ],
      tipsTitle: "Dicas antes de imprimir",
      tips: [
        "Teste o link em uma janela anônima, sem estar logado. Se pedir login ali, a configuração de compartilhamento está errada.",
        "Para atualizar o arquivo sem mudar o link, substitua o arquivo em vez de enviar uma cópia nova. A opção Gerenciar versões do Google Drive mantém o mesmo link.",
        "Evite links que expiram, como os links temporários de alguns serviços de transferência de arquivos.",
        "Mantenha o PDF leve e legível na tela do celular. Um arquivo escaneado de 50 MB demora para abrir nos dados móveis.",
      ],
    },
    faq: [
      {
        q: "Posso enviar meu PDF aqui?",
        a: "Não. Este site só cria o código. Hospede o arquivo no Google Drive, Dropbox ou no seu site e cole o link de compartilhamento.",
      },
      {
        q: "Por que aparece “Solicitar acesso” quando escaneiam?",
        a: "O arquivo não está compartilhado publicamente. Mude o compartilhamento para “qualquer pessoa com o link pode ver”.",
      },
      {
        q: "Posso trocar o PDF depois de imprimir o código?",
        a: "Sim, desde que o link continue o mesmo. Substitua o conteúdo do arquivo no mesmo endereço; enviar uma cópia nova cria um link novo.",
      },
      {
        q: "Funciona com arquivos que não são PDF?",
        a: "Sim. Qualquer arquivo com link de compartilhamento funciona, incluindo imagens, apresentações e áudios. Se ele abre direto no celular depende do tipo de arquivo.",
      },
    ],
  },

  pix: {
    title: "Gerador de QR Code Pix",
    subtitle: "Gere um QR Code Pix estático com sua chave Pix, seu nome e um valor opcional, que qualquer app de banco do Brasil paga em uma leitura.",
    metaTitle: "Gerador de QR Code Pix — BR Code estático, grátis, sem cadastro",
    metaDescription:
      "Gere um QR Code Pix estático (BR Code) a partir da sua chave Pix, nome, cidade e um valor opcional. Segue o padrão do Banco Central e é feito no seu navegador. Grátis, sem cadastro.",
    sections: {
      howTitle: "Como funciona o QR Code Pix",
      how: [
        "O código guarda um BR Code: o formato de texto definido pelo Banco Central do Brasil para o Pix, construído sobre o padrão EMV de QR Codes apresentados pelo recebedor. Cada item é escrito como um identificador, um tamanho de dois dígitos e o valor. O bloco da conta do recebedor leva o identificador br.gov.bcb.pix e a sua chave Pix (CPF, CNPJ, e-mail, celular ou chave aleatória); depois vêm a categoria do comerciante 0000, a moeda 986 (o real), o valor opcional, o país BR, seu nome (até 25 letras), sua cidade (até 15) e o identificador da transação. Um código verificador CRC-16 fecha a sequência, então um código danificado ou alterado é recusado pelo app do banco em vez de ser pago para a pessoa errada.",
        "Este é um código estático, do mesmo tipo que o banco dá para você imprimir e deixar no caixa. Ele não chama API nem serviço de pagamento, por isso o identificador da transação (txid) fica como *** quando você deixa o campo em branco, exatamente como o manual do Banco Central mostra para códigos estáticos. Se você digitar um (letras e números, até 25), ele viaja com o pagamento e aparece no seu extrato, o que ajuda na conciliação.",
        "Quem paga abre o app do banco ou da carteira (Nubank, Itaú, Bradesco, Caixa, PicPay, Mercado Pago e qualquer outro participante do Pix), escolhe Pix e escaneia. O app consulta a chave no diretório central e mostra o nome cadastrado do titular da conta, não o nome que está no código, para que o pagador confirme quem vai receber. Com valor no código, ele já vem preenchido; sem valor, o pagador digita. A mesma sequência é o texto Pix copia e cola exibido abaixo do formulário, que você pode colar em uma mensagem.",
      ],
      usesTitle: "Onde ajuda",
      uses: [
        "Um ambulante ou uma barraca de feira imprime um código sem valor, e cada cliente escaneia e digita o que deve.",
        "Uma loja pequena ou um MEI coloca um código com preço fixo ao lado do produto, por exemplo um prato feito de R$ 25,00.",
        "Um condomínio ou clube envia um código com a mensalidade e um identificador como COTA2026MAR, para conferir os pagamentos com facilidade.",
        "Uma igreja, festa escolar ou instituição beneficente mostra um código de doação no cartaz ou na tela de uma transmissão ao vivo.",
      ],
      tipsTitle: "Dicas antes de imprimir",
      tips: [
        "Chave de celular precisa começar com +55, por exemplo +5511912345678. Onze dígitos sem o +55 são lidos como CPF, que é outra chave.",
        "Mantenha nome e cidade curtos e sem acento. O padrão permite 25 e 15 caracteres, e os acentos são removidos para você; de todo modo, os apps de banco mostram o nome cadastrado na chave.",
        "Teste o código com o seu próprio app de banco antes de imprimir. O app mostra o nome cadastrado do titular da chave; se não for o seu, a chave tem um erro de digitação.",
        "Para preços que mudam, deixe o valor em branco e escreva o preço ao lado do código. Um código com valor precisa ser gerado de novo toda vez que o preço muda.",
      ],
    },
    faq: [
      {
        q: "Este é um QR Code Pix oficial?",
        a: "Ele segue o padrão BR Code do Banco Central do Brasil para QR Codes Pix estáticos, o mesmo formato que o seu banco usa. Qualquer app com Pix lê. O site não é uma instituição de pagamento e não participa da transferência: o dinheiro vai direto para a conta ligada à sua chave.",
      },
      {
        q: "O código expira?",
        a: "Não. Um QR Code Pix estático funciona enquanto a chave continuar cadastrada na sua conta. Se você excluir a chave ou levá-la para outro banco, gere um código novo.",
      },
      {
        q: "Consigo ver quem pagou?",
        a: "Os pagamentos entram na sua conta como qualquer Pix, com o nome de quem pagou. Colocar um identificador (txid) no código ajuda a separar, no extrato, os pagamentos de um código dos de outros.",
      },
      {
        q: "Por que o app mostra um nome diferente do que digitei?",
        a: "Os apps de banco exibem o nome cadastrado na chave Pix no diretório central (DICT) e ignoram o nome que está dentro do código. O nome no código ainda é exigido pelo padrão, então digite o seu; quem paga vai ver o seu nome cadastrado.",
      },
    ],
  },

  upi: {
    title: "Gerador de QR Code UPI (Índia)",
    subtitle: "Transforme seu UPI ID em um QR Code de pagamento que PhonePe, Google Pay, Paytm e todos os outros apps UPI da Índia leem.",
    metaTitle: "Gerador de QR Code UPI (Índia) — Grátis, sem cadastro",
    metaDescription:
      "Crie um QR Code de pagamento UPI, o sistema instantâneo da Índia, a partir do seu UPI ID e nome, com valor e observação opcionais. Usa o formato upi://pay da NPCI, feito no seu navegador. Grátis, sem cadastro.",
    sections: {
      howTitle: "Como funciona o QR Code UPI",
      how: [
        "O UPI é o sistema de pagamentos instantâneos da Índia, parecido com o nosso Pix. O código guarda um link UPI no formato publicado pela NPCI: upi://pay?pa=seuid@banco&pn=Seu%20Nome&am=250.00&cu=INR&tn=Mesa%204. O parâmetro pa é o seu UPI ID (também chamado VPA), pn é o nome do recebedor mostrado a quem paga, am é o valor opcional, cu é sempre INR (a rúpia indiana) e tn é uma observação opcional. Espaços e caracteres especiais no nome e na observação são codificados com porcentagem, então o link é uma sequência única, sem quebras.",
        "Todo app UPI da Índia é obrigado a entender esse link, então o mesmo código funciona no PhonePe, Google Pay, Paytm, BHIM, Amazon Pay e nos apps dos bancos. Quem paga abre o app, toca em Escanear, e o app preenche seu UPI ID, o nome e o valor, se houver. O pagador confirma com o PIN do UPI e o dinheiro passa de uma conta bancária para outra em segundos.",
        "Esta é a forma estática do link, apresentada pelo recebedor. Campos usados por gateways de pagamento em códigos dinâmicos, como referência da transação, código de comerciante ou assinatura, ficam de fora de propósito. Isso mantém o código simples e válido para um UPI ID pessoal; uma conta de comerciante registrada também funciona, porque o app só precisa do ID.",
      ],
      usesTitle: "Onde ajuda",
      uses: [
        "Uma mercearia de bairro (kirana) ou uma barraca de chá imprime um código sem valor, e os clientes digitam o que devem depois de cada venda.",
        "Quem faz bolos em casa ou um alfaiate compartilha um código com preço fixo em uma mensagem de WhatsApp ou em um panfleto.",
        "Um condomínio residencial ou uma escola cobra uma taxa com um código que traz o valor e uma observação como Maintenance March.",
        "Um templo, uma ONG ou um festival universitário exibe um código de doação em uma faixa ou na tela de um evento.",
      ],
      tipsTitle: "Dicas antes de imprimir",
      tips: [
        "Confira o UPI ID caractere por caractere. Terminações comuns são @okaxis, @oksbi, @ybl, @paytm, @ibl e @upi; uma letra errada manda o dinheiro para outra pessoa ou faz o pagamento falhar.",
        "Digite o nome do recebedor como aparece no seu banco, para quem paga ver um nome que reconhece. O app mostra tanto esse nome quanto o nome verificado do titular da conta.",
        "Deixe o valor em branco em comércios com contas variadas. Para cobranças fixas, preencha, assim o pagador não erra ao digitar.",
        "Escaneie o código pronto com dois apps UPI diferentes antes de imprimir. Se um deles mostrar nome ou valor errado, corrija agora, e não depois de cem cópias.",
      ],
    },
    faq: [
      {
        q: "Funciona com PhonePe, Google Pay e Paytm?",
        a: "Sim. O código usa o link padrão upi://pay, que a NPCI exige que todo app UPI aceite, então funciona independentemente do app de quem paga ou do banco ao qual seu UPI ID pertence. Apps de banco brasileiros não leem este formato; para receber no Brasil, use o QR Code Pix em /pt/pix-qr-code.",
      },
      {
        q: "Preciso de conta de comerciante?",
        a: "Não. Um UPI ID pessoal funciona. Códigos de comerciante gerados por um provedor de pagamento podem trazer campos extras, como categoria de comerciante ou assinatura; este código é a forma simples, que só precisa do seu UPI ID e do nome.",
      },
      {
        q: "O site processa ou vê os pagamentos?",
        a: "Não. O código contém apenas o link acima. O pagamento acontece inteiramente dentro do app UPI de quem paga e do seu banco; nada passa por este site.",
      },
      {
        q: "Posso escolher a moeda ou colocar um valor em paise?",
        a: "A moeda é sempre INR, a única que o UPI aceita. Os valores usam até duas casas decimais, por exemplo 99,50, então os paise (os centavos da rúpia) estão cobertos.",
      },
    ],
  },

  epc: {
    title: "Gerador de QR Code EPC (GiroCode) para transferência SEPA",
    subtitle: "Gere um QR Code de transferência SEPA com seu IBAN, nome e um valor opcional, que os apps de banco da Europa preenchem automaticamente.",
    metaTitle: "Gerador de QR Code EPC / GiroCode — Transferência SEPA, grátis, sem cadastro",
    metaDescription:
      "Crie um QR Code EPC (GiroCode) para transferência SEPA na Europa a partir do seu IBAN, nome, valor e referência de pagamento. Segue a diretriz do European Payments Council. Grátis, sem cadastro.",
    sections: {
      howTitle: "Como funciona o QR Code EPC",
      how: [
        "O código guarda um texto curto definido pelo European Payments Council na diretriz EPC069-12 para transferências SEPA, o sistema de transferências em euro usado na Europa. São até doze linhas separadas por quebras de linha: BCD, a versão 002, o conjunto de caracteres 1 (UTF-8), o serviço SCT, o BIC opcional, o nome do recebedor (até 70 caracteres), o IBAN, o valor no formato EUR12.50, um código de finalidade que fica vazio, uma referência estruturada do credor ou uma referência em texto livre (até 140 caracteres) e um aviso para quem paga (até 70). Linhas vazias no fim são descartadas e o conteúdo inteiro fica dentro de 331 bytes, como a diretriz exige.",
        "Os apps de banco da Alemanha e da Áustria conhecem esse formato como GiroCode; na Holanda e na Bélgica, como EPC QR; na Finlândia, como QR Code de pagamento; ele também é aceito em Luxemburgo, Itália, Estônia, Letônia e Lituânia. Quem paga abre o app, escolhe escanear ou fotografar uma transferência, e o recebedor, o IBAN, o valor e a referência aparecem no formulário. O pagador confere os dados e aprova a transferência como de costume.",
        "O IBAN é limpo e verificado antes de o código ser montado: os espaços são removidos, as letras ficam em maiúsculas, o tamanho é conferido de acordo com o país e os dígitos verificadores são validados com o algoritmo mod-97. Uma referência que seja uma referência de credor ISO 11649 válida (RF seguido de dígitos verificadores) vai automaticamente para o campo estruturado; qualquer outro texto vai para o campo livre.",
      ],
      usesTitle: "Onde ajuda",
      uses: [
        "Um freelancer ou uma pequena empresa imprime o código na fatura, ao lado dos dados bancários, e o cliente paga sem digitar o IBAN.",
        "Um clube ou associação coloca um código com a anuidade e uma referência como Membership 2026 na carta aos associados.",
        "Um proprietário compartilha com os inquilinos um código do aluguel, com o valor e a referência que deve aparecer no extrato.",
        "Uma instituição beneficente ou paróquia exibe um código de doação sem valor em um cartaz ou boletim.",
      ],
      tipsTitle: "Dicas antes de imprimir",
      tips: [
        "O BIC é opcional em transferências SEPA dentro da UE desde a versão 002, então deixe em branco, a menos que o seu banco peça.",
        "Mantenha a referência útil, mas curta: um número de fatura ou um código de cliente é o que você vai procurar no extrato depois.",
        "Use ponto ou vírgula no valor; os dois são aceitos e gravados no código como EUR49.90. Só valores em euro são possíveis neste formato.",
        "Escaneie o código com o seu próprio app de banco antes de imprimir. Se o IBAN ou o nome não corresponderem à sua conta, corrija o erro agora.",
      ],
    },
    faq: [
      {
        q: "Quais apps de banco leem este código?",
        a: "A maioria dos apps de banco da Alemanha, Áustria, Holanda, Bélgica, Finlândia e de vários outros países da zona SEPA, incluindo Sparkasse, Volksbank, Deutsche Bank, Commerzbank, ING, Rabobank, ABN AMRO, Erste Bank e muitas fintechs. Na França e na Espanha o suporte ainda é limitado, então teste com os apps que seus pagadores usam. Bancos brasileiros não leem este formato; para receber no Brasil, use o QR Code Pix em /pt/pix-qr-code.",
      },
      {
        q: "É o mesmo que GiroCode?",
        a: "Sim. GiroCode é o nome alemão do QR Code EPC descrito na diretriz do European Payments Council. Outros países usam outros nomes para o mesmo formato.",
      },
      {
        q: "Quem paga pode alterar o valor ou a referência?",
        a: "Sim. O código só preenche o formulário de transferência no app de quem paga; todos os campos ainda podem ser editados antes de a transferência ser aprovada.",
      },
      {
        q: "O código funciona para pagamentos instantâneos?",
        a: "O código descreve uma transferência SEPA. Se ela será executada como pagamento instantâneo depende do banco de quem paga e da opção escolhida no app, não do código.",
      },
    ],
  },
};

/** Textos em português (Brasil) para as páginas de casos de uso (/pt/restaurant-menu-qr-code, …). */
export const useCasesPt: Record<UseCaseId, LandingCopy> = {
  restaurant_menu: {
    title: "QR Code para Cardápio de Restaurante",
    subtitle: "Imprima um código para cada mesa que abre seu cardápio atualizado no celular do cliente.",
    metaTitle: "QR Code para Cardápio — Grátis, sem cadastro",
    metaDescription:
      "Crie um QR Code para o cardápio do seu restaurante, bar ou lanchonete que abre a página ou o PDF do menu. Estático, nunca expira, pronto para displays de mesa. Grátis.",
    sections: {
      howTitle: "Como funciona o QR Code para cardápio",
      how: [
        "Um QR Code de cardápio não contém o cardápio. Ele contém um link, como `https://seurestaurante.com.br/cardapio`, e o celular abre o que estiver nesse endereço. Então o primeiro passo é decidir onde o cardápio fica: uma página no seu site, um PDF compartilhado pelo Google Drive ou Dropbox, ou a página que seu serviço de cardápio digital ou de pedidos fornece. Este site só cria o código; não hospeda cardápios nem arquivos.",
        "Como o código é estático, o link dentro dele fica fixo no momento da impressão. O que você pode mudar é o conteúdo por trás do link. Se o cardápio fica em um endereço estável e você atualiza essa página ou substitui o PDF no mesmo lugar, todos os displays de mesa continuam funcionando com mudanças de preço e pratos novos. Se o próprio endereço mudar, por exemplo ao trocar de serviço de cardápio, os códigos impressos precisam ser substituídos.",
        "O cliente escaneia com a câmera do celular, vê o endereço e toca para abrir, sem instalar nenhum app. Um link curto no seu próprio domínio também passa mais confiança do que um link longo de terceiros.",
      ],
      usesTitle: "Onde ajuda",
      uses: [
        "Displays ou adesivos em cada mesa, para o cliente olhar o cardápio enquanto espera, sem disputar o único menu plastificado.",
        "Um adesivo na vitrine ou na porta, para quem passa ver pratos e preços antes de entrar, mesmo com a casa fechada.",
        "Um encarte no delivery ou na sacola de viagem com o link do cardápio para o próximo pedido de casa.",
        "Um código separado no caixa para a página de alergênicos e ingredientes, para a equipe indicar quando o cliente perguntar.",
        "Em quiosques de praia e food trucks, um código grande no balcão substitui cardápios de papel que voam ou molham.",
      ],
      tipsTitle: "Dicas antes de imprimir",
      tips: [
        "Use um endereço que você controla, como seudominio.com.br/cardapio, e redirecione para onde o cardápio estiver hoje. Assim, trocar de serviço de cardápio não significa reimprimir todos os displays.",
        "Abra o cardápio no celular usando os dados móveis, não o Wi-Fi do restaurante. Um PDF pesado de páginas escaneadas carrega devagar e é difícil de ler em tela pequena; uma página simples funciona melhor.",
        "Mantenha cardápios impressos disponíveis. Alguns clientes não têm smartphone, estão sem bateria ou enxergam mal, e o QR Code deve ser uma comodidade, não a única forma de fazer o pedido.",
        "Mostre as informações de alergênicos on-line com a mesma clareza do papel e atualize sempre que um prato mudar.",
        "Imprima o código com pelo menos 2 a 3 cm nos displays de mesa. Para a vitrine, a Folha para impressão / PDF gera um cartaz A4 com título editável, como “Escaneie e veja nosso cardápio”.",
      ],
    },
    faq: [
      {
        q: "Posso enviar meu cardápio aqui?",
        a: "Não. Este site só cria o código. Coloque o cardápio no seu site, compartilhe um PDF pelo Google Drive ou Dropbox com “qualquer pessoa com o link” ou use o link do seu serviço de cardápio, e cole esse endereço aqui.",
      },
      {
        q: "Preciso de um código novo quando o cardápio mudar?",
        a: "Não, se o endereço continuar o mesmo. Atualize a página ou substitua o PDF no mesmo link, e os códigos impressos passam a mostrar a versão mais recente.",
      },
      {
        q: "O código para de funcionar depois de um tempo?",
        a: "Não. É um código estático, com o link gravado na imagem, então não há assinatura para vencer. Ele funciona enquanto a página do cardápio estiver no ar.",
      },
      {
        q: "Uso um código para todas as mesas ou um por mesa?",
        a: "Um código basta quando todas as mesas veem o mesmo cardápio. Códigos separados só ajudam se o seu sistema de pedidos der um link para cada mesa; você pode transformar essa lista em códigos na página Em lote, até 200 de uma vez em um ZIP.",
      },
    ],
  },

  wedding: {
    title: "QR Code para Casamento",
    subtitle: "Ligue os convites ao site do casamento ou à confirmação de presença, e reúna as fotos da festa em um álbum compartilhado.",
    metaTitle: "QR Code para Casamento — Grátis, sem cadastro",
    metaDescription:
      "Crie um QR Code de casamento para convites, confirmação de presença (RSVP), lista de presentes, localização e álbum de fotos. Estático, nunca expira. Grátis, sem cadastro.",
    sections: {
      howTitle: "Como funciona um QR Code de casamento",
      how: [
        "Um QR Code de casamento guarda um link, e o link decide o que o convidado vê. No convite, normalmente é o site do casamento ou o próprio formulário de confirmação de presença, seja ele feito em um serviço de sites de casamento, no Google Forms ou em outra ferramenta. O convidado escaneia, a página abre e ele responde sem digitar um endereço longo do cartão.",
        "A mesma ideia funciona para o resto do dia. Um código com o link de compartilhamento do Google Maps ou do Apple Maps leva os convidados ao local, e um código na festa que abre um álbum compartilhado do Google Fotos ou do iCloud deixa todo mundo adicionar as fotos que tirou. Cada finalidade precisa do próprio código, porque um código abre um endereço.",
        "Os códigos feitos aqui são estáticos: o link fica gravado na imagem e nunca expira, então vai abrir daqui a anos se a página ainda estiver no ar. O outro lado disso é que o link não pode ser trocado depois da impressão. Defina os endereços do site, do formulário e do álbum antes de mandar os convites para a gráfica.",
      ],
      usesTitle: "Onde ajuda",
      uses: [
        "O verso do convite ou um cartão extra leva à confirmação de presença, e as respostas chegam em um só lugar em vez de por WhatsApp, e-mail e telefone.",
        "Um save the date ou cartão de informações abre o site do casamento, com a lista de presentes, hospedagem e traje.",
        "Um cartão de como chegar ou a placa de boas-vindas abre o mapa de um local difícil de achar, como um sítio ou uma fazenda em estrada de terra.",
        "Cartões nas mesas da festa abrem um álbum de fotos compartilhado, para os convidados enviarem as fotos antes de esquecer.",
      ],
      tipsTitle: "Dicas antes de imprimir",
      tips: [
        "Em um convite, cerca de 2 a 2,5 cm é confortável para um celular na mão. Um link mais curto gera um desenho mais simples, que imprime melhor nesse tamanho.",
        "Tinta escura em papel creme, marfim ou kraft costuma funcionar bem; hot stamping dourado, tinta em tom pastel e cinza-claro muitas vezes não. Escolha uma cor escura em Estilo e teste uma prova impressa no papel de verdade.",
        "Deixe a zona de silêncio, a margem vazia ao redor do código, livre de arabescos, molduras e ilustrações. Os leitores precisam dela para encontrar o código.",
        "Confira o compartilhamento: o álbum precisa deixar os convidados adicionarem fotos, e o formulário precisa estar aberto para qualquer pessoa com o link, não só para a sua conta.",
        "Antes de pedir a tiragem completa, escaneie uma prova com um iPhone e um Android, envie uma confirmação de teste e peça para um amigo subir uma foto no álbum.",
      ],
    },
    faq: [
      {
        q: "Posso mudar para onde o código leva depois de imprimir os convites?",
        a: "O código em si, não, porque é estático. Mas você ainda pode editar o que a página mostra, então atualize o site ou o formulário em vez de trocar o link.",
      },
      {
        q: "O código continua funcionando depois do casamento?",
        a: "O código não tem data de validade. Ele funciona enquanto o site, o formulário ou o álbum do link estiverem no ar, então os convidados podem rever as fotos depois se você mantiver o álbum compartilhado.",
      },
      {
        q: "Cada convidado pode ter um código de confirmação próprio?",
        a: "Se o seu serviço de confirmação gerar um link para cada convidado, você pode transformar a lista em códigos na página Em lote, até 200 de uma vez, em um ZIP de arquivos PNG.",
      },
      {
        q: "Mando PNG ou SVG para a gráfica?",
        a: "Mande o arquivo SVG para a gráfica ou para o designer. É vetorial, então fica nítido em qualquer tamanho. O PNG serve para o site do casamento ou para mandar aos convidados.",
      },
    ],
  },

  business_card: {
    title: "QR Code para Cartão de Visita",
    subtitle: "Coloque no seu cartão de visita um contato que salva seus dados no celular em uma leitura.",
    metaTitle: "QR Code para Cartão de Visita — Grátis, sem cadastro",
    metaDescription:
      "Crie um QR Code para cartão de visita que salva nome, telefone, e-mail e site nos contatos do celular. vCard 3.0, estático e nunca expira. Grátis, sem cadastro.",
    sections: {
      howTitle: "Como funciona o QR Code de cartão de visita",
      how: [
        "Um código de cartão de visita feito aqui guarda um contato no formato vCard 3.0, que as agendas dos celulares leem. Quando alguém escaneia, o celular mostra seu nome, empresa, telefone e e-mail em uma prévia, e um toque adiciona. Nada precisa carregar, então funciona até em um pavilhão de feira com sinal ruim, e seu nome fica salvo exatamente como você escreve.",
        "A alternativa é um código que leva a um perfil, como seu site ou seu LinkedIn. Um link mostra mais coisas e a página pode ser atualizada sem reimprimir, mas a pessoa ainda tem que salvar seu número sozinha. O código de contato faz isso por ela. Muita gente usa os dois: o código de contato no verso e um endereço curto do site impresso em texto.",
        "Cada campo preenchido fica gravado na imagem, então o código cresce com a informação. Um cartão com nome, empresa, celular, e-mail e site continua compacto; incluir endereço completo e uma observação deixa o desenho mais denso e mais difícil de ler no tamanho de um cartão de visita.",
      ],
      usesTitle: "Onde ajuda",
      uses: [
        "Eventos de networking e feiras, onde você entrega dezenas de cartões e quer que cada um vá parar no celular, não na gaveta.",
        "Autônomos e consultores que encontram clientes pessoalmente e querem o e-mail e o número certos salvos, não adivinhados a partir da foto do cartão.",
        "Os cartões de uma equipe de vendas, em que cada pessoa tem um código com o próprio telefone direto.",
        "Um cartão na recepção que salva o contato geral da empresa para os visitantes.",
      ],
      tipsTitle: "Dicas antes de imprimir",
      tips: [
        "Em um cartão padrão de 9 × 5 cm, imprima o código com pelo menos 2 cm de largura e uma margem livre ao redor. Se ele tiver o verso só para ele, 2,5 a 3 cm é mais confortável.",
        "Fique nos campos que as pessoas precisam: nome, empresa, celular, e-mail e site. Deixe endereço e observação vazios, a não ser que importem.",
        "Escreva os números com o código do país, como +55 11 91234-5678, para funcionarem também para contatos do exterior.",
        "A página Em lote faz códigos de link e de texto, não cartões de contato. Para uma equipe, crie o código de cada pessoa nesta página e salve o arquivo SVG para cada arte de cartão.",
        "Escaneie uma prova impressa com um iPhone e um Android e confira se nome, número e e-mail caem nos campos certos.",
      ],
    },
    faq: [
      {
        q: "O que acontece quando meu número ou cargo mudar?",
        a: "Os dados ficam fixos dentro do código. Crie um código novo e reimprima os cartões, como faria com o texto impresso.",
      },
      {
        q: "Uso um código de contato ou um link para o meu site?",
        a: "O código de contato salva seus dados direto e funciona sem internet. Um link pode levar a uma página que você atualiza depois. Se seus dados mudam pouco, o código de contato é a escolha mais útil em um cartão.",
      },
      {
        q: "Posso colocar meu logo?",
        a: "No contato em si, não, mas você pode colocar um logo pequeno no meio do código em Estilo. A correção de erros sobe automaticamente para o máximo, e o código continua sendo lido.",
      },
      {
        q: "A pessoa pode editar o contato antes de salvar?",
        a: "Sim. O celular mostra uma prévia, e a pessoa pode revisar e alterar os dados antes de adicionar.",
      },
    ],
  },

  google_review: {
    title: "QR Code para Avaliações no Google",
    subtitle: "Crie um código que abre o formulário de avaliação do Google do seu negócio, pronto para o balcão e a nota fiscal.",
    metaTitle: "QR Code para Avaliação no Google — Grátis, sem cadastro",
    metaDescription:
      "Crie um QR Code que abre o formulário de avaliação do Google do seu negócio a partir do Place ID ou do link de avaliação. Para balcão, cupons e cartões. Grátis.",
    sections: {
      howTitle: "Como funciona o QR Code de avaliação no Google",
      how: [
        "O código abre direto o formulário de avaliação do Google para o seu negócio, e o cliente não precisa buscar seu nome, escolher o perfil certo e procurar o botão de avaliar. Com a plataforma Google Review selecionada, você informa seu Place ID e o código passa a conter `https://search.google.com/local/writereview?placeid=ChIJ…`, com o seu ID no lugar dos pontinhos.",
        "Há duas formas de preencher o campo. A primeira é o Place ID: procure seu negócio no Place ID Finder do Google, que faz parte da documentação da Google Maps Platform, e copie o ID, que geralmente começa com ChIJ. A segunda é o link de avaliação do seu Perfil da Empresa no Google: abra o perfil, escolha a opção de pedir avaliações e copie o link curto que aparece. Um link completo começando com https:// é aceito como está.",
        "Na leitura, o celular abre o formulário no Google Maps ou no navegador. O cliente precisa estar logado em uma conta Google para publicar, e ele mesmo escolhe as estrelas e escreve a avaliação. O código é estático e contém só um link público, então funciona enquanto o seu perfil existir.",
      ],
      usesTitle: "Onde ajuda",
      uses: [
        "Um cartãozinho perto do caixa, onde o cliente tem um momento enquanto paga.",
        "O rodapé do cupom ou da nota impressa, que vai para casa com o cliente.",
        "Um cartão de agradecimento deixado depois de uma entrega, uma hospedagem ou um serviço, quando o trabalho já foi concluído.",
        "Um cartaz A4 perto da saída feito com a Folha para impressão / PDF, com um título curto que você pode editar.",
      ],
      tipsTitle: "Dicas antes de imprimir",
      tips: [
        "Escaneie o código você mesmo e confira se o formulário mostra o nome do seu negócio. Negócios com nomes parecidos na mesma cidade são fáceis de confundir no Place ID Finder.",
        "Peça com palavras simples, como “Conte no Google como foi seu atendimento”, e coloque o código onde as pessoas têm um tempinho livre, não onde saem correndo.",
        "As políticas do Google não permitem descontos, brindes ou outros incentivos em troca de avaliações, então mantenha o cartão como um pedido simples.",
        "Peça a todos os clientes da mesma forma. O Google também proíbe a seleção de avaliações (review gating): convidar só clientes satisfeitos ou mandar os insatisfeitos para outro lugar primeiro.",
      ],
    },
    faq: [
      {
        q: "Onde encontro meu Place ID?",
        a: "Use o Place ID Finder na documentação do Google Maps: procure seu negócio e copie o ID mostrado. Outra opção é colar no campo o link de avaliação do seu Perfil da Empresa no Google.",
      },
      {
        q: "O cliente precisa de conta Google?",
        a: "Sim. Para publicar uma avaliação no Google é preciso entrar em uma conta Google. Quem não tem conta ainda consegue ver o seu perfil.",
      },
      {
        q: "Posso oferecer desconto em troca de avaliação?",
        a: "Não. As políticas do Google proíbem incentivos para avaliações, incluindo descontos e brindes. Um pedido educado em um cartão não tem problema.",
      },
      {
        q: "O código quebra se eu mudar o nome do negócio?",
        a: "Normalmente não, porque o Place ID se refere ao perfil, não ao nome. O Google avisa que o Place ID pode mudar em alguns casos, como quando perfis são mesclados, então escaneie o código de novo depois de grandes mudanças no perfil.",
      },
    ],
  },

  wifi_cafe: {
    title: "QR Code de Wi-Fi para Cafés, Hotéis e Aluguéis",
    subtitle: "Deixe os clientes entrarem na rede de visitantes com uma leitura, pelo display de mesa, pelo cartão do quarto ou na porta do imóvel.",
    metaTitle: "QR Code de Wi-Fi para Cafés, Hotéis e Airbnb — Grátis, sem cadastro",
    metaDescription:
      "Crie um QR Code para Wi-Fi para sua cafeteria, pousada, hotel ou imóvel de temporada. O cliente conecta com uma leitura no iPhone ou Android. Grátis, sem cadastro.",
    sections: {
      howTitle: "Como funciona o QR Code de Wi-Fi para clientes",
      how: [
        "Em muitas cafeterias, a pergunta mais repetida no balcão é a senha do Wi-Fi. Um código de Wi-Fi responde no papel: ele guarda o nome da rede, a senha e o tipo de segurança em um formato curto, como `WIFI:T:WPA;S:Cafe-Guest;P:espresso-2026;;`, e a câmera do celular transforma isso em uma opção de “Conectar à rede”. O cliente não digita nada, então não há erro com letra maiúscula ou com um zero parecido com a letra O.",
        "Antes de criar o código, configure uma rede de visitantes separada, se o seu roteador ou pontos de acesso permitirem. A senha fica no código de forma legível, e qualquer pessoa que fotografar um display de mesa pode lê-la. Uma rede de visitantes mantém a maquininha de cartão, o computador do escritório e as câmeras de segurança em uma rede que os clientes não alcançam.",
        "O código é estático, então a senha fica fixa nele. Se você muda a senha de visitantes todo mês ou a cada hóspede, imprima códigos novos ao mesmo tempo. Redes de hotel com página de login ou de termos de uso (o chamado portal cativo) ainda mostram essa página depois que o celular conecta; o código entra na rede, mas não faz o login.",
      ],
      usesTitle: "Onde ajuda",
      uses: [
        "Displays de mesa em cafeterias, padarias e restaurantes, para o cliente conectar enquanto espera o pedido.",
        "Um cartão em cada quarto de hotel ou pousada, ou na capinha do cartão-chave, ao lado do horário do check-out e do café da manhã.",
        "Um código emoldurado atrás da porta de um imóvel de temporada (Airbnb) ou no manual da casa, para hóspedes que chegam tarde quando o anfitrião não está.",
        "Uma mesa de coworking, sala de espera ou cadeira de salão, onde o visitante fica tempo suficiente para querer conexão.",
      ],
      tipsTitle: "Dicas antes de imprimir",
      tips: [
        "A Folha para impressão / PDF gera uma placa A4 com o título “Conecte-se ao Wi-Fi” e o nome da rede, para quem não consegue escanear saber qual rede escolher. Você pode adicionar um subtítulo como “Peça ajuda à equipe”.",
        "Digite o nome da rede exatamente como ele aparece, com maiúsculas e finais como _5G.",
        "Quando trocar a senha, substitua todos os códigos impressos no mesmo dia. Um código antigo ainda mostra a opção de conectar, mas falha, e para o cliente parece que a rede está com defeito.",
        "Teste o código impresso em um iPhone e em um Android a partir de onde os clientes realmente se sentam, com a iluminação real do lugar.",
      ],
    },
    faq: [
      {
        q: "É seguro deixar a senha do Wi-Fi na mesa?",
        a: "Qualquer pessoa que escanear ou fotografar o código consegue ler a senha, então use uma rede de visitantes separada da rede que os sistemas do seu negócio usam.",
      },
      {
        q: "Preciso reimprimir quando mudar a senha?",
        a: "Sim. A senha fica gravada no próprio código, então cada troca de senha exige um código novo e novas impressões.",
      },
      {
        q: "Funciona com a página de login do hotel?",
        a: "O código conecta o celular à rede. Se a rede depois mostrar uma página de login ou de termos, o hóspede ainda precisa preenchê-la à mão.",
      },
      {
        q: "Posso criar um código para cada quarto, com senha própria?",
        a: "Sim, um de cada vez nesta página. A página Em lote foi feita para listas de links e textos e não tem campos de Wi-Fi.",
      },
    ],
  },

  with_logo: {
    title: "Gerador de QR Code com Logo",
    subtitle: "Coloque seu logo no meio de um QR Code que continua sendo lido e baixe em PNG ou SVG.",
    metaTitle: "Gerador de QR Code com Logo — Grátis, sem cadastro",
    metaDescription:
      "Adicione seu logo ao centro de um QR Code sem perder a leitura. Envie PNG, JPG, SVG ou WEBP, escolha as cores e baixe em PNG ou SVG para impressão. Grátis, sem cadastro.",
    sections: {
      howTitle: "Como funciona um QR Code com logo",
      how: [
        "Um QR Code sobrevive a danos porque carrega correção de erros: dados extras que permitem ao leitor reconstruir os quadradinhos que ele não consegue ver. Um logo no meio é um dano de propósito. Quando você envia um aqui, a correção de erros passa para Máxima (nível H), que tolera cerca de 30% dos módulos cobertos, e a opção fica travada enquanto o logo estiver lá. Remova o logo e você pode voltar ao nível anterior.",
        "A seção Estilo já abre nesta página, com o campo do logo pronto. Arraste um PNG, JPG, SVG ou WEBP de até 1 MB, ou escolha um arquivo. O logo fica sobre uma pequena placa arredondada na cor do fundo e ocupa uma fração fixa da largura do código, cerca de um quinto, então nunca cobre os três quadrados dos cantos que os leitores usam para localizar o código.",
        "A prévia é atualizada enquanto você trabalha, então dá para testar uma cor da marca nos módulos ao mesmo tempo. O código continua estático: o logo é desenhado na imagem, e o conteúdo continua sendo o link que você digitou. Baixe em PNG para telas e documentos, ou em SVG para arquivos de impressão, em que o logo vai embutido no arquivo vetorial e aumenta de tamanho sem ficar borrado.",
      ],
      usesTitle: "Onde ajuda",
      uses: [
        "Embalagens e etiquetas, em que um código preto simples parece um código de barras e um código com a marca parece parte do design.",
        "Cartões de visita e folhetos, para o código do seu site ou perfil combinar com o resto do cartão.",
        "Cartazes e vitrines, onde as pessoas decidem em um segundo se vale a pena escanear.",
        "Imagens para redes sociais e slides de apresentação, em que o logo diz de quem é o link antes mesmo da leitura.",
      ],
      tipsTitle: "Dicas antes de imprimir",
      tips: [
        "A correção de erros máxima coloca mais módulos no mesmo espaço, então mantenha o conteúdo curto. Um link longo de rastreamento deixa os módulos minúsculos e dificulta a leitura ao redor do logo; um endereço curto é lido melhor.",
        "Use um logo com fundo sólido ou de forma simples. Linhas finas e textos minúsculos viram um borrão no tamanho que um código permite.",
        "Mantenha os módulos escuros e o fundo claro. O aviso de cor na seção Estilo mostra quando o contraste fica baixo demais para a câmera do celular.",
        "Escaneie o arquivo final em um iPhone e em um Android, no tamanho impresso e a uma distância normal, antes de mandar imprimir a tiragem.",
      ],
    },
    faq: [
      {
        q: "Por que a opção de correção de erros trava quando adiciono o logo?",
        a: "O logo esconde parte do código, e só o nível Máximo (H) consegue reconstruir tanto assim. A opção destrava quando você remove o logo.",
      },
      {
        q: "Qual o tamanho máximo do logo?",
        a: "O arquivo pode ter até 1 MB. No código, o logo ocupa uma fração fixa da largura, cerca de um quinto, o que o mantém dentro do que a correção de erros máxima consegue recuperar.",
      },
      {
        q: "O logo muda o conteúdo do código?",
        a: "Não. O conteúdo continua sendo o link ou texto que você digitou. O logo só é desenhado por cima da imagem que você baixa.",
      },
      {
        q: "Baixo em PNG ou SVG?",
        a: "PNG para sites, documentos e mensagens. SVG para gráficas e programas de design, porque aumenta de tamanho sem ficar borrado.",
      },
    ],
  },

  instagram: {
    title: "Gerador de QR Code do Instagram",
    subtitle: "Transforme seu @ do Instagram em um código que abre seu perfil, para cartões, cardápios e vitrines.",
    metaTitle: "Gerador de QR Code do Instagram — Grátis, sem cadastro",
    metaDescription:
      "Crie um QR Code do Instagram a partir do seu @usuario. Abre instagram.com/seunome em qualquer celular. Baixe em PNG ou SVG para cartões e placas. Grátis, sem cadastro.",
    sections: {
      howTitle: "Como funciona o QR Code do Instagram",
      how: [
        "O Instagram já vem selecionado nesta página, então você só digita seu nome de usuário. Escreva `@seunome` ou `seunome`; o @ do começo é removido, espaços e barras são descartados, e o código guarda o endereço público do perfil `https://www.instagram.com/seunome/`. Colar o link completo do perfil, começando com https://, também é aceito como está, então um link copiado do app funciona.",
        "Na leitura, o celular mostra o endereço e abre. Se o app do Instagram estiver instalado, o sistema normalmente passa o link para o app e cai no seu perfil com o botão Seguir à vista. Sem o app, o perfil abre no navegador, onde os visitantes ainda veem as publicações e a sua bio.",
        "O código é estático: contém só o endereço, nada fica guardado neste site para ele funcionar, e ele nunca expira. Se você renomear a conta, instagram.com/seunome muda junto e os códigos impressos param de funcionar, então escolha um @ que pretende manter antes de imprimir.",
      ],
      usesTitle: "Onde ajuda",
      uses: [
        "Cartões de visita de fotógrafos, cabeleireiros, artesãos e de todo mundo cujo portfólio mora no Instagram.",
        "Displays de mesa e o verso do cardápio, convidando os clientes a marcar o restaurante nas fotos.",
        "Vitrines, embalagens e cartões de agradecimento nos pedidos on-line, transformando compradores em seguidores.",
        "Sinalização de eventos e painéis de fotos, onde os convidados querem achar a conta oficial rápido.",
      ],
      tipsTitle: "Dicas antes de imprimir",
      tips: [
        "Escaneie você mesmo e confira se cai no seu perfil, e não em um @ parecido. Uma letra faltando leva à conta de outra pessoa ou a uma página de erro.",
        "Aponte o código para o perfil, não para uma publicação. Publicações envelhecem; o perfil guarda todas as novas.",
        "Acrescente uma linha curta embaixo do código, como “Siga a gente no Instagram”, e o seu @ por escrito, para quem prefere pesquisar.",
        "Faça o código com pelo menos 2 cm de largura em um cartão, e maior em placas lidas de longe. A Folha para impressão / PDF gera uma versão A4 com título.",
      ],
    },
    faq: [
      {
        q: "Digito meu usuário com ou sem o @?",
        a: "Tanto faz. O @ é removido e o código contém instagram.com/seunome.",
      },
      {
        q: "O código abre direto no app do Instagram?",
        a: "O código guarda um endereço web normal. Celulares com o app instalado geralmente abrem nele; os outros usam o navegador.",
      },
      {
        q: "O que acontece se eu mudar meu nome de usuário?",
        a: "O código continua apontando para o endereço antigo, que deixa de funcionar. Gere um código novo e reimprima.",
      },
      {
        q: "Posso apontar para uma publicação ou reel em vez do perfil?",
        a: "Sim. Copie o link de compartilhamento da publicação e cole o endereço https:// completo no campo. Para material impresso, o perfil é a escolha mais segura.",
      },
    ],
  },

  youtube: {
    title: "Gerador de QR Code do YouTube",
    subtitle: "Gere um código que abre seu canal do YouTube a partir do seu @identificador, para embalagens, cartazes e cartões.",
    metaTitle: "Gerador de QR Code do YouTube — Grátis, sem cadastro",
    metaDescription:
      "Crie um QR Code do YouTube para o seu canal a partir do @identificador, ou cole o link de um vídeo ou playlist. Abre no app do YouTube. Baixe em PNG ou SVG. Grátis, sem cadastro.",
    sections: {
      howTitle: "Como funciona o QR Code do YouTube",
      how: [
        "O YouTube já vem selecionado nesta página. Digite o identificador do seu canal, com ou sem o @, e o código guarda o endereço do canal `https://www.youtube.com/@seucanal`. Identificadores são os nomes curtos que o YouTube dá a todo canal, mostrados abaixo do nome do canal e na URL dele. Se não tiver certeza do seu, abra seu canal no app e copie da página.",
        "Você também pode colar um link completo que comece com https://, e ele é usado sem alteração. É assim que se aponta um código para um único vídeo, uma playlist ou uma transmissão ao vivo: copie o link de Compartilhar no YouTube e cole no campo. Um link curto youtu.be também funciona.",
        "Na leitura, o celular abre o endereço e, quando o app do YouTube está instalado, ele normalmente assume e mostra o canal com o botão Inscrever-se, ou inicia o vídeo. O código é estático e guarda só o endereço, então continua funcionando enquanto o canal ou o vídeo existir.",
      ],
      usesTitle: "Onde ajuda",
      uses: [
        "Embalagens e manuais de produto, apontando para um vídeo de unboxing ou de instalação em vez de um guia impresso.",
        "Cartazes e panfletos de músicos, igrejas, escolas e clubes, levando a um canal ou a um evento gravado.",
        "Cartões de visita de criadores de conteúdo e instrutores cujo trabalho é mais fácil de mostrar do que de descrever.",
        "Apostilas de aula e slides de oficinas, em que uma playlist reúne as lições em ordem.",
      ],
      tipsTitle: "Dicas antes de imprimir",
      tips: [
        "Aponte códigos impressos para o canal ou para uma playlist, e não para um vídeo só, a menos que o vídeo seja o produto. Canais duram mais que uploads isolados.",
        "Se o link for de um vídeo, abra o link de Compartilhar em um celular antes e confira se ele é público, não “não listado” ou privado, e se começa onde você espera.",
        "Acrescente uma linha embaixo do código dizendo o que a pessoa vai ver, como “Assista ao vídeo de instalação (2 min)”. As pessoas escaneiam quando sabem o que vão ganhar.",
        "Mantenha o código com pelo menos 2 cm de largura e teste em um iPhone e em um Android a partir de onde as pessoas vão ficar.",
      ],
    },
    faq: [
      {
        q: "Onde encontro o identificador do meu canal?",
        a: "Abra a página do seu canal; o identificador começa com @ e aparece abaixo do nome do canal e na barra de endereço. Digite com ou sem o @.",
      },
      {
        q: "O código pode abrir um vídeo ou uma playlist específica?",
        a: "Sim. Use o botão Compartilhar no vídeo ou na playlist, copie o link e cole o endereço https:// completo no campo.",
      },
      {
        q: "Abre no app do YouTube?",
        a: "O código guarda um endereço web normal. Celulares com o app instalado geralmente abrem nele; os outros reproduzem no navegador.",
      },
      {
        q: "O código quebra se eu renomear o canal?",
        a: "Mudar o nome do canal não tem problema; mudar o identificador muda o endereço, então gere um código novo e reimprima.",
      },
    ],
  },

  bulk: {
    title: "Gerador de QR Code em Lote",
    subtitle: "Cole uma lista de links ou textos e baixe todos os códigos de uma vez em um ZIP com índice.",
    metaTitle: "Gerador de QR Code em Lote — Grátis, sem cadastro",
    metaDescription:
      "Gere até 200 QR Codes de uma vez a partir de uma lista colada ou de colunas de planilha. Baixe um ZIP com PNGs numerados e um index.csv. Roda no seu navegador. Grátis, sem cadastro.",
    sections: {
      howTitle: "Como funciona a geração de QR Code em lote",
      how: [
        "A ferramenta acima recebe uma lista em vez de um único link. Digite uma entrada por linha, ou copie duas colunas do Excel ou do Google Planilhas, nome e link, e cole na tabela; o Tab entre as células separa cada linha em nome e conteúdo, e se o link estiver na primeira coluna os dois são trocados de lugar para você. Uma coluna só também funciona e preenche as células de conteúdo. A lista aceita até 200 linhas por download.",
        "Cada linha é verificada separadamente. Tudo que tem cara de endereço web, como `https://example.com/cardapio` ou `loja.example.com`, vira link, e o resto é guardado como texto simples, então uma lista pode misturar os dois. Uma etiqueta ao lado da linha mostra qual é o caso, e uma prévia aparece assim que a linha fica válida. Linhas com problema são marcadas, por exemplo um texto longo demais para um QR Code ou um endereço com esquema bloqueado, e as demais ainda podem ser baixadas.",
        "O download entrega o arquivo `qr-codes.zip`. Dentro estão PNGs numerados com os seus nomes, como `001-cardapio-mesa-1.png`, ou só `001.png` para linhas sem nome, mais um `index.csv` com as colunas file, name e content, para você saber qual arquivo guarda qual link. Tudo é gerado no seu navegador; no download, só a quantidade e uma amostra curta das primeiras linhas são registradas, nunca a lista inteira.",
      ],
      usesTitle: "Onde ajuda",
      uses: [
        "Mesas numeradas em um restaurante ou evento, cada código abrindo o mesmo cardápio ou um link de pedido específico da mesa.",
        "Etiquetas de patrimônio para equipamentos, salas ou prateleiras, em que cada código leva um ID ou uma página de inventário.",
        "Crachás e ingressos de um congresso, um link de perfil ou de check-in por participante.",
        "Etiquetas de produto, em que cada item do catálogo tem a própria página ou link de suporte.",
      ],
      tipsTitle: "Dicas antes de imprimir",
      tips: [
        "Preencha a coluna de nome. Os nomes viram os nomes dos arquivos e o índice, o que poupa muita conferência na hora de colocar duzentos códigos em um layout.",
        "Os nomes são adaptados para nome de arquivo: espaços e símbolos viram hifens, e o que passar de 40 caracteres é cortado, então mantenha-os curtos e distintos.",
        "Escolha o tamanho de saída antes de baixar. 512 px serve para etiquetas e cartões; 1024 px é melhor para cartazes e arquivos que serão ampliados.",
        "Confira alguns PNGs do começo, do meio e do fim do ZIP em um celular antes de imprimir, e guarde o index.csv junto das imagens.",
      ],
    },
    faq: [
      {
        q: "Quantos códigos posso gerar de uma vez?",
        a: "Até 200 por download. Para listas maiores, divida e baixe em partes; a numeração recomeça em 001 em cada ZIP.",
      },
      {
        q: "Posso colar do Excel ou do Google Planilhas?",
        a: "Sim. Copie duas colunas, nome e link, e cole na tabela. Cada linha da planilha vira uma linha com os campos no lugar certo; uma coluna só também funciona.",
      },
      {
        q: "O que vem no ZIP?",
        a: "Um PNG por linha válida, nomeado 001-nome.png em ordem, e um index.csv listando file, name e content de cada um.",
      },
      {
        q: "Posso gerar Wi-Fi, vCard ou outros formatos em lote?",
        a: "Não. A ferramenta em lote trata links e texto simples. Os outros formatos são feitos um por vez nas próprias páginas.",
      },
    ],
  },
};
