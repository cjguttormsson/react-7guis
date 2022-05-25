import { useState } from "react";
import Counter from "./Counter";
import TemperatureConverter from "./TemperatureConverter";

const guis: (({}) => JSX.Element)[] = [Counter, TemperatureConverter];

/**
 * A launcher for the seven actual GUIs. Initially shows a selection, then renders whichever GUI was
 * selected and shows a button to return to the launcher.
 *
 * @param props unused
 */
const Launcher = ({}) => {
  const [SelectedGui, SetSelectedGui] = useState<(({}) => JSX.Element) | null>(
    null
  );

  return SelectedGui === null ? (
    <>
      {guis.map((gui) => (
        <p key={gui.name}>
          <button
            onClick={() => {
              SetSelectedGui(() => gui);
              console.log(`SelectGui is ${gui}`);
            }}
          >
            {gui.name}
          </button>
        </p>
      ))}
    </>
  ) : (
    <>
      <SelectedGui />

      <p>
        <button onClick={() => SetSelectedGui(null)}>Return to Launcher</button>
      </p>
    </>
  );
};

export default Launcher;
