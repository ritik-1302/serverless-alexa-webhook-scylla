const Alexa = require("ask-sdk-core");


const HousekeepingIntenetHandler={
  canHandle(handlerInput) {
    console.log("Debugging",handlerInput)
    return (
      Alexa.getRequestType(JSON.parse(handlerInput.requestEnvelope.body)) ===
        "IntentRequest" &&
      Alexa.getIntentName(JSON.parse(handlerInput.requestEnvelope.body)) ===
        "HousekeepingIntent"
    );
  },
  handle(handlerInput) {
    const speechText = "Sending Housekeeping to your Room";

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Sending Housekeeping to your Room", speechText)
      .withShouldEndSession(true) // End the session without expecting a user response
      .getResponse();
  },
};

module.exports={
  HousekeepingIntenetHandler
}