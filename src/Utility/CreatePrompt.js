const { stripIndents } = require('common-tags');

function CreatePrompt(prompt) {
  return stripIndents`
    **❔ |** *${prompt}*
    **🔘 |** *Du hast \`30\` sekunden dich zu entscheiden*
    **🔘 |** *Schreibe \`cancel\` um es abzubrechen*
    `;
}

module.exports = { CreatePrompt };
