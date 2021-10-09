const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../Utility/CreateEmbed');

module.exports = class SkipCommand extends Command {
  constructor() {
    super('skip', {
      aliases: ['skip', 's'],
      description: {
        content: 'Übersrpinge den jetzigen Song',
      },
      category: 'Music',
      cooldown: 3000,
    });
  }

  async exec(msg) {
    try {
      const GuildPlayers = this.client.erela.players.get(msg.guild.id);
      if (!GuildPlayers) return msg.channel.send({ embeds: [CreateEmbed('info', '⛔ | Es spielt gerade keine Musik')] });
      if (!msg.member.voice.channelId) return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | Du musst einem voice channel joinen.')] });
      if (msg.member.voice.channelId !== GuildPlayers.voiceChannel) return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | Du musst im gleichen channel wie ich sein.')] });
      GuildPlayers.stop();
      return msg.channel.send({ embeds: [CreateEmbed('info', '👌 | Song wurde übersprungen')] });
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | Ein fehler ist aufgetreten')] });
    }
  }

  /**
   *
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async executeSlash(interaction) {
    try {
      const GuildPlayers = this.client.erela.players.get(interaction.guild.id);
      if (!GuildPlayers) return interaction.editReply({ embeds: [CreateEmbed('info', '⛔ | There no music playing in this guild')] });
      if (!interaction.member.voice.channelId) return interaction.editReply({ embeds: [CreateEmbed('warn', '⛔ | you must join voice channel to do this.')] });
      if (interaction.member.voice.channelId !== GuildPlayers.voiceChannel) return interaction.editReply({ embeds: [CreateEmbed('warn', '⛔ | you must join voice channel same as me to do this.')] });
      GuildPlayers.stop();
      return interaction.editReply({ embeds: [CreateEmbed('info', '👌 | Skipped current track')] });
    } catch (e) {
      this.client.logger.error(e.message);
      return interaction.editReply({ embeds: [CreateEmbed('warn', '⛔ | An error occured')] });
    }
  }
};
