// Alexa SDK for JavaScript v1.0.00
// Copyright (c) 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved. Use is subject to license terms.

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = 'amzn1.echo-sdk-ams.app.bbf61f6e-bbe7-464a-82ca-1214199d6273';

/**
 * Array containing space facts.
 */
var SPACE_FACTS = [
  "A year on Mercury is just 88 days long.",
  "Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.",
  "Venus rotates counter-clockwise, possibly because of a collision in the past with an asteroid.",
  "On Mars, the Sun appears about half the size as it does on Earth.",
  "Earth is the only planet not named after a god.",
  "Jupiter has the shortest day of all the planets.",
  "The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.",
  "The Sun contains 99.86% of the mass in the Solar System.",
  "The Sun is an almost perfect sphere.",
  "A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.",
  "Saturn radiates two and a half times more energy into space than it receives from the sun.",
  "The temperature inside the Sun can reach 15 million degrees Celsius.",
  "The Moon is moving approximately 3.8 cm away from our planet every year."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var SpaceGeek = function () {
  AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
SpaceGeek.prototype = Object.create(AlexaSkill.prototype);
SpaceGeek.prototype.constructor = SpaceGeek;

SpaceGeek.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
  console.log("SpaceGeek onSessionStarted requestId: " + sessionStartedRequest.requestId
    + ", sessionId: " + session.sessionId);
  // any initialization logic goes here
};

SpaceGeek.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
  console.log("SpaceGeek onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
  handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
SpaceGeek.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
  console.log("SpaceGeek onSessionEnded requestId: " + sessionEndedRequest.requestId
    + ", sessionId: " + session.sessionId);
  // any cleanup logic goes here
};

SpaceGeek.prototype.intentHandlers = {
  GetNewFactIntent: function (intent, session, response) {
    handleNewFactRequest(response);
  },

  HelpIntent: function (intent, session, response) {
    response.ask("You can ask Space Geek tell me a space fact, or, you can say exit... What can I help you with?");
  }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest (response) {
  // Get a random space fact from the space facts list
  var factIndex = Math.floor(Math.random() * SPACE_FACTS.length);
  var fact = SPACE_FACTS[factIndex];

  // Create speech output
  var speechOutput = "Here's your space fact: " + fact;

  response.tellWithCard(speechOutput, "SpaceGeek", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
  // Create an instance of the SpaceGeek skill.
  var spaceGeek = new SpaceGeek();
  spaceGeek.execute(event, context);
};

