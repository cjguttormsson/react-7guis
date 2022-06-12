import { useState } from "react";

type FlightType = "One Way" | "Round Trip";

const dateFormat = RegExp(/^(\d{2})\.(\d{2})\.(\d{4})$/);

// Returns true if departureDate and returnDate are both valid, and either
// departureDate < returnDate, or the flight type is one-way
function datesAreValid(departureDate: string, returnDate: string, flightType: FlightType): boolean {
  const depMatch = dateFormat.exec(departureDate);
  const retMatch = dateFormat.exec(returnDate);
  if (depMatch === null || retMatch === null) {
    return false;
  } else {
    // These are all positive, so no need to convert into numbers to deal with negative sign
    let [, depDay, depMonth, depYear] = depMatch;
    let [, retDay, retMonth, retYear] = retMatch;
    // Compare dates as tuples of (year, month, day)
    let depDate: [string, string, string] = [depYear, depMonth, depDay];
    let retDate: [string, string, string] = [retYear, retMonth, retDay];
    // Date should be strictly before, according to spec
    return depDate < retDate || flightType === "One Way";
  }
}

const FlightBooker = () => {
  let [flightType, setFlightType] = useState<FlightType>("One Way");
  let [departureDateString, setDepartureDateString] = useState(() => {
    // Initialize to today
    let today = new Date();
    return [
      today.getDate().toString().padStart(2, "0"),
      (today.getMonth() + 1).toString().padStart(2, "0"),
      today.getFullYear().toString()
    ].join(".");
  });
  let [returnDateString, setReturnDateString] = useState(() => {
    // Initialize to tomorrow
    let tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    return [
      tomorrow.getDate().toString().padStart(2, "0"),
      (tomorrow.getMonth() + 1).toString().padStart(2, "0"),
      tomorrow.getFullYear().toString()
    ].join(".");
  });
  let [bookedMessage, setBookedMessage] = useState<string | null>(null);

  return (
    <>
      <div className="row justify-content-center mb-3">
        <div className="form-group col-4">
          <select
            className="form-select"
            onChange={(e) => setFlightType(e.target.value as FlightType)}
            value={flightType}
          >
            <option value="One Way">One Way</option>
            <option value="Round Trip">Round Trip</option>
          </select>
        </div>
      </div>
      <div className="row justify-content-center mb-3">
        <div className="form-group col-4">
          <input
            className={"form-control" + (dateFormat.test(departureDateString) ? "" : " is-invalid")}
            type="text"
            value={departureDateString}
            onChange={(e) => setDepartureDateString(e.target.value)}
          />
        </div>
      </div>
      <div className="row justify-content-center mb-3">
        <div className="form-group col-4">
          <input
            className={"form-control" + (dateFormat.test(returnDateString) ? "" : " is-invalid")}
            type="text"
            value={returnDateString}
            onChange={(e) => setReturnDateString(e.target.value)}
            disabled={flightType !== "Round Trip"}
          />
        </div>
      </div>
      <div className="row justify-content-center mb-3">
        <div className="form-group col-4">
          <button
            type="button"
            className="btn btn-primary form-control"
            disabled={!datesAreValid(departureDateString, returnDateString, flightType)}
            onClick={() => {
              if (flightType === "One Way") {
                setBookedMessage(`"Booked" a one-way flight on ${departureDateString}`);
              } else {
                setBookedMessage(
                  `"Booked" a round-trip flight leaving on ${departureDateString} and ` +
                  `returning on ${returnDateString}`
                );
              }
            }}
          >
            "Book Flight"
          </button>
        </div>
      </div>
      {bookedMessage === null ? undefined : (
        <div className="row justify-content-center mb-3">
          <div className="col-4">
            <strong>{bookedMessage}</strong>
          </div>
        </div>
      )}
    </>
  );
};

export default FlightBooker;
