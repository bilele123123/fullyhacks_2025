'use client';

import Image from 'next/image';

const FloatingUfo = () => {
  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 animate-float">
      <Image
        src="/ufo-svgrepo-com.svg"
        alt="UFO"
        width={80}
        height={80}
        priority
      />
    </div>
  );
};

export default FloatingUfo;
