import * as Discord from 'discord.js';

/**
 * Class AppConfig
 *
 * This class is intended to work as an interface. It represents the properties present in configuration files.
 *
 * The reason this is defined as a class and not a TypeScript interface is because the object values are filled in
 * using Lodash which requires the object variable to be initialised. Thus a class is required to make the
 * initialisation simple through a constructor. Otherwise the object used to initialise the variable would have to
 * contain all of the properties defined in the interface which would clutter the code.
 *
 * {@link https://stackoverflow.com/a/52616197}
 * @author Carlos Amores
 */
export default class AppConfig
{
    public tracked_guilds : Array<Discord.Snowflake>;
}
