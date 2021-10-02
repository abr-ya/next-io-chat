import { useRef } from "react";
import EVENTS from "../../config/events";
import { useSockets } from "../../context/socket.context";
import Server from "./Server";
import styles from "./Rooms.module.css";

const RoomsContainer = () => {
  const { socket, roomId, rooms } = useSockets();
  const newRoomRef = useRef(null);

  const handleCreateRoom = () => {
    //get the room name
    const roomName = newRoomRef.current.value || "";

    if (!String(roomName).trim()) return;

    // emit room created event
    console.log({ roomName });
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

    // set room name input to empty string
    newRoomRef.current.value = "";
  }

  const handleJoinRoom = (key) => {
    if (key === roomId) return;

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
  }

  const toLobbyHandler = () => {
    socket.emit(EVENTS.MASTER.TO_LOBBY);
  }
  const toGameHandler = () => {
    socket.emit(EVENTS.MASTER.TO_GAME);
  }
  const toResultHandler = () => {
    socket.emit(EVENTS.MASTER.TO_RESULT);
  }

  return (
    <nav className={styles.wrapper}>
      <div className={styles.createRoomWrapper}>
        <Server />
      </div>
      <div className={styles.createRoomWrapper}>
        здесь будут кнопки для тестов:
        <button className="cta" onClick={toLobbyHandler}>
          TO LOBBY
        </button>
        <button className="cta" onClick={toGameHandler}>
          TO GAME
        </button>
        <button className="cta" onClick={toResultHandler}>
          TO RESULT
        </button>
      </div>
      <div className={styles.createRoomWrapper}>
        <input ref={newRoomRef} placeholder="Room name" />
        <button className="cta" onClick={handleCreateRoom}>
          CREATE ROOM
        </button>
      </div>

      <ul className={styles.roomList}>
        {Object.keys(rooms).map((key) => {
          return (
            <div key={key}>
              <button
                disabled={key === roomId}
                title={`Join ${rooms[key].name}`}
                onClick={() => handleJoinRoom(key)}
              >
                <p>{`name: ${rooms[key].name}`}</p>
                <p>{`id: ${key}`}</p>
              </button>
            </div>
          );
        })}
      </ul>
    </nav>
  );
}

export default RoomsContainer;
