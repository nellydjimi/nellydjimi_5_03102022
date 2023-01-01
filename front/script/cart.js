main();

function main() {
    displayCart();
    form();
}

//affichez les produits dans la page panier 
function displayCart() {
    let monPanier = JSON.parse(localStorage.getItem('monPanier'));
    
    let numberOfCanap = 0;
    let priceTotal = 0;

    var section = document.querySelector('#cart__items');
    //ne pas multipliez les balises lorsqu'on augmente les quantité d'un article
    section.innerHTML = '';

    //boucle for
    for (let i = 0; i < monPanier.length; i++) {    
        //appel de l'API    
        fetch("http://localhost:3000/api/products/" + monPanier[i].id)
        .then(async (response) => {
            
            //affichage nombre d'article + total prix articles
            numberOfCanap = numberOfCanap + monPanier[i].quantity;
            var canap = await response.json();
            priceTotal = priceTotal + (canap.price * monPanier[i].quantity);
            
            //affichage balise article
            var sectionToBuild = document.querySelector('#cart__items');
            var article = document.createElement("article");
            article.setAttribute('data-id', canap.id);
            article.setAttribute('data-color', canap.color);
            section.appendChild(article);
            article.classList = 'cart__item';
    
            //affichage balise Img
            var divImg = document.createElement("div");
            divImg.classList = 'cart__item__img';
            var img = document.createElement("img");
            img.src = canap.imageUrl;
            img.alt = canap.altTxt;
    
            //affichage balise description
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
            inputQuantity.addEventListener("input", () => updateQuantity(inputQuantity, monPanier[i]));
    
            //affichage balise delete
            var divDelete = document.createElement("div");
            divDelete.classList = 'cart__item__content__settings__delete';
            var pDelete = document.createElement("p");
            pDelete.classList ='deleteItem';
            pDelete.innerText = "Supprimer";
            const deleteItem = document.querySelectorAll('.cart__item .deleteItem');
            
            pDelete.addEventListener("click", (event) => {
            //deleteCanap(pDelete,divDelete, monPanier[i]));
            event.preventDefault();
             // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
            let deleteId = monPanier[i].id;
            let deleteColor = monPanier[i].color;

            // filtrer l'élément cliqué par le bouton supprimer
             // en respectant les conditions du callback
            monPanier = monPanier.filter( elt => elt.id !== deleteId || elt.color !== deleteColor);
      
            // envoyer les nouvelles données dans le localStorage
            localStorage.setItem('monPanier', JSON.stringify(monPanier));

            // avertir de la suppression et recharger la page
            alert('Votre article va être supprimer du panier.');
            window.location.href = "cart.html";
            });
            
            //insertion des balises div p & image
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
            totalQuantity.innerText = numberOfCanap ;
            var totalPrice = document.querySelector('#totalPrice');
            totalPrice.innerText = priceTotal;  
        });  
    } 
}

//modification de la quantité 
function updateQuantity(input, canapToCheck) {
    let monPanier = JSON.parse(localStorage.getItem('monPanier'));
    console.log(input.value)
    //etre sur que le inputquantity correspond a l'input du canapé c=qu'onvient de mettre à jour
    
    let isCanapAlreadyInCart =  monPanier.find((canap) => canap.id === canapToCheck.id && canap.colors === canapToCheck.colors);
    if (isCanapAlreadyInCart !== undefined) {
        console.log(isCanapAlreadyInCart)
        isCanapAlreadyInCart.quantity = Number(input.value);
    }
    //console.log(monPanier)
    localStorage.setItem("monPanier", JSON.stringify(monPanier)); 
    displayCart();
}

       

//formulaire et information de l'utilisateur
function form(){
   
let monPanier = JSON.parse(localStorage.getItem('monPanier'));
const btnOrder = document.getElementById('order');

btnOrder.addEventListener("click", (event)=>{
    event.preventDefault();
    
    const contact = {
        firstName : document.getElementById('firstName').value,
        lastName : document.getElementById('lastName').value,
        address : document.getElementById('address').value,
        city : document.getElementById('city').value,
        email : document.getElementById('email').value,
    }

    //regExp formulaire
        let firstNameRegExp= new RegExp(/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/) ;
        let lastNameRegExp = new RegExp (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/);
        let addressRegExp = new RegExp (/^[a-zA-Z0-9\s\,\''\-]/);
        let cityRegExp = new RegExp (/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/);
        let emailRegExp = new RegExp (/^[^\s@]+@[^\s@]+\.[^\s@]+$/);


        let formIsCorrect = true ;
        

        //check firstName
        if (firstNameRegExp.test(contact.firstName)) { 
            firstNameErrorMsg.innerText = "";
            formIsCorrect = true;
        }
        else {
            formIsCorrect = false;
            console.log('false')
            let firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');
            firstNameErrorMsg.innerText = "Prénom invalide";
        }

        //check lastName
        console.log('check lastname')
        if (lastNameRegExp.test(contact.lastName)){ 
            lastNameErrorMsg.innerText = "";
            formIsCorrect = true;
        } 
        else {
            formIsCorrect = false;
            console.log('false')
            let lastNameErrorMsg = document.querySelector('#lastNameErrorMsg');
            lastNameErrorMsg.innerText = "Nom invalide";
        }

        //check address
        if (addressRegExp.test(contact.address)){ 
            addressErrorMsg.innerText = "";
            formIsCorrect = true;
        } 
        else {
            formIsCorrect = false;
            console.log('address incorrect')
            let addressErrorMsg = document.querySelector('#addressErrorMsg');
            addressErrorMsg.innerText = "Adresse invalide";
        }

        //check city
        if (cityRegExp.test(contact.city)) { 
            cityErrorMsg.innerText = "";
            formIsCorrect = true;
        } 
        else {
            formIsCorrect = false;
            let cityErrorMsg = document.querySelector('#cityErrorMsg');
            cityErrorMsg.innerText = "Ville invalide";
        }

        //check email
        console.log('mail : ', contact.email)
        if (emailRegExp.test(contact.email)) { 
            emailErrorMsg.innerText = "";
            formIsCorrect = true;
        } 
        else {
            formIsCorrect = false;
            console.log('mail incorrect');
            let emailErrorMsg = document.querySelector('#emailErrorMsg');
            emailErrorMsg.innerText = "Email invalide";
        }
        console.log('formIsCorrect', formIsCorrect)

        if (formIsCorrect) {

            //construire l'objet products
            let products = [];
            monPanier.forEach((canap, index) => {
            //faire le push autant de fois que le nombre quantity
            products.push(canap.id);
            });
            fetch("http://localhost:3000/api/products/order", { 
                method: "POST", 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({contact: contact, products: products})
                
            }).then(async (response) =>{
                //rediriger vers la page cofirmation.html 
                const POST_ORDER = await response.json();
                let orderId = POST_ORDER.orderId;
                console.log('reponse api : ', POST_ORDER)
                document.location.href = 'confirmation.html?orderId='+ orderId ;
            }) 
        }    
    })  
}


    
    









