'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const ScrollToTopRocket = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [launching, setLaunching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      setIsVisible(scrollBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    setLaunching(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);

    setTimeout(() => {
      setLaunching(false);
    }, 1000);
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <button
        onClick={handleClick}
        className={`transition-transform duration-1000 ${
          launching ? '-translate-y-[120vh] opacity-0' : ''
        }`}
      >
        <Image
          src="/rocket-launch.png"
          alt="Scroll to top"
          width={50}
          height={50}
          className="drop-shadow-lg hover:scale-110 transition-transform rounded-full"
        />
      </button>
    </div>
  );
};

export default ScrollToTopRocket;
