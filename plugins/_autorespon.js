let fs = require('fs')
let fetch = require('node-fetch')
let handler = m => m

handler.all = async function (m, { isBlocked }) {

    if (isBlocked) return
    if (m.isBaileys) return
    if (m.chat.endsWith('broadcast')) return
    let setting = db.data.settings[this.user.jid]
    let { isBanned } = db.data.chats[m.chat]
    let { banned } = db.data.users[m.sender]

    // ketika ditag
    try {
        if (m.mentionedJid.includes(this.user.jid) && m.isGroup) {
            await this.send2Button(m.chat,
                isBanned ? `${namabot} tidak aktif` : banned ? 'kamu dibanned' : `𝙆𝙧𝙞𝙯𝙮𝙣 ×͜× di sini, Btw ngapain manggil kangen ya bg?`,
                footer,
                isBanned ? 'Unban' : banned ? 'Pemilik Bot' : 'Menu',
                isBanned ? '.unban' : banned ? '.owner' : '.?',
                m.isGroup ? 'Ban' : isBanned ? 'Unban' : 'Donasi',
                m.isGroup ? '.ban' : isBanned ? '.unban' : '.donasi', m)
        }
    } catch (e) {
        return
    }

    // ketika ada yang invite/kirim link grup di chat pribadi
    if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('Buka tautan ini')) && !m.isBaileys && !m.isGroup && !m.fromMe && !m.isOwner) {
        this.send2ButtonLoc(m.chat, await (awmait fetch(fla + 'sewa bot')).buffer(), `┌───── *「 𝗜𝗡𝗩𝗜𝗧𝗘 𝗚𝗥𝗨𝗣 」*─────
➥ Allo mypren Kalau mau Invite Bayar ya gengs👋
➥ Jangan mau enak aja, tenang bakalan dijagain Grup lu
╔════════════════════════
║  𝙊𝙒𝙉𝙀𝙍 @${global.owner[0]}
╠════════════════════════
║╭──❉ 「 𝗗𝗢𝗡𝗔𝗦𝗜 」 ❉──────
║│➸ *DANA* : 081360482998
║│➸ *PULSA*: 081360482998
║│➸ *GOPAY*: _*Minta Ke Owner*_
║╰──────────────────
╠════════════════════════
║╭──❉ 「 𝗦𝗘𝗪𝗔 𝗕𝗢𝗧 」 ❉─────
║│➸ 𝟏 ᗷᑌᒪᗩᑎ    : _Rp._ *5.000*
║│➸ 𝟑 ᗷᑌᒪᗩᑎ       : _Rp._ *10.000*
║│➸ 𝟓 ᗷᑌᒪᗩᑎ : _Rp._ *15.000*
║│➸ ᑭEᖇᗰᗩᑎEᑎ : _Rp._ *20.000*
║╰──────────────────    
╠════════════════════════
║╭───────────────────
║│ ©𝗕𝗮𝘀𝗲𝗡𝗲𝘄 ${namabot}
║│ 𝘾𝙧𝙚𝙖𝙩𝙤𝙧 𝙗𝙮 ᴹᴿ𝙄𝙩𝙨𝙠𝙧𝙞 ×፝֟͜×
║╰────────────────────
╚════════════════════════`.trim(), footer, 'Dana', '#viadana', 'Pulsa', '#viapulsa', m)
}

    // salam
    let reg = /(ass?alam|اَلسَّلاَمُ عَلَيْكُمْ|السلام عليکم)/i
    let isSalam = reg.exec(m.text)
    if (isSalam && !m.fromMe) {
        m.reply(`وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ\n_wa\'alaikumussalam wr.wb._`)
    }

    // backup db
    if (setting.backup) {
        if (new Date() * 1 - setting.backupDB > 1000 * 60 * 60) {
            let d = new Date
            let date = d.toLocaleDateString('id', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
            await global.db.write()
            this.reply(global.owner[0] + '@s.whatsapp.net', `Database: ${date}`, null)
            this.sendFile(global.owner[0] + '@s.whatsapp.net', fs.readFileSync('./database.json'), 'database.json', '', 0, 0, { mimetype: 'application/json' })
            setting.backupDB = new Date() * 1
        }
    }

    // update status
    if (new Date() * 1 - setting.status > 1000) {
        let _uptime = process.uptime() * 1000
        let uptime = clockString(_uptime)
        await this.setStatus(`Aktif selama ${uptime} | Mode: ${global.opts['self'] ? 'Private' : setting.groupOnly ? 'Hanya Grup' : 'Publik'} | by ᴹᴿ𝙄𝙩𝙨𝙠𝙧𝙞 ×፝֟͜×`).catch(_ => _)
        setting.status = new Date() * 1
    }

}

module.exports = handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
