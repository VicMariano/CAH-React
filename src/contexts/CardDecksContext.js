import { useState, createContext, useContext, useEffect } from "react";
import { Api } from "services/api";

export const CardDeckContext = createContext([]);

const CardDecksProvider = (props) => {
  const [whiteDeck, setWhiteDeck] = useState(null);
  const [blackDeck, setBlackDeck] = useState(null);
  const [whiteDeckInGame, setWhiteDeckInGame] = useState(null);
  const [blackDeckInGame, setBlackDeckInGame] = useState(null);

  // gets all white cards from db
  const fetchWhiteDeck = async () => {
    const response = await Api.getAllWhiteCards();
    setWhiteDeck(response);
  };

  // gets all black cards from db
  const fetchBlackDeck = async () => {
    const response = await Api.getAllBlackCards();
    setBlackDeck(response);
  };

  const fetchDecks = async () => {
    await fetchBlackDeck();
    await fetchWhiteDeck();
  };

  useEffect(() => {
    if (props) {
      fetchDecks();
    }
    return () => {
      console.log("CardDecksContext Unmount");
    };
  }, []);

  return (
    <CardDeckContext.Provider
      value={{
        whiteDeck,
        setWhiteDeck,
        blackDeck,
        setBlackDeck,
        whiteDeckInGame,
        setWhiteDeckInGame,
        blackDeckInGame,
        setBlackDeckInGame,
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
