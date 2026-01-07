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
  if (!TARGET_DATE) throw new Error('VITE_GALA_COUNTDOWN_DATE is not defined');
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
      <div style={styles.title}>Lustrum Gala Ticket Deadline</div>
      {QR_URL && (
        <div style={styles.qrContainer}>
          <QRCodeSVG
            value={QR_URL}
            size={375}
            bgColor="#020036"
            fgColor="#ffffff"
          />
        </div>
      )}

      <div style={styles.timer}>
        <TimeBlock label="Days" value={timeLeft.days} />
        <TimeBlock label="Hours" value={timeLeft.hours} />
        <TimeBlock label="Minutes" value={timeLeft.minutes} />
        <TimeBlock label="Seconds" value={timeLeft.seconds} />
      </div>
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
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'system-ui, sans-serif',
    padding: '0',
    gap: '2rem',
  },
  title: {
    fontSize: 'clamp(3rem, 6vw, 6rem)',
    textAlign: 'center',
    background: '#020036',
    borderRadius: '2rem',
    padding: '1rem 2rem',
    margin: '0',
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
    fontSize: 'clamp(5rem, 9vw, 9rem)',
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
  },
};
