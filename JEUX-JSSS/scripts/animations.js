// // ici on construit un array avec tous les .fromTop
// // resultat: title = [node, node, ...]
//
// let title = document.querySelector('.fromTop');
// console.log(title)
// // Ici on enlève la class fromTop pour lancer l'animation
// function animateFromTop(element){
//     setTimeout(function(){
//         el.classList.remove('.fromTop');
//     }, 1500);
// };
//
// // ici on lance l'animation pour chaque element à animer
// title.forEach(function(element){
//     animateFromTop(element);
// });

const titre = document.querySelector('h1')
titre.style.position = 'absolute'

let topPos = -300

let direction = 1;

function hautBas(){
    if (topPos == 70){
        direction = 0
    }
     if (topPos == -50){
        direction = 1
    }
    topPos += 5 * direction;
    titre.style.top = `${topPos}px`;
    requestAnimationFrame(hautBas);
}

requestAnimationFrame(hautBas);
