import type { Product } from "./types";


export const groupByCategory = (products: Product[]): { [key: string]: Product[] } => {
  return products.reduce((acc: { [key: string]: Product[] }, product: Product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});
};

export const getUnique = (arr: Product[]): Product[] => {
  const newArray = arr;
  let mapObj = new Map<string, Product>();
  newArray?.forEach((v) => {
    let prevValue = mapObj.get(v.category);
    if (!prevValue) {
      mapObj.set(v.category, v);
    }
  });
  return Array.from(mapObj.values());
};
