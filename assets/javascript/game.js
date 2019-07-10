

var selectableSongs = ["california love",
            "i swear",
            "poker face",
            "dreidel dreidel dreidel",
            "what what",
            "lonely jew",
            "boom boom pow","unfulfill",
            "give life a try",
            "put it down",
            "do what you gonna do",
            "waterpark",
            "heat of the moment",
            "fingerbang",
            "where do i begin",
            "faith hilling",
            "sixteen tons",
            "everyone is special",
            "fighting love",
            "bullying"];
            
var winCount = 0;
var guessLeft = 9;
var currentSongIndex; //Index of current song in the array
var guessedLetters = [];
var guessingSong = ""; //Song user is trying to guess (to match current song index)
var remainingLetters; //Keep track of how many letters left to be guess --> //|| Check for win

var gameStarted = false; //flag to tell game has started
var gameFinished = false; //flag to 'press any key to start again!'


reset();

//function to set variables when restart the game
function reset() {
    guessLeft = 9;
    guessedLetters = [];
    guessingSong = "";
    gameStarted = false;

    //Computer picks random song index for user to guess
    currentSongIndex = selectableSongs[Math.floor(Math.random()*selectableSongs.length)];
    console.log("Current song to guess: " + currentSongIndex);

    //Keep track of how many letters left to guess --> //|| Check for win
    remainingLetters = currentSongIndex.length; 
    
    //Hide gameover and win image
    document.querySelector("#gameover-image").style.display = "none";
    document.querySelector("#pressKeyTryAgain").style.display = "none";

    //update HTML display
    updateDisplay();
}


//function to update display on HTML page
function updateDisplay(){
    document.querySelector(".totalWins").innerText = winCount;
    document.querySelector(".currentSong").innerText = guessingSong;
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
        if (guessLeft == 0){
            //If guessLeft is 0, user loses
            document.querySelector("#gameover-image").style.display = "block";
            document.querySelector("#pressKeyTryAgain").style.display = "block";
            gameFinished = true;
        }
    }
}


//evaluate correct guess
function correctGuess(userInput){
    if (guessingSong.indexOf(userInput) < 0){
    for (var i=0; i<currentSongIndex.length; i++){
        if (userInput.includes(currentSongIndex[i])) {
            guessingSong += currentSongIndex[i];
            updateDisplay();
            remainingLetters--;
            if (remainingLetters == 0){
                document.querySelector("#youwin-image").style.display = "block";
                document.querySelector("#pressKeyTryAgain").style.display = "block";
                gameFinished = true;
            }
        }
    }
}   
}




