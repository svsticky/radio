type PosterProps = {
  src: string
};

export default function Poster({ src }: PosterProps) {
  return <img src={src} className="poster" alt="poster" />;
}
