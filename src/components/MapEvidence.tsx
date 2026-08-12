import { ExternalLink, MapPin, Mountain, Route, Trees } from 'lucide-react';
import { evidence } from '../data/project';

export function MapEvidence() {
  const osm = 'https://www.openstreetmap.org/export/embed.html?bbox=127.552%2C35.681%2C127.586%2C35.705&layer=mapnik&marker=35.692886%2C127.569413';
  return (
    <div className="location-layout">
      <div className="map-shell">
        <iframe title="타코마 장수 관광농원 주소 인근 OpenStreetMap" src={osm} loading="lazy" />
        <div className="map-badge"><MapPin /><span><small>ADDRESS-BASED APPROXIMATE PIN</small>전북특별자치도 장수군 계남면 장수로 2662-11</span></div>
        <div className="map-links">
          <a href="https://map.kakao.com/link/search/전북특별자치도%20장수군%20계남면%20장수로%202662-11" target="_blank" rel="noreferrer">카카오맵 <ExternalLink /></a>
          <a href="https://www.google.com/maps/search/?api=1&query=전북특별자치도+장수군+계남면+장수로+2662-11" target="_blank" rel="noreferrer">Google Maps <ExternalLink /></a>
        </div>
      </div>
      <div className="site-analysis">
        <p className="eyebrow">SITE READING · VERIFIED / TO VERIFY</p>
        <h3>고원형 입지의 가능성과<br />검증 과제를 함께 봅니다.</h3>
        <div className="analysis-cards">
          <article><Mountain /><strong>산악·분지 맥락</strong><p>장수분지는 약 400~500m로 소개됩니다. 대상지 개별 표고는 측량으로 확정해야 합니다.</p></article>
          <article><Route /><strong>도로 접근</strong><p>장수 IC를 통한 권역 접근성이 있으나 대형 물류 동선과 겨울철 운행성은 별도 검토 대상입니다.</p></article>
          <article><Trees /><strong>재생 잠재력</strong><p>기존 건축·주차·지원시설의 재사용 가능성은 구조·권리·운영 실사 이후 판단합니다.</p></article>
        </div>
        <div className="risk-strip"><b>GO / NO-GO 선행조사</b><span>소유·권리</span><span>정밀측량</span><span>지질·지하수</span><span>사면·배수</span><span>인허가</span><span>구조안전</span></div>
      </div>
      <div className="evidence-panel">
        <div><p className="eyebrow">PUBLIC EVIDENCE</p><h3>확인 가능한 사실만 출처와 함께</h3></div>
        {evidence.map((item) => <a key={item.url} href={item.url} target="_blank" rel="noreferrer"><span>{item.label}<small>{item.source}</small></span><p>{item.note}</p><ExternalLink /></a>)}
      </div>
    </div>
  );
}
