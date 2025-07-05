"use server";

import axios from "axios";
import { URL } from "url";

export async function getEmbeddableMapUrl(
  inputUrl: string
): Promise<string | null> {
  try {
    if (inputUrl.includes("maps.app.goo.gl")) {
      const res = await axios.get(inputUrl, {
        // @ts-ignore
        maxRedirects: 0,
        validateStatus: (status) => status >= 200 && status < 400,
      });

      const redirectedUrl = res.headers.location;

      if (!redirectedUrl) return null;
      return buildEmbedUrlFromFullLink(redirectedUrl);
    }

    return buildEmbedUrlFromFullLink(inputUrl);
  } catch (err) {
    console.error("Map URL error:", err);
    return null;
  }
}

function buildEmbedUrlFromFullLink(fullUrl: string): string | null {
  try {
    const parsed = new URL(fullUrl);
    const q = parsed.searchParams.get("q");

    const link = `https://www.google.com/maps`;

    if (q) {
      return `${link}?q=${encodeURIComponent(q)}&output=embed`;
    }

    const match = parsed.pathname.match(/@([\d.-]+),([\d.-]+)/);
    if (match) {
      const lat = match[1];
      const lng = match[2];
      return `${link}?q=${lat},${lng}&output=embed`;
    }

    return null;
  } catch {
    return null;
  }
}
