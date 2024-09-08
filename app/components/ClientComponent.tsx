"use client"
import { ReactNode, useEffect } from "react";

export default function ClientComponent({ children }: { children: ReactNode }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <>{children}</>;
}