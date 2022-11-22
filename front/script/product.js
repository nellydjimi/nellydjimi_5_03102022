main()

function main () {
 buildProduct();
}

function buildProduct(){
    //extraire l'id contenu dans l'url
    var monPanier = JSON.parse(localStorage.getItem("monPanier"));
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');


    fetch("http://localhost:3000/api/products/" + id)
    .then(async (response) => {
        
        var canap = await response.json();
        console.log(canap);

        //comme sur index.js tu vas créer les éléments html et les insérer au bon endroit
        
        //balise title
        var title = document.querySelector('#title');
        title.innerText = canap.name;
        
        //balise price
        var price = document.querySelector('#price');
        price.innerText = canap.price;
        
        //balise description
        var description = document.querySelector('#description');
        description.innerText = canap.description;

        //balise colors
        var select = document.querySelector ('#colors');
        for (let i = 0; i < canap.colors.length ; i++) {
            var option = document.createElement ('option');
            option.innerText = canap.colors[i];
            option.value = canap.colors[i];
            select.appendChild(option);
        }

        //balise img
        var div = document.querySelector('.item__img');
        var img = document.createElement('img') ;
        img.src = canap.imageUrl ;
        img.alt = canap.altTxt ;
        div.appendChild(img);

        localStorage.setItem("monPanier", JSON.stringify(monPanier));
        //balise quantity
        //mettre en place une fonction pour ajouter le canapé au panier   
        var button = document.querySelector('#addToCart');
        button.addEventListener('click', () => addToCart(id))
    })
}

function addToCart (id){    
    const quantity = document.querySelector('#quantity').value;
    const  colors = document.querySelector('#colors').value;
    var myCanap = {
        id : id,
        quantity : Number(quantity),
        colors : colors,
    }  
    //console.log(myCanap)
    var monPanier = JSON.parse(localStorage.getItem("monPanier"))
    //console.log(monPanier)

    //le panier est vide
    if(monPanier == null){
        monPanier =[];
        monPanier.push(myCanap);
        localStorage.setItem("monPanier", JSON.stringify(monPanier));
        console.log(monPanier);
    }

    //il y a un produit dans le panier
    else {       
        let isCanapAlreadyInCart =  monPanier.find((canap) => canap.id === myCanap.id && canap.colors === myCanap.colors);
        if (isCanapAlreadyInCart !== undefined) {
            isCanapAlreadyInCart.quantity = Number(isCanapAlreadyInCart.quantity) + Number(myCanap.quantity);
        } else {
            monPanier.push(myCanap);
        }        
       localStorage.setItem("monPanier", JSON.stringify(monPanier)); 
    }
}



//produit enregistrer dans le local storage
        
//aucun produit enregistrer dans le local storage

    //chercher sur google "comment ajouter un evenement 'click' sur un element html"
    /* button.addEventListener('click').then =>({
        //qu'est-ce qu'on fait quand on a cliqué
        // créer un objet canapé qui contient l'id du canapé, la couleur, la quantité
        var myCanap = {
            id: canap._id,
            quantity: input.value,
            color: colors.selected
        }

        //ajouter cet objet au local storage
        if (mon panier existe) on fait quelque chose
        else on fait autre chose
        localStorage.setItem('monPanier', myCanap);
    })*/

    //et si on veut ajouter plusieurs canapé dans mon panier ?
    //>> si mon panier n'est pas vide, je ne dois pas le créer, je dois le récupérer et le mettre à jour{

   

