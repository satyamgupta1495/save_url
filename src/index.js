let myArray = [];

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulList = document.getElementById("ul-list");
const delbtn = document.getElementById("del-btn");
const tabBtn = document.getElementById("save-btn");

let urlFromLocalStorage = JSON.parse(localStorage.getItem("myArray"));

if (urlFromLocalStorage) {
  myArray = urlFromLocalStorage;
  renderLead(myArray);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    myArray.push(tabs[0].url);
    localStorage.setItem("myArray", JSON.stringify(myArray));
    renderLead(myArray);
  });
});

function renderLead(array) {
  let list = "";
  for (let i = 0; i < array.length; i++) {
    list += `<li> <a target='_blank' href='${array[i]}'>
    ${array[i]}</a> </li>`;
  }
  ulList.innerHTML = list;
}

inputBtn.addEventListener("click", () => {
  myArray.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myArray", JSON.stringify(myArray));
  renderLead(myArray);
});

delbtn.addEventListener("dblclick", () => {
  localStorage.clear();
  myArray = [];
  renderLead(myArray);
});
