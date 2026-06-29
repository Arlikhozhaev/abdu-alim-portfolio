import { useRef, useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Download, ExternalLink, Minus, Plus } from "lucide-react";
import { RESUME_PATH } from "#constants";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const ResumeViewer = ({ variant = "desktop" }) => {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);
  const [pageWidth, setPageWidth] = useState(variant === "desktop" ? 520 : 300);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateWidth = () => {
      const padding = variant === "desktop" ? 48 : 32;
      setPageWidth(Math.max(240, el.offsetWidth - padding));
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);

    return () => observer.disconnect();
  }, [variant]);

  const isDesktop = variant === "desktop";

  return (
    <div className={isDesktop ? "px-4 pb-4 space-y-3" : "flex flex-col gap-3"}>
      <div
        className={
          isDesktop
            ? "flex items-center justify-between gap-3"
            : "flex gap-2"
        }
      >
        <div className={isDesktop ? "flex gap-2" : "flex flex-1 gap-2"}>
          <a
            href={RESUME_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className={
              isDesktop
                ? "inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
                : "flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#0A84FF] py-3 text-[13px] font-semibold text-white no-underline"
            }
          >
            <ExternalLink size={14} /> Open
          </a>
          <a
            href={RESUME_PATH}
            download="Abdu-Alim-Resume.pdf"
            className={
              isDesktop
                ? "inline-flex items-center gap-1.5 rounded-lg border border-gray-300 dark:border-zinc-600 px-3 py-1.5 text-xs font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                : "flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white/10 py-3 text-[13px] font-semibold text-white no-underline"
            }
          >
            <Download size={14} /> Download
          </a>
        </div>

        <div
          className={
            isDesktop
              ? "inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/80 px-2 py-1"
              : "flex items-center justify-center gap-4 rounded-[10px] bg-white/6 py-2"
          }
        >
          <button
            type="button"
            onClick={() => setScale((s) => Math.max(0.5, s - 0.25))}
            aria-label="Zoom out"
            className={
              isDesktop
                ? "p-1 rounded hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-200"
                : "border-none bg-transparent px-3 text-xl text-white cursor-pointer"
            }
          >
            {isDesktop ? <Minus size={14} /> : "−"}
          </button>
          <span
            className={
              isDesktop
                ? "min-w-10 text-center text-xs font-medium text-gray-600 dark:text-gray-300"
                : "min-w-10 text-center text-xs text-white/50"
            }
          >
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setScale((s) => Math.min(2.5, s + 0.25))}
            aria-label="Zoom in"
            className={
              isDesktop
                ? "p-1 rounded hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-200"
                : "border-none bg-transparent px-3 text-xl text-white cursor-pointer"
            }
          >
            {isDesktop ? <Plus size={14} /> : "+"}
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className={
          isDesktop
            ? "max-h-[62vh] overflow-auto rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800/50 py-4"
            : "max-h-[55vh] overflow-auto rounded-xl bg-[#2c2c2e] py-4"
        }
      >
        <Document
          file={RESUME_PATH}
          onLoadSuccess={({ numPages: pages }) => setNumPages(pages)}
          loading={
            <p
              className={
                isDesktop
                  ? "py-8 text-center text-sm text-gray-500 dark:text-gray-400"
                  : "py-6 text-center text-[13px] text-white/40"
              }
            >
              Loading resume…
            </p>
          }
          error={
            <p
              className={
                isDesktop
                  ? "py-8 text-center text-sm text-red-500"
                  : "py-6 text-center text-[13px] text-[#ff453a]"
              }
            >
              Failed to load PDF.
            </p>
          }
        >
          {Array.from({ length: numPages || 0 }, (_, i) => (
            <div
              key={`page-${i + 1}`}
              className="mb-2 flex justify-center"
            >
              <Page
                pageNumber={i + 1}
                width={pageWidth * scale}
                renderTextLayer
                renderAnnotationLayer
              />
            </div>
          ))}
        </Document>
      </div>

      {numPages ? (
        <p
          className={
            isDesktop
              ? "text-center text-xs text-gray-500 dark:text-gray-400"
              : "text-center text-[11px] text-white/35"
          }
        >
          {numPages} page{numPages === 1 ? "" : "s"}
        </p>
      ) : null}
    </div>
  );
};

export default ResumeViewer;
