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
          displayTime: newRumor.displayTime,
          createdAt: Date.now(),
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
        <h1>Pat Kelly Rumors</h1>
        <p>Get all the juice... in concentrated form. 🍊</p>
        <AddRumorForm addRumor={this.addRumor} />
        {this.state.rumors.sort((a, b) => b.createdAt - a.createdAt).map(rumor => <RumorDetail key={rumor.id} body={rumor.body} submitter={rumor.submitter} displayTime={rumor.displayTime} />)}
      </div>
    );
  }
}

export default RumorsDisplay;
