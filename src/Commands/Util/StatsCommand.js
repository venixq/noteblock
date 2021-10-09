const { stripIndent } = require('common-tags');
const { Command } = require('discord-akairo');
const ms = require('ms');
const Discord = require('discord.js');
const { CreateEmbed } = require('../../Utility/CreateEmbed');
const { version } = require('../../../package.json');

module.exports = class StatsCommand extends Command {
  constructor() {
    super('stats', {
      aliases: ['stats'],
      description: {
        content: 'Sendet die Statistiken des Bots',
      },
      category: 'Util',
      cooldown: 3000,
    });
  }

  async exec(msg) {
    try {
      msg.channel.send({
        embeds: [CreateEmbed('info', stripIndent`
System Statistics:
\`\`\`js
Operating System: ${process.platform}
Node.js: ${process.version}
Version: ${version}
Uptime: ${ms(this.client.uptime, { long: true })}
Discord.js: ${Discord.version}
\`\`\`
`)],
      });
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | Ein Fehler ist aufgetreten')] });
    }
  }
};
