import React from 'react'
import { SOCKET_URL } from "../../config/default";

const Server = () => {
	return (
		<div>
		  Текущий сервер: {SOCKET_URL}
		</div>
	)
}

export default Server;
