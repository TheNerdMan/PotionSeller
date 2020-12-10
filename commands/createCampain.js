module.exports = {
    name: 'createCampaign',
    description: 'Creates campaign channels',
    args: true,
    usage: '[Campaign Name]',
    serverOnly: true,
    cooldown: 5,
    aliases: ['newCampaign'],
    execute(message, args) {
        // Syntax !createCampaign {Campaign Name}

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
            guild.channels.create(args[0], 
            { 
                type: 'text', 
                reason: 'New Campaign',
                parent: c
            }
            ).then(console.log).catch(console.error); 

            guild.channels.create(args[0], 
            { 
                type: 'voice', 
                reason: 'New Campaign',
                parent: c
            }).then(console.log).catch(console.error);

        }).catch(console.error); 
        
    },
}
