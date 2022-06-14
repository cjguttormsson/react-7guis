import { useState } from "react";
import Counter from "./Counter";
import CRUD from "./CRUD";
import FlightBooker from "./FlightBooker";
import TemperatureConverter from "./TemperatureConverter";
import Timer from "./Timer";
import CircleDrawer from "./CircleDrawer";
import Cells from "./Cells";

// const guis: ((props: any) => JSX.Element)[] = [Counter, TemperatureConverter];
const guis: [string, ((props: any) => JSX.Element) | null][] = [
  ["Counter", Counter],
  ["Temperature Converter", TemperatureConverter],
  ["Flight Booker", FlightBooker],
  ["Timer", Timer],
  ["CRUD", CRUD],
  ["Circle Drawer", CircleDrawer],
  ["Cells", Cells]
];

interface LauncherProps {
  location: string;
}

/**
 * A launcher for the seven actual GUIs. Initially shows a selection, then renders whichever GUI was
 * selected and shows a button to return to the launcher.
 *
 * @param props Optionally contains the name of the component that should be rendered
 */
const Launcher = ({ location }: LauncherProps) => {
  const [SelectedGui, SetSelectedGui] = useState<(props: any) => JSX.Element>(() =>
    guis
      .filter(([name, gui]) => name === location && gui !== null)
      .map(([, gui]) => gui)
      .at(0) || Counter
  );

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
