"use client";

import { useEffect } from "react";

/**
 * Error boundary for /admin — renders when the admin page throws
 * (e.g. database fetch failures are surfaced instead of silently
 * returning empty data).
 */
export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin dashboard error:", error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#14110d",
        color: "#f2ece1",
        fontFamily: "system-ui, sans-serif",
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 480,
          border: "3px solid #3a342c",
          background: "#1d1915",
          padding: 32,
          boxShadow: "6px 6px 0 #000",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#b3543f",
            marginBottom: 8,
          }}
        >
          Admin · load failed
        </div>
        <h1 style={{ fontSize: 22, margin: "0 0 12px" }}>
          Couldn&apos;t load the dashboard
        </h1>
        <p style={{ fontSize: 14, color: "#a89f8d", lineHeight: 1.6 }}>
          {error?.message ||
            "Something went wrong while fetching admin data. Check the server logs for details."}
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <button
            onClick={() => reset()}
            style={{
              background: "#b3543f",
              color: "#fff",
              border: "2px solid #b3543f",
              padding: "10px 20px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          <a
            href="/admin/login"
            style={{
              border: "2px solid #3a342c",
              color: "#f2ece1",
              padding: "10px 20px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Back to login
          </a>
        </div>
      </div>
    </div>
  );
}
