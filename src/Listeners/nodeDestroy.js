const { Listener } = require('discord-akairo');

module.exports = class nodeDestroy extends Listener {
  constructor() {
    super('nodeDestroy', {
      event: 'nodeDestroy',
      emitter: 'erela',
    });
  }

  exec(node) {
    this.client.logger.warn(`Node [${node.options.identifier}] Zerstört`);
  }
};
