import React from 'react';

class RumorDetail extends React.Component {
  renderSubmitter() {
    const isTweet = this.props.tweetId != null;
    const isAnonymous = this.props.submitter == null;
    const tweetUrl = `https://twitter.com/${this.props.submitter}/status/${this.props.tweetId}`;
    let submitter = null;

    if (isTweet) {
      submitter = <a target="_blank" href={tweetUrl}>{this.props.submitter}</a>;
    } else if (isAnonymous) {
      submitter = <span className="anonymous">Anonymous</span>;
    } else {
      submitter = this.props.submitter;
    }

    return (
      <span>
        <span className="submitted">Submitted by:</span>&nbsp;
        {submitter} at {this.props.displayTime}
      </span>
    );
  }

  render() {
    return (
      <p className="rumorDetail">
        &quot;{this.props.body}&quot;
        <br />
        {this.renderSubmitter()}
      </p>
    );
  }
}

export default RumorDetail;
