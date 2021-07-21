import Api from "./Api.js";

const urlBase = "https://rickandmortyapi.com/api/";
const api = new Api(urlBase);

let sectionCharacters = document.querySelector('#characters');
let selectGender = document.querySelector('#genderFilter');


//Get Data from the API functions

//Get full data from the API
async function loadData(pType, pAttributte = "", pValue = "") {
    let data = await api.getInfo(pType)

    printCharacters(data.results, sectionCharacters)
}

//Get sorted data from the API
async function loadSortedData(pType, pAttributte, pValue) {
    let data = await api.getSortedInfo(pType, pAttributte, pValue)
    sectionCharacters.innerHTML = "";
    printCharacters(data.results, sectionCharacters)
}
//End get data form the Api functions


//Events

/* filterGender Event */
selectGender.addEventListener('change', filterGender);

function filterGender(event) {
    let value = event.target.value
    loadSortedData('character', 'gender', value)
}
/* End filterGender Event */


//End Events


/* Print a list of characters with printCharacters*/
function printCharacters(pObjectsList, pSection) {
    pObjectsList.forEach(element => printCharacter(element, pSection));
}

/*
    Gets: An Object Character and the DOM section where needs to be displayed
    Return: Display the card on the document
    Print a unique character
*/
function printCharacter(pCharacter, pSection) {
    let article = document.createElement('article');
    let figure = document.createElement('figure');
    let img = document.createElement('img');
    let div = document.createElement('div');
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    let divButton = document.createElement('div');
    let a = document.createElement('a')

    div.className = 'cardInfo'
    divButton.className = 'characterButton'
    img.src = pCharacter.image;
    img.alt = pCharacter.name;
    a.innerText = 'Go'
    a.href = pCharacter.url
    h3.innerText = pCharacter.name;
    p.innerText = 'Estado: ' + pCharacter.status;

    figure.appendChild(img);
    div.appendChild(h3);
    div.appendChild(p);
    divButton.appendChild(a)

    article.appendChild(figure)
    article.appendChild(div)
    article.appendChild(divButton)

    pSection.appendChild(article)
}




loadData('character')