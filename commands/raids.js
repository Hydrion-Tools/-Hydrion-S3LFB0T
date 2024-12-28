const { prefix, raidsEnabled, moreCmdSoonMessage, enableRaidsMessage } = require('../bot');

module.exports = {
  name: 'raids',
  aliases: ['r'],
  async execute(message, args) {
    const page = args[0];
    await message.delete();
    let raidsMessage;
    if (raidsEnabled === true) {
        if (page === "1") {
            raidsMessage = `
🚨 **Raids Commands - Page 1** 🚨
>------------------------------------<
        
⚔️ **Command List:**
    
🌪️ ${prefix}spam <amount> <interval in ms> <msg>           -  Spam a message in a specified channel
💥 ${prefix}nuke                                           -  Execute a nuke command (use responsibly)
🚀 ${prefix}raidstart <msg>                                -  Start a raid operation in the server
🛡️ ${prefix}raidstop                                       -  Stop the ongoing raid operation
🔧 ${prefix}clear <number>                                 -  Clear the specified number of messages from the channel
        
>------------------------------------<
🌟 For more raid commands, use: \`${prefix}raids 2\`
>------------------------------------<
✨ Selfbot crafted by \`@hydradevx\`
>------------------------------------<
            `; 
        } else if (page === "2") {
            raidsMessage = `
🚨 **Raids Commands - Page 2** 🚨
>------------------------------------<
                
⚔️ **Command List:**
                
🔨 ${prefix}deleteChannels                           -  Delete all channels in the server (requires confirmation)
🎭 ${prefix}deleteRoles                              -  Delete all roles in the server (requires confirmation)
🚫 ${prefix}banAllMembers                            -  Ban all members in the server (requires confirmation)
🧹 ${prefix}clearAllMessages                         -  Delete all messages across all channels (requires confirmation)
📁 ${prefix}deleteCategories                         -  Delete all categories in the server (requires confirmation)
🔥 ${prefix}destroy                                  -  Perform a full server wipe, deleting channels, roles, members, and categories (requires confirmation)
                
>------------------------------------<
🌟 Use these commands responsibly. Always double-check before proceeding!
>------------------------------------<
✨ Selfbot crafted by \`@hydradevx\`
>------------------------------------<
            `; 
        } else {
            return message.channel.send(moreCmdSoonMessage);
        }
    
        await message.channel.send(raidsMessage);
    }
    else if (raidsEnabled === false) {
        await message.channel.send(enableRaidsMessage);
        message.delete();
    }
  },
};