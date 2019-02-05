import React, { Component } from 'react';
import Profile from '../Profile/Profile';
import PubNubReact from 'pubnub-react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.pubnub = new PubNubReact({
        publishKey: 'pub-c-1d301f57-109f-49fa-bc2c-c9e179b223df',
    });
    this.pubnub.init(this);
  }

  componentDidUpdate() {
    const { getAccessToken, isAuthenticated } = this.props.auth;

    if (isAuthenticated()) {
      console.log(isAuthenticated(), getAccessToken());
      this.pubnub.getStatus((st) => {
        this.pubnub.publish({
            message: getAccessToken(),
            channel: 'Twitter'
        });
      });
    }
    
  }


  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
            <div> 
              <h4>
                You are logged in!
              </h4>
              <Profile
              auth={this.props.auth}/>
            </div>
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
      </div>
    );
  }
}

export default Home;
