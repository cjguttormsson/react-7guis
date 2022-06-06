import { useState } from "react";

const Counter = (props: any) => {
  const [count, setCount] = useState(0);

  return (
    <div className="row justify-content-center">
      <div className="col-3">
        <div className="input-group">
          <input
            aria-label="Current Count"
            className="form-control"
            type="text"
            value={count}
            disabled
          />
          <button className="btn btn-primary" type="button" onClick={() => setCount((c) => c + 1)}>
            Count
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
