/** Lazy-loaded image with optional WebP via picture (run npm run images:webp). */
const toWebpSrc = (src) => {
  if (!src || src.endsWith(".svg") || src.endsWith(".webp")) return null;
  return src.replace(/\.(png|jpe?g)$/i, ".webp");
};

const withCacheBust = (src) => {
  if (!src || src.startsWith("data:") || src.startsWith("blob:")) return src;

  const version = import.meta.env.VITE_ASSET_VERSION;
  if (!version) return src;

  const joiner = src.includes("?") ? "&" : "?";
  return `${src}${joiner}v=${version}`;
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
  const resolvedSrc = withCacheBust(src);
  const webpSrc = withCacheBust(toWebpSrc(src));

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
        <img src={resolvedSrc} {...imgProps} />
      </picture>
    );
  }

  return <img src={resolvedSrc} {...imgProps} />;
};

export default OptimizedImage;
