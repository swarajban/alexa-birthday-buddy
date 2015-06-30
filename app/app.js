// Alexa SDK for JavaScript v1.0.00
// Copyright (c) 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved. Use is subject to license terms.

/**
 * App ID for the skill
 */
let APP_ID = 'amzn1.echo-sdk-ams.app.bbf61f6e-bbe7-464a-82ca-1214199d6273';


/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * BirthdayBuddy is a child of AlexaSkill.
 */
var BirthdayBuddy = function () {
  AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
BirthdayBuddy.prototype = Object.create(AlexaSkill.prototype);
BirthdayBuddy.prototype.constructor = BirthdayBuddy;

BirthdayBuddy.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
  console.log("BirthdayBuddy onSessionStarted requestId: " + sessionStartedRequest.requestId
    + ", sessionId: " + session.sessionId);
  // any initialization logic goes here
};

BirthdayBuddy.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
  console.log("BirthdayBuddy onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
  handleUpcomingBirthdayRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
BirthdayBuddy.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
  console.log("BirthdayBuddy onSessionEnded requestId: " + sessionEndedRequest.requestId
    + ", sessionId: " + session.sessionId);
  // any cleanup logic goes here
};

BirthdayBuddy.prototype.intentHandlers = {
  UpcomingBirthdaysIntent: function (intent, session, response) {
    handleUpcomingBirthdayRequest(response);
  },

  HelpIntent: function (intent, session, response) {
    response.ask("You can ask Birthday Buddy for upcoming birthdays, or, you can say exit... What can I help you with?");
  }
};

function handleUpcomingBirthdayRequest (response) {
  var speechResponse = "Uhhnooruhthee's birthday is next, on December 5th";
  response.tell(speechResponse);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
  // Create an instance of the SpaceGeek skill.
  var birthdayBuddy = new BirthdayBuddy();
  birthdayBuddy.execute(event, context);
};

