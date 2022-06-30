import React, { ChangeEventHandler, useCallback, useState } from "react";

const ROWS = [...Array(100).keys()].map(i => `${i + 1}`);

let CHAR_CODE_A = 65;
const COLS = [...Array(26).keys()].map((i) => String.fromCharCode(CHAR_CODE_A + i));

const Cell = React.memo(() => {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (<td className="p-0" style={{ marginRight: "-1px", marginTop: "-1px" }}>
    <input
      type="text"
      className="form-control rounded-0"
      value={value || ""} // make sure the input is always managed
      style={{ minWidth: "8em", marginRight: "-1px", marginTop: "-1px", height: "45px" }}
      onChange={useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
        setValue(e.target.value);
      }, [])} />
  </td>);
});

interface CellRowProps {
  rowLabel: string,
}

const CellRow = React.memo(({ rowLabel }: CellRowProps) => {
  return <tr>
    <th scope="row">{rowLabel}</th>
    {COLS.map((colLabel) => <Cell key={colLabel + rowLabel} />)}
  </tr>;
});

const Cells = () => {

  return (<table className="table table-bordered table-responsive">
    <thead>
    <tr>
      <th />
      {COLS.map((colLabel) => <th scope="col" key={colLabel}>{colLabel}</th>)}
    </tr>
    </thead>
    <tbody>
    {ROWS.map((rowLabel) => <CellRow rowLabel={rowLabel} key={rowLabel} />)}
    </tbody>
  </table>);
};

export default Cells;