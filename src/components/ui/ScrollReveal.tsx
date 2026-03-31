import { useEffect, useRef, useState } from "react";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

type ScrollRevealTag = "div" | "section" | "article" | "aside";

interface ScrollRevealProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  as?: ScrollRevealTag;
  delay?: number;
}

export function ScrollReveal({
  children,
  className = "",
  as = "div",
  delay = 0,
  style,
  ...rest
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const Tag = as;
  const revealStyle = { "--reveal-delay": `${delay}ms`, ...style } as CSSProperties;

  return (
    <Tag
      ref={elementRef as never}
      className={`scroll-reveal${isVisible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={revealStyle}
      {...rest}
    >
      {children}
    </Tag>
  );
}
