var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
const { MessageEmbed } = require('discord.js');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
token: auth.token,
autorun: true
});

bot.on('ready', function (evt) {
logger.info('Connected');
logger.info('Logged in as: ');
logger.info(bot.username + ' - (' + bot.id + ')');
});



bot.on('message', function (user, userID, channelID, message, evt) {

     // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);

        // Array list of replies
        let replies = [ "For though much has been saved, much must now pass away",
                        "For the time comes of the Dominion of Men, and the Elder Kindred shall fade or depart.", 
                        "I am with you at present, but soon I shall not be. You must settle its affairs yourselves", 
                        "My time is over; it is no longer my task to set things to rights, nor to help folk to do so.",
                        "You are grown up now. Grown indeed very high; among the great you are, and I have no longer any fear at all for any of you.", 
                        "Only a small part is played in great deeds by any hero.",
                        "I will not say: do not weep; for not all tears are an evil."
        ];
        // Random number from 0 to 3 for the array index
        let random = Math.floor(Math.random() * 7);

        switch(cmd) {

            // !Gandalf
            case 'Gandalf':
                bot.sendMessage({
                    to: channelID,
                    message: replies[random]
                });
            break;
            // !Balrog
            case 'Balrog':
                bot.uploadFile({
                    to: channelID,
                    message: 'YOU SHALL NOT PASS!',
                    file: 'Balrog.png'
                });
            break;
            //!Gandalf?
            case 'Gandalf?':
                bot.sendMessage({
                    to: channelID,
                    message: "Gandalf? Oh yes... That's what they would call me. Gandalf the Gray. That was my name...*I* am Gandalf the white. And I come back you now - at the turn of the tide."
                });
                bot.uploadFile({
                    to: channelID,
                    file: 'Gandalf_White.png',
                });
            break;
            // !Take-it
            case 'Take-it':
                bot.uploadFile({
                    to: channelID,
                    file: 'DontFrodo.gif'
                });
            break;
            default:  
               bot.uploadFile({
                    to: channelID,
                    file: 'GandalfGoogle.png'
               });
               const newArgs = cmd.split(/ +/);
               const searchTopic = newArgs.join('+')
               let googleResult = `https://google.com/search?q=${searchTopic}`
               const searchEmbed = new MessageEmbed()
               .setColor("#00ff00")
               .setDescription(`Here's what Google came up with for ${searchTopic}!\n${googleResult}`);
               bot.sendMessage({
                   to: channelID,
                   embeds: [searchEmbed]
               })
        }
    }

});
