require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe(' Desenvolva testes de no mínimo 50% de cobertura total e 100% da função "fetchItem"', () => {
  test('Teste se "fetchItem" é uma função;', () => {
    expect(typeof(fetchItem)).toEqual('function');
  });
  test('Testa se a fetch foi chamada, ao usar o argumento "computado"', async () => {
    const req2 = await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled();
  });
  test('Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', async() => {
    const endpoint = "https://api.mercadolibre.com/items/MLB1615760527";
    const req3 = await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint)
  });
  test('Se retorno da função "fetchItem" com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    const req4 = await fetchItem('MLB1615760527');
    expect(req4).toEqual(item);
  })
  test('fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    const req5 = await fetchItem();
    expect(req5).toEqual(new Error('You must provide an url'));
  })
  
});
