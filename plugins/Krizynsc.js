let handler  = async (m, { conn, usedPrefix: _p }) => {
ye = `@${m.sender.split`@`[0]}`
let handler = async (m, { conn }) => conn.sendButtonLoc(m.chat, await (await fetch(image)).buffer(), `
let info = `Udah tahun 2022 ni, masih aja ngemis kak👻
`.trim(), footer, 'menu', '.menu')

conn.fakeReply(m.chat, info, '0@s.whatsapp.net', `*${global.packname}*`, 'status@broadcast') 
}
handler.help = ['github']
handler.tags = ['info']
handler.command = ['script', 'sc', 'scbot', 'github']
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 25

module.exports = handler