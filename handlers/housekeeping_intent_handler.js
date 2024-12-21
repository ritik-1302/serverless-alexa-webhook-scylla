const Alexa = require("ask-sdk-core");
const {
  broadcastToAllClients,
} = require("../utils/functions/broadcast_to_all_clients.js");

const { device } = require("../models/device_model.js");
const { ticket } = require("../models/ticket_model.js");

const broadcastHousekeepingMessageAndSaveToDatabase = async (
  deviceIdentifier
) => {
  try {
    const alexaDevice = await device.findOne({ identifier: deviceIdentifier });

    if (!alexaDevice) {
      console.log("Device not found");
      return false;
    }

    const deviceId = alexaDevice._id;
    console.log("DeviceId", deviceId);

    await ticket.create({
      ticketType: "Housekeeping",
      device: deviceId,
      ticketStatus: "Open",
    });

    await broadcastToAllClients({
      ticketType: "Housekeeping",
      device: alexaDevice,
      ticketStatus: "Open",
    });

    return true;
  } catch (error) {
    console.log(error);
  }
};

const HousekeepingIntenetHandler = {
  canHandle(handlerInput) {
    console.log("Debugging", handlerInput);
    return (
      Alexa.getRequestType(JSON.parse(handlerInput.requestEnvelope.body)) ===
        "IntentRequest" &&
      Alexa.getIntentName(JSON.parse(handlerInput.requestEnvelope.body)) ===
        "HousekeepingIntent"
    );
  },
  async handle(handlerInput) {
    const result = await broadcastHousekeepingMessageAndSaveToDatabase(
      Alexa.getDeviceId(JSON.parse(handlerInput.requestEnvelope.body))
    );

    if (result === false) {
      const speechText = "Device not registerd";
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard("Device not registerd", speechText)
        .withShouldEndSession(true) // End the session without expecting a user response
        .getResponse();
    } else {
      const speechText = "Sending Housekeeping to your Room";
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard("Sending Housekeeping to your Room", speechText)
        .withShouldEndSession(true) // End the session without expecting a user response
        .getResponse();
    }
  },
};

module.exports = {
  HousekeepingIntenetHandler,
};
