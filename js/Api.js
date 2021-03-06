/* "https://rickandmortyapi.com/api/" */

export default class Api {

    constructor(pBaseUrl) {
        this.baseUrl = pBaseUrl
    }

    async getInfo(pType, pAttributte = "", pValue = "") {
        const url = this.baseUrl + pType + "/" + pAttributte + "/" + pValue;
        let request = await fetch(url, {
            method: 'GET'
        })
        let response = await request.json();
        return response
    }

    async getSortedInfo(pType, pAttributte, pValue) {
        /* https://rickandmortyapi.com/api/character/?name=rick&status=alive */
        const url = this.baseUrl + pType + "/?" + pAttributte + "=" + pValue;
        let request = await fetch(url, {
            method: 'GET'
        })
        let response = await request.json();
        return response
    }

}