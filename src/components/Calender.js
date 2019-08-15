import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItemsDay } from '../actions/itemActions';
import PropTypes from 'prop-types';

import Calender from 'react-calendar'
import { ITEMS_LOADING } from '../actions/types';

class WorkoutCalender extends Component {
    state = {
        date: new Date(),
    }

    componentDidMount() {
        var day = this.state.date.getDate();
        var month = this.state.date.getMonth();
        var year = this.state.date.getFullYear();
        this.props.getItemsDay(day, month, year);
    }

    onChange = date => {
        this.setState({ date });
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        this.props.getItemsDay(day, month, year);
    }

    render() {
        const { items } = this.props.item;
        return (
            <Container>
                <Calender
                    onChange={this.onChange}
                    value={this.state.date}
                />

            <span className="left">Exercise:</span>
            <span className="right">Reps:</span>
            <ListGroup>
                    <TransitionGroup className="date-list">
                        {items.map(({ _id, exercise, reps}) => (
                            <CSSTransition key={_id} timeout={500} classNames="appear">
                                <ListGroupItem>
                                    <span class="left">{exercise}</span>
                                    <span class="right">{reps}</span>
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}


WorkoutCalender.propTypes = {
    getItemsDay: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
    item: state.item
});

export default connect(mapStateToProps, {getItemsDay})(WorkoutCalender)