export default function calcTotalPrice(cart) {
  return cart.reduce((accumulator, cartItem) => {
    if (!cartItem.product) return accumulator;
    return accumulator + cartItem.quantity * cartItem.product.price;
  }, 0);
}
