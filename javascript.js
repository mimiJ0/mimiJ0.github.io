//get main menu page:
const mainMenu = document.getElementById("mainPage");

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
        })
    }
}

document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn"))
    {
        const pigPart = event.target.dataset.part;
        closeWindow(pigPart);
    }
});

//BOUNCING PIGEON + menu
const pigeonID = document.getElementById("hamMenuBtnID");
const menuID = document.getElementById("menu")

function clickPigeon() 
{
    if (pigeonID.classList.contains("slidedown")) {
        pigeonID.classList.remove("slidedown");
        pigeonID.classList.add("slideup");
    }
    else {
        pigeonID.classList.remove("slideup");
        pigeonID.classList.add("slidedown");
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
pigeonID.addEventListener("click", clickPigeon);

let sectionElement = document.getElementById('pigeonHistoryContent');
let buttonElement = document.getElementById('pigeonHistoryID');

document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("hamMenuButtons"))
    {
        const hamBtn = event.target.dataset.contentbtns;
        displayHistory();
    }
});

const pigeonHistoryContent = document.getElementById("pigeonHistoryContent");
const pigeonHistoryBtn = document.getElementById("pigeonHistoryID");

function displayHistory() 
{
    mainMenu.style.display = "block";
    mainMenu.classList.add("hideAndBlur");
    
    //scroll to the very top of the content page
    pigeonHistoryContent.scrollTo({top: 0, behavior: "smooth"});
}


document.body.addEventListener("click", (event) => {
    if (event.target.id == "backBtn")
    {
        pigeonHistoryContent.classList.remove("unHideAndUnBlur");
        pigeonHistoryContent.classList.add("hideAndBlur");

        pigeonHistoryContent.addEventListener('animationend', (e) => {
            const animationName = e.animationName;
            //console.log(`Animation "${animationName}" has ended.`);
            if (animationName == "hideAndBlurFrames")
            {
                mainMenu.style.display = "block";
                mainMenu.classList.remove("hideMenu");
        
                pigeonHistoryContent.classList.remove("hideAndBlur");
                pigeonHistoryContent.classList.add("hiddenItem");
            }
        })
    }
});



pigeonHistoryBtn.addEventListener("click", displayHistory);

mainMenu.addEventListener("animationend", () => {
        mainMenu.style.display = "none";
        mainMenu.classList.remove("hideAndBlur");

        pigeonHistoryContent.classList.add("unHideAndUnBlur");
        pigeonHistoryContent.classList.remove("hideAndBlur");
        pigeonHistoryContent.classList.remove("hiddenItem");
})

document.body.addEventListener("click", (event) => {
    if (event.target.id == "backBtn")
    {
        pigeonHistoryContent.classList.remove("unHideAndUnBlur");
        pigeonHistoryContent.classList.add("hideAndBlur");

        pigeonHistoryContent.addEventListener('animationend', (e) => {
            const animationName = e.animationName;
            //console.log(`Animation "${animationName}" has ended.`);
            if (animationName == "hideAndBlurFrames")
            {
                mainMenu.style.display = "block";
                mainMenu.classList.remove("hideMenu");
        
                pigeonHistoryContent.classList.remove("hideAndBlur");
                pigeonHistoryContent.classList.add("hiddenItem");
            }
        })
    }
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