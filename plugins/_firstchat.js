let moment = require('moment-timezone')
let fetch = require('node-fetch')
let wm = global.botwm
let logo = global.logo
let handler = m => m

handler.all = async function (m) {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let username = conn.getName(who)

    if (m.chat.endsWith('broadcast')) return
    //if (m.fromMe) return
    if (m.isGroup) return
    if (db.data.settings.groupOnly) return
    let user = global.db.data.users[m.sender]
    if (new Date - user.pc < 9000000) return // setiap 1 jam sekali
    await this.send4ButtonLoc(m.chat, image, `
*${ucapan()}*
───⬡ 〔 𝐁𝐎𝐓 𝐂𝐇𝐀𝐓 〕 ⬡────
╭───────────────╮
        My name ᵏʳⁱ𝘽𝙡𝙖𝙘𝙠𝙖𝙩 𝘽𝙤𝙩𝙯៚
        Salah satu Bot diwhatsapp
╰───────────────╯
${user.banned ? 'kamu dibanned' : 'Silahkan mematuhi Rules Bot\nDemi kenyamanan kita bersama'}
`.trim(), watermark, footer, user.banned ? '⋮☰ Menu' : 'Verify', user.banned ? '.menu' : `.daftar ${username}.22`, 'Rules', '.rules', 'Owner', '.owner', m)
    user.pc = new Date * 1
}

module.exports = handler
function ucapan() {
    const time = moment.tz('Asia/Jakarta').format('HH')
    res = "Dinihari Ngab👻"
    if (time >= 4) {
        res = "Pagi Ngab🌤"
    }
    if (time > 10) {
        res = "Siang Ngab🌞"
    }
    if (time >= 15) {
        res = "Sore Ngab🌝"
    }
    if (time >= 18) {
        res = "Malam Ngab🌚"
    }
    return res
}
