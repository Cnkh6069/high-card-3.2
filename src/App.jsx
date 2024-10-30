import logo from "/logo.png";
import "./App.css";
import { makeShuffledDeck } from "./utils.jsx";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Alert, Image } from "react-bootstrap";

function App(props) {
  // Set default value of card deck to new shuffled deck
  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
  // currCards holds the cards from the current round
  const [currCards, setCurrCards] = useState([]);
  //set state of number of rounds P1 and P2 won
  const [p1RoundsWon, setp1RoundWon] = useState(0);
  const [p2RoundsWon, setp2RoundWon] = useState(0);

  //Function to deal cards
  const dealCards = () => {
    const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
    setCurrCards(newCurrCards);

    // get the ranks of P1 and P2 cards and compare

    if (newCurrCards[0].rank > newCurrCards[1].rank) {
      setp1RoundWon(p1RoundsWon + 1);
    }
    if (newCurrCards[0].rank < newCurrCards[1].rank) {
      const newP2Score = p2RoundsWon + 1;
      setp2RoundWon(newP2Score);
    }
  };
  let numGamesLeft = cardDeck.length / 2;
  let gameWinner = null;
  if (p1RoundsWon > p2RoundsWon) {
    gameWinner = 1;
  } else if (p2RoundsWon > p1RoundsWon) {
    gameWinner = 2;
  }

  const endGameMsg = gameWinner ? (
    <p>Player {gameWinner} won the game!</p>
  ) : (
    <p>It is a draw</p>
  );

  const currCardElems = currCards.map(({ name, suit }) => (
    // Give each list element a unique key
    <div key={`${name}${suit}`}>
      {name} of {suit}
    </div>
  ));
  const ButtonText = cardDeck.length === 0 ? "Restart Game" : "Reset";
  const ButtonText1 = cardDeck.length === 0 ? "" : "Deal";

  const handleReset = () => {
    setCardDeck(makeShuffledDeck());
    setp1RoundWon(0);
    setp2RoundWon(0);
    setCurrCards([]);
  };
  // You can write JavaScript here, just don't try and set your state!
  // - Determine who has won each round (P1 or P2)
  //Keep score during each game (how many rounds has each player won)
  //Declare a winner at the end of each game when deck has run out of cards, and give the players the option to restart the game.

  // You can access your current components state here, as indicated below

  return (
    <Container>
      <Row>
        <Col>
          <Image width="50%" src={logo} alt="Rocket logo" />
        </Col>
      </Row>
      <Row>
        <h2>React High Card 🚀</h2>
        <h3>{cardDeck.length} cards left!</h3>
      </Row>
      <Row>
        <Col className="column">{numGamesLeft === 0 && endGameMsg}</Col>
      </Row>
      <Row>{currCardElems}</Row>
      <Row>
        <Col className="column">Player 1 drew {currCardElems[0]}</Col>
        <Col className="column">and</Col>
        <Col className="column">Player 2 drew {currCardElems[1]}</Col>
      </Row>
      <Row>
        <Col className="column">Player 1 Score</Col>
        <Col className="column">vs.</Col>
        <Col className="column">Player 2 Score</Col>
      </Row>
      <Row>
        <Col className="column">{p1RoundsWon}</Col>
        <Col className="column">vs.</Col>
        <Col className="column">{p2RoundsWon}</Col>
      </Row>
      <Row>
        <Col className="column">
          <Button variant="primary" onClick={dealCards}>
            {ButtonText1}
          </Button>
        </Col>
        <Col className="column">
          <Button variant="secondary" onClick={handleReset}>
            {ButtonText}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
