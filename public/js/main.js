// LES INFOS 
const statut = document.querySelector("h2")
let jeuActif = true
let joueurActif = "X"
let etatJeu = ["", "", "", "", "", "", "", "", ""]

// LES CAS DE VICTOIRE
const conditionsVictoire = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// GAIN - EGALITÉ ET TOUR DU JOUEUR
const gagne = () => `JOUEUR ${joueurActif} A GAGNÉ !`
const egalite = () => "MATCH NUL !"
const tourJoueur = () => `AU TOUR DE ${joueurActif}`

// AFFICHER LE JOUEUR 
statut.innerHTML = tourJoueur()
document.querySelectorAll(".case").forEach(cell => cell.addEventListener("click", gestionClicCase))
document.querySelector("#recommencer").addEventListener("click", recommencer)

//CLIC SUR LES CASES 
function gestionClicCase(){
    const indexCase = parseInt(this.dataset.index)
    
    //CASE REMPLI OU JEU TERMINÉ
    if(etatJeu[indexCase] !== "" || !jeuActif){
        return
    } 
    // SYMBOLE DU JOUEUR
    etatJeu[indexCase] = joueurActif
    this.innerHTML = joueurActif
    // SI GAGNE
    verifGagne()
} 
// FONCTION SI LE JOUEUR GAGNE AVEC LES CONDITIONS

function verifGagne(){
    let tourGagnant = false
    for(let conditionVictoire of conditionsVictoire){
        let val1 = etatJeu[conditionVictoire[0]]
        let val2 = etatJeu[conditionVictoire[1]]
        let val3 = etatJeu[conditionVictoire[2]]

        // SI CASE VIDE
        if(val1 === "" || val2 === "" || val3 === ""){
            continue
        }
        // SI CASE IDENTIQUES
        if(val1 === val2 && val2 === val3){
            // ON EST VAINQUEUR
            tourGagnant = true
            break
        }
    }
    // LORSQU4ON GAGNE
    if(tourGagnant){
        statut.innerHTML = gagne()
        jeuActif = false
        return
    }

    // BOUCLE SI CASES REMPLIES
    if(!etatJeu.includes("")){
        statut.innerHTML = egalite()
        jeuActif = false
        return
    }

    // CHANGER DE JOUEUR
    joueurActif = joueurActif === "X" ? "O" : "X"
    statut.innerHTML = tourJoueur()
}
// POUR RENITIALISER
 
function recommencer(){
    joueurActif = "X"
    jeuActif = true
    etatJeu = ["", "", "", "", "", "", "", "", ""]
    statut.innerHTML = tourJoueur()
    document.querySelectorAll(".case").forEach(cell => cell.innerHTML = "")
}