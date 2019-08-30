import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class Home extends Component {

    render() {
        const { user } = this.props.auth
        return (
            <Fragment>
            <span className="welcome-name">
                        <strong>{ user ? `Welcome ${user.name}` : ''}</strong>
                    </span>
            </Fragment>
        )
    }

}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Home);