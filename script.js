// classes importadas do HTML. 
const classButtonClear = document.getElementsByClassName('empty-cart')[0];
const listCartItems = document.getElementsByClassName('cart__items')[0];
const classItem = document.getElementsByClassName('items');

// Função já estava aqui... ela cria o elemento da imagem ( eu acho né... pq já não sei mais de nada )
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};
// Função já estava aqui... não faço ideia... mas acho que ela cria elementos customizados ! Só quem sabe é Deus e quem criou
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};
// USAR NO REQ2. sku === id, name === title, image === thumbnail || Função já estava aqui... Cria os elementos dentro da section (Os itens a venda)
const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

//  REQ 2. criar função que mostra os itens na tela. com base no retorno da função fetchProducts. Ela tbm da vida para a função createProductItemElement
const addProdutoObj = async (prod = 'computador') => {
  // const classItem = document.querySelector('.items');// linka com a class ITEMS do HTML.
  const solicitando = await fetchProducts(prod);
  const solicitacaoResults = await solicitando.results; // chama fetchPruducts
 
  solicitacaoResults.forEach(({ id, title, thumbnail }) => { // desconstruir o retorno de fetchProducts e chamar createProductItemElement.
    const produto = { sku: id, name: title, image: thumbnail };
    classItem[0].appendChild(createProductItemElement(produto));
  });
  // console.log(solicitacaoResults);
};

// REQ 5 Remova o item do carrinho de compras ao clicar nele.
const cartItemClickListener = async () => {
  listCartItems.addEventListener('click', (event) => {
    if (event.target.classList.contains('cart__item')) {
      event.target.remove();
      saveCartItems(listCartItems.innerHTML);
    }
  });
};

// USAR NO REQ 4 || Função já estava aqui... Ela é meio que um mistério, mas acho que cria alguma conexão com alguma coisa.... vou descobrir ! 
const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

// USAR NO REQ 4. Obs: salePrice === price retornado pela API.|| Função já estava aqui... acredito que seja responsável ou tenho participação na criação dos itens do cart.

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};
// REQ 4. Adicione o produto ao carrinho de compras
const addFetchItem = async () => {
  document.addEventListener('click', async (event) => {
  if (event.target.classList.contains('item__add')) {
    const spanItemSku = getSkuFromProductItem(event.target.parentNode); // usa a função já existente no proj
    const itemApi = await fetchItem(spanItemSku);
    const itemResults = await itemApi;
    const { id, title, price } = itemResults;
    listCartItems.appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));
    saveCartItems(listCartItems.innerHTML);
  }
  });
};

// REQ 10 - Limpe o carrinho de compras ( class: empty-cart )
classButtonClear.addEventListener('click', () => {
  document.getElementsByClassName('cart__items')[0].innerHTML = '';
});

const teste = () => {
  listCartItems.innerHTML = getSavedCartItems();
};

window.onload = async () => {
  await addProdutoObj();
  await addFetchItem();
  await cartItemClickListener();
  teste();
};