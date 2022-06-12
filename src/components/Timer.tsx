import { useEffect, useMemo, useState } from "react";

const Timer = () => {
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
        <div className="col-4 d-flex gap-2">
          <div>Elapsed:</div>
          <div className="flex-grow-1">
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progress * 100}%`, transitionDuration: "0.0s" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center mb-3">
        <div className="col-4">{((currentTimeMs - startTimeMs) / 1000).toFixed(1)}s</div>
      </div>
      <div className="row align-items-baselines justify-content-center mb-3">
        <div className="col-4 d-flex gap-2">
          <div>Duration:</div>
          <div className="flex-grow-1">
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
      </div>
      <div className="row justify-content-center mb-3">
        <div className="col-4 d-flex">
          <button
            className="btn btn-outline-primary flex-grow-1"
            onClick={() => setStartTimeMs(Date.now())}
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default Timer;
