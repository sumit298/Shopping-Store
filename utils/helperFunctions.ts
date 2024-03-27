export const groupByCategory = (products) => {
    return products.reduce((acc, product) => {
      const category = product.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});
  };


  export const getUnique = (arr) => {
    // console.log(arr.body)
    const newArray = arr;
    let mapObj = new Map();
    newArray?.forEach((v) => {
      let prevValue = mapObj.get(v.category);
      if (!prevValue) {
        mapObj.set(v.category, v);
      }
    });
    return [...mapObj.values()];
  };
  