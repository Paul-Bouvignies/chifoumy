/*
init service worker pour pwa
*/
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("../sw.js").then(registration => {
        console.log("sw registered :");
        console.log(registration);
    }).catch(error => {
        console.log("sw registration failed ! ");
        console.log(error);
    })
}


/* 
reset local storage
*/
document.getElementById("h1").addEventListener("click" , function(){
    localStorage.clear();
})

/*
ouverture des consignes
*/
document.querySelector("#footer").addEventListener("click" , function(){
    this.classList.toggle("open")
})
//


/* 
Récupérer la valeur du localstorage
*/
    var connectedUser = localStorage.getItem('user-name');
    var userScore = localStorage.getItem('user-score');
    var computerScore = localStorage.getItem('computer-score');
//


/* 
Créer une fonction pour capter le "submit" du formulaire
*/
    var saveUserPseudo = function(){
        // Déclarer les variables
        var myForm = document.querySelector('#home form');
        var myInput = document.querySelector('#home input');

        // Capter l'événement "submit" du formulaire
        myForm.addEventListener('submit', function(event){
            // Bloquer le comportement par défaut du formulaire
            event.preventDefault();

            // Récupérer la valeur de l'input
            var newPseudo = myInput.value;

            // Stocker la valeur de l'input en LocalStorage
            localStorage.setItem('user-name', newPseudo);

            // Afficher le pseudo de l'internaute
            document.querySelector('#userPseudo').innerHTML = newPseudo;

            // lancer la fonction du jeu
            startGame();
        });
    };
//


/* 
Créer une fonnction pour le jeu
*/
    var startGame = function(){

        //  Ajouter la classe hidden à la balise #home
        document.querySelector('#home').classList.add('hidden');

        // Supprimer la class hidden de la balise #game
        document.querySelector('#game').classList.remove('hidden');

        // Déclarer une variable contenant les boutons du jeu
        var gameBtn = document.querySelectorAll('#gamePlay button');
        
        // Faire une bouucle sur le tableau de boutons
        for( let btn of gameBtn ){
            // Capter l'événement "click" sur les boutons
            btn.addEventListener('click', function(){
                // Fairre jouer l'orrinateur
                var computerChoice = computerBet();

                // Calculer le résultat
                getResult(btn.getAttribute('data-game'), computerChoice);
            });
        };
    };
//

/* 
Créer  une fonction pour le choix de l'ordinateur
*/
    var computerBet = function() {
        // Déclarer un  tableau contenant les trois choix possibles
        var choices = ['pierre', 'feuille', 'ciseaux'];

        // Définir  un nombre aléatoire
        var randomValue = Math.floor( Math.random() *  choices.length );

        // Renvoyer la valeur aléatoire
        return choices[randomValue];
    };
//

/* 
Créer une fonction pour caclculer le résultat
*/
    var getResult = function( userChoice, computerChoice ){
        // Désactiver les boutons
        for( let btn of document.querySelectorAll('#gamePlay button') ){
            btn.disabled = true;
        };
        document.getElementById("gamePlay").style.opacity = '.4';


        // Récupérer les scores depuis le localStorage
        var scoreUser =  localStorage.getItem('user-score');
        var scoreComputer = localStorage.getItem('computer-score');

        //  Comparer les choix
        if( userChoice === computerChoice ){
            document.querySelector('#computerGame').innerHTML = '<p>Egalité</p>';
        }
        else if( userChoice === 'pierre' && computerChoice === 'ciseaux' ){
            document.querySelector('#computerGame').innerHTML = '<p class="win">Gagné !</p>';

            // Ajouter 1 à scoreUser
            scoreUser = +scoreUser + 1;
        }
        else if( userChoice === 'feuille' && computerChoice === 'pierre' ){
            document.querySelector('#computerGame').innerHTML = '<p class="win">Gagné !</p>';

            // Ajouter 1 à scoreUser
            scoreUser = +scoreUser + 1;
        }
        else if( userChoice === 'ciseaux' && computerChoice === 'feuille' ){
            document.querySelector('#computerGame').innerHTML = '<p class="win">Gagné !</p>';

            // Ajouter 1 à scoreUser
            scoreUser = +scoreUser + 1;
        }
        else{
            document.querySelector('#computerGame').innerHTML = '<p class="lose">Perdu...</p>';

            console.log('perdu')

            // Ajouter 1 à scoreComputer
            scoreComputer = +scoreComputer + 1;
        };

        // Afficher lee choix de l'orinateur dans #computerGame
        document.querySelector('#computerGame').innerHTML += `
        <div id="result">
            <div>
                <img src="./img/${userChoice}.png" alt="${userChoice}">
            </div>
            <div>
                <img src="./img/${computerChoice}.png" alt="${computerChoice}">
            </div>
        </div>
        `;

        // Mettre à jour les scores en localStorage
        localStorage.setItem('user-score', scoreUser);
        localStorage.setItem('computer-score', scoreComputer);

        // Mettre à jour les scores dans la page HTML
        document.querySelector('#humanScore').innerHTML = scoreUser;
        document.querySelector('#machinScore').innerHTML =  scoreComputer;

        // Ajouter un bouton pour rejouer
        document.querySelector('#computerGame').innerHTML += '<button id="playAgain">Rejouer</button>';

        //  Capter le click sur le bouton #playAgain
        document.querySelector('#playAgain').addEventListener('click', function(){

            document.getElementById("gamePlay").style.opacity = '1';

            // Supprimer le choix de l'ordinateur
            document.querySelector('#computerGame').innerHTML = '';

            // Résactiver les boutons
            for( let btn of document.querySelectorAll('#gamePlay button') ){
                btn.disabled = false;
            };
        });
    };
//

/* 
Lancer l'interface
*/
    // vérifier la  valeur du localStorage
    if( connectedUser === null  || userScore === null || computerScore === null ){
        // Lancer la fonction du formulaire
        saveUserPseudo();

        //  Initialiser les  score
        localStorage.setItem('user-score', 0);
        localStorage.setItem('computer-score', 0);
    }
    else{
        // lancer la fonction du jeu
        startGame();

        // Afficher le pseudo de l'internaute
        document.querySelector('#userPseudo').innerHTML = connectedUser;

        // Mettre à jour les scores dans la page HTML
        document.querySelector('#humanScore').innerHTML = localStorage.getItem('user-score');
        document.querySelector('#machinScore').innerHTML = localStorage.getItem('computer-score');
    };
