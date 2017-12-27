import React from 'react';

class AddRumorForm extends React.Component {
  createRumor(event) {
    event.preventDefault();
    console.log('Ooh, a juicy one!');
    const submitValue = this.submitter.value === '' ? null : this.submitter.value;
    const rumor = {
      body: this.body.value,
      submitter: submitValue,
    };
    this.props.addRumor(rumor);
    this.rumorForm.reset();
  }

  render() {
    return (
      <form ref={input => this.rumorForm = input} className="rumor-edit" onSubmit={e => this.createRumor(e)}>
        <textarea ref={input => this.body = input} placeholder="Enter Your Rumor" required="true" minLength="10" cols="35" rows="5" />
        <input ref={input => this.submitter = input} type="text" placeholder="Name (optional)" />
        <button type="submit">Submit Rumor</button>
      </form>
    );
  }
}

export default AddRumorForm;
