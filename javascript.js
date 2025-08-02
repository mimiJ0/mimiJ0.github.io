//get main menu page:
const mainMenu = document.getElementById("mainPage");

//get the audios here:
const cooAudio = new Audio("audio/PigeonCoo.mp3");
const moneyEarnAudio = new Audio("audio/coinDrop.mp3");
const nomAudio = new Audio("audio/nom.wav");
const bubblingAudio = new Audio("audio/runningWater.wav");
const pigeonPurringAudio = new Audio("audio/pigeonPurring.mp3"); //pigeons purr when theyre happy
const popSound = new Audio("audio/popsound.mp3");

//select all the circles
document.querySelectorAll(".circle").forEach(a => {
    const circle = a.dataset.part;
    a.addEventListener("click", () => openWindow(circle));
})

//select all the close buttons
document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn"))
    {
        const pigPart = event.target.dataset.part;
        closeWindow(pigPart);
    }
});


// qr code, click to hide it on PC
const qrCode = document.getElementById("qrCode");
qrCode.addEventListener("click", () => {
    qrCode.style.display = "none";
});

//open window for pigeon body parts:
function openWindow(circle) {
    const circlebtn = document.getElementById(`${circle}Window`);
    circlebtn.classList.remove("hiddenItem");
    circlebtn.classList.remove("windowAnimationClose");
    circlebtn.classList.add("windowAnimationOpen");
}
//close window for pigeon body parts:
function closeWindow(button) {
    const win = document.getElementById(`${button}Window`);

    if(win) //if it exists:
    {
        win.classList.remove("windowAnimationOpen");
        win.classList.add("windowAnimationClose");
        
        win.addEventListener('animationend', () => {
            win.classList.add("hiddenItem");
            win.classList.remove("windowAnimationClose");
        }, {once: true})
    }
}

document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn"))
    {
        const pigPart = event.target.dataset.part;
        closeWindow(pigPart);
    }
});

//to open the menu
const hamMenuBtn = document.getElementById("hamMenuBtnID");
const menuID = document.getElementById("hamMenu");

function hamburgerMenu() 
{
    cooAudio.play();
    if (hamMenuBtn.classList.contains("slidedown")) {
        hamMenuBtn.classList.remove("slidedown");
        hamMenuBtn.classList.add("slideup");
    }
    else {
        hamMenuBtn.classList.remove("slideup");
        hamMenuBtn.classList.add("slidedown");
    }

    if (menuID.classList.contains("menuAnimOpen")) {
        menuID.classList.remove("menuAnimOpen");
        menuID.classList.add("menuAnimClose");
    }
    else {
        menuID.classList.remove("menuAnimClose");
        menuID.classList.add("menuAnimOpen");
    }
}
hamMenuBtn.addEventListener("click", hamburgerMenu);

//have a variable to handle the current window, set it to null first
let currentContentWindow = null;
const homeBtn = document.getElementById("homeBtn");

//this checks which button the user is click
document.body.addEventListener("click", (event) => {
    //main buttons:
    if (event.target.dataset.contentbtns) {
        const contentKey = event.target.dataset.contentbtns;
        //this will close the hamburger menu if it was opened before
        if (event.target.classList.contains("hamMenuButtons"))
            hamburgerMenu();

        displayContent(contentKey);
        
        //scrolls to the top of the window
        window.scrollTo({top: 0, behavior: 'smooth'}); 
    }
});

//function to display content windows
function displayContent(content) {
     if (currentContentWindow != null)
    {
        currentContentWindow.classList.remove("unHideAndUnBlur");
        currentContentWindow.classList.add("hideAndBlur");
        currentContentWindow.classList.add("hiddenItem");
    }

    mainMenu.style.display = "block";
    mainMenu.classList.add("hideAndBlur");

    // Wait for mainMenu to finish hiding before showing the new content
    mainMenu.addEventListener("animationend", () => {
        mainMenu.style.display = "none";
        mainMenu.classList.remove("hideAndBlur");

        const contentWindow = document.getElementById(`${content}Content`);
        currentContentWindow = contentWindow;

        contentWindow.classList.remove("hiddenItem");
        contentWindow.classList.remove("hideAndBlur");
        contentWindow.classList.add("unHideAndUnBlur");
    }, { once: true }); 
}

document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("backBtn"))
    {
        currentContentWindow.classList.remove("unHideAndUnBlur");
        currentContentWindow.classList.add("hideAndBlur");

        document.getElementById("navigationID").scrollIntoView();

        currentContentWindow.addEventListener('animationend', (e) => {
            const animationName = e.animationName;
            //console.log(`Animation "${animationName}" has ended.`);
            if (animationName == "hideAndBlurFrames")
            {
                mainMenu.style.display = "block";
                mainMenu.classList.remove("hideMenu");
        
                currentContentWindow.classList.remove("hideAndBlur");
                currentContentWindow.classList.add("hiddenItem");
            }
        }, {once: true})
    }
    
});

//this is just for the home button in the hamburger menu
homeBtn.addEventListener("click", () =>
{
    currentContentWindow.classList.remove("unHideAndUnBlur");
    currentContentWindow.classList.add("hideAndBlur");

        document.getElementById("navigationID").scrollIntoView();

        currentContentWindow.addEventListener('animationend', (e) => {
            const animationName = e.animationName;
            //console.log(`Animation "${animationName}" has ended.`);
            if (animationName == "hideAndBlurFrames")
            {
                mainMenu.style.display = "block";
                mainMenu.classList.remove("hideMenu");
        
                currentContentWindow.classList.remove("hideAndBlur");
                currentContentWindow.classList.add("hiddenItem");
            }
        }, {once: true})
    //console.log("test"); (it works)
    hamburgerMenu();
});
////////////////////
const observer = new IntersectionObserver((entries) =>{
    entries.forEach((entry) => {
        if (entry.isIntersecting)
            entry.target.classList.add("show");
        else
            entry.target.classList.remove("show"); })
}, { threshold:.2 } ); 

const hiddenElements = document.querySelectorAll(".hide");
hiddenElements.forEach(element => {
    observer.observe(element);
});


let currentQuestionIndex = 0;
let score = 0;
const questionWindow = document.getElementById("questionHolder");

const pigeonQuiz = [
  {
    question: "What were the roles of pigeons during the war?",
    answers: {
      a: "Messengers",
      b: "Shooters",
      c: "Body blockers"
    },
    correctAnswer: "a"
  },
  {
    question: "Why were pigeons abandoned?",
    answers: {
      a: "People hated them",
      b: "They left on their own",
      c: "Technology advancement"
    },
    correctAnswer: "c"
  },
   {
    question: "Which of these breeds are NOT pigeons?",
    answers: {
      a: "Rock",
      b: "Mynas",
      c: "Homing"
    },
    correctAnswer: "b"
  },
   {
    question: "What was the name of the pigeon who saved almost 200 people?",
    answers: {
      a: "Cher Ami",
      b: "Amor",
      c: "Mon frere"
    },
    correctAnswer: "a"
  },
   {
    question: "How should we prevent 'String Foot' in pigeons?",
    answers: {
      a: "Dispose the pigeon",
      b: "Eat the string",
      c: "Properly dispose of any sort of thread"
    },
    correctAnswer: "c"
  },
   {
    question: "Why are most people scared of pigeons?",
    answers: {
      a: "They think pigeons bring curses",
      b: "They think pigeons carry diseases",
      c: "They think the pigeons are overpopulated"
    },
    correctAnswer: "b"
  },
  {
    question: "Is it true that all pigeons are dirty animals?",
    answers: {
        a: "Yes, they roll in trash to keep warm",
        b: "No, they actually clean themselves frequently",
        c: "Only during winter months"
    },
    correctAnswer: "b"
  },
  {
    question: "Where are feral pigeons most commonly found?",
    answers: {
        a: "Deserts and forests",
        b: "Remote mountain regions",
        c: "Urban cities"
    },
    correctAnswer: "c"
  },
  {
    question: "What is the most recognizable feature of a HOMING pigeon?",
    answers: {
        a: "Its ability to mimic sounds",
        b: "Its colorful feathers",
        c: "Its ability to navigate long distances"
    },
    correctAnswer: "c"
  },
  {
    question: "Which award was given to Cher Ami for bravery?",
    answers: {
        a: "Medal of Honor",
        b: "Purple Wing",
        c: "Croix de guerre"
    },
    correctAnswer: "c"
  }
];

function displayQuestion() {
  const currentQuestion = pigeonQuiz[currentQuestionIndex];
  document.getElementById("question").innerText = currentQuestion.question;

  const answersDiv = document.getElementById("answerButtons");
  answersDiv.innerHTML = ""; // Clear previous answers

  for (const key in currentQuestion.answers) {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    
    //align the choices on the left side
    label.style.display = "flex"; 
    label.style.alignContent = "left";
    
    input.value = key;
    label.appendChild(input);
    label.appendChild(document.createTextNode(currentQuestion.answers[key]));
    answersDiv.appendChild(label);
  }
}

document.getElementById("nextButton").addEventListener("click", () => {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');

  if (selectedAnswer) {
    if (selectedAnswer.value === pigeonQuiz[currentQuestionIndex].correctAnswer) 
        score++; 
    
    currentQuestionIndex++;
    if (currentQuestionIndex < pigeonQuiz.length) 
    { displayQuestion(); }
    else 
    { alert(`Quiz finished! Your score: ${score}/${pigeonQuiz.length}`); }
    
    } 
    else 
    { alert("Please select an answer!"); }

    
    if (currentQuestionIndex != pigeonQuiz.length) 
    {
        questionWindow.classList.add("spin");
    }
    questionWindow.addEventListener('animationend', () => {
        questionWindow.classList.remove("spin");
    });
});

//this will run and reset the questions
setInterval(() => {
    if (document.getElementById("quizContent").classList.contains("hiddenItem"))
    {
        currentQuestionIndex = 0;
        displayQuestion();
    }
}, 1000);

displayQuestion();

//handles cycling thru the array
let currentBreedIndex = 0;

// this contains some breeds for the pigeons
const pigeonBreedWindow = document.getElementById("pigeonBreedsContainer");
const pigeonBreeds = [
    {
        Breed: "Wild Pigeons",
        Info: "These pigeons are also known as city pigeons. They are a descendant of 'Rock pigeons'.\n These pigeons are the most common pigeons worldwide. They've grown to adapt to the modern life with humans, contributing to their abundance.",
        Img: "images/pigeonBreeds/feralRockPigeons.jpg"
    },
    {
         Breed: "Homing Pigeons",
        Info: "These pigeons are a variety of domestic pigeons, selectively bred for their ability to find its way home over extremely long distances. They are part of the 'homer pigeons' family.",
        Img: "images/pigeonBreeds/homingPigeon.jpg"
    },
    {
         Breed: "King Pigeons",
        Info: "King pigeons are a large breed as they were specifically bred for their meat. This makes them unfit for survival in the wild.",
        Img: "images/pigeonBreeds/kingPigeon.jpg"
    },
    {
         Breed: "Rock Pigeons",
        Info: "Rock pigeons are also known as Rock Doves, these are a very common breed of pigeons amongst the hundreds of pigeon breeds. They have very little differences between male and female. These are a domesticated breed, but the difference between them and wild pigeons.",
        Img: "images/pigeonBreeds/rockPigeon.jpg"
    },
    {
         Breed: "Fantail Pigeons",
        Info: "These gorgeous pigeons are a very popular breed of 'fancy pigeons', mostly bred for pigeon shows and fairs. Their tails are bred to resemble a peacock's tail, composed of 30 to 40 feathers which is abnormally a lot more than a normal pigeon or dove (they only have 12 to 14). ",
        Img: "images/pigeonBreeds/fantailPigeon.jpg"
    },
    {
         Breed: "English Pouter Pigeons",
        Info: "The English Pouter is part of the 'pouter pigeons' and 'fancy pigeons'. They have an enlarged crop, the front of their chest, which makes them distinct.",
        Img: "images/pigeonBreeds/englishPouterPigeon.jpg"
    },
    {
         Breed: "ArchAngel Pigeons",
        Info: "These pigeons are distinct for their metallic feathers. They are part of the 'colour pigeons' and 'fancy pigeons'. They are small compared to the other pigeons, valued for their appearance.",
        Img: "images/pigeonBreeds/archAngelPigeon.jpg"
    }
]

function displayBreeds() {
  const currentBreed = pigeonBreeds[currentBreedIndex];
  document.getElementById("pigeonBreedImg").src = currentBreed.Img;
  document.getElementById("pigeonBreedTitle").innerText = currentBreed.Breed;
  document.getElementById("pigeonBreedInfo").innerText = currentBreed.Info;
}

document.getElementById("left").addEventListener("click", () => {
    currentBreedIndex--;
    if (currentBreedIndex <= 0)
    {
        currentBreedIndex = 0;
    }
    displayBreeds();
});
document.getElementById("right").addEventListener("click", () => {
    currentBreedIndex++;
     if (currentBreedIndex >= pigeonBreeds.length)
    {
        currentBreedIndex = pigeonBreeds.length - 1;
    }
    displayBreeds();
});
displayBreeds();


//For the minigame:
const minigameContent = document.getElementById("minigameContent");

const petPigeon = document.getElementById("petPigeonID");

const foodWindow = document.querySelector(".foodWindow");
const foodRadioButtons = document.querySelectorAll("input[name='food']");
const interactableObj = document.getElementById("interactItem");
const ballObj = document.querySelector(".ball");

const stats = ["hungerID", "cleanlinessID", "loveID", "boredomID"];
let hungerVal = 100, cleanlinessVal = 100, loveVal = 0, boredomVal = 100;
let fed = false;

function GetRandom(min,max){
    //this will select a number between min and max
    return Math.round(Math.random() * (max - min)) + min;
}

function movePigeon() {
    const field = petPigeon.parentElement;
    const maxX = field.clientWidth - petPigeon.clientWidth;
    const maxY = field.clientHeight - petPigeon.clientHeight;

    petPigeon.style.left = GetRandom(0, maxX) + "px";
    petPigeon.style.top = GetRandom(0, maxY) + "px";
    if (!(ballObj.classList.contains("hiddenItem")))
    {
        const maxX = ballObj.offsetLeft;
        const maxY = ballObj.offsetTop;

        petPigeon.style.left = maxX + "px";
        petPigeon.style.top = maxY + "px";

        if(checkOverlap(ballObj, petPigeon)){
            boredomVal += 20;
            if (boredomVal >= 100) boredomVal = 100;
            ballObj.classList.add("hiddenItem");
            popSound.currentTime = 0;
            popSound.play();
        } 
    }
}
movePigeon();
movePigeon = setInterval(movePigeon, 2000);

const moneyBox =document.getElementById("moneyBox");
var money = 0; //to track how many money

function clickPigeon() {
    //increases score after clicking
    money++;
    //update html scorebox
    moneyBox.innerHTML = "Money: $" + money;
    
    // rewind to start
    moneyEarnAudio.currentTime = 0; 
    moneyEarnAudio.play();
}
petPigeon.addEventListener("click",clickPigeon);

function checkOverlap(img1, img2) {
    const rect1 = img1.getBoundingClientRect();
    const rect2 = img2.getBoundingClientRect();
    
    //check for non-overlap conditions
    if (rect1.left >= rect2.right || rect1.right <= rect2.left || rect1.top >= rect2.bottom || rect1.bottom <= rect2.top)
        return false; //overlap: no
    return true; //overlap: yes
}

document.getElementById("feedBtn").addEventListener("click", () => {
    for (var i = 0; i < foodRadioButtons.length; i++)
        foodRadioButtons[i].checked = false;
    foodWindow.classList.toggle("hiddenItem");
});

document.getElementById("cleanBtn").addEventListener("click", () => {
    if(interactableObj.classList.contains("hiddenItem"))
    {
        interactableObj.classList.remove("hiddenItem");
        bubblingAudio.loop = true;
        bubblingAudio.play();
    }
    else
    {
        interactableObj.classList.add("hiddenItem");
        bubblingAudio.loop = false;
        bubblingAudio.currentTime = 0;
        bubblingAudio.pause();
    }

    if (!(interactableObj.classList.contains("sponge")))
    {
        interactableObj.classList.add("sponge");
        interactableObj.classList.remove("hand");
    }
})
document.getElementById("petBtn").addEventListener("click", () => {
    if(interactableObj.classList.contains("hiddenItem"))
    {
        interactableObj.classList.remove("hiddenItem");
        pigeonPurringAudio.loop = true;
        pigeonPurringAudio.play();
    }
    else
    {
        interactableObj.classList.add("hiddenItem");
        pigeonPurringAudio.loop = false;
        pigeonPurringAudio.currentTime = 0;
        pigeonPurringAudio.pause();
    }
    if (!(interactableObj.classList.contains("hand")))
    {
        interactableObj.classList.remove("sponge");
        interactableObj.classList.add("hand");
    }
})

document.getElementById("playBtn").addEventListener("click", (e) => {
    ballObj.classList.toggle("hiddenItem");
    
    const field = ballObj.parentElement;
    const maxX = field.clientWidth - ballObj.clientWidth;
    const maxY = field.clientHeight - ballObj.clientHeight;
    
    ballObj.style.left = GetRandom(0, maxX) + "px";
    ballObj.style.top = GetRandom(0, maxY) + "px";
    
})

//checking overlapping images
setInterval(() => {
    if(checkOverlap(interactableObj, petPigeon))
    {
        if (interactableObj.classList.contains("sponge"))
        {
            cleanlinessVal += 1;
            if (cleanlinessVal >= 100) cleanlinessVal = 100;
        }
    } }, 100
);
setInterval(() => {
    if(checkOverlap(interactableObj, petPigeon))
    {
        if (interactableObj.classList.contains("hand"))
        {
            loveVal += 1;
            if (loveVal >= 100) loveVal = 100;
        }
    } }, 200
);

document.getElementById("feedID").addEventListener("click", () => {
    getFoodSelection();
});

function getFoodSelection() {
    let food = "";
    for (var i = 0; i < foodRadioButtons.length; i++) {
        if(foodRadioButtons[i].checked == true)
        {
            if (money > 0)
            {
                food = foodRadioButtons[i].value;
                //console.log(food); (note: this works)
                if (money <= 0) money = 0; //cap it
                
                if (money >= foodRadioButtons[i].value)
                {
                    money -= foodRadioButtons[i].value;
                    moneyBox.innerHTML = "Money: $" + money;
                    fed = true;
                    nomAudio.currentTime = 0;
                    nomAudio.play();
                    statDecrease();
                }
                
            }
            else
                alert("Not enough money! \nClick your pigeon to earn money!");
        }
    }
}

function statDecrease() {
    if (minigameContent.classList.contains("hiddenItem")) return;
    //hunger:
    if (document.getElementById(stats[0]))
    {
        let decreaseVal = Math.round(Math.random() * 2);
        hungerVal -= decreaseVal;
        if (fed)
        {
            for (let i = 0; i < foodRadioButtons.length; i++) {
                if (foodRadioButtons[i].checked) {
                    hungerVal += parseInt(foodRadioButtons[i].value);
                    fed = false; // immediately reset fed so it doesn’t apply again
                    document.getElementById(stats[0]).classList.add("flashGreen");
                    document.getElementById(stats[0]).addEventListener('animationend', () => {
                        document.getElementById(stats[0]).classList.remove("flashGreen");
                    });
                    break;
                }
            }
        }
        if (hungerVal >= 100) hungerVal = 100;
        if (hungerVal <= 0) hungerVal = 0;
    }
    //cleanliness:
    if (document.getElementById(stats[1]))
    {
        let decreaseVal = Math.round(Math.random() * 3);
        cleanlinessVal -= decreaseVal;
        if (cleanlinessVal <= 0) cleanlinessVal = 0;
    }
    //love:
    if (document.getElementById(stats[2]))
    {
        if (loveVal != 100)
        {
            let decreaseVal = Math.round(Math.random() * 3);
            loveVal -= decreaseVal;
            if (loveVal <= 0) loveVal = 0;
        }
    }
    //boredom:
    if (document.getElementById(stats[3]))
    {
       let decreaseVal = Math.round(Math.random() * 3);
        boredomVal -= decreaseVal;
        if (boredomVal <= 0) boredomVal = 0;
    }
}
setInterval(statDecrease, 1000);

function displayStats() {
    document.getElementById(stats[0]).innerText = "Hunger: " + hungerVal;
    document.getElementById(stats[1]).innerText = "Cleanliness: " + cleanlinessVal;
    document.getElementById(stats[2]).innerText = "Love: " + loveVal;
    document.getElementById(stats[3]).innerText = "Boredom: " + boredomVal;
}
setInterval(displayStats, 1);

document.getElementById("resetStats").addEventListener("click", () => {
    hungerVal = 100;
    boredomVal = 100;
    cleanlinessVal = 100;
    loveVal = 0;
    console.log(hungerVal);
});

document.addEventListener("mousemove", (e) =>{
    const field = interactableObj.parentElement;
    const maxX = field.clientWidth - interactableObj.clientWidth;
    const maxY = field.clientHeight - interactableObj.clientHeight;
    
    let x = e.pageX - 80;
    let y = e.pageY - 160;

    // Clamp the position within the field
    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    interactableObj.style.left = x + "px";
    interactableObj.style.top = y + "px";
});

//fullscreen:
const btnFS=document.querySelector("#btnFS");
const btnWS=document.querySelector("#btnWS");
btnFS.addEventListener("click",enterFullscreen);
btnWS.addEventListener("click",exitFullscreen);
function enterFullscreen() { //must be called by user generated event
if (document.documentElement.requestFullscreen) {
document.documentElement.requestFullscreen();
} else if (document.documentElement.mozRequestFullScreen) { // Firefox
document.documentElement.mozRequestFullScreen();
} else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
document.documentElement.webkitRequestFullscreen();
} else if (document.documentElement.msRequestFullscreen) { // IE/Edge
document.documentElement.msRequestFullscreen();
}
}
function exitFullscreen() {
if (document.exitFullscreen) {
document.exitFullscreen();
} else if (document.mozCancelFullScreen) { // Firefox
document.mozCancelFullScreen();
} else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
document.webkitExitFullscreen();
} else if (document.msExitFullscreen) { // IE/Edge
document.msExitFullscreen();
}
}