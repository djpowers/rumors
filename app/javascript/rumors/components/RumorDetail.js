import React from 'react';

class RumorDetail extends React.Component {
  render() {
    return (
      <p className="rumorDetail">
        &quot;{this.props.body}&quot;
        <br />
        <span className="submitted">Submitted by:</span> {this.props.submitter ? this.props.submitter : <span className="anonymous">Anonymous</span>} at {this.props.displayTime}
      </p>
    );
  }
}

export default RumorDetail;
