$('.subscribe-button').click(function(){
    const regex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
    let modalTitle;
    let modalBody;
    if ( regex.test($("#newsletter1").val()) ){
        modalTitle = $(this).closest('.page-body').find('#orderModalLabel').text("Рассылка успешно прикреплена");
        modalBody = $(this).closest('.page-body').find('.order-body').text("Спасибо, что подписались на новости.");
    }
    else{
        modalTitle = $(this).closest('.page-body').find('#orderModalLabel').text("Некорректная почта");
        modalBody = $(this).closest('.page-body').find('.order-body').text("Вы ввели некорректную почту. Пожалуйста, повторите попытку.");
    }

});