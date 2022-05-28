import { useState } from "react";
import Counter from "./Counter";
import TemperatureConverter from "./TemperatureConverter";

const guis: ((props: any) => JSX.Element)[] = [Counter, TemperatureConverter];

/**
 * A launcher for the seven actual GUIs. Initially shows a selection, then renders whichever GUI was
 * selected and shows a button to return to the launcher.
 *
 * @param props unused
 */
const Launcher = (props: any) => {
  const [SelectedGui, SetSelectedGui] = useState<((props: any) => JSX.Element) | null>(null);

  return SelectedGui === null ? (
    <>
      {guis.map((gui) => (
        <p key={gui.name}>
          <button
            className="btn"
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
        <button className="btn" onClick={() => SetSelectedGui(null)}>
          Return to Launcher
        </button>
      </p>
    </>
  );
};

export default Launcher;
