import React from 'react'

function Intro() {
  return (
    <div>
     <h1 className='display-8'>STEP 1</h1>
     <p><strong className='text-black'>Create a Telegram Account: </strong>
If you don't already have one, create a Telegram account. You'll need this to set up and manage your bot.
</p>
<p>
<strong className='text-black'>Create a Telegram Bot: </strong>
To create a bot on Telegram, you'll need to interact with the BotFather, which is the official bot that helps you create and manage bots on the platform. Open a chat with <strong className='text-black'>@BotFather</strong> on Telegram and follow these steps:

Use the command <br /> <strong className='text-black'>/newbot </strong> to create a new bot.
Follow the instructions to choose a name and username for your bot.
Once your bot is created, you'll receive a token. This token is required to send messages.</p>
<p>After successfully creating the bot, BotFather will provide you with a message containing your new bot's API token. The token will look something like this: <strong className='text-black'>1234567890:ABCDefGhijKlmnOPQRsTUVwxyz01234.</strong></p>

<h1 className='display-8'>STEP 2</h1>
<p><strong className='text-black'>Copy the Token: </strong>

Copy the entire API token provided by BotFather. This token will be used to authenticate your bot's interactions with the Telegram Bot API.
</p>
<p><strong className='text-black'>Paste Token in Settings: </strong>
In your application or system settings (where you intend to use the bot), locate the field where you need to input the bot token.
Paste the copied API token into the appropriate field.</p>
    </div>
  )
}

export default Intro;
