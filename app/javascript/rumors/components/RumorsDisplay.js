import React from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import AddRumorForm from './AddRumorForm';
import RumorDetail from './RumorDetail';

class RumorsDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      rumors: [],
      offset: 1,
    };
    this.addRumor = this.addRumor.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    this.fetchRumors();
  }

  componentWillReceiveProps(nextProps) {
    this.fetchRumors();
  }

  fetchRumors() {
    axios.get(`api/rumors?page=${this.state.offset}&per_page=${this.props.perPage}`)
      .then((response) => {
        this.setState({ rumors: response.data.rumors, pageCount: response.data.totalCount / this.props.perPage });
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
        this.handlePageClick({ selected: 0 });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handlePageClick(data) {
    const selected = data.selected + 1;
    const offset = selected;

    this.setState({ offset }, () => {
      this.fetchRumors();
    });
  }

  render() {
    return (
      <div>
        <h1>Pat Kelly Rumors</h1>
        <p>Get all the juice... in concentrated form. 🍊</p>
        <AddRumorForm addRumor={this.addRumor} />
        {this.state.rumors.sort((a, b) => b.createdAt - a.createdAt).map(rumor => <RumorDetail key={rumor.id} body={rumor.body} submitter={rumor.submitter} displayTime={rumor.displayTime} />)}
        <div id="react-paginate">
          <ReactPaginate
            previousLabel="previous"
            nextLabel="next"
            breakLabel={<a href="">...</a>}
            breakClassName="break-me"
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
          />
        </div>
      </div>
    );
  }
}

export default RumorsDisplay;
