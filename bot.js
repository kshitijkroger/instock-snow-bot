const { ActivityHandler, MessageFactory } = require('botbuilder');
const { handleOtherInput, handleIncidentSelection, handleProblemSelection, handleKnowledgeDocumentSelection, handleIncidentNumber } = require('./handlers/handlers');
const { showMainMenu } = require('./utils/MainMenu');

class EchoBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            const text = context.activity.text.toLowerCase();
            const commandHandlers = getCommandHandlers();

            // Find the appropriate handler for the input text
            const handler = commandHandlers.find(({ condition }) => condition(text));

            if (handler) {
                await handler.action(context, text);
            } else {
                await handleOtherInput(context);
            }

            await next();
        });

        this.onMembersAdded(async (context, next) => {
            // Greet new members when they join
            const membersAdded = context.activity.membersAdded;
            for (const member of membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    await context.sendActivity('Hello! How can I help you?');
                    await showMainMenu(context)
                }
            }
            await next();
        });
    }
}

function getCommandHandlers() {
    return [
        {
            keyword: 'main menu',
            condition: (text) => text.toLowerCase().includes('main menu'),
            action: showMainMenu
        },
        {
            keyword: 'incident',
            condition: (text) => text.toLowerCase().includes('incident'),
            action: handleIncidentSelection
        },
        {
            keyword: 'incident number',
            condition: isIncidentNumber,
            action: handleIncidentNumber
        },
        {
            keyword: 'problem',
            condition: (text) => text.toLowerCase().includes('problem'),
            action: handleProblemSelection
        },
        {
            keyword: 'knowledge document',
            condition: (text) => text.toLowerCase().includes('knowledge document'),
            action: handleKnowledgeDocumentSelection
        }
    ];
}

function isIncidentNumber(text) {

    if(text.startsWith('inci', 0))
        return false;

    return text.startsWith('inc', 0);  // Simple check: assumes incident numbers are all digits
}

module.exports.EchoBot = EchoBot;
