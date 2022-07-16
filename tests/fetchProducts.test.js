require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {

  test('Teste se fetchProducts é uma função', () => {
    expect(typeof(fetchProducts)).toEqual('function');
  });

  test('Testa se a fetch foi chamada, ao usar o argumento "computado"', async () => {
    const req2 = await fetchProducts('computador')
    expect(fetch).toHaveBeenCalled();
  });
  
  test('se ao chamar fetchProducts com o argumento "computado", a função fecth ultiliza endpoint', async () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    const req3 = await fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  test('Se o retorno de "fetchProducts" om o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch ', async () => {
    const req4 = await fetchProducts('computador');
    expect(req4).toEqual(computadorSearch);
  })
  test('ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    const req5 = await fetchProducts();
    expect(req5).toEqual(new Error('You must provide an url'))
  })

});
