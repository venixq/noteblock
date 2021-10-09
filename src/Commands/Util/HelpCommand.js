/* eslint no-restricted-syntax: "off" */
const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../Utility/CreateEmbed');

module.exports = class PingCommand extends Command {
  constructor() {
    super('help', {
      aliases: ['help'],
      description: {
        content: 'Sendet die Commands des Bots',
      },
      category: 'Util',
      cooldown: 3000,
      args: [
        {
          id: 'command',
          type: 'commandAlias',
        },
      ],
    });
  }

  async exec(msg, { command }) {
    try {
      if (!command) {
        const embed = CreateEmbed('info')
          .addField(`${this.client.user.username} Command liste`, `${this.client.config.prefix}help [command]`);
        for (const category of this.handler.categories.values()) {
          embed.addField(String(category), `${category.filter((cmd) => cmd.aliases.length > 0).map((cmd) => `\`${cmd.aliases[0]}\``).join(', ')}`);
        }
        return msg.channel.send({ embeds: [embed] });
      }
      const embed = CreateEmbed('info')
        .addField('Beschreibung', `${command.description.content ? command.description.content : 'None'} ${command.description.ownerOnly ? '\n**[Nicht offen nutzbar]**' : '[Offen nutzbar]'}`)
        .addField('Alias', command.aliases.length > 1 ? `\`${command.aliases.join('` `')}\`` : 'None.', true)
        .addField('Beispiele', command.description.examples && command.description.examples.length ? `\`${command.aliases[0]} ${command.description.examples.join(`\`\n\`${command.aliases[0]} `)}\`` : 'None.');
      return msg.channel.send({ embeds: [embed] });
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send({ embeds: [CreateEmbed('warn', '⛔ | Ein Fehler ist aufgetreten')] });
    }
  }
};
