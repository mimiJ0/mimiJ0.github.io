//Buttons:
    const wingBtn = document.getElementById("wingBtn");
    const headBtn = document.getElementById("headBtn");

//Windows:
    const wingWindow = document.getElementById("wingWindow");
    const headWindow = document.getElementById("headWindow");

//Pigeon parts:
    const pigeonWing = document.getElementById("pigeonWing");
    const headWing = document.getElementById("pigeonHead");

//WING WINDOW:
    function closeWingWindow() {
            wingWindow.classList.remove("windowAnimationOpen");
            wingWindow.classList.add("windowAnimationClose");
    }
    wingBtn.addEventListener("click",closeWingWindow);

    function clickWingWindow() {
        wingWindow.classList.remove("hiddenItem");
        wingWindow.classList.add("windowAnimationOpen");
    }
    pigeonWing.addEventListener("click",clickWingWindow);

    wingWindow.addEventListener('animationend', (e) => {
        if (e.animationName == "windowAnimationFramesClose")
        {
            wingWindow.classList.add("hiddenItem");
            wingWindow.classList.remove("windowAnimationClose");
            wingWindow.classList.remove("windowAnimationOpen");
        }
    });

//HEAD WINDOW
    function closeHeadWindow() {
            headWindow.classList.add("windowAnimationClose");
    }
    headBtn.addEventListener("click",closeHeadWindow);

    function clickHeadWindow() {
        headWindow.classList.remove("hiddenItem");
        headWindow.classList.add("windowAnimationOpen");
    }
    pigeonHead.addEventListener("click",clickHeadWindow);

    headWindow.addEventListener('animationend', (e) => {
        if (e.animationName == "windowAnimationFramesClose")
        {
            headWindow.classList.add("hiddenItem");
            headWindow.classList.remove("windowAnimationClose");
            headWindow.classList.remove("windowAnimationOpen");
        }
    });

//BOUNCING PIGEON
const pigeonID = document.getElementById("bouncePigeon");

function clickPigeon() {
    pigeonID.classList.add("bouncingItem");
}

pigeonID.addEventListener("click",clickPigeon);
pigeonID.addEventListener('animationend', () => {
    pigeonID.classList.remove("bouncingItem");
});

// //LOCKED SCROLLING:
// const lockedScroll = document.getElementById("lockedScroll");
// const lockedScrollContent = document.querySelector(".lockedScroll");

// function toggleScroll(check) {
//     document.body.style.overflow = check ? "hidden" : "auto";
// }

// toggleScroll(true);

// lockedScrollContent.addEventListener('scroll', () => {
//     const hitBtm =  lockedScrollContent.scrollTop +

// });