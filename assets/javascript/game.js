//? var vs. let vs. const
    //* var is function scoped, let & const are blocked scoped (inside curly bracket)
    //* Redeclare var inside block will also redeclare var outside block (hoisting) -> problem!
        //~ should use let to declare variable inside block
    //* var & let can be re-assigned, const cannot
        //~ should use const unless you know variable gonna change
        //~ const let whoever read your code know that this variable shouldn't change (stay constant)

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
var guessingSong = []; //Song user is trying to guess (to match current song index)
var remainingLetters; //Keep track of how many letters left to be guessed --> //|| Check for win

var gameStarted = false; //flag to tell game has started
var gameFinished = false; //flag to 'press any key to start again!'


reset();

//function to set variables when restart the game
function reset() {
    guessLeft = 9;
    guessedLetters = [];
    guessingSong = [];
    gameStarted = false;

    //Computer picks random song index and log in console
    currentSongIndex = selectableSongs[Math.floor(Math.random()*selectableSongs.length)];
    console.log("Current song to guess: " + currentSongIndex);

    for (var i=0; i<currentSongIndex.length; i++) {
        guessingSong.push("_");
    }
    //Keep track of how many letters left to guess
    remainingLetters = currentSongIndex.length; 
    
    //Hide gameover and win image
    document.querySelector("#gameover-image").style.display = "none";
    document.querySelector("#pressKeyTryAgain").style.display = "none";

    //update HTML display
    updateDisplay();

}

//? innerText vs. innerHTML
    //*innerText sets content of tag as plain text, ignore HTML format
    //*innerHTML sets content in HTML format --> enter HTML code directly

//function to update display on HTML page
function updateDisplay(){
    document.querySelector(".totalWins").innerText = winCount;

    document.querySelector(".currentSong").innerHTML = "";
    for (var i=0; i<guessingSong.length; i++){
        document.querySelector(".currentSong").innerHTML += guessingSong[i];
    }

    document.querySelector(".remainingGuesses").innerHTML = guessLeft;
    document.querySelector(".guessedLetters").innerHTML = guessedLetters;
    
    //check for lose, if true then ask user to press any key
    if (guessLeft == 0){
        gameFinished = true;
        document.querySelector("#gameover-image").style.display = "block";
        document.querySelector("#pressKeyTryAgain").style.display = "block";
    }


//function to capture user's keyboard input
document.onkeyup = function (even) {
    var userInput = event.key;
    console.log (userInput);


    //check if the game has finished
    if (gameFinished) {
         reset();
         gameFinished = false;
    } else {
        //Check to make sure a-z was pressed
        if(event.keyCode >= 65 && event.keyCode <= 90){
            event.key.toLowerCase();
        }
    }

    for (var i=0; i<currentSongIndex.length; i++) {
        if (guessedLetters.includes(currentSongIndex[i])) {
            guessingSong[i] += guessedLetters;
        } else {
            guessingSong[i] += "_";
        }
    }
    guessedLetters.push(userInput);
    guessLeft--;
    updateDisplay();
}

}