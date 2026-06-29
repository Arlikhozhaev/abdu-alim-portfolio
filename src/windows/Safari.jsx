import { WindowControls } from "#components";
import OptimizedImage from "#components/OptimizedImage";
import { blogPosts } from "#constants";
import useBlogSearch from "#hooks/useBlogSearch";
import WindowWrapper from "#hoc/WindowWrapper";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  MoveRight,
  PanelLeft,
  Plus,
  Search,
  Share,
  ShieldHalf,
} from "lucide-react";

const Safari = () => {
  const { query, setQuery, filteredPosts, hasQuery, isEmpty } =
    useBlogSearch(blogPosts);

  return (
    <>
      <div id="window-header">
        <WindowControls target="safari" />

        <PanelLeft className="ml-10 icon" />

        <div className="flex items-center gap-1 ml-5">
          <ChevronLeft className="icon" />
          <ChevronRight className="icon" />
        </div>

        <div className="flex-1 flex-center gap-3">
          <ShieldHalf className="icon" />

          <div
            className="search"
            data-no-drag
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <Search className="icon pointer-events-none shrink-0" />

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.currentTarget.focus()}
              placeholder="Search articles…"
              aria-label="Search blog posts"
              autoComplete="off"
              className="flex-1 min-w-0 w-full cursor-text outline-none select-text bg-transparent text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Share className="icon" />
          <Plus className="icon" />
          <Copy className="icon" />
        </div>
      </div>

      <div className="blog">
        <h2>My Developer Blog</h2>

        {hasQuery && isEmpty ? (
          <p className="text-center text-sm text-gray-500 dark:text-zinc-400 py-8">
            No articles match &ldquo;{query.trim()}&rdquo;
          </p>
        ) : (
          <div className="space-y-8">
            {filteredPosts.map(({ id, image, title, date, link }) => (
              <div key={id} className="blog-post">
                <div className="col-span-2">
                  <OptimizedImage src={image} alt={title} />
                </div>

                <div className="content">
                  <p>{date}</p>
                  <h3>{title}</h3>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    Check out the full post <MoveRight className="icon-hover" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const safariWindow = WindowWrapper(Safari, "safari");

export default safariWindow;
