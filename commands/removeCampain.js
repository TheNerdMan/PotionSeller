module.exports = {
    name: 'removeCampaign',
    description: 'Removes campaign channels',
    execute(message, args) {
        const guild = message.guild;
            
            const textChannel = guild.channels.cache.find(c => c.name == args[0] && c.type == "text");
            if(!textChannel){
                throw `could not find campaign text`;
            }
            textChannel.delete();

            const voiceChannel = guild.channels.cache.find(c => c.name == args[0] && c.type == "voice");
            if(!voiceChannel){
                throw `could not find campaign voice`;
            }
            voiceChannel.delete();

            const category = guild.channels.cache.find(c => c.name == args[0] && c.type == "category");
            if(!category){
                throw `could not find campaign category`;
            }
            category.delete();
    },
}
