import { ActionType, default as ActionTypes } from '../types/ActionTypes';
import StateType from '../types/StateType';

export default function games(state: StateType = [], action: ActionType = { type : ActionTypes.DEFAULT}) {
    switch (action.type) {
        default: return state;
    }
}