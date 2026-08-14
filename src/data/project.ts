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
};

export const floors: Floor[] = [
  { code: 'B1', name: '출입·물류층', nameEn: 'Arrival & Logistics', area: '1,650㎡', people: '동시 48명', purpose: '방문객과 물자가 지상에서 안전하게 들어오는 첫 관문', purposeEn: 'Safe transition from surface to residence', functions: ['출입 확인', '위생 전환', '하역·창고', '안내·관리'], adjacent: '지상 본관 · B2 · 수직 이동 코어', color: '#f4c46b' },
  { code: 'B2', name: '식당·커뮤니티층', nameEn: 'Community Commons', area: '2,250㎡', people: '144명', purpose: '함께 먹고 배우고 의논하는 공동생활의 중심', purposeEn: 'The social heart for dining, learning and governance', functions: ['공용식당', '열린 주방', '가족 라운지', '교육·회의'], adjacent: 'B1 · B3 · 실내 정원', color: '#55d7b2' },
  { code: 'B3', name: '생활·숙소층', nameEn: 'Residential Living', area: '2,850㎡', people: '144명', purpose: '개인과 가족이 편안히 쉬고 사생활을 지키는 공간', purposeEn: 'Restorative privacy for individuals and families', functions: ['가족실', '개인실', '무장애 객실', '세탁·수납'], adjacent: 'B2 · B4 · 피난 코어', color: '#7eb8ff' },
  { code: 'B4', name: '건강관리층', nameEn: 'Health & Wellbeing', area: '1,800㎡', people: '동시 72명', purpose: '일상 진료부터 상담과 운동까지 회복을 돕는 공간', purposeEn: 'Physical, psychological and social resilience', functions: ['건강관리실', '상담실', '운동·재활', '조용한 회복실'], adjacent: 'B3 · B5 · 서비스 코어', color: '#c7a7ff' },
  { code: 'B5', name: '식량·물 관리층', nameEn: 'Food & Water', area: '2,400㎡', people: '운영 36명', purpose: '먹거리 재배·저장과 물 관리 과정을 한곳에서 운영', purposeEn: 'Integrated cultivation, storage and water stewardship', functions: ['실내 재배', '종자 보관', '저온 창고', '정수·재이용'], adjacent: 'B4 · B6 · 물류 리프트', color: '#7ed27b' },
  { code: 'B6', name: '에너지·운영층', nameEn: 'Core Systems', area: '2,050㎡', people: '운영 28명', purpose: '전력·공기·보안 설비를 사람이 한눈에 점검하는 공간', purposeEn: 'Human-supervised operation of critical systems', functions: ['통합 관제실', '전력·배터리', '공조 설비', '비상 운영실'], adjacent: 'B5 · 이중 설비 샤프트', color: '#ff896f' },
];

export const systems = [
  { key: 'home', icon: 'Home', title: '주거', value: '144석', note: '가족실·개인실·무장애 객실의 혼합 구성' },
  { key: 'food', icon: 'Sprout', title: '식량', value: '다중 조달', note: '저장식 + 외부 공급 + 실내 재배를 조합하는 가정' },
  { key: 'water', icon: 'Droplets', title: '물', value: '다중 수원', note: '상수·저장·재이용 후보는 수문조사 후 확정' },
  { key: 'air', icon: 'Wind', title: '공기', value: '구역 분리', note: '독립 공조와 필터링, 양압 계획은 전문 설계 대상' },
  { key: 'energy', icon: 'Zap', title: '에너지', value: 'N+1 개념', note: '계통·저장·발전 조합은 부하 산정 후 확정' },
  { key: 'care', icon: 'HeartPulse', title: '의료', value: '1차 대응', note: '상시 건강관리와 원격 협진을 전제로 한 공간' },
  { key: 'waste', icon: 'Recycle', title: '자원순환', value: '분리 처리', note: '생활·오수·유기성 폐기물 흐름을 구획' },
  { key: 'ai', icon: 'BrainCircuit', title: 'AI 운영', value: '사람이 최종 결정', note: '예측정비·수요예측을 지원하며 자동 권한은 제한' },
];

export const gallery = [
  { src: '/images/renders/defense-cutaway-1280.webp', base: '/images/renders/defense-cutaway', widths: [640, 1280, 1672], title: '지상 본관과 지하 6개 층 전체 보기', tag: 'AI 재구성 · 전체 구조', alt: '실제 본관 외관에 태양광, 풍력, CCTV, 철조망과 로봇 순찰을 더하고 여섯 개 지하층을 합성한 비공식 개념 절개 조감도' },
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
