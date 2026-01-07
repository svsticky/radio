import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const TARGET_DATE = import.meta.env.VITE_GALA_COUNTDOWN_DATE;
const QR_URL = import.meta.env.VITE_GALA_QR_URL;

if (!TARGET_DATE) console.warn('VITE_GALA_COUNTDOWN_DATE is not defined');
if (!QR_URL) console.warn('VITE_GALA_QR_URL is not defined');

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function GalaCountdown() {
  const targetDate = new Date(TARGET_DATE);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(
      () => setTimeLeft(getTimeLeft(targetDate)),
      1000,
    );
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Lustrum Gala Ticket Countdown</h1>

      <div style={styles.timer}>
        <TimeBlock label="Days" value={timeLeft.days} />
        <TimeBlock label="Hours" value={timeLeft.hours} />
        <TimeBlock label="Minutes" value={timeLeft.minutes} />
        <TimeBlock label="Seconds" value={timeLeft.seconds} />
      </div>

      {QR_URL && (
        <div style={styles.qrContainer}>
          <QRCodeSVG
            value={QR_URL}
            size={500}
            bgColor="#020036"
            fgColor="#ffffff"
          />
        </div>
      )}
    </div>
  );
}

function TimeBlock({ label, value }: { label: string; value: number }) {
  return (
    <div style={styles.block}>
      <div style={styles.value}>{String(value).padStart(2, '0')}</div>
      <div style={styles.label}>{label}</div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100vw',
    height: '100vh',
    background: '#fa6b20',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem 0',
    fontFamily: 'system-ui, sans-serif',
  },
  title: {
    fontSize: 'clamp(5rem, 8vw, 8rem)',
    textAlign: 'center',
  },
  timer: {
    background: '#020036',
    padding: '4rem 6rem',
    borderRadius: '3rem',
    display: 'flex',
    gap: '2rem',
  },
  block: {
    textAlign: 'center',
  },
  value: {
    fontSize: 'clamp(7rem, 11vw, 11rem)',
    fontWeight: 700,
  },
  label: {
    fontSize: '3rem',
    opacity: 0.75,
    marginTop: '0.5rem',
  },
  qrContainer: {
    padding: '1rem',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '2rem',
    background: '#020036',
    marginTop: '2rem',
    marginBottom: '5rem',
  },
};
