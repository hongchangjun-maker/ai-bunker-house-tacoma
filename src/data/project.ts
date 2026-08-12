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
  { code: 'B1', name: '전환·물류', nameEn: 'Arrival & Logistics', area: '1,650㎡', people: '동시 48명', purpose: '지상과 장기거주 구역 사이의 안전한 전환', purposeEn: 'Safe transition from surface to residence', functions: ['보안 진입', '위생 전환', '하역·창고', '관리통제'], adjacent: '본관 연결통로 · 수직 코어', color: '#f4c46b' },
  { code: 'B2', name: '커먼즈', nameEn: 'Community Commons', area: '2,250㎡', people: '144명', purpose: '식사·학습·회의가 만나는 공동생활 중심', purposeEn: 'The social heart for dining, learning and governance', functions: ['공용식당', '주방', '라운지', '교육·회의'], adjacent: 'B1 · B3 · 중앙 아트리움', color: '#55d7b2' },
  { code: 'B3', name: '리빙', nameEn: 'Residential Living', area: '2,850㎡', people: '144명', purpose: '개인 회복과 가족 단위 프라이버시 보장', purposeEn: 'Restorative privacy for individuals and families', functions: ['가족실', '개인실', '공용욕실', '세탁·수납'], adjacent: 'B2 · B4 · 피난 코어', color: '#7eb8ff' },
  { code: 'B4', name: '웰빙·의료', nameEn: 'Health & Wellbeing', area: '1,800㎡', people: '동시 72명', purpose: '신체·심리·공동체 회복력 유지', purposeEn: 'Physical, psychological and social resilience', functions: ['의료실', '상담실', '피트니스', '명상·커뮤니티'], adjacent: 'B3 · B5 · 서비스 코어', color: '#c7a7ff' },
  { code: 'B5', name: '푸드·워터', nameEn: 'Food & Water', area: '2,400㎡', people: '운영 36명', purpose: '재배·저장·급수의 통합 운용', purposeEn: 'Integrated cultivation, storage and water stewardship', functions: ['스마트팜', '종자보관', '저온창고', '정수·재이용'], adjacent: 'B4 · B6 · 물류 리프트', color: '#7ed27b' },
  { code: 'B6', name: '코어 시스템', nameEn: 'Core Systems', area: '2,050㎡', people: '운영 28명', purpose: '사람이 감독하는 설비·에너지 통합 운영', purposeEn: 'Human-supervised operation of critical systems', functions: ['운영센터', '전력·배터리', '공조', '비상운영'], adjacent: 'B5 · 이중 설비 샤프트', color: '#ff896f' },
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
  { src: '/images/renders/actual-site-cutaway-1280.webp', title: '실제 본관 기반 지상-지하 절개 조감', tag: 'ACTUAL REFERENCE × AI', alt: '실제 타코마 장수리조트 본관 외관과 정확히 여섯 개 지하층을 합성한 비공식 개념 절개 조감도' },
  { src: '/images/renders/resort-connection.webp', title: '본관 내부 연결 게이트', tag: 'CONCEPT VISUAL', alt: '고급 리조트 로비에서 지하 연결통로로 이어지는 접근 가능한 진입 공간' },
  { src: '/images/interiors/community-lounge.webp', title: 'B2 커뮤니티 커먼즈', tag: 'AI RECONSTRUCTION', alt: '식당과 라운지, 실내 정원이 결합된 장기 거주 공동생활 공간' },
  { src: '/images/interiors/residential-suite.webp', title: 'B3 리빙 클러스터', tag: 'AI RECONSTRUCTION', alt: '가족실과 개인실, 세탁 공간이 연결된 따뜻한 주거 구역' },
  { src: '/images/interiors/medical-wellbeing.webp', title: 'B4 웰빙·의료', tag: 'AI RECONSTRUCTION', alt: '관찰 병상과 상담, 재활 공간이 함께 있는 밝은 의료 웰빙 구역' },
  { src: '/images/interiors/smart-farm.webp', title: 'B5 스마트팜', tag: 'AI RECONSTRUCTION', alt: '수직재배 선반과 작업대, 설비 관찰 복도가 있는 지하 스마트팜' },
  { src: '/images/interiors/ai-operations.webp', title: 'B6 통합 운영센터', tag: 'AI RECONSTRUCTION', alt: '사람이 에너지와 물, 공기를 감독하는 통합 운영센터' },
];

export const evidence = [
  { label: '주소·숙박업 목록', source: '장수군 문화관광', url: 'https://www.jangsu.go.kr/tour/index.jangsu?menuCd=DOM_000000403003000000', note: '주소와 전화번호 확인. 페이지 자료는 공공누리 제4유형.' },
  { label: '계남면 접근 경로', source: '장수군청', url: 'https://www.jangsu.go.kr/index.jangsu?menuCd=DOM_000001306007000000', note: '장수 IC 및 권역별 자동차 접근 설명.' },
  { label: '장수분지·기후', source: '한국민족문화대백과', url: 'https://encykorea.aks.ac.kr/Article/E0048590', note: '장수분지 400~500m와 산악 지형, 기후 개요.' },
  { label: '과거 시설 정보', source: '대한민국 구석구석', url: 'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=0d4d4761-6be0-4e0e-9387-49f36d6f034c', note: '50객실·사우나·컨벤션 등 과거 소개. 현재 운영 여부는 별도 확인 필요.' },
];
