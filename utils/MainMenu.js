const { MessageFactory } = require('botbuilder');

async function showMainMenu(context) {
    
    const card = MessageFactory.suggestedActions(['Incident', 'Problem', 'Knowledge Document'], `Please select one from below: `);
    await context.sendActivity(card);
}

module.exports = {
    showMainMenu,
};