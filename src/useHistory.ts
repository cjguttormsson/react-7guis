import { useState } from "react";

function useHistory<T>(initialVal: T): [presentValue: T, setPresentValue: (newVal: T) => void, undo?: () => void, redo?: () => void] {
  const [past, setPast] = useState([] as T[]);
  const [presentValue, setPresentValue] = useState(initialVal);
  const [future, setFuture] = useState([] as T[]);

  const setValue = (newValue: T) => {
    setPast([...past, presentValue]);
    setPresentValue(newValue);
    setFuture([]);
  };

  const undo = (past.length > 0) ? () => {
    setFuture([presentValue, ...future]);
    setPresentValue(past.at(-1)!);
    setPast(past.slice(0, -1));
  } : undefined;

  const redo = (future.length > 0) ? () => {
    setPast([...past, presentValue]);
    setPresentValue(future.at(0)!);
    setFuture(future.slice(1));
  } : undefined;

  return [presentValue, setValue, undo, redo];
}

export default useHistory;