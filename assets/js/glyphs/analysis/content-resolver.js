export function resolveContent() {
  const root = document.querySelector("article") || document.body;
  const text = (root?.innerText || "").trim();
  return { text, url: location.href };
}
