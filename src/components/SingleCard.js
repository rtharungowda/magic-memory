import './SingleCard.css';
import cover from "../img/cover.png" 

function SingleCard(props){
    const card = props.card;
    const handleChoice = props.handleChoice;
    const isFlipped = props.isFlipped;
    const isTwoFlipped = props.isTwoFlipped;

    function handleClick(){
        handleChoice(card);
    }

    return(
        <div className="card">
          <div className={ isFlipped ? "flipped" : "" }>
            <img className='front' src={card.src} alt="card front" />
            <img 
                className='back' 
                src={ cover }
                alt="card back" 
                onClick={ isTwoFlipped ? null :handleClick }
            />
          </div>
        </div>
    );
}

export default SingleCard;