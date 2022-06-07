import { useDebugValue, useState } from "react";
import Counter from "./Counter";
import FlightBooker from "./FlightBooker";
import TemperatureConverter from "./TemperatureConverter";

// const guis: ((props: any) => JSX.Element)[] = [Counter, TemperatureConverter];
const guis: [string, ((props: any) => JSX.Element) | null][] = [
  ["Counter", Counter],
  ["Temperature Converter", TemperatureConverter],
  ["Flight Booker", FlightBooker],
  ["Timer", null],
  ["Crud", null],
  ["Circle Drawer", null],
  ["Cells", null],
];

interface LauncherProps {
  location: string
}

/**
 * A launcher for the seven actual GUIs. Initially shows a selection, then renders whichever GUI was
 * selected and shows a button to return to the launcher.
 *
 * @param props unused
 */
const Launcher = ({ location }: LauncherProps) => {
  const [SelectedGui, SetSelectedGui] = useState<(props: any) => JSX.Element>(() => {
    return (
      guis
        .filter(([name, gui]) => name === location)
        .map(([name, gui]) => gui)
        .at(0) || Counter
    );
  });
  useDebugValue(location);

  return (
    <>
      <div className="mb-3">
        <ul className="nav nav-tabs">
          {guis.map(([name, gui]) => (
            <li className="nav-item" key={name}>
              <a
                className={
                  "nav-link" +
                  (gui === SelectedGui ? " active" : "") +
                  (gui === null ? " disabled" : "")
                }
                aria-current={gui === SelectedGui ? "page" : undefined}
                onClick={() => {
                  if (gui !== null) {
                    SetSelectedGui(() => gui);
                  }
                }}
                href={"#" + name}
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <SelectedGui />
    </>
  );
};

export default Launcher;
