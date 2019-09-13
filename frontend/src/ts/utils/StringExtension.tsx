
export const capitalize = (word: string) => {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1);
};
interface String {
    capitalize():string
}

// @ts-ignore
String.prototype.capitalize = () => {
    // @ts-ignore
    return capitalize(this);
};
