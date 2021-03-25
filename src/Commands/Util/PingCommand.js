const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../Utility/CreateEmbed');
module.exports = class PingCommand extends Command {
    constructor() {
    super('ping', {
        aliases: ['ping'],
        description: {
            content: 'Gets the bot\'s heartbeat and latency'
        },
        category: 'util',
        cooldown: 3000,
    });
  }
  async exec(msg) {
      const message = await msg.channel?.send("Getting info...");
      const embed = CreateEmbed('info')
      .addField(`⏳ Latency `, `__**${message.createdTimestamp - msg.createdTimestamp}ms**__`)
      .addField("💓 API", `__**${Math.floor(this.client.ws.ping)}ms**__`)
      .setTimestamp();
      setTimeout(function() { message.edit('',embed) }, 5000);
  }
}