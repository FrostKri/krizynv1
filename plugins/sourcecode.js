let fetch = require('node-fetch')
let handler = async (m, { conn }) => conn.send2ButtonLoc(m.chat, await (await fetch(fla + 'Source code')).buffer(), `
UDAH TAHUN 2022 NI, MASIH AJA NGEMIS NGEMIS👻
-
`.trim(), '© 𝙆𝙧𝙞𝙯𝙮𝙣×͜×', 'Thanks', '.tqto', 'Back','.menu')
handler.help = ['sourcecode']
handler.tags = ['info']
handler.command = /^(sourcecode|sc|scbot|script|github)$/i

module.exports = handler
