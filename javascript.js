const item = document.querySelector('.floatingItem');

document.querySelectorAll('.floatingItem').forEach( item => {
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    item.style.animationDuration = `${randomNumber}s`;
});

const pigeonID = document.getElementById("bouncePigeon");

function clickPigeon() {
    pigeonID.classList.add("bouncingItem");
}

pigeonID.addEventListener("click",clickPigeon);
pigeonID.addEventListener('animationend', () => {
    pigeonID.classList.remove("bouncingItem");
});

function buttonClick(){
    document.querySelectorAll('.fadeAway').forEach( item => {
            item.classList.add("Fade");
        item.addEventListener('animationend', () => {
            item.style.display = "none"; //hides the items
            });
        });
        
    document.querySelectorAll('.framedbuttonPigeon').forEach( item => {
        item.classList.add("unblurItem");
        });
}

const historybtn = document.getElementById("HistoryBtn");
const buttonsID = document.getElementById("buttonsID");
const history = document.getElementById("HistoryWindow");

function onClick() {
        history.classList.remove("hiddenItem");
        historybtn.classList.add("hiddenItem");
        buttonsID.classList.add("hiddenItem");
}
historybtn.addEventListener("click",onClick);
