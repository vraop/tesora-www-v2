export type SubstackPost = {
  title: string;
  link: string;
  pubDate: string;
  iso: string;
  description: string;
  excerpt: string;
};

const FEED = "https://tesoraai.substack.com/feed";

const stripTags = (html: string) =>
  html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

const unwrapCdata = (value: string) => {
  const match = value.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  return match ? match[1] : value;
};

const pickTag = (block: string, tag: string): string => {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const m = block.match(re);
  return m ? unwrapCdata(m[1]).trim() : "";
};

const formatDate = (raw: string): string => {
  if (!raw) return "";
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return d
    .toLocaleDateString("en-US", { year: "numeric", month: "short" })
    .toUpperCase()
    .replace(" ", " · ");
};

const toIso = (raw: string): string => {
  if (!raw) return "";
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString();
};

export async function fetchSubstackPosts(limit = 8): Promise<SubstackPost[]> {
  try {
    const res = await fetch(FEED, {
      headers: { "User-Agent": "tesora-www-build" },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = xml.match(/<item[\s\S]*?<\/item>/g) ?? [];
    return items.slice(0, limit).map((block) => {
      const title = stripTags(pickTag(block, "title"));
      const link = stripTags(pickTag(block, "link"));
      const pubRaw = pickTag(block, "pubDate");
      const descRaw = pickTag(block, "description") || pickTag(block, "content:encoded");
      const description = stripTags(descRaw);
      const excerpt = description.length > 220 ? `${description.slice(0, 217)}...` : description;
      return {
        title,
        link,
        pubDate: formatDate(pubRaw),
        iso: toIso(pubRaw),
        description,
        excerpt,
      };
    });
  } catch {
    return [];
  }
}
