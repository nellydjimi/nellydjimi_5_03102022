main();

function main() {
    displayCart();
    form();
}

function displayCart() {
    const monPanier = JSON.parse(localStorage.getItem('monPanier'));
    //boucle for
    let numberOfCanap = 0;
    let priceTotal = 0;

    var section = document.querySelector('#cart__items');
    section.innerHTML = '';

    for (let i = 0; i < monPanier.length; i++) {    
        //appel de l'API    
        fetch("http://localhost:3000/api/products/" + monPanier[i].id)
        .then(async (response) => {
            numberOfCanap = numberOfCanap + monPanier[i].quantity;
            var sectionToBuild = document.querySelector('#cart__items');
            console.log('info du localStorage : ', monPanier[i])
            var canap = await response.json();
            priceTotal = priceTotal + (canap.price * monPanier[i].quantity);
            console.log('info de lapi : ', canap);
            
            //balise article
            var article = document.createElement("article");
            article.classList = 'cart__item';
    
            //balise Img
            var divImg = document.createElement("div");
            divImg.classList = 'cart__item__img';
            var img = document.createElement("img");
            img.src = canap.imageUrl;
            img.alt = canap.altTxt;
    
            //balise description
            var divContent = document.createElement("div");
            divContent.classList = 'cart__item__content';
            var divDescription = document.createElement("div");
            divDescription.classList ='cart__item__content__description'
            var h2 = document.createElement("h2");
            h2.innerText = canap.name;
            var pColor = document.createElement("p");
            pColor.innerText = monPanier[i].colors;
            var pPrice = document.createElement("p");
            pPrice.innerText = (canap.price * monPanier[i].quantity) + " €" ;
    
            //balise settings/quantity
            var divSettings = document.createElement("div");
            divSettings.classList ='cart__item__content__settings';
            var divQuantity = document.createElement("div");
            divQuantity.classList = 'cart__item__content__settings__quantity';
            var pQuantity = document.createElement("p");
            pQuantity.innerText = "Qté : ";
            var inputQuantity = document.createElement("input");
            inputQuantity.classList ='itemQuantity';
            inputQuantity.type = 'number';
            inputQuantity.name = "itemQuantity";
            inputQuantity.min = '1';
            inputQuantity.max = '100';
            inputQuantity.value = monPanier[i].quantity ;
            var input = document.querySelector('input[name="itemQuantity"]');
            inputQuantity.addEventListener("change", () => updateQuantity(monPanier[i]));
    
            //balise delete
            var divDelete = document.createElement("div");
            divDelete.classList = 'cart__item__content__settings__delete';
            var pDelete = document.createElement("p");
            pDelete.classList ='deleteItem';
            pDelete.innerText = "Supprimer";
    
            //
            sectionToBuild.appendChild(article);      
            article.appendChild(divImg);
            article.appendChild(divDescription);
            article.appendChild(divContent);
            article.appendChild(divSettings);
    
            divImg.appendChild(img);
    
            divDescription.appendChild(divContent);
            divDescription.appendChild(divSettings);
    
            divContent.appendChild(h2);
            divContent.appendChild(pColor);
            divContent.appendChild(pPrice);
    
            divSettings.appendChild(pQuantity);
            divSettings.appendChild(divQuantity);
            divSettings.appendChild(inputQuantity);
            divSettings.appendChild(divDelete);
            divDelete.appendChild(pDelete);
    
            divQuantity.appendChild(pQuantity);
            divQuantity.appendChild(inputQuantity);
    
            //construire tous les noeuds HTML comme sur la page index
            //ATTENTION: le prix que tu veux affiché n'est pas le prix d'un canapé, mais d'un canapé multiplié par la quantité
    
    
            //quantity
            var totalQuantity = document.querySelector('#totalQuantity');
            console.log(priceTotal)
            totalQuantity.innerText = numberOfCanap ;
            var totalPrice = document.querySelector('#totalPrice');
            totalPrice.innerText = priceTotal;
            
        });
        
    } 
}


function updateQuantity(canapToCheck) {
    const monPanier = JSON.parse(localStorage.getItem('monPanier'));
    var inputQuantity = document.querySelector(".itemQuantity");
    console.log(inputQuantity);
    console.log('test', inputQuantity.value);
    let isCanapAlreadyInCart =  monPanier.find((canap) => canap.id === canapToCheck.id && canap.colors === canapToCheck.colors);
    if (isCanapAlreadyInCart !== undefined) {
        isCanapAlreadyInCart.quantity = Number(inputQuantity.value);
    }
    localStorage.setItem("monPanier", JSON.stringify(monPanier)); 
    displayCart();
}

function form(){

    const order = document.querySelector('#order');
    order.addEventListener('click', (e)=> {
        console.log('order');
        const customer = {
            firstName : document.getElementById('firstName').value,
            lastName : document.getElementById('lastName').value,
            adress : document.getElementById('address').value,
            city : document.getElementById('city').value,
            email : document.getElementById('email').value,
        }
        console.log('customer :', customer)
        fetch("http://localhost:3000/api/order", { method: "POST", body: JSON.stringify({contact: customer, products: JSON.parse(localStorage.getItem('monPanier'))})});
    })
/*
    order.addEventListener('click', (event)=>{
    console.log('test');
    //recupère id formulaire
    const customer ={
    firstName : document.getElementById('firstName').type,
    lastName : document.getElementById('lastName').type,
    adress : document.getElementById('adress').type,
    city : document.getElementById('city').type,
    email : document.getElementById('email').type,
    }

    //validation firstName

    function checkFirstName (){
    if (firstName = customer.type ){
        return true
    }
    else{
        let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
        alert ('Prenom non valide');
    }}
    //validation lastName
function checkLastName(){
    if (lastName = customer.type  ){
        return true
    }
    else{
        let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
       alert ('Nom non valide') ;
    }}

    //validation adress
    function checkAdress(){
    if (adressName = customer.type  ){
        return true
    }
    else{
        let adressErrorMsg = document.getElementById('adressErrorMsg');
       alert ('Adresse non valide');
    }}

    //validation city
    function checkCity(){
    if (city = customer.type ){
        return true
    }
    else{
        let cityErrorMsg = document.getElementById('cityErrorMsg');
       alert('Ville non valide') ;
    }}

    //validation email
    function checkEmail(){
    if (email = customer.type  ){
        return true
    }
    else{
       let emailErrorMsg = document.getElementById('emailErrorMsg');
       alert ('Adresse mail non conforme');
    }}
    
})*/

    
}

  
  
    
   

   
    
   

    
   

   
    
   
   










/*function delete (){
const deleteArticle = document.querSelector(".deleteItem");
deleteArticle.forEach ((p) =>{
    p.addEvenListener ( 'click', e=>{
        deleteItem (e, items)
    
    )}
}

function deleteItem (e){
    let items =
localstorage.setItems( JSON.stringify(items))
if (item.lenght == 0){
    localStorage.removeItems
}








}*/