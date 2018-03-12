import Game from './models/Game';
import ActionTypes from './types/ActionTypes';

export function setGames(games: Game[]) {
    return {
        type: ActionTypes.SET_GAMES,
        games
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