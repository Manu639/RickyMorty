import ApiMorty from "./class.api.js";
const baseUrl = 'https://rickandmortyapi.com/api/'
const apiConnection = new ApiMorty();

//Get DOM elements
let sectionCharacters = document.querySelector('section>div');
let buttons = document.querySelectorAll('.fixed-bottom .btn');
let genderSelector = document.querySelectorAll('.dropdown-menu a');
let navbarDropdown = document.querySelector('#navbarDropdown');
let searchForm = document.querySelector('#search');
let alertsZone = document.querySelector('#alerts')
//End get DOM elements

//Add events
searchForm.addEventListener('submit', getDataForm)
genderSelector.forEach(link => link.addEventListener('click', getGender));
//End events

//Events Function
async function getDataForm(event) {
    event.preventDefault();
    let searchWord = event.target[0].value
    if (searchWord === "") {
        alertsZone.innerHTML = `<div class="alert alert-danger alert-dismissible fade show mt-2" role="alert">
                                    <strong>¡¡¡Atención!!!</strong> El campo de búsqueda no puede estar vacio.
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>`
        return
    }
    const urlSearch = baseUrl + 'character/?name=' + searchWord;
    const data = await apiConnection.getData(urlSearch);
    apiConnection.printCharacters(data.results, sectionCharacters);
    buttonNavUrl(data.info.prev, data.info.next, data.info.pages);
}

async function getGender(event) {
    event.preventDefault();
    let gender = event.target.dataset.gender;
    navbarDropdown.innerText = 'Genero: ' + event.target.innerText
    const url = baseUrl + `character/?gender=` + gender;
    let data = await apiConnection.getData(url);
    buttonNavUrl(data.info.prev, data.info.next, data.info.pages);
    apiConnection.printCharacters(data.results, sectionCharacters);
}

async function goToPage(event) {
    let url = event.target.dataset.url
    const data = await apiConnection.getData(url)
    buttonNavUrl(data.info.prev, data.info.next, data.info.pages)
    getType(data)
}
//End Events Function

//General functions
function buttonNavUrl(pPrev, pNext) {
    buttons[0].removeAttribute('disabled')
    buttons[0].style.visibility = 'visible'
    buttons[1].removeAttribute('disabled')
    buttons[1].style.visibility = 'visible'

    buttons[0].dataset.url = pPrev;
    buttons[1].dataset.url = pNext;

    if (pPrev === null) {
        buttons[0].setAttribute('disabled', true)
        buttons[0].style.visibility = 'hidden'
    }
    if (pNext === null) {
        buttons[1].setAttribute('disabled', true)
        buttons[1].style.visibility = 'hidden'
    }
}

function getType(pData) {
    let prev = (pData.info.prev === null) ? "null" : pData.info.prev
    let next = (pData.info.next === null) ? "null" : pData.info.next

    if (next.includes('character') || prev.includes('character')) {
        apiConnection.printCharacters(pData.results, sectionCharacters)
    } else if ((next.includes('episode') || prev.includes('episode'))) {
        /* apiConnection.printEpisodes(pData.results, sectionEpisodes) */
        alert('episode')
    } else if ((next.includes('location') || prev.includes('location'))) {
        /* apiConnection.printLocations(pData.sectionLocations) */
        alert('location')
    }
}
//End General functions

//Init
(async () => {
    const data = await apiConnection.getData(baseUrl + 'character/?page=1')
    getType(data)
    buttonNavUrl(data.info.prev, data.info.next, data.info.pages)
    buttons.forEach(button => button.addEventListener('click', goToPage))
})()