const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../Utility/CreateEmbed');

module.exports = class PlayCommand extends Command {
  constructor() {
    super('play', {
      aliases: ['play', 'p'],
      description: {
        content: 'Spiele Musik.',
      },
      category: 'Music',
      cooldown: 3000,
      args: [
        {
          id: 'query',
          type: 'string',
          match: 'rest',
          prompt: {
            start: 'What music you want to play?',
          },
        },
      ],
    });
  }

  async exec(msg, { query }) {
    try {
      const MusicTracks = await this.client.erela.search(query, msg.author);
      if (MusicTracks.loadType === 'NO_MATCHES') return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | Kein Ergebnis gefunden.')] });
      if (MusicTracks.loadType === 'LOAD_FAILED') return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | Es ist ein fehler beim laden des Songs aufgetreten.')] });
      const GuildPlayers = this.client.erela.players.get(msg.guild.id);
      if (!msg.member.voice.channelId) return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | Du musst einem voice channel joinen.')] });
      if (!GuildPlayers) {
        const player = await this.client.erela.create({
          guild: msg.guild.id,
          voiceChannel: msg.member.voice.channelId,
          textChannel: msg.channel.id,
          selfDeafen: true,
        });
        player.connect();
        /* eslint no-restricted-syntax: "off" */
        if (MusicTracks.loadType === 'PLAYLIST_LOADED') {
          for (const track of MusicTracks.tracks) {
            player.queue.add(track);
          }
          msg.channel.send({ embeds: [CreateEmbed('info', `☑ | Playlist hinzugefügt ${MusicTracks.playlist.name} [${msg.author}] [\`${MusicTracks.tracks.length} Songs\`]`)] });
        } else {
          player.queue.add(MusicTracks.tracks[0]);
          msg.channel.send({ embeds: [CreateEmbed('info', `☑ | Song hinzugefügt \`${MusicTracks.tracks[0].title}\` [${msg.author}]`)] });
        }
        return player.play();
      }
      if (msg.member.voice.channelId !== GuildPlayers.voiceChannel) return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | Du musst im gleichen channel sein wie ich.')] });
      if (MusicTracks.loadType === 'PLAYLIST_LOADED') {
        for (const track of MusicTracks.tracks) {
          GuildPlayers.queue.add(track);
        }
        return msg.channel.send({ embeds: [CreateEmbed('info', `☑ | Playlist hinzugefügt ${MusicTracks.playlist.name} [${msg.author}] [\`${MusicTracks.tracks.length} Songs\`]`)] });
      }
      GuildPlayers.queue.add(MusicTracks.tracks[0]);
      return msg.channel.send({ embeds: [CreateEmbed('info', `☑ | Song hinzugefügt \`${MusicTracks.tracks[0].title}\` [${msg.author}]`)] });
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
    const query = interaction.options.getString('query');
    if (!query) interaction.editReply({ embeds: [CreateEmbed('info', '⛔ | Nenne einen Song Namen.')] });
    const MusicTracks = await this.client.erela.search(query, interaction.user);
    if (MusicTracks.loadType === 'NO_MATCHES') return interaction.editReply({ embeds: [CreateEmbed('warn', '⛔ | Kein Ergebnis gefunden.')] });
    if (MusicTracks.loadType === 'LOAD_FAILED') return interaction.editReply({ embeds: [CreateEmbed('warn', '⛔ | Es ist ein fehler beim laden des Songs aufgetreten.')] });
    const GuildPlayers = this.client.erela.players.get(interaction.guild.id);
    if (!interaction.member.voice.channelId) return interaction.editReply({ embeds: [CreateEmbed('warn', '⛔ | Du musst einem voice channel joinen.')] });
    if (!GuildPlayers) {
      const player = await this.client.erela.create({
        guild: interaction.guild.id,
        voiceChannel: interaction.member.voice.channelId,
        textChannel: interaction.channel.id,
        selfDeafen: true,
      });
      player.connect();
      /* eslint no-restricted-syntax: "off" */
      if (MusicTracks.loadType === 'PLAYLIST_LOADED') {
        for (const track of MusicTracks.tracks) {
          player.queue.add(track);
        }
        interaction.editReply({ embeds: [CreateEmbed('info', `☑ | Playlist hinzugefügt ${MusicTracks.playlist.name} [${interaction.user}] [\`${MusicTracks.tracks.length} Songs\`]`)] });
      } else {
        player.queue.add(MusicTracks.tracks[0]);
        interaction.editReply({ embeds: [CreateEmbed('info', `☑ | Song hinzugefügt \`${MusicTracks.tracks[0].title}\` [${interaction.user}]`)] });
      }
      return player.play();
    }
    if (interaction.member.voice.channelId !== GuildPlayers.voiceChannel) return interaction.editReply({ embeds: [CreateEmbed('warn', '⛔ | Du musst im gleichen channel sein wie ich.')] });
    if (MusicTracks.loadType === 'PLAYLIST_LOADED') {
      for (const track of MusicTracks.tracks) {
        GuildPlayers.queue.add(track);
      }
      return interaction.editReply({ embeds: [CreateEmbed('info', `☑ | Playlist hinzugefügt ${MusicTracks.playlist.name} [${interaction.user}] [\`${MusicTracks.tracks.length} Songs\`]`)] });
    }
    GuildPlayers.queue.add(MusicTracks.tracks[0]);
    return interaction.editReply({ embeds: [CreateEmbed('info', `☑ | Song hinzugefügt \`${MusicTracks.tracks[0].title}\` [${interaction.user}]`)] });
  }
};
