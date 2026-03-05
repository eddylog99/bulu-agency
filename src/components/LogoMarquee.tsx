'use client';

import { useEffect, useRef, useState } from 'react';

const brands = ['Stripe', 'Vercel', 'Notion', 'Figma', 'Linear'];
const ITEM_GAP = 32; // deve corrispondere al gap in CSS
const SPEED_PX_PER_SEC = 40;

export default function LogoMarquee() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frameId: number;
    let lastTime = performance.now();
    let offset = 0;

    const step = (time: number) => {
      frameId = requestAnimationFrame(step);
      const currentTrack = trackRef.current;
      if (!currentTrack) return;

      if (isHovered) {
        lastTime = time;
        return;
      }

      const deltaSeconds = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      offset -= SPEED_PX_PER_SEC * deltaSeconds;

      const firstItem = currentTrack.firstElementChild as HTMLElement | null;
      if (firstItem) {
        const shift = firstItem.offsetWidth + ITEM_GAP;
        while (-offset >= shift) {
          offset += shift;
          currentTrack.appendChild(firstItem);
        }
      }

      currentTrack.style.transform = `translate3d(${offset}px, 0, 0)`;
    };

    frameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isHovered]);

  return (
    <div className="mt-6 flex justify-center">
      <div
        className="logo-marquee max-w-[420px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="logo-marquee-track" ref={trackRef}>
          {brands.map((brand) => (
            <div key={brand} className="logo-marquee-item">
              <div className="logo-marquee-pill">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[10px] text-white">
                  {brand[0]}
                </span>
                <span className="text-sm font-medium text-[var(--text-secondary)]">
                  {brand}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

