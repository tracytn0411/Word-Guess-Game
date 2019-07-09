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
            
var letters = (abcdefghijklmnopqrstuvwxyz); //don't need to separate the letters

var winCount = 0;
var guessLeft = 9;
var currentSongIndex; //Index of current song in the array
var guessedLetters = [];
var guessingSong; //Song user is trying to guess (to match curret song index)
var gameStarted = false; //flag to tell game has started
var gamefinished = false; //flag to 'press any key to start again!'


//function to capture user's keyboard input
document.onkeyup = function (even) {
    var userInput = event.key;
    console.log (userInput);

    guessedLetters.push(userInput);
    guessLeft--;
    updateDisplay();

    for (var i=0; i<selectableSongs[currentSongIndex].length; i++) {
        if (guessedLetters.includes(currentSongIndex[i])) {
            guessingSong += guessedLetters;
        } else {
            guessingSong += "_";
        }
    }
    document.querySelector(".currentWord").innerText = guessingSong;
}



//function to set variables when restart the game
function reset() {
    guessLeft = 9;
    guessedLetters = [];
    gameStarted = false;
    updateDisplay;

    //Computer picks random song index and log in console
    currentSongIndex= [Math.floor(Math.random()*songs.length)];
    console.log("Current song to guess: " + currentSongIndex);

    for (var i=0; i<selectableSongs[currentSongIndex].length; i++) {
        guessingSong.push("_");
    }
}


//? innerText vs. innerHTML
    //*innerText sets content of tag as plain text, ignore HTML format
    //*innerHTML sets content in HTML format --> enter HTML code directly

//function to update display on HTML page
function updateDisplay(){
    document.querySelector(".totalWins").innerText = winCount;
    
    for (var i=0; i<guessingSong.length; i++){
        document.querySelector(".currentWord").innerText += guessingSong[i];
    }
    document.querySelector(".remainingguesses").innerText = guessLeft;
    document.querySelector(".guessedletters").innerText = guessedLetters;
    
}
