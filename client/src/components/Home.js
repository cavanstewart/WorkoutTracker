import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class Home extends Component {

    render() {
        const { user, isAuthenticated } = this.props.auth
        return (
            <Fragment>
                { isAuthenticated ?
                <span className="welcome-name">
                    <strong>{ user ? `Welcome ${user.name}` : ''}</strong>
                </span>
                :
                <span className="welcome-name">Please Register/Login to begin using</span>
            
                }
            </Fragment>
        )
    }

}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Home);