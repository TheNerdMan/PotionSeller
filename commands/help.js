const Config = require('./config/config.js');

module.exports = {
    name: 'help',
    description: 'List all commands or details about a single command',
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if(!args.length) {
            data.push('These are my commands:');
            data.push(commands.map(c => c.name).join(', '));
            data.push(`\n Use \'${Config.botConfig.botPrefix}help [command name]\' to get info about that command`);

            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve DM\'ed you traveller.');
                })
                .catch(() => {
                    console.error(`Couldn't send help to ${message.author.tag} \n`, error);
                    message.reply(`Uh-Oh traveller, seems like you can't hear my whisper! (DM failed to send)`);
                });
        };

        const name = args[0].toLowerCase();
        const command = commands.get(name);

        if(!command) {
            return message.reply(`Thats not a command traveller.`);
        }

        data.push(`Name: ${command.name}`);

        message.channel.send(data, { split: true });

    }
}
