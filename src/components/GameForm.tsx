import * as React from 'react';
import { Button, ControlLabel, FormControl, FormGroup, HelpBlock, Image } from 'react-bootstrap';
import { connect } from 'react-redux';

export interface GameFormProps {

}

export interface GameFormState {
    title: string;
    cover: string;
    errors: {
        title: string;
        cover: string;
    };
}

export class GameForm extends React.Component<GameFormProps, GameFormState> {

    state = {
        title: '',
        cover: '',
        errors: {
            title: '',
            cover: ''
        }
    };

    handleChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
                [e.target.name]: e.target.value,
                errors
            });
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        // validation

        let errors = { title: '', cover: ''};

        if (this.state.title === '') {
            errors.title = 'Can\'t be empty!';
        }
        if (this.state.cover === '') {
            errors.cover = 'Can\'t be empty!';
        }
        this.setState({ errors });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Create new game</h1>
                <FormGroup
                    controlId="formBasicText"
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
                { this.state.cover !== '' &&
                    <FormGroup>
                        <Image src={this.state.cover} alt="cover" thumbnail={true}/>
                    </FormGroup>
                }
                <FormGroup>
                    <Button bsStyle="primary" type="submit">Submit</Button>
                </FormGroup>
            </form>
        );
    }
}

export default connect()(GameForm);