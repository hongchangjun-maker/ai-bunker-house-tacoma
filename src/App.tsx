import { ArrowDown, ArrowRight, Building2, ChevronRight, Compass, Download, ExternalLink, FileCheck2, Images, Layers3, MapPinned, ShieldCheck, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { ContactForm } from './components/ContactForm';
import { FloorExplorer } from './components/FloorExplorer';
import { Gallery } from './components/Gallery';
import { Header } from './components/Header';
import { MapEvidence } from './components/MapEvidence';
import { Reveal } from './components/Reveal';
import { ResponsiveImage } from './components/ResponsiveImage';
import { ReadinessAudit } from './components/ReadinessAudit';
import { SectionDiagram } from './components/SectionDiagram';
import { SiteTour } from './components/SiteTour';
import { SystemGrid } from './components/SystemGrid';
import { planningBaseline } from './data/project';

type Lang = 'ko' | 'en';

const copy = {
  ko: {
    kicker: 'AI BUNKER HOUSE NO.1 · TACOMA JANGSU',
    hero: <>장수의 산자락 아래,<br /><em>144명·5년을 기준으로 설계한</em><br />방어형 생활기지를 구축했습니다.</>,
    heroSub: '실제 타코마 장수리조트 본관 사진을 바탕으로, 144명·5년 운영 기준과 지하 6개 층의 공간·설비·운영 체계를 통합한 비공식 AI 구축안입니다.',
    primary: '외관부터 둘러보기', secondary: '지하 6개 층 보기',
    concept: '구축 범위를 먼저 확인하세요', conceptText: '주소와 사용자가 제공한 본관 사진은 실제 자료입니다. 여기서 구축은 공간 프로그램·운영 기준·AI 시각화로 구성한 구축안을 뜻합니다. 화면의 방어 시설과 지하 공간은 현장 시공 완료 상태가 아니며 전문 실사·설계·인허가가 필요합니다.',
    overviewTitle: <>처음 방문하셨다면,<br /><em>사람이 머무는 하루</em>부터 확인하세요.</>,
    overviewBody: '이 구축안은 벙커의 두꺼운 벽보다 그 안에서 이어질 식사, 휴식, 건강관리와 일상에 먼저 주목합니다. 기존 본관은 방문·숙박·교육의 지상 거점으로 활용하고, 지하 공간은 충분한 조사와 승인을 거쳐 필요한 기능부터 단계적으로 검토합니다.',
    locationTitle: <>어디에 있고,<br /><em>무엇이 확인됐는지</em> 먼저 보여드립니다.</>,
    architectureTitle: <>하나의 면적표로 맞춘<br /><em>지하 6개 층</em>을 확인하세요.</>,
    floorsTitle: <>각 층을 눌러, 고화질 3D 평면도를 살펴보세요.</>,
    systemsTitle: <>144명이 오래 머물려면<br /><em>무엇이 필요할까요?</em></>,
    proposalTitle: <>구축안을 실제 사업으로 옮기려면<br /><em>이 순서</em>가 필요합니다.</>,
    contactTitle: <>궁금한 점과<br /><em>협업 제안</em>을 남겨 주세요.</>,
  },
  en: {
    kicker: 'AI BUNKER HOUSE NO.1 · TACOMA JANGSU',
    hero: <>A surface resort connected to<br />a <em>six-level</em>, 144-person residence</>,
    heroSub: 'An integrated five-year resilience delivery plan grounded in the existing resort building, with six underground levels subject to survey, engineering and approval.',
    primary: 'Start the exterior tour', secondary: 'Explore six levels',
    concept: 'UNOFFICIAL ARCHITECTURAL DELIVERY PLAN', conceptText: '“Built” refers to this integrated spatial, operational and visual plan, not completed site construction. This is not an official project, sales or booking page. Ownership, approvals, cost, safety and performance remain unverified.',
    overviewTitle: <>Start with <em>everyday life</em><br />inside a resilient place.</>,
    overviewBody: 'The proposal reuses the resort as a surface living and hospitality gateway, with six functional levels beneath adjacent land. Human dignity, operational continuity and evidence-led decisions sit at its core.',
    locationTitle: <>A real address.<br /><em>Conditional, evidence-led</em> decisions.</>,
    architectureTitle: <>Not a single image,<br />but an <em>interconnected system</em>.</>,
    floorsTitle: <>Six levels. One living ecosystem.</>,
    systemsTitle: <>Five years is not a slogan.<br />It is an <em>operating discipline</em>.</>,
    proposalTitle: <>A new <em>resilience infrastructure</em><br />beginning with site regeneration.</>,
    contactTitle: <>The next step begins<br />with <em>site verification</em>.</>,
  },
};

export default function App() {
  const [language, setLanguage] = useState<Lang>('ko');
  const t = copy[language];
  const premiseCards = language === 'ko' ? [
    { title: '본관부터 현실적으로 활용', body: '객실·로비·식당 등 기존 공간은 구조와 설비를 점검한 뒤 숙박, 교육, 진료, 지역 협력에 우선 활용합니다.', icon: Building2 },
    { title: '지하는 조사 후 단계적으로', body: '지질·지하수·배수·피난 조건을 먼저 확인하고, 실제로 가능한 범위 안에서 필요한 시설부터 순차적으로 검토합니다.', icon: Layers3 },
    { title: '확인된 내용만 사업에 반영', body: '소유권, 구조안전, 인허가, 공사비와 운영인력이 확인되기 전에는 수용인원이나 자립 성능을 확정하지 않습니다.', icon: ShieldCheck },
  ] : [
    { title: 'Start with the existing building', body: 'Guest rooms, the lobby and dining areas are reused for lodging, education, care and local partnerships after structural and services checks.', icon: Building2 },
    { title: 'Study underground works in phases', body: 'Geology, groundwater, drainage and evacuation conditions are verified before any below-ground programme is advanced.', icon: Layers3 },
    { title: 'Build only on verified facts', body: 'Capacity and performance remain unconfirmed until ownership, safety, approvals, cost and operating staff are established.', icon: ShieldCheck },
  ];

  return (
    <div id="top" className={`app lang-${language}`}>
      <Header language={language} onLanguage={() => setLanguage((v) => v === 'ko' ? 'en' : 'ko')} />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <ResponsiveImage className="hero-image" base="/images/site/defense-front-day" widths={[640, 1280, 1511]} sizes="100vw" loading="eager" fetchPriority="high" alt="실제 타코마 장수리조트 본관 사진을 기반으로 태양광, 미니 풍력, CCTV, 모래주머니 진지, 외곽 철조망과 보안 로봇을 배치한 AI 방어 구축안" />
          <div className="hero-overlay" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-content">
            <Reveal><p className="hero-kicker"><span />{t.kicker}</p></Reveal>
            <Reveal delay={0.08}><h1 id="hero-title">{t.hero}</h1></Reveal>
            <Reveal delay={0.15}><p className="hero-sub">{t.heroSub}</p></Reveal>
            <Reveal className="hero-actions" delay={0.22}>
              <a className="button button-primary" href="#site-tour">{t.primary}<ArrowRight /></a>
              <a className="button button-ghost" href="#floors">{t.secondary}<Layers3 /></a>
            </Reveal>
          </div>
          <div className="hero-metrics">
            <div><strong>144</strong><span>{language === 'ko' ? '계획 인원' : 'PEOPLE'}<small>{language === 'ko' ? '설계 기준' : 'planning basis'}</small></span></div>
            <div><strong>5년</strong><span>{language === 'ko' ? '운영 목표' : 'TARGET'}<small>{language === 'ko' ? '검증 전 가정' : 'to be validated'}</small></span></div>
            <div><strong>B6</strong><span>{language === 'ko' ? '지하 공간' : 'LEVELS'}<small>{language === 'ko' ? '6개 생활층' : 'six living levels'}</small></span></div>
            <div><strong>사람</strong><span>{language === 'ko' ? '최종 판단' : 'FINAL SAY'}<small>{language === 'ko' ? 'AI는 운영 보조' : 'AI only assists'}</small></span></div>
          </div>
          <a className="scroll-cue" href="#notice"><span>{language === 'ko' ? '아래로 둘러보기' : 'SCROLL TO EXPLORE'}</span><ArrowDown /></a>
        </section>

        <aside id="notice" className="concept-notice">
          <span><FileCheck2 /></span>
          <div><strong>{t.concept}</strong><p>{t.conceptText}</p></div>
          <a href="#evidence">{language === 'ko' ? '실제 자료와 근거 보기' : 'View evidence'}<ChevronRight /></a>
        </aside>

        <nav className="visitor-path" aria-label={language === 'ko' ? '추천 둘러보기 순서' : 'Recommended tour order'}>
          <div className="visitor-path-intro"><small>{language === 'ko' ? '처음 오셨나요?' : 'FIRST VISIT?'}</small><strong>{language === 'ko' ? '관심 있는 장면부터 바로 둘러보세요.' : 'Start with the scene that interests you.'}</strong></div>
          <a href="#overview"><span>01</span><Compass /><strong>{language === 'ko' ? '1분 요약' : 'One-minute view'}</strong><small>{language === 'ko' ? '장소와 계획의 핵심' : 'The idea at a glance'}</small></a>
          <a href="#site-tour"><span>02</span><Images /><strong>{language === 'ko' ? '외관 투어' : 'Exterior tour'}</strong><small>{language === 'ko' ? '전면·외곽·야간 장면' : 'Front, perimeter and night'}</small></a>
          <a href="#floors"><span>03</span><Layers3 /><strong>{language === 'ko' ? '지하 6개 층' : 'Six levels'}</strong><small>{language === 'ko' ? '층별 생활 기능' : 'Life on every level'}</small></a>
          <a href="#audit"><span>04</span><FileCheck2 /><strong>{language === 'ko' ? '안전 검증' : 'Safety review'}</strong><small>{language === 'ko' ? '검증 0건 · 필수 과제 8개' : '0 verified · 8 blockers'}</small></a>
        </nav>

        <section id="overview" className="section section-overview">
          <div className="section-number">01</div>
          <div className="section-heading two-col">
            <Reveal><div><p className="eyebrow">{language === 'ko' ? '프로젝트 한눈에 보기 · OVERVIEW' : 'PROJECT OVERVIEW'}</p><h2>{t.overviewTitle}</h2></div></Reveal>
            <Reveal delay={0.08}><div><p className="lead">{t.overviewBody}</p><div className="keyword-row">{(language === 'ko' ? ['기존 건물 활용', '사람이 최종 판단', '단계별 검증'] : ['ADAPTIVE REUSE', 'HUMAN DECISION', 'PHASED VALIDATION']).map((item) => <span key={item}>{item}</span>)}</div></div></Reveal>
          </div>
          <Reveal><figure className="premise-visual">
            <ResponsiveImage base="/images/site/visitor-arrival-v1" widths={[640, 1280, 1672]} sizes="(max-width: 820px) 100vw, 1600px" alt={language === 'ko' ? '실제 본관 사진을 참고해 한국인 가족 방문객과 안내자, 태양광 설비와 보안 로봇을 밝게 재구성한 AI 이미지' : 'Bright AI reconstruction of Korean visitors arriving at the actual-building-inspired resilience campus'} />
            <figcaption><span>{language === 'ko' ? '방문객 시점 AI 재구성 · 실제 본관 사진 참고' : 'AI VISITOR VIEW · BASED ON THE ACTUAL BUILDING'}</span><strong>{language === 'ko' ? '도착하는 순간부터, 에너지·보안·생활 기능을 어렵지 않게 이해할 수 있는 장소를 제안합니다.' : 'A place where energy, security and daily-life systems are easy to understand from arrival.'}</strong></figcaption>
          </figure></Reveal>
          <div className="premise-grid">
            {premiseCards.map((card, index) => {
              const Icon = card.icon;
              return <Reveal key={card.title} delay={index * 0.06}><article><span>{String(index + 1).padStart(2, '0')}</span><Icon /><h3>{card.title}</h3><p>{card.body}</p></article></Reveal>;
            })}
          </div>
        </section>

        <section id="site-tour" className="section section-site-tour">
          <div className="section-number">02</div>
          <div className="section-heading two-col light">
            <Reveal><div><p className="eyebrow">외관 실사형 투어 · EXTERIOR TOUR</p><h2>실제 본관을 기준으로<br /><em>방어 거점 구축안을 제시합니다.</em></h2></div></Reveal>
            <Reveal delay={0.08}><p className="lead">전면 방어 장면부터 외곽 순찰, 옥상 에너지 설비와 야간 경계까지 차례로 둘러보세요. 태양광·CCTV·철조망·로봇·드론은 공격 장비가 아니라 감시, 출입 통제와 운영 지속성을 설명하기 위한 AI 시각 요소입니다.</p></Reveal>
          </div>
          <SiteTour />
        </section>

        <section id="location" className="section section-location">
          <div className="section-number">03</div>
          <Reveal><div className="section-heading"><p className="eyebrow">위치와 확인 자료 · LOCATION & EVIDENCE</p><h2>{t.locationTitle}</h2><p className="lead narrow">실제 주소와 공개 자료로 확인할 수 있는 내용, 현장 조사 전에는 알 수 없는 내용을 나눠 표시했습니다. 지도에서 위치를 살펴본 뒤 근거 자료를 직접 열어볼 수 있습니다.</p></div></Reveal>
          <div id="evidence"><MapEvidence /></div>
        </section>

        <section id="architecture" className="section section-architecture">
          <div className="section-number">04</div>
          <div className="section-heading two-col light">
            <Reveal><div><p className="eyebrow">지상에서 지하로 · SURFACE TO B6</p><h2>{t.architectureTitle}</h2></div></Reveal>
            <Reveal delay={0.08}><p className="lead">지상 본관에서 출입·위생 전환 구역을 지나 식사, 주거, 건강관리, 식량·물, 에너지 운영층을 차례로 배치한 통합 계획입니다. 화면의 단면은 층별 관계를 정리한 기본계획이며 실제 깊이·구조·피난 체계는 전문 조사와 인허가 검토 후 확정해야 합니다.</p></Reveal>
          </div>
          <Reveal><div className="cutaway-feature">
            <ResponsiveImage base="/images/renders/program-cutaway-v2" widths={[640, 1280, 1672]} sizes="100vw" alt="실제 본관 사진을 참고하고 동일한 통합 면적표에 맞춘 지하 6개 층의 AI 계획 단면" />
            <div className="image-legend"><span>AI 기본계획 단면 · 인허가·시공 도면 아님</span><strong>B1 출입·물류부터 B6 핵심 설비까지, 층별 평면도와 같은 프로그램으로 구성했습니다.</strong></div>
          </div></Reveal>
          <Reveal><div className="survival-baseline" aria-label="144명 5년 계획 기준">
            <article><small>정확한 침상 구성</small><strong>{planningBaseline.beds.total}침상</strong><p>4인 가족실 24실 96명 + 2인실 24실 48명</p></article>
            <article><small>6개 층 연면적</small><strong>{planningBaseline.grossArea.toLocaleString()}㎡</strong><p>B1~B6 층별 구역 면적 합계와 일치</p></article>
            <article><small>5년 장기 검토 물 수요</small><strong>525.6만 L</strong><p>20 L/인·일 초기 비교값. 90㎥ 버퍼는 약 31일분</p></article>
            <article><small>5년 계획 열량</small><strong>5.78억 kcal</strong><p>2,200 kcal/인·일 기준. 손실·안전재고는 별도 검토</p></article>
          </div></Reveal>
          <p className="baseline-sources">계획 기준 참고: <a href="https://www.who.int/teams/environment-climate-change-and-health/water-sanitation-and-health/environmental-health-in-emergencies/humanitarian-emergencies" target="_blank" rel="noreferrer">WHO 비상 물 기준</a><span>·</span><a href="https://www.law.go.kr/LSW/lsLinkCommonInfo.do?lsJoLnkSeq=1030364627" target="_blank" rel="noreferrer">국내 직통계단 기준</a><span>·</span><a href="https://www.ars.usda.gov/ARSUserFiles/np305/NP%20305%20Action%20Plan%202024-2029_Finalv2.pdf" target="_blank" rel="noreferrer">USDA 환경제어농업 한계</a></p>
          <Reveal><SectionDiagram /></Reveal>
          <div className="diagram-note"><b>통합 기본계획 · 실시설계 전</b><p>단면, 3D 평면도와 면적표는 동일한 프로그램을 사용합니다. 굴착 깊이, 구조, 피난거리, 방재구획, 환기·설비 용량은 지반·구조·소방·기계 전문가의 현장 조사와 인허가 설계가 필요합니다.</p></div>
        </section>

        <section className="section section-gallery">
          <div className="section-heading two-col">
            <Reveal><div><p className="eyebrow">생활 공간 실사 투어 · LIFE INSIDE</p><h2>식사·주거·의료·식량·운영 공간을<br /><em>실사 이미지로 둘러보세요.</em></h2></div></Reveal>
            <Reveal delay={0.08}><p className="lead">사진을 누르면 크게 볼 수 있습니다. 모든 내부 이미지는 방문객의 이해를 돕기 위한 AI 재구성으로, 현재 현장 모습이나 확정 설계가 아닙니다. 밝기와 색감을 통일해 공간의 차이를 쉽게 비교할 수 있게 했습니다.</p></Reveal>
          </div>
          <Gallery />
        </section>

        <section id="floors" className="section section-floors">
          <div className="section-number">05</div>
          <Reveal><div className="section-heading"><p className="eyebrow">층별 둘러보기 · INTERACTIVE FLOOR GUIDE</p><h2>{t.floorsTitle}</h2><p className="lead narrow">층을 선택하면 축소 미리보기가 바뀌고, 이미지를 누르면 구역별 면적표와 함께 고화질 3D 평면도를 팝업으로 확대해 볼 수 있습니다. 모든 층은 양 끝 피난계단 2곳, 중앙 서비스 코어와 이중 설비 라이저를 공통 기준으로 삼았습니다.</p></div></Reveal>
          <Reveal><FloorExplorer language={language} /></Reveal>
        </section>

        <section id="systems" className="section section-systems">
          <div className="section-number">06</div>
          <div className="section-heading two-col light">
            <Reveal><div><p className="eyebrow">생활을 지탱하는 8가지 시스템</p><h2>{t.systemsTitle}</h2></div></Reveal>
            <Reveal delay={0.08}><p className="lead">집처럼 머물려면 주거만으로는 부족합니다. 식량, 물, 공기, 에너지, 의료, 자원순환을 서로 연결하고, AI는 재고와 설비 이상을 알려주는 보조 역할만 맡습니다.</p></Reveal>
          </div>
          <SystemGrid />
          <div className="timeline">
            <div className="timeline-line" />
            {[['0–30일','전환','입주 등록, 건강 기준선, 재고·설비 인수'],['1–6개월','안정화','운영조 편성, 공급망 이중화, 교육·훈련'],['6–24개월','균형','재배·저장·소비 최적화, 정비 주기 고도화'],['2–5년','지속','부품·종자·심리·의료 회복력 점검과 외부 연계']].map(([time,title,text]) => <article key={time}><span>{time}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
          <div className="governance-banner"><BrainMark /><div><small>AI GOVERNANCE PRINCIPLE</small><strong>AI는 감지·예측·제안을 담당하고,<br />사람은 승인·기록·중단 권한을 가집니다.</strong></div><ul><li>권한 최소화</li><li>수동 우회</li><li>감사 기록</li><li>오프라인 절차</li></ul></div>
        </section>

        <section id="audit" className="section section-audit">
          <div className="section-number">07</div>
          <div className="section-heading two-col light">
            <Reveal><div><p className="eyebrow">20년차 운영 관점 × 시민 검증단 · READINESS AUDIT</p><h2>완성도를 말하기 전에,<br /><em>통과해야 할 질문</em>부터 공개합니다.</h2></div></Reveal>
            <Reveal delay={0.08}><p className="lead">이 화면은 인증서나 안전 판정서가 아닙니다. 지하 장기거주 시설을 실제로 검토할 때 전문가와 시민이 요구해야 할 증거, 책임 분야와 중단 조건을 한곳에 모은 공개 검증 대시보드입니다.</p></Reveal>
          </div>
          <Reveal><ReadinessAudit /></Reveal>
        </section>

        <section className="section section-proposal">
          <div className="section-number">08</div>
          <Reveal><div className="section-heading"><p className="eyebrow">현실화 순서 · FROM IDEA TO SITE</p><h2>{t.proposalTitle}</h2><p className="lead narrow">멋진 이미지보다 먼저 확인할 것이 있습니다. 기존 시설 점검에서 시작해 작은 실증을 거친 뒤 확장 여부를 결정하는 순서입니다.</p></div></Reveal>
          <div className="proposal-grid">
            <Reveal><article className="proposal-lead"><span>01</span><h3>본관 상태와 권리 확인</h3><p>소유·권리, 구조안전, 설비 상태와 현재 운영 여부를 현장과 원문 서류로 확인합니다.</p><a href="#contact">현장 확인 문의<ArrowRight /></a></article></Reveal>
            <Reveal delay={0.06}><article><span>02</span><h3>지상 공간부터 재생</h3><p>로비·객실·식당 중 활용 가능한 곳을 먼저 고쳐 방문, 숙박과 교육 프로그램으로 시험합니다.</p></article></Reveal>
            <Reveal delay={0.12}><article><span>03</span><h3>작은 실증으로 검증</h3><p>에너지·보안·물·스마트팜 모듈을 작게 운영해 비용과 유지관리 난이도를 기록합니다.</p></article></Reveal>
            <Reveal delay={0.18}><article><span>04</span><h3>근거가 있을 때 확장</h3><p>지질·지하수·피난·인허가와 운영 인력이 확인된 범위에서만 지하 프로그램을 결정합니다.</p></article></Reveal>
          </div>
          <div className="download-card"><div><Sparkles /><span><small>한눈에 보는 프로젝트 안내서 · PDF</small><strong>핵심 장면, 6개 층과 확인 과제를<br />한 문서에서 차분히 살펴보세요.</strong></span></div><a className="button button-primary" href="/brochure/ai-bunker-house-tacoma-brochure.pdf" download>안내서 내려받기<Download /></a></div>
        </section>

        <section id="contact" className="section section-contact">
          <div className="contact-aside">
            <p className="eyebrow">문의와 협업 · CONTACT</p>
            <h2>{t.contactTitle}</h2>
            <p>방문, 사업 검토, 설계·기술 협업과 지역 연계에 관한 의견을 남겨 주세요. 아직 확인되지 않은 내용은 추측하지 않고 ‘확인 필요’로 답변합니다.</p>
            <div className="contact-facts"><span><MapPinned /><small>프로젝트 기준 주소</small>장수군 계남면 장수로 2662-11</span><span><ShieldCheck /><small>현재 상태</small>비공식 AI 구축안 · 현장 실사·실시설계 전</span></div>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer>
        <div className="footer-brand"><span className="brand-mark"><i /><i /><i /></span><div><strong>AI BUNKER HOUSE NO.1</strong><small>TACOMA JANGSU MASTER PLAN</small></div></div>
        <p>© 2026 비공식 AI 건축·운영 구축안. 실제 리조트 및 관계 기관의 공식 사업·예약·판매 페이지가 아니며 현장 시공 완료를 뜻하지 않습니다.</p>
        <div><a href="#notice">실제와 가정</a><a href="#audit">전문가·시민 검증</a><a href="#evidence">확인 자료</a><a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap <ExternalLink /></a></div>
      </footer>
    </div>
  );
}

function BrainMark() {
  return <div className="brain-mark" aria-hidden="true"><span /><span /><span /><span /></div>;
}
