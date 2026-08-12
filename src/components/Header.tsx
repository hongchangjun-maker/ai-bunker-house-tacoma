import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = { language: 'ko' | 'en'; onLanguage: () => void };

const nav = [
  ['overview', '프로젝트', 'Project'],
  ['site-tour', '현장 투어', 'Site tour'],
  ['location', '입지', 'Location'],
  ['architecture', '구조', 'Architecture'],
  ['floors', '층별 구성', 'Floors'],
  ['systems', '운영', 'Systems'],
  ['contact', '문의', 'Contact'],
] as const;

export function Header({ language, onLanguage }: Props) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${solid ? 'is-solid' : ''}`}>
      <a className="brand" href="#top" aria-label="AI벙커하우스 1호 홈">
        <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
        <span><strong>AI BUNKER HOUSE</strong><small>NO.1 · JANGSU</small></span>
      </a>
      <nav className={open ? 'is-open' : ''} aria-label="주요 메뉴">
        {nav.map(([id, ko, en]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{language === 'ko' ? ko : en}</a>)}
      </nav>
      <div className="header-actions">
        <button className="lang-button" type="button" onClick={onLanguage} aria-label="언어 전환">{language === 'ko' ? 'EN' : 'KO'}</button>
        <a className="mini-cta" href="#contact">{language === 'ko' ? '제안 문의' : 'Enquire'}</a>
        <button className="menu-button" type="button" aria-expanded={open} aria-label="메뉴 열기" onClick={() => setOpen((v) => !v)}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  );
}
