import { useCallback, useState } from "react";

const cToF = (c: number) => c * (9 / 5) + 32;

const fToC = (f: number) => ((f - 32.0) * 5) / 9;

/**
 * A utility to convert between Celsius and Fahrenheit in two text boxes. The values are truncated
 * to one decimal point.
 *
 * @param props unused
 */
const TemperatureConverter = (props: any) => {
  const [celsius, setCelsius] = useState("-40.0");
  const [fahrenheit, setFahrenheit] = useState("-40.0");

  const trySetCelsius = useCallback((newCelsius: string, valueTransform = (x: number) => x) => {
    const maybeCelsius = Number.parseFloat(newCelsius);
    if (!Number.isNaN(maybeCelsius)) {
      const fixedCelsius = valueTransform(maybeCelsius).toFixed(1);
      setCelsius(fixedCelsius);
      return fixedCelsius;
    } else {
      return "";
    }
  }, []);

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
    <div className="row justify-content-center">
      <div className="col-6">
        <div className="input-group">
          <input
            aria-describedby="label-celsius"
            aria-label="Celsius"
            className="form-control"
            type="text"
            value={celsius}
            onChange={(e) => {
              setCelsius(e.target.value);
              trySetFahrenheit(e.target.value, cToF);
            }}
            onBlur={() => {
              trySetFahrenheit(trySetCelsius(celsius), cToF);
            }}
          />
          <span id="label-celsius" className="input-group-text">
            ° Celsius
          </span>
          <span className="input-group-text">=</span>
          <input
            aria-describedby="label-fahrenheit"
            aria-label="Fahrenheit"
            className="form-control"
            type="text"
            value={fahrenheit}
            onChange={(e) => {
              setFahrenheit(e.target.value);
              trySetCelsius(e.target.value, fToC);
            }}
            onBlur={() => {
              trySetCelsius(trySetFahrenheit(fahrenheit), fToC);
            }}
          />
          <span id="label-fahrenheit" className="input-group-text">
            ° Fahrenheit
          </span>
        </div>
      </div>
    </div>
  );
};

export default TemperatureConverter;
