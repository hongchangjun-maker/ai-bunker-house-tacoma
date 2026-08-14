import { ArrowDown, Building2, DoorOpen, MoveVertical } from 'lucide-react';
import { floors, planningBaseline } from '../data/project';

export function SectionDiagram() {
  return (
    <div className="program-section" aria-label="본관과 지하 6개 층의 일관된 공간 프로그램 단면">
      <div className="program-surface">
        <Building2 />
        <div><small>지상 본관 · 기존 시설 실사 후 활용</small><strong>방문·숙박·교육·지역 연계</strong></div>
        <span><ArrowDown /> 출입·위생 전환</span>
      </div>
      <div className="program-underground">
        <div className="program-core"><DoorOpen /><strong>서측 피난계단</strong><small>지상 직접 배출 후보</small></div>
        <div className="program-levels">
          {floors.map((floor) => (
            <a key={floor.code} href="#floors" style={{ '--floor-color': floor.color } as React.CSSProperties}>
              <b>{floor.code}</b>
              <span><strong>{floor.name}</strong><small>{floor.zones.slice(0, 4).map((zone) => zone.name).join(' · ')}</small></span>
              <em>{floor.area}<small>{floor.people}</small></em>
            </a>
          ))}
        </div>
        <div className="program-service-core"><MoveVertical /><strong>중앙 서비스 코어</strong><small>승강기 · 물류 · 이중 설비 라이저</small></div>
        <div className="program-core"><DoorOpen /><strong>동측 피난계단</strong><small>서측과 이격된 독립 경로</small></div>
      </div>
      <div className="program-section-footer">
        <span>총 프로그램 <strong>{planningBaseline.grossArea.toLocaleString()}㎡</strong></span>
        <span>계획 정원 <strong>{planningBaseline.residents}명</strong></span>
        <span>숙소 <strong>{planningBaseline.beds.total}침상</strong></span>
        <span>공통 원칙 <strong>양방향 피난 후보 + 중앙 서비스 코어</strong></span>
      </div>
    </div>
  );
}
