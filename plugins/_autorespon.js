let fs = require('fs')

let handler = m => m

handler.all = async function (m, { isBlocked }) {

    if (isBlocked) return

    let setting = global.db.data.settings

    // ketika ada yang invite/kirim link grup di chat pribadi

    if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('Buka tautan ini')) && !m.isBaileys && !m.isGroup) {

        this.reply(m.chat, `┌───── *「 𝗜𝗡𝗩𝗜𝗧𝗘 𝗚𝗥𝗨𝗣 」*─────
➥ Allo mypren Kalau mau Invite Bayar ya gengs👋
➥ Jangan mau enak aja, tenang bakalan dijagain Grup lu
╔════════════════════════
║  𝙊𝙒𝙉𝙀𝙍 @${global.owner[0]}
╠════════════════════════
║╭──❉ 「 𝗗𝗢𝗡𝗔𝗦𝗜 」 ❉──────
║│➸ *DANA* : 081360482998
║│➸ *PULSA*: 081360482998
║│➸ *OVO*: 081360482998
║╰──────────────────
╠════════════════════════
║╭──❉ 「 𝗦𝗘𝗪𝗔 𝗕𝗢𝗧 」 ❉─────
║│➸ 𝟏 ᗷᑌᒪᗩᑎ    : _Rp._ *5.000*
║│➸ 𝟑 ᗷᑌᒪᗩᑎ       : _Rp._ *10.000*
║│➸ 𝟓 ᗷᑌᒪᗩᑎ : _Rp._ *15.000*
║│➸ ᑭEᖇᗰᗩᑎEᑎ : _Rp._ *20.000*
║╰──────────────────    
╚════════════════════════

`.trim(), m, { contextIfo: { mentionedJid: [global.owner[0] + '@s.whatsapp.net'] } })

}

    // salam

    let reg = /(ass?alam|اَلسَّلاَمُ عَلَيْكُمْ|السلام عليکم)/i

    let isSalam = reg.exec(m.text)

    if (isSalam && !m.fromMe) {

        m.reply(`وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ\n_*wa\'alaikumussalam wr.wb.*_`)

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
