"use strict";
// Alexa SDK for JavaScript v1.0.00
// Copyright (c) 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved. Use is subject to license terms.

import {AlexaSkillClass} from './AlexaSkillClass'
/**
 * App ID for the skill
 */
let APP_ID = 'amzn1.echo-sdk-ams.app.bbf61f6e-bbe7-464a-82ca-1214199d6273';


class BirthdayBuddy extends AlexaSkillClass {
  constructor (appID) {
    super(appID);
  }

  onSessionStarted (sessionStartedRequest, session) {
    console.log(`BirthdayBuddy onSessionStarted requestId: ${sessionStartedRequest.requestId}` +
      `, sessionId: ${session.sessionId}`);

    // any initialization logic goes here
  }

  onLaunch (launchRequest, session, response) {
    console.log(`BirthdayBuddy onLaunch requestId: ${launchRequest.requestId}, sessionId: ${session.sessionId}`);
    handleUpcomingBirthdayRequest(response);
  }

  /**
   * Overridden to show that a subclass can override this function to teardown session state.
   */
  onSessionEnded (sessionEndedRequest, session) {
    console.log(`BirthdayBuddy onSessionEnded requestId: ${sessionEndedRequest.requestId}` +
      `, sessionId: ${session.sessionId}`);
    // any cleanup logic goes here

  }

  get intentHandlers () {
    return {
      UpcomingBirthdaysIntent (intent, session, response) {
        handleUpcomingBirthdayRequest(response);
      },

      HelpIntent (intent, session, response) {
        response.ask("You can ask Birthday Buddy for upcoming birthdays, or, you can say exit... What can I help you with?");
      }

    };
  }
}

function handleUpcomingBirthdayRequest (response) {
  var speechResponse = "Uhhnooruhthee's birthday is next, on December 5th";
  response.tell(speechResponse);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
  // Create an instance of the SpaceGeek skill.
  let birthdayBuddy = new BirthdayBuddy(APP_ID);
  birthdayBuddy.execute(event, context);
};

