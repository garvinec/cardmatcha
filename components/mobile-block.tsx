"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface MobileBlockProps {
  initialIsMobile: boolean;
  onMobileChange?: (isMobile: boolean) => void;
}

export function MobileBlock({
  initialIsMobile,
  onMobileChange,
}: MobileBlockProps) {
  const [isMobile, setIsMobile] = useState(initialIsMobile);

  useEffect(() => {
    // Also check client-side for window resize
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      onMobileChange?.(mobile);
    };

    // Initial check
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [onMobileChange]);

  if (!isMobile) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-matcha-50 via-matcha-100 to-matcha-200 p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <Image
            src="/cardmatcha_logo_transparent.png"
            alt="CardMatcha Logo"
            width={120}
            height={120}
            className="w-24 h-24 object-contain"
            priority
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-light text-matcha-900 tracking-tight">
            Mobile Version Coming Soon
          </h1>
          <p className="text-lg text-matcha-800/80 font-light leading-relaxed">
            I am working hard to bring you the best mobile experience. Stay
            tuned for updates!
          </p>
        </div>

        <div className="pt-4">
          <p className="text-sm text-matcha-700/70 font-light">
            In the meantime, please visit us on a desktop or tablet device.
          </p>
        </div>
      </div>
    </div>
  );
}
