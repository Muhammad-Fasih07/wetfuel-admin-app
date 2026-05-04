"use client";

interface BadgeProps {
  count: number;
  max?: number;
  color?: string;
}

export default function Badge({ count, max = 99, color = "#ce1c1a" }: BadgeProps) {
  if (count === 0) return null;
  const display = count > max ? `${max}+` : count;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: color,
        color: "white",
        fontSize: 10,
        fontWeight: 700,
        padding: "0 5px",
        lineHeight: 1,
      }}
    >
      {display}
    </span>
  );
}
