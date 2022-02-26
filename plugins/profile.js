let PhoneNumber = require('awesome-phonenumber')
let levelling = require('../lib/levelling')
let fetch = require('node-fetch')
let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, usedPrefix }) => {
  let pp = './src/avatar_contact.png'
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  try {
    pp = await conn.getProfilePicture(who)
  } catch (e) {

  } finally {
    let about = (await conn.getStatus(who).catch(console.error) || {}).status || ''
    if (typeof global.db.data.users[who] == "undefined") {
      global.db.data.users[who] = {
        exp: 0,
        limit: 10,
        lastclaim: 0,
        registered: false,
        name: 'Belum Daftar:v',
        age: -1,
        regTime: -1,
        afk: -1,
        afkReason: '',
        banned: false,
        level: 0,
        call: 0,
        role: 'Warrior V',
        autolevelup: false,
        pc: 0,
      }
    }
    let { name, limit, exp, lastclaim, registered, regTime, age, level, role, banned } = global.db.data.users[who]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let username = conn.getName(who)
    let math = max - xp
    let res = `http://hardianto-chan.herokuapp.com/api/rankcard?profile=https://i.ibb.co/vQTHzkh/IMG-20210907-WA0721.jpg&name=${name}&bg=https://i.ibb.co/4YBNyvP/images-76.jpg&needxp=${max}&curxp=${exp}&level=${level}&logorank=https://i.ibb.co/Wn9cvnv/FABLED.png`
    let str = `
┌───❑〘 𝗨 𝗦 𝗘 𝗥  𝗜 𝗡 𝗙 𝗢 〙─────
│📛 Nama : @${who.replace(/@.+/, '')}${about != 401 ? '\n│💋 Info : ' + about : ''}
│🏷️ Nama Reg : *${registered ? '(' + name + ') ' : ''}
│👁️‍🗨️ Umur : ${registered ? + age : ''}
│🔗 Tag : ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
│💥 Api : wa.me/${who.split`@`[0]}
├───────────────────⬡
│💹 Limit : *${limit}*
│💱 Role : *${role}*
│🏧 Level : *${level}*
│🏦 Xp : *${exp} (${exp - min} / ${xp})*
├───────────────────⬡
│💌 Status : ${global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) ? 'Premium User' : 'Free User'}
│🚫 Baned : ${banned}
│👨‍ Register : ${registered ? 'Sudah Terdaftar' : 'Belum Terdaftar'}
│⌛ Date Register: ${registered ? ' (' + new Date(regTime).toLocaleString() + ')' : ''}
└───────────────────⬡
╭─────────────────
│𝗡𝗢𝗧𝗘: 
│➥𝙂𝙪𝙣𝙖𝙠𝙖𝙣 𝘽𝙊𝙏 𝙎𝙚𝙘𝙪𝙠𝙪𝙥𝙣𝙮𝙖!
│➥𝙅𝙖𝙣𝙜𝙖𝙣 𝘾𝙖𝙡𝙡/𝙑𝙘 𝘽𝙊𝙏!
│➥𝘿𝙚𝙢𝙞 𝙠𝙚𝙣𝙮𝙖𝙢𝙖𝙣𝙖𝙣 𝙗𝙚𝙧𝙨𝙖𝙢𝙖
╰──────────────────
`.trim()
 let mentionedJid = [who]
    conn.sendFile(m.chat, pp, 'pp.jpg', banned ? 'jiakh ke banned' : str, m, false, { contextInfo: { mentionedJid } })
 const button = {
        buttonText: 'Klik Disini',
        description: '',
        sections:  [{title: "Silahkan di pilih gausah pilih yang gaada", rows: [
        {title: 'Menu Utama', description: "Kembali ke Menu Utama", rowId:".?"},
        {title: 'Sewa Bot', description: "Sewa bot dengan memasukkan bot ke grup kamu", rowId:".sewa"},
        {title: 'Cara Invit?', description: "Cara Memasukkan Bot Di GC", rowId:".tutorbot"},
        {title: 'Nomor Owner', description: "CHAT *P* TIDAK DI BALAS", rowId:".owner"},
       ] }],
        listType: 1
       }
    conn.sendMessage(m.chat, button, MessageType.listMessage, { quoted: m }) 
  }
}
handler.help = ['profile [@user]']
handler.tags = ['tools']
handler.command = /^profile?$/i
module.exports = handler
