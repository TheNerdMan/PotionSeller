module.exports = {
    name: 'removePlayer',
    description: 'Removes a user to campaign channels',
    args: true,
    usage: '[Campaign Name] [User Name]',
    serverOnly: true,
    aliases: ['yeetPlayer'],
    execute(message, args) {
        const guild = message.guild;
        const category = guild.channels.cache.find(c => c.name == args[0] && c.type == "category");
        if(!category){
            throw `could not find campaign`;
        }
        const user = guild.users.find(c => c.username === args[1]);
        if(!user){
            throw `could not find user`;
        }
        category.overwritePermissions([
            {
                id: user.id,
                deny: ['VIEW_CHANNEL'],
            }
        ]);
},
}
