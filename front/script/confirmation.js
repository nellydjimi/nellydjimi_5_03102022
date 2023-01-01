main ()
function main(){
    confirmation();
}
 //affichage du numero de suivis
function confirmation(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get('orderId');
    const orderId = document.getElementById('orderId');
    orderId.innerHTML = id;
    localStorage.clear();
}
