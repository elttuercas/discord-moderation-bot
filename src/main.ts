import * as Discord from 'discord.js';
import * as fs      from 'fs';
import * as _       from 'lodash';
import {Sequelize}  from 'sequelize-typescript';
import AppConfig    from './types/AppConfig';
import EventFile    from './types/EventFile';

// Wrap the entrypoint in a function that is automatically called so that we may exit early in case of an error.
function main() : void
{
    const client = new Discord.Client();

    let config : AppConfig = new AppConfig();
    _.extend(config, require('../config.json'));

    if (process.env.RUN_WITHOUT_MYSQL !== 'true')
    {
        try
        {
            new Sequelize(
                {
                    host     : process.env.DISCORD_MYSQL_HOST,
                    database : process.env.DISCORD_MYSQL_DB,
                    dialect  : 'mysql',
                    username : process.env.DISCORD_MYSQL_USER,
                    password : process.env.DISCORD_MYSQL_PASS,
                    port     : Number(process.env.DISCORD_MYSQL_PORT),
                    pool     : {
                        max  : 5,
                        min  : 0,
                        idle : 10000
                    },
                    models   : [__dirname + '/models/*.ts'],
                    logging  : false
                }
            );
        }
        catch (e)
        {
            console.error(e);
            return;
        }
    }

    _.each(fs.readdirSync('./events/'), function (file : string)
    {
        if (!file.endsWith('.js'))
        {
            return;
        }

        let evtName : string    = file.split('.')[0];
        let evtFile : EventFile = require('./events/' + file);
        client.on(evtName, evtFile.handleEvent.bind(null, client, config));
        delete require.cache[require.resolve('./events/' + file)];
    });

    client.login(process.env.DISCORD_CLIENT_TOKEN).catch(console.error);
}

main();
