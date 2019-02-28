import React from 'react'
import ReactDOM from 'react-dom'
import App from "./app/app";

let location = window.location
let supposedLocation = "https://www.hollidaystore.com/pagina/pesquisa-de-satisfacao.html"

if (location.href == supposedLocation) {
    ReactDOM.render(<App />, document.getElementById('avaliacao'));
}


