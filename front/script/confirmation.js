main ()
function main(){
    confirmation();
}
 
function confirmation(){
    //creer puis retourner un nouvel URL
    const params = new URLSearchParams(window.location.search);
    //recupere données grace a la methode get
    const id = params.get('orderId');
    //affichage du numero de suivis
    const orderId = document.getElementById('orderId');
    orderId.innerHTML = id;
    //localStorage.clear();
}
