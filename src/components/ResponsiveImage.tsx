type ResponsiveImageProps = {
  alt: string;
  base: string;
  widths: number[];
  sizes?: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
};

export function ResponsiveImage({
  alt,
  base,
  widths,
  sizes = '100vw',
  className,
  loading = 'lazy',
  fetchPriority = 'auto',
}: ResponsiveImageProps) {
  const srcSet = (extension: 'avif' | 'webp') => widths.map((width) => `${base}-${width}.${extension} ${width}w`).join(', ');
  const largest = widths.at(-1)!;

  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={`${base}-${largest}.webp`}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
      />
    </picture>
  );
}
