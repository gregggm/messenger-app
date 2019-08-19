import { combineReducers } from 'redux';
import messages from './messages';
import currentMessage from './currentMessage';
import user from './user';
import websocket from './websocket';
import activeUsers from './activeUsers';

export default combineReducers({
	messages,
	currentMessage,
	user,
	websocket,
	activeUsers
});
