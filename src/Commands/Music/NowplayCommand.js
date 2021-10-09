const { stripIndent } = require('common-tags');
const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../Utility/CreateEmbed');

module.exports = class NowPlayCommand extends Command {
  constructor() {
    super('nowplay', {
      aliases: ['nowplay', 'np'],
      description: {
        content: 'Get the current playing',
      },
      category: 'Music',
      cooldown: 3000,
    });
  }

  async exec(msg) {
    try {
      const GuildPlayers = this.client.erela.players.get(msg.guild.id);
      if (!GuildPlayers) return msg.channel.send({ embeds: [CreateEmbed('info', '⛔ | Es spielt keine musik.')] });
      return msg.channel.send({
        embeds: [CreateEmbed('info', stripIndent`
      Jetzt spielt: 
      \`\`\`css
      ${GuildPlayers.queue.current.title} | [${GuildPlayers.queue.current.requester.username}]
      \`\`\`

      Nächster Song:
      \`\`\`css
      ${GuildPlayers.queue.values().next().value ? `${GuildPlayers.queue.values().next().value.title} | [${GuildPlayers.queue.values().next().value.requester.username}]` : 'None.'}
      \`\`\`
      `)],
      });
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | Es ist ein Fehler aufgetreten')] });
    }
  }
};
