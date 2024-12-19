const Alexa = require("ask-sdk-core");

const FoodMenuIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(JSON.parse(handlerInput.requestEnvelope.body)) ===
        "IntentRequest" &&
      Alexa.getIntentName(JSON.parse(handlerInput.requestEnvelope.body)) ===
        "FoodMenuIntent"
    );
  },
  handle(handlerInput)  {
    const menuItems = ["Pizza", "Pasta", "Salad", "Soup", "Dessert"];

    let speechText = formatListForSpeech(menuItems);

    return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard("Today's Menu", "To Order just say \"order me some food\" ")
        .getResponse();
}

};

function formatListForSpeech(items) {
    if (items.length === 0) {
        return "There are no items available.";
    } else if (items.length === 1) {
        return `We have ${items[0]}.`;
    } else if (items.length === 2) {
        return `We have ${items[0]} and ${items[1]}.`;
    } else {
        // SSML for better pauses between items
        const lastItem = items.pop();
        const listWithBreaks = items.map(item => `<break time="0.2s"/> ${item}`).join(',');
        return `We have ${listWithBreaks}, and <break time="0.2s"/> ${lastItem}.`;
    }
}


module.exports = {
  FoodMenuIntentHandler,
};
