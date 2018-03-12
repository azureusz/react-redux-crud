import { ActionType, default as ActionTypes } from '../types/ActionTypes';
import Game from '../models/Game';

export type GamesState = Game[];

export default function games(state: GamesState = [], action: ActionType = { type : ActionTypes.DEFAULT }) {
    switch (action.type) {

        case ActionTypes.SET_GAMES:
            return action.games;

        default:
            return state;
    }
}