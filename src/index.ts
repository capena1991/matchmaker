import { Client, Intents } from 'discord.js'

import { token } from './utils/config'

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.once('ready', () => {
  if (!client.user) {
    throw 'Logged in but no user.'
  }
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setPresence({ status: 'online', activities: [{ name: 'love in the air.', type: 'WATCHING' }] })
})

client.login(token).catch(() => {
  process.exit()
})
