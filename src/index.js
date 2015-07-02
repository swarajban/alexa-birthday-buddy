"use strict";


import {AlexaSkill} from './AlexaSkill';
import {getNextBirthdays} from './birthdays';
import {getBirthdays} from './birthdaysCollection';


// 3rd Party Libs
let moment = require('moment');

/**
 * App ID for the skill
 */
let APP_ID = 'amzn1.echo-sdk-ams.app.bbf61f6e-bbe7-464a-82ca-1214199d6273';


class BirthdayBuddy extends AlexaSkill {
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
  let now = moment().utcOffset(-7);
  let birthdays = getBirthdays();
  let {names, date} = getNextBirthdays(now, birthdays);
  let birthdayString = '';
  let birthdayDate = date.format('MMMM Do');

  // 1 birthday: Swaraj's birthday is next on June 10th
  // 2 birthdays: Anurati & Swaraj's birthdays are next on June 11th
  // 2+ birthdays: Anurati, Swaraj, and Bagel's birthdays are next on June 12th
  switch (names.length) {
    case 0:
      birthdayString = 'No upcoming birthdays';
      break;

    case 1:
      birthdayString = `${names[0]}'s birthday is next on ${birthdayDate}`;
      break;

    case 2:
      birthdayString = `${names[0]} & ${names[1]}'s birthday is next on ${birthdayDate}`;
      break;

    default:
      for (let i = 0; i < names.length; i++) {
        if (i < names.length - 1) {
          birthdayString += `${names[i]}, `;
        } else {
          birthdayString += ` and ${names[i]}'s birthdays are next on ${birthdayDate}`;
        }
      }
      break;
  }

  response.tell(birthdayString);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
  // Create an instance of the BirthdayBuddy skill.
  let birthdayBuddy = new BirthdayBuddy(APP_ID);
  birthdayBuddy.execute(event, context);
};

