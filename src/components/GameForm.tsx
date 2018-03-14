import * as React from 'react';
import { Alert, Button, ControlLabel, FormControl, FormGroup, HelpBlock, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { saveGame } from '../actions';
import Game from '../models/Game';
import { Redirect } from 'react-router';

export interface GameFormProps {

}

export interface GameFormDispatch {
    saveGame: (game: Game) => (dispatch: any) => Promise<any>;
}

export interface GameFormState {
    title: string;
    cover: string;
    errors: {
        global?: string;
        title: string;
        cover: string;
    };
    loading: boolean;
    done: boolean;
}

class GameForm extends React.Component<GameFormProps & any, GameFormState> {

    state = {
        title: '',
        cover: '',
        errors: {
            global: '',
            title: '',
            cover: ''
        },
        loading: false,
        done: false
    };

    handleChange = (e) => {
        let errors = Object.assign({}, this.state.errors);
        errors.global = '';
        if (!!this.state.errors[e.target.name]) {
            errors[e.target.name] = '';
        }

        this.setState({
            [e.target.name]: e.target.value,
            errors
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        // validation

        let error = {title: '', cover: '', global: ''};

        if (this.state.title === '') {
            error.title = 'Can\'t be empty!';
        }
        if (this.state.cover === '') {
            error.cover = 'Can\'t be empty!';
        }
        this.setState({errors: error});

        const isValid = Object.keys(error).every((x) => error[x] === '');

        if (isValid) {
            const {title, cover} = this.state;
            this.setState({loading: true});
            this.props.saveGame(new Game(title, cover)).then(
                () => { this.setState({ done: true });
                },
                (err) => err.response.json().then(({errors}) => {

                    this.setState({
                        errors: { title: errors.title || '' , cover: errors.cover || '', global: errors.global || '' },
                        loading: false
                    });
                })
            );

        }
    }

    render() {

        const form = (
            <form onSubmit={this.handleSubmit}>
                <h1>Create new game</h1>
                {this.state.errors.global !== '' &&
                <Alert bsStyle="danger">
                    {this.state.errors.global}
                </Alert>}
                <FormGroup
                    controlId="formBasicText"
                    validationState={this.state.errors.title !== '' ? 'error' : null}
                >
                    <ControlLabel>Title</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.title}
                        placeholder="Enter title"
                        name="title"
                        id="title"
                        onChange={this.handleChange}
                    />
                    {this.state.errors.title !== '' &&
                    <HelpBlock> {this.state.errors.title} </HelpBlock>}
                </FormGroup>
                <FormGroup
                    controlId="formBasicText"
                    validationState={this.state.errors.cover !== '' ? 'error' : null}
                >
                    <ControlLabel>Cover</ControlLabel>
                    <FormControl
                        type="text"
                        name="cover"
                        id="cover"
                        value={this.state.cover}
                        onChange={this.handleChange}
                        placeholder="Enter cover"
                    />
                    {this.state.errors.cover !== '' &&
                    <HelpBlock> {this.state.errors.cover} </HelpBlock>}
                </FormGroup>
                {this.state.cover !== '' &&
                <FormGroup>
                    <Image src={this.state.cover} alt="cover" thumbnail={true} responsive={true} width="300px"/>
                </FormGroup>
                }
                <FormGroup>
                    <Button bsStyle="primary" disabled={this.state.loading} type="submit">
                        {this.state.loading ? 'Loading...' : 'Submit'}
                    </Button>
                </FormGroup>
            </form>
        );

        return (
            <div>
                { this.state.done ? <Redirect to="/games" /> : form }
            </div>
        );
    }
}

export default connect(null, {saveGame})(GameForm);