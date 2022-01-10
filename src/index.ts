import Discord from "discord.js";
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  DiscordGatewayAdapterCreator,
} from "@discordjs/voice";
import { isBlank } from "./utils";
// token here
const TOKEN = "";

const bot = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"],
});

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const audio = [
  "C:/Users/eyok/Downloads/Helicopter.mp3",
  "C:/Users/eyok/Downloads/Japanese_Cartoons.mp3",
  "C:/Users/eyok/Downloads/Intro.mp3",
];

bot.on("ready", () => {
  console.log("I'm ready");
});

bot.on("voiceStateUpdate", (oldMember, newMember) => {
  const newUserChannelId: string = newMember.channelId || "";
  const oldUserChannelId: string = oldMember.channelId || "";

  if (isBlank(newUserChannelId)) throw new Error(`${newUserChannelId} is null or empty!`);
  if (isBlank(oldUserChannelId)) throw new Error(`${newUserChannelId} is null or empty!`);

  if (!oldUserChannelId && newUserChannelId) {
    const conn = joinVoiceChannel({
      channelId: newUserChannelId,
      guildId: newMember.guild.id,
      adapterCreator: newMember.guild.voiceAdapterCreator as DiscordGatewayAdapterCreator,
    });

    const rng = getRandomInt(10);

    const player = createAudioPlayer();
    const sub = conn.subscribe(player);

    // if(rng < 8){
    //     player.play(createAudioResource(audio[0]));
    // } else if (rng === 8){
    //     player.play(createAudioResource(audio[1]));
    // } else {
    //     player.play(createAudioResource(audio[2]));
    // }

    player.play(createAudioResource(audio[0]));

    player.on(AudioPlayerStatus.Idle, () => {
      player.stop();
      conn.destroy();
    });

    player.on("error", (error) => {
      console.log(error);
    });
  } else if (!newUserChannelId) {
    // User leaves a voice channel
  }
});

bot.on("messageCreate", (message) => {
  if (message.content === "!richard help") {
    message.reply("Just do a thing");
  }
  if (message.content === "!richard info") {
    message.reply(
      "Bot Richard, property of Richard Deng Industries. Please do not contact with questions or concerns"
    );
  }
});

bot.login(TOKEN);
