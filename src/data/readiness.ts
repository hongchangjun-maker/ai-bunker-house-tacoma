export type AuditStatus = 'blocker' | 'unverified' | 'concept';

export type AuditItem = {
  id: string;
  domain: string;
  title: string;
  status: AuditStatus;
  finding: string;
  evidence: string;
  citizenQuestion: string;
  owner: string;
  source?: { label: string; url: string };
};

export const auditItems: AuditItem[] = [
  {
    id: 'rights', domain: '사업 전제', title: '소유·경계·용도·운영 상태', status: 'blocker',
    finding: '주소와 과거 시설 정보만 확인됐습니다. 토지·건물의 권리, 경계, 건축물대장, 현재 영업 상태는 확인되지 않았습니다.',
    evidence: '등기·토지대장·건축물대장·현황측량·영업 및 개발행위 관련 원문',
    citizenQuestion: '누가 사업 책임자이며, 주민과 이해관계자가 확인할 수 있는 원문은 어디에 공개됩니까?', owner: '사업주체·법무·측량',
  },
  {
    id: 'ground', domain: '지반·수문', title: '굴착 가능성과 침수·사면 위험', status: 'blocker',
    finding: '지하 6개 층은 이미지와 면적 프로그램일 뿐입니다. 암반, 지하수, 집중호우, 사면 안정과 굴착 영향은 조사되지 않았습니다.',
    evidence: '시추·지질조사, 지하수 장기 관측, 사면·배수 해석, 인접 구조물 영향평가',
    citizenQuestion: '공사와 운영이 인근 물길·우물·사면·도로에 어떤 영향을 주며 누가 배상합니까?', owner: '지반·토목·수문 전문가',
  },
  {
    id: 'egress', domain: '화재·피난', title: '계단 2곳은 피난 검증이 아닙니다', status: 'blocker',
    finding: '도면에는 양 끝 계단을 표시했지만, 실제 이격거리·보행거리·방화구획·특별피난계단·연기제어·지상 직접배출 여부는 미확정입니다.',
    evidence: '용도·재실자 산정, 피난 시뮬레이션, 소방동의, 방화·제연·비상전원 설계',
    citizenQuestion: '화재와 정전이 동시에 발생해도 어린이·노인·휠체어 사용자가 지상까지 나갈 수 있습니까?', owner: '건축·소방·방재',
    source: { label: '국가법령정보센터 직통계단 기준', url: 'https://www.law.go.kr/LSW/lsLinkCommonInfo.do?lsJoLnkSeq=1030364627' },
  },
  {
    id: 'structure', domain: '구조·옥상', title: '태양광·풍력·방호물의 구조 충돌', status: 'blocker',
    finding: '옥상 태양광, 미니풍력, 모래주머니, CCTV는 모두 추가 하중·풍하중·방수·피뢰·정비동선 문제를 만듭니다. 기존 구조의 수용 능력은 모릅니다.',
    evidence: '정밀안전진단, 구조도·재료시험, 풍하중·진동·적설·방수·피뢰 검토',
    citizenQuestion: '옥상 설비가 구조·방수·소방 구조공간과 충돌하지 않는다는 계산서를 공개할 수 있습니까?', owner: '구조·전기·방수·소방',
  },
  {
    id: 'water', domain: '물·위생', title: '90㎥는 5년 저장량이 아니라 약 31일 버퍼', status: 'blocker',
    finding: '144명에게 20L/인·일을 적용하면 5년간 525.6만L가 필요합니다. 90,000L는 약 31일분이므로 수원·처리·재이용·오수처리의 실제 성능이 필수입니다.',
    evidence: '수원별 취수 가능량·수질, 정수 회수율, 소독·모니터링, 오수·슬러지 처리, 고장 시 급수계획',
    citizenQuestion: '가뭄·오염·펌프 고장 때 며칠을 버티며, 수질검사 결과를 누가 매일 확인합니까?', owner: '상하수도·환경·보건',
    source: { label: 'WHO 비상 물 수요', url: 'https://www.who.int/teams/environment-climate-change-and-health/water-sanitation-and-health/environmental-health-in-emergencies/humanitarian-emergencies' },
  },
  {
    id: 'air', domain: '공기·감염', title: '공조 면적만으로 호흡 안전을 증명할 수 없습니다', status: 'blocker',
    finding: '외기량, 여과, 열·습도, CO₂, 오염원, 격리실 압력, 연기제어와 정전 시 운전시간이 산정되지 않았습니다.',
    evidence: '구역별 부하·외기량, 압력차, 필터·예비품, 센서 교정, 비상환기, 감염관리 시운전',
    citizenQuestion: '감염자 발생과 산불 연기가 겹칠 때 깨끗한 공기와 격리 동선은 어떻게 유지됩니까?', owner: '기계·감염관리·소방',
    source: { label: 'CDC 환기와 방향성 기류', url: 'https://www.cdc.gov/niosh/ventilation/faq/index.html' },
  },
  {
    id: 'power', domain: '전력·에너지', title: '설비실은 있으나 부하와 자립시간은 없음', status: 'blocker',
    finding: '태양광·풍력·배터리 이미지는 발전량이나 필수부하 보장값이 아닙니다. 공조·양수·정수·냉장·재배 조명은 큰 연속부하입니다.',
    evidence: '시간대별 필수·일반 부하, 계절 발전량, 배터리 열폭주·소방, 연료·예비부품, 블랙스타트 시험',
    citizenQuestion: '겨울철 무풍·폭설·정전이 며칠 이어질 때 생명유지 부하를 몇 시간 공급합니까?', owner: '전기·에너지·소방',
  },
  {
    id: 'food', domain: '식량·영양', title: '재배 면적은 5년 열량 자립 증거가 아닙니다', status: 'unverified',
    finding: '5.78억kcal는 단순 계획 수요입니다. 작물별 수율, 조명 전력, 종자·배지·비료, 단백질·지방·미량영양소, 저장손실은 산정되지 않았습니다.',
    evidence: '연령·건강별 영양표, 품목별 질량수지, 저장·교체주기, 전력·물 투입, 흉작·오염 대체조달',
    citizenQuestion: '어린이·임산부·당뇨·알레르기 주민에게도 5년간 균형 잡힌 식단이 가능합니까?', owner: '영양·식품·농업·물류',
    source: { label: 'USDA 환경제어농업 제약', url: 'https://www.ars.usda.gov/ARSUserFiles/np305/NP%20305%20Action%20Plan%202024-2029_Finalv2.pdf' },
  },
  {
    id: 'health', domain: '의료·돌봄', title: '진료 공간보다 인력·약품·후송이 먼저', status: 'unverified',
    finding: '관찰 4병상과 격리 후보 공간은 144명의 만성질환·치과·응급·정신건강·출산 요구를 보장하지 않습니다.',
    evidence: '의료진 교대표, 의약품 냉장·유효기간, 산소·검사, 감염·사망 대응, 외부 병원 후송 협약',
    citizenQuestion: '심근경색·분만·중증 감염처럼 내부에서 해결할 수 없는 상황의 후송 기준은 무엇입니까?', owner: '의료·약무·응급구조',
  },
  {
    id: 'access', domain: '접근성·인권', title: '승강기는 화재 피난 대책이 아닙니다', status: 'blocker',
    finding: '일부 무장애 객실 표기만 있습니다. 이동·감각·인지 장애, 노인, 임산부, 아동을 위한 피난 보조와 정보 접근은 설계되지 않았습니다.',
    evidence: '무장애 동선, 대피보조구역·장비·인력, 시각·청각 경보, 쉬운 정보, 실제 사용자 참여시험',
    citizenQuestion: '도움이 필요한 사람이 스스로 선택하고 존엄하게 생활·대피할 수 있도록 당사자가 검증했습니까?', owner: 'BF·건축·복지·당사자 검증단',
    source: { label: '장애인등편의법 정의', url: 'https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1027502415' },
  },
  {
    id: 'people', domain: '운영·심리', title: '20년 운영은 시설보다 사람과 교대 체계', status: 'unverified',
    finding: '24시간 운영 28명 등은 공간 재실 가정이지 실제 인력계획이 아닙니다. 휴무·질병·갈등·교육·세대교체·심리회복을 포함한 운영조직이 없습니다.',
    evidence: '직무·교대표, 최소 인력, 교육·훈련, 대체인력, 갈등조정·고충처리, 아동·취약계층 보호체계',
    citizenQuestion: '누가 규칙을 정하고, 주민은 결정에 참여하며, 부당한 통제에 어떻게 이의를 제기합니까?', owner: '운영·노무·복지·주민대표',
  },
  {
    id: 'security', domain: '보안·개인정보', title: '로봇·드론·CCTV는 안전과 권리를 함께 검증', status: 'unverified',
    finding: '감시 장비의 촬영범위, 보관기간, 접근권한, 오인식, 장애 대응과 드론 운용 적법성이 정해지지 않았습니다. 무기화는 범위에서 제외합니다.',
    evidence: '개인정보 영향평가, 사각지대·비촬영 생활공간, 접근·삭제 기록, 수동정지, 공급망·사이버 보안, 운용 규정',
    citizenQuestion: '생활공간에서 감시받지 않을 권리와 촬영기록 열람·삭제·이의제기 권리가 보장됩니까?', owner: '개인정보·보안·법무·주민대표',
  },
];

export const citizenChecks = [
  '실제 자료와 AI 이미지가 한눈에 구분되는가',
  '누가 책임지고 어떤 원문을 공개하는지 알 수 있는가',
  '노인·아동·장애인도 생활과 피난을 이해할 수 있는가',
  '물·식량·전력의 고장 시 버틸 수 있는 시간이 표시되는가',
  'CCTV·로봇·AI에 대한 거부·이의제기·수동중단 권한이 있는가',
  '사업을 중단해야 하는 조건과 주민 피해 구제 절차가 있는가',
];
