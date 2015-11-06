import React from "react";
import { Link } from 'react-router';

export default class AppHandler extends React.Component {  
  render() {
    return (
      <div>
        <div>Welcome</div>
        <ul>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/stories">Stories</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}