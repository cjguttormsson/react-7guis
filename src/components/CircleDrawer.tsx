import { useMemo, useState } from "react";
import useHistory from "../useHistory";

interface Circle {
  x: number,
  y: number,
  r: number
}

const CircleDrawer = () => {
  const [circles, setCircles, undo, redo] = useHistory([] as Circle[]);
  const [circleBeingEdited, setCircleBeingEdited] = useState<Circle | null>(null);
  const [newRadius, setNewRadius] = useState(0.0);
  const circlesToDraw = useMemo(() => circles.map(circle => circle === circleBeingEdited ? {
      ...circle,
      r: newRadius
    } : circle),
    [circles, circleBeingEdited, newRadius]);

  return <>
    <div className="row justify-content-center mb-3">
      <div className="col-auto">
        <button className="btn btn-outline-primary" disabled={undo === undefined} onClick={() => undo?.()}>Undo
        </button>
      </div>
      <div className="col-auto">
        <button className="btn btn-primary" disabled={redo === undefined} onClick={() => redo?.()}>Redo</button>
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="col-7">
        <style>{"circle:hover { fill: gray; }"}</style>
        <svg style={{ border: "1px solid black" }}
             viewBox="0 0 640 480"
             xmlns="http://www.w3.org/2000/svg"
             onClick={e => {
               const boundingClientRect = (e.nativeEvent.target as SVGElement).getBoundingClientRect();
               const scale = (boundingClientRect.right - boundingClientRect.left) / 640;
               setCircles([...circles, { x: e.nativeEvent.offsetX / scale, y: e.nativeEvent.offsetY / scale, r: 40 }]);
             }}>
          {circlesToDraw.map(c => <circle cx={c.x} cy={c.y} r={c.r} fill="white" stroke="black"
                                          onContextMenuCapture={(e) => {
                                            e.preventDefault();
                                            setNewRadius(c.r);
                                            setCircleBeingEdited(c);
                                          }}
                                          onClick={e => e.preventDefault()} />)}
        </svg>
      </div>
    </div>
    {circleBeingEdited === null ? null :
      <div className="modal" style={{ display: "block" }} role="dialog" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>
                Adjust diameter of circle at ({circleBeingEdited.x.toFixed(1)}, {circleBeingEdited.y.toFixed(1)}).
              </h5>
              <button type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => {
                        setCircles(circles.map(c => (c === circleBeingEdited) ? { ...c, r: newRadius } : c));
                        setCircleBeingEdited(null);
                      }} />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <input className="form-range"
                         type="range"
                         min={10.0}
                         max={120.0}
                         value={newRadius}
                         onChange={(e) => setNewRadius(parseFloat(e.target.value))} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>}
  </>;
};

export default CircleDrawer;