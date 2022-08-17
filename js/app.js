const addToShoppingMobileButtons = document.querySelectorAll(".addToMobile");
addToShoppingMobileButtons.forEach((addToMobileButton) => {
  addToMobileButton.addEventListener("click", addToMobileClicked);
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const shoppingMobileItemsContainer = document.querySelector(
  '.shoppingMobileItemsContainer'
);

function addToMobileClicked(event) {
  const button = event.target;
  const item = button.closest('.item');

  const itemTitle = item.querySelector('.item-title').textContent;
  const itemPrice = item.querySelector('.item-price').textContent;
  const itemImage = item.querySelector('.item-image').src;

  addItemToShoppingMobile(itemTitle, itemPrice, itemImage);
}

function addItemToShoppingMobile(itemTitle, itemPrice, itemImage) {
  const elementsTitle = shoppingMobileItemsContainer.getElementsByClassName(
    'shoppingMobileItemTitle'
  );
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitle) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.shoppingMobileItemQuantity'
      );
      elementQuantity.value++;
      $('.toast').toast('show');
      updateShoppingCartTotal();
      return;
    }
  }

  const shoppingMobileRow = document.createElement('div');
  const shoppingMobileContent = `
  <div class="row shoppingMobileItem">
        <div class="col-6">
            <div class="shopping-mobile-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-mobile-image">
                <h6 class="shopping-mobile-item-title shoppingMobileItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-mobile-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingMobileItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-mobile-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-mobile-quantity-input shoppingMobileItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
  shoppingMobileRow.innerHTML = shoppingMobileContent;
  shoppingMobileItemsContainer.append(shoppingMobileRow);

  shoppingMobileRow
    .querySelector('.buttonDelete')
    .addEventListener('click', removeShoppingMobileItem);

  shoppingMobileRow
    .querySelector('.shoppingMobileItemQuantity')
    .addEventListener('change', quantityChanged);

  updateShoppingMobileTotal();
}

function updateShoppingMobileTotal() {
  let total = 0;
  const shoppingMobileTotal = document.querySelector('.shoppingMobileTotal');

  const shoppingMobileItems = document.querySelectorAll('.shoppingMobileItem');

  shoppingMobileItems.forEach((shoppingMobileItem) => {
    const shoppingMobileItemPriceElement = shoppingMobileItem.querySelector(
      '.shoppingMobileItemPrice'
    );
    const shoppingMobileItemPrice = Number(
      shoppingMobileItemPriceElement.textContent.replace('$', '')
    );
    const shoppingMobileItemQuantityElement = shoppingMobileItem.querySelector(
      '.shoppingMobileItemQuantity'
    );
    const shoppingMobileItemQuantity = Number(
      shoppingMobileItemQuantityElement.value
    );
    total = total + shoppingMobileItemPrice * shoppingMobileItemQuantity;
  });
  shoppingMobileTotal.innerHTML = `${total.toFixed(2)}$`;
}

function removeShoppingMobileItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingMobileItem').remove();
  updateShoppingMobileTotal();
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingMobileTotal();
}

function comprarButtonClicked() {
  shoppingMobileItemsContainer.innerHTML = '';
  updateShoppingMobileTotal();
}
