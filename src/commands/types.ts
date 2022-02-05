import { ApplicationCommandOptionData, CommandInteraction } from 'discord.js'

export interface Command {
  name: string
  description: string
  options?: ApplicationCommandOptionData[]
  run: (interaction: CommandInteraction) => Promise<void>
}

export interface GuildCommand extends Command {
  guildId: string
}

export const isGuildCommand = (command: Command): command is GuildCommand => 'guildId' in command
