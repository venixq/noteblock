const { Command, Argument } = require('discord-akairo');
const { CreateEmbed } = require('../../Utility/CreateEmbed');

module.exports = class VolumeCommand extends Command {
  constructor() {
    super('Volume', {
      aliases: ['Volume'],
      description: {
        content: 'Change music volume',
      },
      category: 'Music',
      cooldown: 3000,
      args: [
        {
          id: 'volume',
          type: Argument.range('number', 1, 101),
          match: 'rest',
          prompt: {
            start: 'Welche Lautstärke möchtest du haben, wähle von 1-100 aus',
            retry: 'von 1-100',
          },
        },
      ],
    });
  }

  async exec(msg, { volume }) {
    try {
      const GuildPlayers = this.client.erela.players.get(msg.guild.id);
      if (!GuildPlayers) return msg.channel.send({ embeds: [CreateEmbed('info', '⛔ | Es spielt gerade keine Musik.')] });
      if (!msg.member.voice.channelId) return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | Du musst einem voice channel joinen.')] });
      if (msg.member.voice.channelId !== GuildPlayers.voiceChannel) return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | Du musst im gleichen channel sein wie ich.')] });
      GuildPlayers.setVolume(volume);
      return msg.channel.send({ embeds: [CreateEmbed('info', `👌 | Lautsträke auf \`${volume}\` gesetzt`)] });
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | Ein fehler ist aufgetreten')] });
    }
  }
};
