const Discord = require('discord.js');
const Ready = require('./events/ready.js');
const Messages = require('./events/message.js');
const Config = require('./config/config.js')

// Create an instance of a Discord client
const client = new Discord.Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    Ready.ready();
});

// Create an event listener for messages
client.on('message', message => {
    console.log(message.content);
    Messages.createCampaign(Config.botConfig, message);
    Messages.removeCampaign(Config.botConfig, message);
    Messages.addPlayer(Config.botConfig, message);
    Messages.help(Config.botConfig, message);
});

// Log our bot in using the token from https://discord.com/developers/applications
client.login(Config.botToken);
