const { v4: uuidv4 } = require('uuid');
const dataStore = "./data/stores/channels.json"

module.exports = {
    name: 'createCampaign',
    description: 'Creates campaign channels',
    args: true,
    usage: '[Campaign Name]',
    serverOnly: true,
    cooldown: 5,
    aliases: ['newCampaign','nDnd'],
    execute(message, args) {
        // Syntax !createCampaign {Campaign Name}

        // Create channel object for storing
        const channel = {};
        channel.guid = uuidv4();
        channel.name = args[0];

        // Create a new category text channel
        const guild = message.guild;
        guild.channels.create(args[0], 
        { 
            type: 'category', 
            reason: 'New Campaign',
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL'],
                }
            ]
        }
        ).then(c =>{ 
            // set channel object ids
            channel.adminUserId = message.author.id;
            channel.categoryId = c.id;

            guild.channels.create(args[0], 
            { 
                type: 'text', 
                reason: 'New Campaign',
                parent: c
            }
            ).then(v => {                
                channel.textId = v.id;
                guild.channels.create(args[0], 
                    { 
                        type: 'voice', 
                        reason: 'New Campaign',
                        parent: c
                    }).then(v => {                
                        channel.voiceId = v.id;
                        console.log(channel);
                    }).catch(console.error);
            }).catch(console.error); 
        }).catch(console.error); 
        
    },
}
