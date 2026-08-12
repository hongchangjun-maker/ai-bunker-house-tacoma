import { floors } from '../data/project';

export function SectionDiagram() {
  return (
    <div className="section-diagram" role="img" aria-label="리조트 본관에서 연결통로를 지나 지하 6개 층으로 이어지는 개념 단면도">
      <div className="ground-line"><span>±0.0 GROUND</span></div>
      <div className="resort-block"><i /><strong>기존 리조트 본관</strong><small>구조·용도 재검토</small></div>
      <div className="connector"><span>내부 진입</span><i /><i /><i /><b>보안·위생 전환 통로</b></div>
      <div className="section-shaft"><span>승강기</span><span>피난계단</span><span>설비샤프트</span></div>
      <div className="underground-stack">
        {floors.map((floor) => <div key={floor.code} style={{ '--floor-color': floor.color } as React.CSSProperties}><b>{floor.code}</b><span><strong>{floor.name}</strong><small>{floor.functions.join(' · ')}</small></span><i /></div>)}
      </div>
      <div className="soil-label">ADJACENT SITE · 개념 굴착 영역</div>
      <div className="emergency-route"><i /><span>독립 비상출구 후보<br /><small>위치·개수는 법규 및 피난해석으로 확정</small></span></div>
    </div>
  );
}
