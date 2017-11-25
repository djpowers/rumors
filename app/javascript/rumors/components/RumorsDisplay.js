import React from 'react';
import axios from 'axios';
import RumorDetail from './RumorDetail';

class RumorsDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      rumors: [],
    };
  }

  componentDidMount() {
    this.fetchRumors();
  }

  componentWillReceiveProps(nextProps) {
    this.fetchRumors();
  }

  fetchRumors() {
    axios.get('api/rumors')
      .then((response) => {
        this.setState({ rumors: response.data.rumors });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        {this.state.rumors.map(rumor => <RumorDetail key={rumor.id} body={rumor.body} submitter={rumor.submitter} />)}
      </div>
    );
  }
}

export default RumorsDisplay;
