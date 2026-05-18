type TelemetryPayload = Record<string, unknown>;

declare global {
  interface Window {
    posthog?: { capture: (event: string, properties?: TelemetryPayload) => void };
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function safePayload(payload: TelemetryPayload = {}): TelemetryPayload {
  try {
    return JSON.parse(JSON.stringify(payload));
  } catch {
    return { _payload_serialization_failed: true };
  }
}

export function trackEvent(event: string, payload: TelemetryPayload = {}): void {
  const data = safePayload(payload);

  if (typeof window !== 'undefined') {
    try {
      if (window.posthog?.capture) {
        window.posthog.capture(event, data);
        return;
      }
      if (typeof window.gtag === 'function') {
        window.gtag('event', event, data);
        return;
      }
      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({ event, ...data });
        return;
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.warn('[telemetry] sink error', err);
      }
    }
  }

  if (import.meta.env.DEV) {
    console.info(`[telemetry:fallback] ${event}`, data);
  }
}

export function trackError(error: unknown, context: TelemetryPayload = {}): void {
  const message = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack : undefined;
  trackEvent('runtime_error', {
    message,
    stack,
    ...context,
  });
}

