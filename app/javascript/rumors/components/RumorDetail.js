import React from 'react';

class RumorDetail extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.body}</p>
        <span>{this.props.submitter}</span>
      </div>
    );
  }
}

export default RumorDetail;
