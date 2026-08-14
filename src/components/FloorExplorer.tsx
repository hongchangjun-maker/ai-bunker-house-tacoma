import { ArrowRight, Expand, Maximize2, Users, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { floors } from '../data/project';
import { ResponsiveImage } from './ResponsiveImage';

export function FloorExplorer({ language }: { language: 'ko' | 'en' }) {
  const [active, setActive] = useState(0);
  const [planOpen, setPlanOpen] = useState(false);
  const floor = floors[active];

  useEffect(() => {
    if (!planOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setPlanOpen(false);
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', onKey);
    };
  }, [planOpen]);

  return (
    <>
      <div className="floor-explorer">
        <div className="floor-stack" role="tablist" aria-label="둘러볼 지하층 선택">
          {floors.map((item, index) => (
            <button
              key={item.code}
              type="button"
              role="tab"
              aria-selected={active === index}
              className={active === index ? 'active' : ''}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              style={{ '--floor-color': item.color } as React.CSSProperties}
            >
              <span>{item.code}</span>
              <strong>{language === 'ko' ? item.name : item.nameEn}</strong>
              <i />
            </button>
          ))}
        </div>
        <div className="floor-detail" role="tabpanel" aria-live="polite">
          <div className="floor-code" style={{ color: floor.color }}>{floor.code}</div>
          <p className="eyebrow">{language === 'ko' ? '지금 보고 있는 층' : 'Selected level'}</p>
          <h3>{language === 'ko' ? floor.name : floor.nameEn}</h3>
          <p className="floor-purpose">{language === 'ko' ? floor.purpose : floor.purposeEn}</p>
          <button className="floor-plan-preview" type="button" onClick={() => setPlanOpen(true)} aria-label={`${floor.code} ${floor.name} 고화질 3D 평면도 열기`}>
            <ResponsiveImage base={floor.planBase} widths={floor.planWidths} sizes="(max-width: 820px) 100vw, 50vw" alt={`${floor.code} ${floor.name}의 세부 공간과 피난 코어를 보여주는 비공식 AI 3D 평면도`} />
            <span><Expand />고화질 3D 평면도 열기</span>
          </button>
          <div className="floor-stats">
            <span><Maximize2 /> <b>{floor.area}</b><small>{language === 'ko' ? '공간 프로그램 합계' : 'program area'}</small></span>
            <span><Users /> <b>{floor.people}</b><small>{language === 'ko' ? '계획 이용 기준' : 'planning basis'}</small></span>
          </div>
          <p className="capacity-basis"><strong>인원·운영 기준</strong>{floor.capacityBasis}</p>
          <ul>{floor.functions.map((f) => <li key={f}>{f}</li>)}</ul>
          <div className="adjacency"><ArrowRight /> <span><small>{language === 'ko' ? '공통 피난·연결 체계' : 'Egress and adjacency'}</small>{floor.circulation}</span></div>
          <p className="assumption-note">검토용 공간 프로그램 · 면적표와 3D 이미지는 서로 맞춰 구성했지만, 측량·지질·구조·소방·설비 설계를 거친 인허가 또는 시공 도면은 아닙니다.</p>
        </div>
      </div>

      {planOpen && (
        <div className="floor-plan-modal" role="dialog" aria-modal="true" aria-labelledby="floor-plan-title" onClick={() => setPlanOpen(false)}>
          <div className="floor-plan-dialog" onClick={(event) => event.stopPropagation()}>
            <button className="floor-plan-close" type="button" onClick={() => setPlanOpen(false)} aria-label="3D 평면도 닫기"><X /></button>
            <header>
              <div><span style={{ color: floor.color }}>{floor.code}</span><p>3D FLOOR PROGRAM · AI RECONSTRUCTION</p></div>
              <h3 id="floor-plan-title">{floor.name}</h3>
              <p>{floor.capacityBasis}</p>
            </header>
            <div className="floor-plan-modal-grid">
              <figure>
                <ResponsiveImage base={floor.planBase} widths={floor.planWidths} sizes="(max-width: 900px) 100vw, 72vw" alt={`${floor.code} ${floor.name}의 고해상도 3D 평면도`} />
                <figcaption>AI 3D 공간 시각화 · 표기 면적과 실 구성은 프로그램 검토 기준 · 인허가·시공 도면 아님</figcaption>
              </figure>
              <aside>
                <div className="plan-core-note"><strong>공통 안전 코어</strong><p>{floor.circulation}</p></div>
                <div className="zone-schedule">
                  {floor.zones.map((zone) => (
                    <article key={zone.name}>
                      <span>{zone.name}</span><b>{zone.area.toLocaleString()}㎡</b><p>{zone.detail}</p>
                    </article>
                  ))}
                </div>
                <div className="zone-total"><span>층별 프로그램 합계</span><strong>{floor.zones.reduce((sum, zone) => sum + zone.area, 0).toLocaleString()}㎡</strong></div>
              </aside>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
