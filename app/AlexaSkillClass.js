"use strict";

// Alexa SDK for ES6

import {Response} from './ResponseClass'

export class AlexaSkillClass {
  constructor (appID) {
    this.appID = appID;
  }

  // Internal Request Handlers
  launchRequest (event, context, response) {
    this.onLaunch(event.request, event.session, response);
  }

  intentRequest (event, context, response) {
    this.onIntent(event.request, event.session, response);
  }

  sessionEndedRequest (event, context) {
    this.onSessionEnded(event.request, event.session);
    context.succeed();
  }


  /**
   * Override any of the eventHandlers as needed
   */

  /**
   * Called when the session starts.
   * Subclasses could have overriden this function to open any necessary resources.
   */
  onSessionStarted (sessionStartedRequest, session) {
    console.log('session started');
  }

  /**
   * Called when the user launches the skill without specifying what they want.
   * The subclass must override this function and provide feedback to the user.
   */
  onLaunch (launchRequest, session, response) {
    throw "onLaunch should be overridden by subclass";
  }

  /**
   * Called when the user specifies an intent.
   */
  onIntent (intentRequest, session, response) {
    let intent = intentRequest.intent;
    let intentName = intentRequest.intent.name;
    let intentHandler = this.intentHandlers[intentName];

    if (intentHandler) {
      console.log(`dispatch intent = ${intentName}`);
      intentHandler.call(this, intent, session, response);
    } else {
      throw `Unsupported intent = ${intentName}`;
    }
  }

  /**
   * Called when the user ends the session.
   * Subclasses could have overriden this function to close any open resources.
   */
  onSessionEnded (sessionEndedRequest, session) {

  }


  /**
   * Subclasses should override the intentHandlers with the functions to handle specific intents.
   */
  get intentHandlers () {
    throw "intentHandlers should be overridden by subclass";
  }

  execute (event, context) {
    try {
      console.log(`session applicationID: ${event.session.application.applicationId}`);

      // Validate that this request originated from authorized source.
      if (this.appID && event.session.application.applicationId !== this.appID) {
        console.log(`the applicationIds don't match: ${event.session.application.applicationId} and ${this.appID}`);
        throw "Invalid applicationId";
      }

      if (! event.session.attributes) {
        event.session.attributes = {};
      }

      if (event.session.new) {
        this.onSessionStarted(event.request, event.session);
      }

      // Route the request to the proper handler which may have been overridden
      let requestHandler = null;
      switch (event.request.type) {
        case 'LaunchRequest':
          this.launchRequest(event, context, new Response(context, event.session));
          break;

        case 'IntentRequest':
          this.intentRequest(event, context, new Response(context, event.session));
          break;

        case 'SessionEndedRequest':
          this.sessionEndedRequest(event, context);
          break;
      }
    } catch (e) {
      console.log(`Unexpected exception ${e}`);
    }
  }
}
