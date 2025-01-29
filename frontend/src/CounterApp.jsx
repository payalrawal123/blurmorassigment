import React, { useEffect, useState } from "react";
import { BehaviorSubject, interval } from "rxjs";
import { map, switchMap, startWith } from "rxjs/operators";
import "./CounterApp.css";

// ViewModel - Handles state using RxJS
const counterSubject = new BehaviorSubject({ count: 0, autoIncrement: false });

const updateCounter = (updateFn) => {
  counterSubject.next(updateFn(counterSubject.getValue()));
};

const CounterViewModel = {
  increment: () => updateCounter((state) => ({
    ...state,
    count: Math.min(state.count + 1, 98),
  })),
  decrement: () => updateCounter((state) => ({
    ...state,
    count: Math.max(state.count - 1, 0),
  })),
  reset: () => updateCounter((state) => ({
    ...state,
    count: 0,
  })),
  toggleAutoIncrement: () => updateCounter((state) => ({
    ...state,
    autoIncrement: !state.autoIncrement,
  })),
};

const CounterApp = () => {
  const [state, setState] = useState(counterSubject.getValue());

  useEffect(() => {
    const subscription = counterSubject
      .pipe(
        switchMap((state) =>
          state.autoIncrement
            ? interval(1100).pipe(
                map(() => ({
                  ...state,
                  count: Math.min(state.count + 1, 98),
                }))
              )
            : counterSubject.pipe(startWith(state))
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
        <button onClick={CounterViewModel.increment} className="button increment">+</button>
        <button onClick={CounterViewModel.decrement} className="button decrement">-</button>
        <button onClick={CounterViewModel.reset} className="button reset">Reset</button>
      </div>
      <button onClick={CounterViewModel.toggleAutoIncrement} className={`auto ${state.autoIncrement ? "auto-on" : "auto-off"}`}>
        {state.autoIncrement ? "Stop Auto Increment" : "Start Auto Increment"}
      </button>
    </div>
  );
};

export default CounterApp;
