import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "all";

  // Helper to fetch and parse XML RSS feed from Google News search
  const fetchNews = async (query: string, limit = 4) => {
    try {
      const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-IN&gl=IN&ceid=IN:en`;
      const res = await fetch(url, { 
        next: { revalidate: 600 } // Cache results for 10 minutes to respect rate limits
      });
      const text = await res.text();

      const itemRegex = /<item>([\s\S]*?)<\/item>/g;
      let match;
      const items = [];
      while ((match = itemRegex.exec(text)) !== null && items.length < limit) {
        const itemContent = match[1];
        const titleMatch = itemContent.match(/<title>([\s\S]*?)<\/title>/);
        const linkMatch = itemContent.match(/<link>([\s\S]*?)<\/link>/);
        const dateMatch = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/);

        let title = titleMatch ? titleMatch[1] : "";
        // Clean trailing source name appended by Google News (e.g. " - Moneycontrol")
        if (title.includes(" - ")) {
          title = title.split(" - ").slice(0, -1).join(" - ");
        }

        // Decode basic XML HTML entities
        title = title
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&apos;/g, "'");

        items.push({
          title,
          link: linkMatch ? linkMatch[1] : "",
          date: dateMatch ? dateMatch[1] : ""
        });
      }
      return items;
    } catch (e) {
      console.error("Error fetching or parsing Indian news RSS: ", e);
      return [];
    }
  };

  if (type === "economy") {
    const data = await fetchNews("Indian economy OR Sensex OR Nifty", 4);
    return NextResponse.json(data);
  } else if (type === "schemes") {
    const data = await fetchNews("mutual funds India OR LIC India OR health insurance products India", 4);
    return NextResponse.json(data);
  }

  // Fetch both sections parallelly for high efficiency
  const [economy, schemes] = await Promise.all([
    fetchNews("Indian economy OR Sensex OR Nifty", 3),
    fetchNews("mutual funds India OR insurance schemes India OR SBI Mutual Fund OR HDFC Life", 3)
  ]);

  return NextResponse.json({ economy, schemes });
}
