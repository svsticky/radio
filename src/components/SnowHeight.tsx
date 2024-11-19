export default function SnowHeight() {
  return (
    <img
      src={import.meta.env.VITE_SNOW_HEIGHT_URL}
      style={{ height: '100vh', position: 'absolute', top: 0 }}
      alt="Snow height meter"
    />
  );
}
