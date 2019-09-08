import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { addItem } from '../actions/itemActions';

class ItemModal extends Component {
    state = {
        modal: false,
        exercise: '',
        reps: 0
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        console.log(this.props.auth.user._id)

        //TODO: decide what to do with user_id
        var newItem = {}
        if (this.props.date) { // if date is given by calender
            newItem = {
                exercise: this.state.exercise,
                reps: this.state.reps,
                user_id: this.props.auth.user._id,
                date: this.props.date
            }
        } else {
            newItem = { // if adding from workouts page
                exercise: this.state.exercise,
                reps: this.state.reps,
                user_id: this.props.auth.user._id,
                date: new Date()
            }
        }

        // Add item via addItem action
        this.props.addItem(newItem);

        // Close modal
        this.toggle();
    }

    render() {
        return (
            <div>

                { this.props.auth.isAuthenticated ?
                <Button
                color="dark"
                style={{marginBottom: '2rem'}}
                onClick={this.toggle}>
                    Add Exercise
                </Button> :
                <h4 className="mb-3 ml-4">Please log in to add workouts</h4>    
            }

                

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        Add To Workout
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Exercise</Label>
                                <Input
                                    type="text"
                                    name="exercise"
                                    id="exercise"
                                    placeholder="Add Exercise"
                                    className='modal-item'
                                    onChange={this.onChange}
                                />
                                <Label for="item">Reps</Label>
                                <Input
                                    type="number"
                                    name="reps"
                                    id="reps"
                                    placeholder="Add reps"
                                    className='modal-item'
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block>Add Exercise</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    exercise: state.exercise,
    reps: state.reps,
    auth: state.auth,
    date: state.date.date,
});

export default connect(mapStateToProps, { addItem })(ItemModal)