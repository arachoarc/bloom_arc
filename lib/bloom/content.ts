// BLOOM YOUR WAY 캠페인 콘텐츠 (한국어 / 영어)
// PRD v2.2 기준. 가격·재고·성분·확정되지 않은 운영 정보는 넣지 않는다.

export type Lang = "ko" | "en";

type L = Record<Lang, string>;

export const COLLAB = "동백마을 X A2O LITE";

/** 체험 신청 안내 인스타그램 계정 */
export const INSTAGRAM = { handle: "@kareumstay", url: "https://www.instagram.com/kareumstay/" };

export const MAP_QUERY = "제주 서귀포시 한신로531번길 22-1";
export const MAP_LINKS = {
  google: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`,
  naver: `https://map.naver.com/p/search/${encodeURIComponent(MAP_QUERY)}`,
};

export const ui = {
  nav: {
    collab: { ko: "콜라보", en: "Collab" },
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
    sideGoods: { ko: "한정판 굿즈 보기", en: "See limited goods" },
  },
  // 동백마을 X A2O LITE 콜라보 소개 (KV 바로 아래 첫 섹션, 동백숲 배경)
  collab: {
    eyebrow: { ko: "COLLABORATION", en: "COLLABORATION" },
    title: { ko: "NEON처럼 빛나는 동백숲", en: "A camellia forest glowing like NEON" },
    lines: [
      { ko: "저마다의 색으로 피는 동백숲이", en: "A camellia forest where every flower blooms in its own color" },
      { ko: "각자의 색으로 빛나는 A2O LITE를 만나", en: "meets A2O LITE, each shining in their own color —" },
      { ko: "NEON처럼 빛나요.", en: "and together, they glow like NEON." },
    ],
    goodsTitle: { ko: "굿즈에 피어난 콜라보 NEON 그래픽", en: "Collab NEON graphics, blooming on the goods" },
    goodsSub: {
      ko: "이 그래픽들이 동백마을 X A2O LITE 한정판 굿즈에 그대로 담겼어요.",
      en: "These graphics are carried straight onto the limited 동백마을 X A2O LITE goods.",
    },
    forestAlt: {
      ko: "붉은 동백과 흰 동백이 피어 있는 동백나무 숲",
      en: "A camellia forest blooming with red and white camellias",
    },
  },
  story: {
    eyebrow: { ko: "DONGBAEK VILLAGE", en: "DONGBAEK VILLAGE" },
    place: { ko: "제주 · 동백마을", en: "Jeju · Dongbaek Village" },
    title: { ko: "FIND YOUR BLOOM", en: "FIND YOUR BLOOM" },
    lead: {
      ko: "제주에서 각자의 동백을 발견해요.",
      en: "Discover your own camellia in Jeju.",
    },
    body: {
      ko: "동백마을은 겨울이면 마을 곳곳에 붉은 동백이 피어나는 제주의 작은 마을이에요. 꽃이 진 자리에 맺힌 씨앗을 모아 오일로 만들며, 동백과 함께 계절을 보내 왔어요. 숲길을 걷고, 꽃잎차를 마시고, 씨앗을 고르며 각자의 속도로 머물러 보세요.",
      en: "Dongbaek Village is a small Jeju village where red camellias bloom all around in winter. Villagers gather the seeds left behind by fallen flowers and press them into oil, living each season alongside the camellia. Walk the forest paths, sip petal tea, sort seeds — and stay at your own pace.",
    },
    // 피오·토리 소개 (resources/characters_png/characters_story.png 스토리 기준)
    friends: {
      alt: {
        ko: "동백꽃이 핀 제주 돌담 위에서 손 흔드는 동백꽃 피오와 동백씨앗 토리",
        en: "Pio the Camellia and Tori the Camellia Seed waving on a Jeju stone wall with camellias",
      },
      sub: {
        ko: "동백마을의 피오와 토리가 반겨줄거야.",
        en: "Pio and Tori of Dongbaek Village will welcome you.",
      },
      pio: {
        name: { ko: "동백꽃 피오", en: "Pio the Camellia" },
        tagline: { ko: "각자의 색으로 피어나는 친구", en: "The friend who blooms in their own color" },
      },
      tori: {
        name: { ko: "동백씨앗 토리", en: "Tori the Camellia Seed" },
        tagline: { ko: "작은 가능성을 발견하는 친구", en: "The friend who finds small possibilities" },
      },
    },
  },
  goods: {
    eyebrow: { ko: "LIMITED GOODS", en: "LIMITED GOODS" },
    title: {
      ko: "오직 동백마을에서만 만날 수 있어요",
      en: "Only in Dongbaek Village",
    },
    sub: {
      ko: "동백마을 X A2O LITE의 NEON 그래픽을 담은 한정판 굿즈",
      en: "Limited goods carrying the 동백마을 X A2O LITE NEON graphics",
    },
    more: { ko: "자세히 보기", en: "View details" },
    zoomHint: { ko: "이미지를 눌러 확대", en: "Tap image to zoom" },
    features: { ko: "제품 특징", en: "Features" },
    collab: { ko: "콜라보 이야기", en: "Collab story" },
    notifyCta: { ko: "콜라보 굿즈 출시 알림받기", en: "Notify me about the collab goods launch" },
  },
  exp: {
    eyebrow: { ko: "VILLAGE EXPERIENCES", en: "VILLAGE EXPERIENCES" },
    title: {
      ko: "각자의 속도로 동백마을을 만나요",
      en: "Meet Dongbaek Village at your own pace",
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
    /** 참여 방법: 인스타그램 계정 앞뒤 문구 (계정은 링크로 표시) */
    joinBefore: { ko: "", en: "Apply via the Google Form linked in the " },
    joinAfter: { ko: " 인스타그램 프로필 링크 내 구글폼으로 신청", en: " Instagram profile" },
  },
  visit: {
    title: { ko: "동백마을로 놀러 와.", en: "Come visit Dongbaek Village." },
    howTitle: { ko: "찾아오는 방법", en: "Getting there" },
    howBody: {
      ko: "제주 동백마을 위치를 확인하세요.",
      en: "Check where Dongbaek Village is in Jeju.",
    },
    place: { ko: "동백마을방문자센터", en: "Dongbaek Village Visitor Center" },
    address: {
      ko: "제주 서귀포시 한신로531번길 22-1",
      en: "22-1, Hansin-ro 531beon-gil, Seogwipo-si, Jeju",
    },
    google: { ko: "Google 지도에서 보기", en: "Open in Google Maps" },
    naver: { ko: "네이버 지도에서 보기", en: "Open in Naver Map" },
    newTab: { ko: "(새 창)", en: "(opens in new tab)" },
    copy: { ko: "주소 복사", en: "Copy address" },
    copied: { ko: "복사됨", en: "Copied" },
  },
  notify: {
    eyebrow: { ko: "GET NOTIFIED", en: "GET NOTIFIED" },
    title: { ko: "굿즈 출시 소식 가장 먼저 받아보세요", en: "Be the first to hear about the goods launch" },
    pick: { ko: "받아 볼 알림", en: "Your update" },
    goods: { ko: "콜라보 굿즈 출시 소식", en: "Collab goods launch news" },
    goodsDesc: { ko: "BLOOM CHARM · STICKERS · CAMELLIA OIL", en: "BLOOM CHARM · STICKERS · CAMELLIA OIL" },
    email: { ko: "이메일 주소", en: "Email address" },
    placeholder: { ko: "you@example.com", en: "you@example.com" },
    submit: { ko: "알림받기", en: "Get notified" },
    sending: { ko: "신청하는 중…", en: "Signing up…" },
    errSend: {
      ko: "신청을 저장하지 못했어요. 잠시 후 다시 시도해 주세요.",
      en: "We couldn't save your sign-up. Please try again shortly.",
    },
    errEmpty: { ko: "이메일 주소를 입력해 주세요.", en: "Please enter your email address." },
    errFormat: {
      ko: "이메일 형식이 올바르지 않아요. 예) you@example.com",
      en: "That email doesn't look right. e.g. you@example.com",
    },
    proto: {
      ko: "입력한 이메일은 굿즈 출시 알림을 보내는 데에만 사용돼요.",
      en: "Your email is used only to send the goods launch update.",
    },
    doneTitle: { ko: "알림 신청 화면이 완료되었어요!", en: "Your notification sign-up is complete!" },
    doneBody: {
      ko: "신청한 소식",
      en: "Your update",
    },
    doneProto: {
      ko: "굿즈가 출시되면 입력한 이메일로 알려 드릴게요.",
      en: "We'll email you when the goods launch.",
    },
    doneAlt: { ko: "벤치에 나란히 앉아 차를 마시는 피오와 토리", en: "Pio and Tori sipping tea side by side on a bench" },
    again: { ko: "다시 신청하기", en: "Sign up again" },
    top: { ko: "처음으로", en: "Back to top" },
  },
  footer: {
    slogan: { ko: "BLOOM YOUR WAY. 너의 방식대로 피어나.", en: "BLOOM YOUR WAY." },
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
    features: [
      { ko: "청록 외곽선의 동백꽃 메인 참", en: "Main camellia charm with an aqua outline" },
      { ko: "잎·씨앗·민트 캡슐 참과 bl✿om! 로고 태그", en: "Leaf, seed and mint capsule charms with a bl✿om! tag" },
      { ko: "가방이나 열쇠에 거는 카라비너 고리", en: "Carabiner clip for bags or keys" },
    ],
    story: {
      ko: "여행이 끝나도 각자의 방식대로 피어난 순간을 기억하도록, 동백마을의 꽃과 씨앗, A2O LITE의 경쾌한 컬러를 한 줄에 엮었어요.",
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
    features: [
      { ko: "광택감 있는 입체 느낌의 스티커 시트", en: "Glossy sticker sheet with a puffy look" },
      { ko: "동백꽃·잎·씨앗 등 브랜드 그래픽 구성", en: "Brand graphics: flower, leaf, seed and more" },
      { ko: "bl✿om! 로고 스티커 포함", en: "Includes a bl✿om! logo sticker" },
    ],
    story: {
      ko: "동백마을의 동백꽃·잎·씨앗에 A2O LITE의 NEON 컬러를 입혀 스티커로 옮겼어요. 다이어리, 노트북, 여행 가방 어디든 너만의 동백을 피워 봐요.",
      en: "Dongbaek Village's camellia, leaf and seed, colored in A2O LITE's NEON tones and turned into stickers — ready to bloom on your diary, laptop or suitcase.",
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
  img: string;
  alt: L;
  name: L;
  short: L;
  steps: L[];
  duration: L;
  place: L;
  pio: { src: string; w: number; h: number; alt: L };
  tori: { src: string; w: number; h: number; alt: L };
};

export const experiences: Experience[] = [
  {
    id: "tea",
    img: "/bloom/exp/tea-v2.png",
    alt: {
      ko: "동백 숲이 보이는 방에서 피오·토리와 함께 동백꽃잎차를 마시며 명상하는 모습",
      en: "Meditating with camellia petal tea beside Pio and Tori, facing a camellia forest",
    },
    name: { ko: "동백꽃잎차 마시며 명상하기", en: "Camellia Petal Tea Meditation" },
    short: {
      ko: "따뜻한 동백꽃잎차 한 잔과 함께 쉬어 가요.",
      en: "Slow down with a warm cup of camellia petal tea.",
    },
    steps: [
      { ko: "동백꽃잎차의 향을 천천히 맡아 보기", en: "Take in the scent of camellia petal tea" },
      { ko: "따뜻한 차를 마시며 호흡 가다듬기", en: "Breathe slowly while sipping warm tea" },
      { ko: "숲을 바라보며 나만의 속도로 명상하기", en: "Meditate at your own pace, facing the forest" },
    ],
    duration: { ko: "50분", en: "50 min" },
    place: { ko: "제주 동백마을 내 bl✿om! Tea House", en: "bl✿om! Tea House, Dongbaek Village, Jeju" },
    pio: { src: "/bloom/chars/pio-smell.png", w: 368, h: 374, alt: { ko: "꽃 향기를 맡는 피오", en: "Pio smelling a flower" } },
    tori: { src: "/bloom/chars/tori-tea.png", w: 322, h: 370, alt: { ko: "차를 마시는 토리", en: "Tori sipping tea" } },
  },
  {
    id: "oil",
    img: "/bloom/exp/oil-v3.png",
    alt: {
      ko: "동백나무 아래 테이블에서 토리와 함께 동백씨앗을 고르는 동백오일 만들기 체험 장면",
      en: "Sorting camellia seeds with Tori at a table under camellia trees, for oil making",
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
    duration: { ko: "1시간 30분", en: "1 hr 30 min" },
    place: { ko: "제주 동백마을 내 bl✿om! Oil Atelier", en: "bl✿om! Oil Atelier, Dongbaek Village, Jeju" },
    pio: { src: "/bloom/chars/pio-explore.png", w: 390, h: 370, alt: { ko: "주변을 둘러보며 탐험하는 피오", en: "Pio exploring around" } },
    tori: { src: "/bloom/chars/tori-oil.png", w: 349, h: 408, alt: { ko: "오일을 만드는 토리", en: "Tori making oil" } },
  },
  {
    id: "pasta",
    img: "/bloom/exp/pasta-v2.png",
    alt: {
      ko: "제주 돌집 주방에서 피오와 함께 고사리 파스타를 요리하는 쿠킹 클래스 장면",
      en: "Cooking bracken pasta with Pio in a Jeju stone-house kitchen",
    },
    name: { ko: "고사리 파스타 쿠킹 클래스", en: "Bracken Pasta Cooking Class" },
    short: {
      ko: "제주 고사리로 파스타를 요리해보아요.",
      en: "Cook pasta made with Jeju bracken.",
    },
    steps: [
      { ko: "제주 고사리와 재료 살펴보기", en: "Get to know Jeju bracken and the ingredients" },
      { ko: "함께 고사리 파스타 요리하기", en: "Cook bracken pasta together" },
      { ko: "완성한 파스타 맛있게 먹기", en: "Enjoy the pasta you made" },
    ],
    duration: { ko: "1시간 30분", en: "1 hr 30 min" },
    place: { ko: "제주 동백마을 내 bl✿om! Kitchen", en: "bl✿om! Kitchen, Dongbaek Village, Jeju" },
    pio: { src: "/bloom/chars/pio-pasta.png", w: 394, h: 385, alt: { ko: "요리하는 피오", en: "Pio cooking" } },
    tori: { src: "/bloom/chars/tori-pasta.png", w: 387, h: 382, alt: { ko: "요리하는 토리", en: "Tori cooking" } },
  },
];

export function t(entry: L, lang: Lang) {
  return entry[lang];
}
