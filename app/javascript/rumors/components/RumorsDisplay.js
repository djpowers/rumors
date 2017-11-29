import React from 'react';
import axios from 'axios';
import AddRumorForm from './AddRumorForm';
import RumorDetail from './RumorDetail';

class RumorsDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      rumors: [],
    };
    this.addRumor = this.addRumor.bind(this);
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

  addRumor(rumorParams) {
    axios({
      method: 'POST',
      url: 'api/rumors',
      data: rumorParams,
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').content,
      },
    })
      .then((response) => {
        const newRumor = { ...response.data.rumor };
        const rumor = {
          id: newRumor.id,
          body: newRumor.body,
          submitter: newRumor.submitter,
          posted_time: newRumor.posted_time,
        };

        const rumors = [...this.state.rumors];
        rumors.push(rumor);
        this.setState({ rumors });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <AddRumorForm addRumor={this.addRumor} />
        {this.state.rumors.map(rumor => <RumorDetail key={rumor.id} body={rumor.body} submitter={rumor.submitter} posted_time={rumor.posted_time} />)}
      </div>
    );
  }
}

export default RumorsDisplay;
