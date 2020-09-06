import React from 'react';
import PropTypes from 'prop-types';

import './HallOfFame.css';

// composant pur fonctionnel ou fonction pure
const HallOfFame = ({ entries }) => (
	<div id="fame-block">
		<h3>Tableau des gagnants</h3>
		<table className="hallOfFame">
			<thead>
				<tr>
					<th>Date</th>
					<th>Nombre de tentatives</th>
					<th>Prénom</th>
				</tr>
			</thead>
			<tbody>
				{entries.map(({ id, date, guesses, player }) => (
					<tr key={id}>
						<td className="date">{date}</td>
						<td className="guesses">{guesses}</td>
						<td className="player">{player}</td>
					</tr>
				))}
				{/* { entries.map((entry) => (
                <tr key={entry.id}>
                    <td className="date">{entry.date}</td>
                    <td className="guesses">{entry.guesses}</td>
                    <td className="player">{entry.player}</td>
                </tr>
            )) } */}
			</tbody>
		</table>
	</div>
);

HallOfFame.propTypes = {
	entries: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			guesses: PropTypes.number.isRequired,
			date: PropTypes.string.isRequired,
			player: PropTypes.string.isRequired
		})
	).isRequired
};

export default HallOfFame;

// == Internal helpers

export const FAKE_HOF = [
	{ id: 3, guesses: 18, date: '10/05/2020', player: 'R' },
	{ id: 2, guesses: 23, date: '11/05/2020', player: 'T' },
	{ id: 1, guesses: 31, date: '06/15/2020', player: 'M' },
	{ id: 0, guesses: 48, date: '14/05/2020', player: 'ttvo' }
];

const HOF_KEY = '::Memory::HallofFrame',
	HOF_MAX_SIZE = 10;

export function saveHOEntry (entry, onStored){
	entry.date = new Date().toLocaleDateString();
	entry.id = Date.now();

	// JSON.parse : string en Objet Js
	const entries = JSON.parse(localStorage.getItem(HOF_KEY) || '[]');

	// vérifie dans le tableau entries, s'il existe la nouvelle valeur guesses qui
	// satisfait la condition : cette valeur doit être plus grand ou égal à la valeur guesses de l'entry existant
	const insertionPoint = entries.findIndex(({ guesses }) => guesses >= entry.guesses);

	// Si on ne trouve pas la nouvelle valeur guesses qui satisfait la condition là haut,
	// on l'ajoute son nouveau entry
	if (insertionPoint === -1) {
		entries.push(entry);
	}
	else {
		entries.splice(insertionPoint, 0, entry); // sinon, on insère l'entry à l'indice que la nouvelle guesses se trouve
	}

	if (entries.length > HOF_MAX_SIZE) {
		entries.splice(HOF_MAX_SIZE, entries.length);
	}

	// JSON.stringify : Objet Js en String format Json
	localStorage.setItem(HOF_KEY, JSON.stringify(entries));
	onStored(entries);
}
