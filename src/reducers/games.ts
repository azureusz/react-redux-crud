import { ActionType, default as ActionTypes } from '../types/ActionTypes';
import Game from '../models/Game';

export type GamesState = Game[];

export default function games(state: GamesState = [], action: ActionType = { type : ActionTypes.DEFAULT }): GamesState {
    switch (action.type) {

        case ActionTypes.SET_GAMES:
            return action.games;
        case ActionTypes.ADD_GAME:
            return [...state, action.game];
        case ActionTypes.GAME_FETCHED:
            const index = state.findIndex(item => item._id === action.game._id );
            if (index > -1) {
                return state.map(item => {
                   if (item._id === action.game._id) { return action.game; }
                   return item;
                });
            } else {
                return [
                    ...state,
                    action.game
                ];
            }
        default:
            return state;
    }
}