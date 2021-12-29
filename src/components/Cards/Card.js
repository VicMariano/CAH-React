import "./Card.css";

function Card({ cardType, text }) {
  return (
    <div className={`${cardType}-card`}>
      <p className="card-text">{text}</p>
    </div>
  );
}

export default Card;
