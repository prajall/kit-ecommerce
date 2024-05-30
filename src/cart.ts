let cart: String[] = ["1"];

export default cart;

export const addItemsToCart = (productId: any) => {
  console.log("before: ", cart);
  cart.push(productId);
  console.log("After: ", cart);
};
