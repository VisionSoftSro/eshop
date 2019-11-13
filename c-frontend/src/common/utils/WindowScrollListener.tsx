let scrollIndex = 0;
let scrollListeners = new Map();
export const addScrollListener = (method:(ev:Event)=>void):number => {
    scrollIndex++;
    scrollListeners.set(scrollIndex, method);
    return scrollIndex;
};
export const removeScrollListener = (id:number) => {
    scrollListeners.delete(id);
};
window.onscroll = (ev:Event) => {
    scrollListeners.forEach((value, key, map) => {
        value(ev);
    })
};
