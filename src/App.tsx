import * as React from 'react';
import { Route } from 'react-router';
import GamesPage from './components/GamesPage';
import { Grid, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { GameForm } from './components/GameForm';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <div>
                    <Nav
                        bsStyle="tabs"
                        justified={true}
                        activeKey={1}
                    >
                        <LinkContainer to={'/'} exact={true}>
                            <NavItem eventKey={1}>
                                Home
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/games'} exact={true}>
                            <NavItem eventKey={2}>
                                Games
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/games/new'} exact={true}>
                            <NavItem eventKey={3}>
                                New Game
                            </NavItem>
                        </LinkContainer>
                    </Nav>
                </div>
                <Grid>
                    <Route exact={true} path={'/games'} component={GamesPage}/>
                    <Route path={'/games/new'} component={GameForm}/>
                </Grid>
            </div>
        );
    }
}

export default App;
