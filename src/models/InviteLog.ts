import {AllowNull, AutoIncrement, Column, DataType, Default, Model, PrimaryKey, Table} from 'sequelize-typescript';
import * as Discord                                                                    from 'discord.js';

@Table(
    {
        tableName  : 'invite_logs',
        charset    : 'utf8mb4',
        collate    : 'utf8mb4_unicode_ci',
        timestamps : false
    }
)
/**
 * Class InviteLog
 *
 * Represents an expired Discord guild invite. Used to track the reward a member should receive for recommending a
 * Discord server with their invite link.
 *
 * @author Carlos Amores
 */
export class InviteLog extends Model
{
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT.UNSIGNED)
    /**
     * Row UID.
     */
    public id : bigint;
    @AllowNull(false)
    @Column
    /**
     * The Discord ID of the person who owned the invite.
     */
    public owner_id : Discord.Snowflake;
    @AllowNull(false)
    @Column
    /**
     * The Discord ID of the Guild for which the invite was created.
     */
    public guild_id : Discord.Snowflake;
    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    /**
     * The amount of times the invite has been used which determines the reward the member is going to receive.
     */
    public uses : number;
    @AllowNull(false)
    @Default(false)
    @Column
    /**
     * Whether the member has already been compensated for their efforts.
     */
    public processed : boolean;
}
