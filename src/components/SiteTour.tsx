import { Aperture, Camera, Map, MoonStar, Mountain, Trees } from 'lucide-react';
import { useState } from 'react';
import { ResponsiveImage } from './ResponsiveImage';

const scenes = [
  {
    key: 'actual',
    title: '현재 본관 전경',
    nav: '실제 현장',
    badge: '현장 제공 사진 · 2026.08.12',
    description: '사용자가 제공한 타코마 장수리조트 실제 전면 사진입니다. 본관의 매스, 중앙 유리면, 캐노피와 진입도로를 모든 재구성의 장소 기준으로 삼았습니다.',
    base: '/images/site/actual-front',
    widths: [624],
    icon: Camera,
    actual: true,
  },
  {
    key: 'landscape',
    title: '본관 진입 조경 개선안',
    nav: '도착 정원',
    badge: 'AI 경관 재구성 · 설계 전 콘셉트',
    description: '실제 전면 구도를 유지하고 장수 고원의 소나무, 초화, 돌과 빗물정원을 더한 시공 가능성 중심의 도착 경관 제안입니다.',
    base: '/images/site/landscape-arrival',
    widths: [640, 1280, 1693],
    icon: Trees,
  },
  {
    key: 'walk',
    title: '보행 진입과 치유정원',
    nav: '정원 산책',
    badge: 'AI 경관 재구성 · 시점 가정',
    description: '무장애 보행로, 고원형 식재와 작은 빗물정원을 통해 차량 중심 전면을 사람 중심의 도착 경험으로 전환한 가상 시점입니다.',
    base: '/images/site/garden-walk',
    widths: [640, 1280],
    icon: Mountain,
  },
  {
    key: 'terrace',
    title: '커뮤니티 치유 테라스',
    nav: '야외 라운지',
    badge: 'AI 경관 재구성 · 위치 가정',
    description: '기존 본관 외관과 연결되는 휴식·대화용 외부 테라스를 제안합니다. 퍼걸러, 향토석, 그늘 식재와 접근 가능한 좌석을 조합했습니다.',
    base: '/images/site/healing-terrace',
    widths: [640, 1280],
    icon: Aperture,
  },
  {
    key: 'aerial',
    title: '고원 숲속 경관 마스터플랜',
    nav: '조감 경관',
    badge: 'AI 경관 재구성 · 측량도 아님',
    description: '본관의 외관 정체성을 기준으로 산책 순환로, 숲 복원, 야외 테라스와 빗물정원을 조합한 개념 조감입니다. 실제 부지 경계와 고도는 측량 후 확정해야 합니다.',
    base: '/images/site/aerial-masterplan',
    widths: [640, 1280],
    icon: Map,
  },
  {
    key: 'night',
    title: '블루아워 야간 경관',
    nav: '야간 조명',
    badge: 'AI 경관 재구성 · 조명 콘셉트',
    description: '로비의 온기와 낮은 보행등을 중심으로 눈부심과 상향광을 줄인 야간 도착 장면입니다. 조도와 전력량은 조명설계에서 검증해야 합니다.',
    base: '/images/site/blue-hour',
    widths: [640, 1280, 1693],
    icon: MoonStar,
  },
] as const;

export function SiteTour() {
  const [activeKey, setActiveKey] = useState<(typeof scenes)[number]['key']>('actual');
  const active = scenes.find((scene) => scene.key === activeKey) ?? scenes[0];

  return (
    <div className="site-tour">
      <div className={`site-tour-media ${active.key === 'actual' ? 'is-actual' : ''}`}>
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
      <p className="site-tour-disclaimer"><strong>구분 원칙</strong> 첫 장면만 실제 현장 사진이며, 나머지는 그 사진을 건물 정체성 기준으로 삼아 만든 비공식 AI 경관 재구성입니다. 현황·시공 결과·설계도·측량도를 의미하지 않습니다.</p>
    </div>
  );
}
