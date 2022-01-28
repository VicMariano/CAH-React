import { getAuth } from "@firebase/auth";
import ButtonComponent from "components/Button/ButtonComponent";
import { Loading } from "components/Loading/Loading";
import Room from "components/Room/Room";
import { useDecksContext } from "contexts/CardDecksContext";
import { useRoomContext } from "contexts/RoomContext";
import React from "react";
import { useEffect, useState } from "react";
import { Api } from "services/api";
import firebaseApp from "services/firebaseCredentials";
const auth = getAuth(firebaseApp);

export const WaitingRoom = ({ start }) => {
  const user = auth.currentUser;
  const { room, setRoom, imOwner } = useRoomContext();
  const {
    whiteDeckInGame,
    setWhiteDeckInGame,
    blackDeckInGame,
    setBlackDeckIGame,
    whiteDeck,
    blackDeck,
  } = useDecksContext;
  const [inGame, setInGame] = useState(false);
  const [loading, setLoading] = useState(true);

  // initialize the listening to the room
  useEffect(() => {
    if (room && room.roomId) {
      Api.listenRoom(room.roomId, setRoom);
      Api.getRounds(room.roomId);
    }
  }, []);

  useEffect(() => {
    room && setLoading(false);
    return console.log("The room is changing! ", room);
  }, [room]);

  // checks if the current user is the owner of the room
  const checkOwner = () => {
    if (
      room?.players.find((pl) => pl.owner && pl.owner === true).email ===
      user?.email
    ) {
      console.log("ES OWNER");
      return true;
    } else {
      console.log("NO ES OWNER");

      return false;
    }
  };

  // randomize number to choose card/s
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const createRound = (roundNumber, judgeUser) => {
    const roundContent = {
      roundNumber: roundNumber,
      judge: { judgeUser },
      playersDeals: [{}],
      blackCard: "",
      winner: {},
      prompts: [],
    };

    Api.createRound(room.roomId, roundNumber, roundContent);
  };

  const extractThreeRandomWCards = () => {
    const randomCards = [];
    for (let index = 0; index < 2; index++) {
      const indexSelected = getRandomInt(0, whiteDeckInGame.length() - 1);
      const cardToDeal = whiteDeckInGame.splice(indexSelected, 1);
      randomCards.push(cardToDeal);
      console.log(
        "Index selected ",
        indexSelected,
        ", card to deal  ",
        cardToDeal,
        ", randomCards selected ",
        randomCards
      );
    }
    return randomCards;
  };

  const dealWhiteCards = async () => {
    const playersDeals = [];
    // deal 2 white cards to each player

    const testDeal = room.players.map((player) =>
      playersDeals.push({
        email: player.email,
        displayName: player.displayName,
        cardsDeal: extractThreeRandomWCards(),
      })
    );
    console.log("Test deal: ", testDeal, " , PlayersDeals: ", playersDeals);
  };

  const chooseBlackCard = () => {};

  const chooseJudge = () => {};

  // deal cards to players
  const dealCards = () => {
    setBlackDeckIGame(blackDeck);
    setWhiteDeckInGame(whiteDeck);
    const nextRound = room.rounds.length;
    // crea el primer round con el owner como juez
    createRound(1, user);

    dealWhiteCards();
    chooseBlackCard();
    chooseJudge();
    console.log("Repartiendoo...tuki, tuki, tuki...");
  };

  // start the game if you are the owner
  const startGame = async () => {
    setLoading(true);
    setInGame(true);

    dealCards();
  };

  // generates the list with all the players
  const list = room
    ? room.players.map((player, index) => (
        <li key={index}>{player.displayName}</li>
      ))
    : null;

  return (
    <div>
      <ButtonComponent
        text="Repartir cartas"
        onClick={() => startGame()}
      ></ButtonComponent>

      {room && !inGame ? (
        <div>
          <div
            style={{
              width: "70%",
              height: "50%",
              border: "3px solid #ffff",
              borderRadius: "0.5em",
              padding: "1em 2em",
              marginBottom: "1em",
            }}
          >
            <h3>Sala: {room.roomId ?? "Id Hardcoded"}</h3>
            <ol style={{ textAlign: "left" }}>{list}</ol>
          </div>
          {(imOwner || checkOwner()) && (
            <ButtonComponent
              text="Comenzar"
              onClick={() => startGame()}
            ></ButtonComponent>
          )}
        </div>
      ) : (
        <Loading />
      )}
      {loading ? <Loading /> : inGame ? <Room /> : null}
    </div>
  );
};
