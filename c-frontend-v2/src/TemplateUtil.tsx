
export const productImageUrl = (itemId:string, imageId:number) => {
    return imageUrl(`product-img/${itemId}/${imageId}.jpg`);
};

export const imageUrl = (relativePath:string) => {
    return `/static/${relativePath}`;
};