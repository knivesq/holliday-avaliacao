import React from 'react'
import "./css/formulario.css"
import "./css/mobile.css"
import "./css/css-ratings/star-1.css"
import "./css/css-ratings/star-2.css"
import "./css/css-ratings/star-3.css"
import "./css/css-ratings/star-4.css"
import "./css/css-ratings/star-5.css"
import { makeCancelable, makeid } from '../utils/utils'
import { debug } from 'util';
import { loadReCaptcha, ReCaptcha } from 'react-recaptcha-google'
import { api, dev_api } from '../config/config'

let site_key = "6Lcd8ZUUAAAAAF-x9m41wYzqbVctphGu8KEUBhQy"
let site_key_dev = "6LdA8JUUAAAAAP7wMK0N87SHwIgHjGVupc7jyYuT"
let secret_key = "6Lf37JUUAAAAAGgPdqJV5xo7sO4BF2ydhpGrhoNj"

export default class Formulario extends React.Component {
    constructor() {
        super()
        this.state = {
            componentIndex: 0,
            fetchStatus: false,
            fetchClass: '',
            recaptcha: false,
            recaptchaLoaded: false,
            nome: '',
            sobrenome: '',
            ddd: '',
            telefone: '',
            cidade: '',
            estado: '',
            atendimento: '',
            preco: '',
            qualidade: '',
            variedade: '',
            no_geral: '',
            mensagem: '',
            user_email: '',
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
            estadoList: [],
            read: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
    }

    verifyCallback() {
        // Here you will get the final recaptchaToken!!!  
        console.log(recaptchaToken, "<= your recaptcha token")
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

        this.setState({
            fetchStatus: false,
            isLoading: true,
            fetchClass: 'fetch-wrapper'
        })

        // prevent form to redirect
        e.preventDefault();

        let { isLoading, nome, sobrenome, ddd, telefone, cidade, estado, atendimento, preco, qualidade, variedade, no_geral, mensagem, user_email, msg, msgCls } = this.state
        let _this = this

        // alias for state
        let state = _this.state

        // setup the api url
        let test_url = window.location.href
        let api_aval = (api.LOCATION_URL == test_url ? api.AVAL_CREATE : dev_api.DEV_AVAL_CREATE);

        // create object to post with fetch
        let objectToCreate = {
            nome: nome,
            sobrenome: sobrenome,
            ddd: ddd,
            telefone: telefone,
            cidade: cidade,
            estado: estado,
            atendimento: atendimento,
            preco: preco,
            qualidade: qualidade,
            variedade: variedade,
            no_geral: no_geral,
            mensagem: mensagem,
            user_email: user_email
        }


        // send data to the api

        fetch(api_aval, {
            method: 'POST',
            body: JSON.stringify(objectToCreate)
        })
            .then(function (response) {
                switch (response.status) {
                    case 200:
                        setTimeout(() => {
                            _this.setState({
                                isLoading: false
                            }, () => {
                                setTimeout(() => {
                                    _this.setState({
                                        fetchStatus: true,
                                    }, () => {
                                        setTimeout(() => {
                                            _this.setState({
                                                fetchClass: 'fetch-disabled'
                                            })
                                            // window.location.replace("https://hollidaystore.lojaintegrada.com.br/")
                                        }, 2000)
                                    }, 2000)
                                })
                            })
                        }, 2000)

                        break;
                    case 400:
                        setTimeout(() => {
                            _this.setState({
                                isLoading: false
                            }, () => {
                                setTimeout(() => {
                                    _this.setState({
                                        fetchStatus: true,
                                    }, () => {
                                        setTimeout(() => {
                                            _this.setState({
                                                fetchClass: 'fetch-disabled'
                                            })
                                        }, 2000)
                                    }, 2000)
                                })
                            })
                        }, 2000)
                        break;
                    case 503:
                        setTimeout(() => {
                            _this.setState({
                                isLoading: false
                            }, () => {
                                setTimeout(() => {
                                    _this.setState({
                                        fetchStatus: true,
                                    }, () => {
                                        setTimeout(() => {
                                            _this.setState({
                                                fetchClass: 'fetch-disabled'
                                            })
                                        }, 2000)
                                    }, 2000)
                                })
                            })
                        }, 2000)
                        break;
                    default:
                        setTimeout(() => {
                            _this.setState({
                                isLoading: false
                            }, () => {
                                setTimeout(() => {
                                    _this.setState({
                                        fetchStatus: true,
                                    }, () => {
                                        setTimeout(() => {
                                            _this.setState({
                                                fetchClass: 'fetch-disabled'
                                            })
                                        }, 2000)
                                    }, 2000)
                                })
                            })
                        }, 2000)
                        break;
                }
                return response.statusText;
            })
            .catch(error => {
                setTimeout(() => {
                    _this.setState({
                        isLoading: false
                    }, () => {
                        setTimeout(() => {
                            _this.setState({
                                fetchStatus: true,
                            }, () => {
                                setTimeout(() => {
                                    _this.setState({
                                        fetchClass: 'fetch-disabled'
                                    })
                                }, 2000)
                            }, 2000)
                        })
                    })
                }, 2000)
                console.log(error)
            })
    }

    componentDidMount() {
        this._isMounted = true
        if (this._isMounted) {
            loadReCaptcha();
            this.setState({
                recaptchaLoaded: true,
            })
        }

        if (this.captchaDemo) {
            console.log("started, just a second...")
            this.captchaDemo.reset();
            this.captchaDemo.execute();
        }
        this.setState({
            fetchStatus: false,
            isLoading: false,
            fetchClass: 'fetch-disabled',
            recaptcha: false,

        })



        if (api.LOCATION_URL == test_url) {
            let user_email = dataLayer[0].email
            this.setState({
                user_email: user_email
            })
        } else {
            this.setState({
                user_email: 'linkcreative.dev@gmail.com'
            })
        }


        let test_url = window.location.href
        let read_api = (api.LOCATION_URL == test_url ? api.AVAL_READ : dev_api.DEV_AVAL_READ);

        console.log(read_api)

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
        if (window.innerWidth > 425) {
            window.scrollTo(0, 208)
        }

    }

    onLoadRecaptcha() {
        if (this.captchaDemo) {
            this.captchaDemo.reset();

        }
    }

    verifyCallback(recaptchaToken) {
        // Here you will get the final recaptchaToken!!!  
        if (recaptchaToken) {
            this.setState({
                recaptcha: true
            })
        }

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let nota = [5, 4, 3, 2, 1]
        let { recaptcha, recaptchaLoaded, fetchClass, read, isLoading, nome, sobrenome, ddd, telefone, cidade, estado, atendimento, preco, qualidade, variedade, no_geral, mensagem, msg, msgCls } = this.state


        let estadoList
        let cidadeList
        if (read !== undefined && read.length > 0) {
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
                <React.Fragment key={makeid()}>
                    <input id={`atendimento${nota}`} type="radio" name="atendimento" value={nota} checked={atendimento == nota} onChange={this.handleChange} />
                    <label htmlFor={`atendimento${nota}`} name="atendimento">{nota}</label>
                </React.Fragment>
            )
        })


        let precoRadios = nota.map(nota => {
            return (
                <React.Fragment key={makeid()} >
                    <input id={`preco${nota}`} type="radio" name="preco" value={nota} checked={preco == nota} onChange={this.handleChange} />
                    <label htmlFor={`preco${nota}`} name="preco">{nota}</label>
                </React.Fragment>
            )
        })

        let qualidadeRadios = nota.map(nota => {
            return (
                <React.Fragment key={makeid()} >
                    <input id={`qualidade${nota}`} type="radio" name="qualidade" value={nota} checked={qualidade == nota} onChange={this.handleChange} />
                    <label htmlFor={`qualidade${nota}`}>{nota}</label>
                </React.Fragment>
            )
        })

        let variedadeRadios = nota.map(nota => {
            return (
                <React.Fragment key={makeid()} >
                    <input id={`variedade${nota}`} type="radio" name="variedade" value={nota} checked={variedade == nota} onChange={this.handleChange} />
                    <label htmlFor={`variedade${nota}`}>{nota}</label>
                </React.Fragment>
            )
        })

        let no_geralRadios = nota.map(nota => {
            return (
                <React.Fragment key={makeid()} >
                    <input id={`no_geral${nota}`} type="radio" name="no_geral" value={nota} checked={no_geral == nota} onChange={this.handleChange} />
                    <label htmlFor={`no_geral${nota}`}>{nota}</label>
                </React.Fragment>
            )
        })

        let cAtendimento = +atendimento
        let cPreco = +preco
        let cQualidadde = +qualidade
        let cVariedade = +variedade
        let cNo_geral = +no_geral

        let sumOfState = cAtendimento + cPreco + cQualidadde + cVariedade + cNo_geral
        let mediaDosValues = (sumOfState / 5);
        let mediaDosValuestes = Math.ceil(sumOfState / 5);

        let testMediaDosValues1 = +mediaDosValues > 0 && +mediaDosValues < 1 ? "rating-half" : mediaDosValues >= 1 ? "rating-full" : "";
        let testMediaDosValues2 = +mediaDosValues > 1 && +mediaDosValues < 2 ? "rating-half" : mediaDosValues >= 2 ? "rating-full" : "";
        let testMediaDosValues3 = +mediaDosValues > 2 && +mediaDosValues < 3 ? "rating-half" : mediaDosValues >= 3 ? "rating-full" : "";
        let testMediaDosValues4 = +mediaDosValues > 5 && +mediaDosValues < 4 ? "rating-half" : mediaDosValues >= 4 ? "rating-full" : "";
        let testMediaDosValues5 = +mediaDosValues > 4 && +mediaDosValues < 5 ? "rating-half" : mediaDosValues >= 5 ? "rating-full" : "";


        return (
            <div>
                {this.state.isLoading ?
                    <div className={`${fetchClass}`}>
                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                        <h1>Enviando formulário...</h1>
                    </div>
                    :
                    this.state.fetchStatus ?
                        <div className={`${fetchClass}`}>
                            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                            <h1>Formulário enviado com sucesso</h1>
                        </div>
                        :
                        <div className={`${fetchClass}`}>
                            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                            <h1>Falha ao enviar o formulário.</h1>
                        </div>
                }
                <div className="component-container">
                    {/* <h5 className="form-top-text">Preparamos uma pesquisa para que você passe um feedback, sugestões e elogios sobre nossa loja.</h5> */}
                    <form className={'aval-form'} method="POST" onSubmit={this.handleSubmit}>


                        <div className='input-wrapper-mobile '>
                            <div className="title-wrapping">
                                <span><h1><p>Pesquisa de Satisfação</p></h1></span>
                            </div>
                            <div className="form-feedback preencha">
                                <span><h3><p>Preencha os campos abaixo</p></h3></span>
                            </div>

                            <div className="margin-sides-10 margin-phone margin-top-10">

                                <label>Nome</label>
                                <input required type='text' name='nome' id='nome' value={nome} onChange={this.handleChange} placeholder="Digite aqui seu primeiro nome" />
                            </div>

                            <div className="margin-sides-10 margin-phone">
                                <label>Sobrenome</label>
                                <input required type='text' name='sobrenome' id='sobrenome' value={sobrenome} onChange={this.handleChange} placeholder="Digite aqui seu útimo nome" />
                            </div>

                            <div className="ddd-telefone margin-sides-10 margin-phone">
                                <div className='ddd'>
                                    <label>DDD</label>
                                    <input required type='text' name='ddd' id='ddd' value={ddd} onChange={this.handleChange} placeholder="ddd" />
                                </div>
                                <div className=''>
                                    <label>Telefone</label>
                                    <input required type='text' name='telefone' id='telefone' value={telefone} onChange={this.handleChange} placeholder="Digite aqui seu telefone" />
                                </div>
                            </div>

                            <div className="margin-sides-10 cidade-input margin-phone">
                                <label>Cidade</label>
                                <input required list="cidade-list" className='input-cidade' type='text' name='cidade' value={cidade} onChange={this.handleChange} placeholder="Digite aqui o nome da sua cidade" />
                                <datalist id="cidade-list">
                                    {cidadeList}
                                </datalist>
                            </div>

                            <div className="margin-sides-10 estado-input margin-phone" >
                                <label>Estado</label>
                                <input required list='estado-list' className='input-estado' type='text' name='estado' value={estado} onChange={this.handleChange} placeholder="Digite aqui a sigla do seu estado, exemplo: PE" />
                                <datalist id="estado-list">
                                    {estadoList}
                                </datalist>
                            </div>
                        </div>

                        <div className="input-wrapper">
                            <div className="form-feedback">
                                <span><h3><p>Avalie Sua Compra</p></h3></span>
                            </div>
                            <div className="form-aval">
                                <div className="title-wrapper">
                                    <h4 className='mini-title'>Atendimento</h4>
                                </div>
                                <div className='box-wrapper'>
                                    <span className="rating-1">
                                        {atendimentoRadios}
                                    </span>
                                </div>
                            </div>

                            <div className="form-aval">
                                <div className="title-wrapper">
                                    <h4 className='mini-title'>Preço</h4>
                                </div>
                                <div className='box-wrapper'>
                                    <span className="rating-2">
                                        {precoRadios}
                                    </span>
                                </div>
                            </div>

                            <div className="form-aval">
                                <div className="title-wrapper">
                                    <h4 className='mini-title'>Qualidade</h4>
                                </div>
                                <div className='box-wrapper'>
                                    <span className="rating-3">
                                        {qualidadeRadios}
                                    </span>
                                </div>
                            </div>

                            <div className="form-aval">
                                <div className="title-wrapper">
                                    <h4 className='mini-title'>Variedade</h4>
                                </div>
                                <div className='box-wrapper'>
                                    <span className="rating-4">
                                        {variedadeRadios}
                                    </span>
                                </div>
                            </div>

                            <div className="form-aval">
                                <div className="title-wrapper">
                                    <h4 className='mini-title'>No geral</h4>
                                </div>
                                <div className='box-wrapper'>
                                    <span className="rating-5">
                                        {no_geralRadios}
                                    </span>
                                </div>
                            </div>
                            <div className="overall margin-top-10">
                                <div className="form-feedback-overall margin-0">
                                    <h3><p>Satisfação Geral</p></h3>
                                    <div className="flex-row">
                                        <span className={`rating ${testMediaDosValues1} `}><label htmlFor=""></label></span>
                                        <span className={`rating ${testMediaDosValues2}`}><label htmlFor=""></label></span>
                                        <span className={`rating ${testMediaDosValues3}`}><label htmlFor=""></label></span>
                                        <span className={`rating ${testMediaDosValues4}`}><label htmlFor=""></label></span>
                                        <span className={`rating ${testMediaDosValues5}`}><label htmlFor=""></label></span>
                                    </div>
                                </div>
                            </div>

                            <div className="textarea-wrapper">

                                <label htmlFor="form-textarea">
                                    <div className="form-feedback margin-0">
                                        <h3 ><p>Comente sua experiência</p></h3>
                                    </div>
                                </label>
                                <textarea required className="form-textarea margin-top-10" value={mensagem} name="mensagem" onChange={this.handleChange} placeholder="Digite sua mensagem"></textarea>
                                <div>
                                    {
                                        recaptchaLoaded ?
                                            <ReCaptcha
                                                ref={(el) => { this.captchaDemo = el; }}
                                                size="normal"
                                                data-theme="dark"
                                                render="explicit"
                                                sitekey={site_key}
                                                onloadCallback={this.onLoadRecaptcha}
                                                verifyCallback={this.verifyCallback}
                                                hl={"pt"}
                                            />
                                            : ''

                                    }

                                </div>
                                <div>
                                    {recaptcha ?
                                        <input className="form-btn" type="submit" value="ENVIAR" />
                                        :
                                        <div className="form-btn-disabled">ENVIAR</div>
                                    }


                                </div>
                            </div>

                        </div>

                        <div className="input-wrapper">
                            <div className="text-wrap">
                                <div>
                                    <h3>ATENÇÃO</h3>
                                </div>
                                <div>
                                    Todas as avaliações e mensagens serão exibidas publicamente em nossa loja virtual, para que outros clientes possam tomar sua decisão de comprar em nossa empresa. Portanto, pedimos que faça um comentário sincero e com responsabilidade, baseado na sua experiência de compras aqui na Holliday Store.
                                </div>
                                <br />
                                <div>
                                    <p>

                                        Caso tenha tido uma experiência negativa, entre em contato conosco <a href="http://bit.ly/pesquisadesatisfacaolojaholliday" target="_blank"><strong>clicando aqui</strong></a> agora mesmo ou nos chamando no WhatsApp (81) 9 9289-5042, para que possamos te ajudar a reverter essa situação.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>



                </div>
            </div >
        )
    }
}