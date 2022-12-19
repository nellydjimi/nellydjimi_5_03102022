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
            article.setAttribute('data-id', canap.id);
    article.setAttribute('data-color', canap.color);
    section.appendChild(article);
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
    console.log(deleteItem)
    for (let j = 0; j < deleteItem.length; j++) {
        deleteItem[j].addEventListener('click', (event) =>{
            event.preventDefault();
            console.log(event)
            let canapDeleteId = event.target.closest('article').getAttribute("data-id");
            let canapDeleteColor = event.target.closest('article').getAttribute("data-color");
            
            let monPanier = JSON.parse(localStorage.getItem('monPanier'));  
            let canapToDel = monPanier.find((monPanier) => monPanier.id === canapDeleteId && monPanier.color === canapDeleteColor);
            
            let result = monPanier.filter((monPanier) => monPanier.id !== canapDeleteId || monPanier.color !== canapDeleteColor);
            monPanier.canap = result;

            newQuantity = monPanier.totalQuantity - canapToDel.quantity;
            monPanier.totalQuantity = newQuantity;
            priceToDel = canapToDel.quantity * canapToDel.price;
            alert('Vous avez bien supprimé votre produit du panier !');

            if (monPanier.lenght == 0) {
                localStorage.clear();
                window.location.reload()
            } 
            else {
                localStorage.setItem("monPanier", JSON.stringify(monPanier));
                window.location.reload()
            }
        })
    };












     
   /* let monPanier = JSON.parse(localStorage.getItem('monPanier'));
    var divDelete = document.createElement("div");
    divDelete.classList = 'cart__item__content__settings__delete';
    var pDelete = document.createElement("p");
    pDelete.classList ='deleteItem';
    pDelete.innerText = "Supprimer";
    let deleteItem = document.querySelector('.deleteItem');
    
    deleteItem?.forEach((deleteItem)=>{
        deleteItem.addEventListener("click", (event)=>{
            event.preventDefault();
            const idDelete = event.target.getAttribute(canap.id);
            const colorDelete = event.target.getAttribute(canap.colors);

            monPanier = monPanier.filter( canap => canap.id !== idDelete || canap.colors !== colorDelete );
            console.log(monPanier);

            localStorage.setItem("monPanier", JSON.stringify(monPanier));
            location.reload();
            
        })
    })*/
}


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

        let firstNameRegExp= new RegExp(/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/) ;
        let lastNameRegExp = new RegExp (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/);
        let addressRegExp = new RegExp (/^[a-zA-Z0-9\s\,\''\-]*$/);
        let cityRegExp = new RegExp (/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/);
        let emailRegExp = new RegExp (/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

        let formIsCorrect = true ;
        
        console.log('check firstname')
        //check firstName
        if (firstNameRegExp.test(contact.firstName)) { 
            console.log('true')
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
            console.log('true')
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
            console.log('adress corrct')
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
            console.log('mail correct');
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


    
    









