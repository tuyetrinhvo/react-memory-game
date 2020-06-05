import React, { Component } from 'react';
import './App.css';
import GuessCount from './GuessCount';
import Card from './Card';
import shuffle from 'lodash.shuffle';
import Clock from './Clock';
import HighScoreInput from './HighScoreInput';
import HallOfFrame from './HallOfFame';
import Winner from './Winner';

const SIDE = 6,
	SYMBOLS = '😀🎉💖🥰🎀😎🌼🧁😇🍀🍩🍑🥳🦋💩🧚‍♀️💍🐬👑🍄🌸🍔',
	VISUAL_PAUSE_MSECS = 750,
	END_GAME = 3000;

class App extends Component {
	// un initialiseur de champ d'instance
	// les initialiseurs sont exécutés avant tout constructeur
	// cards : un champ temporaire
	/*  cards = this.generateCards(); */

	// transforme la méthode d'instance handleCardClicked(card){}
	// en un initialiseur de champ d'instance avec une fonction fléchée
	// pour garantir conserver le this du composant App
	/*   handleCardClicked = card => {
    console.log(card, "clicked", this);
  } */

	// ou on peut mettre ces deux initialiseurs dans le constructeur
	// pour garantir conserver le this du composant App
	/*  constructor(props){
    super(props);
    this.cards = this.generateCards();
    this.handleCardClicked = card => {
      console.log(card, "clicked", this);
    }
  }
*/
	// un initialiseur de champ d'instance, et c'est un
	// Etat local, strictement privé, les autres composants ne peuvent pas y accéder
	state = {
		cards: [],
		currentPair: [],
		guesses: 0,
		matchedCardIndices: [], // liste positions des cartes déjà retournés, visible permanente
		hallOfFame: null
	};

	// Arrow function for bidding
	// on utilise l'initialiseur pour pouvoir passer par référence
	displayHallOfFrame = hallOfFame => {
		this.setState({ hallOfFame });
	};

	componentDidMount () {
		window.addEventListener('keyup', e => {
			if (e.keyCode === 13) {
				this.initGame();
			}
		});
		this.initGame();
	}

	getFeedbackForCard (index) {
		const { currentPair, matchedCardIndices } = this.state;
		const indexMatched = matchedCardIndices.includes(index); // true or false

		if (currentPair.length < 2) {
			return indexMatched || index === currentPair[0] ? 'visible' : 'hidden';
		}

		if (currentPair.includes(index)) {
			return indexMatched ? 'justMatched' : 'justMismatched';
		}

		return indexMatched ? 'visible' : 'hidden';
	}

	handleCardClicked = index => {
		const { currentPair } = this.state;

		if (currentPair.length === 2) {
			return;
		}

		if (currentPair.length === 0) {
			this.setState({ currentPair: [ index ] });
			return;
		}

		this.handleNewPairClosedBy(index);
	};

	handleNewPairClosedBy (index) {
		const { cards, currentPair, guesses, matchedCardIndices } = this.state;

		const newPair = [ currentPair[0], index ];
		const newGuesses = guesses + 1;
		const matched = cards[newPair[0]] === cards[newPair[1]];

		this.setState({ currentPair: newPair, guesses: newGuesses });

		if (matched) {
			this.setState({ matchedCardIndices: [ ...matchedCardIndices, ...newPair ] });
		}

		if (guesses === 54) {
			this.setState({ cards: [] });
			setTimeout(() => this.initGame(), END_GAME);
		}

		setTimeout(() => this.setState({ currentPair: [] }), VISUAL_PAUSE_MSECS);
	}

	generateCards () {
		const result = [],
			size = SIDE * SIDE,
			candidates = shuffle(SYMBOLS);

		while (result.length < size) {
			const card = candidates.pop();
			result.push(card, card);
		}
		return shuffle(result);
	}

	initGame () {
		this.setState({
			cards: this.generateCards(),
			currentPair: [],
			guesses: 0,
			matchedCardIndices: [],
			hallOfFame: null
		});
	}

	// index : position de card dans le tableau symbol
	render () {
		// destructure depuis this.state
		const { cards, guesses, matchedCardIndices, hallOfFame } = this.state;
		const won = matchedCardIndices.length === cards.length; // tous les cartes sont retournées de façon permanente
		return (
			<div className="memory">
				<GuessCount guesses={guesses} />
				<Clock guesses={guesses} won={won} />
				{cards.map((card, index) => (
					<Card
						card={card}
						feedback={this.getFeedbackForCard(index)}
						key={index}
						index={index}
						onclick={this.handleCardClicked}
						won={won}
					/>
				))}

				{won &&
					guesses < 55 &&
					(hallOfFame ? (
						<div>
							<Winner />
							<HallOfFrame entries={hallOfFame} />
						</div>
					) : (
						<div>
							<HighScoreInput guesses={guesses} onStored={this.displayHallOfFrame} />
						</div>
					))}
			</div>
		);
	}
}

export default App;
