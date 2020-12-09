const Discord = require('discord.js');

module.exports = {
    createCampaign: function(config, message) {
        // Syntax !createCampaign {Campaign Name}
        if (message.content.startsWith(`${config.botPrefix}createCampaign`)) {
            const param = message.content.replace(`${config.botPrefix}createCampaign`, "")

            if(param.includes(",")) {
                throw 'Campaign can not contain commas \',\'';
            }

            // Create a new category text channel
            const guild = message.guild;
            guild.channels.create(param, 
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
                guild.channels.create(param, 
                { 
                    type: 'text', 
                    reason: 'New Campaign',
                    parent: c
                }
                ).then(console.log).catch(console.error); 

                guild.channels.create(param, 
                { 
                    type: 'voice', 
                    reason: 'New Campaign',
                    parent: c
                }).then(console.log).catch(console.error);

            }).catch(console.error); 
        }
    },

    removeCampaign: function(config, message) {
        // Syntax !removeCampaign {Campaign Name}
        if (message.content.startsWith(`${config.botPrefix}removeCampaign`)) {
            const param = message.content.replace(`${config.botPrefix}removeCampaign`, "").trim();

            console.log(param)

            if(param.includes(",")) {
                throw 'Campaign can not contain commas \',\'';
            }
            
            const guild = message.guild;
            const category = guild.channels.cache.find(c => c.name == param && c.type == "category");
            if(!category){
                throw `could not find campaign category`;
            }
            category.delete();

            const textChannel = guild.channels.cache.find(c => c.name == param && c.type == "text");
            if(!textChannel){
                throw `could not find campaign text`;
            }
            textChannel.delete();

            const voiceChannel = guild.channels.cache.find(c => c.name == param && c.type == "voice");
            if(!voiceChannel){
                throw `could not find campaign voice`;
            }
            voiceChannel.delete();
        }
    },

    addPlayer: function(config, message) {
        // Syntax !addPlayer {campaign} {playerName}
        if (message.content.startsWith(`${config.botPrefix}addPlayer`)) {
            const params = message.content.replace(`${config.botPrefix}addPlayer`, "").split(',').map(c => c.trim());
            
            const guild = message.guild;
            const category = guild.channels.cache.find(c => c.name == params[0] && c.type == "category");
            if(!category){
                throw `could not find campaign`;
            }
            const user = guild.users.find(c => c.username === params[1]);
            if(!user){
                throw `could not find user`;
            }
            category.overwritePermissions([
                {
                    id: user.id,
                    allow: ['VIEW_CHANNEL'],
                }
            ]);
        }
    },

    removePlayer: function(config, message) {
        // Syntax !removePlayer {campaign} {playerName}
        if (message.content.startsWith(`${config.botPrefix}removePlayer`)) {
            const params = message.content.replace(`${config.botPrefix}removePlayer`, "").split(',').map(c => c.trim());
            
            const guild = message.guild;
            const category = guild.channels.cache.find(c => c.name == params[0] && c.type == "category");
            if(!category){
                throw `could not find campaign`;
            }
            const user = guild.users.find(c => c.username === params[1]);
            if(!user){
                throw `could not find user`;
            }
            category.overwritePermissions([
                {
                    id: user.id,
                    deny: ['VIEW_CHANNEL'],
                }
            ]);
        }
    },

    help: function(config, message) {
        if(message.content.startsWith(`${config.botPrefix}help`)) {
            const param = message.content.replace(`${config.botPrefix}help`, "")
           
            switch (param) {
                case `createCampaign`:
                    message.reply(`                    
                    ${config.botPrefix}createCampaign {Campaign name}
                        Creates a new category, text and voice channel for the specified name
                    `);
                    break;

                case `addPlayer`:
                message.reply(`                    
                ${config.botPrefix}addPlayer {Campaign name}, {Player Name}
                    Lets a user see the campaign, send messages and join voice channels. 
                `);
                    break;
                
                default:
                    message.reply(`
                    All parameters are split with ','
                    ${config.botPrefix}createCampaign
                        Creates a new campaign.
    
                    ${config.botPrefix}addPlayer {Campaign name}, {Player Name}
                        Lets a user see the campaign. 
                    `);
                    break;
            }
        }
    },
}
