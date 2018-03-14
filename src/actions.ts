import Game from './models/Game';
import ActionTypes from './types/ActionTypes';

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

export function saveGame(game: Game) {
    return (dispatch: Function) => {
        return fetch('/api/games', {
            method: 'post',
            body: JSON.stringify(game),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(handleResponse);
    };
}

export function getGames() {
    return (dispatch: Function) => {
        fetch('/api/games').then(
            res => res.json()
        ).then(
            data => dispatch(setGames(data.games))
        );
    };
}