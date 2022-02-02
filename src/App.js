import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
import helmet from './img/helmet-1.png';
import potion from './img/potion-1.png';
import ring from './img/ring-1.png';
import scroll from './img/scroll-1.png';
import shield from './img/shield-1.png';
import sword from './img/sword-1.png';

const  cardImages = [
  {'src': helmet, "matched":false},
  {'src': potion, "matched":false},
  {'src': ring, "matched":false},
  {'src': scroll, "matched":false},
  {'src': shield, "matched":false},
  {'src': sword, "matched":false},
];

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [isTwoFlipped, setIsTwoFlipped] = useState(false);

  function resetTurn(){
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(turns + 1);
    setIsTwoFlipped(false);
  }

  function shuffleCards(){
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(function(){
        return (Math.random() - 0.5);
      })
      .map(function(card){
        return ({...card, id: Math.random()});
      });
    
    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
  };

  useEffect(function(){
    shuffleCards();
  }, []);

  useEffect(function(){
    if(choiceOne !== null && choiceTwo !== null){
      setIsTwoFlipped(true);
      if(choiceOne.src === choiceTwo.src){
        setCards(function(prevCards){
          return (prevCards.map(function(card){
            if(card.src === choiceOne.src){
                card.matched = true;
                return {...card, "matched":true};
            }
            return card;
          }));
        });
        resetTurn();
      }
      else{
        setTimeout(function(){
          resetTurn();
        }, 500);
      }
    }
  }, [choiceTwo])

  // console.log(cards);

  function handleChoice(card){
    if( choiceOne === null){
      setChoiceOne(card);
    }
    else{
      setChoiceTwo(card);
    }
  }
  
  return (
    <div className="App">
      <h1>Memory match</h1>
      <button onClick={ shuffleCards }>New Game</button>
      <div className="card-grid">
        { cards.map( function(card){
          return(<SingleCard
              key = { card.id } 
              card={ card }
              handleChoice= { handleChoice }
              isFlipped = { (card === choiceOne) || (card === choiceTwo) || card.matched }
              isTwoFlipped = {isTwoFlipped}
            />
          );
        })}
      </div>
      <p>Turns: { turns }</p>
    </div>
  );
}

export default App;
