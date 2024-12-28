module.exports = {
  name: 'ping',
  aliases: ['p'],
  async execute(message) {
      await message.delete();
      const pingMessage = await message.channel.send('🏓 Checking your ping...');

      const messageTimestamp = Date.now();
      await pingMessage.edit('🏓 Calculating...');
      const ping = Date.now() - messageTimestamp;

      await pingMessage.edit(`🏓 Pong! Ping is ${ping} ms`);
  },
};
