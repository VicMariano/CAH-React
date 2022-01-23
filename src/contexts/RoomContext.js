import { useState, createContext, useContext } from "react";

export const RoomContext = createContext([]);

const RoomProvider = (props) => {
  const [room, setRoom] = useState(null);
  return (
    <RoomContext.Provider value={{ room, setRoom }}>
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
