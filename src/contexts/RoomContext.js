import { useState, createContext, useContext } from "react";

export const RoomContext = createContext([]);

const RoomProvider = (props) => {
  const [room, setRoom] = useState(null);
  const [imOwner, setImOwner] = useState(false);
  return (
    <RoomContext.Provider value={{ room, setRoom, imOwner, setImOwner }}>
      {props.children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (context === undefined) {
    throw new Error("useRoomContext must be used within a RoomProvider");
  }
  return context;
};

export default RoomProvider;
