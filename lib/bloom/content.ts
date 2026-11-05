// BLOOM YOUR WAY 캠페인 콘텐츠 (한국어 / 영어)
// PRD v2.2 기준. 가격·재고·성분·확정되지 않은 운영 정보는 넣지 않는다.

export type Lang = "ko" | "en";
export type Topic = "goods" | "experience";

type L = Record<Lang, string>;

export const COLLAB = "동백마을 X A2O LITE";

export const MAP_QUERY = "제주 동백마을";
export const MAP_LINKS = {
  google: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`,
  naver: `https://map.naver.com/p/search/${encodeURIComponent(MAP_QUERY)}`,
};

export const ui = {
  nav: {
    story: { ko: "동백마을", en: "Village" },
    goods: { ko: "굿즈", en: "Goods" },
    experiences: { ko: "체험", en: "Experiences" },
    visit: { ko: "방문 안내", en: "Visit" },
    notify: { ko: "알림받기", en: "Get notified" },
  },
  langToggle: { ko: "Change language to English", en: "한국어로 변경" },
  hero: {
    videoLabel: {
      ko: "BLOOM YOUR WAY 캠페인 KV 영상",
      en: "BLOOM YOUR WAY campaign key visual video",
    },
    posterAlt: {
      ko: "동백꽃 그래픽과 피오·토리가 함께한 숲속 BLOOM YOUR WAY 캠페인 대표 이미지",
      en: "BLOOM YOUR WAY key visual: a woman in a camellia forest with Pio and Tori",
    },
    pause: { ko: "영상 일시정지", en: "Pause video" },
    play: { ko: "영상 재생", en: "Play video" },
    soundOn: { ko: "소리 켜기", en: "Turn sound on" },
    soundOff: { ko: "소리 끄기", en: "Turn sound off" },
    fallback: {
      ko: "영상을 자동 재생할 수 없어 대표 이미지를 보여드려요.",
      en: "Autoplay is unavailable, so we're showing the key visual.",
    },
    scroll: { ko: "아래로 스크롤해서 더 알아보기", en: "Scroll to discover more" },
    // 데스크톱 영상 옆 안내 패널 (영상 속 슬로건은 반복하지 않는다)
    sideBody: {
      ko: "제주 동백마을에서 피어난 협업 한정판 굿즈와 마을 체험을 만나 보세요.",
      en: "Limited collab goods and village experiences, blooming in Jeju's Dongbaek Village.",
    },
    sideGoods: { ko: "한정판 굿즈 보기", en: "See limited goods" },
  },
  story: {
    eyebrow: { ko: "DONGBAEK VILLAGE", en: "DONGBAEK VILLAGE" },
    place: { ko: "제주 · 동백마을", en: "Jeju · Dongbaek Village" },
    title: { ko: "FIND YOUR BLOOM.", en: "FIND YOUR BLOOM." },
    lead: {
      ko: "제주에서 너만의 동백을 발견해.",
      en: "Discover your own camellia in Jeju.",
    },
    body: {
      ko: "동백마을은 겨울이면 마을 곳곳에 붉은 동백이 피어나는 제주의 작은 마을이에요. 꽃이 진 자리에 맺힌 씨앗을 모아 오일로 만들며, 동백과 함께 계절을 보내 왔어요. 숲길을 걷고, 꽃잎차를 마시고, 씨앗을 고르며 너만의 속도로 머물러 봐.",
      en: "Dongbaek Village is a small Jeju village where red camellias bloom all around in winter. Villagers gather the seeds left behind by fallen flowers and press them into oil, living each season alongside the camellia. Walk the forest paths, sip petal tea, sort seeds — and stay at your own pace.",
    },
    meaningTitle: {
      ko: "동백이 피어나는 세 가지 모습",
      en: "Three ways the camellia blooms",
    },
    meanings: [
      {
        key: "flower",
        img: "/bloom/gfx/flower-badge.png",
        w: 343,
        h: 318,
        name: { ko: "동백꽃", en: "Camellia flower" },
        desc: {
          ko: "추운 계절에 가장 먼저 피어나는 꽃. 너만의 방식으로 피어나는 용기를 뜻해요.",
          en: "The flower that blooms first in the cold season — the courage to bloom your way.",
        },
      },
      {
        key: "seed",
        img: "/bloom/gfx/seed.png",
        w: 348,
        h: 310,
        name: { ko: "동백씨앗", en: "Camellia seed" },
        desc: {
          ko: "꽃이 진 자리에 맺히는 씨앗. 다음 계절을 준비하는 가능성을 담았어요.",
          en: "The seed left where the flower fell — the promise of the next season.",
        },
      },
      {
        key: "oil",
        img: "/bloom/gfx/oil-drop.png",
        w: 360,
        h: 480,
        name: { ko: "동백오일", en: "Camellia oil" },
        desc: {
          ko: "씨앗을 짜서 얻는 오일. 마을이 오랫동안 이어 온 동백의 손길을 전해요.",
          en: "Oil pressed from the seeds — the village's long-held camellia craft.",
        },
      },
    ],
    // 피오·토리 소개 (resources/characters_png/characters_story.png 스토리 기준)
    friends: {
      title: { ko: "동백마을의 다정한 두 친구", en: "Two friendly faces of Dongbaek Village" },
      sub: {
        ko: "마을에 온 너를 피오와 토리가 함께 안내해.",
        en: "Pio and Tori will show you around the village together.",
      },
      traitsLabel: { ko: "이렇게 알아봐", en: "How to spot" },
      pio: {
        name: { ko: "동백꽃 피오", en: "Pio the Camellia" },
        tagline: { ko: "너의 방식대로 피어나는 친구", en: "The friend who blooms in their own way" },
        intro: {
          ko: "마을에 온 너를 가장 먼저 반기고, 가고 싶은 곳으로 길을 안내해.",
          en: "First to greet you in the village, and always ready to show you the way.",
        },
        traits: [
          { ko: "다섯 잎 구름 모양의 분홍 동백꽃", en: "A pink, five-petal cloud-shaped camellia" },
          { ko: "머리 왼쪽 위의 연두색 잎", en: "A lime leaf on the top-left of the head" },
          { ko: "몸에 스친 민트색 붓자국", en: "Mint brush strokes across the body" },
        ],
        alt: { ko: "꽃 향기를 맡는 동백꽃 피오", en: "Pio the Camellia smelling a flower" },
      },
      tori: {
        name: { ko: "동백씨앗 토리", en: "Tori the Camellia Seed" },
        tagline: { ko: "작은 가능성을 발견하는 친구", en: "The friend who finds small possibilities" },
        intro: {
          ko: "피오 곁에서 마을 곳곳의 작은 발견을 놓치지 않아.",
          en: "Right by Pio's side, never missing a small discovery around the village.",
        },
        traits: [
          { ko: "주황색 타원형 동백씨앗", en: "An orange, oval camellia seed" },
          { ko: "몸을 가로지르는 대각선 줄무늬", en: "Diagonal stripes across the body" },
          { ko: "머리 오른쪽 위의 분홍 꽃", en: "A pink flower on the top-right of the head" },
        ],
        alt: { ko: "환하게 웃는 동백씨앗 토리", en: "Tori the Camellia Seed smiling" },
      },
    },
  },
  goods: {
    eyebrow: { ko: "LIMITED GOODS", en: "LIMITED GOODS" },
    title: {
      ko: "오직 제주 동백마을에서 만나는 협업 한정판.",
      en: "A limited collab, only at Jeju's Dongbaek Village.",
    },
    sub: {
      ko: "굿즈만 만나도, 마을에 더 머물러도. 너의 방식대로.",
      en: "Just the goods, or a longer stay in the village. Your way.",
    },
    more: { ko: "자세히 보기", en: "View details" },
    zoomHint: { ko: "이미지를 눌러 확대", en: "Tap image to zoom" },
    motif: { ko: "모티프", en: "Motif" },
    features: { ko: "제품 특징", en: "Features" },
    collab: { ko: "콜라보 이야기", en: "Collab story" },
    soldAt: {
      ko: "제주 동백마을 팝업 현장에서만 만날 수 있어요. 판매 정보는 확정 후 알림으로 안내드려요.",
      en: "Available only at the Dongbaek Village pop-up. Sales details will be shared once confirmed.",
    },
    notifyCta: { ko: "굿즈 판매 소식 알림받기", en: "Notify me about goods" },
  },
  exp: {
    eyebrow: { ko: "VILLAGE EXPERIENCES", en: "VILLAGE EXPERIENCES" },
    title: {
      ko: "마을에 조금 더 머물러 볼까?",
      en: "Stay a little longer in the village?",
    },
    sub: {
      ko: "동백으로 즐기는 세 가지 체험 프로그램",
      en: "Three camellia experiences",
    },
    more: { ko: "프로그램 보기", en: "View program" },
    process: { ko: "체험 과정", en: "How it goes" },
    info: { ko: "참여 안내", en: "Participation" },
    duration: { ko: "소요시간", en: "Duration" },
    place: { ko: "장소", en: "Location" },
    join: { ko: "참여 방법", en: "How to join" },
    tbd: { ko: "운영 확정 후 안내 예정", en: "To be announced" },
    placeValue: {
      ko: "제주 동백마을 BLOOM HOUSE (기획 기준 · 확인 필요)",
      en: "BLOOM HOUSE, Dongbaek Village, Jeju (planned · to be confirmed)",
    },
    joinValue: {
      ko: "실시간 예약은 제공하지 않아요. 프로그램 소식 알림을 신청해 주세요.",
      en: "Online booking isn't available. Sign up for program updates.",
    },
    notifyCta: { ko: "체험 프로그램 소식 알림받기", en: "Notify me about programs" },
  },
  visit: {
    eyebrow: { ko: "VISIT DONGBAEK VILLAGE", en: "VISIT DONGBAEK VILLAGE" },
    title: { ko: "동백마을로 놀러 와.", en: "Come visit Dongbaek Village." },
    popupName: { ko: "BLOOM YOUR WAY POP-UP", en: "BLOOM YOUR WAY POP-UP" },
    notice: {
      ko: "아래 일정과 장소는 캠페인 기획 기준이며, 실제 운영 정보는 확인이 필요해요.",
      en: "The schedule and venue below are from the campaign plan and still need confirmation.",
    },
    badge: { ko: "확인 필요", en: "To be confirmed" },
    period: { ko: "기간", en: "Dates" },
    periodValue: { ko: "2026.10.30 – 11.30", en: "Oct 30 – Nov 30, 2026" },
    hours: { ko: "운영 시간", en: "Hours" },
    hoursValue: {
      ko: "매일 11:00 – 18:00 (입장 마감 17:30)",
      en: "Daily 11:00 – 18:00 (last entry 17:30)",
    },
    venue: { ko: "장소", en: "Venue" },
    venueValue: { ko: "제주 동백마을 BLOOM HOUSE", en: "BLOOM HOUSE, Dongbaek Village, Jeju" },
    goodsAt: { ko: "굿즈 판매", en: "Goods" },
    goodsAtValue: {
      ko: "팝업 현장 한정 판매 (상세 확정 후 안내)",
      en: "On-site only at the pop-up (details TBA)",
    },
    programs: { ko: "체험 프로그램", en: "Programs" },
    programsValue: {
      ko: "동백꽃잎차 명상 · 동백오일 만들기 · 고사리 파스타",
      en: "Camellia tea meditation · Camellia oil making · Bracken pasta",
    },
    howTitle: { ko: "찾아오는 방법", en: "Getting there" },
    howBody: {
      ko: "제주 동백마을은 외부 지도에서 위치를 확인할 수 있어요. 세부 교통 안내는 확정 후 공개됩니다.",
      en: "Find Dongbaek Village on an external map. Detailed directions will be shared once confirmed.",
    },
    google: { ko: "Google 지도에서 보기", en: "Open in Google Maps" },
    naver: { ko: "네이버 지도에서 보기", en: "Open in Naver Map" },
    newTab: { ko: "(새 창)", en: "(opens in new tab)" },
  },
  notify: {
    eyebrow: { ko: "GET NOTIFIED", en: "GET NOTIFIED" },
    title: { ko: "피어나는 소식, 먼저 받아볼래?", en: "Want the bloom news first?" },
    pick: { ko: "받고 싶은 알림을 골라 주세요 (복수 선택 가능)", en: "Choose your updates (select one or both)" },
    goods: { ko: "굿즈 판매 소식", en: "Goods sales news" },
    goodsDesc: { ko: "BLOOM CHARM · STICKERS · CAMELLIA OIL", en: "BLOOM CHARM · STICKERS · CAMELLIA OIL" },
    experience: { ko: "체험 프로그램 소식", en: "Experience program news" },
    experienceDesc: { ko: "차 명상 · 오일 만들기 · 쿠킹 클래스", en: "Tea meditation · Oil making · Cooking class" },
    email: { ko: "이메일 주소", en: "Email address" },
    placeholder: { ko: "you@example.com", en: "you@example.com" },
    submit: { ko: "알림받기", en: "Get notified" },
    errTopic: { ko: "알림 종류를 하나 이상 선택해 주세요.", en: "Please choose at least one update." },
    errEmpty: { ko: "이메일 주소를 입력해 주세요.", en: "Please enter your email address." },
    errFormat: {
      ko: "이메일 형식이 올바르지 않아요. 예) you@example.com",
      en: "That email doesn't look right. e.g. you@example.com",
    },
    proto: {
      ko: "교육용 프로토타입이에요. 입력한 이메일은 저장되거나 전송되지 않아요.",
      en: "This is an educational prototype. Your email is not stored or sent.",
    },
    doneTitle: { ko: "알림 신청 화면이 완료되었어요!", en: "Your notification sign-up is complete!" },
    doneBody: {
      ko: "선택한 소식",
      en: "Selected updates",
    },
    doneProto: {
      ko: "프로토타입이라 실제 이메일은 발송되지 않아요.",
      en: "As a prototype, no email will actually be sent.",
    },
    doneAlt: { ko: "손 흔들며 인사하는 피오와 토리", en: "Pio and Tori waving hello" },
    again: { ko: "다시 신청하기", en: "Sign up again" },
    top: { ko: "처음으로", en: "Back to top" },
  },
  footer: {
    slogan: { ko: "BLOOM YOUR WAY. 너의 방식대로 피어나.", en: "BLOOM YOUR WAY." },
    disclaimer: {
      ko: "본 사이트는 교육용 가상 콜라보 캠페인 프로토타입이며, A2O LITE 공식 협업 사이트가 아닙니다.",
      en: "This is an educational, fictional collaboration campaign prototype and not an official A2O LITE site.",
    },
  },
  close: { ko: "닫기", en: "Close" },
  closeZoom: { ko: "확대 닫기", en: "Close zoom" },
} satisfies Record<string, unknown>;

export type Goods = {
  id: string;
  name: string;
  img: string;
  w: number;
  h: number;
  alt: L;
  short: L;
  motif: L;
  features: L[];
  story: L;
};

export const goods: Goods[] = [
  {
    id: "charm",
    name: "BLOOM CHARM",
    img: "/bloom/goods/charm.png",
    w: 1024,
    h: 1536,
    alt: {
      ko: "동백꽃·잎·씨앗 참과 bl✿om! 태그가 달린 BLOOM CHARM 키링",
      en: "BLOOM CHARM keyring with camellia flower, leaf, seed charms and a bl✿om! tag",
    },
    short: { ko: "동백꽃 모티프 키링 참", en: "Camellia-motif keyring charm" },
    motif: {
      ko: "핑크 그라데이션 동백꽃, 연두 잎, 주황·갈색 동백씨앗",
      en: "Pink-gradient camellia, lime leaf, orange & brown camellia seeds",
    },
    features: [
      { ko: "청록 외곽선의 동백꽃 메인 참", en: "Main camellia charm with an aqua outline" },
      { ko: "잎·씨앗·민트 캡슐 참과 bl✿om! 로고 태그", en: "Leaf, seed and mint capsule charms with a bl✿om! tag" },
      { ko: "가방이나 열쇠에 거는 카라비너 고리", en: "Carabiner clip for bags or keys" },
    ],
    story: {
      ko: "동백마을의 꽃과 씨앗, A2O LITE의 경쾌한 컬러를 한 줄에 엮었어요. 여행이 끝나도 너의 방식대로 피어난 순간을 기억하도록.",
      en: "Dongbaek Village's flower and seeds strung together with A2O LITE's playful colors — to remember the moment you bloomed your way.",
    },
  },
  {
    id: "stickers",
    name: "BLOOM STICKERS",
    img: "/bloom/goods/stickers.png",
    w: 1024,
    h: 1536,
    alt: {
      ko: "동백꽃·잎·씨앗과 bl✿om! 로고 스티커가 담긴 BLOOM STICKERS 시트",
      en: "BLOOM STICKERS sheet with camellia flower, leaf, seed and bl✿om! logo stickers",
    },
    short: { ko: "동백꽃·잎·씨앗 스티커", en: "Camellia flower, leaf & seed stickers" },
    motif: {
      ko: "동백꽃, 잎, 씨앗, 청록 선 꽃, bl✿om! 로고",
      en: "Camellia flower, leaf, seed, aqua line flower and the bl✿om! logo",
    },
    features: [
      { ko: "광택감 있는 입체 느낌의 스티커 시트", en: "Glossy sticker sheet with a puffy look" },
      { ko: "동백꽃·잎·씨앗 등 브랜드 그래픽 구성", en: "Brand graphics: flower, leaf, seed and more" },
      { ko: "bl✿om! 로고 스티커 포함", en: "Includes a bl✿om! logo sticker" },
    ],
    story: {
      ko: "마을에서 만난 동백의 모양을 그대로 옮겼어요. 다이어리, 노트북, 여행 가방 어디든 너만의 동백을 피워 봐.",
      en: "The shapes of the village's camellias, ready to bloom on your diary, laptop or suitcase.",
    },
  },
  {
    id: "oil",
    name: "CAMELLIA OIL",
    img: "/bloom/goods/oil.png",
    w: 1312,
    h: 1199,
    alt: {
      ko: "bl✿om! 로고가 있는 CAMELLIA OIL 30 mL 병과 패키지",
      en: "CAMELLIA OIL 30 mL bottle and box with the bl✿om! logo",
    },
    short: { ko: "동백오일 30 mL", en: "Camellia oil 30 mL" },
    motif: {
      ko: "동백씨앗과 핑크 그라데이션 동백꽃",
      en: "Camellia seeds and a pink-gradient camellia",
    },
    features: [
      { ko: "용량 30 mL 스포이트 병", en: "30 mL dropper bottle" },
      { ko: "동백꽃 그래픽 패키지 박스", en: "Packaging box with camellia graphics" },
      { ko: "동백마을 X A2O LITE 협업 표기", en: "동백마을 X A2O LITE collab label" },
    ],
    story: {
      ko: "꽃이 진 자리에 맺힌 씨앗에서 오일이 태어나요. 동백마을이 이어 온 동백의 손길을 A2O LITE와 함께 담았어요.",
      en: "Oil is born from the seeds left after the flowers fall — the village's camellia craft, bottled with A2O LITE.",
    },
  },
];

export type Experience = {
  id: string;
  topic: Topic;
  img: string;
  alt: L;
  name: L;
  short: L;
  steps: L[];
  pio: { src: string; w: number; h: number; alt: L };
  tori: { src: string; w: number; h: number; alt: L };
};

export const experiences: Experience[] = [
  {
    id: "tea",
    topic: "experience",
    img: "/bloom/exp/tea-v2.png",
    alt: {
      ko: "동백 숲이 보이는 방에서 피오·토리와 함께 동백꽃잎차를 마시며 명상하는 모습",
      en: "Meditating with camellia petal tea beside Pio and Tori, facing a camellia forest",
    },
    name: { ko: "동백꽃잎차 마시며 명상하기", en: "Camellia Petal Tea Meditation" },
    short: {
      ko: "동백 숲을 바라보며 따뜻한 꽃잎차 한 잔과 함께 쉬어 가요.",
      en: "Slow down with a warm cup of petal tea, facing the camellia forest.",
    },
    steps: [
      { ko: "동백꽃잎차의 향을 천천히 맡아 보기", en: "Take in the scent of camellia petal tea" },
      { ko: "따뜻한 차를 마시며 호흡 가다듬기", en: "Breathe slowly while sipping warm tea" },
      { ko: "숲을 바라보며 나만의 속도로 명상하기", en: "Meditate at your own pace, facing the forest" },
    ],
    pio: { src: "/bloom/chars/pio-smell.png", w: 368, h: 374, alt: { ko: "꽃 향기를 맡는 피오", en: "Pio smelling a flower" } },
    tori: { src: "/bloom/chars/tori-tea.png", w: 322, h: 370, alt: { ko: "차를 마시는 토리", en: "Tori sipping tea" } },
  },
  {
    id: "oil",
    topic: "experience",
    img: "/bloom/exp/oil-v2.png",
    alt: {
      ko: "동백나무 아래 테이블에서 피오·토리와 함께 동백씨앗을 고르는 동백오일 만들기 체험 장면",
      en: "Sorting camellia seeds with Pio and Tori at a table under camellia trees, for oil making",
    },
    name: { ko: "동백오일 만들기", en: "Camellia Oil Making" },
    short: {
      ko: "동백씨앗이 오일이 되는 과정을 직접 경험해요.",
      en: "See how camellia seeds become oil — hands-on.",
    },
    steps: [
      { ko: "동백씨앗과 오일 이야기 듣기", en: "Learn the story of camellia seeds and oil" },
      { ko: "씨앗에서 오일이 나오는 과정 체험하기", en: "Experience how oil comes from the seeds" },
      { ko: "완성된 오일의 향과 질감 느껴 보기", en: "Feel the scent and texture of the oil" },
    ],
    pio: { src: "/bloom/chars/pio-oil.png", w: 368, h: 412, alt: { ko: "오일을 만드는 피오", en: "Pio making oil" } },
    tori: { src: "/bloom/chars/tori-oil.png", w: 349, h: 408, alt: { ko: "오일을 만드는 토리", en: "Tori making oil" } },
  },
  {
    id: "pasta",
    topic: "experience",
    img: "/bloom/exp/pasta.png",
    alt: {
      ko: "피오·토리와 함께 고사리 파스타를 요리하는 쿠킹 클래스 장면",
      en: "Cooking bracken pasta with Pio and Tori in a cooking class",
    },
    name: { ko: "고사리 파스타 쿠킹 클래스", en: "Bracken Pasta Cooking Class" },
    short: {
      ko: "제주 고사리로 만드는 파스타, 함께 요리하고 맛봐요.",
      en: "Cook and taste pasta made with Jeju bracken.",
    },
    steps: [
      { ko: "제주 고사리와 재료 살펴보기", en: "Get to know Jeju bracken and the ingredients" },
      { ko: "함께 고사리 파스타 요리하기", en: "Cook bracken pasta together" },
      { ko: "완성한 파스타 나눠 먹기", en: "Share the pasta you made" },
    ],
    pio: { src: "/bloom/chars/pio-pasta.png", w: 394, h: 385, alt: { ko: "요리하는 피오", en: "Pio cooking" } },
    tori: { src: "/bloom/chars/tori-pasta.png", w: 387, h: 382, alt: { ko: "요리하는 토리", en: "Tori cooking" } },
  },
];

export function t(entry: L, lang: Lang) {
  return entry[lang];
}
