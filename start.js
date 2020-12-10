const fs = require('fs');
const Discord = require('discord.js');
const Config = require('./config/config.js');

// Create an instance of a Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands").filter(c => c.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.command.set(command.name, command);
}

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {    
    
    console.log("You are not ready traveller");
});

// Create an event listener for messages
client.on('message', message => {
    if(!message.content.startsWith(config.botConfig.botPrefix) || message.author.bot) return;

    const args = message.content.slice(config.botConfig.botPrefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    if(!client.commands.has(command)) return;
    try
    {
        client.commands.get(command).execute(message, args);
    } 
    catch(ex)
    {
        console.error(ex);
        message.reply(`Error executing that command traveller`);
    }
});

// Log our bot in using the token from https://discord.com/developers/applications
client.login(Config.botToken);
