const Alexa = require("ask-sdk-core");

const HelpIntentHandler = {
    canHandle(handlerInput) {
      return (
        Alexa.getRequestType(JSON.parse(handlerInput.requestEnvelope.body)) ===
          "IntentRequest" &&
        Alexa.getIntentName(JSON.parse(handlerInput.requestEnvelope.body)) ===
          "AMAZON.HelpIntent"
      );
    },
    handle(handlerInput) {
      const speechText =
        "You can ask me to perform tasks like ordering food, or call Housekeeping . What can I help you with?";
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard(
          "You can ask me to perform tasks like ordering food, or call Housekeeping. What can I help you with?",
          speechText
        )
        .getResponse();
    },
  };


module.exports={
  HelpIntentHandler
}