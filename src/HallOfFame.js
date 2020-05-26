import React from 'react'
import PropTypes from 'prop-types'

import './HallOfFame.css'


// composant pur fonctionnel ou fonction pure
const HallOfFame = ({entries}) => (
    <table className="hallOfFame">
        <tbody>
            {/*entries.map(({id, date, guesses, player}) => (
                <tr key={id}>
                    <td className="date">{date}</td>
                    <td className="guesses">{guesses}</td>
                    <td className="player">{player}</td>
                </tr>
            ))*/}
            { entries.map((entry) => (
                <tr key={entry.id}>
                    <td className="date">{entry.date}</td>
                    <td className="guesses">{entry.guesses}</td>
                    <td className="player">{entry.player}</td>
                </tr>
            )) }
        </tbody>
    </table>
);

HallOfFame.propTypes = {
    entries: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            guesses: PropTypes.number.isRequired,
            date: PropTypes.string.isRequired,
            player: PropTypes.string.isRequired,
        })
    ).isRequired,
}

export default HallOfFame

// == Internal helpers

export const FAKE_HOF = [
    { id: 3, guesses: 18, date: '10/05/2020', player: 'R' },
    { id: 2, guesses: 23, date: '11/05/2020', player: 'T' },
    { id: 1, guesses: 31, date: '06/15/2020', player: 'M' },
    { id: 0, guesses: 48, date: '14/05/2020', player: 'ttvo' },
]
