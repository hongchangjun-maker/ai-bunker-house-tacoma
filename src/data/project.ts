export type Floor = {
  code: string;
  name: string;
  nameEn: string;
  area: string;
  people: string;
  purpose: string;
  purposeEn: string;
  functions: string[];
  adjacent: string;
  color: string;
  planBase: string;
  planWidths: number[];
  capacityBasis: string;
  circulation: string;
  zones: { name: string; area: number; detail: string }[];
};

export const floors: Floor[] = [
  {
    code: 'B1', name: '출입·물류층', nameEn: 'Arrival & Logistics', area: '1,650㎡', people: '동시 48명', purpose: '사람·물자·폐기물의 흐름을 분리하는 첫 관문', purposeEn: 'Safe transition from surface to residence', functions: ['출입·보안 확인', '위생 전환·임시 분리', '하역·장기 비축', '정비·관리'], adjacent: '지상 본관 · B2 · 중앙 서비스 코어', color: '#f4c46b', planBase: '/images/floors/b1-plan-v1', planWidths: [640, 1280, 1536], capacityBasis: '방문·입고 피크 동시 48명, 차량 하역과 보행 동선 분리', circulation: '양 끝 피난계단 2곳 + 중앙 승강기·서비스 코어 + 청결/오염 동선 분리 후보',
    zones: [
      { name: '출입·보안 확인', area: 180, detail: '안내, 신원 확인, 보안 검색과 대기' }, { name: '위생 전환·임시 분리', area: 160, detail: '전실, 샤워, 탈의, 청결/오염 분리 후보' }, { name: '하역·입고', area: 360, detail: '서비스 차량, 검수, 입고 버퍼' }, { name: '건식·대량 비축', area: 380, detail: '팔레트 랙, 밀폐 식품·소모품' }, { name: '정비 작업실', area: 180, detail: '공구, 부품, 로봇·설비 경정비' }, { name: '보안·운영 사무', area: 140, detail: '경비, 안내, 입출고 기록' }, { name: '코어·지원', area: 250, detail: '피난계단, 승강기, 화장실, 설비' },
    ],
  },
  {
    code: 'B2', name: '식당·커뮤니티층', nameEn: 'Community Commons', area: '2,250㎡', people: '144명', purpose: '식사·학습·돌봄·의사결정이 만나는 공동생활 중심', purposeEn: 'The social heart for dining, learning and governance', functions: ['공용식당·주방', '가족 라운지', '교육·도서관', '돌봄·협업'], adjacent: 'B1 · B3 · 인공광 휴게정원', color: '#55d7b2', planBase: '/images/floors/b2-plan-v1', planWidths: [640, 1280, 1536], capacityBasis: '144명 전원 이용, 식당은 2교대 운영을 기준으로 좌석과 주방 분리', circulation: '양 끝 피난계단 2곳 + 중앙 코어 + 주방 서비스 동선 독립 후보',
    zones: [
      { name: '공용식당', area: 360, detail: '2교대 식사, 다양한 연령 좌석' }, { name: '전문 주방', area: 300, detail: '전처리, 조리, 제과, 세척' }, { name: '커뮤니티 라운지', area: 360, detail: '휴식, 소모임, 행사' }, { name: '교육·도서관', area: 300, detail: '교실, 학습실, 자료 보관' }, { name: '아동·가족 공간', area: 180, detail: '놀이, 돌봄, 가족 활동' }, { name: '협업·미디어', area: 210, detail: '회의, 원격업무, 공동 의사결정' }, { name: '인공광 휴게정원', area: 180, detail: '일주기 조명과 심리 회복을 검토하는 후보 공간' }, { name: '코어·지원', area: 360, detail: '복도, 화장실, 수납, 피난·설비' },
    ],
  },
  {
    code: 'B3', name: '생활·숙소층', nameEn: 'Residential Living', area: '2,850㎡', people: '정원 144명', purpose: '24개 가족실과 24개 2인실로 정확히 144개의 침상을 구성', purposeEn: 'Restorative privacy for individuals and families', functions: ['4인 가족실 24실', '2인실 24실', '공용 라운지', '세탁·생활지원'], adjacent: 'B2 · B4 · 양방향 피난계단', color: '#7eb8ff', planBase: '/images/floors/b3-plan-v1', planWidths: [640, 1280, 1536], capacityBasis: '4인 가족실 24실×4명=96명 + 2인실 24실×2명=48명, 합계 144명', circulation: '8개 생활 클러스터 + 순환 복도 + 양 끝 피난계단 2곳 + 중앙 코어',
    zones: [
      { name: '4인 가족실 24실', area: 960, detail: '실당 40㎡, 합계 96명' }, { name: '2인실 24실', area: 528, detail: '실당 22㎡, 합계 48명·일부 무장애' }, { name: '클러스터 라운지', area: 240, detail: '8개 생활군의 공동 거실' }, { name: '세탁·위생 지원', area: 240, detail: '세탁, 건조, 공용 위생 보조' }, { name: '생활지원 스테이션', area: 90, detail: '야간 관리, 간호·상담 연계' }, { name: '수납·하우스키핑', area: 132, detail: '침구, 청소, 생활 소모품' }, { name: '순환·피난·코어', area: 660, detail: '순환 복도, 2개 피난계단, 승강기' },
    ],
  },
  {
    code: 'B4', name: '건강관리층', nameEn: 'Health & Wellbeing', area: '1,800㎡', people: '동시 72명', purpose: '진료·격리·재활·상담·여가를 분리해 장기 체류 건강을 지원', purposeEn: 'Physical, psychological and social resilience', functions: ['진료·관찰', '격리·검사·약제', '상담·재활', '조용한 회복'], adjacent: 'B3 · B5 · 임상 서비스 코어', color: '#c7a7ff', planBase: '/images/floors/b4-plan-v1', planWidths: [640, 1280, 1536], capacityBasis: '일상 진료와 재활·상담의 동시 이용을 분산하고 격리 동선은 별도 운용', circulation: '양 끝 피난계단 2곳 + 중앙 코어 + 청결/의료폐기물 동선 분리',
    zones: [
      { name: '진료·관찰', area: 260, detail: '진찰실, 처치실, 관찰 4병상 후보' }, { name: '격리 구역', area: 120, detail: '압력제어 후보 격리실과 전실' }, { name: '치과·검사·약제', area: 180, detail: '치과, 기초검사, 약품·소모품 후보' }, { name: '상담실', area: 160, detail: '개인·가족·심리 상담' }, { name: '재활·운동', area: 300, detail: '무장애 운동, 물리·작업 재활' }, { name: '조용한 회복·여가', area: 260, detail: '명상, 취미, 사회적 회복' }, { name: '외부 의료연계·운영', area: 120, detail: '외부 협진 후보, 기록, 의료진 지원' }, { name: '코어·지원', area: 400, detail: '복도, 화장실, 청결·오염 지원' },
    ],
  },
  {
    code: 'B5', name: '식량·물 관리층', nameEn: 'Food & Water', area: '2,400㎡', people: '운영 36명', purpose: '5년 계획 수요를 비교하기 위한 비축·재배·수처리 후보 공간', purposeEn: 'Integrated cultivation, storage and water stewardship', functions: ['다단 재배', '장기 식량 비축', '수처리·저장', '자원 회수'], adjacent: 'B4 · B6 · 식품·물류 리프트', color: '#7ed27b', planBase: '/images/floors/b5-plan-v1', planWidths: [640, 1280, 1536], capacityBasis: '실내재배는 신선식품 보완 후보이며, 총 열량·에너지·작황·저장 손실은 별도 실증이 필요', circulation: '양 끝 피난계단 2곳 + 중앙 코어 + 식품 청결 동선/폐기물 동선 분리 후보',
    zones: [
      { name: '다단 수경재배', area: 720, detail: '잎채소, 허브, 일부 채소' }, { name: '버섯·마이크로그린', area: 240, detail: '분리 생육실과 위생 전실' }, { name: '건식 주식 비축', area: 360, detail: '팔레트 랙, 밀폐 용기, 선입선출' }, { name: '냉장·냉동', area: 180, detail: '저온·냉동 저장과 완충 전실' }, { name: '종자·양액', area: 120, detail: '종자, 배지, 영양염, 소모품' }, { name: '수처리·비상저장', area: 300, detail: '정수, 재이용, 90㎥급 계획 버퍼' }, { name: '자원 회수', area: 180, detail: '유기성 자원, 폐기물 분리' }, { name: '품질·포장', area: 120, detail: '세척, 검사, 포장, 출고' }, { name: '코어·지원', area: 180, detail: '복도, 기계 지원, 피난·설비' },
    ],
  },
  {
    code: 'B6', name: '에너지·운영층', nameEn: 'Core Systems', area: '2,050㎡', people: '운영 28명', purpose: '전력·공기·물·통신의 이중화 후보를 모아 사람이 최종 통제하도록 설계한 운영안', purposeEn: 'Human-supervised operation of critical systems', functions: ['통합 관제', '전력·배터리', '공조·수처리', '정비·비상운영'], adjacent: 'B5 · 이중 설비 샤프트 · 독립 피난계단', color: '#ff896f', planBase: '/images/floors/b6-plan-v1', planWidths: [640, 1280, 1536], capacityBasis: '24시간 교대 운영 후보이며, 중요 설비의 부하·예비율·화재·침수 구획은 별도 전문 설계 필요', circulation: '양 끝 피난계단 2곳 + 중앙 코어 + 이중 설비 라이저 + 배터리 방화구획 후보',
    zones: [
      { name: '통합 관제실', area: 180, detail: '사람 중심의 설비·보안 통합 관제' }, { name: '전기실', area: 260, detail: '수배전, 변환, 분전' }, { name: '배터리·UPS', area: 240, detail: '분리 방화구획과 감시' }, { name: '공조·공기처리', area: 360, detail: '구역 공조, 여과, 압력 제어 후보' }, { name: '물·오수·소방 펌프', area: 220, detail: '급배수, 재이용, 소방 계통' }, { name: '통신·보안 IT', area: 160, detail: '통신, 서버, CCTV·출입 데이터' }, { name: '정비·예비부품', area: 260, detail: '공작, 수리, 핵심 부품 보관' }, { name: '비상운영실', area: 160, detail: '상황회의, 수동운전, 기록' }, { name: '코어·방재 지원', area: 210, detail: '피난, 방화, 이중 샤프트' },
    ],
  },
];

export const planningBaseline = {
  residents: 144,
  durationDays: 1825,
  grossArea: 13000,
  beds: { familySuites: 24, familyBeds: 96, twinRooms: 24, twinBeds: 48, total: 144 },
  water: { emergencyLitresPerPersonDay: 15, longStayPlanningLitresPerPersonDay: 20, fiveYearLitres: 5_256_000, plannedBufferLitres: 90_000 },
  food: { kcalPerPersonDay: 2200, fiveYearKcal: 578_160_000, reserveFactor: '별도 손실·여유율 검토' },
  commonCore: '전 층 양 끝 피난계단 2곳, 중앙 승강기·서비스 코어, 이중 설비 라이저',
};

export const systems = [
  { key: 'home', icon: 'Home', title: '주거', value: '144침상', note: '4인 가족실 24실 96명 + 2인실 24실 48명' },
  { key: 'food', icon: 'Sprout', title: '식량', value: '5.78억 kcal 수요', note: '5년 계획 수요. 건식 비축·냉장·재배·재보급을 함께 검토' },
  { key: 'water', icon: 'Droplets', title: '물', value: '525.6만 L 검토수요', note: '20 L/인·일 초기 비교값. 90㎥ 버퍼는 약 31일분이며 충분한 장기 설계값은 아님' },
  { key: 'air', icon: 'Wind', title: '공기', value: '성능 산정 전', note: '구역 분리 계획만 반영했으며 풍량·압력·필터·비상 운전은 별도 검증' },
  { key: 'energy', icon: 'Zap', title: '에너지', value: '부하 산정 전', note: '계통·저장·발전과 예비 설비 조합은 전문 부하 산정 후 확정' },
  { key: 'care', icon: 'HeartPulse', title: '의료', value: '인력·후송 미확정', note: '진료·관찰 공간 후보이며 의료진·약품·외부 후송 협약은 별도 검증' },
  { key: 'waste', icon: 'Recycle', title: '자원순환', value: '성능 산정 전', note: '생활·오수·유기성 폐기물의 구역과 처리 흐름 계획만 반영' },
  { key: 'ai', icon: 'BrainCircuit', title: 'AI 운영', value: '사람이 최종 결정', note: '예측정비·수요예측을 지원하며 자동 권한은 제한' },
];

export const gallery = [
  { src: '/images/renders/program-cutaway-v2-1280.webp', base: '/images/renders/program-cutaway-v2', widths: [640, 1280, 1672], title: '144명·5년 통합 프로그램 단면', tag: 'AI 기본계획 단면 · 6개 층', alt: '실제 본관 사진을 참고하고 동일한 면적표로 맞춘 여섯 개 지하 생활층의 비공식 AI 계획 단면' },
  { src: '/images/renders/resort-connection.webp', title: '본관에서 지하로 내려가는 길', tag: 'AI 재구성 · 출입 공간', alt: '리조트 로비에서 지하 연결통로로 이어지는 접근 가능한 진입 공간' },
  { src: '/images/interiors/community-commons-v1-1280.webp', base: '/images/interiors/community-commons-v1', widths: [640, 1280, 1672], title: '함께 식사하고 쉬는 공간', tag: 'AI 재구성 · B2 생활', alt: '한국인 가족과 어르신이 식사와 독서, 휴식을 즐기는 밝은 공동생활 공간' },
  { src: '/images/interiors/residential-suite.webp', title: '가족과 개인을 위한 숙소', tag: 'AI 재구성 · B3 생활', alt: '가족실과 개인실, 세탁 공간이 연결된 따뜻한 주거 구역' },
  { src: '/images/interiors/medical-wellbeing.webp', title: '건강관리와 회복 공간', tag: 'AI 재구성 · B4 건강', alt: '관찰 병상과 상담, 재활 공간이 함께 있는 밝은 건강관리 구역' },
  { src: '/images/interiors/smart-farm.webp', title: '식량 생산과 물 관리 공간', tag: 'AI 재구성 · B5 자원', alt: '수직재배 선반과 작업대, 설비 관찰 복도가 있는 지하 실내 재배 공간' },
  { src: '/images/interiors/defense-operations-1280.webp', base: '/images/interiors/defense-operations', widths: [640, 1280, 1659], title: '에너지·보안 통합 관제실', tag: 'AI 재구성 · B6 운영', alt: '사람이 태양광, 풍력, CCTV, 로봇과 드론 순찰을 감독하는 밝은 통합 운영센터' },
];

export const evidence = [
  { label: '주소·숙박업 목록', source: '장수군 문화관광', url: 'https://www.jangsu.go.kr/tour/index.jangsu?menuCd=DOM_000000403003000000', note: '주소와 전화번호 확인. 페이지 자료는 공공누리 제4유형.' },
  { label: '계남면 접근 경로', source: '장수군청', url: 'https://www.jangsu.go.kr/index.jangsu?menuCd=DOM_000001306007000000', note: '장수 IC 및 권역별 자동차 접근 설명.' },
  { label: '장수분지·기후', source: '한국민족문화대백과', url: 'https://encykorea.aks.ac.kr/Article/E0048590', note: '장수분지 400~500m와 산악 지형, 기후 개요.' },
  { label: '과거 시설 정보', source: '대한민국 구석구석', url: 'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=0d4d4761-6be0-4e0e-9387-49f36d6f034c', note: '50객실·사우나·컨벤션 등 과거 소개. 현재 운영 여부는 별도 확인 필요.' },
];
