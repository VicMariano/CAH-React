import "./Card.css";

function Card({ cardType, text, id, onSelect }) {
  return (
    <div className={`${cardType}-card`} onClick={() => onSelect(id)}>
      <p className="card-text">{text}</p>
    </div>
  );
}

export default Card;
