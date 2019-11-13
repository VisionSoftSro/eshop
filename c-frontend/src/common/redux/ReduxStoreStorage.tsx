import DataStorage from "../DataStorage";
import {ObjectMapper} from "../utils/ObjectMapper";

export function loadState<T>(constructor:{new(): T}, stateKey:string):T {
    const stateObjectMapper = new ObjectMapper<T>();
    try {
        const serializedState = DataStorage.get(stateKey);
        if (serializedState === null) {
            return undefined;
        }
        return stateObjectMapper.readValue(constructor, JSON.parse(serializedState));
    } catch (err) {
        return undefined;
    }
}

export function saveState<T>(stateKey:string, state:T) {
    const stateObjectMapper = new ObjectMapper<T>();
    try {
        const serializedState = stateObjectMapper.writeValueAsString(state);
        DataStorage.set(stateKey, serializedState);
    } catch {
        // ignore write errors
    }
}