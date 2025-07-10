import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

interface HoverLinkProps {
  src: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const HoverLink = ({ src, children, className = '', onClick }: HoverLinkProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const placeholderRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const link = linkRef.current;
    const text = textRef.current;
    const placeholderText = placeholderRef.current;
    
    if (!link || !text) return;

    const tl = gsap.timeline({ paused: true });
    
    const splitText = new SplitText(text, { type: 'chars' });
    const splitPlaceholder = new SplitText(placeholderText, { type: 'chars' });

    gsap.set(splitText.chars, { y: '100%' });

    tl.fromTo(splitText.chars, {
      opacity: 0,
      y: '100%',
    }, {
      opacity: 1,
      y: '0%',
      duration: 0.2,
      ease: 'power2.out',
      stagger: 0.05,
    });
    tl.fromTo(splitPlaceholder.chars, {
      opacity: 1,
      y: '0%',
    }, {
      opacity: 0,
      y: '100%',
      duration: 0.2,
      ease: 'power2.in',
      stagger: 0.05,
    }, 0);

    const handleMouseEnter = () => {
      tl.play();
    };

    const handleMouseLeave = () => {
      tl.reverse();
    };

    link.addEventListener('mouseenter', handleMouseEnter);
    link.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      link.removeEventListener('mouseenter', handleMouseEnter);
      link.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <a 
      ref={linkRef}
      href={src}
      onClick={onClick}
      className={`inline-block cursor-pointer transition-transform duration-100 ${className}`}
    >
      <span ref={textRef} className="inline-block absolute">
        {children}
      </span>
      <span ref={placeholderRef} className="inline-block">
        {children}
      </span>
    </a>
  );
};

export default HoverLink;