import React, { Component, Fragment } from 'react';
import styled, { withTheme } from 'styled-components';

import ActivePrompt from './ActivePrompt';
import HandOMeter from './HandOMeter';

import Card from '../_styled/Card';
import ErrorCard from '../_styled/ErrorCard';
import Heading from '../_styled/Heading';
import Subheading from '../_styled/Subheading';
import { Input, Label } from '../_styled/Input';
import Button from '../_styled/Button';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import axios from 'axios';
import openSocket from 'socket.io-client';
import createWebhookMessage from '../slack/webhookMessage';
import determineServerHostname from '../environments/determineServerHostname';

import { ReactComponent as HorizRule } from '../assets/fist_to_five_art.svg';
import slackLogo from '../assets/slack-logo.png';

const Img = styled.img`
  display: block;
  margin: ${props => props.margin ? props.margin : '0'};
`;

const Strong = styled.strong`
  color: #fff;
  font-weight: 900;
`;

const HorizRuleContainer = styled.div`
  width: 250px;
  margin: 50px auto;
`;

class PromptObj {
  constructor(
    prompt, // Required constructor arg
    responses = 0, // Non-required, used only when creating new ones from data from the subscription
    fists = 0,
    ones = 0,
    twos = 0,
    threes = 0,
    fours = 0,
    fives = 0,
    timeRemaining = 60,
  ) {
    this.prompt = prompt;
    this.responses = responses;
    this.fists = fists;
    this.ones = ones;
    this.twos = twos;
    this.threes = threes;
    this.fours = fours;
    this.fives = fives;
    this.timeRemaining = timeRemaining;
  }
}

class Prompt extends Component {
  socket = openSocket(determineServerHostname());
  subscription = this.socket.on('subscribeToFistToFive', data => this.updateActivePrompts(data));
  placeholders = ['RESTful Services', 'CSS Frameworks', 'MongoDB', 'HTML Attributes', 'Constructors', 'Arrow Functions', 'MVC', 'Ternary Operators', 'Function Scope', 'Lexical Scope', 'Normalization', 'Foreign Keys', 'SQL', 'Relational Databases', 'React', 'State', 'Props', 'Semantic HTML', 'Functional Programming', 'OOP', 'TDD', 'Components', 'Request-Response Cycle', 'Express Routing', 'Middleware', 'Packages', 'AJAX'];

  state = {
    prompt: '',
    activePrompts: [],
    pastPrompts: [],

    placeholder: this.placeholders[Math.floor(Math.random() * this.placeholders.length)],
    promptSubmitError: '',
    promptSubmitDropdownOpen: false,
  }

  handleInputChange = prompt => this.setState({ prompt });

  toggleDropdown = () => this.setState(prevState => ({ promptSubmitDropdownOpen: !prevState.promptSubmitDropdownOpen }));

  updateActivePrompts = data => {
    console.log({ UPDATINGFROMSLACKRESPONSE: data })
    const activePrompts = [ ...this.state.activePrompts ];
    const indexToUpdate = activePrompts.map(prompt => prompt.id).indexOf(data.id);
    activePrompts.splice(indexToUpdate, 1, data);
    this.setState({ activePrompts });
  }

  removeFromActivePrompts = id => {
    const activePrompts = [ ...this.state.activePrompts ];
    const pastPrompts = [ ...this.state.pastPrompts ];
    const indexToUpdate = activePrompts.map(prompt => prompt.id).indexOf(id);
    const promptToPlaceInPastPrompts = activePrompts[indexToUpdate];
    activePrompts.splice(indexToUpdate, 1);
    pastPrompts.unshift(promptToPlaceInPastPrompts);
    this.setState({ activePrompts, pastPrompts });
  }

  componentWillUnmount() {
    // TODO: Disconnect from sockets
    // TODO: cancel API calls
  }

  render() {

    const { state, props } = this;

    console.log({ state, props });
    return (
      <Fragment>
        <Card margin="0 0 25px 0"> 
          <Heading margin="0 0 15px">Prompt a New <strong>Fist To Five</strong></Heading>

          <form onSubmit={ async e => {
            e.preventDefault();
            this.setState({ promptSubmitError: '' });

            // precautionary measure in addition to disabled button
            if (!state.prompt || !state.cohort) return;

            // If any active prompts match what was input
            if (state.activePrompts.map(activePrompt => activePrompt.prompt.toLowerCase() === state.prompt.toLowerCase()).filter(value => value).length > 0) {
              return this.setState({ promptSubmitError: 'The Slack prompt must not match any active prompts' });
            }

            // Dispatch update to server-side
            const serverResponse = await axios.post(
              `${determineServerHostname()}/api/prompts`,
              { 
                prompt: new PromptObj(state.prompt),
                cohort: state.cohort,
                promptedBy: `${props.user.userAccount.firstName} ${props.user.userAccount.lastName}`
              }
            ).catch(error => console.error(error));

            console.log({ serverResponse })

            // Socket
            this.socket.emit('subscribeToFistToFive', serverResponse.data.id);

            // Dispatch interactive Slack message
            const slackResponse = await axios.post(
              'https://hooks.slack.com/services/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',
              createWebhookMessage(state.prompt, props.user, serverResponse.data.id),
              { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            ).catch(error => console.error(error));

            // If Slack responds successfully, prepend the prompt the list of activePrompts
            if (slackResponse.status === 200) {
              this.setState({ activePrompts: [
                { ...serverResponse.data, timeRemaining: 60 }, // add the data retrieved from the server, plus a initial time remaining value
                ...this.state.activePrompts
              ]}, () => this.setState({ prompt: '' })); // Clear the input
            } else {
              console.error(slackResponse);
            }

          }}>
            <Label htmlFor="prompt">Fist To Five: What is your understanding of...</Label>
            <Input
              id="prompt"
              onChange={ e => this.handleInputChange(e.target.value) }
              value={ state.prompt }
              placeholder={ state.placeholder }
            />

            <Dropdown
              width="100%"
              isOpen={ this.state.promptSubmitDropdownOpen }
              toggle={ this.toggleDropdown }>
              <DropdownToggle color="info" caret>
                { state.cohort ? state.cohort : 'Select a Cohort' }
              </DropdownToggle>
              <DropdownMenu>
                { props.user
                  ? <Fragment>
                      { props.user.enrollments.map(cohort => (
                        <DropdownItem
                          key={ cohort.course.name }
                          onClick={ () => this.setState({ cohort: cohort.course.name }) }
                        >{ cohort.course.name }</DropdownItem>
                      ))}
                    </Fragment>
                  : <DropdownItem>Loading options...</DropdownItem>
                }
              </DropdownMenu>
            </Dropdown>

            <Button
              margin="25px 0 0 0"
              type="submit"
              disabled={ !state.prompt || !state.cohort }
              backgroundColor={ props.theme.slack }
            >Submit To <Img src={ slackLogo } alt="Slack" width="20px" margin="0 10px"/><Strong>Slack</Strong></Button>
          </form>

          { state.promptSubmitError &&
            <ErrorCard>{ state.promptSubmitError }</ErrorCard>
          }
        </Card>


        { state.activePrompts.length > 0 &&
          <Fragment>
            <Heading margin="0 0 10px 0" color="#fff">Active Prompts</Heading>
              { state.activePrompts.map(prompt => (
                <ActivePrompt
                  key={ prompt.id }
                  prompt={ prompt }
                  removeFromActivePrompts={ this.removeFromActivePrompts }
                />
              ))}
          </Fragment>
        }

        <HorizRuleContainer>
          <HorizRule />
        </HorizRuleContainer>

        { state.pastPrompts.length > 0 &&
          <Fragment>
            <Heading margin="0 0 10px 0" color="#fff">Past Prompts</Heading>
              { state.pastPrompts.map(prompt => (
                <Card key={ prompt.id } margin="15px 0">
                  <Heading>{ prompt.prompt }</Heading>
                  <Subheading>Total Responses: { prompt.responses }</Subheading>
                  <HandOMeter prompt={ prompt }/>
                </Card>
              ))}
          </Fragment>
        }
      </Fragment>
    );
  }
}

export default withTheme(Prompt);