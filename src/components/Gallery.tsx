import { Maximize2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { gallery } from '../data/project';

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
            <img src={item.src} alt={item.alt} loading={index > 1 ? 'lazy' : 'eager'} />
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
            <img src={gallery[selected].src} alt={gallery[selected].alt} />
            <figcaption><span>{gallery[selected].tag}</span>{gallery[selected].title}<small>AI로 제작한 비공식 건축 콘셉트 이미지입니다.</small></figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
