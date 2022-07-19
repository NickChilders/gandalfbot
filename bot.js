var Discord = require('discord.io');
var logger = require('winston');
const { MessageEmbed } = require('discord.js');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
token: process.env.SECRET,
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
                        "I will not say: do not weep; for not all tears are an evil.",
                        "Fool of a Took! Throw yourself in next time and rid us of your stupidity!",
                        "It will be very good for you, and most amusing for me."
        ];
        // Random number from 0 to 8 for the array index
        let random = Math.floor(Math.random() * 9);
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
            case 'Gandalf-Google':
                const newArg = message.replace(/!Gandalf-Google/,"");
                const searchTopic = newArg.replace(/ /g,'+');
                let googleResult = `https://google.com/search?q=${searchTopic}`
                let des =  `Here's what Google brought up for ${newArg}`
                var data = {
                    to: channelID,
                    message: "",
                    embed: {
                        title: "Hold on, let me Google that for you...",
                        description: des,
                        url: googleResult,
                        color: 7121033,
                        image: {
                            url: `https://i.imgur.com/ZxoJhn7.jpg`
                        }
                    }
                };
                bot.sendMessage(data);
            break;
            case 'help':
                let helpMes =  `Commands:\n
                                !Gandalf -\tRandom Gandalf quote.\n
                                !Balrog -\tGandalf quote and illustration.\n
                                !Take-it -\tGandalf GIF.\n
                                !Gandalf? -\tGandalf quote and picture from film.\n
                                !Gandalf-Google <user input> -\tEmbedded link to Google 
                                search results for user input.\n`
                bot.sendMessage({
                    to: channelID,
                    message: helpMes
                });
            break;
        }
        
    }

});
