import { AlertTriangle, Calculator, Check, ChevronDown, CircleHelp, ClipboardCheck, ExternalLink, Printer, RotateCcw, ShieldAlert } from 'lucide-react';
import { useMemo, useState } from 'react';
import { auditItems, citizenChecks, type AuditStatus } from '../data/readiness';

const statusCopy: Record<AuditStatus, string> = {
  blocker: '착수 전 필수',
  unverified: '검증 필요',
  concept: '개념 반영',
};

const formatNumber = (value: number) => new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 1 }).format(value);

export function ReadinessAudit() {
  const [filter, setFilter] = useState<'all' | AuditStatus>('all');
  const [people, setPeople] = useState(144);
  const [years, setYears] = useState(5);
  const [water, setWater] = useState(20);
  const [checked, setChecked] = useState<boolean[]>(() => citizenChecks.map(() => false));
  const [openItems, setOpenItems] = useState<Set<string>>(() => new Set(auditItems.slice(0, 2).map((item) => item.id)));

  const visible = filter === 'all' ? auditItems : auditItems.filter((item) => item.status === filter);
  const counts = useMemo(() => ({
    blocker: auditItems.filter((item) => item.status === 'blocker').length,
    unverified: auditItems.filter((item) => item.status === 'unverified').length,
    concept: auditItems.filter((item) => item.status === 'concept').length,
  }), []);
  const days = Math.round(years * 365);
  const totalWater = people * days * water;
  const totalKcal = people * days * 2200;
  const bufferDays = 90000 / (people * water);
  const checkedCount = checked.filter(Boolean).length;

  return (
    <div className="audit-dashboard">
      <div className="audit-verdict">
        <div><ShieldAlert /><span><small>현재 전문가 판정</small><strong>설계 착수 전 단계 · 운영 준비도 0%</strong></span></div>
        <p>공간 프로그램과 시각화는 준비됐지만, 현장·법규·성능을 통과한 항목은 아직 없습니다. 아래 항목이 닫히기 전에는 “144명 5년 생존 가능”이라고 판단할 수 없습니다.</p>
      </div>

      <div className="audit-summary" aria-label="검증 상태 요약">
        <article><small>전문가 검증 완료</small><strong>0</strong><span>성능을 입증한 항목</span></article>
        <article className="danger"><small>착수 전 필수</small><strong>{counts.blocker}</strong><span>해결 전 지하 설계 진행 금지</span></article>
        <article className="warning"><small>검증 필요</small><strong>{counts.unverified}</strong><span>인력·운영·권리 증거 필요</span></article>
        <article><small>AI 시각화</small><strong>7+</strong><span>현황·설계·성능 증거 아님</span></article>
      </div>

      <section className="assumption-calculator" aria-labelledby="calculator-title">
        <header><Calculator /><div><small>시민용 가정 계산기</small><h3 id="calculator-title">숫자를 바꾸면 필요한 자원이 바로 달라집니다.</h3></div></header>
        <div className="calculator-inputs">
          <label><span>계획 인원</span><input type="number" min="1" max="500" value={people} onChange={(e) => setPeople(Math.min(500, Math.max(1, Number(e.target.value) || 1)))} /><small>명</small></label>
          <label><span>계획 기간</span><input type="number" min="0.1" max="20" step="0.5" value={years} onChange={(e) => setYears(Math.min(20, Math.max(.1, Number(e.target.value) || .1)))} /><small>년</small></label>
          <label><span>1인 하루 물</span><input type="number" min="15" max="100" value={water} onChange={(e) => setWater(Math.min(100, Math.max(15, Number(e.target.value) || 15)))} /><small>L</small></label>
        </div>
        <div className="calculator-results" aria-live="polite">
          <article><small>누적 물 수요</small><strong>{formatNumber(totalWater / 10000)}만 L</strong><span>손실·소방용수 별도</span></article>
          <article><small>90㎥ 버퍼</small><strong>{formatNumber(bufferDays)}일</strong><span>수원·처리 중단 시 단순 계산</span></article>
          <article><small>누적 계획 열량</small><strong>{formatNumber(totalKcal / 100000000)}억 kcal</strong><span>2,200 kcal/인·일, 개인차 별도</span></article>
          <article><small>총 재실일</small><strong>{formatNumber(people * days)}인·일</strong><span>인력·의료·폐기물 산정 기초</span></article>
        </div>
        <p className="calculator-note"><AlertTriangle />WHO의 15L/인·일은 비상 최소치입니다. 이 계산기의 기본 20L도 장기 주거의 충분한 설계값이 아니라 기본 위생·조리를 포함한 초기 비교값입니다.</p>
      </section>

      <div className="audit-toolbar">
        <div role="group" aria-label="검증 상태 필터">
          {([['all', '전체'], ['blocker', '착수 전 필수'], ['unverified', '검증 필요']] as const).map(([key, label]) => (
            <button key={key} type="button" className={filter === key ? 'active' : ''} onClick={() => setFilter(key)}>{label}</button>
          ))}
        </div>
        <button type="button" onClick={() => window.print()}><Printer />검증표 인쇄</button>
      </div>

      <div className="audit-list">
        {visible.map((item) => (
          <details
            key={item.id}
            className={`audit-item ${item.status}`}
            open={openItems.has(item.id)}
            onToggle={(event) => {
              const isOpen = event.currentTarget.open;
              setOpenItems((current) => {
                if (current.has(item.id) === isOpen) return current;
                const next = new Set(current);
                if (isOpen) next.add(item.id); else next.delete(item.id);
                return next;
              });
            }}
          >
            <summary><span>{item.domain}</span><strong>{item.title}</strong><em>{statusCopy[item.status]}</em><ChevronDown /></summary>
            <div className="audit-item-body">
              <article><small>전문가 진단</small><p>{item.finding}</p></article>
              <article><small>닫기 위해 필요한 증거</small><p>{item.evidence}</p></article>
              <article className="citizen-question"><CircleHelp /><div><small>시민 검증 질문</small><p>{item.citizenQuestion}</p></div></article>
              <footer><span>책임 분야 · {item.owner}</span>{item.source && <a href={item.source.url} target="_blank" rel="noreferrer">{item.source.label}<ExternalLink /></a>}</footer>
            </div>
          </details>
        ))}
      </div>

      <section className="citizen-panel" aria-labelledby="citizen-title">
        <header><ClipboardCheck /><div><small>시민 검증단 6문항</small><h3 id="citizen-title">“멋져 보인다”를 “납득할 수 있다”로 바꾸는 질문</h3></div><strong>{checkedCount}/6</strong></header>
        <div>
          {citizenChecks.map((text, index) => (
            <label key={text} className={checked[index] ? 'checked' : ''}>
              <input type="checkbox" checked={checked[index]} onChange={() => setChecked((current) => current.map((value, i) => i === index ? !value : value))} />
              <span><Check />{text}</span>
            </label>
          ))}
        </div>
        <footer><p>체크는 이 브라우저 화면에서만 사용되며 서버로 전송되지 않습니다. 현재 자료만으로는 6개 모두를 객관적으로 충족했다고 표시할 수 없습니다.</p><button type="button" onClick={() => setChecked(citizenChecks.map(() => false))}><RotateCcw />초기화</button></footer>
      </section>
    </div>
  );
}
