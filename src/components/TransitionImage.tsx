import { useEffect, useState } from 'react';

type TransitionImage = {
  src: string;
};

export default function TransitionImage({ src }: TransitionImage) {
  const [loaded, setLoaded] = useState(false);
  const [inTransition, setInTransition] = useState(true);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const [prevSrc, setPrevSrc] = useState<string | null>(null);

  /* update current and previous src when src changes */
  if (currentSrc !== src) {
    setPrevSrc(currentSrc);
    setCurrentSrc(src);
  }

  useEffect(() => {
    setInTransition(true);
    const id = setTimeout(() => setInTransition(false), 1000);
    return () => clearTimeout(id);
  });

  return (
    <div className="transition-image">
      <img
        src={src}
        key={src}
        className={`current ${loaded ? 'loaded' : ''}`}
        onLoad={() => setLoaded(true)}
      />
      {prevSrc && inTransition && (
        <img src={prevSrc} key={prevSrc} className="previous" />
      )}
    </div>
  );
}
