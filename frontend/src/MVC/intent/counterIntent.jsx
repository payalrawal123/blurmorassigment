import { counterModel } from "../modal/counterModal";


// Intent - Handles user interactions
export const CounterIntent = {
  increment: () => counterModel.updateState((state) => ({
    ...state,
    count: Math.min(state.count + 1, 98),
  })),
  decrement: () => counterModel.updateState((state) => ({
    ...state,
    count: Math.max(state.count - 1, 0),
  })),
  reset: () => counterModel.updateState((state) => ({
    ...state,
    count: 0,
  })),
  toggleAutoIncrement: () => counterModel.updateState((state) => ({
    ...state,
    autoIncrement: !state.autoIncrement,
  })),
};
