import { BASE_URL } from "./constants";

const DORMANT_MESSAGE =
  "This site is currently paused. Sign-ups, logins, and payments are temporarily disabled.";

const TOAST_CONTAINER_ID = "dormant-toast-container";
let lastToastAt = 0;

export function showDormantToast() {
  const now = Date.now();
  if (now - lastToastAt < 1500) return;
  lastToastAt = now;

  const container = ensureToastContainer();
  const toast = document.createElement("div");
  toast.className = "alert alert-warning shadow-lg max-w-sm";
  toast.setAttribute("role", "status");
  toast.textContent = DORMANT_MESSAGE;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = "opacity 300ms";
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

function ensureToastContainer(): HTMLElement {
  let el = document.getElementById(TOAST_CONTAINER_ID);
  if (!el) {
    el = document.createElement("div");
    el.id = TOAST_CONTAINER_ID;
    el.className = "toast toast-top toast-end z-[9999]";
    document.body.appendChild(el);
  }
  return el;
}

function dormantResponse(): Response {
  return new Response(
    JSON.stringify({ message: DORMANT_MESSAGE, dormant: true }),
    {
      status: 503,
      headers: { "Content-Type": "application/json" },
    },
  );
}

function isBackendUrl(url: string): boolean {
  return (
    url.startsWith(BASE_URL) ||
    url.startsWith("https://api.liftrightai.com/") ||
    url.startsWith("http://localhost:3001/")
  );
}

export function enableDormantMode() {
  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input, init) => {
    const url =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.toString()
          : input.url;
    const method = (
      init?.method ??
      (input instanceof Request ? input.method : "GET")
    ).toUpperCase();

    if (isBackendUrl(url)) {
      if (method !== "GET" && method !== "HEAD") {
        showDormantToast();
      }
      return dormantResponse();
    }
    return originalFetch(input, init);
  };
}
