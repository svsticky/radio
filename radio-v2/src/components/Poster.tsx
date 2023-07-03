
export interface PosterProps {
    url: string,
}

export default function Poster(props: PosterProps) {
  return <img src={props.url} className='poster' />;
}
