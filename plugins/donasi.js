let fetch = require('node-fetch')
let handler = async (m, { conn }) => conn.sendButtonLoc(m.chat, await (await fetch(fla + 'donasi')).buffer(), `
*Allo mypren bantu donasi yuk supaya bot aktif selalu👋*
╔═══════════════════
║ _*DONASI UNTUK*_ ᵏʳⁱ𝘽𝙡𝙖𝙘𝙠𝙖𝙩 𝘽𝙤𝙩𝙯៚
╠═══════════════════
║╭──❉ 〔 *𝗗𝗢𝗡𝗔𝗦𝗜* 〕 ❉──────
║│➸ *DANA* : 081360482998
║│➸ *PULSA*: 081360482998
║│➸ *GOPAY*: _*Minta Ke Owner*_
║╰──────────────────
╰═══════════════════

`.trim(), footer, 'Owner', '.owner')
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

module.exports = handler
