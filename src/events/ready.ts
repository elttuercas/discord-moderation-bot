import * as Discord from 'discord.js';

/**
 * Discord ready event handler.
 * @param client
 *
 * @author Carlos Amores
 * {@link https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-ready}
 */
export async function handleEvent(client : Discord.Client) : Promise<void>
{
    client.user?.setPresence(
        {
            status   : 'online',
            activity : {
                name : 'you',
                type : 'WATCHING',
            },
        },
    ).catch(console.error);
}
