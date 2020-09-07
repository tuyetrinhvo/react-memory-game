import React from 'react';
import './Winner.css';

// composant pur fonctionnel ou fonction pure
const Winner = ({ onclick }) => (
	<div onClick={() => onclick()}>
		<p className="winner">
			<span role="img" aria-label="trophy">
				🏆
			</span>
		</p>
		<p className="winner">BRAVO ! Pressez ENTREE ou Cliquez ici pour une nouvelle partie.</p>
	</div>
);

export default Winner;
