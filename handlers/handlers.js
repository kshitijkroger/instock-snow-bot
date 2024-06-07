const { MessageFactory } = require('botbuilder');
const { GET_INCIDENT_DETAILS, TEST_APPLICATION } = require('../constants/apiConstants');

// Function to handle the "Incident" selection
async function handleIncidentSelection(context) {
    await context.sendActivity('Please provide the Incident number:');
}

async function handleIncidentNumber(context, incidentNumber) {
    await context.sendActivity('User provided ' + incidentNumber.toUpperCase());
}

// Function to handle the "Problem" selection
async function handleProblemSelection(context) {
    await context.sendActivity('Please provide the Problem Number:');
}

// Function to handle the "Knowledge Document" selection
async function handleKnowledgeDocumentSelection(context) {
    await context.sendActivity('Please provide the KB Document Number:');
}

// Function to handle other user inputs
async function handleOtherInput(context) {
    const replyText = `How can I assist you?`;
    await context.sendActivity(MessageFactory.text(replyText));
}

module.exports = {
    handleIncidentSelection,
    handleIncidentNumber,
    handleOtherInput,
    handleProblemSelection,
    handleKnowledgeDocumentSelection
};
