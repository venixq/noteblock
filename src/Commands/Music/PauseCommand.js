const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../Utility/CreateEmbed');

module.exports = class PauseCommand extends Command {
  constructor() {
    super('pause', {
      aliases: ['pause'],
      description: {
        content: 'Pausiere den jetztigen Song',
      },
      category: 'Music',
      cooldown: 3000,
    });
  }

  async exec(msg) {
    try {
      const GuildPlayers = this.client.erela.players.get(msg.guild.id);
      if (!GuildPlayers) return msg.channel.send({ embeds: [CreateEmbed('info', '⛔ | Es spielt gerade keine Musik.')] });
      if (!msg.member.voice.channelId) return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | Du musst erst einem voice channel joinen.')] });
      if (msg.member.voice.channelId !== GuildPlayers.voiceChannel) return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | Du musst im gleichen channel sein wie ich.')] });
      GuildPlayers.pause(true);
      return msg.channel.send({ embeds: [CreateEmbed('info', '👌 | Queue pausiert')] });
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | Es ist ein fehler aufgetreten.')] });
    }
  }

  /**
   *
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async executeSlash(interaction) {
    try {
      const GuildPlayers = this.client.erela.players.get(interaction.guild.id);
      if (!GuildPlayers) return interaction.editReply({ embeds: [CreateEmbed('info', '⛔ | Es spielt gerade keine Musik.')] });
      if (!interaction.member.voice.channelId) return interaction.editReply({ embeds: [CreateEmbed('warn', '⛔ | Du musst erst einemm voice channel joinen.')] });
      if (interaction.member.voice.channelId !== GuildPlayers.voiceChannel) return interaction.editReply({ embeds: [CreateEmbed('warn', '⛔ | Du musst im gleichen voice channel sein wie ich.')] });
      GuildPlayers.pause(true);
      return interaction.editReply({ embeds: [CreateEmbed('info', '👌 | Queue pausiert')] });
    } catch (e) {
      this.client.logger.error(e.message);
      return interaction.editReply({ embeds: [CreateEmbed('warn', '⛔ | Es ist ein fehler aufgetreten')] });
    }
  }
};
