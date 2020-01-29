import DataStorage from "../DataStorage";
import {Mapper} from "../utils/objectmapper/Mapper";

export function loadState<T>(constructor:{new(): T}, stateKey:string):T {
    const stateObjectMapper = new Mapper<T>({constructor:constructor});
    try {
        const serializedState = DataStorage.get(stateKey);
        if (serializedState === null) {
            return undefined;
        }
        return stateObjectMapper.readValue(serializedState);
    } catch (err) {
        return undefined;
    }
}

export function saveState<T>(constructor:{new(): T}, stateKey:string, state:T) {
    const stateObjectMapper = new Mapper<T>({constructor:constructor});
    try {
        const serializedState = stateObjectMapper.writeValueAsString(state);
        DataStorage.set(stateKey, serializedState);
    } catch {
        // ignore write errors
    }
}