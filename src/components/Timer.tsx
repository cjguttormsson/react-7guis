import { useEffect, useMemo, useState } from "react";

const Timer = (props: any) => {
  const [startTimeMs, setStartTimeMs] = useState(Date.now());
  const [currentTimeMs, setCurrentTimeMs] = useState(Date.now());
  const [durationMs, setDurationMs] = useState(10_000);

  const progress = useMemo(
    () => Math.min(1.0, Math.max(0.0, (currentTimeMs - startTimeMs) / durationMs)),
    [currentTimeMs, startTimeMs, durationMs]
  );

  useEffect(() => {
    const timer = setInterval(() => setCurrentTimeMs(Date.now()), 16 /* ms */);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="row align-items-baseline justify-content-center mb-3">
        <div className="col-2 fs-3 text-end">Elapsed Time:</div>
        <div className="col-3 lh-base">
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${progress * 100}%`, transitionDuration: "0.0s" }}
            />
          </div>
        </div>
      </div>
      <div className="row justify-content-center mb-3">
        <div className="col-5 fs-3">{((currentTimeMs - startTimeMs) / 1000).toFixed(1)}s</div>
      </div>
      <div className="row align-items-baselines justify-content-center mb-3">
      <div className="col-2 fs-3 text-end">Duration:</div>
        <div className="col-3 lh-base">
          <input
            type="range"
            className="form-range"
            min={1_000 /* ms */}
            max={60_000 /* ms */}
            value={durationMs}
            onChange={(e) => setDurationMs(Number.parseFloat(e.target.value))}
          />
        </div>
      </div>
      <div className="row justify-content-center mb-3">
        <div className="col-4 d-flex">
          <button className="btn btn-outline-primary" onClick={() => setStartTimeMs(Date.now())}>
            Reset Timer
          </button>
        </div>
      </div>
    </>
  );
};

export default Timer;
