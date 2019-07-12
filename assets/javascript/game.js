var selectableSongs = [
    "iswear", 
    "pokerface",
    "boomboompow", 
    "putitdown",
    "try",  
    "wrestler", 
    "bullying", 
        ];
            
var winCount = 0;
var guessLeft = 9; //Check for lose
var currentSongIndex; //Index of current song in selectableSongs list
var guessedLetters = [];
var answerArray = []; //Song user is trying to guess (to match current song index)
var remainingLetters; //Keep track of how many letters left to be guess --> //|| Check for win

var gameFinished = false; //flag to 'press any key to start again!'

reset();

//Function to set variables when start/restart the game
function reset() {
    guessLeft = 9;
    guessedLetters = [];

    //Generate a random song index for user to guess
    currentSongIndex = selectableSongs[Math.floor(Math.random()*selectableSongs.length)];
    console.log("Current song to guess: " + currentSongIndex);

    //Create an empty array and fill with "_" to match the numbers of letters in the song
    answerArray = [];
    for (var i=0; i<currentSongIndex.length; i++){
            answerArray[i] = "_ "; //add space after underscore to separate the letters on display
    }
    //Keep track of how many letters left to guess --> //|| Check for win
    remainingLetters = currentSongIndex.length; 
    
    //Hide gameover and win image
    document.querySelector("#gameover-image").style.display = "none";
    document.querySelector("#pressKeyTryAgain").style.display = "none";

    //Hide all song videos
    document.querySelector("#iSwear").style.display = "none";
    document.querySelector("#pokerFace").style.display = "none";
    document.querySelector("#boomPow").style.display = "none";
    document.querySelector("#putItDown").style.display = "none";
    document.querySelector("#try").style.display = "none";
    document.querySelector("#wrestler").style.display = "none";
    document.querySelector("#bullying").style.display = "none";
 
    //Stop all videos from playing with currentTime and pause()
    //!There should be a better way to do this
    document.querySelector("#iswear").currentTime = 0; 
    document.querySelector("#pokerFace").currentTime = 0; 
    document.querySelector("#boomPow").currentTime = 0; 
    document.querySelector("#putItDown").currentTime = 0; 
    document.querySelector("#try").currentTime = 0; 
    document.querySelector("#wrestler").currentTime = 0; 
    document.querySelector("#bullying").currentTime = 0; 

        document.querySelector("#iswear").pause(); 
        document.querySelector("#pokerFace").pause(); 
        document.querySelector("#boomPow").pause(); 
        document.querySelector("#putItDown").pause(); 
        document.querySelector("#try").pause(); 
        document.querySelector("#wrestler").pause(); 
        document.querySelector("#bullying").pause(); 
    
    //Update HTML display
    updateDisplay();
}


//function to update display on HTML page
function updateDisplay(){
    document.querySelector(".totalWins").innerText = winCount;
    document.querySelector(".currentSong").innerText = answerArray.join("");
    document.querySelector(".remainingGuesses").innerHTML = guessLeft;
    document.querySelector(".guessedLetters").innerHTML = guessedLetters;
}


//Capture user's pressed key and store it into userInput
document.onkeyup = function(event) {
    var userInput = event.key;
    console.log (userInput);

    if (gameFinished) {
        //If game has finised, reset the game
        reset();
        gameFinished = false;
    }else{
        if (currentSongIndex.indexOf(userInput) > -1) {
            //If user's pressed key is in the song, run correctGuess function
            correctGuess(userInput);
        }else{
            //If user's pressed key is NOT in the song, run incorrectGuess function
            incorrectGuess(userInput);
        }
    }
}

//Evaluate the incorrectGuess
function incorrectGuess(userInput){
    if (guessedLetters.indexOf(userInput) < 0){
        //If the incorrect pressed key has NOT beed added to the guessLetters list yet, add it.
        //This is to prevent choosing the same incorrect key twice
        guessedLetters.push(userInput);
        guessLeft--;
        updateDisplay();
        if (guessLeft === 0){
            //If guessLeft is 0, user loses, game is finished
            document.querySelector("#gameover-image").style.display = "block";
            document.querySelector("#pressKeyTryAgain").style.display = "block";
            

            gameFinished = true;
        }
    }
}


//Evaluate correct guess
function correctGuess(userInput){
    //If the correct pressed key has NOT been added to the answerArray, add it.
    if (answerArray.indexOf(userInput) < 0){
    for (var j=0; j<currentSongIndex.length; j++){
        if (currentSongIndex[j] === userInput) {
            answerArray[j] = userInput;
            updateDisplay();
            remainingLetters--; //check for win
            if (remainingLetters === 0){
                //User wins, play the related video and update display on html
                if (selectableSongs[0] === currentSongIndex){
            document.querySelector("#iSwear").style.display = "block";
            document.querySelector("#iSwear").play();
                } else if (selectableSongs[1] === currentSongIndex){
            document.querySelector("#pokerFace").style.display = "block";
            document.querySelector("#pokerFace").play();
                } else if (selectableSongs[2] === currentSongIndex){
            document.querySelector("#boomPow").style.display = "block";
            document.querySelector("#boomPow").play();
                } else if (selectableSongs[3] === currentSongIndex){
            document.querySelector("#putItDown").style.display = "block";
            document.querySelector("#putItDown").play();
                } else if (selectableSongs[4] === currentSongIndex){
            document.querySelector("#try").style.display = "block";
            document.querySelector("#try").play();
                } else if (selectableSongs[5] === currentSongIndex){
            document.querySelector("#wrestler").style.display = "block";
            document.querySelector("#wrestler").play();
                } else {
            document.querySelector("#bullying").style.display = "block";
            document.querySelector("#bullying").play();
                }

    winCount++;
    updateDisplay();
    document.querySelector("#pressKeyTryAgain").style.display = "block";
    gameFinished = true;
}
}   
    }
}
}

