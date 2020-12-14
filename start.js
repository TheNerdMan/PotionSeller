const fs = require('fs');
const Discord = require('discord.js');
const { prefix, botToken } = require('./config.json');

// Create an instance of a Discord client
const client = new Discord.Client();

const cooldowns = new Discord.Collection();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands").filter(c => c.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name.toLowerCase(), command);
}

client.on('ready', () => {    
    console.log("You are not ready traveller");
});

// Create an event listener for messages
client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.map(c => c.toLowerCase()).includes(commandName));
        
    // no command exists with that name/aliase
    if(!command) return;

    // check if command can only be used in servers (guilds)
    if (command.serverOnly && message.channel.type === 'dm'){
        return message.reply('You aren\'t strong enough to use that command in DM\'s traveller.');
    }

    // check if command has arguments and user has provided correct amount
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        // Correct user if we have defined usage
        if (command.usage) {
            reply += `\nYou should read more, Traveller`;
            reply += `\nSyntax is \'${prefix}${command.name} ${command.usage}\'`;
        }

        return message.channel.send(reply);
    }

    // cooldown check
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    //get time values
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    
    // do our check
    if (timestamps.has(message.author.id)) {
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;        
            if (now < expirationTime) {
                // fail
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            }
        }
    }

    // doesn't exist or passed, add a new one that will delete itself
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // Passed all handler checks, fire.
    try
    {
        command.execute(message, args);
    } 
    catch(ex)
    {
        console.error(ex);
        message.reply(`Error executing that command traveller`);
    }
});

// Log our bot in using the token from https://discord.com/developers/applications
client.login(botToken).catch((ex) =>{
    console.error(ex);
    process.exit(1);
});
