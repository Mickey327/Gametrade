function removeProduct(){
    let removeButton = $(this);
    let productPrice = removeButton.closest('.table-another-row').find('.price').text().trim().split(" ")[0];
    let oldTotalPrice = removeButton.closest('.page-body').find('.total-price').text().trim().split(" ")[0];
    let newTotalPrice = oldTotalPrice - productPrice;
    removeButton.closest('.page-body').find('.total-price').text(newTotalPrice+" ₽");
    removeButton.closest('.table-another-row').remove();
}
function minusQuantity(){
    let minusButton = $(this);
    let cartQuantityField = minusButton.closest('.quantity-td').find('.cart-quantity').text().trim();
    let oldPrice = minusButton.closest('.table-another-row').find('.price').text().trim().split(" ")[0];
    let oldTotalPrice = minusButton.closest('.page-body').find('.total-price').text().trim().split(" ")[0];
    if (parseInt(cartQuantityField) == 1){
        let newVal = 1;
        alert('Данный товар итак представлен в единственном экземпляре, если хотите удалить его из корзины совсем, то нажмите на соответствующее иконку');
        minusButton.closest('.quantity-td').find('.cart-quantity').text(newVal);
        minusButton.closest('.table-another-row').find('.price').text(oldPrice+ " ₽");
        minusButton.closest('.page-body').find('.total-price').text(oldTotalPrice+" ₽");
    }
    else{
        let newVal = parseInt(cartQuantityField) - 1;
        let newPrice = parseFloat(oldPrice) / parseInt(cartQuantityField) * newVal;
        let newTotalPrice = parseFloat(oldTotalPrice)-parseFloat(oldPrice) / parseInt(cartQuantityField);
        minusButton.closest('.quantity-td').find('.cart-quantity').text(newVal);
        minusButton.closest('.table-another-row').find('.price').text(newPrice+ " ₽");
        minusButton.closest('.page-body').find('.total-price').text(newTotalPrice+" ₽");
    }
}
function plusQuantity(){
    let addButton = $(this);
    let cartQuantityField = addButton.closest('.quantity-td').find('.cart-quantity').text().trim();
    let oldPrice = addButton.closest('.table-another-row').find('.price').text().trim().split(" ")[0];
    let newVal = parseInt(cartQuantityField) + 1;
    addButton.closest('.quantity-td').find('.cart-quantity').text(newVal);
    let newPrice = parseFloat(oldPrice) / parseInt(cartQuantityField) * newVal;
    let oldTotalPrice = addButton.closest('.page-body').find('.total-price').text().trim().split(" ")[0];
    let newTotalPrice = parseFloat(oldTotalPrice) + parseFloat(oldPrice) / parseInt(cartQuantityField);
    addButton.closest('.table-another-row').find('.price').text(newPrice + " ₽");
    addButton.closest('.page-body').find('.total-price').text(newTotalPrice+" ₽");
}
$('.add-button').click(function(){
    let addProductButton = $(this);
    let productImageSrc = addProductButton.closest('.product-info').find('.product-image').attr('src');
    let productCost = addProductButton.closest('.product-info').find('.price').text().trim().split(" ")[0];
    let productName = addProductButton.closest('.product-info').find('.product-name').clone().children().remove().end().text().trim();

    let oldTotalPrice = addProductButton.closest('.page-body').find('.total-price').text().trim().split(" ")[0];
    let newTotalPrice = parseFloat(oldTotalPrice) + parseFloat(productCost);
    addProductButton.closest('.page-body').find('.total-price').text(newTotalPrice + " ₽");
    
    let newRow = document.getElementById("cloning-row").cloneNode(true);
    

    newRow.classList.remove("d-none");
    

    $(newRow.getElementsByClassName('plus')[0]).click(plusQuantity);
    $(newRow.getElementsByClassName('minus')[0]).click(minusQuantity);
    $(newRow.getElementsByClassName('remove')[0]).click(removeProduct);
    
    newRow.getElementsByClassName("img-fluid")[0].src = productImageSrc;
    newRow.getElementsByClassName("price")[0].innerHTML = productCost  + " ₽";
    newRow.getElementsByTagName('a')[0].innerHTML = productName;

    document.getElementsByClassName('table-body')[0].appendChild(newRow);
    
    
});
$('.complete-order').click(function(){
    let amountOfRows = $(this).closest('.container').find('.table-body tr').length;
    let modalTitle;
    let modalBody;
    if (amountOfRows == 1){
        modalTitle = $(this).closest('.page-body').find('#orderModalLabel').text("Ошибка оформления заказа");
        modalBody = $(this).closest('.page-body').find('.order-body').text("Ваша корзина пуста. Добавьте туда товар, чтобы совершить покупку");
        
    }
    else{
        modalTitle = $(this).closest('.page-body').find('#orderModalLabel').text("Заказ успешно оформлен");
        modalBody = $(this).closest('.page-body').find('.order-body').text("Спасибо за заказ!");
        
    }
});
