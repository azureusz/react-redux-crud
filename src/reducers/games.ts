import { ActionType, default as ActionTypes } from '../types/ActionTypes';
import Game from '../models/Game';

export type GamesState = Game[];

export default function games(state: GamesState = [], action: ActionType = { type : ActionTypes.DEFAULT }) {
    switch (action.type) {
        default: return state;
    }
}