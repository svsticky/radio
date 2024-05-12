import PropTypes from 'prop-types';

/**
 *
 * @param {Object} props
 * @param {string} props.poster
 * @returns
 */
export default function Poster(props) {
  return <img src={props.poster} className="poster" alt="poster" />;
}

// Explain expected types, for early error detection
Poster.propTypes = {
  poster: PropTypes.string.isRequired,
};