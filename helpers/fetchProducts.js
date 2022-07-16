const fetchProducts = async (QUERY) => {
  const baseUrl = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
  try {
  const produto = await fetch(baseUrl);
  const apiBase = await produto.json();
  return apiBase; /* .results */
  } catch (error) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
  // const produtoObj = {
  //   sku: apiBase.results[0].id,
  //   name: apiBase.results[0].title,
  //   image: apiBase.results[0].thumbnail,
  // };
  // return [produtoObj.sku, produtoObj.name, produtoObj.image];