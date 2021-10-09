const { Listener } = require('discord-akairo');

module.exports = class playerMove extends Listener {
  constructor() {
    super('playerMove', {
      event: 'playerMove',
      emitter: 'erela',
    });
  }

  async exec(player, oldChannel, newChannel) {
    this.client.logger.info(newChannel ? `Der nutzer hat den channel zu [${newChannel}] gewechselt` : 'Jemand hat mich aus dem channel geworfen');
    /* eslint no-param-reassign: "off" */
    try {
      player.setVoiceChannel(newChannel ?? player.voiceChannel);
    } catch (e) {
      player.destroy();
    }
    player.voiceChannel = newChannel;
    setTimeout(() => player.pause(false), 3000);
    return undefined;
  }
};
