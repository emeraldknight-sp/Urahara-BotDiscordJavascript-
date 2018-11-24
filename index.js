const config = require("./config.json");
const Discord = require('discord.js');
const client = new Discord.Client();
                                        //https://hastebin.com/kawomanica.js
                                        //https://hastebin.com/iweboleqek.bash
/** heroku login
    git init
    heroku git:remote NomeDoAppHeroku

    git add .
    git commit -am "qualquer coisa"
    git push heroku master */

    let status = [
 
    { name: 'prefix($), GG WP!', type: 'STREAMING', url: 'https://www.youtube.com/channel/UCwZYI1VnymmuL424TeWoFRw' },
 
    { name: `_Megadeth42`, type: 'STREAMING', url: 'https://twitch.tv/megadeth42' },
  
    { name: 'https.fb.com/NerdStrike', type: 'STREAMING', url: 'https://facebook.com/NerdStrike' },

    { name: 'prefixo: $', type: 'STREAMING', url: 'https://www.youtube.com/channel/UCwZYI1VnymmuL424TeWoFRw' },

    { name: `LucasDdz`, type: 'STREAMING', url: 'https://twitch.tv/LucasDdZ' },

    { name: 'Draco', type: 'STREAMING', url: 'https://twitch.tv/DracoAmorzim' },
 
];
 
 
client.on('ready', () => {
 
    console.log('Bot conectado com sucesso!');
  
    function setStatus() {
 
        let randomStatus = status[Math.floor(Math.random() * status.length)];
 
        client.user.setPresence({ game: randomStatus });
 
    }
  
    setStatus();
 
    setInterval(() => setStatus(), 500000); //{1000/1s}\{10000/10s}\{100000/1m}
  
});
client.on("message", message => { //abertura do client.on("message", async message =>
 
const args = message.content.slice(config.prefix.length).trim().split(/ +/g); //definindo os argumentos.
  const comando = args.shift().toLowerCase();
  
     if(comando === "ping") {
        message.reply(`:ping_pong: **|** Aproximadamente ${Math.round(client.ping)}ms!`);
    }

   
    
    if(comando === "kick") {
        //adicione o nome dos cargos que vc quer que use esse comando!
            if(!message.member.roles.some(r=>["Legendary", "MOD", "Sênior Member"].includes(r.name)) )
              return message.reply("Desculpe, você não tem permissão para usar isto!");
            let member = message.mentions.members.first() || message.guild.members.get(args[0]);
            if(!member)
              return message.reply("Por favor mencione um membro válido deste servidor");
            if(!member.kickable)
              return message.reply("Eu não posso expulsar este usuário! Eles pode ter um cargo mais alto ou eu não tenho permissões de expulsar?");
           
            let reason = args.slice(1).join(' ');
            if(!reason) reason = "Nenhuma razão fornecida";
           
         member.kick(reason)
              .catch(error => message.reply(`Desculpe ${message.author} não consegui expulsar o membro devido o: ${error}`));
            message.reply(`${member.user.tag} foi kickado por ${message.author.tag} Motivo: ${reason}`);
    }        
  
    if(comando === "abraçar") {
        let user = message.mentions.users.first();
        if(message.mentions.users.size < 1) return message.reply("Você precisa mencionar alguém.")
        if(user.id == message.author.id) return message.reply("Você não pode abraçar a si mesmo.")
        var HugEmbed = new Discord.RichEmbed()
        .setColor('#8B008B')
        .setTitle(`**${message.author.username}** deu um abraço no(a) **${user.username}**`)
        .setImage('https://media.giphy.com/media/xJlOdEYy0r7ZS/giphy.gif')
        .setFooter(`Pedido por ${message.author.tag}`, message.author.avatarURL).setTimestamp()
   
        message.channel.send(HugEmbed)
    }
  
    if(message.content === `$reiniciar`) {
        resetBot(message.channel)
            async function resetBot(channel) {
                channel.send(`Reiniciando...`)
                .then(msg => client.destroy(true))
                .then(() => client.login(config.token));
             }
   
        client.on('ready', () => {
            message.channel.send(`Bot reiniciado com sucesso!`);
        });
    }
    
    if(comando === "ban") {
        var razão = args.slice(1).join(" ")
 
    var usuario = message.mentions.users.first();
    if(!message.guild.member(message.author.id).hasPermissions("BAN_MEMBERS")) return message.reply("Você não tem permissão de usar esse comando")
    if(message.mentions.users.size < 1) return message.reply("Você não mencionou ninguém")
    if(!message.guild.member(usuario).bannable) return message.reply("Eu não posso banir essa pessoa.")
    if(razão.length < 1) return message.reply("Você não colocou uma razão.")  
 
    message.guild.member(usuario).ban()
 
   var discord = require ('discord.js')
 
   var embed = new discord.RichEmbed()
   .setTitle("**Usuário banido do server**")
   .setColor("#36393e")
   .setTimestamp()
   .addField("Staff: " , message.author.username, true)
   .addField("Usuário: " , usuario.username,true)
   .addField("ID: " , usuario.id,true)
   .setThumbnail(message.author.displayAvatarURL)
   .addField("<a<a:BlobBanHammer:471788559402139668>471788559402139668>Razão: " , razão, true);
 
   message.channel.send(embed)
    }
 
    if(comando === "unban") {
    if(!message.guild.me.hasPermission(0x00000004)) return message.channel.send({embed: {
        description: `Eu não tenho a permissão para desbanir membros.`
    }})
    let member = args[0]
    let reason = args.slice(1).join(" ")
    if(!reason) {
        reason = "Não informado. '-'"
    }
    if(!member) return message.channel.send({embed: {
        description: `Você não me disse o membro que tenho que desbanir. .-.`,  
 }})
    message.guild.unban(member).then(() => {
        message.channel.send({embed: {
            title: `Membro desbanido!`,
            fields: [
                {
                    name: "Motivo: ",
                    value: `${reason}`
                }
            ]
        }})
      })
    }
 });
 
client.login(config.token);