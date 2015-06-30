"use strict";

let buildSpeechletResponse = function (options) {
  let alexaResponse = {
    outputSpeech: {
      type: 'PlainText',
      text: options.output
    },
    shouldEndSession: options.shouldEndSession
  };

  if (options.reprompt) {
    alexaResponse.reprompt = {
      outputSpeech: {
        type: 'PlainText',
        text: options.reprompt
      }
    };
  }

  if (options.cardTitle && options.cardContent) {
    alexaResponse.card = {
      type: "Simple",
      title: options.cardTitle,
      content: options.cardContent
    };
  }

  let returnResult = {
    version: '1.0',
    response: alexaResponse
  };

  if (options.session && options.session.attributes) {
    returnResult.sessionAttributes = options.session.attributes;
  }

  return returnResult;
};


export class Response {
  constructor (context, session) {
    this.context = context;
    this.session = session;
  }

  tell (speechOutput) {
    let responseOptions = {
      session: this.session,
      output: speechOutput,
      shouldEndSession: true
    };
    let response = buildSpeechletResponse(responseOptions);
    this.context.succeed(response);
  }

  tellWithCard (speechOutput, cardTitle, cardContent) {
    let responseOptions = {
      session: this.session,
      output: speechOutput,
      cardTitle: cardTitle,
      cardContent: cardContent,
      shouldEndSession: true
    };
    let response = buildSpeechletResponse(responseOptions);
    this.context.succeed(response);
  }

  ask (speechOutput, repromptSpeech) {
    let responseOptions = {
      session: this.session,
      output: speechOutput,
      reprompt: repromptSpeech,
      shouldEndSession: false
    };
    let response = buildSpeechletResponse(responseOptions);
    this.context.succeed(response);
  }

  askWithCard (speechOutput, repromptSpeech, cardTitle, cardContent) {
    let responseOptions = {
      session: this.session,
      output: speechOutput,
      reprompt: repromptSpeech,
      cardTitle: cardTitle,
      cardContent: cardContent,
      shouldEndSession: false
    };
    let response = buildSpeechletResponse(responseOptions);
    this.context.succeed(response);
  }
}