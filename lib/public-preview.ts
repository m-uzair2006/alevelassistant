export const PUBLIC_PREVIEW_HOSTNAME = "alevelassistant.vercel.app";

export function isPublicPreviewHostname(hostname: string | null | undefined) {
  return hostname?.toLowerCase() === PUBLIC_PREVIEW_HOSTNAME;
}

export function isPublicPreviewBrowser() {
  if (typeof window === "undefined") {
    return false;
  }

  return isPublicPreviewHostname(window.location.hostname);
}
