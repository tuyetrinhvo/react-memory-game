import React from 'react'
import PropTypes from 'prop-types'
import './Card.css'

const HIDDEN_SYMBOL = '❓';

// composant pur fonctionnel ou fonction pure
// la fonction renvoie directement une grappe de DOM virtuel, sans calcul préalable,
// on dispense des accolades de bloc return
// card, feedback, onclick sont les props (propriétés)
// onClick est un évènement dans JSX
const Card = ({card, feedback, index, onclick, won}) => {
    if(!won) {
        return ( 
        <div className={`card ${feedback}`} onClick={() => onclick(index)}>
            <span className="symbol">
            {feedback === 'hidden' ? HIDDEN_SYMBOL : card}
            </span>
        </div> 
        )
    } else {
        return <div></div>
    }

}

Card.propTypes = {
    card: PropTypes.string.isRequired,
    feedback: PropTypes.oneOf([
        'hidden',
        'justMatched',
        'justMismatched',
        'visible',
    ]).isRequired,
    index: PropTypes.number.isRequired,
    onclick: PropTypes.func.isRequired
}

export default Card