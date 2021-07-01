# Vicinity Gaming's Discord Moderation Bot

Every Discord server needs some degree of order. This is Vicinity's custom one-size-fits-all solution. From notifying
when a member leaves or joins the server to permanently revoking their ~~existence~~ server access, this versatile
moderation bot does just about everything Vicinity needs.

## Environment variables

The bot is intended to work in a Docker container. As such, sensitive information like bot token, database credentials,
etc. is passed as environment variables when running the container. The necessary environment variables are the
following:

`DISCORD_CLIENT_TOKEN`  
The client token the bot is going to use to operate.

`DISCORD_MYSQL_HOST`  
The address of the MySQL server the bot is going to use.

`DISCORD_MYSQL_DB`  
The database the bot is going to connect to. It should follow the schema represented by
the [database models](/src/models).

`DISCORD_MYSQL_USER`  
The name of the user the bot is going to use when connecting to the database.

`DISCORD_MYSQL_PASS`  
The password for the user the bot is going to use when connecting to the database.

`DISCORD_MYSQL_PORT`  
The port number of the MySQL server the bot is going to connect to.

Other OPTIONAL environment variables:

`DEBUG_MODE`  
Determines whether the bot will log debug info to the console (as the debug event triggers). The debug mode can only be
activated by setting this environment variable to `true`; anything else will not enable debug mode.

`RUN_WITHOUT_MYSQL`  
Allows the bot to start without trying to connect to a MySQL database. This option will only cause an effect when it is
set exactly to `true`.

## Config file

The configuration file contains all the relevant information to allow the bot to work properly and its schema is defined
in the [AppConfig interface](/src/types/AppConfig.ts). Here is a brief example of what it could look like:

```json
{
  "tracked_guilds": [
      "guild_id"
  ]
}
```

### Config file breakdown

`tracked_guilds`  
This array contains the Discord IDs of the Guilds the bot should actively be checking for invites (for now; it will do
more things later on).
