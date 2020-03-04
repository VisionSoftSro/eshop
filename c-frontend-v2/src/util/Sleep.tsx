export const sleep = (time:number = 5000) => new Promise((resolve) => {
    setTimeout(resolve, time);
});
