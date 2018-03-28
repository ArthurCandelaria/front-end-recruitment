function GetProdutos(callback)
{
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/public/data/products.json', true);
    request.onload = function() 
    {
        var data = JSON.parse(request.responseText);
        callback(data);
    };

    request.onerror = function() {
    };

    request.send();
}

function splitPrice(price)
{
    return { integer: parseInt(price), decimal: (price % 1).toFixed(2).substring(2) };
}

function installmentPrice(price, installments)
{
    return { price: price/installments }
}

function BuildProductItemHtml(produto)
{
    var prod_template = 
    '<li> \
    <a href="#" class="purchase" id="'+produto.id+'"> \
    <img src="./resources/products/'+produto.id+'.jpg" alt="produto-netshoes"> \
    <p class="titulo" id="titulo">'+produto.title+'</p> \
    <hr /> \
    <p class="preco-produto" id="preco-produto">'+produto.currencyFormat+' <span class="valor" id="valor">'+ splitPrice(produto.price).integer +'</span>,'+ splitPrice(produto.price).decimal +'</p> \
    <p class="preco-parcela" id="preco-parcela">ou <span>'+produto.installments+'</span> x R$ '+ installmentPrice(produto.price, produto.installments).price.toFixed(2) +'</p> \
    </a> \
    </li>'; 
    
    return prod_template;
}

var produtos = {};
function main()
{ 
    GetProdutos(function(data)
    {
        produtos = data.products;

        for (var i=0; i<data.products.length; i++)
        {
            var product = data.products[i];
            
            var html = BuildProductItemHtml(product);
            document.querySelector(".lista-produtos").innerHTML += html;

        } 
        loadBag();
    });
}

main();


// "id":
// "sku": 
// "title": 
// "description": 
// "availableSizes":
// "style": 
// "price":
// "installments": 
// "currencyId": 
// "currencyFormat": 
// "isFreeShipping":