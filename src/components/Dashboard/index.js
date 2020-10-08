import React from 'react'
import firebase from '../../firebase'
import {withRouter} from 'react-router-dom'

class Dashboard extends React.Component{
  render() {
    return (
      <div>
        <h1>Tela Dashboard</h1>
      </div>
    );
  }
}

export default withRouter(Dashboard)