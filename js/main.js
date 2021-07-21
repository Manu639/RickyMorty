import Api from "./Api.js";

const urlBase = "https://rickandmortyapi.com/api/"
const api = new Api(urlBase)

let sectionCharacters = document.querySelector('#characters')

async function loadData(ptype, pAttributte = "", pValue = "") {
    let data = await api.getInfo('character')

    printCharacters(data.results, sectionCharacters)
}

loadData()

function printCharacters(pObjectsList, pSection) {
    pObjectsList.forEach(element => printCharacter(element, pSection));
}

function printCharacter(pCharacter, pSection) {
    let article = document.createElement('article');
    let figure = document.createElement('figure');
    let img = document.createElement('img');
    let div = document.createElement('div');
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    let divButton = document.createElement('div');
    let a = document.createElement('a')


    a.addEventListener('click', goToCharacter)
    a.dataset.characterId = pCharacter.id

    img.src = pCharacter.image;
    img.alt = pCharacter.name;
    a.innerText = 'Ver Personaje'
    h3.innerText = pCharacter.name;
    p.innerText = pCharacter.status;

    figure.appendChild(img);
    div.appendChild(h3);
    div.appendChild(p);
    divButton.appendChild(a)

    article.appendChild(figure)
    article.appendChild(div)
    article.appendChild(divButton)

    pSection.appendChild(article)
}

function goToCharacter(event) {
    let characterId = event.target.dataset.id

}