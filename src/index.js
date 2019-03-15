import React from 'react'
import ReactDOM from 'react-dom'
import App from "./app/app";
import PrecisaFazerLogin from './app/components/precisa_fazer_login';


let locationAval = window.location

if (locationAval.href == "http://localhost:8080/") {
    ReactDOM.render(<App />, document.getElementById('avaliacao'));
    // ReactDOM.render(<PrecisaFazerLogin />, document.getElementById('avaliacao'));
} else {
    let supposedLocation = "https://atacado.hollidaystore.com.br/pagina/pesquisa-de-satisfacao.html"
    let dataLayerEmail = dataLayer[0].email;
    if (locationAval.href == supposedLocation) {
        let docTitle = document.querySelector('h1.titulo.cor-secundaria');
        docTitle.style.display = "none"
        if (dataLayerEmail) {
            ReactDOM.render(<App />, document.getElementById('avaliacao'));
        } else {
            ReactDOM.render(<PrecisaFazerLogin />, document.getElementById('avaliacao'));
        }
    }
}
