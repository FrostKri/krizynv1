let handler = async (m, { conn }) => {
    let { anon, anticall, antispam, antitroli, backup, jadibot, groupOnly, nsfw } = global.DATABASE.data.settings
    const chats = conn.chats.all()
    const groups = chats.filter(v => v.jid.endsWith('g.us'))
    let totaljadibot = [...new Set([...global.conns.filter(conn => conn.user && conn.state !== 'close').map(conn => conn.user)])]

    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)


    m.reply(`
╭───◪ 〔  𝙎 𝙏 𝘼 𝙏 𝙐 𝙎  〕
├֍ Aktif selama ${uptime}
├֍ Baterai ${conn.battery != undefined ? `${conn.battery.value}% ${conn.battery.live ? '🔌 pengisian' : ''}` : 'tidak diketahui'}
├֍ *${groups.length}* Grup
├֍ *${chats.length - groups.length}* Chat Pribadi
├֍ *${Object.keys(global.DATABASE.data.users).length}* Pengguna
├֍ *${totaljadibot.length}* Jadibot
├֍ *${conn.blocklist.length}* Terblock
├֍ *${Object.entries(global.DATABASE.data.chats).filter(chat => chat[1].isBanned).length}* Chat Terbanned
├֍ *${Object.entries(global.DATABASE.data.users).filter(user => user[1].banned).length}* Pengguna Terbanned
╰──────────❒
╭───◪ 〔 𝙈𝙊𝘿𝙀 𝙊𝙉 - 𝙊𝙁𝙁〕
├֍ ${anon ? '✅Sudah Aktif' : '❌Tidak Aktif'} *Anon Chat*
├֍ ${anticall ? '✅Sudah Aktif' : '❌Tidak AKtif'} *Anti Call*
├֍ ${antispam ? '✅Sudah AKtif' : '❌Tidak Aktif'} *Anti Spam*
├֍ ${antitroli ? '✅Sudah Aktif' : '❌Tidak Aktif'} *Anti Troli*
├֍ ${backup ? '✅Sudah Aktif' : '❌Tidak Aktif'} *Auto Backup DB*
├֍ ${groupOnly ? '✅Sudah Aktif' : '❌Tidak Aktif'} *Mode Grup*
├֍ ${jadibot ? '✅Sudah Aktif' : '❌Tidak Aktif'} *Jadi Bot*
├֍ ${nsfw ? '✅Sudah Aktif' : '❌Tidak Aktif'} *Mode Nsfw*
╰──────────❒
    `.trim())
await conn.send2ButtonLoc(m.chat, await(await fetch(image)).buffer(), str, 'ᴹᴿ𝙄𝙩𝙨𝙠𝙧𝙞 ×፝֟͜× ', 'Owner', '.owner', 'Menu', '.menu', m)
}
handler.help = ['mystat']
handler.tags = ['info']
handler.command = /^mystat$/i

module.exports = handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
