export default class ApiMorty {

    async getData(pUrl) {
        let request = await fetch(pUrl, {
            method: 'get'
        });
        if (request.status === 200) {
            let data = await request.json();
            return data;
        }
        return request.statusText;
    }

    printCharacters(printCharacterList, pSection) {
        pSection.innerHTML = "";
        printCharacterList.forEach(character => this.printChar(character, pSection));
    }

    printChar(pCharacter, pSection) {
        let article = document.createElement('article');

        article.className = "col-12 col-sm-6 col-md-4 col-lg-3 my-2"
        article.innerHTML = `<div class="card">
                                <img src="${pCharacter.image}"
                                    class="card-img-top rounded-circle" alt="">
                                <div class="card-body">
                                    <h5 class="card-title">${pCharacter.name}</h5>
                                    <p class="card-text">${pCharacter.species}</p>
                                </div>
                            </div>`

        pSection.appendChild(article)

    }

}