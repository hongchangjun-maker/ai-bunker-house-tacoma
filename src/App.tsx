import { ArrowDown, ArrowRight, Building2, ChevronRight, Download, ExternalLink, FileCheck2, Layers3, MapPinned, ShieldCheck, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { ContactForm } from './components/ContactForm';
import { FloorExplorer } from './components/FloorExplorer';
import { Gallery } from './components/Gallery';
import { Header } from './components/Header';
import { MapEvidence } from './components/MapEvidence';
import { Reveal } from './components/Reveal';
import { ResponsiveImage } from './components/ResponsiveImage';
import { SectionDiagram } from './components/SectionDiagram';
import { SiteTour } from './components/SiteTour';
import { SystemGrid } from './components/SystemGrid';

type Lang = 'ko' | 'en';

const copy = {
  ko: {
    kicker: 'AI BUNKER HOUSE NO.1 · TACOMA JANGSU',
    hero: <>지상 리조트와 연결된,<br /><em>지하 6층형</em> 144인 레지던스</>,
    heroSub: '전북 장수 고원의 입지와 기존 리조트 부지 재생 가능성을 바탕으로 제안하는 5년 자립형 AI 재난대응 레지던스 콘셉트.',
    primary: '프로젝트 탐색', secondary: '브로슈어 PDF',
    concept: '비공식 건축 콘셉트', conceptText: '본 사이트는 타코마 장수 관광농원 또는 관계 기관의 공식 사업·판매·예약 페이지가 아닙니다. 현재 운영 상태, 소유·권리, 인허가, 공사비, 안전성, 수용·자립 성능은 확인·승인되지 않았습니다.',
    overviewTitle: <>기존 리조트를 살리고,<br /><em>재난에 대비한 장기 체류 거점</em>으로 바꿉니다.</>,
    overviewBody: '먼저 기존 본관을 숙박·교육·진료·지역 연계가 가능한 생활 거점으로 정비합니다. 지하 공간은 부지 조사 결과가 적합할 때 단계적으로 검토하며, 소유권·지반·피난·인허가가 확인되기 전에는 규모와 성능을 확정하지 않습니다.',
    locationTitle: <>주소는 실제로,<br />판단은 <em>근거와 조건</em>으로.</>,
    architectureTitle: <>한 장면이 아니라,<br /><em>연결된 시스템</em>으로 봅니다.</>,
    floorsTitle: <>6개 층, 하나의 생활 생태계.</>,
    systemsTitle: <>5년은 숫자가 아니라<br /><em>운영 규율</em>입니다.</>,
    proposalTitle: <>부지 재생에서 시작하는<br />새로운 <em>회복력 인프라</em>.</>,
    contactTitle: <>다음 단계는<br /><em>현장 확인</em>에서 시작합니다.</>,
  },
  en: {
    kicker: 'AI BUNKER HOUSE NO.1 · TACOMA JANGSU',
    hero: <>A surface resort connected to<br />a <em>six-level</em>, 144-person residence</>,
    heroSub: 'A five-year, AI-assisted disaster-resilience residence concept grounded in the highland context and adaptive-reuse potential of an existing resort site in Jangsu.',
    primary: 'Explore project', secondary: 'Download brochure',
    concept: 'UNOFFICIAL ARCHITECTURAL CONCEPT', conceptText: 'This is not an official project, sales or booking page of Tacoma Jangsu Farm Resort or any authority. Operation status, ownership, approvals, cost, safety, capacity and self-reliance performance remain unverified.',
    overviewTitle: <>Designing <em>long-term resilience</em><br />on the memory of an existing place.</>,
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
          <ResponsiveImage className="hero-image" base="/images/site/defense-front-day" widths={[640, 1280, 1511]} sizes="100vw" loading="eager" fetchPriority="high" alt="실제 타코마 장수리조트 본관에 태양광, 미니 풍력, CCTV, 모래주머니 진지, 외곽 철조망과 보안 로봇을 합성한 밝은 AI 디펜스 콘셉트" />
          <div className="hero-overlay" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-content">
            <Reveal><p className="hero-kicker"><span />{t.kicker}</p></Reveal>
            <Reveal delay={0.08}><h1 id="hero-title">{t.hero}</h1></Reveal>
            <Reveal delay={0.15}><p className="hero-sub">{t.heroSub}</p></Reveal>
            <Reveal className="hero-actions" delay={0.22}>
              <a className="button button-primary" href="#overview">{t.primary}<ArrowRight /></a>
              <a className="button button-ghost" href="/brochure/ai-bunker-house-tacoma-brochure.pdf" download>{t.secondary}<Download /></a>
            </Reveal>
          </div>
          <div className="hero-metrics">
            <div><strong>144</strong><span>PERSONS<small>계획 수용 기준</small></span></div>
            <div><strong>5</strong><span>YEARS<small>운영 목표 가정</small></span></div>
            <div><strong>B6</strong><span>LEVELS<small>지하 프로그램</small></span></div>
            <div><strong>AI</strong><span>ASSISTED<small>사람이 최종 결정</small></span></div>
          </div>
          <a className="scroll-cue" href="#notice"><span>SCROLL TO EXPLORE</span><ArrowDown /></a>
        </section>

        <aside id="notice" className="concept-notice">
          <span><FileCheck2 /></span>
          <div><strong>{t.concept}</strong><p>{t.conceptText}</p></div>
          <a href="#evidence">{language === 'ko' ? '근거 보기' : 'View evidence'}<ChevronRight /></a>
        </aside>

        <section id="overview" className="section section-overview">
          <div className="section-number">01</div>
          <div className="section-heading two-col">
            <Reveal><div><p className="eyebrow">{language === 'ko' ? 'PROJECT DIRECTION · 기본 방향' : 'PROJECT DIRECTION'}</p><h2>{t.overviewTitle}</h2></div></Reveal>
            <Reveal delay={0.08}><div><p className="lead">{t.overviewBody}</p><div className="keyword-row">{(language === 'ko' ? ['기존 건물 활용', '사람이 최종 판단', '단계별 검증'] : ['ADAPTIVE REUSE', 'HUMAN DECISION', 'PHASED VALIDATION']).map((item) => <span key={item}>{item}</span>)}</div></div></Reveal>
          </div>
          <Reveal><figure className="premise-visual">
            <ResponsiveImage base="/images/site/overview-site-review" widths={[640, 1280, 1672]} sizes="(max-width: 820px) 100vw, 1600px" alt={language === 'ko' ? '실제 본관을 참고해 건축·시설 관계자가 현장을 점검하는 모습을 재구성한 밝은 실사형 AI 이미지' : 'Bright photoreal AI reconstruction of architects and facility staff reviewing the existing resort building on site'} />
            <figcaption><span>{language === 'ko' ? 'AI 현장 활용 이미지 · 실제 본관 참고' : 'AI SITE-USE VISUAL · BASED ON THE ACTUAL BUILDING'}</span><strong>{language === 'ko' ? '공사를 결정하기 전에, 기존 시설의 상태와 활용 가능성부터 확인합니다.' : 'Assess the existing facility and its reuse potential before deciding on construction.'}</strong></figcaption>
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
            <Reveal><div><p className="eyebrow">ACTUAL SITE × DEFENSIVE RESILIENCE</p><h2>실제 본관에서 출발해,<br /><em>다층 방어 태세를 구축합니다.</em></h2></div></Reveal>
            <Reveal delay={0.08}><p className="lead">현장 원본은 그대로 보존하고, 태양광·미니 풍력·CCTV·모래주머니 방호선·외곽 철조망·상용급 로봇과 드론 순찰을 실제 본관 외관 위에 겹쳤습니다. 공격용 무장이 아닌 감시·억제·에너지 지속성을 중심으로 한 근미래 비공식 콘셉트입니다.</p></Reveal>
          </div>
          <SiteTour />
        </section>

        <section id="location" className="section section-location">
          <div className="section-number">03</div>
          <Reveal><div className="section-heading"><p className="eyebrow">LOCATION & EVIDENCE</p><h2>{t.locationTitle}</h2><p className="lead narrow">주소, 고원 지형, 도로 접근은 공개 자료로 확인했습니다. 개별 부지의 고도·경계·지반·지하수·배수·소유 관계는 현장과 원문 서류로 다시 검증해야 합니다.</p></div></Reveal>
          <div id="evidence"><MapEvidence /></div>
        </section>

        <section id="architecture" className="section section-architecture">
          <div className="section-number">04</div>
          <div className="section-heading two-col light">
            <Reveal><div><p className="eyebrow">SURFACE × SUBTERRANEAN</p><h2>{t.architectureTitle}</h2></div></Reveal>
            <Reveal delay={0.08}><p className="lead">본관 내부의 일상적 공간에서 보안·위생 전환 통로를 거쳐 지하 주거 코어로 이어지는 구성입니다. 비상출구·환기구·설비샤프트는 독립성과 점검성을 우선하며, 실제 위치는 법규·지질·피난해석으로 확정합니다.</p></Reveal>
          </div>
          <Reveal><div className="cutaway-feature">
            <ResponsiveImage base="/images/renders/defense-cutaway" widths={[640, 1280, 1672]} sizes="100vw" alt="밝게 표현한 실제 본관 기반 태양광·풍력·CCTV·철조망 방어선과 가상의 여섯 개 지하층 비공식 절개 조감도" />
            <div className="image-legend"><span>DEFENSIVE RESILIENCE AI CONCEPT · NOT FOR CONSTRUCTION</span><strong>에너지·외곽 경계·로봇 순찰과 지하 6개 층의 통합 가정</strong></div>
          </div></Reveal>
          <Reveal><SectionDiagram /></Reveal>
          <div className="diagram-note"><b>NOT FOR CONSTRUCTION</b><p>단면은 공간 관계를 설명하는 개념도입니다. 굴착 깊이, 구조 형식, 피난거리, 방재구획, 환기·설비 용량은 전문 설계 전 미확정입니다.</p></div>
        </section>

        <section className="section section-gallery">
          <div className="section-heading two-col">
            <Reveal><div><p className="eyebrow">VISUAL NARRATIVE</p><h2>공간을 먼저 보고,<br /><em>가정은 분명히 읽습니다.</em></h2></div></Reveal>
            <Reveal delay={0.08}><p className="lead">공개 사진은 외관·배치 분위기 파악에만 참고했습니다. 아래 이미지는 기존 사진을 복제하지 않은 독자 AI 재구성물이며, 현재 현장 모습이나 확정 설계를 나타내지 않습니다.</p></Reveal>
          </div>
          <Gallery />
        </section>

        <section id="floors" className="section section-floors">
          <div className="section-number">05</div>
          <Reveal><div className="section-heading"><p className="eyebrow">INTERACTIVE FLOOR PROGRAM</p><h2>{t.floorsTitle}</h2><p className="lead narrow">마우스를 올리거나 탭해 각 층의 역할과 인접 동선을 살펴보세요. 총 프로그램 면적 가정은 약 13,000㎡이며, 실측·법정 면적·설비 요구에 따라 크게 달라질 수 있습니다.</p></div></Reveal>
          <Reveal><FloorExplorer language={language} /></Reveal>
        </section>

        <section id="systems" className="section section-systems">
          <div className="section-number">06</div>
          <div className="section-heading two-col light">
            <Reveal><div><p className="eyebrow">144 PEOPLE × 5 YEARS</p><h2>{t.systemsTitle}</h2></div></Reveal>
            <Reveal delay={0.08}><p className="lead">완전 자립을 단정하지 않습니다. 저장·재배·외부 보급·예비 설비를 조합하고, 자원 재고와 품질을 사람이 검증하는 운영 모델을 제안합니다.</p></Reveal>
          </div>
          <SystemGrid />
          <div className="timeline">
            <div className="timeline-line" />
            {[['0–30일','전환','입주 등록, 건강 기준선, 재고·설비 인수'],['1–6개월','안정화','운영조 편성, 공급망 이중화, 교육·훈련'],['6–24개월','균형','재배·저장·소비 최적화, 정비 주기 고도화'],['2–5년','지속','부품·종자·심리·의료 회복력 점검과 외부 연계']].map(([time,title,text]) => <article key={time}><span>{time}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
          <div className="governance-banner"><BrainMark /><div><small>AI GOVERNANCE PRINCIPLE</small><strong>AI는 감지·예측·제안을 담당하고,<br />사람은 승인·기록·중단 권한을 가집니다.</strong></div><ul><li>권한 최소화</li><li>수동 우회</li><li>감사 기록</li><li>오프라인 절차</li></ul></div>
        </section>

        <section className="section section-proposal">
          <div className="section-number">07</div>
          <Reveal><div className="section-heading"><p className="eyebrow">REGENERATION PROPOSAL</p><h2>{t.proposalTitle}</h2></div></Reveal>
          <div className="proposal-grid">
            <Reveal><article className="proposal-lead"><span>01</span><h3>기존 자산의 재평가</h3><p>방치 또는 저활용 가능성이 제기된 시설을 철거·신축의 이분법이 아니라 구조·운영·지역 연계 관점에서 다시 봅니다.</p><a href="#contact">현장 실사 협의<ArrowRight /></a></article></Reveal>
            <Reveal delay={0.06}><article><span>02</span><h3>단계별 사업화</h3><p>권리·안전성 확인 → 지상부 재생 → 실증 모듈 → 지하 확장으로 투자 결정을 분절합니다.</p></article></Reveal>
            <Reveal delay={0.12}><article><span>03</span><h3>지역과 연결</h3><p>농업·의료·교육·관광·재난대응 파트너가 참여할 수 있는 개방형 운영 거버넌스를 상정합니다.</p></article></Reveal>
            <Reveal delay={0.18}><article><span>04</span><h3>복제보다 기준화</h3><p>2·3호 확장은 동일 도면 복제가 아니라 입지 검증, 모듈, 운영 프로토콜의 표준화를 목표로 합니다.</p></article></Reveal>
          </div>
          <div className="download-card"><div><Sparkles /><span><small>PROJECT BROCHURE · PDF</small><strong>핵심 콘셉트와 검증 게이트를<br />한 문서로 검토하세요.</strong></span></div><a className="button button-primary" href="/brochure/ai-bunker-house-tacoma-brochure.pdf" download>브로슈어 다운로드<Download /></a></div>
        </section>

        <section id="contact" className="section section-contact">
          <div className="contact-aside">
            <p className="eyebrow">START WITH DUE DILIGENCE</p>
            <h2>{t.contactTitle}</h2>
            <p>사업 검토, 설계 협업, 부지·운영 협의를 남겨 주세요. 공개 자료만으로 답할 수 없는 사항은 확인 필요 상태로 안내합니다.</p>
            <div className="contact-facts"><span><MapPinned /><small>PROJECT ADDRESS</small>장수군 계남면 장수로 2662-11</span><span><ShieldCheck /><small>STATUS</small>비공식 콘셉트 · 현장 실사 전</span></div>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer>
        <div className="footer-brand"><span className="brand-mark"><i /><i /><i /></span><div><strong>AI BUNKER HOUSE NO.1</strong><small>TACOMA JANGSU CONCEPT</small></div></div>
        <p>© 2026 Concept presentation. This website is not affiliated with or endorsed by the referenced resort or local authorities.</p>
        <div><a href="#notice">면책·현황</a><a href="#evidence">출처</a><a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap <ExternalLink /></a></div>
      </footer>
    </div>
  );
}

function BrainMark() {
  return <div className="brain-mark" aria-hidden="true"><span /><span /><span /><span /></div>;
}
