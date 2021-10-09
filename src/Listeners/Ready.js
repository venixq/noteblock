const { Listener } = require('discord-akairo');
const slashCommands = require('../Utility/SlashCommands');
const { logger } = require('../Utility/Logger');
const config = require('../config');

module.exports = class Readylistener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      category: 'client',
      event: 'ready',
    });
  }

  async exec() {
    this.client.logger.info(`Bot gestartet mit ${this.client.guilds.cache.size} Servern`);
    this.client.user.setActivity(`${this.client.config.prefix} help`, { type: 1 });
    this.client.erela.init(this.client.user.id);
    if (!config.updateSlash) return;
    /* eslint no-restricted-syntax: "off" */
    for (const command of slashCommands) {
      this.client.application.commands.create(command.toJSON());
      logger.info(`Erstelle ${command.name.toUpperCase()} Slash Commands`);
    }
  }
};
