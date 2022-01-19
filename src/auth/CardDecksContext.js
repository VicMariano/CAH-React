import { useState, createContext } from "react";

export const CardDeckContext = createContext([]);

const CardDecksProvider = (props) => {
  const [whiteDeck, setWhiteDeck] = useState(null);
  const [blackDeck, setBlackDeck] = useState(null);

  return (
    <CardDeckContext.Provider
      value={{
        whiteDeck,
        setWhiteDeck,
      }}
    >
      {props.children}
    </CardDeckContext.Provider>
  );
};

export default CardDecksProvider;
