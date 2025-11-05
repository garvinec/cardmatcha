"use client";

import { useEffect, useState } from "react";

interface MobileContentWrapperProps {
  initialIsMobile: boolean;
  children: React.ReactNode;
}

export function MobileContentWrapper({
  initialIsMobile,
  children,
}: MobileContentWrapperProps) {
  const [isMobile, setIsMobile] = useState(initialIsMobile);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return null;
  }

  return <>{children}</>;
}
