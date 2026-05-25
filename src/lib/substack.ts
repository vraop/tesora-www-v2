export type SubstackPost = {
  slug: string;
  title: string;
  link: string;
  pubDate: string;
  iso: string;
  prettyDate: string;
  description: string;
  excerpt: string;
  contentHtml: string;
  author: string;
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
  const escaped = tag.replace(":", "\\:");
  const re = new RegExp(`<${escaped}[^>]*>([\\s\\S]*?)</${escaped}>`, "i");
  const m = block.match(re);
  return m ? unwrapCdata(m[1]).trim() : "";
};

const formatShort = (raw: string): string => {
  if (!raw) return "";
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return "";
  const year = d.getUTCFullYear();
  const month = d.toLocaleString("en-US", { month: "short", timeZone: "UTC" }).toUpperCase();
  return `${year} · ${month}`;
};

const formatPretty = (raw: string): string => {
  if (!raw) return "";
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
};

const toIso = (raw: string): string => {
  if (!raw) return "";
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString();
};

const slugFromLink = (link: string): string => {
  const match = link.match(/\/p\/([^/?#]+)/i);
  return match ? match[1] : link.replace(/[^a-z0-9-]/gi, "-").slice(0, 80);
};

const sanitizeContentHtml = (html: string): string => {
  if (!html) return "";
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/\s+on[a-z]+="[^"]*"/gi, "")
    .replace(/\s+on[a-z]+='[^']*'/gi, "")
    .replace(/<a\s+([^>]*?)>/gi, (_match, attrs: string) => {
      const hasTarget = /target=/i.test(attrs);
      const hasRel = /rel=/i.test(attrs);
      const extra = `${hasTarget ? "" : ' target="_blank"'}${hasRel ? "" : ' rel="noopener"'}`;
      return `<a ${attrs}${extra}>`;
    });
};

export async function fetchSubstackPosts(limit = 12): Promise<SubstackPost[]> {
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
      const contentRaw = pickTag(block, "content:encoded");
      const descRaw = pickTag(block, "description") || contentRaw;
      const description = stripTags(descRaw);
      const excerpt = description.length > 220 ? `${description.slice(0, 217)}...` : description;
      const author = stripTags(pickTag(block, "dc:creator") || pickTag(block, "author"));
      return {
        slug: slugFromLink(link),
        title,
        link,
        pubDate: formatShort(pubRaw),
        iso: toIso(pubRaw),
        prettyDate: formatPretty(pubRaw),
        description,
        excerpt,
        contentHtml: sanitizeContentHtml(contentRaw),
        author,
      };
    });
  } catch {
    return [];
  }
}
