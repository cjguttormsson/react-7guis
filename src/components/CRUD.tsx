import { useState, useRef } from "react";

const CRUD = () => {
  const [names, setNames] = useState<[string, string][]>([
    ["Hands", "Emil"],
    ["Max", "Mustermann"],
    ["Roman", "Tisch"]
  ]);
  const [currentName, setCurrentName] = useState("");
  const [currentSurname, setCurrentSurname] = useState("");
  const [filterPrefix, setFilterPrefix] = useState("");

  const selectElem = useRef<HTMLSelectElement>(null);

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-4">
          <div className="input-group mb-3">
            <span className="input-group-text">Filter Prefix</span>
            <input
              type=""
              className="form-control"
              value={filterPrefix}
              onChange={(e) => setFilterPrefix(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <select
              ref={selectElem}
              size={10}
              style={{ width: "100%" }}
              onChange={(e) => {
                const idx = e.target.selectedIndex;
                setCurrentName(names[idx][0]);
                setCurrentSurname(names[idx][1]);
              }}
            >
              {names
                .filter(([_, surname]) => surname.startsWith(filterPrefix))
                .map(([name, surname]) => {
                  let formattedName = `${surname}, ${name}`;
                  return (
                    <option key={formattedName}>{formattedName}</option>
                  );
                })}
            </select>
          </div>
        </div>
        <div className="col-4 my-auto">
          <div className="input-group mb-3">
            <span className="input-group-text">Name</span>
            <input
              type="text"
              className="form-control"
              value={currentName}
              onChange={(e) => setCurrentName(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Surname</span>
            <input
              type="text"
              className="form-control"
              value={currentSurname}
              onChange={(e) => setCurrentSurname(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row justify-content-start mx-auto">
        <div className="col-2 offset-md-2 d-flex">
          <button
            className="btn btn-primary flex-grow-1"
            onClick={() => {
              setNames([...names, [currentName, currentSurname]]);
              setCurrentName("");
              setCurrentSurname("");
              selectElem.current!.selectedIndex = -1;
            }}
          >
            Create
          </button>
        </div>
        <div className="col-2 d-flex">
          <button
            className="btn btn-outline-primary flex-grow-1"
            onClick={() => {
              const idx = selectElem.current!.selectedIndex;
              if (idx !== -1 && idx !== null) {
                names[idx] = [currentName, currentSurname];
                setNames([...names.slice(0, idx), [currentName, currentSurname], ...names.slice(idx + 1)]);
              }
            }}
          >
            Update
          </button>
        </div>
        <div className="col-2 d-flex">
          <button
            className="btn btn-outline-danger flex-grow-1"
            onClick={() => {
              const idx = selectElem.current!.selectedIndex;
              if (idx !== -1 && idx !== null) {
                setNames([...names.slice(0, idx), ...names.slice(idx + 1)]);
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default CRUD;
