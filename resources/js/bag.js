function loadBag (){

    var elementos = document.querySelectorAll(".purchase");

    for(var i = 0; i < elementos.length; i++)
    {
        var elemento = elementos[i];
        elemento.addEventListener("click", function(event){
            event.preventDefault();

            var idProduto = this.getAttribute("id");
            var produto = produtos[idProduto];

            var html = BuildProductItemHtmlInBag(produto);
            document.querySelector(".itens-sacola").innerHTML += html;

            var produtosRemoveBag = document.querySelectorAll(".fechar-negativo");

            var Listener = function(event){
                event.preventDefault();
    
                this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
    
                calculaValorProdutos();
                calculaValorParcela();
            }

            for(var i = 0; i < produtosRemoveBag.length; i++)
                {
                    var produtoRemoveBag = produtosRemoveBag[i];

                    

                    produtoRemoveBag.removeEventListener("click",Listener );
                    produtoRemoveBag.addEventListener("click",Listener );
                }

            calculaValorProdutos();
            calculaValorParcela();

        });
    }
    
}

function BuildProductItemHtmlInBag(produto)
{
    var prod_template = 
    '<li>\
    <div class="container-produto" id="'+produto.id+'">\
        <div class="produto-wrapper">\
            <img class="img-produto-sacola" src="./resources/products/'+produto.id+'.jpg" alt="produto-netshoes"> \
        </div>\
        <p class="titulo-sacola">'+produto.title+'</p>\
        <p><span class="tamanho">'+produto.availableSizes+'</span> | <span class="descicao">'+produto.description+'</span></p>\
        <p class="qtde-produto">Quantidade: <span>1</span></p>\
        <p class="preco-sacola">R$ <span class="valor-sacola">'+ splitPrice(produto.price).integer +','+ splitPrice(produto.price).decimal +'</span></p>\
        <img class="fechar-negativo" src="./resources/images/fechar-negativo.png"\
        onmouseover="this.src=\'./resources/images/fechar.png\'"\
        onmouseout="this.src=\'./resources/images/fechar-negativo.png\'">\
    </div>\
</li>'; 
    
    return prod_template;
}

var subTotal = document.querySelector(".valor-total");

function calculaValorProdutos(){
   
    var produtosInBag = document.querySelectorAll("li .container-produto");

    var carrinhos = document.querySelectorAll(".carrinho");
    for(var i=0; i<carrinhos.length; i++)
    {
        var carrinho = carrinhos[i];
        carrinho.innerHTML =  produtosInBag.length;
    }

    total = 0;
    for(var i = 0; i<produtosInBag.length; i++)
    {
        var produtoInBag = produtosInBag[i];
        var price =  produtos[produtoInBag.getAttribute("id")].price;
        total = (total + price);
    }

    document.querySelector("#price-total").innerHTML =  total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

function calculaValorParcela(){

    var produtosInBag = document.querySelectorAll("li .container-produto");
    
    var qtdeParcelas = 0;
    for(var i = 0; i<produtosInBag.length; i++)
    {
        var produtoInBag = produtosInBag[i];
        var installments =  produtos[produtoInBag.getAttribute("id")].installments;
        var qtdeParcelas = (qtdeParcelas + installments);
    }

    document.querySelector("#qtde-total-parcela").innerHTML =  qtdeParcelas;
    document.querySelector("#valor-total-parcela").innerHTML =  (total/qtdeParcelas).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    
 }