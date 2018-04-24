import Game from './models/Game';
import ActionTypes, { ActionType } from './types/ActionTypes';
import { Dispatch } from 'react-redux';

function handleResponse(response: Response) {
    if (response.ok) {
        return response.json();
    } else {
        let error: { message: string; response: Response; } = { message: response.statusText , response: response };
        throw error;
    }
}
export function setGames(games: Game[]) {
    return {
        type: ActionTypes.SET_GAMES,
        games
    };
}

export function addGame(game: Game): ActionType {
    return {
        type: ActionTypes.ADD_GAME,
        game
    };
}

function gameFetched(game: Game): ActionType {
    return {
        type: ActionTypes.GAME_FETCHED,
        game
    };
}

export function saveGame(game: Game) {
    return (dispatch: Dispatch<ActionType>) => {
        return fetch('/api/games', {
            method: 'post',
            body: JSON.stringify(game),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(handleResponse)
            .then(data => dispatch(addGame(data.game)));
    };
}

export function getGames() {
    return (dispatch: Dispatch<ActionType>) => {
        fetch('/api/games').then(
            res => res.json()
        ).then(
            data => dispatch(setGames(data.games))
        );
    };
}

export function fetchGame(id: string) {
    return (dispatch: Dispatch<ActionType>) => {
        fetch(`/api/games/${id}`).then(
            res => res.json()
        ).then(
            data => dispatch(gameFetched(data.game))
        );
    };
}