const btnEl = document.querySelector(".btn")
const inputEl = document.getElementById("input")
const lenghtInputEl = document.getElementById("num-length")
const copyIconEl = document.querySelector(".fa-copy")
const alertContainerEl = document.querySelector(".alert-container")
const dictionary = {
    lowercaseletters: "abcdefghijklmnopqrstuvwyxz",
    uppercaseletters: "ABCDEFGHIJKLMNOPQRSTUVWYXZ",
    numbers: "0123456789",
    specialchars: "!@#$%¨&*()_+?:{}[]"
};
let charpoolselection = ""

document.querySelectorAll(".chip").forEach(chip =>{
    chip.addEventListener("click", function(){
        this.classList.toggle("active")
        updateCharPool()
    })
})

updateCharPool();

btnEl.addEventListener("click", ()=>{
    createPassword()
})

copyIconEl.addEventListener("click", ()=>{
    copyPassword()
    if(inputEl.value){
        alertContainerEl.classList.remove("active");
    setTimeout(()=>{
        alertContainerEl.classList.add("active");
    }, 2000)
    }
})

function createPassword(){
    let password = ""
    let passwordLength = 14;
    if(charpoolselection === "") return alert("Select at least one character type!");
    if(lenghtInputEl.value){
        passwordLength = Number(lenghtInputEl.value)
    }
    for (let index = 0; index < passwordLength; index++) {
        const randomNum = Math.floor(Math.random() * charpoolselection.length)
        password += charpoolselection.substring(randomNum, randomNum + 1);
    }
    inputEl.value = password;
    alertContainerEl.innerText = password + " copied!";
}

function copyPassword(){
    inputEl.select();
    inputEl.setSelectionRange(0, 9999);
    navigator.clipboard.writeText(inputEl.value);
}

function updateCharPool(){
    const activeChips = Array.from(document.querySelectorAll(".chip.active"));
    charpoolselection = activeChips
    .map(chip => dictionary[chip.dataset.type])
    .join("");
}