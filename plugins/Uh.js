let fetch = require('node-fetch')
let handler = async (m, { conn }) => conn.send2ButtonLoc(m.chat, await (await fetch(fla + 'KRIZYN BOTz')).buffer(), `
📮 𝘊𝘈𝘙𝘐 𝘈𝘑𝘈 𝘋𝘐 𝘎𝘐𝘛𝘏𝘜𝘉 𝘖𝘙 𝘠𝘖𝘜 𝘛𝘜𝘉𝘌
➵͜͡✪ 𝙶𝙸𝚃𝙷𝚄𝙱 :
github.com/frostkri/krizynv1
➵͜͡✪ 𝚈𝙾𝚄 𝚃𝚄𝙱𝙴 :
youtube.com/c/hokenbeusz
➵͜͡✪ 𝙹𝚊𝚗𝚐𝚊𝚗 𝚕𝚞𝚙𝚊 𝚖𝚊𝚖𝚙𝚒𝚛
https://lynk.id/kri.com
`.trim(), ' 𝘋𝘰𝘯𝘵 𝘧𝘰𝘳𝘨𝘦𝘵 𝘵𝘰 𝘧𝘰𝘭𝘭𝘰𝘸 𝘮𝘺 𝘢𝘤𝘤𝘰𝘶𝘯𝘵', 'Thanks', '.tqto', 'Menu','.menu')
handler.help = ['sc krizyn']
handler.tags = ['info']
handler.command = /^(sourcecode|sc|scbot|script|github)$/i

module.exports = handler
