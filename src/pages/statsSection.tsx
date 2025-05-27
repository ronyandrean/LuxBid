import { useEffect, useState, } from 'react';
import '../style/statsSection.css';

type CountUpProps = {
  end: number;
  duration?: number;
};
const CountUp = ({ end, duration = 2000 }: CountUpProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16); 
    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setCount(Math.round(start));
    }, 16);

    return () => clearInterval(counter);
  }, [end, duration]);

  return <h2>{count.toLocaleString()}+</h2>;
};
const CountUpPercent = ({ end, duration = 2000 }: CountUpProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16); 
    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setCount(Math.round(start));
    }, 16);

    return () => clearInterval(counter);
  }, [end, duration]);

  return <h2>{count.toLocaleString()}%</h2>;
};

const Stats = () => {
  return (
    <div className="stats-container">
      <div className="stats-card fade-in">
        <div className="stat-item">
          <CountUp end={100_000} />
          <p>Trading Volume</p>
        </div>
        <div className="stat-item">
          <CountUp end={10000} />
          <p>Verified Auditors</p>
        </div>
        <div className="stat-item">
          <CountUpPercent end={99} />
          <p>Secure Transactions</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;

