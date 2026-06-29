/** Lazy-loaded image with optional WebP via picture (run npm run images:webp). */
const toWebpSrc = (src) => {
  if (!src || src.endsWith(".svg") || src.endsWith(".webp")) return null;
  return src.replace(/\.(png|jpe?g)$/i, ".webp");
};

const OptimizedImage = ({
  src,
  alt,
  priority = false,
  className,
  style,
  ...props
}) => {
  const loading = priority ? "eager" : "lazy";
  const fetchPriority = priority ? "high" : "auto";
  const webpSrc = toWebpSrc(src);

  const imgProps = {
    alt,
    loading,
    decoding: "async",
    fetchPriority,
    className,
    style,
    ...props,
  };

  if (webpSrc) {
    return (
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img src={src} {...imgProps} />
      </picture>
    );
  }

  return <img src={src} {...imgProps} />;
};

export default OptimizedImage;
