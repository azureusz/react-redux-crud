import * as React from 'react';
import Game from '../models/Game';

export interface GamesListProps {
    games: Game[];
}

export const GamesList: React.SFC<GamesListProps> = (props) => {

    const emptyMessage = (
        <p>There are no games.</p>
    );

    const gamesList = (
        <p>games li</p>
    );

    return (
        <div>
            {props.games.length === 0 ? emptyMessage : gamesList}
        </div>
    );
};