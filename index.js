const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
    console.log(`Bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canals, em ${client.guilds.size} servidores.`);
});

client.on("guildCreate", guild => {
    console.log(`O bot entrou nos servidores: ${guild.name} (id: ${guild.id}. População: ${guild.memberCount} membros!`);
    client.user.setActivity(`Estou em ${client.guilds.size} servidores.`);
});

client.on("guildDelete", guild => {
    console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildMemberAdd", member => {

  if (member.guild.id !== "ID DA SUA GUILD") return; //coloquei aqui o id da sua guild
  let avatar = member.user.avatarURL;
  let embed = new Discord.RichEmbed()
      .setColor("#3fdb20")
      .setThumbnail(avatar)
      .setDescription(`${member}, bem vindo(a)! ao servidor :tada:`)
      .addField('Você é o membro de número:', member.guild.memberCount)
      .setTimestamp(new Date())
      .setFooter(member.guild.name, member.guild.iconURL)
    client.channels.get("ID DO CANAL").send(embed); //coloque aqui o id do cana que o bot vai mandar a msg
    
    let embed2 = new Discord.RichEmbed()
    .setDescription(`${member}, bem vindo ao servidor ${member.guild.name} :tada:z\nvocê é o membro de número ${member.guild.memberCount}`)
    .setImage(member.guild.iconURL)
    .setTimestamp(new Date())
    .setColor("#ff9d00")
    .setFooter(`${bot.user.tag}`, client.user.displayAvatarURL)
   member.send(embed2);  //envia a msg no pv do membro que entrou
})

client.on("message", async message =>{
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    const args = message.content.slice(config.prefix.lenght).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();

    if(comando === "ping"){
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! A Latência é ${m.createdTimestamp - message.createdTimestamp}ms. A Latência da API é ${Math.round(client.ping)}ms`);
    }
    //comando falar
  if(comando === "say") { 
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});  
    message.channel.send(sayMessage);
  }
    //comando apagar
  if(comando === "apagar") {
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Por favor, forneça um número entre 2 e 100 para o número de mensagens a serem excluídas");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Não foi possível deletar mensagens devido a: ${error}`));
  }

   
  // comando chutar 
  if(comando === "kick") {
//adicione o nome dos cargos que vc quer que use esse comando!
    if(!message.member.roles.some(r=>["Nome do cargo 1", "Nome de outro cargo 2"].includes(r.name)) )
      return message.reply("Desculpe, você não tem permissão para usar isto!");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Por favor mencione um membro válido deste servidor");
    if(!member.kickable) 
      return message.reply("Eu não posso expulsar este usuário! Eles pode ter um cargo mais alto ou eu não tenho permissões de expulsar?");
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Nenhuma razão fornecida";
    
    await member.kick(reason)
      .catch(error => message.reply(`Desculpe ${message.author} não consegui expulsar o membro devido o: ${error}`));
    message.reply(`${member.user.tag} foi kickado por ${message.author.tag} Motivo: ${reason}`);

  }
  // comando ban
  if(comando === "ban") {
    //adicione o nome do cargo que vc quer que use esse comando!
    if(!message.member.roles.some(r=>["Nome do cargo"].includes(r.name)) )
      return message.reply("Desculpe, você não tem permissão para usar isto!");
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Por favor mencione um membro válido deste servidor");
    if(!member.bannable) 
      return message.reply("Eu não posso banir este usuário! Eles pode ter um cargo mais alto ou eu não tenho permissões de banir?");
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Nenhuma razão fornecida";
    await member.ban(reason)
      .catch(error => message.reply(`Desculpe ${message.author} não consegui banir o membro devido o : ${error}`));
    message.reply(`${member.user.tag} foi banido por ${message.author.tag} Motivo: ${reason}`);
  }
    
});

client.login(config.token);