import React from 'react'
import "./formulario.css"
import { makeCancelable } from '../utils/utils'
import { debug } from 'util';


const EvalComponent = (props) => {
    let nota = [1, 2, 3, 4, 5]
    let list = nota.map(nota => {
        return (
            <div key={`${props.type}-${nota}`} className={`${props.type}-radios`}>
                <input id={`${props.type}-${nota}`} type="radio" name={props.type} value={nota} checked={props.estate == nota} onChange={props.handleChange} />
                <label htmlFor={`${props.type}-${nota}`}>{nota}</label>
            </div>
        )
    })
    return (
        <React.Fragment>
            {list}
        </React.Fragment>
    )

}


export default class Formulario extends React.Component {
    constructor() {
        super()
        this.state = {
            componentIndex: 0,
            control: false,
            nome: '',
            sobrenome: '',
            cidade: '',
            estado: '',
            atendimento: '',
            preco: '',
            qualidade: '',
            variedade: '',
            no_geral: '',
            mensagem: '',
            msg: {},
            msgCls: '',
            selectedOption: {
                atendimento: '1',
                preco: '1',
                qualidade: '1',
                variedade: '1',
                no_geral: '1',
            },
            isLoading: false,
            estadoList: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleResponse = this.handleResponse.bind(this)
    }

    handleChange(e) {
        if (e.target.type == 'checkbox') {
            this.setState({
                [e.target.name]: !this.state[e.target.name]
            })
        } else if (e.target.type == 'radio') {

            this.setState({
                [e.target.name]: e.target.value,
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    handleSubmit(e) {

        // prevent form to redirect
        e.preventDefault();

        let { isLoading, nome, sobrenome, cidade, estado, atendimento, preco, qualidade, variedade, no_geral, mensagem, msg, msgCls } = this.state
        let _this = this

        // alias for state
        let state = _this.state

        // set up the api url
        let api_aval = "http://localhost/holliday-painel-api/api/avaliacoes/create.php";

        // create object to post with fetch
        let objectToCreate = {
            nome: nome,
            sobrenome: sobrenome,
            cidade: cidade,
            estado: estado,
            atendimento: atendimento,
            preco: preco,
            qualidade: qualidade,
            variedade: variedade,
            no_geral: no_geral,
            mensagem: mensagem,
        }


        // send data to the api

        fetch(api_aval, {
            method: 'POST',
            body: JSON.stringify(objectToCreate)
        })
            .then(function (response) {
                console.log(response)
                switch (response.status) {
                    case 200:
                        _this.setState({
                            msgCls: 'success'
                        })
                        break;
                    case 400:
                        _this.setState({
                            msgCls: 'danger'
                        })
                        break;
                    case 503:
                        _this.setState({
                            msgCls: 'danger'
                        })
                        break;
                    default:
                        _this.setState({
                            msgCls: 'danger'
                        })
                        break;
                }
                return response.statusText;
            })
            .then(response => {
                this.setState({
                    control: true
                })
            })
            .catch(error => console.log(error))
    }

    handleResponse(response) {
        if (!this._isMounted) return;
    }


    componentDidMount() {

        this._isMounted = true
        this.setState({
            control: false,
            isLoading: true,
        })
        let read_api = "http://localhost/holliday-painel-api/api/avaliacoes/read.php"

        fetch(read_api)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText)
                } else {
                    return response
                }
            })
            .then(response => response.json())
            .then(response => {
                if (this._isMounted) {

                    this.setState({
                        read: response.records,
                        isLoading: false
                    })
                }
            })
            .catch(error => {
                if (this._isMounted) {
                    this.setState({
                        isLoading: false
                    })
                    console.log(error)
                }
            })

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let nota = [1, 2, 3, 4, 5]
        let { read, isLoading, nome, sobrenome, cidade, estado, atendimento, preco, qualidade, variedade, no_geral, mensagem, msg, msgCls } = this.state


        if (isLoading) {
            return <p>Loading ...</p>;
        }
        let estadoList
        let cidadeList
        if (read !== undefined) {
            estadoList = read.map(read => read.estado)
                .filter((estado, index) => estado.indexOf(estado) == index)
                .map((estado, index) => {
                    return (
                        <option className={'form-option'} value={estado.toUpperCase()} key={`option-${index}`} >
                            {estado.toUpperCase()}
                        </option>
                    )
                })

            cidadeList = read.map(read => read.cidade)
                .filter((cidade, index) => cidade.indexOf(cidade) == index)
                .map((cidade, index) => {
                    return (
                        <option className={'form-option'} value={cidade.toUpperCase()} key={`option-${index}`} >
                            {cidade.toUpperCase()}
                        </option>
                    )
                })


        }


        let atendimentoRadios = nota.map(nota => {
            return (
                <div key={`atendimento-${nota}`} className="form-radios">
                    <input id={`atendimento-${nota}`} type="radio" name="atendimento" value={nota} checked={atendimento == nota} onChange={this.handleChange} />
                    <label htmlFor={`atendimento-${nota}`}>{nota}</label>
                </div>
            )
        })

        let precoRadios = nota.map(nota => {
            return (
                <div key={`preco-${nota}`} className="form-radios">
                    <input id={`preco-${nota}`} type="radio" name="preco" value={nota} checked={preco == nota} onChange={this.handleChange} />
                    <label htmlFor={`preco-${nota}`}>{nota}</label>
                </div>
            )
        })

        let qualidadeRadios = nota.map(nota => {
            return (
                <div key={`qualidade-${nota}`} className="form-radios">
                    <input id={`qualidade-${nota}`} type="radio" name="qualidade" value={nota} checked={qualidade == nota} onChange={this.handleChange} />
                    <label htmlFor={`qualidade-${nota}`}>{nota}</label>
                </div>
            )
        })

        let variedadeRadios = nota.map(nota => {
            return (
                <div key={`variedade-${nota}`} className="form-radios">
                    <input id={`variedade-${nota}`} type="radio" name="variedade" value={nota} checked={variedade == nota} onChange={this.handleChange} />
                    <label htmlFor={`variedade-${nota}`}>{nota}</label>
                </div>
            )
        })

        let no_geralRadios = nota.map(nota => {
            return (
                <div key={`no_geral-${nota}`} className="form-radios">
                    <input id={`no_geral-${nota}`} type="radio" name="no_geral" value={nota} checked={no_geral == nota} onChange={this.handleChange} />
                    <label htmlFor={`no_geral-${nota}`}>{nota}</label>
                </div>
            )
        })

        return (
            <div>
                {
                    msgCls == "success"
                }
                <div>
                    <h5 className="form-top-text">Preparamos uma pesquisa para que você passe um feedback, sugestões e elogios sobre nossa loja.</h5>
                    <form className={'aval-form'} method="POST" onSubmit={this.handleSubmit}>

                        <div className='input-wrapper'>
                            <div className="margin-sides-10 margin-phone">

                                <label>Nome</label>
                                <input type='text' name='nome' id='nome' value={nome} onChange={this.handleChange} placeholder="Digite seu nome" />
                            </div>

                            <div className="margin-sides-10 margin-phone">
                                <label>Sobrenome</label>
                                <input type='text' name='sobrenome' id='sobrenome' value={sobrenome} onChange={this.handleChange} placeholder="Digite seu sobrenome" />
                            </div>

                            <div className="margin-sides-10 cidade-input margin-phone">
                                <label>Cidade</label>
                                <input list="cidade-list" className='input-cidade' type='text' name='cidade' value={cidade} onChange={this.handleChange} placeholder="Cidade" />
                                <datalist id="cidade-list">
                                    {cidadeList}
                                </datalist>
                            </div>

                            <div className="margin-sides-10 estado-input margin-phone" >
                                <label>Estado</label>
                                <input list='estado-list' className='input-estado' type='text' name='estado' value={estado} onChange={this.handleChange} placeholder="Estado" />
                                <datalist id="estado-list">
                                    {estadoList}
                                </datalist>
                            </div>
                        </div>
                        <hr />
                        <div className="form-aval">
                            <h3 className='mini-title'>Atendimento</h3>
                            <div className="radio-text">Qual nota você daria para nosso atendimento?</div>
                            <div className='box-wrapper'>
                                <div className='nota-wrapper'>
                                    <div>Ruim</div>
                                    <div>Excelente</div>
                                </div>
                                <div className='radio-wrapper'>
                                    {atendimentoRadios}
                                </div>
                            </div>

                        </div>
                        <hr />
                        <div className="form-aval">
                            <h3 className='mini-title'>Preço</h3>
                            <div className="radio-text">O que você achou dos preços dos produtos?</div>
                            <div className='box-wrapper'>
                                <div className='nota-wrapper'>
                                    <div>Ruim</div>
                                    <div>Excelente</div>
                                </div>
                                <div className='radio-wrapper'>
                                    {precoRadios}
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="form-aval">
                            <h3 className='mini-title'>Qualidade</h3>
                            <div className="radio-text">O que você achou da qualidade?</div>
                            <div className='box-wrapper'>
                                <div className='nota-wrapper'>
                                    <div>Ruim</div>
                                    <div>Excelente</div>
                                </div>
                                <div className='radio-wrapper'>
                                    {qualidadeRadios}
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="form-aval">
                            <h3 className='mini-title'>Variedade</h3>
                            <div className="radio-text">Qual nota você dá a variedade de nossos produtos?</div>
                            <div className='box-wrapper'>
                                <div className='nota-wrapper'>
                                    <div>Ruim</div>
                                    <div>Excelente</div>
                                </div>
                                <div className='radio-wrapper'>
                                    {variedadeRadios}
                                </div>
                            </div>
                        </div>
                        <hr />

                        <div className="form-aval">
                            <h3 className='mini-title'>No geral</h3>
                            <div className="radio-text">No geral, o que você achou da Holliday Store?</div>
                            <div className='box-wrapper'>
                                <div className='nota-wrapper'>
                                    <div>Ruim</div>
                                    <div>Excelente</div>
                                </div>
                                <div className='radio-wrapper'>
                                    {no_geralRadios}
                                </div>
                            </div>
                        </div>
                        <div>

                            <label htmlFor="form-textarea">
                                <h3 className='mini-title'>Sugestões e Elogios</h3>
                            </label>
                            <div>
                                <p>Conte-nos um pouco da sua experiência, pontos fortes, </p>
                                <p>fracos e o que você acha que pode melhorar:</p>
                            </div>
                            <textarea className="form-textarea" value={mensagem} name="mensagem" onChange={this.handleChange} placeholder="Deixe sugestões e elogios"></textarea>
                        </div>

                        <div>
                            <input className="form-btn" type="submit" value="enviar" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}