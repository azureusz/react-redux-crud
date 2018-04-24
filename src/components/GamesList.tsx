import * as React from 'react';
import Game from '../models/Game';
import { Card } from 'semantic-ui-react';
import { GameCard } from './GameCard';

export interface GamesListProps {
    games: Game[];
}

export const GamesList: React.SFC<GamesListProps> = (props) => {

    const emptyMessage = (
        <p>There are no games.</p>
    );

    const gamesList = (
        <Card.Group itemsPerRow={4}>
            {props.games.map((game, index) => <GameCard game={game} key={game._id}/>)}
        </Card.Group>
    );

    return (
        <div>
            {props.games.length === 0 ? emptyMessage : gamesList}
        </div>
    );
};