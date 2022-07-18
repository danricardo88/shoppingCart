const saveCartItems = (key) => {
  localStorage.setItem('cartItems', key);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
