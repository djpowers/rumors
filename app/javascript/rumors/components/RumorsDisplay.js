import React from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import createHistory from 'history/createBrowserHistory';
import AddRumorForm from './AddRumorForm';
import RumorDetail from './RumorDetail';

class RumorsDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      rumors: [],
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
    const query = new URLSearchParams(location.search);
    const value = query.get('page') || 1; // default to first page if no query string parameter

    axios.get(`api/rumors?page=${value}&per_page=${this.props.perPage}`)
      .then((response) => {
        this.setState({ rumors: response.data.rumors, pageCount: Math.ceil(response.data.totalCount / this.props.perPage) });
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

    const history = createHistory();
    history.push(`/?page=${offset}`);

    this.fetchRumors();
  }

  render() {
    return (
      <div>
        <h1>Pat Kelly Rumors</h1>
        <p>
          Get all the juice... in concentrated form.&nbsp;
          <span role="img" aria-label="orange">🍊</span>
        </p>
        <AddRumorForm addRumor={this.addRumor} />
        <p>Or tweet using <strong>#patkellyrumors</strong></p>
        {this.state.rumors.sort((a, b) => b.createdAt - a.createdAt)
            .map(rumor => (
              <RumorDetail
                key={rumor.id}
                body={rumor.body}
                submitter={rumor.submitter}
                tweetId={rumor.tweetId}
                displayTime={rumor.displayTime}
              />
            ))}
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
