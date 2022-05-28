import { useState } from "react";

const Counter = (props: any) => {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>The count is {count}</p>
      <p>
        <button
          className="btn"
          onClick={() => {
            setCount((c) => c + 1);
          }}
        >
          Increment
        </button>
      </p>
    </>
  );
};

export default Counter;
