import { ApplicationCommandManager, GuildApplicationCommandManager } from 'discord.js'

import { ping } from './commands/ping'
import { join } from './commands/join'
import { waitList } from './commands/wait-list'
import { matches } from './commands/matches'
import { match } from './commands/match'
import { Command, isGuildCommand } from './types'

const allCommands: Command[] = [ping, join, waitList, matches, match]
const commandsMap = Object.fromEntries(allCommands.map((cmd) => [cmd.name, cmd]))

const registerCommands = async (
  commandManager: ApplicationCommandManager | GuildApplicationCommandManager,
  commands: Command[],
) => {
  for (const cmd of commands) {
    await commandManager.create(cmd)
    console.log(`CREATED COMMAND ${cmd.name}`)
  }
}

export const registerGuildCommands = (commandManager: GuildApplicationCommandManager, guildId: string) => {
  const guildCommands = allCommands.filter((cmd) => isGuildCommand(cmd) && cmd.guildId === guildId)
  return registerCommands(commandManager, guildCommands)
}

export const registerGlobalCommands = (commandManager: ApplicationCommandManager) => {
  const globalCommands = allCommands.filter((cmd) => !isGuildCommand(cmd))
  return registerCommands(commandManager, globalCommands)
}

export const getCommand = (commandName: string): Command | undefined => commandsMap[commandName]
