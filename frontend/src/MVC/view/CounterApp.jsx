import React, { useEffect, useState } from "react";
import { interval } from "rxjs";
import { map, switchMap, startWith } from "rxjs/operators";

import "./CounterApp.css";
import { counterModel } from "../modal/counterModal";
import { CounterIntent } from "../intent/counterIntent";

// View - React Component
const CounterApp = () => {
  const [state, setState] = useState(counterModel.getState().getValue());

  useEffect(() => {
    const subscription = counterModel.getState()
      .pipe(
        switchMap((state) =>
          state.autoIncrement
            ? interval(1100).pipe(
                map(() => ({
                  ...state,
                  count: Math.min(state.count + 1, 98),
                }))
              )
            : counterModel.getState().pipe(startWith(state))
        )
      )
      .subscribe(setState);

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="counter-container">
      <h1 className="counter-title">Counter App</h1>
      <div className="counter-display">{state.count}</div>
      <div className="button-group">
        <button onClick={CounterIntent.increment} className="button increment">+</button>
        <button onClick={CounterIntent.decrement} className="button decrement">-</button>
        <button onClick={CounterIntent.reset} className="button reset">Reset</button>
      </div>
      <button onClick={CounterIntent.toggleAutoIncrement} className={`auto ${state.autoIncrement ? "auto-on" : "auto-off"}`}>
        {state.autoIncrement ? "Stop Auto Increment" : "Start Auto Increment"}
      </button>
    </div>
  );
};

export default CounterApp;
