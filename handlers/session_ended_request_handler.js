const Alexa=require("ask-sdk-core")

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
      return (
        Alexa.getRequestType(JSON.parse(handlerInput.requestEnvelope.body)) ===
        "SessionEndedRequest"
      );
    },
    handle(handlerInput) {
      // Any clean-up logic goes here.
      return handlerInput.responseBuilder.getResponse();
    },
  };


  module.exports={
    SessionEndedRequestHandler
  }
