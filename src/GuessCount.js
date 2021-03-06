import React from 'react';
import PropTypes from 'prop-types';
import './GuessCount.css';

// composant pur fonctionnel ou fonction pure
const GuessCount = ({ guesses }) => (
	<div className="guesses">
		{guesses > 54 ? <h2>Vous avez perdu ! Rejouez !</h2> : <p>Vous avez tenté : {guesses} fois</p>}
	</div>
);

// pour déclarer valeur par défault, déclenchera l'avertissement dans la console si erreur
GuessCount.propTypes = {
	guesses: PropTypes.number.isRequired
};

export default GuessCount;
