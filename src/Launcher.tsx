import { useState } from "react";
import Counter from "./Counter";
import TemperatureConverter from "./TemperatureConverter";

// const guis: ((props: any) => JSX.Element)[] = [Counter, TemperatureConverter];
const guis: [string, ((props: any) => JSX.Element) | null][] = [
  ["Counter", Counter],
  ["Temperature Converter", TemperatureConverter],
  ["Flight Booker", null],
  ["Timer", null],
  ["Crud", null],
  ["Circle Drawer", null],
  ["Cells", null]
];

/**
 * A launcher for the seven actual GUIs. Initially shows a selection, then renders whichever GUI was
 * selected and shows a button to return to the launcher.
 *
 * @param props unused
 */
const Launcher = (props: any) => {
  const [SelectedGui, SetSelectedGui] = useState<(props: any) => JSX.Element>(() => Counter);

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
