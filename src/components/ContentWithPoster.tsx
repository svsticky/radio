import { ReactNode } from 'react';

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
      <img src={posterSrc} className="poster" />
    </div>
  );
}
