import { useMemo, useState } from "react";

const useBlogSearch = (posts) => {
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return posts;

    return posts.filter(
      ({ title, date }) =>
        title.toLowerCase().includes(trimmed) ||
        date.toLowerCase().includes(trimmed),
    );
  }, [posts, query]);

  return {
    query,
    setQuery,
    filteredPosts,
    hasQuery: query.trim().length > 0,
    isEmpty: filteredPosts.length === 0,
  };
};

export default useBlogSearch;
