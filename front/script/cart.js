main();

function main() {
    displayCart();
    form();
    deleteCanap();
}

function displayCart() {
    let monPanier = JSON.parse(localStorage.getItem('monPanier'));
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
    let monPanier = JSON.parse(localStorage.getItem('monPanier'));
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


function deleteCanap() {
    let deleteItem = document.querySelectorAll('.deleteItem');
    let monPanier = JSON.parse(localStorage.getItem('monPanier'));
    
    for (let k = 0; k < deleteItem.length; k++){
        deleteItem[k].addEventListener("click" , (event) => {
            event.preventDefault();

            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = monPanier[i].id;
            let colorDelete = monPanier[i].colors;

            monPanier = monPanier.filter( let => let.id !== idDelete || let.colors !== colorDelete );
            
            localStorage.setItem("monPanier", JSON.stringify(monPanier));
            
            //Alerte produit supprimé et refresh
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
            
        })
    }
    }



function form(){
   const orderForm = document.querySelector('.cart__order__form');

    
    const btnOrder = document.querySelector('#order');
    btnOrder.addEventListener('click', (event)=> {
        event.preventDefault();
        console.log('order');
        //RegExp
        let firstNameRegExp= new RegExp(/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/) ;
        let lastNameRegExp = new RegExp (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/);
        let addressRegExp = new RegExp (/^[a-zA-Z0-9\s\,\''\-]*$/);
        let cityRegExp = new RegExp (/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/);
        let emailRegExp = new RegExp (/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

//recupère id formulaire
        const customer = {
            firstName : document.getElementById('firstName').value,
            lastName : document.getElementById('lastName').value,
            address : document.getElementById('address').value,
            city : document.getElementById('city').value,
            email : document.getElementById('email').value,
        }

        console.log('customer :', customer)
        const canapsId = [];
        
        JSON.parse(localStorage.getItem('monPanier')).forEach((canap) => {
            canapsId.push(canap.id);
        });

        let formIsCorrect = true;
        //check firstName
        if (firstNameRegExp.test(customer.firstName) === formIsCorrect) { 
            return true;
        } 
        else {
            let firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');
            firstNameErrorMsg.innerText = "Prénom invalide";
        }

        //check lastName
        if (lastNameRegExp.test(customer.lastName)=== formIsCorrect) { 
            return true;
        } else {
            let lastNameErrorMsg = document.querySelector('#lastNameErrorMsg');
            lastNameErrorMsg.innerText = "Nom invalide";
        }

        //check address
        if (addressRegExp.test(customer.address)=== formIsCorrect ) { 
            return true;
        } else {
            let addressErrorMsg = document.querySelector('#addressErrorMsg');
            addressErrorMsg.innerText = "Adresse invalide";
        }

        //check city
        if (cityRegExp.test(customer.city)=== formIsCorrect) { 
            return true;
        } else {
            let cityErrorMsg = document.querySelector('#cityErrorMsg');
            cityErrorMsg.innerText = "Ville invalide";
        }

        //check email
        if (emailRegExp.test(customer.email)=== formIsCorrect) { 
            return true ;
        } else {
            let emailErrorMsg = document.querySelector('#emailErrorMsg');
            emailErrorMsg.innerText = "Email invalide"; 
        }


        if (formIsCorrect === true) {
            fetch("http://localhost:3000/api/products/order", { 
                method: "POST", 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({contact: customer, products: canapsId})
            }).then( (response) =>{
                
            
            })
            //rediriger vers la page cofirmation.html
        }
    })
    
}








