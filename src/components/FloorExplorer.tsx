import { ArrowRight, Users, Maximize2 } from 'lucide-react';
import { useState } from 'react';
import { floors } from '../data/project';

export function FloorExplorer({ language }: { language: 'ko' | 'en' }) {
  const [active, setActive] = useState(0);
  const floor = floors[active];
  return (
    <div className="floor-explorer">
      <div className="floor-stack" role="tablist" aria-label="지하층 선택">
        {floors.map((item, index) => (
          <button
            key={item.code}
            type="button"
            role="tab"
            aria-selected={active === index}
            className={active === index ? 'active' : ''}
            onMouseEnter={() => setActive(index)}
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
        <p className="eyebrow">{language === 'ko' ? '선택한 레벨' : 'Selected level'}</p>
        <h3>{language === 'ko' ? floor.name : floor.nameEn}</h3>
        <p className="floor-purpose">{language === 'ko' ? floor.purpose : floor.purposeEn}</p>
        <div className="floor-stats">
          <span><Maximize2 /> <b>{floor.area}</b><small>{language === 'ko' ? '콘셉트 연면적' : 'concept area'}</small></span>
          <span><Users /> <b>{floor.people}</b><small>{language === 'ko' ? '계획 기준' : 'planning basis'}</small></span>
        </div>
        <ul>{floor.functions.map((f) => <li key={f}>{f}</li>)}</ul>
        <div className="adjacency"><ArrowRight /> <span><small>{language === 'ko' ? '인접 동선' : 'Adjacency'}</small>{floor.adjacent}</span></div>
        <p className="assumption-note">CONCEPT ASSUMPTION · 면적과 수용인원은 프로그램 검토용 가정이며 설계값이 아닙니다.</p>
      </div>
    </div>
  );
}
