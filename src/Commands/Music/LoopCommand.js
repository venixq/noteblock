const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../Utility/CreateEmbed');

module.exports = class LoopCommand extends Command {
  constructor() {
    super('loop', {
      aliases: ['loop'],
      description: {
        content: 'Loop guild queue',
      },
      category: 'Music',
      cooldown: 3000,
    });
  }

  async exec(msg) {
    try {
      const GuildPlayers = this.client.erela.players.get(msg.guild.id);
      if (!GuildPlayers) return msg.channel.send({ embeds: [CreateEmbed('info', '⛔ | Es spielt gerade keine Musik')] });
      if (!msg.member.voice.channelId) return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | Du musst erst einem voice channel joinen.')] });
      if (msg.member.voice.channelId !== GuildPlayers.voiceChannel) return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | Du musst im gleichen channel sein wie ich.')] });
      GuildPlayers.setQueueRepeat(!GuildPlayers.queueRepeat);
      return msg.channel.send({ embeds: [CreateEmbed('info', `👌 | ${GuildPlayers.queueRepeat ? 'Loop aktiviert' : 'Loop deaktiviert'}`)] });
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | Es ist ein fehler aufgetreten')] });
    }
  }
};
