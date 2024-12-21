//Library Imports
const Alexa = require("ask-sdk-core");
const {connectDB}=require('./utils/functions/db_connection.js');

//File Handler
const {LaunchRequestHandler}=require("./handlers/launch_request_handler.js")
const {HelpIntentHandler}=require("./handlers/help_intent_handler.js")
const {CancelAndStopIntentHandler}=require("./handlers/cancel_and_stop_intent_handler.js")
const {SessionEndedRequestHandler}=require("./handlers/session_ended_request_handler.js")
const {ErrorHandler}=require("./handlers/error_handler.js")
const {HousekeepingIntenetHandler}=require("./handlers/housekeeping_intent_handler.js")
const { FoodMenuIntentHandler}=require("./handlers/food_menu_intent_handler.js");







let skill;

exports.handler = async function (event, context) {
  await connectDB();
  console.log(`REQUEST++++${JSON.stringify(event)}`);
  if (!skill) {
    skill = Alexa.SkillBuilders.custom()
      .addRequestHandlers(
        LaunchRequestHandler,
        HousekeepingIntenetHandler,
        FoodMenuIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
      )
      .addErrorHandlers(ErrorHandler)
      .create();
  }

  const response = await skill.invoke(event, context);
  console.log(`RESPONSE++++${JSON.stringify(response)}`);

  return response;
};
