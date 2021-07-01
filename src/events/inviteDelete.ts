import * as Discord from 'discord.js';
import AppConfig    from '../types/AppConfig';
import {InviteLog}  from '../models/InviteLog';

/**
 * Discord inviteDelete event handler.
 * @param client
 * @param config
 * @param invite
 *
 * @author Carlos Amores
 * {@link https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-inviteDelete}
 */
export async function handleEvent(client : Discord.Client, config : AppConfig, invite : Discord.Invite) : Promise<void>
{
    if (config.tracked_guilds.includes(invite.guild.id))
    {
        let invLog : InviteLog = new InviteLog(
            {
                owner_id  : invite.inviter.id,
                guild_id  : invite.guild.id,
                uses      : invite.uses,
                processed : false
            }
        );
        invLog.save().catch(console.error);
    }
}
