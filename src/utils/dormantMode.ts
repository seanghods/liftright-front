import { BASE_URL } from "./constants";

const DORMANT_MESSAGE =
  "Site is in archive mode — sign-ups, logins, and payments are disabled.";

const TOAST_CONTAINER_ID = "dormant-toast-container";
let dismissTimer: number | null = null;

export function showDormantToast() {
  const container = ensureToastContainer();
  let toast = container.firstElementChild as HTMLElement | null;

  if (!toast) {
    toast = document.createElement("div");
    toast.setAttribute("role", "status");
    toast.className =
      "rounded-lg bg-neutral text-neutral-content shadow-lg px-4 py-3 text-sm leading-snug border border-base-content/10";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-8px)";
    toast.style.transition = "opacity 200ms ease, transform 200ms ease";
    toast.textContent = DORMANT_MESSAGE;
    container.appendChild(toast);
    requestAnimationFrame(() => {
      if (!toast) return;
      toast.style.opacity = "1";
      toast.style.transform = "translateY(0)";
    });
  } else {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  }

  const current = toast;
  if (dismissTimer != null) window.clearTimeout(dismissTimer);
  dismissTimer = window.setTimeout(() => {
    current.style.opacity = "0";
    current.style.transform = "translateY(-8px)";
    window.setTimeout(() => current.remove(), 250);
    dismissTimer = null;
  }, 4000);
}

function ensureToastContainer(): HTMLElement {
  let el = document.getElementById(TOAST_CONTAINER_ID);
  if (!el) {
    el = document.createElement("div");
    el.id = TOAST_CONTAINER_ID;
    el.className =
      "fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center pointer-events-none";
    el.style.width = "min(28rem, calc(100vw - 2rem))";
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
