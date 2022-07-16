const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  // coloque seu código aqui
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

// criar função que mostra os itens na tela. com base no retorno da função fetchProducts.
const addProdutoObj = async () => {
  // linka com a class ITEMS do HTML.
    const item = document.querySelector('.items');

  // chama fetchPruducts
  const solicitando = await fetchProducts('computador'); // PENSAR EM COMO POR O COMPUTADOR !
  const solicitacaoResults = await solicitando.results;
 
  // desconstruir o retorno de fetchProducts e chamar createProductItemElement.
  solicitacaoResults.forEach(({ id, title, thumbnail }) => {
    const produto = { sku: id, name: title, image: thumbnail };
    item.appendChild(createCartItemElement(produto));
  });
};
addProdutoObj();

window.onload = async () => {}; 
