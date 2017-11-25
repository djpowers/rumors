import React from 'react';

class RumorDetail extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.body}</p>
        <span>Submitted by {this.props.submitter} at {this.props.posted_time}</span>
      </div>
    );
  }
}

export default RumorDetail;
