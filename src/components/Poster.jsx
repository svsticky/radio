/**
 *
 * @param {Object} props
 * @param {string} props.poster
 * @returns
 */
export default function Poster(props) {
  return <img src={props.poster} className="poster" alt="poster" />;
}
