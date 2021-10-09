const { Listener } = require('discord-akairo');

module.exports = class nodeConnect extends Listener {
  constructor() {
    super('nodeConnect', {
      event: 'nodeConnect',
      emitter: 'erela',
    });
  }

  exec(node) {
    this.client.logger.info(`Node [${node.options.identifier}] Verbunden`);
  }
};
