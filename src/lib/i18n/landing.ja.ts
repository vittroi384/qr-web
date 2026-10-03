import type { QrType } from "@/lib/qr/types";
import type { LandingCopy, UseCaseId } from "./index";

/** Japanese long-form copy for the per-type landing pages (/ja/wifi-qr-code, …). */
export const landingJa: Record<QrType, LandingCopy> = {
  url: {
    title: "URL QRコード作成",
    subtitle: "WebサイトのアドレスをQRコードに。読み取るだけでページが開きます。",
    metaTitle: "URL QRコード作成 — 無料・登録不要",
    metaDescription:
      "WebページのURLからQRコードを無料で作成。有効期限のない静的QRコードをブラウザ上で作れます。PNG・SVGで保存、A4の印刷用シートにも対応。登録不要です。",
    sections: {
      howTitle: "URL QRコードのしくみ",
      how: [
        "QRコードには、Webアドレスそのものが1文字ずつそのまま入ります。example.com/menu と入力すると https:// が自動で付き、コードの中身は https://example.com/menu になります。スマホのカメラを向けるとリンクとして認識され、ブラウザで開くよう案内が出ます。間に転送サービスは挟まらず、維持しなければならないアカウントもありません。",
        "iPhoneでは標準のカメラアプリにアドレス付きのバナーが表示され、タップするとSafariで開きます。多くのAndroidスマホでも、カメラアプリやGoogleレンズで同じように開けます。開く前にアドレスが表示されるので、長い計測用パラメータの付いたURLより、短くて見覚えのあるドメインのほうが安心してもらえます。",
        "アドレスが長いほど、QRコードのマス目は細かくなります。30文字ほどのリンクなら粗くて読み取りやすい模様に、パラメータの多い300文字のリンクなら細かい模様になり、大きく印刷する必要があります。javascript: や data: で始まるリンクは、読み取り時にプログラムが実行されないよう作成できません。",
      ],
      usesTitle: "こんな場面で便利です",
      uses: [
        "飲食店がテーブルの卓上POPに印刷すれば、紙のメニューを待たなくてもお客様がスマホでメニューページを開けます。",
        "店頭のガラスに貼っておけば、閉店後に通りかかった人も営業時間やネット注文のページを確認できます。",
        "商品ラベルから設定ガイドや保証のページにリンクすれば、紙の説明書を短くできます。",
        "セミナーの最後のスライドに載せれば、参加者が画面のURLを書き写さずに資料を開けます。",
        "チラシやショップカードに載せて、予約ページやオンラインショップに案内できます。",
      ],
      tipsTitle: "印刷前のポイント",
      tips: [
        "静的QRコードなので、アドレスが変わると作り直しが必要です。yourdomain.com/menu のように自分で管理できるページにリンクしておけば、印刷し直さずにページの中身だけを変えられます。",
        "不要な計測用パラメータは削りましょう。リンクが短いほど模様がすっきりし、離れた場所からでも速く読み取れます。",
        "目安として、QRコードの幅は読み取る距離の10分の1以上にします。手に持って読むものなら約2cm、3m先から読むポスターなら約30cmです。",
        "保存したら、自分のスマホでリンクを開いて確認しましょう。印刷したQRコードが使えない原因で一番多いのは、アドレスの打ち間違いです。",
      ],
    },
    faq: [
      {
        q: "URLのQRコードに有効期限はありますか？",
        a: "ありません。アドレスは画像の中に入っているので、リンク先のページが公開されている限り使えます。このサイトがなくなっても動作します。",
      },
      {
        q: "印刷した後にリンク先を変えられますか？",
        a: "静的QRコードなので、コードの中身は変えられません。ただし、リンク先ページの内容を変えたり、自分のWebサイトで転送を設定したりすることはできます。",
      },
      {
        q: "https:// は入力する必要がありますか？",
        a: "不要です。省略すると https:// が自動で付きます。サイトがHTTPSに対応していない場合のみ、http:// を明示して入力してください。",
      },
      {
        q: "何人が読み取ったか分かりますか？",
        a: "このサイトでは分かりません。QRコードはページを直接開くので、読み取り数はご自身のサイトのアクセス解析で確認します。リンクに ?utm_source=poster のようなパラメータを付けておくと、QRコード経由のアクセスを区別できます。",
      },
    ],
  },

  social: {
    title: "SNS QRコード作成（LINE・Instagram対応）",
    subtitle: "ユーザー名を入力するだけで、LINE、Instagram、TikTok、YouTubeなどのプロフィールを開くQRコードが作れます。",
    metaTitle: "SNS QRコード作成（LINE・Instagram対応） — 無料・登録不要",
    metaDescription:
      "LINE、Instagram、TikTok、YouTube、X、lit.linkなどのプロフィールQRコードをユーザー名から無料で作成。有効期限なしの静的QRコードで、登録も不要です。",
    sections: {
      howTitle: "SNS QRコードのしくみ",
      how: [
        "サービスを選んでユーザー名を入力すると、標準的なプロフィールのアドレスが自動で作られます。たとえばInstagramの @harborbakery は https://www.instagram.com/harborbakery/ に、YouTubeのハンドルは https://www.youtube.com/@channel に、LINE公式アカウントのID @line-id は https://line.me/R/ti/p/@line-id になります。アドレスに @ を使わないサービスでは先頭の @ を外し、スペースやスラッシュも取り除きます。",
        "プロフィールのリンクがすでに手元にあるなら、そのまま貼り付ければサービスを自動で判別します。読み取ると、スマホには普通の https リンクとして認識されます。アプリが入っていればiOSでもAndroidでもたいていアプリでプロフィールが開き、入っていなければブラウザで開きます。",
        "名前ではなくコードを使うサービスもあります。Discordは招待コード、GoogleクチコミはプレイスID、Spotifyはアーティストのコードが必要です。何を入力すればいいかは、各入力欄の薄い文字の例をご覧ください。",
      ],
      usesTitle: "こんな場面で便利です",
      uses: [
        "カフェがレシートにLINE公式アカウントのQRコードを載せれば、お客様が検索せずに友だち追加できます。",
        "Instagramのコードをショップカードに印刷すれば、似た名前のアカウントと間違われずにフォローしてもらえます。",
        "ミュージシャンが物販テーブルにSpotifyのコード、チラシにリンクまとめページのコードを置けます。",
        "お店のレジ横にGoogleクチコミのコードを置けば、投稿画面が直接開きます。",
        "就職活動中の人が、履歴書や名札にLinkedInのコードを印刷できます。",
      ],
      tipsTitle: "印刷前のポイント",
      tips: [
        "保存する前に、結果欄のリンクを開いてユーザー名を確認しましょう。1文字違うだけで、他人のアカウントにつながってしまいます。",
        "Discordでは期限なしの招待を作ってください。初期設定の招待は7日で切れ、印刷したQRコードも一緒に使えなくなります。",
        "アカウント名を変える可能性があるなら、プロフィールに直接リンクするより、リンクまとめページや自社サイトへのコードのほうが変更に強いです。",
        "QRコードの横にLINEやInstagramなどのサービス名やロゴを添えて、読み取る前に何が開くか分かるようにしましょう。",
      ],
    },
    faq: [
      {
        q: "アプリとWebサイト、どちらで開きますか？",
        a: "QRコードには普通のプロフィールリンクが入っています。たいていのスマホでは、アプリが入っていればアプリで、なければブラウザで開きます。",
      },
      {
        q: "LINEの友だち追加用QRコードも作れますか？",
        a: "作れます。サービスでLINEを選び、LINE公式アカウントのID（@から始まるもの）を入力してください。読み取ると友だち追加の画面が開きます。",
      },
      {
        q: "ユーザー名を変えたらどうなりますか？",
        a: "QRコードは古いアドレスのままなので、つながらなくなったり、後で別の人のアカウントになったりする可能性があります。名前を変えたら新しく作り直してください。",
      },
      {
        q: "1つのQRコードに複数のプロフィールを入れられますか？",
        a: "できません。1つのQRコードで開けるアドレスは1つです。lit.linkやLinktreeのようなリンクまとめページを作り、そのページのQRコードを作ってください。",
      },
      {
        q: "GoogleのプレイスIDはどこで調べられますか？",
        a: "Google Mapsのドキュメントにある「Place ID Finder」でお店を検索し、ChIJで始まるIDをコピーしてください。",
      },
    ],
  },

  whatsapp: {
    title: "WhatsApp QRコード作成",
    subtitle: "読み取るだけでWhatsAppのチャットが始まるQRコード。送信用のメッセージも入れておけます。",
    metaTitle: "WhatsApp QRコード作成 — 無料・登録不要",
    metaDescription:
      "あなたの番号とのWhatsAppチャットを、メッセージ入力済みで開くQRコードを無料で作成。iPhone・Android対応、有効期限なし、登録不要。海外のお客様対応に。",
    sections: {
      howTitle: "WhatsApp QRコードのしくみ",
      how: [
        "WhatsApp公式の「クリックでチャット」リンクを使います。電話番号はプラス記号・スペース・先頭の0を除いた数字だけになり、メッセージはURLエンコードされて付きます。例：https://wa.me/819012345678?text=%E4%BA%88%E7%B4%84%E3%81%97%E3%81%9F%E3%81%84%E3%81%A7%E3%81%99",
        "読み取るとWhatsAppが起動し、あなたの番号とのチャットが入力欄にメッセージが入った状態で開きます。送信ボタンを押すまで何も送られないので、相手は内容を直してから送れます。WhatsAppが入っていない場合は、ダウンロードやWhatsApp Webの利用を案内するページが開きます。",
        "wa.me は国を推測できないため、番号には国番号が必要です。7〜15桁の数字に対応しており、海外の番号も使えます。WhatsApp Businessのアカウントも個人アカウントと同じように使えます。日本国内のお客様が中心なら、LINE公式アカウントのQRコード（SNSリンク）も検討してください。",
      ],
      usesTitle: "こんな場面で便利です",
      uses: [
        "美容室が名刺に「予約をお願いします」というメッセージ付きのコードを印刷すれば、予約の連絡が同じ形で届きます。",
        "ネットショップが納品書にコードを載せれば、注文についての問い合わせ先を探してもらう手間が省けます。",
        "訪日客向けのツアーガイドが集合場所でコードを見せれば、当日すぐに連絡を取り合えます。",
        "民泊のウェルカムブックに載せて、海外のゲストからの問い合わせ窓口にできます。",
      ],
      tipsTitle: "印刷前のポイント",
      tips: [
        "番号は国際形式で入力します。090-1234-5678 ではなく +81 90-1234-5678 のように書いてください。先頭の0は自動で外れますが、国番号は補えません。",
        "メッセージは予約の依頼や注文番号の入力欄など、短く具体的にしましょう。長いメッセージはQRコードを細かくします。",
        "完成したコードを自分で読み取り、正しい名前のチャットが開くか確認してください。1桁違うと知らない人につながります。",
        "番号を変えると、印刷したコードは古い番号を開き続けます。刷り直しの予定も立てておきましょう。",
      ],
    },
    faq: [
      {
        q: "相手が私の番号を登録していなくても使えますか？",
        a: "使えます。それが wa.me リンクの利点で、連絡先に追加しなくてもチャットが開きます。",
      },
      {
        q: "メッセージは自動で送信されますか？",
        a: "されません。入力欄に表示されるだけで、そのまま送るか、直すか、消すかは相手が決めます。",
      },
      {
        q: "WhatsApp Businessでも使えますか？",
        a: "使えます。WhatsApp Businessに登録している番号を入力してください。",
      },
      {
        q: "読み取ってもチャットが開かないのはなぜですか？",
        a: "一番多い原因は、国番号の抜けや誤りです。結果欄の番号が国番号（日本なら81）から始まり、その後に余分な0がないか確認してください。",
      },
    ],
  },

  text: {
    title: "テキスト QRコード作成",
    subtitle: "メモやコード、短いメッセージを入れて、読み取ると文字が表示されるQRコードを作れます。",
    metaTitle: "テキスト QRコード作成 — 無料・登録不要",
    metaDescription:
      "メモ、シリアル番号、手順、短いメッセージなどのテキストをQRコードに。読み取りにリンクやインターネットは不要です。無料・有効期限なし・登録不要。",
    sections: {
      howTitle: "テキスト QRコードのしくみ",
      how: [
        "テキストのQRコードには、入力した文字がそのまま入ります。前置きもリンクもありません。文字は模様から直接読み取られるので、インターネット接続は不要です。電波の届かない場所や、Webサイトの公開に左右されたくない情報に向いています。",
        "テキストを読み取ったときの表示はスマホによって違います。多くのAndroidの読み取りアプリやGoogleレンズでは、コピーボタン付きで文字が表示されます。iPhoneのカメラアプリでは、iOSのバージョンによってバナーで表示されたり、検索を提案されたりします。ページを開いてほしいならURL、文章を読んでほしいならテキストを選びましょう。",
        "一番の制約は容量です。日本語の文字や絵文字は1文字あたり2〜4バイト使うため、英数字より早くいっぱいになります。実際には数百文字程度なら無理なく読み取れ、長すぎるとプレビューでお知らせします。",
      ],
      usesTitle: "こんな場面で便利です",
      uses: [
        "工場や作業場で、機器にシリアル番号と前回の点検日を入れたコードを貼れば、電波の届かない地下でも確認できます。",
        "先生がプリントに答えをコードで隠しておけば、生徒は準備ができたときに答え合わせができます。",
        "倉庫で棚番号や部品番号をテキストのコードにすれば、専用ソフトなしでどのスマホでも読めます。",
        "プレゼントのタグに短いメッセージを入れて、読み取ったときに表示されるようにできます。",
      ],
      tipsTitle: "印刷前のポイント",
      tips: [
        "短くまとめましょう。1文増えるごとにマス目が小さくなり、大きく印刷したり明るい場所で読んだりする必要が出てきます。",
        "プレビューで長すぎると表示されたら、「デザイン」の誤り訂正を「標準」にするか、文章をWebページに載せてURLのQRコードにしてください。",
        "秘密の情報には使わないでください。読み取った人なら誰でも全文を見られます。",
        "テキストの表示方法は機種で違うので、iPhoneとAndroidの両方で確認しましょう。",
      ],
    },
    faq: [
      {
        q: "QRコードには何文字まで入りますか？",
        a: "初期設定の誤り訂正なら、英数字でおよそ2,300文字まで入る規格です。ただし数百文字を超えるとスマホでは読み取りにくくなります。日本語などの文字はさらに容量を使います。",
      },
      {
        q: "テキストを読むのにインターネットは必要ですか？",
        a: "不要です。文字は画像そのものに入っているので、オフラインでも読み取れます。",
      },
      {
        q: "改行は使えますか？",
        a: "使えます。改行もテキストの一部として残りますが、読み取りアプリによってはスペースで表示されます。",
      },
      {
        q: "iPhoneでテキストがうまく表示されないのはなぜですか？",
        a: "iPhoneのカメラアプリは主にリンクや操作向けに作られています。テキストの場合は、コントロールセンターの「コードスキャナー」や読み取りアプリを使うと全文が表示されます。",
      },
    ],
  },

  wifi: {
    title: "Wi-Fi QRコード作成",
    subtitle: "パスワードを読み上げたり入力したりせず、読み取るだけでWi-Fiにつながります。",
    metaTitle: "Wi-Fi QRコード作成 — 無料・登録不要",
    metaDescription:
      "iPhone・Androidを読み取り1回でWi-Fiに接続できるQRコードを無料で作成。WPA/WPA2/WPA3、WEP、非公開ネットワークに対応。お店や自宅に。登録不要です。",
    sections: {
      howTitle: "Wi-Fi QRコードのしくみ",
      how: [
        "QRコードには、広く使われている短い形式でネットワーク情報が入ります。例：WIFI:T:WPA;S:CafeGuest;P:sunny-day-42;; Tはセキュリティの種類（WPA、WEP、オープンネットワークならnopass）、Sはネットワーク名、Pはパスワードです。非公開ネットワークでは H:true; が加わります。セミコロン、コロン、カンマ、引用符、バックスラッシュなど、この形式で特別な意味を持つ文字はバックスラッシュでエスケープされるので、それらを含むパスワードでも問題なく使えます。",
        "iPhone（iOS 11以降）では、カメラアプリを向けると「ネットワークに接続」の案内が出ます。Android 10以降の多くのスマホでも、カメラ、Googleレンズ、またはWi-Fi設定画面にあるQRコード読み取りボタンで同じように接続できます。スマホが直接つながるので、アプリもインターネット接続もいりません。",
        "WPAを選ぶと、WPA・WPA2・WPA3のネットワークに対応します。WEPはかなり古いルーターの場合だけ選んでください。",
      ],
      usesTitle: "こんな場面で便利です",
      uses: [
        "カフェのテーブルに卓上POPを置けば、お客様は注文を待つ間につながり、スタッフがレジでパスワードを伝える必要もなくなります。",
        "民泊やゲストハウスの玄関に額に入れて飾れば、ホストと連絡が取れないときでもゲストがすぐネットにつなげます。",
        "会議室の壁にゲスト用ネットワークのコードを貼れば、来客が自分のノートPCやスマホをすぐ接続できます。",
        "自宅の冷蔵庫に貼っておけば、友だちが来るたびにルーターのシールを探さずに済みます。",
      ],
      tipsTitle: "印刷前のポイント",
      tips: [
        "Wi-Fiのパスワードを変えると、印刷したコードは使えなくなります。新しいコードを作り、古いものと同時に貼り替えましょう。",
        "ルーターにゲスト用ネットワークがあれば、そちらを使いましょう。コードを撮影した人は誰でもパスワードを読み取れます。",
        "ネットワーク名は大文字・小文字や _5G などの末尾も含めて、表示どおり正確に入力してください。大文字と小文字は区別されます。",
        "印刷用シートには「Wi-Fiに接続」の見出しとネットワーク名が入るので、読み取れない人も手入力で接続できます。",
      ],
    },
    faq: [
      {
        q: "Wi-FiのQRコードはiPhoneで使えますか？",
        a: "使えます。iOS 11以降は標準のカメラアプリがWi-Fiのコードを認識し、ネットワークへの接続を案内します。",
      },
      {
        q: "後からパスワードを変えても、刷り直さずに使えますか？",
        a: "使えません。パスワードは静的なQRコードの中に入っているため、変更後は新しいコードを作って印刷し直す必要があります。",
      },
      {
        q: "Wi-Fiのパスワードはサーバーに保存されますか？",
        a: "QRコードはブラウザ上で作られます。保存・コピー・印刷時に、プライバシーポリシーのとおり入力内容が記録されることがありますが、Wi-Fiのパスワードは保存前に必ず伏せ字にされます。",
      },
      {
        q: "非公開（ステルス）ネットワークでも使えますか？",
        a: "使えます。「非公開ネットワーク」にチェックを入れると、名前を公開していないネットワークを探すようスマホに伝えます。古い機種では対応がまちまちなので、確認してください。",
      },
      {
        q: "ログイン画面があるホテルのWi-Fiでも使えますか？",
        a: "ネットワークへの接続まではできますが、その後に表示されるログインや利用規約の画面は手動で進める必要があります。",
      },
    ],
  },

  vcard: {
    title: "連絡先（vCard） QRコード作成",
    subtitle: "連絡先をQRコードに。読み取るとスマホのアドレス帳にそのまま保存できます。",
    metaTitle: "連絡先（vCard） QRコード作成 — 無料・登録不要",
    metaDescription:
      "名前、電話番号、メール、会社名、Webサイトを入れたvCardのQRコードを無料で作成。読み取り1回でiPhone・Androidに連絡先を保存。名刺に最適、登録不要。",
    sections: {
      howTitle: "vCard QRコードのしくみ",
      how: [
        "QRコードには、アドレス帳で長年使われてきた共通形式「vCard 3.0」の連絡先カードが入ります。短い例は次のとおりで、各項目が1行ずつ入ります：BEGIN:VCARD、VERSION:3.0、N:山田;花子;;;、ORG:株式会社サンプル、TITLE:課長、TEL;TYPE=CELL:+819012345678、EMAIL:hanako@example.com、END:VCARD。会社電話、Webサイト、住所、メモは入力したときだけ追加されます。",
        "iPhoneのカメラアプリや多くのAndroidのカメラで読み取ると、連絡先のプレビューと追加ボタンが表示されます。相手は保存前に内容を確認・修正できます。カード全体がコードに入っているので、インターネット接続は不要です。",
        "項目が増えるほど文字が増え、文字が増えるほどマス目も増えます。名前・携帯・メールだけならコンパクトですが、長い住所やメモを加えると密度が倍ほどになることもあります。",
      ],
      usesTitle: "こんな場面で便利です",
      uses: [
        "名刺の裏にコードを入れておけば、名前の漢字も番号の形式も正しいまま相手のスマホに登録されます。",
        "展示会やイベントの名札にvCardのコードを付ければ、名刺交換して後から入力するより早く済みます。",
        "不動産会社が看板やチラシに載せれば、物件の前にいるお客様が担当者の番号をその場で保存できます。",
        "受付に時間外サポート窓口のコードを置いておけば、来客が帰る前に保存してくれます。",
      ],
      tipsTitle: "印刷前のポイント",
      tips: [
        "項目が少ないほどコードはシンプルになります。小さな名刺なら、名前・携帯・メール・Webサイトで十分なことがほとんどです。",
        "電話番号は +81 90-1234-5678 のように国番号付きで書くと、海外の相手からも正しく発信できます。",
        "メモは短くするか空欄にしましょう。名刺サイズで読み取りにくくなる一番の原因になりやすい項目です。",
        "自分のコードからiPhoneとAndroidの両方で連絡先を保存し、名前や番号が正しい欄に入るか確認してください。",
      ],
    },
    faq: [
      {
        q: "連絡先は自動で保存されますか？",
        a: "されません。スマホにプレビューが表示され、相手がタップして追加します。本人の確認なしに保存されることはありません。",
      },
      {
        q: "電話番号や役職が変わったらどうすればいいですか？",
        a: "情報はコードの中に固定されています。新しいコードを作り、名刺も刷り直してください。",
      },
      {
        q: "vCardに顔写真を入れられますか？",
        a: "このサイトではできません。写真はQRコードには大きすぎるため、テキストの項目だけにしています。",
      },
      {
        q: "iPhoneとAndroidの両方で使えますか？",
        a: "使えます。vCard 3.0は、iPhoneのカメラアプリや、Googleレンズを含む多くのAndroidのカメラ・読み取りアプリで対応しています。",
      },
    ],
  },

  email: {
    title: "メール QRコード作成",
    subtitle: "宛先・件名・本文が入った状態で新規メールを開くQRコードを作れます。",
    metaTitle: "メール QRコード作成 — 無料・登録不要",
    metaDescription:
      "宛先、件名、本文を入力済みの新規メールを開くQRコードを無料で作成。ご意見の受付、サポート窓口、申し込みに便利です。有効期限なし・登録不要。",
    sections: {
      howTitle: "メール QRコードのしくみ",
      how: [
        "QRコードには標準的な mailto: リンクが入ります。宛先のあとに、件名と本文がエンコードされた文字で続きます。例：mailto:support@example.com?subject=Order%20question&body=Hello%2C%20my%20order%20number%20is スペースは %20 になるので、どのメールアプリでも同じように読み取られます。日本語の件名や本文も同じようにエンコードされます。",
        "読み取ると、iPhoneなら「メール」、AndroidならGmailなど、スマホの標準メールアプリで新しい下書きが開きます。相手はどこでも編集でき、送信するタイミングも自分で決めます。スマホにメールアプリが設定されていないと、アプリを選ぶよう聞かれたり何も起きなかったりするので、Webメール中心の相手には注意が必要です。",
        "必須なのは宛先だけです。件名と本文は任意ですが、入れておくと送る人の手間が省け、受け取ったメールの整理もしやすくなります。",
      ],
      usesTitle: "こんな場面で便利です",
      uses: [
        "ホテルの客室カードから、件名「客室へのリクエスト」入りのフロント宛メールを開けば、スタッフがすぐに振り分けられます。",
        "取扱説明書にサポート用のコードを載せ、件名に型番を入れておけます。",
        "イベントのブースで、読み取って1行のメールを送ってもらえばメールマガジンの登録受付になり、相手の手元にも送信記録が残ります。",
        "学校のお便りにコードを載せ、件名にクラス名を入れて出欠の返信を受け付けられます。",
      ],
      tipsTitle: "印刷前のポイント",
      tips: [
        "件名には、イベント名や商品の型番など、後で送信済みフォルダを見たときに分かるものを入れましょう。",
        "本文は長い完成文ではなく、「注文番号は」のように送る人が続きを書き込む形にするのがおすすめです。",
        "変わる予定のないアドレスを使いましょう。変わるかもしれない個人のアドレスは印刷物に向きません。",
        "自分と違うメールアプリを使っているスマホで読み取り、件名と本文が崩れずに入るか確認してください。",
      ],
    },
    faq: [
      {
        q: "読み取るとメールが送信されますか？",
        a: "されません。下書きが開くだけで、相手が内容を確認して自分で送信します。",
      },
      {
        q: "ファイルを添付できますか？",
        a: "できません。mailto: 形式は添付ファイルに対応していません。本文にファイルへのリンクを入れることはできます。",
      },
      {
        q: "どのメールアプリが開きますか？",
        a: "スマホで標準に設定されているメールアプリです。iPhoneなら通常「メール」、多くのAndroidではGmailが開きます。",
      },
      {
        q: "件名に日本語や記号を使えますか？",
        a: "使えます。日本語や記号はエンコードされるので、メールアプリで正しく表示されます。",
      },
    ],
  },

  sms: {
    title: "SMS QRコード作成",
    subtitle: "宛先とメッセージが入った状態でSMSの作成画面を開くQRコードを作れます。",
    metaTitle: "SMS QRコード作成 — 無料・登録不要",
    metaDescription:
      "あなたの番号とメッセージを入力済みでSMSの作成画面を開くQRコードを無料で作成。キャンペーン登録、予約、キーワード返信に便利。有効期限なし・登録不要。",
    sections: {
      howTitle: "SMS QRコードのしくみ",
      how: [
        "QRコードには、読み取りアプリで広く認識される SMSTO 形式が入ります。例：SMSTO:+819012345678:JOIN 番号は数字と先頭のプラス記号だけに整えられ、2つ目のコロンの後に入力したメッセージがそのまま続きます。",
        "読み取ると、iPhoneのカメラアプリや多くのAndroidのカメラで「メッセージ」アプリが開き、宛先と本文が入った状態になります。送信するかどうかは常に本人が決めます。送信には契約している携帯会社の通常のSMS料金がかかるので、海外からの旅行者などには注意が必要です。",
        "メッセージは通常のSMSとして送られるので、アプリやデータ通信がなくても、携帯電話の回線があればどの機種でも使えます。JOIN、STOP、予約番号など、自動応答システムが読み取る短いキーワードの返信に向いています。",
      ],
      usesTitle: "こんな場面で便利です",
      uses: [
        "店舗のレジ横のPOPで、キーワードをSMSで送るとキャンペーン情報に登録できるようにすれば、フォームに入力するより手軽です。",
        "駐車場にコードを掲示し、区画番号を管理会社にSMSで送れるようにすれば、利用者が番号を覚えておく必要がありません。",
        "チャリティーイベントで、キャンペーンのキーワード入りで寄付申し込みのSMSを始められるコードを掲示できます。",
        "修理業者が社用車にコードを貼り、「見積もり」と送ると折り返し電話がもらえるようにできます。",
      ],
      tipsTitle: "印刷前のポイント",
      tips: [
        "海外の人が読み取る可能性があるなら、番号に国番号を付けてください。",
        "メッセージはキーワードか短い1文にしましょう。長いとコードが細かくなり、うっかり書き換えられることも増えます。",
        "登録受付に使う場合は、印刷物を配る前に、印刷するキーワードにSMS配信サービスが対応しているか確認してください。",
        "iPhoneとAndroidの両方で確認しましょう。古い読み取りアプリの中には、宛先だけ入って本文が空になるものがあります。",
      ],
    },
    faq: [
      {
        q: "読み取るとSMSが自動で送信されますか？",
        a: "されません。スマホはメッセージを用意するだけで、送信ボタンは本人が押します。",
      },
      {
        q: "iPhoneで使えますか？",
        a: "使えます。iPhoneのカメラアプリはSMSTOのコードを認識し、宛先と本文が入った状態で「メッセージ」を開きます。",
      },
      {
        q: "複数の番号に送れますか？",
        a: "できません。SMSのコードで指定できる番号は1つです。グループで連絡したい場合は、LINEのグループやメールのQRコードを検討してください。",
      },
      {
        q: "モバイルデータ通信がなくても使えますか？",
        a: "コードの読み取りに通信は不要で、SMSは通常の携帯電話回線で送られるので、データ通信はいりません。",
      },
    ],
  },

  phone: {
    title: "電話番号 QRコード作成",
    subtitle: "番号を入力しなくても、読み取るだけで電話をかけられるQRコードを作れます。",
    metaTitle: "電話番号 QRコード作成 — 無料・登録不要",
    metaDescription:
      "読み取ると番号入りで電話アプリが開くQRコードを無料で作成。看板、社用車、チラシに最適です。有効期限のない静的QRコードで、登録も不要です。",
    sections: {
      howTitle: "電話番号 QRコードのしくみ",
      how: [
        "QRコードには、Webサイトの「電話する」ボタンと同じ tel: リンクが入ります。例：tel:+81312345678 スペース、ハイフン、かっこは取り除かれ、数字と先頭のプラス記号だけが残ります。",
        "読み取ると、スマホに番号が表示され、電話をかけるよう案内されます。iPhoneではカメラアプリにバナーが、Androidではカメラやグーグルレンズに発信ボタンが出ます。勝手に発信されることはなく、必ず本人が確認します。作れるQRコードの中でも特に小さいので、小さく印刷しても読み取りやすいのが特長です。",
        "数字とプラス記号だけを残すため、カンマや「内線」で書いた内線番号やポーズは削除されます。内線が必要な場合は、コードの横に書き添えてください。",
      ],
      usesTitle: "こんな場面で便利です",
      uses: [
        "水道修理業者が社用車の側面に大きなコードを貼れば、渋滞中に後ろにいる人もメモせずに番号を控えられます。",
        "車の窓に貼った「売ります」の貼り紙から、売り主に電話をかけられます。歩きながら番号を読むより確実です。",
        "クリニックの診察券に予約電話のコードを載せれば、かけ間違いが減ります。",
        "マンションのエントランスに、管理会社の緊急連絡先をコードで掲示できます。",
      ],
      tipsTitle: "印刷前のポイント",
      tips: [
        "訪日客や海外ローミング中のスマホでも使えるよう、+ と国番号から始まる国際形式で入力しましょう（例：+81 3-1234-5678）。",
        "コードの横に番号も文字で印刷しましょう。手で入力したい人や、カメラが使えない人にも親切です。",
        "車や屋外の看板では、実際に見る距離に合わせてサイズを決めます。目安は距離の10分の1で、3m離れた人向けなら約30cmです。",
        "カッティングシートや大きな看板にはSVGファイルを使うと、輪郭がくっきり仕上がります。",
      ],
    },
    faq: [
      {
        q: "読み取ると自動で電話がかかりますか？",
        a: "かかりません。番号が表示され、本人がタップして発信します。",
      },
      {
        q: "内線番号も入れられますか？",
        a: "コードには入れられません。番号を整える際に内線は削除されるので、内線番号はコードの横に文字で書いてください。",
      },
      {
        q: "固定電話やフリーダイヤルでも使えますか？",
        a: "使えます。0120などのフリーダイヤルを含め、スマホから発信できる番号なら、相手の携帯会社が許可している限り使えます。",
      },
      {
        q: "番号が変わったらどうなりますか？",
        a: "番号はコードの中に入っているので、新しいコードを作って印刷し直す必要があります。",
      },
    ],
  },

  geo: {
    title: "位置情報 QRコード作成",
    subtitle: "緯度・経度を入れたQRコードで、地図上のピンポイントの場所に案内できます。",
    metaTitle: "位置情報 QRコード作成 — 無料・登録不要",
    metaDescription:
      "緯度と経度から、地図アプリでその場所を開くQRコードを無料で作成。入口、登山口、会場の案内に便利です。有効期限なしの静的QRコード、登録不要。",
    sections: {
      howTitle: "位置情報 QRコードのしくみ",
      how: [
        "QRコードには、緯度と経度の2つの数字をカンマで区切った geo: リンクが入ります。例：geo:35.681236,139.767125 緯度は-90〜90、経度は-180〜180の範囲で入力します。数字を直接入力するか、その場所に立って「現在地を使う」ボタンを押してください。",
        "Androidでは、読み取るとたいていGoogleマップなどの地図アプリが座標にピンを立てた状態で開き、そのまま経路案内ができます。iPhoneの geo: リンクへの対応はまちまちで、iOSのバージョンや読み取りアプリによってAppleのマップが開いたり、座標が表示されるだけだったりします。iPhoneの利用者が多いなら、GoogleマップやAppleのマップの共有リンクをURLのQRコードにするほうが確実な場合があります。",
        "座標が示すのは店舗の登録情報ではなく位置そのものです。だからこそ、通用口、駐車場、公園の待ち合わせ場所など、住所のない場所にも使えます。",
      ],
      usesTitle: "こんな場面で便利です",
      uses: [
        "結婚式の招待状に、広い敷地の会場で地図アプリが反対側を指してしまう場合でも、正しい入口を示すコードを入れられます。",
        "登山口の案内板に駐車場の座標をリンクすれば、住所のない場所でも迷いません。",
        "倉庫への納品案内に、正面玄関ではなく正しい搬入口を示すコードを載せられます。",
        "お祭りの会場マップに、救護テントや落とし物センターの位置をコードで載せられます。",
      ],
      tipsTitle: "印刷前のポイント",
      tips: [
        "Googleマップでその場所を長押し（パソコンでは右クリック）すると、2つの数字が表示されるのでコピーしてください。",
        "小数点以下5桁で約1mの精度があり、それで十分です。それ以上の桁はコードを細かくするだけです。",
        "数字の符号を確認しましょう。日本は北緯・東経なのでどちらもプラスですが、グリニッジより西は経度が、赤道より南は緯度がマイナスになります。",
        "地図アプリによって動きが違うので、印刷前にiPhoneとAndroidの両方で読み取ってください。",
      ],
    },
    faq: [
      {
        q: "位置情報のQRコードはiPhoneで使えますか？",
        a: "使える場合と使えない場合があります。Androidは geo: リンクにしっかり対応していますが、iPhoneはiOSのバージョンや読み取りアプリによります。確認したうえで、iPhone利用者が中心なら地図の共有リンクをURLのQRコードにすることも検討してください。",
      },
      {
        q: "座標の代わりに住所を使えますか？",
        a: "この種類は座標のみに対応しています。住所を使いたい場合は、地図アプリでその住所を開いて共有リンクをコピーし、URLの種類で作ってください。",
      },
      {
        q: "読み取りにインターネット接続は必要ですか？",
        a: "座標の読み取りには不要です。地図や経路の表示には、地図アプリにオフラインマップがない限り通信が必要です。",
      },
      {
        q: "自分の位置情報が誰かに共有されますか？",
        a: "されません。コードに入るのは入力した座標だけです。「現在地を使う」はブラウザで現在地を取得し、入力欄を埋めるだけです。",
      },
    ],
  },

  event: {
    title: "予定（カレンダー） QRコード作成",
    subtitle: "日時・場所・詳細を入れて、読み取るだけでカレンダーに予定を追加できるQRコードを作れます。",
    metaTitle: "予定（カレンダー） QRコード作成 — 無料・登録不要",
    metaDescription:
      "タイトル、日付、時刻、場所、メモを入れたカレンダー予定のQRコードを無料で作成。読み取るとスマホのカレンダーに追加でき、タイムゾーンにも対応。登録不要。",
    sections: {
      howTitle: "予定 QRコードのしくみ",
      how: [
        "QRコードには、カレンダーの招待状と同じiCalendar形式の予定が入ります。例：BEGIN:VEVENT、SUMMARY:新商品発表会、DTSTART:20261015T080000Z、DTEND:20261015T093000Z、LOCATION:3階 会議室、END:VEVENT。時刻はお使いの端末のタイムゾーンからUTC（末尾のZ）に変換されるので、どのスマホでもそれぞれの現地時刻で表示されます。",
        "終日の予定は、DTSTART;VALUE=DATE:20261015 のように時刻なしの日付で書かれます。この形式では終了日を含まないため、10月15日の1日だけの予定はコード上では10月16日に終わります。カレンダーはこの形を前提にしているので、表示は1日だけになります。",
        "iPhoneではカメラアプリが予定を認識し、カレンダーへの追加を案内します。Androidは読み取りアプリによって異なり、Googleレンズや多くのカメラアプリでは追加ボタンが出ますが、古いものでは元のテキストが表示されるだけのこともあります。",
      ],
      usesTitle: "こんな場面で便利です",
      uses: [
        "ライブのポスターにコードを載せれば、通りがかった人が日時と会場をその場で保存できます。",
        "学校のお便りに保護者会のコードを載せれば、時間と教室が忙しい保護者のカレンダーにそのまま入ります。",
        "カンファレンスの資料に各ワークショップのコードを並べ、場所欄に部屋名を入れておけます。",
        "クリニックの予約票に、次回の予約日時をコードで印刷できます。",
      ],
      tipsTitle: "印刷前のポイント",
      tips: [
        "作成前に端末のタイムゾーンを確認しましょう。入力した時刻は今いる場所の現地時刻として読み取られ、UTCで保存されます。",
        "場所欄には部屋名や住所をしっかり入れましょう。多くのカレンダーでは地図へのリンクになります。",
        "説明は短めに。「ノートPCをご持参ください」のような実用的なメモは向いていますが、詳しいプログラムまで入れるとコードが細かくなります。",
        "印刷前に自分のコードから予定を追加し、日付・時刻・長さが正しいか確認してください。",
      ],
    },
    faq: [
      {
        q: "ほかのタイムゾーンの人にも正しい時刻で表示されますか？",
        a: "されます。時刻はUTCで保存されるので、各カレンダーが見る人の現地時刻で表示します。東京の18時の予定は、ロンドン（冬時間）では9時に表示されます。",
      },
      {
        q: "印刷した後に予定を変更できますか？",
        a: "できません。内容はコードの中に入っています。日時や場所が変わったら、新しいコードを作って印刷し直してください。",
      },
      {
        q: "繰り返しの予定は作れますか？",
        a: "このサイトでは作れません。1つのコードで表せる予定は1件です。",
      },
      {
        q: "予定は自動で追加されますか？",
        a: "されません。スマホに予定が表示され、本人がカレンダーに追加するかどうかを選びます。",
      },
    ],
  },

  payment: {
    title: "PayPal・支払いリンク QRコード作成",
    subtitle: "PayPal.Me、Venmo、Cash App、投げ銭ページなどを開くQRコードで、読み取るだけで支払ってもらえます。",
    metaTitle: "PayPal・支払いリンク QRコード作成 — 無料・登録不要",
    metaDescription:
      "PayPal.Me、Venmo、Cash App、Ko-fi、Buy Me a CoffeeなどのQRコードを無料で作成。PayPal・Venmo・Cash Appは金額の指定も可能。登録不要です。",
    sections: {
      howTitle: "支払い QRコードのしくみ",
      how: [
        "QRコードには、あなたのアカウントの公開支払いリンクが入ります。サービスを選んでユーザー名を入力すると、リンクが自動で作られます。金額を入れると、PayPalは https://paypal.me/yourname/25.00、Venmoは https://venmo.com/u/yourname?txn=pay&amount=25.00、Cash Appは https://cash.app/$yourtag/25.00 になります。Buy Me a Coffee、Ko-fi、Patreon、Revolut.Me、Wiseのリンクは、金額なしであなたのページを開きます。",
        "読み取ると、支払いアプリが入っていればアプリで、なければブラウザでリンクが開きます。支払う人は自分のアカウントにログインし、受取人と金額を確認してから支払います。コードに入っているのは公開ページのアドレスだけで、カードや口座の情報は含まれません。",
        "このサイトは決済の処理も手数料の徴収もせず、取引内容も見ません。お金のやり取りはすべて各支払いサービスの中で、そのサービスの規約と手数料に従って行われます。なお、金額は各アカウントに設定された通貨で扱われます。",
      ],
      usesTitle: "こんな場面で便利です",
      uses: [
        "マルシェやフリーマーケットの出店で、現金を持っていない海外のお客様向けにPayPalのコードをレジ横に置けます。",
        "路上ライブのミュージシャンが、楽器ケースにKo-fiなどの投げ銭用コードを置けます。",
        "スポーツクラブが会費の金額を入れたコードを印刷すれば、保護者が金額を入力する手間が省けます。",
        "フリーランスの人が、紙の請求書の下に支払い用のコードを載せられます。",
      ],
      tipsTitle: "印刷前のポイント",
      tips: [
        "金額は任意です。投げ銭や寄付なら空欄にして支払う人に決めてもらい、決まった価格なら入力しましょう。",
        "金額は12.50のように小数点以下2桁までの数字で入力します。通貨はコードではなく、あなたのアカウントの設定で決まります（日本円なら1500のように整数で）。",
        "結果欄のリンクを自分で開き、自分の名前と写真が表示されるか確認しましょう。ユーザー名の打ち間違いで、知らない人にお金が送られるおそれがあります。",
        "Venmoは米国のアカウント同士でしか使えず、ほかのサービスにもそれぞれ利用できる国の制限があります。お客様がふだん使っているサービスを選んでください。",
      ],
    },
    faq: [
      {
        q: "支払い用QRコードを人前に出しても安全ですか？",
        a: "コードに入っているのは公開の支払いページだけで、メッセージで共有するリンクと同じものです。これを使ってあなたからお金を引き出すことはできません。",
      },
      {
        q: "後から金額を変えられますか？",
        a: "金額はコードの一部なので、変えるには新しいコードを作ります。価格がよく変わる場合は、金額を空欄にしておきましょう。",
      },
      {
        q: "Ko-fiやPatreonで金額を指定できないのはなぜですか？",
        a: "これらの公開リンクは金額の事前入力に対応していないため、支払う人がページ上で金額を選びます。",
      },
      {
        q: "このサイトは支払いから手数料を取りますか？",
        a: "取りません。コードは支払いページを開くだけです。手数料がかかる場合は、PayPal、Venmoなど各サービスの手数料です。",
      },
    ],
  },

  crypto: {
    title: "ビットコイン・暗号資産 QRコード作成",
    subtitle: "ウォレットアドレスをQRコードに。ウォレットアプリでアドレスと金額が自動で入ります。",
    metaTitle: "ビットコイン・暗号資産 QRコード作成 — 無料・登録不要",
    metaDescription:
      "ビットコイン、イーサリアム、ライトコイン、ドージコイン、ビットコインキャッシュ、ソラナのウォレットアドレスと金額（任意）からQRコードを無料で作成。登録不要。",
    sections: {
      howTitle: "暗号資産 QRコードのしくみ",
      how: [
        "QRコードには、ウォレットアプリが理解できる支払いURIが入ります。ビットコインでは BIP-21 形式に従います。例：bitcoin:bc1qexampleaddress?amount=0.0015&label=Coffee%20stand 先頭で通貨を示し、その後にアドレス、任意でコイン単位の金額と60文字までの短いラベルが続きます。ライトコイン、ドージコイン、ビットコインキャッシュ、ソラナも、それぞれのスキームで同じ形式を使います。",
        "イーサリアムのコードには、ethereum: とアドレスだけが入ります。ウォレットによって金額の扱いが異なるため、金額は送る人が入力する形にしています。",
        "このコードは、ウォレットアプリの読み取りボタンや送金ボタンから読み取る想定です。スマホのカメラが認識して、インストール済みのウォレットで開くよう案内することもあります。ウォレットにはアドレスと金額が確認用に表示され、送る人が確定するまで送金されません。",
      ],
      usesTitle: "こんな場面で便利です",
      uses: [
        "ビットコイン決済に対応したお店がレジにコードを置けば、お客様が42文字のアドレスを手で写す必要がありません。",
        "クリエイターが動画の最後や同人誌に、ソラナやライトコインのウォレットへの寄付用コードを載せられます。",
        "イベントのブースで、チケットやグッズの代金を金額指定済みのコードで受け取れます。",
        "友だちから送金してもらうとき、チャットでアドレスを送る代わりに画面のコードを見せられます。",
      ],
      tipsTitle: "印刷前のポイント",
      tips: [
        "アドレスはウォレットの表示と1文字ずつ照らし合わせて確認しましょう。暗号資産の送金は取り消せず、アドレスを間違えると資産を失います。",
        "通貨とウォレットが合っているか確認してください。別のネットワーク用のアドレスに送ると、資産を失うことがあります。",
        "金額は円やドルではなくコイン単位で、小数点以下8桁までです。価格は変動するので、長く使う印刷物では金額を空欄にしましょう。",
        "受け取り専用のアドレスを使うことも検討してください。公開したコードを読み取った人は、そのアドレスの取引履歴をブロックチェーン上で調べられます。",
      ],
    },
    faq: [
      {
        q: "ウォレットのQRコードを公開しても安全ですか？",
        a: "受け取り用アドレスを共有するのはふつうのことで、それだけでウォレットから送金されることはありません。秘密鍵やリカバリーフレーズは絶対にQRコードに入れないでください。",
      },
      {
        q: "イーサリアムで金額を指定できないのはなぜですか？",
        a: "イーサリアムのウォレットは支払いリンクの金額を解釈する方法がそれぞれ違うため、誤った額が送られないよう、コードにはアドレスだけを入れています。",
      },
      {
        q: "USDTなどのトークンも受け取れますか？",
        a: "ほかのネットワーク上のトークンには、それ専用のウォレットとネットワーク設定が必要です。このサイトが対応しているのは、一覧にある6種類のネイティブコインです。",
      },
      {
        q: "どのウォレットで読み取れますか？",
        a: "主要なウォレットのほとんどは bitcoin: 形式の支払いリンクを読み取れます。金額やラベルが無視されるウォレットでも、アドレスは使えます。",
      },
    ],
  },

  file: {
    title: "PDF QRコード作成",
    subtitle: "Googleドライブ、Dropbox、自社サイトなどで共有したPDFやファイルにリンクするQRコードを作れます。",
    metaTitle: "PDF QRコード作成 — 無料・登録不要",
    metaDescription:
      "Googleドライブ、Dropbox、自社サイトに置いたPDF、メニュー、パンフレット、説明書を開くQRコードを無料で作成。有効期限なしの静的QRコード、登録不要。",
    sections: {
      howTitle: "PDF QRコードのしくみ",
      how: [
        "QRコードにPDFそのものは入りません。短い文書でも、コードに入る数キロバイトよりはるかに大きいからです。代わりに、https://drive.google.com/file/d/1AbC…/view のような、ファイルの置き場所へのリンクを入れます。このサイトはファイルのアップロードや保管をしないので、まずPDFをどこかに公開する必要があります。",
        "Googleドライブ、Dropbox、OneDrive、または自社サイトにアップロードし、共有リンクをコピーして、アクセス権を「リンクを知っている全員」に設定します。そのリンクをここに貼り付けてください。読み取った人のスマホではブラウザでリンクが開き、PDFを見たりダウンロードしたりできます。",
        "リンクが有効な限り、QRコードも使えます。ファイルを削除したり、別のリンクに移したり、非公開にしたりすると、エラーやログイン画面が表示されるようになります。",
      ],
      usesTitle: "こんな場面で便利です",
      uses: [
        "飲食店がメニューのPDFにリンクしておけば、季節ごとにファイルを差し替えても卓上POPはそのまま使えます。",
        "商品の箱に取扱説明書全文へのコードを載せれば、同梱する紙は安全上の注意だけで済みます。",
        "不動産の看板から、通りがかった人が間取り図やパンフレットを開けます。",
        "セミナーの後に、スライド資料と配布資料をまとめたコードを1つ配れます。",
      ],
      tipsTitle: "印刷前のポイント",
      tips: [
        "ログインしていないシークレットウィンドウでリンクを開いて確認しましょう。ログインを求められたら、共有設定が間違っています。",
        "リンクを変えずにファイルを更新するには、新しくアップロードするのではなく、同じ場所で差し替えます。Googleドライブの「版を管理」なら同じリンクのまま更新できます。",
        "一部のファイル転送サービスの一時ダウンロードリンクのような、期限切れになるリンクは避けましょう。",
        "PDFは容量を抑え、スマホの画面でも読みやすくしましょう。50MBのスキャンデータはモバイル回線では開くのに時間がかかります。",
      ],
    },
    faq: [
      {
        q: "ここにPDFをアップロードできますか？",
        a: "できません。このサイトはQRコードを作るだけです。ファイルはGoogleドライブ、Dropbox、自社サイトなどに置き、その共有リンクを貼り付けてください。",
      },
      {
        q: "読み取ると「アクセス権をリクエスト」と表示されるのはなぜですか？",
        a: "ファイルが一般公開されていないためです。共有設定を「リンクを知っている全員が閲覧可」に変更してください。",
      },
      {
        q: "QRコードを印刷した後にPDFを変えられますか？",
        a: "リンクが同じなら変えられます。同じアドレスのままファイルの中身を差し替えてください。新しくアップロードし直すと、リンクも新しくなります。",
      },
      {
        q: "PDF以外のファイルでも使えますか？",
        a: "使えます。画像、プレゼン資料、音声など、共有リンクがあるファイルならなんでも使えます。スマホでプレビューできるかどうかはファイルの種類によります。",
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

/** Japanese copy for the use-case landing pages (/ja/restaurant-menu-qr-code, …). */
export const useCasesJa: Record<UseCaseId, LandingCopy> = {
  restaurant_menu: {
    title: "メニュー QRコード作成（飲食店向け）",
    subtitle: "どのテーブルにも同じコードを1枚。お客様のスマホで最新のメニューが開きます。",
    metaTitle: "メニュー QRコード作成（飲食店向け） — 無料・登録不要",
    metaDescription:
      "飲食店のメニューページやPDFを開くQRコードを無料で作成。有効期限なしの静的QRコードで、卓上POPや店頭ステッカーにそのまま使えます。登録不要です。",
    sections: {
      howTitle: "メニュー QRコードのしくみ",
      how: [
        "メニューのQRコードにメニューそのものは入っていません。入っているのは `https://yourrestaurant.com/menu` のようなリンクで、スマホはそのアドレスの内容を開きます。まずはメニューの置き場所を決めましょう。自社サイトのページ、GoogleドライブやDropboxで共有したPDF、メニュー・モバイルオーダーサービスが発行するページなどです。このサイトはQRコードを作るだけで、メニューやファイルは保管しません。",
        "静的QRコードなので、中のリンクは印刷した時点で固定されます。変えられるのはリンク先の内容です。メニューを決まったアドレスに置き、そのページを更新したりPDFを同じ場所で差し替えたりすれば、値上げや季節メニューの入れ替えがあっても卓上POPはそのまま使えます。メニューサービスを乗り換えるなどしてアドレス自体が変わると、印刷したコードは貼り替えが必要です。",
        "お客様はスマホのカメラで読み取り、表示されたアドレスをタップするだけで、アプリのインストールは不要です。自社ドメインの短いリンクは、外部サービスの長いリンクより安心感も与えます。",
      ],
      usesTitle: "こんな場面で便利です",
      uses: [
        "各テーブルの卓上POPやステッカーに。1冊のラミネートメニューを回し読みしなくても、待ち時間にメニューを見てもらえます。",
        "入口のガラスに貼るステッカーに。通りがかった人が、閉店後でも料理や価格を確認してから来店できます。",
        "テイクアウトの袋に入れるチラシやレシートに。次回は自宅からメニューを見て注文してもらえます。",
        "レジ横にアレルギー・原材料ページ専用のコードを置けば、質問されたときにスタッフが案内しやすくなります。",
      ],
      tipsTitle: "印刷前のポイント",
      tips: [
        "yourdomain.com/menu のように自分で管理できるアドレスを使い、そこから今のメニューの置き場所へ転送しましょう。メニューサービスを変えても、卓上POPを刷り直さずに済みます。",
        "お店のWi-Fiではなくモバイル回線のスマホでメニューを開いてみましょう。スキャンした大きなPDFは読み込みが遅く、小さな画面では読みにくいので、シンプルなWebページのほうが向いています。",
        "紙のメニューも用意しておきましょう。スマホを持っていない、電池が切れた、小さな文字が見えにくいというお客様もいます。QRコードは便利な選択肢の一つで、唯一の注文方法にしないことが大切です。",
        "アレルギー情報はWeb上でも紙と同じくらい分かりやすく載せ、料理が変わるたびに更新しましょう。",
        "卓上POPのQRコードは2〜3cm以上の幅で印刷しましょう。店頭用には「印刷用シート・PDF」で、「メニューはこちら」などの見出しを編集したA4ポスターを作れます。価格は「ランチセット 1,200円」のようにWeb側で更新すれば十分です。",
      ],
    },
    faq: [
      {
        q: "ここにメニューをアップロードできますか？",
        a: "できません。このサイトはQRコードを作るだけです。メニューを自社サイトに載せる、GoogleドライブやDropboxのPDFを「リンクを知っている全員」で共有する、メニューサービスのリンクを使うなどしてから、そのアドレスをここに貼り付けてください。",
      },
      {
        q: "メニューが変わるたびにQRコードを作り直す必要がありますか？",
        a: "アドレスが変わらなければ不要です。同じリンクのままページを更新するかPDFを差し替えれば、印刷したコードからいつでも最新版が開きます。",
      },
      {
        q: "しばらくするとQRコードが使えなくなりませんか？",
        a: "なりません。リンクが画像の中に入った静的QRコードなので、切れてしまう契約もありません。メニューページが公開されている限り使えます。",
      },
      {
        q: "全テーブル共通のコードと、テーブルごとのコード、どちらがいいですか？",
        a: "どのテーブルでも同じメニューなら、1つで十分です。テーブルごとのコードが役立つのは、注文システムがテーブル別のリンクを発行する場合だけです。そのリストは一括作成ページで、1回200個までZIPにまとめてQRコードにできます。",
      },
    ],
  },

  wedding: {
    title: "結婚式 QRコード作成",
    subtitle: "招待状から結婚式のWebサイトや出欠フォームへ。披露宴の写真も1つの共有アルバムに集められます。",
    metaTitle: "結婚式 QRコード作成 — 無料・登録不要",
    metaDescription:
      "招待状のWeb招待・出欠フォーム、会場への道案内、写真の共有アルバムに使える結婚式のQRコードを無料で作成。有効期限なしで印刷にそのまま使えます。登録不要。",
    sections: {
      howTitle: "結婚式 QRコードのしくみ",
      how: [
        "結婚式のQRコードに入るのはリンクで、そのリンクがゲストに見せるものを決めます。招待状なら、たいていは結婚式のWebサイトか出欠フォームです。Web招待状サービスでもGoogleフォームでも構いません。ゲストは読み取ってページを開けば、カードの長いアドレスを入力せずに返信できます。",
        "当日の案内にも同じ方法が使えます。GoogleマップやAppleのマップの共有リンクを入れたコードで会場へ案内し、披露宴ではGoogleフォトやiCloudの共有アルバムを開くコードを置けば、みんなが撮った写真を集められます。1つのコードで開けるアドレスは1つなので、目的ごとにコードを作ります。",
        "ここで作るQRコードは静的で、リンクが画像に入っているため有効期限がありません。ページが公開されていれば、何年後でも開けます。その反面、印刷後にリンクを差し替えることはできません。招待状を印刷所に出す前に、Webサイト・フォーム・アルバムのアドレスを確定させましょう。",
      ],
      usesTitle: "こんな場面で便利です",
      uses: [
        "招待状の裏面や同封カードに出欠フォームへのコードを入れれば、LINE・メール・電話にばらばらに届いていた返信が1か所に集まります。",
        "セーブ・ザ・デートや案内カードから、アクセス・宿泊・ドレスコードを載せた結婚式のWebサイトを開けます。",
        "道案内のカードやウェルカムボードに、分かりにくい会場への地図リンクのコードを載せられます。",
        "披露宴の席札やテーブルカードに共有アルバムのコードを置けば、ゲストが忘れないうちに写真をアップロードしてくれます。",
      ],
      tipsTitle: "印刷前のポイント",
      tips: [
        "招待状では2〜2.5cm程度あれば、手に持ったスマホで楽に読み取れます。リンクが短いほど模様が粗くなり、このサイズでも確実に印刷できます。",
        "クリーム色やアイボリー、クラフト紙に濃いインクなら、たいていよく読み取れます。金の箔押し、パステルカラー、薄いグレーは読み取れないことが多いです。「デザイン」で濃い色を選び、実際の用紙で試し刷りをして確認しましょう。",
        "QRコードの周りの余白（クワイエットゾーン）には、飾り罫や枠、イラストを入れないでください。読み取りに必要な部分です。",
        "共有設定を確認しましょう。アルバムはゲストが写真を追加できる設定に、フォームは自分のアカウントだけでなく、リンクを知っている全員が開ける設定にしておきます。",
        "本番の印刷を発注する前に、試し刷りをiPhoneとAndroidで読み取り、テストで出欠を送信し、友だちに写真をアルバムへアップロードしてもらいましょう。",
      ],
    },
    faq: [
      {
        q: "招待状を印刷した後に、リンク先を変えられますか？",
        a: "静的QRコードなのでコード自体は変えられません。ページの内容は編集できるので、リンクを差し替えるのではなく、Webサイトやフォームの中身を更新してください。",
      },
      {
        q: "結婚式が終わった後もQRコードは使えますか？",
        a: "QRコードに有効期限はありません。リンク先のWebサイト・フォーム・アルバムが公開されている限り使えるので、アルバムを共有したままにしておけば、ゲストが後から写真を見返せます。",
      },
      {
        q: "ゲストごとに専用の出欠コードを作れますか？",
        a: "出欠管理サービスがゲストごとに別のリンクを発行するなら、一括作成ページでそのリストを1回200個まで、PNGファイルのZIPとしてQRコードにできます。",
      },
      {
        q: "印刷所にはPNGとSVGのどちらを渡せばいいですか？",
        a: "印刷所やデザイナーにはSVGファイルを渡してください。ベクター形式なので、どのサイズでもくっきり印刷できます。Webサイトに載せたり、ゲストにメッセージで送ったりするならPNGで十分です。",
      },
    ],
  },

  business_card: {
    title: "名刺 QRコード作成",
    subtitle: "名刺に連絡先カードを入れて、読み取り1回で相手のスマホに連絡先を保存してもらえます。",
    metaTitle: "名刺 QRコード作成 — 無料・登録不要",
    metaDescription:
      "名前、電話番号、メール、Webサイトをスマホの連絡先に保存できる名刺用QRコードを無料で作成。vCard 3.0対応、有効期限なしの静的QRコード。登録不要です。",
    sections: {
      howTitle: "名刺 QRコードのしくみ",
      how: [
        "ここで作る名刺用のコードには、スマホのアドレス帳が読み取れる形式「vCard 3.0」の連絡先カードが入ります。読み取ると、名前・会社名・電話番号・メールが連絡先のプレビューに表示され、タップ1回で追加できます。何も読み込む必要がないので電波の弱い展示会場でも使え、名前の漢字も書いたとおりに保存されます。",
        "もう一つの方法は、Webサイトやプロフィールページへのリンクのコードです。リンクなら多くの情報を見せられ、刷り直さずにページを更新できますが、番号の保存は相手が自分でする必要があります。連絡先のコードなら保存まで済みます。裏面に連絡先のコードを入れ、Webサイトの短いアドレスは文字で印刷する、という使い分けも人気です。",
        "入力した項目はすべて画像に入るので、情報が増えるほどコードも大きくなります。名前・会社名・携帯・メール・Webサイトならコンパクトですが、住所全体やメモを加えると模様が細かくなり、名刺サイズでは読み取りにくくなります。",
      ],
      usesTitle: "こんな場面で便利です",
      uses: [
        "交流会や展示会など、何十枚も名刺を配る場面で。引き出しにしまわれるのではなく、相手のスマホに登録してもらえます。",
        "対面で取引先と会うフリーランスやコンサルタントに。名刺の写真から推測されるのではなく、正しいメールと番号を保存してもらえます。",
        "営業チームの名刺に。一人ひとりの直通番号を入れたコードを作れます。",
        "受付に置くカードに。来客に会社の代表連絡先を保存してもらえます。",
      ],
      tipsTitle: "印刷前のポイント",
      tips: [
        "日本の一般的な名刺（91×55mm）なら、QRコードは2cm以上の幅で、周りに余白を取って印刷しましょう。裏面を丸ごと使えるなら2.5〜3cmあると読み取りやすくなります。",
        "項目は必要なものに絞りましょう。名前・会社名・携帯・メール・Webサイトが基本で、住所とメモは必要な場合だけ入れます。",
        "電話番号は +81 90-1234-5678 のように国番号付きで書くと、海外の相手にも使えます。",
        "一括作成ページで作れるのはリンクとテキストのコードで、連絡先カードは作れません。チームで使う場合は、このページで一人ずつ作り、名刺デザインごとにSVGファイルを保存してください。",
        "試し刷りをiPhoneとAndroidで読み取り、名前・番号・メールが正しい欄に入るか確認しましょう。",
      ],
    },
    faq: [
      {
        q: "電話番号や役職が変わったらどうなりますか？",
        a: "情報はコードの中に固定されています。名刺の文字と同じように、新しいコードを作って刷り直してください。",
      },
      {
        q: "連絡先のコードとWebサイトへのリンク、どちらがいいですか？",
        a: "連絡先のコードは情報をそのまま保存でき、オフラインでも使えます。リンクなら後から更新できるページに案内できます。連絡先があまり変わらないなら、名刺には連絡先のコードのほうが役立ちます。",
      },
      {
        q: "ロゴを入れられますか？",
        a: "連絡先そのものには入りませんが、「デザイン」でQRコードの中央に小さなロゴを置けます。そのとき誤り訂正が自動で最大になるので、読み取りも問題ありません。",
      },
      {
        q: "相手は保存前に連絡先を編集できますか？",
        a: "できます。スマホにプレビューが表示され、追加する前に内容を確認・変更できます。",
      },
    ],
  },

  google_review: {
    title: "Googleクチコミ QRコード作成",
    subtitle: "お店のGoogleクチコミ投稿画面を開くQRコードを作成。レジ横やレシートにすぐ使えます。",
    metaTitle: "Googleクチコミ QRコード作成 — 無料・登録不要",
    metaDescription:
      "プレイスIDやクチコミ用リンクから、Googleクチコミの投稿画面を開くQRコードを無料で作成。レジ横のカード、レシート、サンクスカードに。登録不要です。",
    sections: {
      howTitle: "Googleクチコミ QRコードのしくみ",
      how: [
        "このQRコードはお店のGoogleクチコミ投稿画面を直接開くので、お客様がお店を検索し、正しい店舗を選び、クチコミボタンを探す手間がなくなります。サービスで「Googleクチコミ」を選んでプレイスIDを入力すると、コードには `https://search.google.com/local/writereview?placeid=ChIJ…` の「…」の部分にIDが入ったリンクが入ります。",
        "入力欄の埋め方は2通りです。1つ目はプレイスIDで、Google Maps Platformのドキュメントにある「Place ID Finder」でお店を検索し、たいていChIJで始まるIDをコピーします。2つ目はGoogleビジネスプロフィールのクチコミ用リンクで、プロフィールを開いて「クチコミを依頼」を選び、表示される短いリンクをコピーします。https:// で始まるリンクはそのまま使えます。",
        "読み取ると、Googleマップかブラウザでクチコミの投稿画面が開きます。投稿にはGoogleアカウントへのログインが必要で、星の数とクチコミの内容はお客様自身が決めます。コードは静的で公開リンクしか入っていないため、お店の掲載が続く限り使えます。",
      ],
      usesTitle: "こんな場面で便利です",
      uses: [
        "レジ横の小さなカードに。お会計のちょっとした待ち時間に読み取ってもらえます。",
        "レシートの下部に印刷すれば、お客様が家に持ち帰ってから投稿できます。",
        "宅配後、ホテルのチェックアウト時、訪問サービスの完了後に渡すサンクスカードに。",
        "出口付近に「印刷用シート・PDF」で作ったA4ポスターを。短い見出しは自由に編集できます。",
      ],
      tipsTitle: "印刷前のポイント",
      tips: [
        "自分でコードを読み取り、フォームにお店の名前が表示されるか確認しましょう。同じ地域の似た名前のお店は、Place ID Finderで取り違えやすいです。",
        "「Googleでご感想をお聞かせください」のように分かりやすい言葉でお願いし、お客様が急いで帰る場所ではなく、ひと息つける場所にコードを置きましょう。",
        "Googleのポリシーでは、クチコミと引き換えの割引・プレゼントなどの特典は禁止されています。カードはシンプルなお願いにとどめましょう。",
        "すべてのお客様に同じようにお願いしましょう。満足したお客様だけを誘ったり、不満のあるお客様を先に別の窓口へ誘導したりすることもGoogleは禁止しています。",
      ],
    },
    faq: [
      {
        q: "プレイスIDはどこで調べられますか？",
        a: "Google MapsのドキュメントにあるPlace ID Finderでお店を検索し、表示されたIDをコピーしてください。Googleビジネスプロフィールのクチコミ用リンクを入力欄に貼り付けることもできます。",
      },
      {
        q: "お客様にGoogleアカウントは必要ですか？",
        a: "必要です。Googleクチコミの投稿にはGoogleアカウントへのログインが必要です。アカウントがなくても、お店の情報やクチコミを見ることはできます。",
      },
      {
        q: "クチコミのお礼に割引をしてもいいですか？",
        a: "いけません。Googleのポリシーは、割引や無料サービスを含め、クチコミへの特典を禁止しています。カードで丁寧にお願いするのは問題ありません。",
      },
      {
        q: "店名を変えたらQRコードは使えなくなりますか？",
        a: "通常は使えます。プレイスIDは名前ではなく掲載情報そのものを指しているためです。ただし掲載情報の統合などでプレイスIDが変わる場合もあるとGoogleは案内しているので、プロフィールを大きく変更したらもう一度読み取って確認してください。",
      },
    ],
  },

  wifi_cafe: {
    title: "カフェ・ホテル・民泊のWi-Fi QRコード",
    subtitle: "卓上POP、客室カード、玄関の掲示から、読み取り1回でゲスト用Wi-Fiにつながります。",
    metaTitle: "カフェ・ホテル・民泊のWi-Fi QRコード — 無料・登録不要",
    metaDescription:
      "カフェ、ホテル、民泊向けのWi-Fi QRコードを無料で作成。iPhone・Androidで読み取るだけで接続できます。卓上POPや客室カードの印刷にも対応。登録不要。",
    sections: {
      howTitle: "ゲスト用Wi-Fi QRコードのしくみ",
      how: [
        "多くのカフェで、レジで一番よく聞かれるのはWi-Fiのパスワードです。Wi-FiのQRコードなら、その答えを紙で渡せます。コードには `WIFI:T:WPA;S:Cafe-Guest;P:espresso-2026;;` のような短い形式でネットワーク名・パスワード・セキュリティの種類が入り、スマホのカメラが「ネットワークに接続」の案内に変えてくれます。お客様は何も入力しないので、大文字・小文字の違いや、Oと見間違える0で失敗することもありません。",
        "ルーターやアクセスポイントが対応していれば、コードを作る前にゲスト用ネットワークを別に用意しましょう。パスワードは読める形でコードに入っているので、卓上POPを撮影した人は誰でも読み取れます。ゲスト用ネットワークを分けておけば、決済端末や事務所のパソコン、防犯カメラにはゲストが入れません。",
        "コードは静的なので、パスワードは固定です。毎月や宿泊ごとにゲスト用パスワードを変えるなら、そのたびにコードも印刷し直しましょう。ログインや利用規約の画面（キャプティブポータル）があるホテルのネットワークでは、接続後もその画面が表示されます。コードでつながるのはネットワークまでで、ログインまでは完了しません。",
      ],
      usesTitle: "こんな場面で便利です",
      uses: [
        "カフェやレストランの卓上POPに。注文を待つ間にお客様が接続できます。",
        "ホテルの客室やカードキーのケースに、チェックアウト時刻や朝食の時間と並べて。",
        "民泊の玄関の内側やウェルカムブックに額入りのコードを。ホストがいない夜遅くに到着したゲストも困りません。",
        "コワーキングスペースの席、待合室、美容室の席など、来客がしばらく滞在する場所に。",
      ],
      tipsTitle: "印刷前のポイント",
      tips: [
        "「印刷用シート・PDF」では「Wi-Fiに接続」の見出しとネットワーク名が入ったA4の掲示を作れるので、読み取れない人もどのネットワークを選べばいいか分かります。「お困りの際はスタッフへ」などのサブテキストも追加できます。",
        "ネットワーク名は、大文字・小文字や _5G などの末尾も含めて、電波に表示されるとおり正確に入力しましょう。",
        "パスワードを変えたら、印刷したコードはすべて同じ日に貼り替えましょう。古いコードでも接続の案内は出ますが、つながらないため、お客様にはWi-Fiが壊れているように見えます。",
        "印刷したコードを、お客様が実際に座る場所から、実際の照明の下でiPhoneとAndroidで試してください。",
      ],
    },
    faq: [
      {
        q: "Wi-Fiのパスワードをテーブルに置いても安全ですか？",
        a: "コードを読み取ったり撮影したりした人は誰でもパスワードを読めます。お店の業務システムとは別のゲスト用ネットワークを使いましょう。",
      },
      {
        q: "パスワードを変えたら印刷し直す必要がありますか？",
        a: "あります。パスワードはコードそのものに入っているので、変更のたびに新しいコードと印刷物が必要です。",
      },
      {
        q: "ホテルのログイン画面があっても使えますか？",
        a: "コードでスマホをネットワークにつなげます。その後にログインや利用規約の画面が出る場合は、ゲストが手動で進める必要があります。",
      },
      {
        q: "客室ごとに別のパスワードのコードを作れますか？",
        a: "作れます。このページで1つずつ作成してください。一括作成ページはリンクとテキストのリスト向けで、Wi-Fiの入力欄はありません。",
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
