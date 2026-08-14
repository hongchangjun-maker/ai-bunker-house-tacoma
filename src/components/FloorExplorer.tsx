import { ArrowRight, Users, Maximize2 } from 'lucide-react';
import { useState } from 'react';
import { floors } from '../data/project';

export function FloorExplorer({ language }: { language: 'ko' | 'en' }) {
  const [active, setActive] = useState(0);
  const floor = floors[active];
  return (
    <div className="floor-explorer">
      <div className="floor-stack" role="tablist" aria-label="둘러볼 지하층 선택">
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
        <p className="eyebrow">{language === 'ko' ? '지금 보고 있는 층' : 'Selected level'}</p>
        <h3>{language === 'ko' ? floor.name : floor.nameEn}</h3>
        <p className="floor-purpose">{language === 'ko' ? floor.purpose : floor.purposeEn}</p>
        <div className="floor-stats">
          <span><Maximize2 /> <b>{floor.area}</b><small>{language === 'ko' ? '계획 면적 가정' : 'concept area'}</small></span>
          <span><Users /> <b>{floor.people}</b><small>{language === 'ko' ? '이용 인원 가정' : 'planning basis'}</small></span>
        </div>
        <ul>{floor.functions.map((f) => <li key={f}>{f}</li>)}</ul>
        <div className="adjacency"><ArrowRight /> <span><small>{language === 'ko' ? '바로 연결되는 곳' : 'Adjacency'}</small>{floor.adjacent}</span></div>
        <p className="assumption-note">계획 가정 · 면적과 이용 인원은 공간 비교를 위한 값이며 확정 설계가 아닙니다.</p>
      </div>
    </div>
  );
}
