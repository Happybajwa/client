import { createStore } from "redux";
import { CounterReducer } from "../../Features/Contact/CounterReducer";

export function ConfigureStore() {
    return createStore(CounterReducer);
}