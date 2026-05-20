export default function DashboardLoading() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, padding: 24, width: "100%" }}>
      {/* Page header skeleton */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div className="shimmer" style={{ height: 14, width: 180, borderRadius: 6 }} />
        <div className="shimmer" style={{ height: 28, width: 260, borderRadius: 8 }} />
      </div>

      {/* Stat cards skeleton */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              background: "#1c1c1e",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.07)",
              padding: 20,
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
            }}
          >
            <div className="shimmer" style={{ width: 48, height: 48, borderRadius: 12, flexShrink: 0 }} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              <div className="shimmer" style={{ height: 10, width: "60%", borderRadius: 4 }} />
              <div className="shimmer" style={{ height: 24, width: "80%", borderRadius: 6 }} />
              <div className="shimmer" style={{ height: 10, width: "50%", borderRadius: 4 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Content area skeleton */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16 }}>
        <div
          style={{
            background: "#1c1c1e",
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.07)",
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div className="shimmer" style={{ height: 16, width: "60%", borderRadius: 6 }} />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="shimmer" style={{ height: 48, borderRadius: 10 }} />
          ))}
        </div>
        <div
          style={{
            background: "#1c1c1e",
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.07)",
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div className="shimmer" style={{ height: 16, width: "40%", borderRadius: 6 }} />
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="shimmer" style={{ height: 36, borderRadius: 6 }} />
          ))}
        </div>
      </div>
    </div>
  );
}
