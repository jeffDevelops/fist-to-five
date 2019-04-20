# [Fist To Five](https://trilogy-fist-to-five.herokuapp.com/)

# [Demo Video](https://drive.google.com/file/d/1bZw9BzNaH0-o9Dqv8Vci1POLkWAYQjZU/view)

![LoginPage](./client/src/assets/login_page.png)

#### Trilogy Hackathon Entry, 2019

Fist To Five is an instructor- and TA-facing web client that sends Fist to Five prompts to their students via a Slack Interactive Message. When the instructor or TA submits a prompt to Slack, a Slack poll is opened for a sixty-second window and the client establishes a websocket connection, so that students' responses may be viewed in real-time.

### Tech Stack
* React
* styled-components
* Socket.io
* Express
* Node.js
* MySQL and Sequelize
* Slack Interactive Messages and Webhooks

### Detailed Specifications
* Connections to websockets are only added when the user submits a prompt. This way, while many instructors or TAs from many universities may be using the service, they're only subscribed to the polls they created.
* Responses are anonymous--only numerical data regarding the prompt is persisted.
* If the student responds with a three or below, a warm message encourages them to get help during office hours.
* If the student responds with a four or above, a celebratory message encourages them to solidify their knowledge by explaining the concept to their peers.
* If the student answers, but the poll is no longer active, a poll timeout message indicates that they ran out of time to answer the poll. This prevents students from going back to unanswered polls if they weren't present to learn the material.