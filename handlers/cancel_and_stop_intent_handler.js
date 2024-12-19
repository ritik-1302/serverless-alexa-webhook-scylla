const Alexa = require("ask-sdk-core");

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
      return (
        Alexa.getRequestType(JSON.parse(handlerInput.requestEnvelope.body)) ===
          "IntentRequest" &&
        (Alexa.getIntentName(JSON.parse(handlerInput.requestEnvelope.body)) ===
          "AMAZON.CancelIntent" ||
          Alexa.getIntentName(JSON.parse(handlerInput.requestEnvelope.body)) === "AMAZON.StopIntent")
      );
    },
    handle(handlerInput) {
      const speechText = "Goodbye!";
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard("Goodbye!", speechText)
        .withShouldEndSession(true)
        .getResponse();
    },
  };


  module.exports={
    CancelAndStopIntentHandler
  }