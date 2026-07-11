/**
 * NY/NJ Hybrid Race Club — Site Data Configuration
 *
 * 이 파일에서 모임 정보와 이벤트 일정을 편집합니다.
 * TODO_ 로 시작하는 값들은 운영자가 실제 값으로 채워야 합니다.
 * 빌드 브리프 23장: 미확정값은 깔끔한 fallback으로 두고 빌드를 차단하지 않습니다.
 */

export const siteConfig = {
  clubNameEn: "NY/NJ Hybrid Race Club",
  clubNameKo: "뉴욕/뉴저지 하이브리드 레이스 클럽",
  descriptor: "HYROX · Mini HYROX · 5K · Half Marathon",

  // Manager edit password (6-digit)
  // NOTE: This is a client-side gate only — not a true security measure.
  // Change this to your own 6-digit code before deploying.
  managerPassword: "450815",

  // 카카오 오픈채팅 링크 (운영자 제공)
  kakaoOpenChatUrl: "https://open.kakao.com/o/gjuedrvi",
  // TODO: QR 이미지가 준비되면 경로 교체. 현재는 placeholder.
  kakaoQrImage: "/images/openchat-qr-placeholder.png",
  kakaoQrAvailable: false,

  nextMeetup: {
    // TODO: 실제 모임 요일로 교체
    day: "TODO: Saturday",
    // TODO: 실제 모임 시간으로 교체
    time: "TODO: 8:00 AM",
    // TODO: 실제 모임 지역으로 교체
    locationAreaEn: "TODO: Long Island City, NY",
    // TODO: 실제 모임 지역으로 교체
    locationAreaKo: "TODO: 롱아일랜드시티, NY",
    exactLocationPublic: false,
    exactLocationNoteEn: "Exact meetup details are shared in Kakao OpenChat.",
    exactLocationNoteKo: "정확한 모임 장소는 카카오 오픈채팅에서 공유됩니다.",
    formatEn: "HYROX-style circuit + easy run",
    formatKo: "하이록스 스타일 서킷 + 가벼운 러닝",
    levelEn: "All levels",
    levelKo: "누구나 참여 가능",
    // TODO: 실제 참가비로 교체
    feeEn: "TODO: Free / $XX",
    // TODO: 실제 참가비로 교체
    feeKo: "TODO: 무료 / $XX",
    bringEn: ["Running shoes", "Water", "Towel"],
    bringKo: ["운동화", "물", "수건"],
  },

  trainingTypes: [
    {
      titleEn: "HYROX Training",
      titleKo: "HYROX 트레이닝",
      descriptionEn: "Run, push, pull, carry, lunge, row, and finish stronger.",
      descriptionKo: "러닝, 푸시, 풀, 캐리, 런지, 로우 등 하이브리드 레이스 훈련을 함께합니다.",
    },
    {
      titleEn: "Mini HYROX",
      titleKo: "Mini HYROX",
      descriptionEn: "Shorter community-style simulations for practice and confidence.",
      descriptionKo: "짧은 형식의 커뮤니티 연습 세션으로 감각과 자신감을 쌓습니다.",
    },
    {
      titleEn: "5K Running",
      titleKo: "5K 러닝",
      descriptionEn: "Build a running base at a manageable pace.",
      descriptionKo: "각자 페이스에 맞춰 러닝 기본기를 쌓습니다.",
    },
    {
      titleEn: "Half Marathon Prep",
      titleKo: "하프마라톤 준비",
      descriptionEn: "Train consistently toward longer-distance goals.",
      descriptionKo: "장거리 목표를 향해 꾸준히 준비합니다.",
    },
    {
      titleEn: "Strength & Conditioning",
      titleKo: "근력 & 컨디셔닝",
      descriptionEn: "Build the strength and engine hybrid racing demands.",
      descriptionKo: "하이브리드 레이스에 필요한 근력과 체력을 함께 키웁니다.",
    },
    {
      titleEn: "Beginner-Friendly Group Sessions",
      titleKo: "초보자 환영 그룹 운동",
      descriptionEn: "Show up, move, and build with the group — no experience needed.",
      descriptionKo: "그냥 와서 같이 움직이면 됩니다. 경험은 필요 없습니다.",
    },
  ],

  upcomingEvents: [
    {
      type: "HYROX",
      nameEn: "HYROX Race",
      nameKo: "HYROX 대회",
      date: "TBD",
      location: "TBD",
      statusEn: "Watching official schedule",
      statusKo: "공식 일정 확인 중",
      link: "",
      noteEn: "Official registration should happen through the official event website.",
      noteKo: "공식 등록은 공식 대회 웹사이트에서 진행해 주세요.",
    },
    {
      type: "Mini HYROX",
      nameEn: "Mini HYROX Community Session",
      nameKo: "Mini HYROX 커뮤니티 세션",
      date: "TBD",
      location: "NY/NJ",
      statusEn: "Planning",
      statusKo: "준비 중",
      link: "",
      noteEn: "Community training format. Not an official race registration page.",
      noteKo: "커뮤니티 연습 형식입니다. 공식 대회 등록 페이지가 아닙니다.",
    },
    {
      type: "5K",
      nameEn: "5K Race",
      nameKo: "5K 러닝 대회",
      date: "TBD",
      location: "TBD",
      statusEn: "Training group forming",
      statusKo: "함께 준비할 멤버 모집 중",
      link: "",
      noteEn: "Open to all levels.",
      noteKo: "초보자부터 누구나 참여 가능합니다.",
    },
    {
      type: "Half Marathon",
      nameEn: "Half Marathon",
      nameKo: "하프마라톤",
      date: "TBD",
      location: "TBD",
      statusEn: "Training group forming",
      statusKo: "함께 준비할 멤버 모집 중",
      link: "",
      noteEn: "Join the OpenChat for training updates.",
      noteKo: "훈련 일정은 오픈채팅에서 확인해 주세요.",
    },
  ],

  levels: [
    {
      titleEn: "Beginner",
      titleKo: "처음 시작",
      descriptionEn: "New to HYROX or running. Just show up and move.",
      descriptionKo: "HYROX나 러닝이 처음이어도 괜찮습니다. 와서 같이 시작하면 됩니다.",
    },
    {
      titleEn: "Build",
      titleKo: "꾸준히 준비",
      descriptionEn: "Build consistency, strength, and endurance with the group.",
      descriptionKo: "꾸준함, 근력, 체력을 함께 키워가는 단계입니다.",
    },
    {
      titleEn: "Race Prep",
      titleKo: "대회 준비",
      descriptionEn: "Targeting a specific race? Train with focus and structure.",
      descriptionKo: "목표 대회가 있다면, 집중해서 함께 준비합니다.",
    },
  ],

  faq: [
    {
      questionEn: "Can beginners join?",
      questionKo: "초보자도 참여할 수 있나요?",
      answerEn:
        "Yes. All levels are welcome, from first-timers to experienced athletes.",
      answerKo: "네. 처음 시작하는 분부터 경험자까지 누구나 참여할 수 있습니다.",
    },
    {
      questionEn: "Do I need HYROX experience?",
      questionKo: "HYROX 경험이 필요한가요?",
      answerEn:
        "No. You can join even if you are just getting started with HYROX or hybrid fitness training.",
      answerKo: "아니요. HYROX를 막 시작하는 분들도 환영합니다.",
    },
    {
      questionEn: "Do I need to be a good runner?",
      questionKo: "러닝을 잘해야 하나요?",
      answerEn: "No. We prepare for 5K, Half Marathon, and HYROX at different paces.",
      answerKo: "아니요. 각자 페이스에 맞춰 5K, 하프마라톤, HYROX를 준비합니다.",
    },
    {
      questionEn: "Is there a fee?",
      questionKo: "참가비가 있나요?",
      answerEn:
        "Current fee information is listed in the meetup section and updated in Kakao OpenChat.",
      answerKo:
        "현재 참가비 정보는 모임 안내 섹션과 카카오 오픈채팅에서 확인할 수 있습니다.",
    },
    {
      questionEn: "Where do you meet?",
      questionKo: "어디서 모이나요?",
      answerEn:
        "We mainly meet around the NY/NJ area. Exact details are shared in Kakao OpenChat when needed.",
      answerKo:
        "주로 NY/NJ 지역에서 모입니다. 자세한 장소는 필요 시 카카오 오픈채팅에서 공유됩니다.",
    },
    {
      questionEn: "Is the group Korean-only?",
      questionKo: "한국어만 사용하나요?",
      answerEn: "No. Korean and English are both welcome.",
      answerKo: "아니요. 한국어와 영어 모두 가능합니다.",
    },
  ],

  footerNoteEn:
    "Community training group for people interested in HYROX, running, and hybrid fitness races. This is not an official event registration website.",
  footerNoteKo:
    "HYROX, 러닝, 하이브리드 피트니스 레이스에 관심 있는 분들을 위한 커뮤니티 모임입니다. 본 사이트는 공식 대회 등록 사이트가 아닙니다.",
};

export type SiteConfig = typeof siteConfig;