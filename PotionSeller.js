'use strict';

/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();
const botToken = '';

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
  // If the message is "ping"
  if (message.content === 'ping') {
    // Send "pong" to the same channel
    message.channel.send('pong');
  }

  // If the message is "!createCampain"
  if (message.content.startsWith('!createCampain')) {
    const param = message.content.replace("!createCampain", "")

    // Create a new category text channel
    const guild = message.guild;
    guild.channels.create(param, 
      { 
        type: 'category', 
        reason: 'New Campain' 
      }
    ).then(c =>{ 
      console.log;
      guild.channels.create(param, 
      { 
        type: 'text', 
        reason: 'New Campain',
        parent: c
      }
      ).then(console.log).catch(console.error); 

      guild.channels.create(param, 
        { 
          type: 'voice', 
          reason: 'New Campain',
          parent: c
        }
      ).then(console.log).catch(console.error);

    }).catch(console.error); 
  }

});

// Log our bot in using the token from https://discord.com/developers/applications
client.login(botToken);
