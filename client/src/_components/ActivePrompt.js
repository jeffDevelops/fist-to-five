import React, { Component } from 'react';

import HandOMeter from '../_components/HandOMeter';

import Card from '../_styled/Card';
import Heading from '../_styled/Heading';
import Subheading from '../_styled/Subheading';

export default class ActivePrompt extends Component {
  countdown;

  state = {
    timeRemaining: 60,
  }

  componentDidMount() {
    this.setCountdownInterval();
  }
  
  setCountdownInterval = () => {
    this.countdown = setInterval(() => {
      if (this.state.timeRemaining === 0) {
        clearInterval(this.countdown);
        return this.props.removeFromActivePrompts(this.props.prompt.id);
      }
      this.setState({ timeRemaining: this.state.timeRemaining - 1 });
    }, 1000);
  }

  render() {
    const { state, props } = this;
    return (
      <Card key={ props.prompt.id } margin="15px 0">
        <Heading>{ props.prompt.prompt }</Heading>
        <Subheading>Total Responses: { props.prompt.responses }</Subheading>
        <Subheading>Time Remaining: { state.timeRemaining }</Subheading>
        <HandOMeter prompt={ props.prompt }/>
      </Card>
    )
  }
}