import { useState } from "react";

const Counter = ({}) => {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>The count is {count}</p>
      <p>
        <button
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
