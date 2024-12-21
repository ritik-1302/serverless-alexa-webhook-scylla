const Alexa = require("ask-sdk-core");


const LaunchRequestHandler = {
    canHandle(handlerInput) {
      return (
        Alexa.getRequestType(JSON.parse(handlerInput.requestEnvelope.body)) === "LaunchRequest"
      );
    },
    handle(handlerInput) {
      const speechText = "Welcome to Room Service. How can I help you?";
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard(
          "Welcome to Room Service. How can I help you?",
          speechText
        )
        .getResponse();
    },
  };

module.exports={
  LaunchRequestHandler
}

  