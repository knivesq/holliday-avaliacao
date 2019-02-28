import React from 'react'
import { firstLetterToUpperCase } from '../utils/utils'

export default class EvalComponent extends React.Component {
    constructor() {
        super()
    }
    render() {
        let nota = [1, 2, 3, 4, 5]
        let list = nota.map(nota => {
            return (
                <div key={`${this.props.type}-${nota}`} className={`${this.props.type}-radios`}>
                    <input id={`${this.props.type}-${nota}`} type="radio" name={this.props.type} value={nota} checked={this.props.estado == nota} onChange={this.props.handleChange} />
                    <label htmlFor={`${this.props.type}-${nota}`}>{nota}</label>
                </div>
            )
        })
        return (
            <div>
                <h3 className='mini-title'>{firstLetterToUpperCase(this.props.type)}</h3>
                <div className='box-wrapper'>
                    <div className='nota-wrapper'>
                        <div>Ruim</div>
                        <div>Excelente</div>
                    </div>
                    <div className='radio-wrapper'>
                        {list}
                    </div>
                </div>
            </div>
        )
    }
}