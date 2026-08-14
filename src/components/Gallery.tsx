import { Maximize2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { gallery } from '../data/project';
import { ResponsiveImage } from './ResponsiveImage';

export function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  useEffect(() => {
    if (selected === null) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setSelected(null);
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', onKey);
    };
  }, [selected]);

  return (
    <>
      <div className="gallery-grid">
        {gallery.map((item, index) => (
          <button key={item.src} type="button" className={`gallery-card gallery-${index + 1}`} onClick={() => setSelected(index)}>
            {'base' in item && item.base && item.widths ? (
              <ResponsiveImage base={item.base} widths={item.widths} sizes="(max-width: 560px) 100vw, (max-width: 820px) 50vw, 66vw" alt={item.alt} loading={index > 1 ? 'lazy' : 'eager'} />
            ) : (
              <img src={item.src} alt={item.alt} loading={index > 1 ? 'lazy' : 'eager'} decoding="async" />
            )}
            <span className="gallery-shade" />
            <span className="gallery-tag">{item.tag}</span>
            <strong>{item.title}</strong>
            <Maximize2 aria-hidden="true" />
          </button>
        ))}
      </div>
      {selected !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={gallery[selected].title} onClick={() => setSelected(null)}>
          <button type="button" className="lightbox-close" onClick={() => setSelected(null)} aria-label="확대 보기 닫기"><X /></button>
          <figure onClick={(event) => event.stopPropagation()}>
            {'base' in gallery[selected] && gallery[selected].base && gallery[selected].widths ? (
              <ResponsiveImage base={gallery[selected].base} widths={gallery[selected].widths} sizes="95vw" alt={gallery[selected].alt} />
            ) : (
              <img src={gallery[selected].src} alt={gallery[selected].alt} decoding="async" />
            )}
            <figcaption><span>{gallery[selected].tag}</span>{gallery[selected].title}<small>실제 본관을 참조했더라도 현황·설계도·시공 결과가 아닌 비공식 AI 콘셉트 이미지입니다.</small></figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
