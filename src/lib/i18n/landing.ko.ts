import type { QrType } from "@/lib/qr/types";
import type { LandingCopy, UseCaseId } from "./index";

/** 타입별 랜딩 페이지(/ko/wifi-qr-code 등)의 한국어 본문. */
export const landingKo: Record<QrType, LandingCopy> = {
  url: {
    title: "URL QR 코드 만들기",
    subtitle: "웹사이트 주소를 스캔 한 번에 열리는 QR 코드로 바꿉니다.",
    metaTitle: "URL QR 코드 만들기 — 무료, 회원가입 없음",
    metaDescription:
      "웹사이트 주소를 넣으면 바로 QR 코드가 만들어집니다. 만료 없는 정적 QR이라 계속 쓸 수 있고, PNG·SVG 저장과 A4 안내판 인쇄까지 무료로 할 수 있습니다.",
    sections: {
      howTitle: "URL QR 코드는 이렇게 동작합니다",
      how: [
        "URL QR 코드에는 입력한 주소가 글자 그대로 담깁니다. 휴대폰 카메라가 코드를 읽으면 주소를 알아보고, 화면에 뜨는 알림을 누르면 브라우저에서 그 페이지가 열립니다. 아이폰은 기본 카메라 앱으로, 안드로이드는 기본 카메라나 Google 렌즈로 따로 앱을 설치하지 않고 읽을 수 있습니다.",
        "주소 앞의 https:// 는 생략해도 됩니다. example.com/menu 라고 쓰면 https://example.com/menu 로 담깁니다. javascript: 나 data: 로 시작하는 주소는 악용될 수 있어 만들지 않습니다.",
        "주소가 이미지 안에 들어 있는 정적 QR이라 만료되지 않고, 이 사이트가 없어져도 계속 열립니다. 대신 인쇄한 뒤에는 연결되는 주소를 바꿀 수 없습니다. 주소가 바뀔 수 있다면 내 사이트에 고정 주소를 하나 정해 두고, 그 주소에서 실제 페이지로 넘겨 주는 방법을 쓰세요.",
      ],
      usesTitle: "이럴 때 쓰세요",
      uses: [
        "매장 테이블에 메뉴판이나 예약 페이지 QR을 붙여 두면 손님이 주소를 따라 칠 필요가 없습니다.",
        "전단지나 포스터에 행사 신청서, 설문 링크를 넣습니다. Google 설문지나 네이버 폼 주소도 그대로 넣으면 됩니다.",
        "제품 포장이나 설명서에 사용법 영상, A/S 접수 페이지를 연결합니다.",
        "지점이나 상품마다 링크가 따로 필요하다면 일괄 생성에서 목록을 붙여 넣어 한 번에 최대 200개까지 ZIP 파일로 받을 수 있습니다.",
      ],
      tipsTitle: "인쇄 전에 확인하세요",
      tips: [
        "주소가 짧을수록 코드가 덜 촘촘해져 작게 인쇄해도 잘 읽힙니다. 뒤에 붙은 추적용 매개변수가 길다면 꼭 필요한 것만 남기세요.",
        "인쇄 크기는 스캔 거리를 10으로 나눈 정도가 적당합니다. 테이블에서 30cm 거리라면 3cm, 2m 떨어진 벽 포스터라면 20cm 정도이고, 아무리 작아도 2cm는 넘기세요.",
        "인쇄물에는 확대해도 깨지지 않는 “SVG 저장”을, 메신저나 웹에는 “이미지로 저장 (PNG)”을 권합니다. PNG는 최대 2048px까지 고를 수 있습니다.",
        "인쇄하기 전에 아이폰과 안드로이드로 각각 스캔해 원하는 페이지가 열리는지 확인하세요.",
      ],
    },
    faq: [
      {
        q: "만든 URL QR 코드에 유효기간이 있나요?",
        a: "없습니다. 주소가 이미지에 직접 담기는 정적 QR이라 만료되지 않습니다. 다만 연결된 웹페이지가 사라지면 QR을 찍어도 그 페이지는 열리지 않으니, 링크가 오래 유지되는지 확인하세요.",
      },
      {
        q: "인쇄한 뒤에 연결 주소를 바꿀 수 있나요?",
        a: "바꿀 수 없습니다. 이 사이트는 나중에 내용을 고치는 동적 QR을 제공하지 않습니다. 주소가 바뀌면 새로 만들어 다시 인쇄해야 합니다.",
      },
      {
        q: "몇 명이 스캔했는지 알 수 있나요?",
        a: "이 사이트에서는 알 수 없습니다. 방문 수가 궁금하다면 링크에 utm 매개변수를 붙여 내 사이트의 방문 분석 도구에서 확인하는 방법이 있습니다.",
      },
      {
        q: "QR 코드 가운데에 가게 로고를 넣어도 되나요?",
        a: "꾸미기에서 중앙 로고를 넣을 수 있습니다. 로고가 코드 일부를 가리므로 복원력이 자동으로 최대로 고정됩니다. 그래도 인쇄 전에는 여러 기기로 스캔해 보세요.",
      },
    ],
  },

  social: {
    title: "SNS QR 코드 만들기",
    subtitle: "인스타그램, 유튜브, 카카오톡 채널을 아이디만으로 QR 코드로 만듭니다.",
    metaTitle: "SNS QR 코드 만들기 — 무료, 회원가입 없음",
    metaDescription:
      "인스타그램, 유튜브, 카카오톡 오픈채팅·채널, 네이버 블로그·스마트스토어 아이디를 넣으면 프로필로 연결되는 QR 코드가 만들어집니다. 무료, 회원가입 없음.",
    sections: {
      howTitle: "SNS QR 코드는 이렇게 동작합니다",
      how: [
        "플랫폼을 고르고 아이디만 입력하면 프로필 주소를 대신 만들어 QR에 담습니다. 인스타그램에 @mycafe 를 넣으면 https://www.instagram.com/mycafe/ 가, 카카오톡 오픈채팅에 링크 뒤 코드를 넣으면 https://open.kakao.com/o/코드 가 담기는 식입니다. 아이디 앞의 @는 빼도 되고 그대로 둬도 됩니다.",
        "앱에서 복사한 프로필 링크를 통째로 붙여 넣어도 됩니다. 어떤 플랫폼의 링크인지 자동으로 알아보고 해당 플랫폼을 골라 줍니다. 만들어진 주소는 “열리는 주소”에 표시됩니다.",
        "스캔하면 휴대폰에 해당 앱이 있으면 앱으로, 없으면 브라우저로 프로필이 열립니다. 팔로우나 채널 추가는 스캔한 사람이 직접 눌러야 하며, QR이 대신 해 주지는 않습니다.",
      ],
      usesTitle: "이럴 때 쓰세요",
      uses: [
        "카페 계산대에 인스타그램 QR을 두고 팔로우 이벤트를 안내합니다.",
        "매장 입구에 카카오톡 채널 QR을 붙여 두면 예약과 문의를 채널 채팅으로 받을 수 있습니다.",
        "동호회나 학부모 모임 안내문에 카카오톡 오픈채팅방 QR을 넣어 참여를 쉽게 합니다.",
        "스마트스토어 택배 상자에 넣는 감사 카드에 스토어나 네이버 블로그 QR을 인쇄합니다.",
      ],
      tipsTitle: "인쇄 전에 확인하세요",
      tips: [
        "아이디에 오타가 하나만 있어도 다른 사람의 계정이 열립니다. “열리는 주소”를 눌러 내 계정이 맞는지 꼭 확인하세요.",
        "인스타그램 아이디를 바꾸거나 오픈채팅방을 새로 만들면 주소가 달라져 예전 QR은 연결되지 않습니다. 바꿀 계획이 있다면 인쇄를 미루세요.",
        "“안내판 인쇄 / PDF”에는 “팔로우하기”가 기본 제목으로 들어갑니다. 보조 문구에 계정 이름이나 혜택을 적어 두면 왜 스캔해야 하는지 알 수 있습니다.",
        "계정 공개 범위도 확인하세요. 비공개 계정은 QR로 들어와도 게시물이 보이지 않습니다.",
      ],
    },
    faq: [
      {
        q: "카카오톡 오픈채팅 QR은 어떻게 만드나요?",
        a: "오픈채팅방에서 링크를 복사해 붙여 넣으세요. open.kakao.com/o/ 뒤의 코드만 입력해도 됩니다. 카카오톡이 설치된 휴대폰에서 스캔하면 해당 채팅방이 열립니다.",
      },
      {
        q: "목록에 없는 SNS도 만들 수 있나요?",
        a: "프로필 주소를 복사해 URL 형식으로 만들면 됩니다. 스캔했을 때 열리는 결과는 같습니다.",
      },
      {
        q: "인스타그램 앱이 없는 사람이 스캔하면 어떻게 되나요?",
        a: "브라우저에서 인스타그램 웹 페이지가 열립니다. 일부 내용은 로그인해야 볼 수 있습니다.",
      },
      {
        q: "QR 하나에 여러 SNS를 넣을 수 있나요?",
        a: "QR 하나에는 주소 하나만 담깁니다. 여러 계정을 함께 알리려면 Linktree 같은 링크 모음 페이지 주소로 QR을 만들거나, 플랫폼별 QR을 나란히 인쇄하세요.",
      },
    ],
  },

  whatsapp: {
    title: "WhatsApp QR 코드 만들기",
    subtitle: "스캔하면 내 번호와 첫 메시지가 채워진 WhatsApp 대화가 열립니다.",
    metaTitle: "WhatsApp QR 코드 만들기 — 무료, 회원가입 없음",
    metaDescription:
      "WhatsApp 번호와 첫 메시지를 넣으면 wa.me 링크 QR 코드를 만듭니다. 외국인 손님 문의나 해외 바이어 연락에 쓰기 좋습니다. 무료, 회원가입 없음.",
    sections: {
      howTitle: "WhatsApp QR 코드는 이렇게 동작합니다",
      how: [
        "WhatsApp QR에는 https://wa.me/821012345678?text=… 형태의 링크가 담깁니다. 스캔하면 WhatsApp이 열리면서 내 번호와의 대화 창이 뜨고, 입력해 둔 메시지가 입력란에 미리 들어가 있습니다. 상대가 전송을 눌러야 메시지가 보내집니다.",
        "번호는 국가 번호를 포함한 국제 형식이어야 합니다. 한국 휴대폰이라면 82 다음에 010의 맨 앞 0을 빼고 10-1234-5678을 이어 쓰세요. +, 공백, 하이픈은 자동으로 지워집니다.",
        "상대 휴대폰에 WhatsApp이 없으면 브라우저에서 설치 안내 페이지가 열립니다. 국내 손님은 대부분 카카오톡을 쓰므로, 국내용이라면 SNS 형식의 카카오톡 채널 QR이 더 맞을 수 있습니다.",
      ],
      usesTitle: "이럴 때 쓰세요",
      uses: [
        "외국인 손님이 많은 게스트하우스나 한옥 스테이 객실에 두고 체크인 문의를 받습니다.",
        "해외 바이어에게 건네는 명함 뒷면에 넣어 연락을 바로 이어 갑니다.",
        "투어·체험 업체가 “날짜와 인원을 적어 주세요” 같은 메시지를 미리 채워 두면 예약 문의에 답하기가 편해집니다.",
        "해외 전시회 부스에 세워 두고 상담 요청을 받습니다.",
      ],
      tipsTitle: "인쇄 전에 확인하세요",
      tips: [
        "+82 010…처럼 0을 남겨 쓰면 다른 번호로 연결됩니다. 만든 뒤 “열리는 주소”가 wa.me/8210… 으로 시작하는지 확인하세요.",
        "미리 채우는 메시지는 짧게 쓰세요. 한글은 주소 안에서 길게 변환되기 때문에 메시지가 조금만 길어져도 QR이 빠르게 촘촘해집니다.",
        "WhatsApp Business 앱을 쓰면 자동 인사말을 설정해 둘 수 있어 문의가 몰릴 때 도움이 됩니다.",
        "인쇄 전에 WhatsApp이 설치된 다른 휴대폰으로 스캔해 내 대화 창이 열리는지 확인하세요.",
      ],
    },
    faq: [
      {
        q: "WhatsApp이 없는 사람도 스캔할 수 있나요?",
        a: "스캔은 되지만 대화하려면 WhatsApp이 필요합니다. 앱이 없으면 설치 안내 화면이 나옵니다.",
      },
      {
        q: "한국 번호는 어떻게 입력하나요?",
        a: "+82 10-1234-5678 처럼 국가 번호 82를 붙이고 010의 0을 빼세요. 하이픈과 공백은 넣어도 자동으로 지워집니다.",
      },
      {
        q: "메시지 없이 대화 창만 열 수도 있나요?",
        a: "네. 메시지 칸을 비워 두면 wa.me/번호 만 담기고, 빈 대화 창이 열립니다.",
      },
      {
        q: "번호를 바꾸면 QR은 어떻게 되나요?",
        a: "번호가 이미지에 담기는 정적 QR이라 예전 번호로 계속 연결됩니다. 번호를 바꿨다면 새로 만들어 교체하세요.",
      },
    ],
  },

  text: {
    title: "텍스트 QR 코드 만들기",
    subtitle: "인터넷 연결 없이도 읽히는 짧은 글을 QR 코드에 담습니다.",
    metaTitle: "텍스트 QR 코드 만들기 — 무료, 회원가입 없음",
    metaDescription:
      "메모, 안내문, 관리 번호처럼 짧은 글을 그대로 QR 코드에 담습니다. 스캔하면 인터넷 연결 없이도 글이 보입니다. 무료, 회원가입 없음, 만료 없는 정적 QR.",
    sections: {
      howTitle: "텍스트 QR 코드는 이렇게 동작합니다",
      how: [
        "텍스트 QR은 입력한 글을 아무 변환 없이 그대로 담습니다. 링크가 아니므로 스캔해도 웹페이지가 열리지 않고, 휴대폰이 글 내용을 화면에 보여 줍니다. 글이 이미지 안에 있으니 인터넷이 없는 곳에서도 읽힙니다.",
        "글을 보여 주는 방식은 기기와 버전에 따라 다릅니다. 안드로이드의 Google 렌즈는 글을 띄우고 복사할 수 있게 해 주고, 아이폰 기본 카메라는 글을 짧게 표시하거나 검색을 제안합니다. 긴 글을 편하게 읽히려면 QR 스캐너 앱이 더 낫습니다.",
        "글자 수가 늘수록 코드가 촘촘해집니다. 한글은 한 글자가 영문 세 글자만큼 자리를 차지해 영문보다 훨씬 빨리 한계에 닿습니다. 입력칸 아래 글자 수를 보면서 몇 줄 이내로 줄이는 것이 좋습니다.",
      ],
      usesTitle: "이럴 때 쓰세요",
      uses: [
        "창고 선반이나 장비에 관리 번호와 점검 메모를 붙여 둡니다.",
        "방탈출, 보물찾기 같은 놀이에서 다음 힌트를 숨겨 둡니다.",
        "전시 작품 옆에 짧은 설명이나 작가의 말을 담아 둡니다.",
        "휴대폰 신호가 약한 산장이나 지하 공간에 비상 연락 안내를 남깁니다.",
      ],
      tipsTitle: "만들기 전에 확인하세요",
      tips: [
        "웹 주소를 담으려면 텍스트보다 URL 형식이 낫습니다. 주소 형식이 정확해야 휴대폰이 링크로 알아봅니다.",
        "꾸미기의 복원력을 “최대”로 올리면 같은 글이라도 코드가 더 촘촘해집니다. 글이 길면 “기본”으로 두세요. 그래도 너무 길면 QR에 담을 수 없다는 안내가 나옵니다.",
        "줄바꿈도 그대로 담기지만, 일부 스캐너는 줄바꿈을 무시하고 한 줄로 보여 주기도 합니다.",
        "글이 길어 코드가 촘촘하다면 인쇄 크기를 키우세요. 가까이서 찍는 라벨이라도 3cm 이상이 안전합니다.",
        "누구나 스캔해 읽을 수 있으니 비밀번호나 계좌번호 같은 민감한 정보는 넣지 마세요.",
      ],
    },
    faq: [
      {
        q: "텍스트 QR에는 몇 글자까지 들어가나요?",
        a: "글자 수보다 데이터 크기로 정해집니다. 영문과 숫자는 기본 복원력에서 2,000자 넘게 들어가지만, 한글은 그 3분의 1 정도입니다. 휴대폰으로 편하게 읽히는 길이는 수백 자 이내입니다.",
      },
      {
        q: "인터넷이 없어도 읽히나요?",
        a: "네. 글이 이미지 안에 들어 있어 스캔하는 순간 바로 보입니다.",
      },
      {
        q: "스캔했는데 아무 반응이 없어요.",
        a: "기본 카메라는 링크가 아닌 글을 눈에 잘 띄지 않게 표시하거나 아예 보여 주지 않을 때가 있습니다. Google 렌즈나 QR 스캐너 앱으로 다시 찍어 보세요.",
      },
      {
        q: "한글이 깨져 보여요.",
        a: "요즘 휴대폰은 대부분 한글을 정상으로 읽지만, 오래된 스캐너 앱에서는 글자가 깨질 수 있습니다. 기본 카메라나 Google 렌즈로 확인해 보세요.",
      },
    ],
  },

  wifi: {
    title: "Wi-Fi QR 코드 만들기",
    subtitle: "비밀번호를 불러 줄 필요 없이 스캔 한 번으로 Wi-Fi에 접속합니다.",
    metaTitle: "Wi-Fi QR 코드 만들기 — 무료, 회원가입 없음",
    metaDescription:
      "네트워크 이름과 비밀번호를 넣으면 스캔 한 번으로 연결되는 Wi-Fi QR 코드를 만듭니다. 카페·매장용 안내판도 A4로 바로 인쇄할 수 있습니다. 무료, 회원가입 없음.",
    sections: {
      howTitle: "Wi-Fi QR 코드는 이렇게 동작합니다",
      how: [
        "Wi-Fi QR에는 접속 정보가 정해진 형식의 글자로 담깁니다. 비밀번호가 있는 카페 손님용 공유기라면 WIFI:T:WPA;S:카페_게스트;P:비밀번호;; 처럼 들어갑니다. T는 암호화 방식, S는 네트워크 이름(SSID), P는 비밀번호이고, 숨겨진 네트워크라면 H:true; 가 덧붙습니다. 이름이나 비밀번호에 \\ ; , : 큰따옴표가 있으면 앞에 백슬래시를 붙여 자동으로 처리합니다.",
        "아이폰은 iOS 11부터 기본 카메라로 찍으면 네트워크 연결 알림이 뜨고, 누르면 바로 접속합니다. 안드로이드도 최근 기종은 기본 카메라나 Google 렌즈가 연결 버튼을 보여 줍니다.",
        "비밀번호가 QR 안에 그대로 들어 있어서, 안내판을 본 사람은 누구나 접속할 수 있고 스캐너 앱으로 비밀번호도 볼 수 있습니다. 손님용으로는 집이나 사무실 내부망과 분리된 게스트 네트워크를 쓰는 것이 안전합니다.",
      ],
      usesTitle: "이럴 때 쓰세요",
      uses: [
        "카페나 식당 테이블에 안내판을 세워 두면 비밀번호를 묻는 손님 응대가 줄어듭니다.",
        "펜션이나 에어비앤비 객실에 붙여 두면 손님이 긴 비밀번호를 따라 칠 필요가 없습니다.",
        "세미나나 워크숍 자료집 첫 장에 넣어 참석자가 바로 접속하게 합니다.",
        "집에 놀러 온 가족과 친구를 위해 공유기 옆에 붙여 둡니다.",
      ],
      tipsTitle: "인쇄 전에 확인하세요",
      tips: [
        "공유기 비밀번호를 바꾸면 예전 QR로는 접속되지 않습니다. 비밀번호를 바꾼 날 QR도 새로 만들어 교체하세요.",
        "네트워크 이름은 대소문자와 띄어쓰기까지 공유기 설정과 같아야 합니다. 2.4GHz와 5GHz 이름이 따로 있다면(예: MyHome, MyHome_5G) QR도 각각 만들어야 합니다.",
        "암호화 방식은 대부분 “WPA / WPA2 / WPA3”를 고르면 됩니다. WPA2나 WPA3 공유기도 이 항목으로 접속됩니다.",
        "“안내판 인쇄 / PDF”를 누르면 “Wi-Fi에 연결하세요” 제목과 네트워크 이름이 들어간 A4 안내판이 만들어집니다. 테이블에서 찍는다면 QR 한 변이 4cm 정도면 충분합니다.",
      ],
    },
    faq: [
      {
        q: "아이폰에서도 Wi-Fi QR이 되나요?",
        a: "네. iOS 11 이상이면 별도 앱 없이 기본 카메라로 찍어 접속할 수 있습니다.",
      },
      {
        q: "비밀번호를 바꾸면 QR도 다시 만들어야 하나요?",
        a: "네. 비밀번호가 이미지 안에 직접 담기는 정적 QR이라, 비밀번호가 바뀌면 예전 QR로는 접속이 실패합니다. 새로 만들어 붙여 주세요.",
      },
      {
        q: "스캔은 되는데 연결이 안 돼요.",
        a: "네트워크 이름과 비밀번호의 대소문자, 띄어쓰기, 암호화 방식을 확인하세요. 숨겨진 네트워크라면 “숨겨진 네트워크”를 체크해야 합니다. 오래된 안드로이드 기종은 기본 카메라가 Wi-Fi QR을 지원하지 않기도 합니다.",
      },
      {
        q: "비밀번호 없는 개방형 Wi-Fi도 만들 수 있나요?",
        a: "암호화 방식을 “없음 (개방형)”으로 고르면 비밀번호 없이 네트워크 이름만 담깁니다.",
      },
      {
        q: "QR을 보면 비밀번호가 드러나나요?",
        a: "QR 안에 비밀번호가 글자로 들어 있어 스캐너 앱으로 읽으면 누구나 볼 수 있습니다. 공개된 곳에 둔다면 게스트 네트워크를 쓰세요.",
      },
    ],
  },

  vcard: {
    title: "연락처(vCard) QR 코드 만들기",
    subtitle: "명함 정보를 스캔 한 번에 주소록에 저장되는 QR 코드로 만듭니다.",
    metaTitle: "연락처(vCard) QR 코드 만들기 — 무료, 회원가입 없음",
    metaDescription:
      "이름, 전화번호, 이메일, 회사를 넣으면 주소록에 바로 저장되는 vCard QR 코드를 만듭니다. 명함 뒷면이나 행사 이름표에 넣기 좋습니다. 무료, 회원가입 없음.",
    sections: {
      howTitle: "연락처 QR 코드는 이렇게 동작합니다",
      how: [
        "연락처 QR에는 vCard 3.0 형식의 전자 명함이 담깁니다. BEGIN:VCARD로 시작해 N(성;이름), FN(표시 이름), ORG(회사), TITLE(직함), TEL(전화), EMAIL, URL, ADR(주소), NOTE(메모)가 한 줄씩 들어가고 END:VCARD로 끝납니다. 휴대전화는 TEL;TYPE=CELL, 회사 전화는 TEL;TYPE=WORK로 구분됩니다.",
        "아이폰 기본 카메라로 찍으면 연락처 알림이 뜨고, 누르면 새 연락처 화면이 열립니다. 안드로이드는 기본 카메라나 Google 렌즈가 연락처 추가를 제안합니다. 어느 쪽이든 저장 버튼은 받는 사람이 직접 누릅니다.",
        "정보가 QR 안에 직접 들어 있어 인터넷이 없어도 저장되고, 연락처를 보여 주는 별도의 웹페이지도 필요 없습니다. 대신 사진은 넣을 수 없고, 이직이나 번호 변경이 있으면 새로 만들어야 합니다.",
      ],
      usesTitle: "이럴 때 쓰세요",
      uses: [
        "종이 명함 뒷면에 넣어 두면 받은 사람이 번호를 일일이 입력하지 않아도 됩니다.",
        "박람회나 세미나 이름표에 넣어 명함이 떨어진 상황에서도 연락처를 주고받습니다.",
        "부동산이나 보험 상담처럼 고객이 담당자 번호를 저장해 둬야 하는 업무에서 상담 자료 끝에 넣습니다.",
        "제품 설명서에 고객센터 연락처를 넣어 두면 필요할 때 바로 찾을 수 있습니다.",
      ],
      tipsTitle: "인쇄 전에 확인하세요",
      tips: [
        "항목이 많을수록 코드가 촘촘해집니다. 명함처럼 작게 인쇄한다면 이름, 휴대전화, 이메일, 회사 정도만 넣고 주소와 메모는 빼는 편이 잘 읽힙니다.",
        "명함에는 최소 2cm, 가능하면 2.5cm 이상으로 인쇄하세요. 로고를 넣으면 복원력이 최대로 올라가 코드가 더 촘촘해지므로 명함에는 로고 없이 쓰는 것을 권합니다.",
        "해외 연락처가 많은 분이라면 휴대전화를 +82 10-1234-5678 형식으로 적어 두세요. 외국에서 저장한 사람도 바로 걸 수 있습니다.",
        "인쇄 전에 아이폰과 안드로이드에 각각 저장해 보고 이름과 회사명이 원하는 대로 들어가는지 확인하세요.",
      ],
    },
    faq: [
      {
        q: "QR로 연락처를 저장하려면 앱이 필요한가요?",
        a: "아니요. 최근 아이폰과 안드로이드폰은 기본 카메라만으로 연락처 저장 화면을 엽니다.",
      },
      {
        q: "프로필 사진도 넣을 수 있나요?",
        a: "넣을 수 없습니다. 사진은 데이터가 커서 QR 하나에 담기 어렵습니다. 대신 웹사이트 칸에 내 소개 페이지 주소를 넣을 수 있습니다.",
      },
      {
        q: "번호가 바뀌면 QR도 바꿔야 하나요?",
        a: "네. 연락처가 이미지 안에 그대로 담기는 방식이라, 바뀐 정보를 반영하려면 새로 만들어 다시 인쇄해야 합니다.",
      },
      {
        q: "카카오톡 아이디도 넣을 수 있나요?",
        a: "전용 칸은 없습니다. 메모 칸에 “카카오톡: 아이디”처럼 적으면 연락처 메모에 함께 저장됩니다.",
      },
    ],
  },

  email: {
    title: "이메일 QR 코드 만들기",
    subtitle: "받는 사람과 제목이 채워진 메일 작성 화면을 바로 엽니다.",
    metaTitle: "이메일 QR 코드 만들기 — 무료, 회원가입 없음",
    metaDescription:
      "받는 사람, 제목, 본문을 넣으면 스캔하자마자 메일 작성 화면이 열리는 QR 코드를 만듭니다. 문의 접수나 지원서 제출 안내에 쓰기 좋습니다. 무료, 회원가입 없음.",
    sections: {
      howTitle: "이메일 QR 코드는 이렇게 동작합니다",
      how: [
        "이메일 QR에는 mailto: 로 시작하는 주소가 담깁니다. 받는 사람만 넣으면 mailto:help@example.com, 제목과 본문까지 넣으면 mailto:help@example.com?subject=…&body=… 형태가 되고, 한글은 주소에 쓸 수 있는 형태로 변환되어 들어갑니다.",
        "스캔하면 휴대폰의 기본 메일 앱이 열리고 받는 사람, 제목, 본문이 미리 채워져 있습니다. 아이폰은 기본 메일 앱이나 기본으로 정해 둔 다른 메일 앱으로, 안드로이드는 Gmail 같은 기본 앱으로 열립니다. 보내기는 스캔한 사람이 직접 누릅니다.",
        "휴대폰에 메일 계정이 설정되어 있지 않으면 작성 화면 대신 계정 추가 화면부터 나올 수 있습니다. 중요한 접수라면 메일 주소를 QR 옆에 글자로도 적어 두세요.",
      ],
      usesTitle: "이럴 때 쓰세요",
      uses: [
        "매장 안내문에 대관 문의 메일 QR을 넣고 제목을 “단체 예약 문의”로 채워 두면 메일을 분류하기 쉽습니다.",
        "채용 공고 포스터에 지원 메일 주소를 넣고, 본문에 “이름 / 지원 분야 / 연락처” 양식을 미리 적어 둡니다.",
        "제품 설명서에 A/S 문의 메일을 넣고 제목에 모델명을 채워 두면 어떤 제품 문의인지 바로 알 수 있습니다.",
        "학교나 학원 가정통신문에 회신용 메일 주소를 넣습니다.",
      ],
      tipsTitle: "인쇄 전에 확인하세요",
      tips: [
        "한글은 주소로 변환되면서 한 글자가 아홉 자 길이로 늘어납니다. 본문은 양식 한두 줄로 줄여야 QR이 지나치게 촘촘해지지 않습니다.",
        "받는 주소에 오타가 없는지 꼭 확인하세요. 만든 뒤 직접 스캔해 테스트 메일을 한 통 보내 보면 가장 확실합니다.",
        "인쇄물에 실린 주소에는 스팸이 올 수 있습니다. 개인 주소보다 문의용 주소를 쓰는 편이 좋습니다.",
        "작게 인쇄할 때는 제목만 넣고 본문은 비워 두는 것이 스캔에 유리합니다.",
      ],
    },
    faq: [
      {
        q: "QR을 찍으면 메일이 바로 보내지나요?",
        a: "아니요. 작성 화면만 열리고, 보내기는 스캔한 사람이 누릅니다. 내용을 고친 뒤 보낼 수도 있습니다.",
      },
      {
        q: "받는 사람을 여러 명 넣을 수 있나요?",
        a: "받는 사람 칸에 쉼표로 이어 쓰면 대부분의 메일 앱이 여러 명으로 인식합니다. 앱마다 처리가 다를 수 있으니 직접 시험해 보세요.",
      },
      {
        q: "Gmail 앱으로 열리게 할 수 있나요?",
        a: "어떤 앱으로 열릴지는 스캔하는 사람의 기본 메일 앱 설정에 따릅니다. QR 쪽에서 정할 수는 없습니다.",
      },
      {
        q: "네이버 메일 주소도 되나요?",
        a: "네. naver.com, daum.net 등 어떤 메일 주소든 받는 사람 칸에 넣을 수 있습니다.",
      },
    ],
  },

  sms: {
    title: "문자(SMS) QR 코드 만들기",
    subtitle: "번호와 내용이 채워진 문자 작성 화면을 스캔 한 번에 엽니다.",
    metaTitle: "문자(SMS) QR 코드 만들기 — 무료, 회원가입 없음",
    metaDescription:
      "받는 번호와 메시지를 넣으면 스캔하자마자 문자 작성 화면이 열리는 QR 코드를 만듭니다. 대기 접수, 경품 응모, 민원 접수 안내에 씁니다. 무료, 회원가입 없음.",
    sections: {
      howTitle: "문자 QR 코드는 이렇게 동작합니다",
      how: [
        "문자 QR에는 SMSTO:01012345678:예약 확인 부탁드립니다 처럼 SMSTO: 다음에 번호와 메시지가 콜론으로 이어져 담깁니다. 번호에 넣은 하이픈과 공백은 자동으로 지워지고 숫자와 + 기호만 남습니다.",
        "스캔하면 휴대폰의 기본 메시지 앱이 열리고 받는 번호와 내용이 채워져 있습니다. 아이폰과 안드로이드 모두 기본 카메라로 이 형식을 알아봅니다. 전송은 스캔한 사람이 직접 누르며, 문자 요금은 보내는 사람의 요금제에 따릅니다.",
        "메시지 앱이나 스캐너에 따라 번호만 채워지고 내용이 빠지는 경우가 드물게 있습니다. 꼭 필요한 문구라면 안내판에도 같은 내용을 적어 두세요.",
      ],
      usesTitle: "이럴 때 쓰세요",
      uses: [
        "식당 입구 대기 안내판에 “대기 등록” 문구를 채운 문자 QR을 두고 순서를 문자로 받습니다.",
        "행사장 경품 응모를 정해진 키워드 문자로 받을 때 씁니다.",
        "아파트 관리사무소 공지문에 민원 접수 번호를 넣어 둡니다.",
        "자동차 앞 유리 연락처 카드에 넣어 두면 상대가 번호를 입력하지 않고 문자를 보낼 수 있습니다. 다만 번호가 그대로 드러난다는 점은 감안하세요.",
      ],
      tipsTitle: "인쇄 전에 확인하세요",
      tips: [
        "메시지는 짧게 쓰세요. 길어지면 장문 문자로 바뀌어 보내는 사람 요금이 달라질 수 있고, QR도 촘촘해집니다.",
        "받는 번호가 1588 같은 대표번호라면 문자 수신이 되는 번호인지 먼저 확인하세요.",
        "인쇄 전에 아이폰과 안드로이드로 하나씩 스캔해 번호와 내용이 모두 채워지는지 확인하세요.",
        "안내판에 “스캔한 뒤 전송 버튼을 눌러 주세요”처럼 다음 행동을 적어 두면 작성 화면에서 멈추는 사람이 줄어듭니다.",
      ],
    },
    faq: [
      {
        q: "QR을 찍으면 문자가 자동으로 보내지나요?",
        a: "아니요. 작성 화면만 열립니다. 스캔한 사람이 내용을 확인하고 전송을 눌러야 보내집니다.",
      },
      {
        q: "아이폰에서도 되나요?",
        a: "네. 아이폰 기본 카메라도 SMSTO 형식을 알아보고 메시지 앱을 엽니다.",
      },
      {
        q: "카카오톡으로 보내게 할 수는 없나요?",
        a: "문자 QR은 휴대폰 문자 앱만 엽니다. 카카오톡으로 연락받고 싶다면 SNS 형식에서 카카오톡 채널이나 오픈채팅 QR을 만드세요.",
      },
      {
        q: "받는 번호를 여러 개 넣을 수 있나요?",
        a: "QR 하나에는 번호 하나만 넣을 수 있습니다. 담당자가 여럿이라면 번호별로 QR을 따로 만드세요.",
      },
    ],
  },

  phone: {
    title: "전화번호 QR 코드 만들기",
    subtitle: "번호를 누를 필요 없이 스캔 한 번으로 전화를 겁니다.",
    metaTitle: "전화번호 QR 코드 만들기 — 무료, 회원가입 없음",
    metaDescription:
      "전화번호를 넣으면 스캔해서 바로 전화를 걸 수 있는 QR 코드를 만듭니다. 배달 주문, 매장 예약, 관리실 연락처 안내에 씁니다. 무료, 회원가입 없음, 만료 없음.",
    sections: {
      howTitle: "전화번호 QR 코드는 이렇게 동작합니다",
      how: [
        "전화번호 QR에는 tel:0212345678 처럼 tel: 다음에 번호가 담깁니다. 입력할 때 넣은 하이픈, 괄호, 공백은 자동으로 지워지고 숫자와 + 기호만 남습니다.",
        "스캔하면 휴대폰이 번호를 알아보고 전화 걸기를 제안합니다. 아이폰은 알림을 누르면 통화 확인 버튼이 나오고, 안드로이드는 번호가 입력된 전화 앱이 열립니다. 어느 쪽이든 한 번 더 누르는 단계를 거치므로 의도치 않게 전화가 걸리지는 않습니다.",
        "번호가 이미지에 담기는 정적 QR이라 전화번호가 바뀌면 새로 만들어야 합니다. 통화 연결 여부나 스캔 수는 따로 기록되지 않습니다.",
      ],
      usesTitle: "이럴 때 쓰세요",
      uses: [
        "배달 전단지나 매장 스티커에 넣어 주문 전화를 쉽게 받습니다.",
        "엘리베이터나 건물 입구에 관리실, 고장 신고 번호를 붙여 둡니다.",
        "아이 가방이나 반려동물 이름표에 보호자 번호를 넣어 둡니다.",
        "공사 현장 안내판에 민원 담당자 연락처를 넣습니다.",
      ],
      tipsTitle: "인쇄 전에 확인하세요",
      tips: [
        "외국인이 스캔할 수도 있다면 +82-2-1234-5678 처럼 국가 번호를 붙이고 지역번호 앞의 0을 빼세요. 국내에서만 쓴다면 02-1234-5678 그대로도 됩니다.",
        "1588, 1544 같은 대표번호도 그대로 넣으면 됩니다.",
        "번호만 담긴 QR은 코드가 단순해서 작게 인쇄해도 잘 읽힙니다. 가까이서 찍는 이름표나 스티커라면 2cm 정도면 충분합니다.",
        "QR만 두지 말고 번호를 글자로도 함께 적어 두세요. 카메라를 쓰기 어려운 분도 전화할 수 있습니다.",
      ],
    },
    faq: [
      {
        q: "QR을 찍으면 바로 전화가 걸리나요?",
        a: "아니요. 번호가 입력된 화면이나 통화 확인 버튼이 먼저 나오고, 스캔한 사람이 눌러야 연결됩니다.",
      },
      {
        q: "내선 번호까지 넣을 수 있나요?",
        a: "이 생성기는 숫자와 + 기호만 남기므로 내선 번호를 자동으로 누르게 할 수는 없습니다. 내선은 안내판에 따로 적어 두세요.",
      },
      {
        q: "태블릿으로 찍으면 어떻게 되나요?",
        a: "통화 기능이 없는 기기에서는 전화가 연결되지 않거나, 연동된 휴대폰으로 넘기라는 안내가 나올 수 있습니다.",
      },
      {
        q: "번호가 바뀌면 어떻게 하나요?",
        a: "QR을 새로 만들어 교체해야 합니다. 예전 QR은 계속 예전 번호로 연결됩니다.",
      },
    ],
  },

  geo: {
    title: "위치 QR 코드 만들기",
    subtitle: "위도와 경도를 담아, 스캔하면 지도 앱에서 그 지점을 보여 줍니다.",
    metaTitle: "위치 QR 코드 만들기 — 무료, 회원가입 없음",
    metaDescription:
      "위도와 경도를 넣으면 스캔해서 지도 앱으로 위치를 여는 QR 코드를 만듭니다. 주소로 찾기 어려운 행사장 입구, 주차장, 등산로 들머리 안내에 씁니다. 무료, 회원가입 없음.",
    sections: {
      howTitle: "위치 QR 코드는 이렇게 동작합니다",
      how: [
        "위치 QR에는 geo:37.5663,126.9779 처럼 geo: 다음에 위도와 경도가 쉼표로 이어져 담깁니다. 주소가 아니라 좌표이므로 이름 없는 공터나 큰 공원의 특정 출입구처럼 주소로 짚기 어려운 곳을 정확히 가리킬 수 있습니다.",
        "안드로이드에서는 스캔하면 Google 지도 등 설치된 지도 앱으로 열 수 있습니다. 아이폰 기본 카메라는 geo: 형식을 지도 앱으로 넘기지 못할 때가 있어, 좌표가 글자로만 보이기도 합니다.",
        "좌표는 입력 화면의 “현재 위치” 버튼으로 채울 수 있습니다. 그 장소에 서서 누르면 휴대폰 위치가 들어갑니다. 멀리서 만들 때는 Google 지도에서 원하는 지점을 길게 누르거나 오른쪽 클릭하면 위도와 경도가 나옵니다. 네이버 지도나 카카오맵을 쓰는 사람이 많다면, 그 앱에서 장소를 공유해 받은 링크로 URL QR을 만드는 편이 더 잘 열립니다.",
      ],
      usesTitle: "이럴 때 쓰세요",
      uses: [
        "넓은 축제장이나 행사장에서 주차장, 셔틀 승차장 위치를 안내합니다.",
        "등산로 들머리나 낚시 포인트처럼 주소가 없는 곳을 모임 공지에 공유합니다.",
        "물류 창고나 공장 부지에서 협력 업체에 출입 게이트 위치를 알려 줍니다.",
        "청첩장이나 초대장에 식장 위치를 넣을 때는 아이폰 하객을 생각해 지도 앱 공유 링크로 만든 URL QR을 함께 쓰는 것이 좋습니다.",
      ],
      tipsTitle: "인쇄 전에 확인하세요",
      tips: [
        "위도는 북쪽, 경도는 동쪽이 양수입니다. 한국은 대략 위도 33~38, 경도 124~132 사이이니 두 값을 바꿔 넣지 않았는지 확인하세요.",
        "소수점 아래 다섯 자리면 1m 남짓까지 정확합니다. 그보다 길게 넣으면 QR만 촘촘해집니다.",
        "건물 안에서는 GPS 오차가 커서 “현재 위치”가 어긋날 수 있습니다. 실내라면 지도에서 지점을 직접 찍어 좌표를 얻으세요.",
        "만든 뒤 아이폰과 안드로이드로 각각 스캔해 지도에 핀이 제자리에 찍히는지 확인하세요.",
      ],
    },
    faq: [
      {
        q: "주소를 넣어서 만들 수는 없나요?",
        a: "위치 형식은 좌표만 받습니다. 주소로 안내하고 싶다면 네이버 지도, 카카오맵, Google 지도에서 장소 공유 링크를 복사해 URL 형식으로 만드세요.",
      },
      {
        q: "아이폰에서 지도가 안 열려요.",
        a: "아이폰 기본 카메라는 geo: 좌표를 지도로 바로 열지 못하는 경우가 있습니다. 아이폰 사용자가 많다면 지도 앱 공유 링크로 URL QR을 만드는 것을 권합니다.",
      },
      {
        q: "네이버 지도로 열리게 할 수 있나요?",
        a: "geo: 좌표는 휴대폰이 고른 지도 앱으로 열립니다. 특정 앱으로 열리게 하려면 그 앱의 공유 링크로 URL QR을 만드세요.",
      },
      {
        q: "좌표는 어디서 구하나요?",
        a: "그 장소에서 “현재 위치” 버튼을 누르거나, Google 지도에서 지점을 길게 누르면 나오는 숫자 두 개(위도, 경도)를 옮겨 적으면 됩니다.",
      },
    ],
  },

  event: {
    title: "일정 QR 코드 만들기",
    subtitle: "스캔하면 행사 일정이 휴대폰 캘린더에 바로 추가됩니다.",
    metaTitle: "일정 QR 코드 만들기 — 무료, 회원가입 없음",
    metaDescription:
      "일정 제목, 시간, 장소를 넣으면 스캔해서 캘린더에 추가하는 QR 코드를 만듭니다. 청첩장, 설명회, 학부모 모임 안내에 쓰기 좋습니다. 무료, 회원가입 없음.",
    sections: {
      howTitle: "일정 QR 코드는 이렇게 동작합니다",
      how: [
        "일정 QR에는 iCalendar 형식의 일정 하나가 담깁니다. BEGIN:VEVENT 다음에 SUMMARY(제목), DTSTART와 DTEND(시작과 종료), LOCATION(장소), DESCRIPTION(설명)이 한 줄씩 들어가고 END:VEVENT로 끝납니다.",
        "시각은 UTC 기준으로 바뀌어 담깁니다. 한국 시간 10월 17일 오전 11시라면 DTSTART:20261017T020000Z가 되고, 스캔한 휴대폰은 이를 자기 시간대로 바꿔 보여 줍니다. “하루 종일”을 고르면 DTSTART;VALUE=DATE:20261017 처럼 날짜만 담기고, 종료일은 표준에 따라 다음 날짜로 들어갑니다.",
        "아이폰 기본 카메라와 안드로이드의 Google 렌즈는 대부분 일정 추가를 제안합니다. 스캐너 앱에 따라 내용을 글자로만 보여 주기도 합니다. 반복 일정이나 알림은 담기지 않습니다.",
      ],
      usesTitle: "이럴 때 쓰세요",
      uses: [
        "청첩장이나 돌잔치 초대장에 예식 일시와 장소를 담아 하객이 날짜를 놓치지 않게 합니다.",
        "신제품 설명회나 세미나 포스터에 넣어 관심 있는 사람이 바로 일정에 넣게 합니다.",
        "학교나 학원 가정통신문에 상담 주간이나 발표회 일정을 넣습니다.",
        "동창회, 동호회 정기 모임 공지에 넣어 참석자가 각자 캘린더에 옮겨 적는 수고를 줄입니다.",
      ],
      tipsTitle: "인쇄 전에 확인하세요",
      tips: [
        "입력한 시각은 QR을 만드는 브라우저의 시간대를 기준으로 변환됩니다. 해외 출장 중이라면 컴퓨터 시간대가 한국으로 되어 있는지 확인하세요.",
        "종료 시각을 비워 두면 시작 시각과 같은 시각으로 들어갑니다. 캘린더에 일정 길이가 보이도록 종료 시각을 넣어 주세요.",
        "일정은 줄 수가 많아 다른 형식보다 코드가 빨리 촘촘해집니다. 설명은 한두 줄로 줄이고 자세한 안내는 인쇄물 본문에 적으세요.",
        "인쇄 전에 아이폰과 안드로이드로 직접 추가해 보고 날짜와 시각이 맞는지 확인하세요.",
      ],
    },
    faq: [
      {
        q: "일정 QR을 찍으면 자동으로 캘린더에 들어가나요?",
        a: "추가 화면이 먼저 열리고, 스캔한 사람이 저장을 눌러야 들어갑니다.",
      },
      {
        q: "일정이 바뀌면 QR도 바꿔야 하나요?",
        a: "네. 일정이 이미지 안에 담기는 정적 QR이라 새로 만들어야 하고, 이미 캘린더에 넣은 사람의 일정도 자동으로 바뀌지 않습니다. 변경 사실은 따로 알려 주세요.",
      },
      {
        q: "외국에서 찍으니 시간이 다르게 보여요.",
        a: "정상입니다. 일정은 UTC로 담겨 스캔한 휴대폰의 시간대에 맞춰 표시됩니다. 한국 시간으로 환산하면 같은 시각입니다.",
      },
      {
        q: "알림도 함께 설정되나요?",
        a: "알림은 담기지 않습니다. 캘린더에 추가한 뒤 각자 알림을 설정해야 합니다.",
      },
    ],
  },

  payment: {
    title: "PayPal·결제 링크 QR 코드 만들기",
    subtitle: "PayPal.Me 같은 해외 결제 링크를 금액까지 담아 QR 코드로 만듭니다.",
    metaTitle: "PayPal·결제 링크 QR 코드 만들기 — 무료, 회원가입 없음",
    metaDescription:
      "PayPal.Me, Venmo, Cash App, Ko-fi, Buy Me a Coffee 등 결제·후원 링크를 QR 코드로 만듭니다. 해외 고객 결제나 후원 안내에 씁니다. 무료, 회원가입 없음.",
    sections: {
      howTitle: "결제 링크 QR 코드는 이렇게 동작합니다",
      how: [
        "결제 QR에는 각 서비스의 결제 페이지 주소가 담깁니다. PayPal.Me에 사용자 이름 mystudio와 금액 25를 넣으면 https://paypal.me/mystudio/25 가 되고, 스캔한 사람에게는 그 금액이 채워진 송금 화면이 열립니다. 금액을 비워 두면 보내는 사람이 직접 정합니다.",
        "금액을 미리 넣을 수 있는 곳은 PayPal, Venmo, Cash App 세 곳입니다. Buy Me a Coffee, Ko-fi, Patreon, Revolut.Me, Wise는 페이지만 열리고 금액은 상대가 정합니다. 결제는 각 서비스 안에서 이뤄지며, 이 사이트는 링크를 QR로 바꿀 뿐 돈의 흐름에 관여하지 않습니다.",
        "모두 해외 서비스입니다. Venmo와 Cash App은 주로 미국 사용자가 쓰므로 국내 손님에게는 맞지 않습니다. 카카오페이, 네이버페이, 토스 같은 국내 간편결제는 전용 형식이 없고, 해당 서비스에서 받은 결제·송금 링크가 있다면 URL 형식으로 QR을 만들 수 있습니다.",
      ],
      usesTitle: "이럴 때 쓰세요",
      uses: [
        "외국인 관광객이 많이 찾는 공방이나 체험 클래스에서 PayPal 결제 안내판으로 씁니다.",
        "해외 구독자가 있는 유튜버나 일러스트레이터가 방송 화면, 굿즈에 Ko-fi나 Buy Me a Coffee 후원 QR을 넣습니다.",
        "해외 클라이언트에게 보내는 인보이스 끝에 금액이 담긴 PayPal.Me QR을 넣어 송금을 빠르게 받습니다.",
        "해외 공연이나 버스킹에서 후원 QR을 세워 둡니다.",
      ],
      tipsTitle: "인쇄 전에 확인하세요",
      tips: [
        "사용자 이름이 한 글자만 틀려도 다른 사람에게 돈이 갈 수 있습니다. “열리는 주소”를 눌러 내 결제 페이지가 맞는지 꼭 확인하세요.",
        "금액은 숫자로, 소수점 아래 두 자리까지 넣습니다. 통화는 서비스와 계정 설정을 따르므로 실제로 열어 보고 어떤 통화로 표시되는지 확인하세요.",
        "금액을 넣은 QR은 그 금액 전용입니다. 가격이 여러 가지라면 금액 없는 QR 하나를 두는 편이 관리하기 쉽습니다.",
        "공개된 곳의 결제 QR 위에 다른 QR 스티커를 덧붙이는 수법이 있습니다. 안내판은 가끔 직접 스캔해 확인하세요.",
      ],
    },
    faq: [
      {
        q: "PayPal QR 코드는 어떻게 만드나요?",
        a: "PayPal에서 PayPal.Me 링크를 먼저 만든 뒤, 그 사용자 이름을 넣거나 paypal.me 주소를 통째로 붙여 넣으면 됩니다.",
      },
      {
        q: "카카오페이나 토스로도 받을 수 있나요?",
        a: "전용 형식은 없습니다. 해당 서비스에서 받은 결제·송금 링크가 있다면 URL 형식으로 QR을 만들 수 있습니다. 링크 유효기간은 각 서비스 정책을 확인하세요.",
      },
      {
        q: "수수료가 있나요?",
        a: "QR을 만드는 데는 비용이 들지 않습니다. 결제 수수료는 PayPal 등 각 서비스의 정책을 따릅니다.",
      },
      {
        q: "Ko-fi에는 왜 금액을 넣을 수 없나요?",
        a: "Ko-fi, Buy Me a Coffee, Patreon, Revolut.Me, Wise는 이 생성기에서 금액을 미리 채우는 형식을 지원하지 않습니다. 페이지가 열린 뒤 보내는 사람이 금액을 고릅니다.",
      },
    ],
  },

  crypto: {
    title: "비트코인·암호화폐 QR 코드 만들기",
    subtitle: "지갑 주소와 금액을 담아, 스캔하면 지갑 앱 송금 화면에 채워집니다.",
    metaTitle: "비트코인·암호화폐 QR 코드 만들기 — 무료, 회원가입 없음",
    metaDescription:
      "비트코인, 이더리움, 라이트코인, 도지코인, 솔라나 지갑 주소를 QR 코드로 만듭니다. 비트코인은 BIP-21 형식이라 금액도 함께 담을 수 있습니다. 무료, 회원가입 없음.",
    sections: {
      howTitle: "암호화폐 QR 코드는 이렇게 동작합니다",
      how: [
        "비트코인 QR은 BIP-21이라는 표준 형식을 따릅니다. 주소만 넣으면 bitcoin:bc1q… 가, 금액과 라벨을 넣으면 bitcoin:bc1q…?amount=0.001&label=… 이 담깁니다. 지갑 앱으로 스캔하면 받는 주소와 금액이 송금 화면에 채워지고, 보내는 사람이 확인한 뒤 전송합니다.",
        "라이트코인, 도지코인, 비트코인 캐시, 솔라나도 litecoin:, dogecoin: 같은 접두어가 붙는 같은 방식이며 금액을 넣을 수 있습니다. 금액은 소수점 아래 여덟 자리까지 입력합니다. 이더리움은 주소만 담기고, 이 생성기에서는 금액을 미리 넣을 수 없습니다.",
        "휴대폰 기본 카메라로 찍으면 주소가 글자로 보이거나 설치된 지갑 앱을 열자고 제안합니다. 실제 송금은 지갑 앱에서만 이뤄지므로, 안내판에는 어떤 코인을 받는지 분명히 적어 두세요.",
      ],
      usesTitle: "이럴 때 쓰세요",
      uses: [
        "오픈소스 프로젝트나 개인 블로그의 후원 주소를 공개할 때 씁니다.",
        "콘퍼런스 발표 자료 마지막 장에 후원용 지갑 주소를 넣습니다.",
        "내 다른 지갑으로 옮길 때 받을 주소를 QR로 띄워 두면, 보내는 기기로 찍기만 하면 되어 긴 주소를 손으로 옮기지 않아도 됩니다.",
      ],
      tipsTitle: "공개하기 전에 확인하세요",
      tips: [
        "주소를 붙여 넣은 뒤 앞 네 자리와 끝 네 자리를 지갑에 표시된 주소와 직접 비교하세요. 암호화폐 송금은 잘못 보내면 되돌릴 수 없습니다.",
        "코인 종류를 정확히 고르세요. 네트워크가 다른 곳으로 보내면 돈을 잃을 수 있습니다. 이더리움 계열 토큰을 받는다면 어느 네트워크인지 안내판에 적어 두세요.",
        "개인 키나 복구 문구(시드 문구)는 절대 QR로 만들지 마세요. 이 형식은 받는 주소용입니다. QR을 저장하거나 복사할 때 입력 내용이 서버에 기록될 수 있다는 점도 기억하세요.",
        "공개된 곳에 붙인 QR은 다른 스티커로 덮어씌우는 수법이 있으니 주기적으로 확인하세요.",
      ],
    },
    faq: [
      {
        q: "이더리움 QR에 금액을 넣을 수 있나요?",
        a: "이 생성기에서는 안 됩니다. 이더리움은 주소만 담기고, 보내는 사람이 지갑 앱에서 금액을 입력합니다.",
      },
      {
        q: "거래소 입금 주소도 쓸 수 있나요?",
        a: "주소 형식만 맞으면 QR로 만들 수 있습니다. 다만 거래소 입금 주소는 바뀌거나 별도 조건이 붙는 경우가 있으니 거래소 안내를 먼저 확인하세요.",
      },
      {
        q: "잘못된 주소로 보냈어요. 취소할 수 있나요?",
        a: "블록체인 송금은 취소할 수 없습니다. 그래서 QR을 공개하기 전에 소액을 직접 보내 시험해 보는 것을 권합니다.",
      },
      {
        q: "라벨에는 무엇을 쓰나요?",
        a: "받는 사람이나 용도를 짧게 적습니다. “블로그 후원”처럼 쓰면 지갑 앱에 따라 송금 화면에 표시됩니다. 최대 60자까지 담깁니다.",
      },
    ],
  },

  file: {
    title: "PDF QR 코드 만들기",
    subtitle: "드라이브에 올려 둔 PDF의 공유 링크를 QR 코드로 만듭니다.",
    metaTitle: "PDF QR 코드 만들기 — 무료, 회원가입 없음",
    metaDescription:
      "Google Drive나 Dropbox에 올린 PDF 공유 링크를 QR 코드로 만듭니다. 메뉴판, 사용 설명서, 카탈로그를 스캔 한 번에 열 수 있습니다. 무료, 회원가입 없음.",
    sections: {
      howTitle: "PDF QR 코드는 이렇게 동작합니다",
      how: [
        "PDF QR은 파일 자체가 아니라 파일이 있는 곳의 주소를 담습니다. QR 하나에 담을 수 있는 데이터는 3KB 남짓이라 PDF를 통째로 넣을 수 없기 때문입니다. 이 사이트에는 파일을 올려 두는 기능이 없으니, 먼저 Google Drive, Dropbox, 내 웹사이트 같은 곳에 PDF를 올리고 공유 링크를 붙여 넣으세요.",
        "스캔하면 휴대폰 브라우저에서 링크가 열리고, Drive나 Dropbox의 미리보기 화면으로 PDF가 보입니다. 주소 앞의 https:// 는 생략해도 자동으로 붙고, javascript: 나 data: 로 시작하는 주소는 만들지 않습니다.",
        "QR 자체는 만료되지 않지만 링크가 살아 있어야 열립니다. 파일을 지우거나 공유를 끄면 인쇄한 QR로는 더 이상 파일을 열 수 없습니다.",
      ],
      usesTitle: "이럴 때 쓰세요",
      uses: [
        "식당 메뉴판 PDF를 테이블 QR에 연결해 두면 메뉴가 바뀔 때 파일만 고쳐 올리면 됩니다.",
        "제품 상자에 사용 설명서 PDF를 연결해 종이 설명서를 줄입니다.",
        "세미나 마지막 슬라이드에 발표 자료 PDF QR을 띄워 참석자에게 나눠 줍니다.",
        "학원 상담실에 수강료와 시간표 안내 PDF QR을 붙여 둡니다.",
      ],
      tipsTitle: "인쇄 전에 확인하세요",
      tips: [
        "Google Drive에서는 일반 액세스를 “링크가 있는 모든 사용자”로 바꿔야 합니다. 그대로 두면 스캔한 사람에게 권한 요청 화면이 뜹니다.",
        "내용을 고칠 때는 새 파일로 올리지 말고 Google Drive의 “버전 관리”로 같은 파일을 덮어쓰세요. 링크가 그대로 유지되어 인쇄한 QR을 계속 쓸 수 있습니다.",
        "휴대폰에서 열기 좋게 PDF 용량을 줄이세요. 수십 MB짜리 파일은 데이터가 느린 곳에서 잘 열리지 않습니다.",
        "만든 뒤 내 계정에 로그인하지 않은 휴대폰이나 시크릿 창에서 열어 보고 누구나 볼 수 있는지 확인하세요.",
        "PDF 여러 개에 각각 QR이 필요하다면 일괄 생성에 링크 목록을 붙여 넣어 최대 200개까지 ZIP으로 받을 수 있습니다.",
      ],
    },
    faq: [
      {
        q: "PDF 파일을 직접 올려서 QR을 만들 수 있나요?",
        a: "아니요. 이 사이트는 파일을 보관하지 않습니다. Google Drive, Dropbox, 내 웹사이트 등에 올린 뒤 그 공유 링크로 QR을 만드세요.",
      },
      {
        q: "PDF 내용을 바꾸면 QR도 다시 만들어야 하나요?",
        a: "링크가 그대로라면 다시 만들 필요가 없습니다. Google Drive의 버전 관리로 같은 파일을 덮어쓰면 링크가 유지됩니다. 새 파일로 올려 링크가 바뀌었다면 QR도 새로 만들어야 합니다.",
      },
      {
        q: "스캔하면 “액세스 권한 필요” 화면이 떠요.",
        a: "공유 범위가 제한되어 있어서입니다. Google Drive 공유 설정에서 일반 액세스를 “링크가 있는 모든 사용자”로 바꾸세요.",
      },
      {
        q: "PDF 말고 다른 파일도 되나요?",
        a: "네. 공유 링크가 있는 파일이면 이미지, 한글(HWP) 문서, 엑셀, 동영상도 같은 방식으로 됩니다. 다만 휴대폰에서 열 수 있는 형식인지 먼저 확인하세요.",
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

/** 사용 사례 랜딩 페이지(/ko/restaurant-menu-qr-code 등)의 한국어 본문. */
export const useCasesKo: Record<UseCaseId, LandingCopy> = {
  restaurant_menu: {
    title: "식당 메뉴판 QR 코드 만들기",
    subtitle: "테이블에서 스캔하면 온라인 메뉴가 열리는 QR 코드를 만듭니다.",
    metaTitle: "식당 메뉴판 QR 코드 만들기 — 무료, 회원가입 없음",
    metaDescription:
      "식당 메뉴 링크를 QR 코드로 만들어 테이블 안내판과 창문 스티커로 인쇄합니다. 만료 없는 정적 QR이라 메뉴 주소만 그대로면 계속 쓸 수 있습니다. 무료, 회원가입 없음.",
    sections: {
      howTitle: "메뉴판 QR은 이렇게 준비합니다",
      how: [
        "QR 코드에는 메뉴 자체가 아니라 메뉴가 있는 곳의 주소가 담깁니다. 그래서 메뉴를 먼저 온라인 어딘가에 올려 두어야 합니다. 가게 홈페이지의 메뉴 페이지, 네이버 플레이스에 등록한 메뉴, 구글 드라이브에 올린 메뉴판 PDF처럼 손님 휴대폰에서 바로 열리는 주소면 됩니다. 이 사이트는 메뉴나 파일을 대신 올려 두지 않습니다.",
        "주소를 입력칸에 붙여 넣은 뒤 “안내판 인쇄 / PDF”를 누르면 A4 안내판이 만들어집니다. 링크로 만든 안내판에는 연결되는 사이트 이름이 보조 문구로 미리 들어가 있어 손님이 어디로 연결되는지 알 수 있습니다. 제목은 “메뉴 보기”처럼 가게에 맞게 고치면 됩니다.",
        "인쇄한 QR은 만료되지 않지만 담긴 주소는 바꿀 수 없습니다. 메뉴가 계절마다 바뀐다면 주소는 그대로 두고 내용만 고치는 방식을 고르세요. 홈페이지라면 같은 메뉴 페이지를 수정하고, 드라이브라면 새 파일을 올리지 말고 같은 파일을 덮어쓰면 테이블마다 붙인 QR을 다시 인쇄할 필요가 없습니다.",
      ],
      usesTitle: "이런 자리에 둡니다",
      uses: [
        "테이블마다 작은 아크릴 안내판을 두고 종이 메뉴판과 함께 “메뉴 사진 보기” QR을 붙입니다. 사진과 설명이 많은 메뉴일수록 휴대폰 화면이 보기 편합니다.",
        "입구 창문이나 출입문에 스티커로 붙여 두면 지나가는 사람이 가게에 들어오기 전에 메뉴와 가격을 확인할 수 있습니다.",
        "포장 손님에게 건네는 쿠폰이나 전단에 같은 메뉴 링크를 넣어 다음 주문 때 찾아보게 합니다.",
        "외국인 손님이 많다면 영어나 일본어 메뉴 페이지를 따로 만들고 언어별 QR을 나란히 둡니다.",
      ],
      tipsTitle: "매장에 두기 전에 확인하세요",
      tips: [
        "종이 메뉴판도 함께 비치하세요. 휴대폰이 익숙하지 않은 어르신이나 배터리가 떨어진 손님도 주문할 수 있어야 합니다.",
        "원산지 표시는 손님이 매장 안에서 바로 볼 수 있어야 합니다. 온라인 메뉴에도 적어 두되 벽 게시판이나 종이 메뉴판의 표시는 그대로 유지하세요. 알레르기를 일으킬 수 있는 재료도 메뉴 옆에 함께 적어 두면 손님이 묻기 전에 확인할 수 있습니다.",
        "메뉴 페이지는 매장 Wi-Fi를 끄고 휴대폰 데이터로도 열어 보세요. 사진이 많은 PDF는 데이터가 느린 자리에서 한참 걸릴 수 있습니다.",
        "테이블에 앉아 30cm 정도 거리에서 찍는다면 QR 한 변이 3cm면 충분합니다. 물과 기름이 튀는 자리라면 코팅하거나 아크릴 안에 넣어 두세요.",
      ],
    },
    faq: [
      {
        q: "메뉴 가격이 바뀌면 QR을 다시 만들어야 하나요?",
        a: "QR에 담긴 주소가 그대로라면 다시 만들 필요가 없습니다. 메뉴 페이지나 PDF 내용만 고치세요. 메뉴를 새 주소로 옮긴다면 QR도 새로 만들어 교체해야 합니다.",
      },
      {
        q: "메뉴판 PDF를 이 사이트에 올릴 수 있나요?",
        a: "올릴 수 없습니다. 구글 드라이브나 가게 홈페이지에 올린 뒤 그 링크로 QR을 만드세요. 드라이브라면 공유 범위를 “링크가 있는 모든 사용자”로 바꿔야 손님이 열 수 있습니다.",
      },
      {
        q: "네이버 플레이스 메뉴로 연결해도 되나요?",
        a: "됩니다. 네이버 지도에서 가게를 연 뒤 공유 버튼으로 받은 링크를 붙여 넣으세요. 메뉴 탭이 바로 열리는지는 앱 버전에 따라 다를 수 있으니 직접 스캔해 보세요.",
      },
      {
        q: "테이블마다 다른 QR이 필요해요.",
        a: "테이블별 주소를 목록으로 준비해 일괄 생성에 붙여 넣으면 최대 200개까지 PNG가 담긴 ZIP 파일로 받을 수 있습니다. 테이블 번호가 붙은 주문 주소는 사용하는 주문 서비스에서 받아야 합니다.",
      },
    ],
  },

  wedding: {
    title: "청첩장·결혼식 QR 코드 만들기",
    subtitle: "종이 청첩장에 모바일 청첩장과 오시는 길을 이어 줍니다.",
    metaTitle: "청첩장·결혼식 QR 코드 만들기 — 무료, 회원가입 없음",
    metaDescription:
      "종이 청첩장에 모바일 청첩장, 오시는 길 지도, 사진 공유 앨범 링크를 QR 코드로 넣습니다. 인쇄소에 넘기기 좋은 SVG 파일로 받을 수 있습니다. 무료, 회원가입 없음.",
    sections: {
      howTitle: "청첩장 QR은 이렇게 씁니다",
      how: [
        "종이 청첩장에는 담을 수 있는 내용이 한정되어 있습니다. QR 코드를 하나 넣어 두면 하객이 휴대폰으로 모바일 청첩장을 열어 사진, 예식 시간, 식장 위치를 한 번에 볼 수 있습니다. QR에는 모바일 청첩장 주소가 그대로 담기므로, 먼저 청첩장 서비스에서 내 청첩장 링크를 복사해 입력칸에 붙여 넣으세요.",
        "모바일 청첩장이 없다면 오시는 길만 따로 연결해도 됩니다. 네이버 지도나 카카오맵에서 식장을 찾아 공유 버튼으로 받은 링크로 QR을 만들면, 하객 휴대폰에서 식장 위치가 열리고 길 찾기로 바로 이어집니다.",
        "QR은 만료되지 않지만 인쇄한 뒤에는 연결 주소를 바꿀 수 없습니다. 모바일 청첩장은 보통 내용을 고쳐도 주소가 그대로라서 주차 안내나 식사 시간이 바뀌어도 청첩장 안에서 고치면 됩니다. 반대로 청첩장을 새로 만들어 주소가 바뀌면 인쇄한 QR은 예전 주소로 연결됩니다.",
      ],
      usesTitle: "이런 곳에 넣습니다",
      uses: [
        "종이 청첩장 뒷면이나 약도 옆에 모바일 청첩장 QR을 넣습니다.",
        "식장 입구나 하객 테이블에 구글 포토 공유 앨범 같은 사진 공유 링크 QR을 두면, 하객이 찍은 사진을 한곳에 모을 수 있습니다.",
        "멀리서 오는 하객을 위한 안내문에 주차장이나 셔틀버스 타는 곳의 지도 링크를 따로 넣습니다.",
        "답례품에 넣는 감사 카드에 예식 사진 앨범 링크를 담아 둡니다.",
      ],
      tipsTitle: "인쇄소에 넘기기 전에 확인하세요",
      tips: [
        "축의금 계좌는 QR로 따로 만들기보다 모바일 청첩장 안에 적어 두는 편이 안전합니다. 인쇄한 QR은 오타가 있어도 고칠 수 없고, 식장에 붙여 둔 계좌 QR은 다른 스티커로 덮일 염려도 있습니다.",
        "청첩장은 한 번에 수백 장을 찍으므로 시험 스캔을 꼭 하세요. 인쇄소 시안을 화면에 띄워 아이폰과 안드로이드로 각각 찍어 보고, 첫 인쇄본이 나오면 종이 위에서 한 번 더 확인합니다.",
        "크림색이나 한지 느낌의 종이에는 QR을 진한 색으로 인쇄하세요. 연한 금색이나 은색, 금박은 바탕과 대비가 약하고 빛이 반사되어 잘 읽히지 않습니다.",
        "인쇄소에는 “SVG 저장”으로 받은 파일을 넘기세요. 확대해도 깨지지 않아 원하는 크기로 배치하기 쉽습니다. 청첩장에서는 한 변 2cm 이상을 권합니다.",
        "QR 옆에 “모바일 청첩장 보기”처럼 무엇이 열리는지 한 줄 적어 두면 어르신 하객도 안심하고 찍습니다.",
      ],
    },
    faq: [
      {
        q: "모바일 청첩장 주소는 어디서 찾나요?",
        a: "사용하는 청첩장 서비스에서 공유하기를 누르면 나오는 링크를 복사하면 됩니다. 카카오톡으로 보내는 링크와 같은 주소를 쓰면 됩니다.",
      },
      {
        q: "QR 하나에 청첩장과 지도를 함께 넣을 수 있나요?",
        a: "QR 하나에는 주소 하나만 담깁니다. 모바일 청첩장 안에 지도가 있다면 청첩장 QR 하나로 충분하고, 지도를 따로 알리려면 QR 두 개를 나란히 넣으세요.",
      },
      {
        q: "결혼식이 끝나면 QR이 사라지나요?",
        a: "QR은 만료되지 않습니다. 다만 모바일 청첩장 서비스의 게시 기간이 끝나 페이지가 닫히면 QR을 찍어도 열리지 않습니다.",
      },
      {
        q: "예식 일정을 캘린더에 넣게 할 수도 있나요?",
        a: "일정 형식으로 예식 날짜와 장소를 담은 QR을 따로 만들 수 있습니다. 하객이 스캔하면 휴대폰 캘린더에 추가하는 화면이 열립니다.",
      },
    ],
  },

  business_card: {
    title: "명함 QR 코드 만들기",
    subtitle: "명함을 받은 사람이 스캔 한 번에 내 연락처를 저장합니다.",
    metaTitle: "명함 QR 코드 만들기 — 무료, 회원가입 없음",
    metaDescription:
      "명함 뒷면에 넣을 연락처 QR 코드를 만듭니다. 스캔하면 이름, 전화번호, 이메일이 채워진 주소록 저장 화면이 열립니다. 90×50mm 명함에 맞는 크기도 안내합니다. 무료, 회원가입 없음.",
    sections: {
      howTitle: "명함 QR은 이렇게 준비합니다",
      how: [
        "명함 QR에는 vCard 3.0 형식의 연락처가 직접 담깁니다. 명함을 받은 사람이 카메라로 찍으면 이름, 회사, 직함, 전화번호, 이메일이 채워진 새 연락처 화면이 열리고, 저장만 누르면 주소록에 들어갑니다. 받은 명함을 나중에 꺼내 번호를 옮겨 적는 일이 없어집니다.",
        "명함에 인쇄된 정보를 전부 QR에 넣을 필요는 없습니다. 항목이 적을수록 코드가 덜 촘촘해져 작은 명함에서도 잘 읽힙니다. 이름, 휴대전화, 이메일, 회사와 직함 정도면 충분하고, 주소나 긴 메모는 명함의 글자로 남겨 두세요.",
        "연락처가 QR 안에 글자 그대로 들어 있어 인터넷이 없어도 저장됩니다. 그 대신 번호나 직함이 바뀌면 QR을 새로 만들고 명함도 다시 인쇄해야 합니다.",
      ],
      usesTitle: "이럴 때 쓰세요",
      uses: [
        "미팅이 잦은 영업 담당자가 명함 뒷면에 넣어 상대가 그 자리에서 연락처를 저장하게 합니다.",
        "프리랜서가 웹사이트 칸에 포트폴리오 주소를 넣어 연락처와 작업물을 함께 전합니다.",
        "회사 소개서나 제안서 마지막 장에 담당자 연락처 QR을 넣습니다.",
        "명함을 따로 찍지 않는 작은 가게가 계산대 옆에 대표 연락처 QR을 세워 둡니다.",
      ],
      tipsTitle: "명함 인쇄 전에 확인하세요",
      tips: [
        "90×50mm 일반 명함이라면 QR 한 변은 최소 2cm, 여유가 있으면 2.5cm가 적당합니다. QR 둘레에 글자나 선이 닿지 않도록 여백을 두세요.",
        "직원마다 연락처가 다르므로 명함 QR도 사람마다 따로 만들어야 합니다. 일괄 생성은 링크와 텍스트만 지원해 연락처 QR을 한꺼번에 만들 수는 없습니다. 한 명씩 입력해 “SVG 저장”으로 받고, 파일 이름에 직원 이름을 붙여 정리하세요.",
        "휴대전화와 회사 전화는 칸을 나눠 넣으세요. 저장된 연락처에서도 둘이 구분되어 보입니다.",
        "인쇄소에 넘기기 전에 내 휴대폰과 동료 휴대폰에 각각 저장해 보고 이름 순서와 회사명이 제대로 들어가는지 확인하세요.",
        "유광 코팅이나 펄 같은 반사가 강한 후가공은 QR 부분을 피해 넣으세요.",
      ],
    },
    faq: [
      {
        q: "QR은 명함 앞면과 뒷면 중 어디에 넣나요?",
        a: "정해진 답은 없습니다. 앞면은 이름과 로고로 채워지는 경우가 많아 뒷면에 넣는 일이 흔합니다. 어느 쪽이든 “스캔하면 연락처 저장”처럼 짧은 안내를 곁들이면 좋습니다.",
      },
      {
        q: "직원 수십 명의 명함 QR을 한 번에 만들 수 있나요?",
        a: "연락처 QR은 일괄 생성을 지원하지 않습니다. 직원별 소개 페이지가 있다면 그 주소 목록으로 링크 QR을 한 번에 만들 수는 있지만, 이때는 스캔하면 주소록 저장 화면이 아니라 웹페이지가 열립니다.",
      },
      {
        q: "이직하면 예전 명함의 QR은 어떻게 되나요?",
        a: "예전 회사 정보가 QR 안에 그대로 남아 있어 계속 그 정보가 저장됩니다. 새 명함을 만들 때 QR도 새로 만드세요.",
      },
      {
        q: "QR 색을 회사 색에 맞춰도 되나요?",
        a: "꾸미기에서 색을 바꿀 수 있습니다. 코드 색이 바탕보다 충분히 진해야 하고, 바탕이 더 진한 반전 배색은 읽지 못하는 기기가 있으니 피하세요.",
      },
    ],
  },

  google_review: {
    title: "구글 리뷰 QR 코드 만들기",
    subtitle: "스캔하면 우리 가게의 구글 리뷰 작성 화면이 바로 열립니다.",
    metaTitle: "구글 리뷰 QR 코드 만들기 — 무료, 회원가입 없음",
    metaDescription:
      "Place ID나 Google 비즈니스 프로필의 리뷰 요청 링크로 구글 리뷰 작성 화면을 여는 QR 코드를 만듭니다. 계산대, 영수증, 포장 스티커에 넣으세요. 무료, 회원가입 없음.",
    sections: {
      howTitle: "구글 리뷰 QR은 이렇게 만듭니다",
      how: [
        "이 페이지에서는 SNS 형식의 Google 리뷰가 미리 골라져 있습니다. 입력칸에 가게의 Place ID를 넣으면 `https://search.google.com/local/writereview?placeid=ChIJ…` 형태의 주소가 QR에 담기고, 손님이 스캔하면 구글 지도에서 우리 가게의 리뷰 작성 창이 열립니다. 리뷰를 쓰려면 손님이 구글 계정에 로그인해 있어야 합니다.",
        "Place ID는 Google 지도 플랫폼 문서의 Place ID Finder에서 가게 이름을 검색하면 ChIJ로 시작하는 문자열로 나옵니다. Google 비즈니스 프로필을 관리하고 있다면 더 쉬운 방법도 있습니다. 프로필의 “리뷰 요청” 메뉴에서 받은 링크를 입력칸에 그대로 붙여 넣으면, https로 시작하는 주소는 바뀌지 않고 그대로 QR에 담깁니다.",
        "이 형식은 구글 리뷰 전용입니다. 네이버 영수증 리뷰나 카카오맵 후기로 안내하려면 해당 서비스에서 받은 링크로 URL 형식의 QR을 만드세요.",
      ],
      usesTitle: "이런 자리에 둡니다",
      uses: [
        "계산대 옆에 작은 안내판을 세워 결제를 기다리는 동안 스캔하게 합니다.",
        "영수증 하단이나 쇼핑백, 포장 용기 스티커에 넣어 집에 돌아간 뒤에도 리뷰를 남길 수 있게 합니다.",
        "미용실, 네일숍, 공방처럼 예약 손님이 많은 곳은 예약 확인 카드나 관리 안내문에 넣습니다.",
        "구글 지도를 주로 쓰는 외국인 관광객이 많은 가게라면 입구나 테이블에 함께 둡니다.",
      ],
      tipsTitle: "리뷰를 부탁하기 전에 확인하세요",
      tips: [
        "구글은 리뷰를 쓰는 대가로 할인, 사은품, 현금 같은 혜택을 주는 것을 금지합니다. “리뷰 쓰면 음료 서비스” 같은 문구는 넣지 마세요. 위반하면 리뷰가 삭제되거나 비즈니스 프로필이 제한될 수 있습니다.",
        "만족한 손님에게만 골라서 리뷰를 부탁하는 것도 정책 위반입니다. 안내판은 모든 손님이 볼 수 있는 곳에 두고 “솔직한 후기를 남겨 주세요”처럼 쓰세요.",
        "“안내판 인쇄 / PDF”의 기본 제목은 “팔로우하기”입니다. 리뷰용으로 쓸 때는 “구글 리뷰 남기기”처럼 바꾸세요.",
        "만든 뒤 구글 계정에 로그인한 휴대폰으로 직접 스캔해 리뷰 창에 우리 가게 이름이 뜨는지 확인하세요. 이름이 비슷한 다른 지점의 Place ID를 넣는 실수가 생길 수 있습니다.",
      ],
    },
    faq: [
      {
        q: "Place ID는 어디서 찾나요?",
        a: "Google 지도 플랫폼 문서의 Place ID Finder에서 가게 이름이나 주소를 검색하면 ChIJ로 시작하는 Place ID가 나옵니다. 그 문자열을 그대로 복사해 넣으세요.",
      },
      {
        q: "비즈니스 프로필의 리뷰 링크를 넣어도 되나요?",
        a: "됩니다. https로 시작하는 링크를 입력칸에 붙여 넣으면 그 주소가 그대로 QR에 담기므로 Place ID를 따로 찾을 필요가 없습니다.",
      },
      {
        q: "네이버 영수증 리뷰 QR도 만들 수 있나요?",
        a: "Google 리뷰 형식으로는 만들 수 없습니다. 네이버에서 받은 리뷰 작성 링크가 있다면 URL 형식에 붙여 넣어 만드세요.",
      },
      {
        q: "QR로 리뷰가 몇 개 들어왔는지 알 수 있나요?",
        a: "이 사이트에서는 스캔 수를 알 수 없습니다. 새로 달린 리뷰는 Google 비즈니스 프로필에서 확인하세요.",
      },
    ],
  },

  wifi_cafe: {
    title: "카페·숙소 Wi-Fi QR 코드 만들기",
    subtitle: "손님이 비밀번호를 묻지 않고 매장 Wi-Fi에 접속하게 합니다.",
    metaTitle: "카페·숙소 Wi-Fi QR 코드 만들기 — 무료, 회원가입 없음",
    metaDescription:
      "카페, 식당, 펜션, 게스트하우스의 손님용 Wi-Fi QR 코드를 만듭니다. 네트워크 이름이 들어간 A4 안내판을 바로 인쇄해 테이블과 객실에 둘 수 있습니다. 무료, 회원가입 없음.",
    sections: {
      howTitle: "매장 Wi-Fi QR은 이렇게 준비합니다",
      how: [
        "먼저 손님에게 내줄 네트워크를 정하세요. 포스기나 카드 단말기, CCTV가 연결된 매장 내부망의 비밀번호를 그대로 QR에 넣으면 안내판을 찍은 사람 누구나 같은 망에 들어옵니다. 대부분의 공유기는 설정 화면에서 게스트 네트워크를 따로 켤 수 있으니, 손님용 이름과 비밀번호를 새로 만들어 그 정보로 QR을 만드는 것이 좋습니다.",
        "네트워크 이름과 비밀번호를 입력한 뒤 “안내판 인쇄 / PDF”를 누르면 “Wi-Fi에 연결하세요” 제목 아래 네트워크 이름이 보조 문구로 들어간 A4 안내판이 열립니다. 하단 문구에는 상호명이나 이용 시간을 적으면 됩니다. 비밀번호는 안내판에 글자로 적히지 않으니, 직접 입력하려는 손님을 위해 적어 둘지는 매장 상황에 맞게 정하세요.",
        "접속 정보는 QR 이미지 안에 직접 들어 있어 이 사이트와 상관없이 동작합니다. 대신 공유기 비밀번호를 바꾸는 순간 붙여 둔 QR은 모두 쓸 수 없게 됩니다.",
      ],
      usesTitle: "이런 자리에 둡니다",
      uses: [
        "카페 테이블마다 작은 안내판을 세우거나 계산대 앞에 하나 두면 비밀번호를 묻는 손님 응대가 줄어듭니다.",
        "펜션이나 게스트하우스 객실 안내 카드에 넣어 체크아웃 시간, 분리수거 안내와 함께 둡니다.",
        "숙소 현관이나 공용 라운지 벽에 붙여 짐을 풀기 전에 바로 접속하게 합니다.",
        "스터디카페나 공유 오피스처럼 오래 머무는 손님이 많은 곳에서는 좌석마다 붙여 둡니다.",
      ],
      tipsTitle: "붙이기 전에 확인하세요",
      tips: [
        "비밀번호를 바꾸면 그날 QR도 새로 만들어 교체해야 합니다. 안내판이 여러 장이라면 붙인 위치를 적어 두어야 빠뜨리지 않습니다.",
        "객실마다 공유기가 따로 있고 이름과 비밀번호가 다르다면 객실 수만큼 QR을 각각 만들어야 합니다. 일괄 생성은 링크와 텍스트만 지원하므로 Wi-Fi QR은 하나씩 만드세요.",
        "접속하면 약관 동의나 전화번호 입력 같은 로그인 페이지가 뜨는 네트워크라면, QR은 Wi-Fi 연결까지만 해 줍니다. 그 로그인 페이지는 손님이 직접 거쳐야 인터넷이 됩니다.",
        "안내판을 붙일 자리에서 아이폰과 안드로이드로 각각 스캔해 실제로 인터넷이 되는지 확인하세요. 공유기에서 먼 객실이나 테라스는 신호가 약해 연결이 자주 끊길 수 있습니다.",
      ],
    },
    faq: [
      {
        q: "QR로 접속한 손님에게 비밀번호가 보이나요?",
        a: "스캐너 앱에 따라 비밀번호가 화면에 표시됩니다. 그래서 내부망이 아닌 손님용 네트워크로 만드는 것을 권합니다.",
      },
      {
        q: "층마다 Wi-Fi가 다른데 QR 하나로 안내할 수 있나요?",
        a: "QR 하나에는 네트워크 하나만 담깁니다. 층이나 건물별로 네트워크가 다르다면 그 자리에 맞는 QR을 따로 붙이세요.",
      },
      {
        q: "연결은 되는데 인터넷이 안 된다고 해요.",
        a: "로그인 페이지가 있는 네트워크라면 브라우저를 열어 로그인 절차를 마쳐야 합니다. 그런 페이지가 없다면 공유기와 인터넷 회선 상태를 확인하세요.",
      },
      {
        q: "안내판 QR 가운데에 가게 로고를 넣을 수 있나요?",
        a: "꾸미기에서 중앙 로고를 넣을 수 있습니다. 로고를 넣으면 복원력이 최대로 고정되어 코드가 촘촘해지니, 테이블 안내판이라면 한 변 4cm 이상으로 인쇄하세요.",
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
