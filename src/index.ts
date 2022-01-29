import { Client, Intents } from 'discord.js'
import { getCommand, registerGlobalCommands, registerGuildCommands } from './commands'

import { testGuildId, token } from './utils/config'

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.once('ready', async () => {
  if (!client.user) {
    throw 'Logged in but no user.'
  }
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setPresence({ status: 'online', activities: [{ name: 'love in the air.', type: 'WATCHING' }] })

  const application = client.application
  if (application) {
    await registerGlobalCommands(application.commands)
  }
  const guild = client.guilds.cache.get(testGuildId)
  if (guild) {
    await registerGuildCommands(guild.commands, testGuildId)
  }
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return
  }

  const { commandName } = interaction

  const command = getCommand(commandName)

  if (!command) {
    console.log(`INVALID COMMAND: ${commandName}`)
    await interaction.reply("That's not a valid command. What are you trying to do? :unamused:")
    return
  }

  try {
    console.log(`EXECUTING SLASH COMMAND ${command.name}`)
    await command.run(interaction)
  } catch (error) {
    console.error(error)
    await interaction.reply('Oops! There was an error trying to execute that command! :disappointed:')
  }
})

client.login(token).catch(() => {
  process.exit()
})
