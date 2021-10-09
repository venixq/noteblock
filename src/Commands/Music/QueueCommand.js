const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../Utility/CreateEmbed');
const { chunk } = require('../../Utility/Chunk');
const Pagination = require('../../Utility/Pagination');

module.exports = class QueueCommand extends Command {
  constructor() {
    super('queue', {
      aliases: ['queue', 'q'],
      description: {
        content: 'Bekomme die jetzige Queue',
      },
      category: 'Music',
      cooldown: 3000,
    });
  }

  async exec(msg) {
    try {
      const GuildPlayers = this.client.erela.players.get(msg.guild.id);
      if (!GuildPlayers) return msg.channel.send({ embeds: [CreateEmbed('info', '⛔ | Es spielt gerade keine Musik')] });
      if (GuildPlayers.queue.size < 1) {
        return msg.reply({
          embeds: [CreateEmbed('info', `
            Jetzt Spielt:
            \`\`\`css
            ${GuildPlayers?.queue.current?.title} | [${GuildPlayers?.queue.current?.requester.username}]
            \`\`\`
            Nächster Song:
            \`\`\`css
            ${GuildPlayers?.queue.values().next().value ? `${GuildPlayers.queue.values().next().value.title} | [${GuildPlayers.queue.values().next().value.requester.username}]` : 'None.'}
            \`\`\`
            `)],
        });
      }
      const pages = chunk(GuildPlayers?.queue.map((x, i) => `\`${i + 1}\` ${x.title} [${x.requester}]`), 7);
      const embed = CreateEmbed('info').setAuthor(`${msg.guild?.name} Queue Liste`, msg.guild.iconURL());
      await new Pagination(msg, {
        pages,
        embed,
        edit: (index, emb, page) => emb.setDescription(Array.isArray(page) ? page.join('\n') : page)
          .setFooter(`Page ${index + 1} of ${pages.length}`),
      }).start();
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | Ein Fehler ist aufgetreten')] });
    }
  }
};
