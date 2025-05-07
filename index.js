const words = [
    "apple", "book", "cat", "dog", "egg", "fish", "game", "hat", "ice", "juice",
    "key", "lamp", "moon", "nest", "orange", "pen", "queen", "rain", "sun", "tree",
    "umbrella", "violin", "water", "xray", "yogurt", "zebra", "ball", "car", "door", "ear",
    "frog", "grape", "hill", "island", "jam", "kite", "lion", "milk", "nose", "owl",
    "pig", "quiz", "rose", "shoe", "train", "van", "wolf", "xylophone", "yard", "zip",
    "ant", "bread", "cloud", "desk", "eye", "flag", "gold", "home", "ink", "jacket",
    "kangaroo", "leaf", "mirror", "net", "ocean", "pumpkin", "quiet", "robot", "star", "table",
    "uncle", "vase", "window", "wax", "year", "zoo", "air", "brush", "circle", "dance",
    "earth", "feather", "garden", "heart", "idea", "jungle", "king", "ladder", "mountain", "number",
    "open", "paint", "quilt", "river", "stone", "tent", "under", "voice", "wheel", "yellow"
];  
const startBtn = document.getElementById("start");
const nextBtn = document.getElementById("next-word");
const hintBtn = document.getElementById("hint");
const timer = document.getElementById("time");
const scoreTracker = document.getElementById("score");
const wordScreen = document.getElementById("screen");


let currentWord = "";
let currentIndex = 0;
let countdown = null;
let score = 0;
let timeLeft = 30;


function handleKeyEvent(event) {
    const key = event.key;
    const letterDivs = document.querySelectorAll(".letter-screen");

    if (key === "Backspace") {
        if (currentIndex > 0) {
            currentIndex--;
            letterDivs[currentIndex].textContent = "";
        }
        return;
    }
    if (key === "Delete") {
        for (let i = 0; i < currentIndex; i++) {
            letterDivs[i].textContent = "";
        }
        currentIndex = 0;
        return;
    }

    const lowerKey = key.toLowerCase();
    if (!/^[a-z]$/.test(lowerKey)) return;

    if (currentIndex < letterDivs.length) {
        letterDivs[currentIndex].textContent = lowerKey;
        currentIndex++;
    };

    if (currentIndex === letterDivs.length){
        let userInput = "";
        letterDivs.forEach(div => {
            userInput += div.textContent;
        });

        if (userInput === currentWord) {
            score++;
            scoreTracker.textContent = "Score: " + score;
            clearInterval(countdown);
            timeLeft = 0;
            timer.classList.remove("green");
            timer.classList.add("correct");
            timer.textContent = "Correct";
        }
    }
}
function displayLetters(){
    document.addEventListener("keydown", handleKeyEvent);
}

document.querySelectorAll(".letter").forEach(button => {
    button.addEventListener("click", ()=>{
        const showLetter = {key: button.textContent.toLowerCase()};
        document.dispatchEvent(showLetter);
    })
})


function randomWord(){
    wordScreen.classList.remove("screen");
    wordScreen.innerHTML = "";
    currentIndex = 0;

    currentWord = words[Math.floor(Math.random()*words.length)];
    for (const letter of currentWord){
        const letterDiv = document.createElement("div");
        letterDiv.classList.add("letter-screen");
        wordScreen.appendChild(letterDiv);
    }
}

function timerCountdown(){
    if (countdown) {
        clearInterval(countdown);
    }
    timeLeft = 30;
    const timer = document.getElementById("time");
    countdown = setInterval(() => {
        timeLeft--;
        timer.classList.add("green");
        timer.classList.remove("correct")
        timer.textContent = "Time: " + timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            countdown = null;
            timer.classList.remove("green");
            timer.textContent = "Time's up!";
        }}, 1000);
}

startBtn.addEventListener("click", ()=>{
    scoreTracker.textContent = "Score: " + score; 
    randomWord();
    timerCountdown();
});
nextBtn.addEventListener("click", ()=>{
    randomWord();
    timerCountdown();
});
hintBtn.addEventListener("click", () => {
    const letterDivs = document.querySelectorAll(".letter-screen");
    const emptyIndices = [];
    letterDivs.forEach((div, index) => {
        if (div.textContent === "") {
            emptyIndices.push(index);
        }
    });

    if (emptyIndices.length > 0) {
        const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        letterDivs[randomIndex].textContent = currentWord[randomIndex];

        if (randomIndex === currentIndex) {
            currentIndex++;
        }
    }
});



displayLetters();
