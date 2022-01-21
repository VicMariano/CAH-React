import { useState, createContext, useContext, useEffect } from "react";

export const CardDeckContext = createContext([]);

const CardDecksProvider = (props) => {
  const [whiteDeck, setWhiteDeck] = useState(null);
  const [blackDeck, setBlackDeck] = useState(null);
  useEffect(() => {
    console.log("WhiteDeck changed ", whiteDeck);
  }, [whiteDeck]);
  useEffect(() => {
    console.log("BlackDeck changed ", whiteDeck);
  }, [blackDeck]);
  return (
    <CardDeckContext.Provider
      value={{
        whiteDeck,
        setWhiteDeck,
        blackDeck,
        setBlackDeck,
      }}
    >
      {props.children}
    </CardDeckContext.Provider>
  );
};

export const useDecksContext = () => {
  const context = useContext(CardDeckContext);
  if (context === undefined) {
    throw new Error("useDecksContext must be used within a CardDecksProvider");
  }
  return context;
};

export default CardDecksProvider;
