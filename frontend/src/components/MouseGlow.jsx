import { useEffect, useState } from "react";

const MouseGlow = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 mix-blend-screen"
      style={{
        background:`radial-gradient(
  500px at ${pos.x}px ${pos.y}px,
  rgba(99,102,241,0.14),
  rgba(168,85,247,0.10),
  transparent 45%
)`,
      }}
    />
  );
};

export default MouseGlow;
