import { BehaviorSubject } from "rxjs";

// Model - Manages state
class CounterModel {
  constructor() {
    this.state = new BehaviorSubject({ count: 0, autoIncrement: false });
  }

  getState() {
    return this.state;
  }

  updateState(updateFn) {
    this.state.next(updateFn(this.state.getValue()));
  }
}

export const counterModel = new CounterModel();