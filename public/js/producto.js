window.addEventListener('load',function(){

    var numDeComrpas=0;

    //var compras= [];
    
    var compras = JSON.parse(localStorage.getItem('compras'));
    if(compras == null){
        compras = [];
    }

    function shoppingBag__render(){
        compras.forEach(function(elem){ 
            numDeCompras += parseInt(elem.precio);
        });
    }

    shoppingBag__render()

    document.querySelector('.agregar').addEventListener('click', function(element){
        element.preventDefault();
        var url = '/producto/addtocart?name='+this.getAttribute('data-name');
        fetch(url,{
            method: 'GET',
        })
        .then(res => res.json())
        .catch(err => console.log(err))
        .then(function(res){
            compras.push(res);
            localStorage.setItem('compras', JSON.stringify(compras));
            shoppingBag__render();
            console.log('////////////////////////////// ARREGLO COMPRAS ////////////////////////////');
            console.log(compras);
        });
    });

});