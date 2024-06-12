const { MessageFactory, CardFactory } = require('botbuilder');

// Function to handle the "Incident" selection
async function handleIncidentSelection(context) {
    await context.sendActivity('Please provide the Incident number:');
}

async function handleIncidentNumber(context, incidentNumber) {

    const card = {
        type: "AdaptiveCard",
        body: [
            {
                type: "TextBlock",
                text: "Click the button to view the HTML page:",
                wrap: true
            }
        ],
        actions: [
            {
                type: "Action.OpenUrl",
                title: "View HTML Page",
                url: `https://instock-snow-api.azurewebsites.net/api/incident/${incidentNumber.toUpperCase()}`
            }
        ],
        $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
        version: "1.3"
    };

    const message = {
        attachments: [CardFactory.adaptiveCard(card)]
    };

    await context.sendActivity(message);
}

async function handleNewUserFacingIssue(context) {
    await context.sendActivity('Please enter the name of the Application: ');

    await next();
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
    handleKnowledgeDocumentSelection,
    handleNewUserFacingIssue
};
