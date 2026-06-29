import { Search, MoveRight } from "lucide-react";
import useBlogSearch from "#hooks/useBlogSearch";
import { useMobileTheme } from "#context/MobileThemeContext";

const BlogFeed = ({ posts, variant = "desktop" }) => {
  const { query, setQuery, filteredPosts, hasQuery, isEmpty } =
    useBlogSearch(posts);
  const isDesktop = variant === "desktop";
  const theme = useMobileTheme();

  return (
    <div className={isDesktop ? "space-y-6" : "flex flex-col gap-4"}>
      <div className={isDesktop ? "relative" : "relative mb-1"}>
        <Search
          size={16}
          className={
            isDesktop
              ? "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500 pointer-events-none"
              : "absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          }
          style={isDesktop ? undefined : { color: theme.textMuted }}
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles by title or date…"
          aria-label="Search blog posts"
          className={
            isDesktop
              ? "w-full rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/80 py-2.5 pl-10 pr-4 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-blue-500/40 transition-shadow"
              : "mobile-blog-input w-full rounded-xl py-3 pl-10 pr-4 text-sm outline-none transition-colors"
          }
          style={
            isDesktop
              ? undefined
              : {
                  backgroundColor: theme.inputBg,
                  border: `1px solid ${theme.inputBorder}`,
                  color: theme.inputText,
                  boxShadow: theme.cardShadow,
                }
          }
        />
        {!isDesktop ? (
          <style>{`.mobile-blog-input::placeholder { color: ${theme.inputPlaceholder}; opacity: 1; }`}</style>
        ) : null}
      </div>

      {hasQuery && isEmpty ? (
        <p
          className={
            isDesktop
              ? "text-sm text-gray-500 dark:text-zinc-400 text-center py-6"
              : "text-sm text-center py-8"
          }
          style={isDesktop ? undefined : { color: theme.textMuted }}
        >
          No articles match &ldquo;{query.trim()}&rdquo;
        </p>
      ) : null}

      <div className={isDesktop ? "space-y-8" : "flex flex-col gap-5"}>
        {filteredPosts.map(({ id, image, title, date, link }) =>
          isDesktop ? (
            <div key={id} className="blog-post">
              <div className="col-span-2">
                <img src={image} alt={title} />
              </div>
              <div className="content">
                <p>{date}</p>
                <h3>{title}</h3>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  Check out the full post <MoveRight className="icon-hover" />
                </a>
              </div>
            </div>
          ) : (
            <a
              key={id}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="block no-underline"
            >
              <div
                className="overflow-hidden rounded-2xl"
                style={{
                  backgroundColor: theme.cardBg,
                  border: `1px solid ${theme.border}`,
                  boxShadow: theme.cardShadow,
                }}
              >
                <img
                  src={image}
                  alt={title}
                  className="block h-[180px] w-full object-cover"
                />
                <div className="p-3.5">
                  <p
                    className="m-0 mb-1.5 text-[11px]"
                    style={{ color: theme.textMuted }}
                  >
                    {date}
                  </p>
                  <p
                    className="m-0 mb-2.5 text-[15px] font-semibold leading-snug"
                    style={{ color: theme.text }}
                  >
                    {title}
                  </p>
                  <div
                    className="flex items-center gap-1.5"
                    style={{ color: theme.accent }}
                  >
                    <span className="text-[13px]">Read full post</span>
                    <MoveRight size={14} />
                  </div>
                </div>
              </div>
            </a>
          ),
        )}
      </div>
    </div>
  );
};

export default BlogFeed;
