import { ReactNode } from 'react';
import TransitionImage from './TransitionImage';

type ContentWithPosterProps = {
  children: ReactNode;
  posterSrc: string;
};

export default function ContentWithPoster({
  children,
  posterSrc,
}: ContentWithPosterProps) {
  return (
    <div className="content-with-poster">
      <div className="content-wrapper">{children}</div>
      <div className="poster">
        <TransitionImage src={posterSrc} />
      </div>
    </div>
  );
}
