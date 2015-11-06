import React from 'react';
import log from '../consolelog'

export default class StoriesHandler extends React.Component {
  
  constructor () {
    super();
    this.state = { stories: [] };
  }

  componentWillMount () {
    fetch('/graphql', { 
        method: 'POST', 
        body: '{ stories { text } }', 
        headers: {"Content-Type":"application/graphql"
      } 
    }).then ( (res) => {
      return res.json();
    }).then( (json) => {
      this.setState({stories: json.data.stories});
    });
  }

  render() {
    return (
      <div>
        <h1>stories</h1>
        <ul>
          { this.state.stories.map( story =>
            <li>{story.text}</li>
          )}
        </ul>
      </div>
    );
  }
}