const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../Utility/CreateEmbed');

module.exports = class BoundCommand extends Command {
  constructor() {
    super('bound', {
      aliases: ['bound'],
      description: {
        content: 'Setze einen Musik channel',
      },
      category: 'Music',
      cooldown: 3000,
    });
  }

  async exec(msg) {
    try {
      const GuildPlayers = this.client.erela.players.get(msg.guild.id);
      if (!GuildPlayers) return msg.channel.send({ embeds: [CreateEmbed('info', '⛔ | Es spielt gerade keine Musik.')] });
      if (!msg.member.voice.channelId) return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | Du musst zuerst einem voice channel joinen.')] });
      if (msg.author.id !== GuildPlayers.queue?.current.requester.id) return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | Du kannst das nicht tuen.')] });
      await GuildPlayers.setVoiceChannel(msg.member.voice.channelId);
      await GuildPlayers.setTextChannel(msg.channel.id);
      return msg.channel.send({ embeds: [CreateEmbed('info', '👌 | Channel geupdated')] });
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | Ein fehler ist aufgetreten')] });
    }
  }
};
