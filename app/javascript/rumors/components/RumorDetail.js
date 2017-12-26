import React from 'react';

class RumorDetail extends React.Component {
  render() {
    return (
      <p>
        &quot;{this.props.body}&quot;
        <br />
        <span className="submitted">Submitted by:</span> {this.props.submitter ? this.props.submitter : <span className="anonymous">Anonymous</span>} at {this.props.posted_time}
      </p>
    );
  }
}

export default RumorDetail;
