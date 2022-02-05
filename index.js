const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const dotenv = require("dotenv")
dotenv.config()
    
                                        //https://hastebin.com/evafoperas.js - MEU CÓDIGO
                                        //https://hastebin.com/kawomanica.js - MENSAGEM AUTOMÁTICA DE BEM-VINDO
                                        //https://hastebin.com/iweboleqek.bash - CRIANÇÃO DE CMD BÁSICO
                                        //https://hastebin.com/equrajumej.js - PING
                                        //https://hastebin.com/enodeqiwed.js - NOVO PING
/** heroku login - UPDATE HEROKU
    git init
    heroku git:remote NomeDoAppHeroku

    git add .
    git commit -am "URAHARA 2.0.4"
    git push heroku master */

    let status = [
 
    { name: 'Use / - Nerd Strike', type: 'STREAMING', url: 'https://www.youtube.com/channel/UCwZYI1VnymmuL424TeWoFRw' },
 
    { name: `_emeraldknight`, type: 'STREAMING', url: 'https://twitch.tv/emeraldknightofc' },
  
    { name: 'https.fb.com/NerdStrike', type: 'STREAMING', url: 'https://facebook.com/NerdStrike' },

    { name: 'prefixo: /', type: 'STREAMING', url: 'https://www.youtube.com/channel/UCwZYI1VnymmuL424TeWoFRw' },

    { name: `LucasDdz`, type: 'STREAMING', url: 'https://twitch.tv/LucasDdZ' },

    { name: `Está com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores!` }
 
];
 
 
client.on('ready', () => {
    console.log('Bot conectado com sucesso!');
    // console.log(`Está com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores!`);
    function setStatus() {
        let randomStatus = status[Math.floor(Math.random() * status.length)];
        client.user.setPresence({ game: randomStatus });
        // client.user.setPresence(`Eu estou em ${client.guilds.size} servidores!`);
    }
  
    setStatus();
    setInterval(() => setStatus(), 10000); //{1000/1s}\{10000/10s}\{100000/1m}
  
});

client.on('guildMemberAdd', member => {
    if (member.guild.id !== "ID DA GUILD") return;
    let avatar = member.user.avatarURL
    let embed = new Discord.RichEmbed()
        .setColor('#98c688')
        .setThumbnail(avatar)
        .setTitle("**Messagem de bem-vindo**")
        .addField('Bem vindo(a)!', `Bem vindo(a) ${member} ao servidor :)`)
        .setFooter(`Membro que entrou no server: ${member}`)
        .addField('Você é o membro de numero:', member.guild.memberCount)
        .setDescription("May the force be with you.")
        .setTimestamp()
    client.channels.get('ID DO CANAL').send(embed)
  });

client.on("message", async message => { //abertura do client.on("message", async message =>
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g); //definindo os argumentos.
    const comando = args.shift().toLowerCase();
    if(!message.content.startsWith("$"))return;

    //-------------------------COMANDO HELP-------------------------
    if (comando === "help") {
        let embed = new Discord.RichEmbed()
        .setTitle("LISTA DE COMANDOS")
        .addField("Comando: ban", "Banir um usuário")
        .addField("Comando: unban", "Desbanir um usuário")
        .addField("Comando: ping", "Descubra se o seu ping está alto ou baixo")
        .addField("Comando: kick", "Chutar membro do servidor")
        .addField("Comando: serverinfo", "Informações do servidor")
        .addField("Comando: avatar", "Imprime o ícone do perfil ou de outros")
        .addField("Comando: abraçar", "Lança um giphy de abraço")
        .addField("Comando: date", "Mostra a quantidade de dias no servidor")
        .addField("Comando: helpmsg", "Envia os comandos no chat")
        .setColor("#98c688")
        .setThumbnail(client.user.avatarURL)
        message.channel.send(embed); //se quiser enviar no pv coloca message.author.send(embed);
    }

    //-------------------------COMANDO HELPPV-------------------------
    if (comando === "helpmsg") {
        let embed = new Discord.RichEmbed()
        .setTitle("LISTA DE COMANDOS")
        .addField("Comando: ban", "Banir um usuário")
        .addField("Comando: unban", "Desbanir um usuário")
        .addField("Comando: ping", "Descubra se seu ping está alto ou baixo")
        .addField("Comando: kick", "Chutar membro do servidor")
        .addField("Comando: serverinfo", "Informações do servidor")
        .addField("Comando: avatar", "Imprime o ícone do perfil ou de outros")
        .addField("Comando: abraçar", "Lança um giphy de abraço")
        .addField("Comando: date", "Mostra a quantidade de dias no servidor")
        .setColor("#98c688")
        .setThumbnail(client.user.avatarURL)
        message.author.send(embed);
    }

    //-------------------------COMANDO PING-------------------------
    if (comando === "ping") {
        const embed = new Discord.RichEmbed()
        
        .setColor('#98c688')
        .setDescription(`:mega:**${message.author.tag}**, :ping_pong: a latência da API é ${Math.round(client.ping)}ms.`)
        .setFooter('Comando Ping')
        .setTimestamp(new Date())
        message.channel.send('', embed)
    }

    if(comando === "pingg") {
        const m = await message.channel.send(`Pong! A Latência é ${m.createdTimestamp - message.createdTimestamp}ms. A Latencia da API é ${Math.round(client.ping)}ms`);
      }

    //-------------------------COMANDO SERVERINFO-------------------------
    if(comando === 'serverinfo'){
        const moment = require("moment")
        moment.locale("pt-BR")
        let online = message.guild.members.filter(a => a.presence.status == "online").size;
        let ocupado = message.guild.members.filter(a => a.presence.status == "dnd").size;
        let ausente = message.guild.members.filter(a => a.presence.status == "idle").size;
        let offline = message.guild.members.filter(a => a.presence.status == "offline").size;
        let client = message.guild.members.filter(a => a.user.client).size;
        let totalmembros = message.guild.memberCount;
        let canaistexto = message.guild.channels.filter(a => a.type === "text").size;
        let canaisvoz = message.guild.channels.filter(a => a.type === "voice").size;
        let cargos = message.guild.roles.map(a => a.name).join(", ")
            const embed = new Discord.RichEmbed()
            .setTitle(`Informações do servidor: ${message.guild.name}:registered:`)
            .setColor("#98c688")
            .addField('Dono', `<@${message.guild.owner.id}>`)
            .addField('Criado em:', `:date: ${moment(message.guild.createdAt).format('LLLL')}`)
            .addField("ID", `:hash:${message.guild.id}`)
            .addField(`Membros [${totalmembros}]`, `Online: ${online}\nAusente: ${ausente}\n :red_circle:Ocupado: ${ocupado}\n :black_circle:Offline: ${offline}\n :robot:Bots: ${client.Date}`)
            .addField(`Canais [${canaistexto+canaisvoz}]`, `:pencil:Texto: ${canaistexto}\n:sound:Voz: ${canaisvoz}`)
            .addField(`Cargos [${message.guild.roles.size}]`, cargos)
            .setThumbnail(message.guild.iconURL)
            .setFooter(`Pedido por ${message.author.tag}`, message.author.avatarURL)
            message.channel.send(embed)
    }

    //-------------------------COMANDO KICK-------------------------
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

    //-------------------------COMANDO AVATAR-------------------------
    if(comando === 'avatar') {
        let member = message.mentions.users.first() || client.users.get(args[0]) || message.author;
            let avatar = member.displayAvatarURL;
            if (avatar.endsWith(".gif")) {
                avatar = `${member.displayAvatarURL}?size=2048`
            }
            message.channel.send({
                embed: {
                    title: `:camera_with_flash: **${member.tag}**`,
                    description: `[DOWNLOAD](${avatar})`,
                    image: {
                        url: avatar
                    }
                }
            })
        }


    //-------------------------COMANDO ABRAÇAR-------------------------
    if(comando === "abraçar") {
        let user = message.mentions.users.first();
        if(message.mentions.users.size < 1) return message.reply("Você precisa mencionar alguém.")
        if(user.id == message.author.id) return message.reply("Você não pode abraçar a si mesmo.")
        var HugEmbed = new Discord.RichEmbed()
        .setColor('#98c688')
        .setTitle(`**${message.author.username}** deu um abraço no(a) **${user.username}**`)
        .setImage('https://media.giphy.com/media/xJlOdEYy0r7ZS/giphy.gif')
        .setFooter(`Pedido por ${message.author.tag}`, message.author.avatarURL).setTimestamp()
   
        message.channel.send(HugEmbed)
    }
    
    //-------------------------COMANDO REINICIAR-------------------------
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
    
    //-------------------------COMANDO BAN-------------------------
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
   .setColor("#98c688")
   .setTimestamp()
   .addField("Staff: " , message.author.username, true)
   .addField("Usuário: " , usuario.username,true)
   .addField("ID: " , usuario.id,true)
   .setThumbnail(message.author.displayAvatarURL)
   .addField("<a<a:BlobBanHammer:471788559402139668>471788559402139668>Razão: " , razão, true);
 
   message.channel.send(embed)
    }
    
    //-------------------------COMANDO UNBAN-------------------------
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
    //-------------------------COMANDO REGISTRO DE DIAS-------------------------
    if(comando === "date"){
        let owo = message.guild.member(message.mentions.users.first() || client.users.get(args[0]) || message.author);

        let embed = new Discord.RichEmbed();
        embed.setColor("#98c688");
        embed.setDescription(`${message.author}, a conta do usuário providenciado existe há **${Math.round(Math.abs((owo.user.createdAt.getTime() - new Date().getTime())/(24*60*60*1000)))} dias**.`);

        client.channels.get(message.channel.id).send(embed);
    }
    //-------------------------FIM DO CÓDIGO-------------------------
 });
 
client.login(process.env.token);