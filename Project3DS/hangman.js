//Dirshe Salat

//*****************************************************************************
//*** CONSTANT DEFINITIONS                                                  ***
//*****************************************************************************
const CODE_HIT = 0; // Return code if the letter matches
const CODE_MISS = -1; // Return code if the letter does not match
const CODE_NA = -2; // Return code if the letter is not available

//*****************************************************************************
//*** GLOBAL DEFINITIONS TO BE SHARED BY FUNCTIONS AND EVENT HANDLERS       ***
//*****************************************************************************
var definition = document.getElementById("definition");
var RandomWord
var Wins = 0
var Tries = 10
var RevealWord = ""
var LetterUsed = 0
var correctWord
var inLetterUsed = 0
var StartGame = false;
var endGame = false;
var Restart = false;
var regexCheck = /^[a-zA-Z \b\n\r\f\t\v]+$/;
//***
//*** WORD LIST
//***
var selectableWords = // Word list
    [{
        word: "cobol",
        hint: "Comon Business Oriented Language"
    }, {
        word: "fortran",
        hint: "Mathematical programming language"
    }, {
        word: "knuth",
        hint: "Father of Computer Science"
    }, {
        word: "turing",
        hint: "Machine that has nothing but a stack and a tape"
    }, {
        word: "disease",
        hint: "JavaScript is a __________."
    }, {
        word: "algorithm",
        hint: "Detailed and precisely defined set of steps needed to complete a task."
    }, {
        word: "repetition",
        hint: "________ is also known as looping."
    }, {
        word: "selection",
        hint: "________ is also known as the if structure."
    }, {
        word: "linus",
        hint: "_________ Torvalds."
    }, {
        word: "linker",
        hint: "Generates an executable file."
    }, {
        word: "interpreter",
        hint: "Executes the code as it is being read."
    }, {
        word: "basic",
        hint: "Beginners app-purpose symbolic instruction code."
    }, {
        word: "eniac",
        hint: "First electronic general purpose computer."
    }, {
        word: "exclusive",
        hint: "AB' + A'B is what kind of OR?"
    }, {
        word: "java",
        hint: "A programming language that was originally intended to be named Oak."
    }, {
        word: "python",
        hint: "Programming language named after a British comedian."
    }, {
        word: "embedded",
        hint: "Microcontrollers are typically used in the __________ systems."
    }, {
        word: "register",
        hint: "Fastest storage for temporary results, usually within a CPU."
    }, {
        word: "logarithmic",
        hint: "If a constant time cannot be achieved, the next most desired time is ________________."
    }, {
        word: "stack",
        hint: "Operates on LIFO principle."
    }];

//***
//*** List of images to be displayed for every miss and the miss count
//***
var imagesList = ["Images\\Hangman00.jpg", "Images\\Hangman01.jpg", "Images\\Hangman02.jpg",
    "Images\\Hangman03.jpg", "Images\\Hangman04.jpg", "Images\\Hangman05.jpg",
    "Images\\Hangman06.jpg", "Images\\Hangman07.jpg", "Images\\Hangman08.jpg",
    "Images\\Hangman09.jpg"
];

var usedLetterList = [];

//Keys that are NOT allowed. So they are skipped or ignored
var skip_keys = ["Tab", "CapsLock", "Shift", "CapsLock", "Control", "Alt", "Meta", "ArrowUp",
    "ArrowDown", "ArrowLeft", "ArrowRight", "Enter", "Escape", "'", "Backspace"
]

//*****************************************************************************
//*** Function:                      keyPressHandler                        ***
//***                                                                       ***
//*** Description:                   Function to handle the event of a key  ***
//***                                being pressed on the keyboard.         ***
//***                                                                       ***
//*** Parameters:                    event - event which resulted in this   ***
//***                                        function being called.         ***
//*****************************************************************************


//Initialize array
function keyPressHandler(event) {

    var indices = new Array();

    if (skip_keys.includes(event.key)) {
        alert("Try again with a valid letter please :D");
    } else {
        if (endGame == true) {
            if (event.key == " ")
                bodyOnloadHandler();
        } else if ((event.key.match(regexCheck)) && (usedLetterList.indexOf(event.key) == -1) && (usedLetterList.indexOf(event.key.toLowerCase()) == -1) && (usedLetterList.indexOf(event.key.toUpperCase()) == -1)) {
            console.log(event);

            // Including the keys tapped
            usedLetterList.push(event.key)
            if ((correctWord.indexOf(event.key) !== -1) || (correctWord.indexOf(event.key.toUpperCase()) !== -1) || (correctWord.indexOf(event.key.toLowerCase()) !== -1)) {
                console.log('inside');

                var key = event.key.toLowerCase();

                if (correctWord.indexOf(key) !== -1) {
                    for (var index = correctWord.indexOf(key); index >= 0; index = correctWord.indexOf(key, index + 1)) {
                        indices.push(index);
                        LetterUsed = LetterUsed + 1;
                    }
                    console.log('indices found in the list');
                    console.log(indices);
                }
                for (var f = 0; f < indices.length; f++) {
                    RevealWord = RevealWord.substring(0, indices[f]) + event.key + RevealWord.substring(indices[f] + 1);

                }

                currentWord.innerHTML = RevealWord;
            } else {
                console.log('outside');
                Tries = Tries - 1;
                inLetterUsed = inLetterUsed + 1;
                document.getElementById("HangmanImage").src = imagesList[inLetterUsed];
            }
            //*************************************
            //**** COMPLETE THIS FUNCTION       ***
            //*************************************

            // Checks the winnings
            if (LetterUsed == correctWord.length) {
                console.log('you win, gj proud of you')
                document.getElementById("HangmanImage").src = "Images/hangmanWin.jpg";
                Wins = Wins + 1;
                RevealWord = "";
                usedLetterList = [];
                LetterUsed = 0;
                inLetterUsed = 0;
                Tries = 10;
                endGame = true;
                Restart = true;

            } else if (Tries < 1) {
                remainingGuesses.innerHTML = 0
                console.log('you lose, try again')
                document.getElementById("HangmanImage").src = "Images/hangmanLose.jpg";
                RevealWord = "";
                usedLetterList = [];
                LetterUsed = 0;
                inLetterUsed = 0;
                Tries = 10;
                endGame = true;
                Restart = true;
            } else {
                remainingGuesses.innerHTML = Tries
            }
        }

        guessedLetters.innerHTML = usedLetterList
    }
}
//*****************************************************************************

//*****************************************************************************
//*** Function:                         bodyOnloadHandler                   ***
//***                                                                       ***
//*** Description:                      Loads the page and initializes the  ***
//***                                   game.                               ***
//*****************************************************************************
function bodyOnloadHandler() {
    if (Restart == false) {
        document.getElementById("HangmanImage").src = "Images/firstScreen.jpg";
        window.document.addEventListener('keydown', myFunction)
    }
    if (StartGame == true) {
        endGame = false;
        document.getElementById("HangmanImage").src = "Images/hangman00.jpg";
        RandomWord = Math.round(Math.random() * (selectableWords.length - 1));
        console.log(RandomWord);
        Definition.innerHTML = selectableWords[RandomWord].hint;

        // Another correct word check
        correctWord = selectableWords[RandomWord].word;
        console.log(correctWord);

        // The allowed number of Tries
        remainingGuesses.innerHTML = Tries

        // Showing the Wins
        totalWins.innerHTML = Wins

        for (var i = 0; i < correctWord.length; i++) {
            RevealWord = RevealWord + '-'
        }

        currentWord.innerHTML = RevealWord;

        //****************************************************************
        //*** YOU MIGHT NEED TO ADD SOME LOAD INITIALIZATION CODE HERE ***
        //****************************************************************
        window.document.removeEventListener('keydown', myFunction)
        window.document.addEventListener('keydown', keyPressHandler);
    }

}

function myFunction(event) {
    var x = event.which || event.keyCode;
    console.log(x);
    if (x == 32)
        StartGame = true;

    bodyOnloadHandler();
}
//*****************************************************************************