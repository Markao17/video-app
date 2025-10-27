import { Analytics } from "@vercel/analytics/react";

function AnalyticsWrapper() {
  // Only load analytics in production (Vercel automatically configures this)
  if (!import.meta.env.PROD) {
    return null;
  }

  // The Analytics component handles ad blockers gracefully.
  // If the script is blocked, it will fail silently without affecting the app.
  return <Analytics />;
}

export default AnalyticsWrapper;

