fetch("http://localhost:3000/api/products")
.then(async (response) => {
    var allCanap = await response.json();
    var section = document.querySelector('#items');
    console.log(allCanap);
    
    //boucle qui parcourt tous 
    //les canapés pour construire l'élément html
    for (let i = 0; i < allCanap.length ; i++) {
        //balise a
        var a = document.createElement('a');
        a.href = 'product.html?id=' + allCanap[i]._id;
        //balise article
        var article = document.createElement('article');
        //balise p
        var p = document.createElement('p');
        p.className = 'productDescription';
        p.innerText = allCanap[i].description;
        //balise h3
        var h3 = document.createElement('h3') ;
        h3.className = 'productName';
        h3.innerText = allCanap[i].name;
        //balise img
        var img = document.createElement('img');
        img.src = allCanap[i].imageUrl;
        img.alt = allCanap[i].altTxt;

        //on assemble les éléments
        a.appendChild(article);    
        article.appendChild(img); 
        article.appendChild(h3);   
        article.appendChild(p);
        section.appendChild(a); 
    }
})


  
