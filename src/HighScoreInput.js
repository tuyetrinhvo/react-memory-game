import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './HighScoreInput.css';
import { saveHOEntry } from './HallOfFame';

class HighScoreInput extends Component {
	state = { winner: '' }; // transforme value de l'input en champ contrôlé

	// Arrow function for bidding
	// on utilise l'initialiseur pour pouvoir passer par référence
	handleWinnerUpdate = event => {
		this.setState({ winner: event.target.value.toUpperCase() });
	};

	// Arrow function for bidding
	// on utilise l'initialiseur pour pouvoir passer par référence
	persistWinner = event => {
		// empêcher le comportement par défault de la soumission, cad la navigation complète vers un serveur
		event.preventDefault();
		const newEntry = {
			guesses: this.props.guesses,
			player: this.state.winner
		};
		// onStored est une fonction de rappel (callback)
		// onStored appellera avec le tableau hallOfFame à jour
		// une fois celui-ci ajusté et persisté dans le navigateur
		saveHOEntry(newEntry, this.props.onStored);
	};
	render () {
		return (
			<form className="highScoreInput" onSubmit={this.persistWinner}>
				<p>
					<label>
						Bravo ! Entrez ton prénom ou Pressez ENTREE pour une nouvelle partie
						<input
							type="text"
							autoComplete="given-name"
							value={this.state.winner}
							onChange={this.handleWinnerUpdate}
						/>
					</label>
					<button type="submit">J'ai gagné !</button>
				</p>
			</form>
		);
	}
}

HighScoreInput.propTypes = {
	guesses: PropTypes.number.isRequired,
	onStored: PropTypes.func.isRequired
};

export default HighScoreInput;
