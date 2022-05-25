import { useCallback, useState } from "react";

const cToF = (c: number) => c * (9 / 5) + 32;

const fToC = (f: number) => ((f - 32.0) * 5) / 9;

/**
 * A utility to convert between Celcius and Fahrenheit in two text boxes. The values are truncated
 * to one decimal point.
 *
 * @param props unused
 */
const TemperatureConverter = ({}) => {
  const [celcius, setCelcius] = useState("-40.0");
  const [fahrenheit, setFahrenheit] = useState("-40.0");

  const trySetCelcius = useCallback(
    (newCelcius: string, valueTransform = (x: number) => x) => {
      const maybeCelcius = Number.parseFloat(newCelcius);
      if (!Number.isNaN(maybeCelcius)) {
        const fixedCelcius = valueTransform(maybeCelcius).toFixed(1);
        setCelcius(fixedCelcius);
        return fixedCelcius;
      } else {
        return "";
      }
    },
    []
  );

  const trySetFahrenheit = useCallback(
    (newFahrenheit: string, valueTransform = (x: number) => x) => {
      const maybeFahrenheit = Number.parseFloat(newFahrenheit);
      if (!Number.isNaN(maybeFahrenheit)) {
        const fixedFahrenheit = valueTransform(maybeFahrenheit).toFixed(1);
        setFahrenheit(fixedFahrenheit);
        return fixedFahrenheit;
      } else {
        return "";
      }
    },
    []
  );

  return (
    <p>
      <input
        key="inputC"
        type="text"
        value={celcius}
        onChange={(e) => {
          setCelcius(e.target.value);
          trySetFahrenheit(e.target.value, cToF);
        }}
        onBlur={() => {
          // Round to 1 decimal on blur, then update the other value if necessary
          trySetFahrenheit(trySetCelcius(celcius), cToF);
        }}
      ></input>
      {" Celcius = "}
      <input
        key="inputF"
        type="text"
        value={fahrenheit}
        onChange={(e) => {
          setFahrenheit(e.target.value);
          trySetCelcius(e.target.value, fToC);
        }}
        onBlur={() => {
          // Round to 1 decimal on blur, then update the other value if necessary
          trySetCelcius(trySetFahrenheit(fahrenheit), fToC);
        }}
      ></input>
      {" Fahrenheit"}
    </p>
  );
};

export default TemperatureConverter;
