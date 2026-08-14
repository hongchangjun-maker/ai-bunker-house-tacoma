import { Aperture, Bot, Map, MoonStar, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { ResponsiveImage } from './ResponsiveImage';

const scenes = [
  {
    key: 'front-defense',
    title: '본관 전면 방어 전환',
    nav: '전면 방어',
    badge: 'AI 디펜스 재구성 · 실제 전경 기반',
    description: '실제 본관 전면에 대규모 옥상 태양광, 미니 풍력, CCTV, 모래주머니 진지, 외곽 철조망과 로봇 경계를 합성한 밝은 주간 콘셉트입니다.',
    base: '/images/site/defense-front-day',
    widths: [640, 1280, 1511],
    icon: ShieldCheck,
  },
  {
    key: 'walk',
    title: '로봇 순찰 보행축',
    nav: '로봇 순찰',
    badge: 'AI 디펜스 재구성 · 장비/시점 가정',
    description: '산책로 기능을 유지하면서 상용급 4족 보행 로봇, 비무장 휴머노이드 경비, 드론과 열화상 CCTV가 순찰하는 이중 보행·경계축입니다.',
    base: '/images/site/defense-patrol-walk',
    widths: [640, 1280, 1672],
    icon: Bot,
  },
  {
    key: 'terrace',
    title: '방호형 커뮤니티 테라스',
    nav: '보호 커먼즈',
    badge: 'AI 디펜스 재구성 · 위치/운영 가정',
    description: '사람이 이용하는 정원과 테라스를 유지하되, 식재 뒤 외곽 철조망·저층 모래주머니·CCTV·로봇 순찰을 겹쳐 생활성과 방호성을 분리했습니다.',
    base: '/images/site/defense-terrace',
    widths: [640, 1280, 1672],
    icon: Aperture,
  },
  {
    key: 'aerial',
    title: '다층 외곽 방어와 에너지 자립',
    nav: '외곽 방어',
    badge: 'AI 디펜스 재구성 · 측량/배치도 아님',
    description: '외곽 철조망, 통제 게이트, CCTV 타워, 로봇·드론 순찰과 옥상·캐노피 태양광 및 미니 풍력을 한눈에 보여주는 개념 조감입니다.',
    base: '/images/site/defense-aerial',
    widths: [640, 1280, 1672],
    icon: Map,
  },
  {
    key: 'night',
    title: '고가시성 야간 경계',
    nav: '야간 경계',
    badge: 'AI 디펜스 재구성 · 조명/운영 가정',
    description: '어두운 영화적 연출을 줄이고 본관·철조망·CCTV·로봇 도킹과 드론 항로가 식별되도록 밝힌 블루아워 경계 콘셉트입니다.',
    base: '/images/site/defense-night',
    widths: [640, 1280, 1690],
    icon: MoonStar,
  },
] as const;

export function SiteTour() {
  const [activeKey, setActiveKey] = useState<(typeof scenes)[number]['key']>('front-defense');
  const active = scenes.find((scene) => scene.key === activeKey) ?? scenes[0];

  return (
    <div className="site-tour">
      <div className="site-tour-media">
        <ResponsiveImage
          key={active.key}
          base={active.base}
          widths={[...active.widths]}
          sizes="(max-width: 820px) 100vw, 92vw"
          alt={active.description}
        />
        <div className="site-tour-caption">
          <span>{active.badge}</span>
          <strong>{active.title}</strong>
          <p>{active.description}</p>
        </div>
      </div>
      <div className="site-tour-nav" role="tablist" aria-label="타코마 장수리조트 현장·경관 투어 장면">
        {scenes.map((scene, index) => {
          const Icon = scene.icon;
          return (
            <button
              key={scene.key}
              type="button"
              role="tab"
              aria-selected={scene.key === active.key}
              onClick={() => setActiveKey(scene.key)}
            >
              <small>{String(index + 1).padStart(2, '0')}</small>
              <Icon aria-hidden="true" />
              <span>{scene.nav}</span>
            </button>
          );
        })}
      </div>
      <div className="defense-principles" aria-label="디펜스 콘셉트 핵심 구성">
        <article><strong>에너지</strong><span>대규모 태양광 + 미니 풍력</span></article>
        <article><strong>경계</strong><span>외곽 철조망 + 통제 게이트</span></article>
        <article><strong>감시</strong><span>CCTV + 열화상 + 드론</span></article>
        <article><strong>순찰</strong><span>4족·차륜·휴머노이드 로봇</span></article>
        <article><strong>방호</strong><span>옥상·지면 모래주머니 진지</span></article>
      </div>
      <p className="defense-reference">장비 외형 참고: <a href="https://bostondynamics.com/products/spot/" target="_blank" rel="noreferrer">상용 4족 검사 로봇</a> · <a href="https://knightscope.com/the-force" target="_blank" rel="noreferrer">자율 보안 순찰 로봇</a> · <a href="https://www.1x.tech/discover/neo-home-robot" target="_blank" rel="noreferrer">2026 배송 예정 휴머노이드</a>. 휴머노이드 경비 역할과 봉 소지는 시각 콘셉트 가정이며 공급사·법규·안전성 검토 전 미확정입니다.</p>
      <p className="site-tour-disclaimer"><strong>구분 원칙</strong> 모든 장면은 실제 본관 사진을 건물 정체성의 참고 기준으로 삼아 만든 비공식 AI 경관 재구성입니다. 현재 현황·시공 결과·설계도·측량도를 의미하지 않습니다.</p>
    </div>
  );
}
