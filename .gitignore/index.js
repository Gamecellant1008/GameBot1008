const Discord = require('discord.js')
const client = new Discord.Client()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('DataBase_.json')
const db = low(adapter)
const adapter_onoff = new FileSync('OnOff.json')
const db1 = low(adapter_onoff)
const math = require('mathjs');
var fs = require('fs');
//var cats = require("cats-js");
//var c = new cats();
var prefix = "g/";
var randum = 0;

let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));

client.on("ready", () => {
    console.log("Je suis connecté !");
    client.user.setActivity("g/help");
});

client.on("guildMemberAdd", member => {

    var serveurauthore = member.guild.id;

    if(!db1.get("accueil").find({serveur: serveurauthore}).value()){
        db1.get("accueil").push({serveur: serveurauthore, action: "off"}).write();
    }

    var a = db1.get("accueil").filter({serveur: serveurauthore}).find('action').value()
    var action = Object.values(a);

    if(action[1] === "on"){
        member.guild.channels.find("name", "accueil").send(" Bienvenue sur mon serveur " + member.user);
    }else{
        return;
    }
});

client.on("guildMemberRemove", member => {

        var serveurauthore = member.guild.id;
    
        if(!db1.get("aurevoir").find({serveur: serveurauthore}).value()){
            db1.get("aurevoir").push({serveur: serveurauthore, action: "off"}).write();
        }
    
        var a = db1.get("aurevoir").filter({serveur: serveurauthore}).find('action').value()
        var action = Object.values(a);
    
        if(action[1] === "on"){
            member.guild.channels.find("name", "accueil").send( member.user + " nous a quitté ! ");
        }else{
            return;
        }
});

const t1 = {}
const cooldown = 5000
const t2 = null
const cooldown2 = 600000;

db.defaults({ xp: [], pcc_score : [], money: [], pvp: [], mob: [], attaque: [], shop: [], profil: [], cooldown: []})
  .write()

db1.defaults({ accueil: [], aurevoir: [], travail: []})
   .write()

client.on('message', message => {

    if(message.channel.type === "dm") return;

    if(message.content.startsWith(prefix + "setAccueil")){

        if(message.channel.type === "dm") return;

        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.reply("**Tu n'as pas la permission d'utiliser cette commande !**");

        var serveurauthor = message.guild.id;
        let texte = message.content.split(prefix + "setAccueil ")[1];

        if(!db1.get("accueil").find({serveur: serveurauthor}).value()){
            db1.get("accueil").push({serveur: serveurauthor, action: "off"}).write();
        }

        if(texte === "on"){

            db1.get("accueil").find({serveur: serveurauthor}).assign({serveur: serveurauthor, action: "on"}).write();
            message.channel.send("Les messages d'accueil sont désormais activés !")

        }else if(texte === "off"){

            db1.get("accueil").find({serveur: serveurauthor}).assign({serveur: serveurauthor, action: "off"}).write();
            message.channel.send("Les messages d'accueil sont désormais désactivés !")

        }else{
            message.channel.send("Vous devez dire `on` ou `off`, pour activer ou désactiver le message d'accueil !")
        }
    }

    if(message.content.startsWith(prefix + "setAurevoir")){

        if(message.channel.type === "dm") return;

        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.reply("**Tu n'as pas la permission d'utiliser cette commande !**");

        var serveurauthor = message.guild.id;
        let texte = message.content.split(prefix + "setAurevoir ")[1];

        if(!db1.get("aurevoir").find({serveur: serveurauthor}).value()){
            db1.get("aurevoir").push({serveur: serveurauthor, action: "off"}).write();
        }

        if(texte === "on"){

            db1.get("aurevoir").find({serveur: serveurauthor}).assign({serveur: serveurauthor, action: "on"}).write();
            message.channel.send("Les messages d'aurevoir sont désormais activés !")

        }else if(texte === "off"){

            db1.get("aurevoir").find({serveur: serveurauthor}).assign({serveur: serveurauthor, action: "off"}).write();
            message.channel.send("Les messages d'aurevoir sont désormais désactivés !")

        }else{
            message.channel.send("Vous devez dire `on` ou `off`, pour activer ou désactiver le message d'aurevoir !")
        }
    }

    if(message.content.startsWith(prefix + "setChannelAccueil")){

        if(message.channel.type === "dm") return;

        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.reply("**Tu n'as pas la permission d'utiliser cette commande !**");

        var serveurauthor = message.guild.id;
        let texte = message.content.split(prefix + "setChannelAccueil ")[1];
    }

    if(message.content === prefix + "help"){

        if(message.channel.type === "dm") return;

        var help_embed = new Discord.RichEmbed()
        .setColor("#FF0000")
        .setTitle("Voici mes commandes !")
        .addBlankField()
        .addField("g/help", "**Affiche** mes commandes disponnibles !")
        .addField("g/color", "**Affiche** toutes les couleurs disponible !")
        .addField("g/helpjeux", "**Affiche** les rôles qu'on puisse avoir à partir des commandes !")
        .addField("g/stat", "**Affiche** mon statut !")
        .addField("g/version", "**Affiche** ma version de développement !")
        .addField("g/addrole <utilisateur> <rôle>", "**Ajoute** un rôle à l'utilisateur !")
        .addField("g/delrole <utilisateur> <rôle>", "**Enlève** un rôle à l'utilisateur !")
        .addField("g/clear <nombre>", "**Supprime** un nombre de messages précis !")
        .addField("g/mute <utilisateur>", "**Mute** l'utilisateur !")
        .addField("g/unmute <utilisateur>", "**Unmute** l'utilisateur !")
        .addField("g/xp", "**Affiche** votre xp !")
        .addField("g/money", "**Affiche** votre argent !")
        .addField("g/bug <bug à signaler>", "**Envoie** le bug, qui donnera une possibilité de le régler !")
        .addField("g/warn <utilisateur> <raison>", "**Warn** l'utilisateur !")
        .addField("g/seewarns <utilisateur>", "**Affiche** les warns de l'utilisateur !")
        .addField("g/deletewarns <utilisateur> <numéro du warn>", "**Supprime** le warn de l'utilisateur !")
        .addField("g/papier, /ciseaux, /caillou", "**Papier-Ciseux-Caillou** !")
        .addField("g/personnage", "**Permet** de choisir un personnage")
        .addField("g/description", "**Affiche** la description de votre personnage !")
        .addField("g/Pouxi, g/Aurora", "**Affiche** leur attaque disponnible !")
        .addField("g/attaque", "Pour attaquer !")
        .addBlankField()
        .setFooter("Je ne suis pas encore fini, donc de nouvelles commandes arriveront plus tard !");
        message.channel.send(help_embed)
        console.log("Quelqu'un a demandé au bot d'effectuer la commande /help")

    }

    if(message.content === prefix + "version"){
        console.log("version")
        message.channel.send("Je suis en Version 0.9.2 !")
        console.log("Quelqu'un à demander au bot d'effectuer la commande /version")
    }

    if (message.content.startsWith(prefix + "addrole")) {
        console.log("addrole")

        if(message.channel.type === "dm") return;

        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.reply("**Tu n'as pas la permission d'utiliser cette commande !**").catch(console.error);

        if(message.mentions.users.size === 0) {
        
          return message.reply("Vous devez mentionner une personne !");
        }
    

let args = message.content.split(" ").slice(1);
        
        var choix = message.content.slice(message.content.indexOf(message.content.split(" ")[2]))

        let Id = message.guild.roles.find("name", `${choix}`);

                var member = message.mentions.members.first();

if(!message.guild.roles.exists("name", `${choix}`)) {
        
                message.reply(":x: Le role `"+choix+"` n'a pas été trouvé.");
              }else{
                  
                member.addRole(Id).catch(error => console.log(error));
                
                message.channel.send(`**${member}** à maintenant le role **${choix}** :tada:`)
              }

            }
            



if (message.content.startsWith(prefix + "delrole")) {

    console.log("delrole")

    if(message.channel.type === "dm") return;

    if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.reply("**Tu n'as pas la permission d'utiliser cette commande !**").catch(console.error);

    if(message.mentions.users.size === 0) {
    
      return message.reply("Vous devez mentionner une personne !");
    
    }

let args = message.content.split(" ").slice(1);
    
    var choix = message.content.slice(message.content.indexOf(message.content.split(" ")[2]))

    let Id = message.guild.roles.find("name", `${choix}`);

            var member = message.mentions.members.first();

if(!message.guild.roles.exists("name", `${choix}`)) {
        
                message.reply(":x: Le role `"+choix+"` n'a pas été trouvé.");

    message.guild.channels.find("name", "logs").sendMessage(delrole_no_embed)
    
          }else{
              
            member.removeRole(Id).catch(error => console.log(error));
            
            message.channel.send(`**${member}** n'a maintenant plus le rôle **${choix}** :tada:`)

        }



    console.log("Quelqu'un a demandé au bot d'effectué la commande /delrole !")

}

    if(message.content === prefix + "invite"){
        console.log("invite")
        message.channel.send("Avant de vous donnez le lien d'invitation, assurez-vous d'avoir créer un channel #accueil et un channel #logs ! Une fois que ça sera fait il vous suffira de faire la commande `/invite confirm` !");
        console.log("Quelqu'un a fait la commande /invite !");


    }

    if(message.content === prefix + "invite confirm"){
        console.log("invite confirm")
        message.channel.send("Avant d'inviter le bot vérifier que vous avez bien fait ce que le `/invite` vous a dit de faire ! Voici le lien d'invitation [https://discordapp.com/oauth2/authorize?client_id=437729743656189954&scope=bot&permissions=2146958591] ");
        console.log("Quelqu'un a fait la commande /invite confirm !");
    }
    
    if(message.content === prefix + "depart"){

        console.log("depart")

        if(message.channel.type === "dm") return;

        var depart1_embed = new Discord.RichEmbed()
        .setColor("#FF0000")
        .setTitle("Merci de m'avoir invité !")
        .addField("Je me nomme Gamebot !","Mon créateur est Gamecellant !")
        .addField("Je vais voir si les channels nécessaire pour mon fonctionnement sont disponnible, aussi non je vais créer les channels nécessaire !","Si vous avez besoin d'aide faites /help !")
        .setFooter("Je suis en développement !")
        message.channel.sendMessage(depart1_embed);
       
        if (!message.guild.channels.exists('name', 'logs')) message.guild.createChannel("logs");

        if (!message.guild.channels.exists('name', 'acceuil')) message.guild.createChannel("acceuil");

        if (!message.guild.roles.exists('name', 'Novice')) message.guild.createRole({
            name: "Novice",
            color:"#FF0000",
            permissions:[]
          });

        var depart2_embed = new Discord.RichEmbed()
        .setColor("#FF0000")
        .setTitle("Je suis prêt à fonctionner !")
        .addField("J'ai créé les channels et les rôles nécessaire pour mon fonctionnement [#accueil] et [#logs] et le rôle Novice !", "Je vous pris de ne pas les supprimer !")
        .setFooter("Je suis en développement !")
        message.channel.sendMessage(depart2_embed)

        console.log("Quelqu'un a effectué la commande /depart !")
    } 
    

    if(message.content.startsWith(prefix + "say")) {

        console.log("say")

        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.reply("**Tu n'as pas la permission d'utiliser cette commande !**");

        let texte = message.content.split(prefix + "say ")[1];
        if(!texte[1]) return message.channel.send(`Vous devez dire votre texte !`);
        message.channel.send(`${texte}`)
        message.delete()
    }

    if(message.content === prefix + "Rose"){

        if(message.channel.type === "dm") return;

        var Rose = message.guild.roles.find('name', 'Rose');
        var Noir = message.guild.roles.find('name', 'Noir');
        var Violet = message.guild.roles.find('name', 'Violet');
        var Rose_clair = message.guild.roles.find('name', 'Rose clair');
        var Rouge_pourpre = message.guild.roles.find('name', 'Rouge pourpre');
        var Orange = message.guild.roles.find('name', 'Orange');
        var Saumon = message.guild.roles.find('name', 'Saumon');
        var Jaune = message.guild.roles.find('name', 'Jaune');
        var Vert = message.guild.roles.find('name', 'Vert');
        var Bleu = message.guild.roles.find('name', 'Bleu');
        var Bleu_ciel = message.guild.roles.find('name', 'Bleu ciel');
        var Rouge = message.guild.roles.find('name', 'Rouge');
        var Vert_turquoise = message.guild.roles.find('name', 'Vert turquoise');
        
        message.member.removeRole(Noir);
        message.member.removeRole(Violet);
        message.member.removeRole(Rose_clair);
        message.member.removeRole(Rouge_pourpre);
        message.member.removeRole(Orange);
        message.member.removeRole(Saumon);
        message.member.removeRole(Jaune);
        message.member.removeRole(Vert_turquoise);
        message.member.removeRole(Vert);
        message.member.removeRole(Rouge);
        message.member.removeRole(Bleu);
        message.member.removeRole(Bleu_ciel);
        message.member.addRole(Rose);
        message.reply("Tu as désormais la couleur **Rose** !")
    }

    if(message.content === prefix + "Noir"){

        if(message.channel.type === "dm") return;

        var Rose = message.guild.roles.find('name', 'Rose');
        var Noir = message.guild.roles.find('name', 'Noir');
        var Violet = message.guild.roles.find('name', 'Violet');
        var Rose_clair = message.guild.roles.find('name', 'Rose clair');
        var Rouge_pourpre = message.guild.roles.find('name', 'Rouge pourpre');
        var Orange = message.guild.roles.find('name', 'Orange');
        var Saumon = message.guild.roles.find('name', 'Saumon');
        var Jaune = message.guild.roles.find('name', 'Jaune');
        var Vert = message.guild.roles.find('name', 'Vert');
        var Bleu = message.guild.roles.find('name', 'Bleu');
        var Bleu_ciel = message.guild.roles.find('name', 'Bleu ciel');
        var Rouge = message.guild.roles.find('name', 'Rouge');
        var Vert_turquoise = message.guild.roles.find('name', 'Vert turquoise');

        message.member.removeRole(Rose);
        message.member.removeRole(Violet);
        message.member.removeRole(Rose_clair);
        message.member.removeRole(Rouge_pourpre);
        message.member.removeRole(Orange);
        message.member.removeRole(Saumon);
        message.member.removeRole(Jaune);
        message.member.removeRole(Vert_turquoise);
        message.member.removeRole(Vert);
        message.member.removeRole(Rouge);
        message.member.removeRole(Bleu);
        message.member.removeRole(Bleu_ciel);
        message.member.addRole(Noir);
        message.reply("Tu as désormais la couleur **Noir** !")
    }

    if(message.content === prefix + "Violet"){

        if(message.channel.type === "dm") return;

        var Rose = message.guild.roles.find('name', 'Rose');
        var Noir = message.guild.roles.find('name', 'Noir');
        var Violet = message.guild.roles.find('name', 'Violet');
        var Rose_clair = message.guild.roles.find('name', 'Rose clair');
        var Rouge_pourpre = message.guild.roles.find('name', 'Rouge pourpre');
        var Orange = message.guild.roles.find('name', 'Orange');
        var Saumon = message.guild.roles.find('name', 'Saumon');
        var Jaune = message.guild.roles.find('name', 'Jaune');
        var Vert = message.guild.roles.find('name', 'Vert');
        var Bleu = message.guild.roles.find('name', 'Bleu');
        var Bleu_ciel = message.guild.roles.find('name', 'Bleu ciel');
        var Rouge = message.guild.roles.find('name', 'Rouge');
        var Vert_turquoise = message.guild.roles.find('name', 'Vert turquoise');

        message.member.removeRole(Noir);
        message.member.removeRole(Rose);
        message.member.removeRole(Rose_clair);
        message.member.removeRole(Rouge_pourpre);
        message.member.removeRole(Orange);
        message.member.removeRole(Saumon);
        message.member.removeRole(Jaune);
        message.member.removeRole(Vert_turquoise);
        message.member.removeRole(Vert);
        message.member.removeRole(Rouge);
        message.member.removeRole(Bleu);
        message.member.removeRole(Bleu_ciel);
        message.member.addRole(Violet);
        message.reply("Tu as désormais la couleur **Violet** !")
    }

    if(message.content === prefix + "Rose clair"){

        if(message.channel.type === "dm") return;

        var Rose = message.guild.roles.find('name', 'Rose');
        var Noir = message.guild.roles.find('name', 'Noir');
        var Violet = message.guild.roles.find('name', 'Violet');
        var Rose_clair = message.guild.roles.find('name', 'Rose clair');
        var Rouge_pourpre = message.guild.roles.find('name', 'Rouge pourpre');
        var Orange = message.guild.roles.find('name', 'Orange');
        var Saumon = message.guild.roles.find('name', 'Saumon');
        var Jaune = message.guild.roles.find('name', 'Jaune');
        var Vert = message.guild.roles.find('name', 'Vert');
        var Bleu = message.guild.roles.find('name', 'Bleu');
        var Bleu_ciel = message.guild.roles.find('name', 'Bleu ciel');
        var Rouge = message.guild.roles.find('name', 'Rouge');
        var Vert_turquoise = message.guild.roles.find('name', 'Vert turquoise');

        message.member.removeRole(Noir);
        message.member.removeRole(Violet);
        message.member.removeRole(Rose);
        message.member.removeRole(Rouge_pourpre);
        message.member.removeRole(Orange);
        message.member.removeRole(Saumon);
        message.member.removeRole(Jaune);
        message.member.removeRole(Vert_turquoise);
        message.member.removeRole(Vert);
        message.member.removeRole(Rouge);
        message.member.removeRole(Bleu);
        message.member.removeRole(Bleu_ciel);
        message.member.addRole(Rose_clair);
        message.reply("Tu as désormais la couleur **Rose calir** !")
    }

    if(message.content === prefix + "Rouge pourpre"){

        if(message.channel.type === "dm") return;

        var Rose = message.guild.roles.find('name', 'Rose');
        var Noir = message.guild.roles.find('name', 'Noir');
        var Violet = message.guild.roles.find('name', 'Violet');
        var Rose_clair = message.guild.roles.find('name', 'Rose clair');
        var Rouge_pourpre = message.guild.roles.find('name', 'Rouge pourpre');
        var Orange = message.guild.roles.find('name', 'Orange');
        var Saumon = message.guild.roles.find('name', 'Saumon');
        var Jaune = message.guild.roles.find('name', 'Jaune');
        var Vert = message.guild.roles.find('name', 'Vert');
        var Bleu = message.guild.roles.find('name', 'Bleu');
        var Bleu_ciel = message.guild.roles.find('name', 'Bleu ciel');
        var Rouge = message.guild.roles.find('name', 'Rouge');
        var Vert_turquoise = message.guild.roles.find('name', 'Vert turquoise');

        message.member.removeRole(Noir);
        message.member.removeRole(Violet);
        message.member.removeRole(Rose_clair);
        message.member.removeRole(Rose);
        message.member.removeRole(Orange);
        message.member.removeRole(Saumon);
        message.member.removeRole(Jaune);
        message.member.removeRole(Vert_turquoise);
        message.member.removeRole(Vert);
        message.member.removeRole(Rouge);
        message.member.removeRole(Bleu);
        message.member.removeRole(Bleu_ciel);
        message.member.addRole(Rouge_pourpre);
        message.reply("Tu as désormais la couleur **Rouge pourpre** !")
    }

    if(message.content === prefix + "Orange"){

        if(message.channel.type === "dm") return;

        var Rose = message.guild.roles.find('name', 'Rose');
        var Noir = message.guild.roles.find('name', 'Noir');
        var Violet = message.guild.roles.find('name', 'Violet');
        var Rose_clair = message.guild.roles.find('name', 'Rose clair');
        var Rouge_pourpre = message.guild.roles.find('name', 'Rouge pourpre');
        var Orange = message.guild.roles.find('name', 'Orange');
        var Saumon = message.guild.roles.find('name', 'Saumon');
        var Jaune = message.guild.roles.find('name', 'Jaune');
        var Vert = message.guild.roles.find('name', 'Vert');
        var Bleu = message.guild.roles.find('name', 'Bleu');
        var Bleu_ciel = message.guild.roles.find('name', 'Bleu ciel');
        var Rouge = message.guild.roles.find('name', 'Rouge');
        var Vert_turquoise = message.guild.roles.find('name', 'Vert turquoise');

        message.member.removeRole(Noir);
        message.member.removeRole(Violet);
        message.member.removeRole(Rose_clair);
        message.member.removeRole(Rouge_pourpre);
        message.member.removeRole(Rose);
        message.member.removeRole(Saumon);
        message.member.removeRole(Jaune);
        message.member.removeRole(Vert_turquoise);
        message.member.removeRole(Vert);
        message.member.removeRole(Rouge);
        message.member.removeRole(Bleu);
        message.member.removeRole(Bleu_ciel);
        message.member.addRole(Orange);
        message.reply("Tu as désormais la couleur **Orange** !")
    }

    if(message.content === prefix + "Saumon"){

        if(message.channel.type === "dm") return;

        var Rose = message.guild.roles.find('name', 'Rose');
        var Noir = message.guild.roles.find('name', 'Noir');
        var Violet = message.guild.roles.find('name', 'Violet');
        var Rose_clair = message.guild.roles.find('name', 'Rose clair');
        var Rouge_pourpre = message.guild.roles.find('name', 'Rouge pourpre');
        var Orange = message.guild.roles.find('name', 'Orange');
        var Saumon = message.guild.roles.find('name', 'Saumon');
        var Jaune = message.guild.roles.find('name', 'Jaune');
        var Vert = message.guild.roles.find('name', 'Vert');
        var Bleu = message.guild.roles.find('name', 'Bleu');
        var Bleu_ciel = message.guild.roles.find('name', 'Bleu ciel');
        var Rouge = message.guild.roles.find('name', 'Rouge');
        var Vert_turquoise = message.guild.roles.find('name', 'Vert turquoise');

        message.member.removeRole(Noir);
        message.member.removeRole(Violet);
        message.member.removeRole(Rose_clair);
        message.member.removeRole(Rouge_pourpre);
        message.member.removeRole(Orange);
        message.member.removeRole(Rose);
        message.member.removeRole(Jaune);
        message.member.removeRole(Vert_turquoise);
        message.member.removeRole(Vert);
        message.member.removeRole(Rouge);
        message.member.removeRole(Bleu);
        message.member.removeRole(Bleu_ciel);
        message.member.addRole(Saumon);
        message.reply("Tu as désormais la couleur **Saumon** !")
    }

    if(message.content === prefix + "Jaune"){

        if(message.channel.type === "dm") return;

        var Rose = message.guild.roles.find('name', 'Rose');
        var Noir = message.guild.roles.find('name', 'Noir');
        var Violet = message.guild.roles.find('name', 'Violet');
        var Rose_clair = message.guild.roles.find('name', 'Rose clair');
        var Rouge_pourpre = message.guild.roles.find('name', 'Rouge pourpre');
        var Orange = message.guild.roles.find('name', 'Orange');
        var Saumon = message.guild.roles.find('name', 'Saumon');
        var Jaune = message.guild.roles.find('name', 'Jaune');
        var Vert = message.guild.roles.find('name', 'Vert');
        var Bleu = message.guild.roles.find('name', 'Bleu');
        var Bleu_ciel = message.guild.roles.find('name', 'Bleu ciel');
        var Rouge = message.guild.roles.find('name', 'Rouge');
        var Vert_turquoise = message.guild.roles.find('name', 'Vert turquoise');

        message.member.removeRole(Noir);
        message.member.removeRole(Violet);
        message.member.removeRole(Rose_clair);
        message.member.removeRole(Rouge_pourpre);
        message.member.removeRole(Orange);
        message.member.removeRole(Saumon);
        message.member.removeRole(Rose);
        message.member.removeRole(Vert_turquoise);
        message.member.removeRole(Vert);
        message.member.removeRole(Rouge);
        message.member.removeRole(Bleu);
        message.member.removeRole(Bleu_ciel);
        message.member.addRole(Jaune);
        message.reply("Tu as désormais la couleur **Jaune** !")
    }

    if(message.content === prefix + "Vert turquoise"){

        if(message.channel.type === "dm") return;

        var Rose = message.guild.roles.find('name', 'Rose');
        var Noir = message.guild.roles.find('name', 'Noir');
        var Violet = message.guild.roles.find('name', 'Violet');
        var Rose_clair = message.guild.roles.find('name', 'Rose clair');
        var Rouge_pourpre = message.guild.roles.find('name', 'Rouge pourpre');
        var Orange = message.guild.roles.find('name', 'Orange');
        var Saumon = message.guild.roles.find('name', 'Saumon');
        var Jaune = message.guild.roles.find('name', 'Jaune');
        var Vert = message.guild.roles.find('name', 'Vert');
        var Bleu = message.guild.roles.find('name', 'Bleu');
        var Bleu_ciel = message.guild.roles.find('name', 'Bleu ciel');
        var Rouge = message.guild.roles.find('name', 'Rouge');
        var Vert_turquoise = message.guild.roles.find('name', 'Vert turquoise');

        message.member.removeRole(Noir);
        message.member.removeRole(Violet);
        message.member.removeRole(Rose_clair);
        message.member.removeRole(Rouge_pourpre);
        message.member.removeRole(Orange);
        message.member.removeRole(Saumon);
        message.member.removeRole(Jaune);
        message.member.removeRole(Rose);
        message.member.removeRole(Vert);
        message.member.removeRole(Rouge);
        message.member.removeRole(Bleu);
        message.member.removeRole(Bleu_ciel);
        message.member.addRole(Vert_turquoise);
        message.reply("Tu as désormais la couleur **Vert turquoise** !")
    }

    if(message.content === prefix + "Vert"){

        if(message.channel.type === "dm") return;

        var Rose = message.guild.roles.find('name', 'Rose');
        var Noir = message.guild.roles.find('name', 'Noir');
        var Violet = message.guild.roles.find('name', 'Violet');
        var Rose_clair = message.guild.roles.find('name', 'Rose clair');
        var Rouge_pourpre = message.guild.roles.find('name', 'Rouge pourpre');
        var Orange = message.guild.roles.find('name', 'Orange');
        var Saumon = message.guild.roles.find('name', 'Saumon');
        var Jaune = message.guild.roles.find('name', 'Jaune');
        var Vert = message.guild.roles.find('name', 'Vert');
        var Bleu = message.guild.roles.find('name', 'Bleu');
        var Bleu_ciel = message.guild.roles.find('name', 'Bleu ciel');
        var Rouge = message.guild.roles.find('name', 'Rouge');
        var Vert_turquoise = message.guild.roles.find('name', 'Vert turquoise');

        message.member.removeRole(Noir);
        message.member.removeRole(Violet);
        message.member.removeRole(Rose_clair);
        message.member.removeRole(Rouge_pourpre);
        message.member.removeRole(Orange);
        message.member.removeRole(Saumon);
        message.member.removeRole(Jaune);
        message.member.removeRole(Vert_turquoise);
        message.member.removeRole(Rose);
        message.member.removeRole(Rouge);
        message.member.removeRole(Bleu);
        message.member.removeRole(Bleu_ciel);
        message.member.addRole(Vert);
        message.reply("Tu as désormais la couleur **Vert** !")
    }

    if(message.content === prefix + "Rouge"){

        if(message.channel.type === "dm") return;

        var Rose = message.guild.roles.find('name', 'Rose');
        var Noir = message.guild.roles.find('name', 'Noir');
        var Violet = message.guild.roles.find('name', 'Violet');
        var Rose_clair = message.guild.roles.find('name', 'Rose clair');
        var Rouge_pourpre = message.guild.roles.find('name', 'Rouge pourpre');
        var Orange = message.guild.roles.find('name', 'Orange');
        var Saumon = message.guild.roles.find('name', 'Saumon');
        var Jaune = message.guild.roles.find('name', 'Jaune');
        var Vert = message.guild.roles.find('name', 'Vert');
        var Bleu = message.guild.roles.find('name', 'Bleu');
        var Bleu_ciel = message.guild.roles.find('name', 'Bleu ciel');
        var Rouge = message.guild.roles.find('name', 'Rouge');
        var Vert_turquoise = message.guild.roles.find('name', 'Vert turquoise');

        message.member.removeRole(Noir);
        message.member.removeRole(Violet);
        message.member.removeRole(Rose_clair);
        message.member.removeRole(Rouge_pourpre);
        message.member.removeRole(Orange);
        message.member.removeRole(Saumon);
        message.member.removeRole(Jaune);
        message.member.removeRole(Vert_turquoise);
        message.member.removeRole(Vert);
        message.member.removeRole(Rose);
        message.member.removeRole(Bleu);
        message.member.removeRole(Bleu_ciel);
        message.member.addRole(Rouge);
        message.reply("Tu as désormais la couleur **Rouge** !")
    }

    if(message.content === prefix + "Bleu"){

        if(message.channel.type === "dm") return;

        var Rose = message.guild.roles.find('name', 'Rose');
        var Noir = message.guild.roles.find('name', 'Noir');
        var Violet = message.guild.roles.find('name', 'Violet');
        var Rose_clair = message.guild.roles.find('name', 'Rose clair');
        var Rouge_pourpre = message.guild.roles.find('name', 'Rouge pourpre');
        var Orange = message.guild.roles.find('name', 'Orange');
        var Saumon = message.guild.roles.find('name', 'Saumon');
        var Jaune = message.guild.roles.find('name', 'Jaune');
        var Vert = message.guild.roles.find('name', 'Vert');
        var Bleu = message.guild.roles.find('name', 'Bleu');
        var Bleu_ciel = message.guild.roles.find('name', 'Bleu ciel');
        var Rouge = message.guild.roles.find('name', 'Rouge');
        var Vert_turquoise = message.guild.roles.find('name', 'Vert turquoise');

        message.member.removeRole(Noir);
        message.member.removeRole(Violet);
        message.member.removeRole(Rose_clair);
        message.member.removeRole(Rouge_pourpre);
        message.member.removeRole(Orange);
        message.member.removeRole(Saumon);
        message.member.removeRole(Jaune);
        message.member.removeRole(Vert_turquoise);
        message.member.removeRole(Vert);
        message.member.removeRole(Rouge);
        message.member.removeRole(Rose);
        message.member.removeRole(Bleu_ciel);
        message.member.addRole(Bleu);
        message.reply("Tu as désormais la couleur **Bleu** !")
    }

    if(message.content === prefix + "Bleu ciel"){

        if(message.channel.type === "dm") return;

        var Rose = message.guild.roles.find('name', 'Rose');
        var Noir = message.guild.roles.find('name', 'Noir');
        var Violet = message.guild.roles.find('name', 'Violet');
        var Rose_clair = message.guild.roles.find('name', 'Rose clair');
        var Rouge_pourpre = message.guild.roles.find('name', 'Rouge pourpre');
        var Orange = message.guild.roles.find('name', 'Orange');
        var Saumon = message.guild.roles.find('name', 'Saumon');
        var Jaune = message.guild.roles.find('name', 'Jaune');
        var Vert = message.guild.roles.find('name', 'Vert');
        var Bleu = message.guild.roles.find('name', 'Bleu');
        var Bleu_ciel = message.guild.roles.find('name', 'Bleu ciel');
        var Rouge = message.guild.roles.find('name', 'Rouge');
        var Vert_turquoise = message.guild.roles.find('name', 'Vert turquoise');

        message.member.removeRole(Noir);
        message.member.removeRole(Violet);
        message.member.removeRole(Rose_clair);
        message.member.removeRole(Rouge_pourpre);
        message.member.removeRole(Orange);
        message.member.removeRole(Saumon);
        message.member.removeRole(Jaune);
        message.member.removeRole(Vert_turquoise);
        message.member.removeRole(Vert);
        message.member.removeRole(Rouge);
        message.member.removeRole(Bleu);
        message.member.removeRole(Rose);
        message.member.addRole(Bleu_ciel);
        message.reply("Tu as désormais la couleur **Bleu ciel** !")
    }

    if(message.content === prefix + "color"){

        if(message.channel.type === "dm") return;

        var color_embed = new Discord.RichEmbed()
        .setColor("#FF0000")
        .setTitle("Voici toutes les couleurs de pseudo disponible !")
        .addField("g/Noir", "<:noir:454256867825156096>")
        .addField("g/Rouge", "<:rouge:454256947349422092>")
        .addField("g/Violet", "<:violet:454257060448567296>")
        .addField("g/Rose", "<:rose_:454256906853154817>")
        .addField("g/Rose clair", "<:rose_clair:454256923941011457>")
        .addField("g/Rouge pourpre", "<:rouge_pourpre:454256969889611777>")
        .addField("g/Saumon", "<:saumon:454256992228474890>")
        .addField("g/Orange", "<:orange:454256887458693130>")
        .addField("g/Jaune", "<:jaune:454256842059546625>")
        .addField("g/Bleu", "<:bleu:454256603160379394>")
        .addField("g/Bleu ciel", "<:bleu_ciel:454256749596246018>")
        .addField("g/Vert", "<:vert:454257013157789697>")
        .addField("g/Vert turquoise", "<:vert_turquoise:454257034741809153>")
        .setFooter("Oubliez pas de mettre les majuscules !")
        message.channel.sendMessage(color_embed)
    }
    

    if(message.content.startsWith(prefix + "clear")) {

        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGE")) return message.channel.send("Vous n'avez pas la permission !");

        let args = message.content.split(prefix + "clear ")[1];

        if(!args) return message.channel.send("Vous devez préciser un nombre de messages à supprimer !")
        message.channel.bulkDelete(args).then(() => {
        })

        console.log("clear")
    }

    if(message.content.startsWith(prefix + "calc")) {
        var args = message.content.split(' ').slice(1);      
        let input = args.join(" ");
        if (!input) {
            message.channel.send(`:croixrouge: Utilisation : **\`${prefix}calc <calcul>`);
            return;
        }

    const question = args.join(" ");

    let answer;
        try {
    answer = math.eval(question);
    } catch (err) {
    return message.channel.send(`:croixrouge: Équation mathématique ${err}`);
}


const calc_embed = new Discord.RichEmbed()
    .setThumbnail("https://images-na.ssl-images-amazon.com/images/I/31QYTepQomL.png")
    .setColor('#990000')
    .setDescription(`<:calc:460554458041155617> **Calculatrice** \n\n**Calcul** : ${question} \n\n**Résultat** : ${answer}`)
    .setFooter(`💥Demandé par ${message.author.tag}`,message.author.avatarURL)
    

    message.channel.send(calc_embed)

};

    if (message.content.startsWith(prefix + "warn")){
 
    let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));
    if (message.channel.type === "dm") return;
     
    var mentionned = message.mentions.users.first();
     
    if(!message.guild.member(message.author).roles.find('name', 'Modérateurs')) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
     
    if(message.mentions.users.size === 0) {
     
      return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur**");
     
    }else{
     
        const args = message.content.split(' ').slice(1);
     
        const mentioned = message.mentions.users.first();
     
        if(message.guild.member(message.author).roles.find('name', 'Modérateurs')){
     
          if (message.mentions.users.size != 0) {
     
            if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
     
              if (args.slice(1).length != 0) {
     
                const date = new Date().toUTCString();
     
                if (warns[message.guild.id] === undefined)
     
                  warns[message.guild.id] = {};
     
                if (warns[message.guild.id][mentioned.id] === undefined)
     
                  warns[message.guild.id][mentioned.id] = {};
     
                const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;
     
                if (warns[message.guild.id][mentioned.id][warnumber] === undefined){
     
                  warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};
     
                } else {
     
                  warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),
     
                    time: date,
     
                    user: message.author.id};
     
                }
     
                fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
     
    message.delete();
     
                message.channel.send(':warning: | **'+mentionned.tag+' à été averti**');
     
    message.mentions.users.first().send(`:warning: **Warn |** depuis **${message.guild.name}** donné par **${message.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))
     
              } else {
     
                message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
     
              }
     
            } else {
     
              message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
     
            }
     
          } else {
     
            message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
     
          }
     
        } else {
     
          message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
     
        }
     
      }
     
    }
     
     
     
    if (message.content.startsWith(prefix+"seewarns")||message.content===prefix+"seewarns") {
 
        if (message.channel.type === "dm") return;
         
        if(!message.guild.member(message.author).roles.find('name', 'Modérateurs')) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
         
            const mentioned = message.mentions.users.first();
         
            const args = message.content.split(' ').slice(1);
         
            if(message.guild.member(message.author).roles.find('name', 'Modérateurs')){
         
              if (message.mentions.users.size !== 0) {
         
                if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
         
                  try {
         
                    if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
         
                      message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
         
                      return;
         
                    }
         
                  } catch (err) {
         
                    message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
         
                    return;
         
                  }
         
                  let arr = [];
         
                  arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns :eyes:");
         
                  for (var warn in warns[message.guild.id][mentioned.id]) {
         
                    arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+
         
                    "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[message.guild.id][mentioned.id][warn].time+"**");
         
                  }
         
                  message.channel.send(arr.join('\n'));
         
                } else {
         
                  message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
         
                  console.log(args);
         
                }
         
              } else {
         
                message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
         
              }
         
            } else {
         
              message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
         
            }
         
          }
     
     
     
     
     
    if (message.content.startsWith(prefix+"deletewarns")||message.content===prefix+"deletewarns") {
     
    if (message.channel.type === "dm") return;
     
    if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
     
       const mentioned = message.mentions.users.first();
     
        const args = message.content.split(' ').slice(1);
     
        const arg2 = Number(args[1]);
     
        if (message.member.hasPermission('MANAGE_GUILD')){
     
          if (message.mentions.users.size != 0) {
     
            if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){
     
              if (!isNaN(arg2)) {
     
                if (warns[message.guild.id][mentioned.id] === undefined) {
     
                  message.channel.send(mentioned.tag+" n'a aucun warn");
     
                  return;
     
                } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {
     
                  message.channel.send("**:x: Ce warn n'existe pas**");
     
                  return;
     
                }
     
                delete warns[message.guild.id][mentioned.id][arg2];
     
                var i = 1;
     
                Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){
     
                  var val=warns[message.guild.id][mentioned.id][key];
     
                  delete warns[message.guild.id][mentioned.id][key];
     
                  key = i;
     
                  warns[message.guild.id][mentioned.id][key]=val;
     
                  i++;
     
                });
     
                fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
     
                if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
     
                  delete warns[message.guild.id][mentioned.id];
     
                }
     
                message.channel.send(`Le warn de **${mentioned.tag}**\': **${args[1]}** a été enlevé avec succès!`);
     
                return;
     
              } if (args[1] === "tout") {
     
                delete warns[message.guild.id][mentioned.id];
     
                fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
     
                message.channel.send(`Les warns de **${mentioned.tag}** a été enlevé avec succès!`);
     
                return;
     
              } else {
     
                message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
     
              }
     
            } else {
     
              message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
     
            }
     
          } else {
     
           message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
     
          }
     
        } else {
     
          message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
     
        }
     
    }

    

        if(message.content.startsWith(prefix + "mute")){

        if(!message.guild.member(message.author).roles.find('name', 'Modérateurs')) return message.reply("**Tu n'as pas la permission d'utiliser cette commande !**");

        if (!message.guild.roles.exists('name', 'Mute')) return message.channel.send("Le rôle `Mute` n'existe pas !")

        const args = message.content.split(' ').slice(1)
        var Mute = message.guild.roles.find('name', 'Mute');
        let member = message.mentions.members.first();

        if(!message.guild.member(message.author).roles.find('name', 'Modérateurs')) return message.reply("**Tu n'as pas la permission d'utiliser cette commande !**").catch(console.error);

        if(!member) return message.channel.send("Vous devez mentionner la personne à mute !");

        member.addRole(Mute);
        message.channel.send(`${member} est mute par ${message.author} !`);
        message.channel.send("Raison : " + args.slice(1).join(' '))
        };

        if(message.content.startsWith(prefix + "unmute")) {

        var Mute = message.guild.roles.find('name', 'Mute');
        var member = message.mentions.members.first();

        if(!message.guild.member(message.author).roles.find('name', 'Modérateurs')) return message.reply("**Tu n'as pas la permission d'utiliser cette commande !**").catch(console.error);

        if(message.mentions.users.size === 0){
        return message.channel.send("Vous devez mentionner la personne à unmute !");
        }

        member.removeRole(Mute)
        message.channel.send(`${member} est unmute par ${message.author} !`);
        };

        if(message.content.startsWith(prefix + "switch")){
        let rôle = message.guild.roles.find('name', 'Joueur/Joueuse Switch')
        message.member.addRole(rôle)
        message.channel.send("Tu as désormais le rôle `Joueur/Joueuse Switch` !")
        }

        if(message.content.startsWith(prefix + "one")){
        let rôle = message.guild.roles.find('name', 'Joueur/Joueuse XBOX One')
        message.member.addRole(rôle)
        message.channel.send("Tu as désormais le rôle `Joueur/Joueuse XBOX One` !")
        }

        if(message.content.startsWith(prefix + "ps4")){
        let rôle = message.guild.roles.find('name', 'Joueur/Joueuse PS4')
        message.member.addRole(rôle)
        message.channel.send("Tu as désormais le rôle `Joueur/Joueuse PS4` !")
        }

        if(message.content.startsWith(prefix + "3ds")){
        let rôle = message.guild.roles.find('name', 'Joueur/Joueuse 3DS')
        message.member.addRole(rôle)
        message.channel.send("Tu as désormais le rôle `Joueur/Joueuse 3DS` !")
        }

        if(message.content.startsWith(prefix + "pc")){
        let rôle = message.guild.roles.find('name', 'Joueur/Joueuse PC')
        message.member.addRole(rôle)
        message.channel.send("Tu as désormais le rôle `Joueur/Joueuse PC` !")
        }

        if(message.content.startsWith(prefix + "fortnite")){
        let rôle = message.guild.roles.find('name', 'Fortnite')
        message.member.addRole(rôle)
        message.channel.send("Tu as désormais le rôle `Fortnite` !")
        }

        if(message.content.startsWith(prefix + "minecraft")){
        let rôle = message.guild.roles.find('name', 'Minecraft')
        message.member.addRole(rôle)
        message.channel.send("Tu as désormais le rôle `Minecraft` !")
        }

        if(message.content.startsWith(prefix + "splatoon")){
        let rôle = message.guild.roles.find('name', 'Splatoon 2')
        message.member.addRole(rôle)
        message.channel.send("Tu as désormais le rôle `Splatoon 2` !")
        }

        if(message.content.startsWith(prefix + "sims")){
        let rôle = message.guild.roles.find('name', 'Sims')
        message.member.addRole(rôle)
        message.channel.send("Tu as désormais le rôle `Sims` !")
        }

        if(message.content.startsWith(prefix + "pokemon")){
        let rôle = message.guild.roles.find('name', 'Pokemon')
        message.member.addRole(rôle)
        message.channel.send("Tu as désormais le rôle `Pokemon` !")
        }

        if(message.content.startsWith(prefix + "pikmin")){
        let rôle = message.guild.roles.find('name', 'Pikmin')
        message.member.addRole(rôle)
        message.channel.send("Tu as désormais le rôle `Pikmin` !")
        }

        if(message.content.startsWith(prefix + "arm")){
        let rôle = message.guild.roles.find('name', 'Arms')
        message.member.addRole(rôle)
        message.channel.send("Tu as désormais le rôle `Arms` !")
        }

        if(message.content.startsWith(prefix + "mario")){
        let rôle = message.guild.roles.find('name', 'Mario')
        message.member.addRole(rôle)
        message.channel.send("Tu as désormais le rôle `Mario` !")
        }

        if(message.content.startsWith(prefix + "helpjeux")){
        let embed = new Discord.RichEmbed()
        .setColor('#990000')
        .setTitle("Voici toutes mes commandes pour ajouter des rôle de consôles ou de jeux !")
        .addField("g/switch", "**Ajoute** le rôle `Joueur/Joueuse Switch` !")
        .addField("g/one", "**Ajoute** le rôle `Joueur/Joueuse XBOX One` !")
        .addField("g/ps4", "**Ajoute** le rôle `Joueur/Joueuse PS4`")
        .addField("g/3ds", "**Ajoute** le rôle `Joueur/Joueuse 3DS`")
        .addField("g/pc", "**Ajoute** le rôle `Joueur/Joueuse PC` !")
        .addField("g/fortnite", "**Ajoute** le rôle `Fortnite` !")
        .addField("g/minecraft", "**Ajoute** le rôle `Minecraft` !")
        .addField("g/splatoon", "**Ajoute** le rôle `Splatoon 2`")
        .addField("g/sims", "**Ajoute** le rôle `Sims` !")
        .addField("g/pokemon", "**Ajoute** le rôle `Pokemon` !")
        .addField("g/pikmin", "**Ajoute** le rôle `Pikmin` !")
        .addField("g/arm", "**Ajoute** le rôle `Arms` !")
        .addField("g/mario", "**Ajoute** le rôle `Mario` !")
        .setFooter("C'est pour savoir à quels jeux et à quelles consoles vous jouez !");
        message.channel.send(embed)
        }
    

    if(message.content === prefix + "test3"){
        message.channel.send(`${message.guild.name}`)
    }

    var msgauthor = message.author.id;
    var serveurauthor = message.guild.id;

    if(message.author.bot)return;
    

    if(!db.get("xp").find({user: msgauthor, serveur: serveurauthor }).value()){
        db.get("xp").push({user: msgauthor, serveur: serveurauthor, xp: 1, level: 0.1}).write();

    }else{

        var userxpdb = db.get("xp").filter({user: msgauthor, serveur: serveurauthor}).find('xp').value();
        var userxp = Object.values(userxpdb);

        db.get("xp").find({user: msgauthor, serveur: serveurauthor}).assign({user: msgauthor, serveur: serveurauthor, xp: userxp[2] += 1, level: userxp[3]}).write();

        if(userxp[2] == 250){
            message.reply("Tu es passé au niveau 1 !")
            db.get("xp").find({user: msgauthor, serveur: serveurauthor}).assign({user: msgauthor, serveur: serveurauthor, xp: userxp[2], level: 1}).write();
        }else if(userxp[2] == 500){
            message.reply("Tu es passé au niveau 2 !")
            db.get("xp").find({user: msgauthor, serveur: serveurauthor}).assign({user: msgauthor, serveur: serveurauthor, xp: userxp[2], level: userxp[3] += 1}).write();
        }else if(userxp[2] == 750){
            message.reply("Tu es passé au niveau 3 !")
            db.get("xp").find({user: msgauthor, serveur: serveurauthor}).assign({user: msgauthor, serveur: serveurauthor, xp: userxp[2], level: userxp[3] += 1}).write();
        }else if(userxp[2] == 1000){
            message.reply("Tu es passé au niveau 4 !")
            db.get("xp").find({user: msgauthor, serveur: serveurauthor}).assign({user: msgauthor, serveur: serveurauthor, xp: userxp[2], level: userxp[3] += 1}).write();
        }else if(userxp[2] == 1250){
            message.reply("Tu es passé au niveau 5 !")
            db.get("xp").find({user: msgauthor, serveur: serveurauthor}).assign({user: msgauthor, serveur: serveurauthor, xp: userxp[2], level: userxp[3] += 1}).write();
        }else if(userxp[2] == 1500){
            message.reply("Tu es passé au niveau 6 !")
            db.get("xp").find({user: msgauthor, serveur: serveurauthor}).assign({user: msgauthor, serveur: serveurauthor, xp: userxp[2], level: userxp[3] += 1}).write();
        }else if(userxp[2] == 1750){
            message.reply("Tu es passé au niveau 7 !")
            db.get("xp").find({user: msgauthor, serveur: serveurauthor}).assign({user: msgauthor, serveur: serveurauthor, xp: userxp[2], level: userxp[3] += 1}).write();
        }else if(userxp[2] == 2000){
            message.reply("Tu es passé au niveau 8 !")
            db.get("xp").find({user: msgauthor, serveur: serveurauthor}).assign({user: msgauthor, serveur: serveurauthor, xp: userxp[2], level: userxp[3] += 1}).write();
        }else if(userxp[2] == 2500){
            message.reply("Tu es passé au niveau 9 !")
            db.get("xp").find({user: msgauthor, serveur: serveurauthor}).assign({user: msgauthor, serveur: serveurauthor, xp: userxp[2], level: userxp[3] += 1}).write();
        }else if(userxp[2] == 3000){
            message.reply("Tu es passé au niveau 10 !")
            db.get("xp").find({user: msgauthor, serveur: serveurauthor}).assign({user: msgauthor, serveur: serveurauthor, xp: userxp[2], level: userxp[3] += 1}).write();
        }

        console.log(userxp)
        console.log("xp")

    }   

    var msgauthor = message.author.id;
    var serveurauthor = message.guild.id;

    if(!db.get("money").find({user: msgauthor, serveur: serveurauthor}).value()){
        db.get("money").push({serveur: serveurauthor, user: msgauthor, money: 500}).write();
        db.get("profil").push({serveur: serveurauthor, user: msgauthor, intelligence: 0.1, force: 0.1, popularite: 0.1, larbin: 0.1, travail: "Au chômage"}).write()
        console.log("money")
    }else{

        console.log("money")

        if(!db.get("profil").find({serveur: serveurauthor, user: msgauthor}).value()){
            db.get("profil").push({serveur: serveurauthor, user: msgauthor, intelligence: 0.1, force: 0.1, popularite: 0.1, larbin: 0.1, travail: "Au chômage"}).write()
        }

        var usermoneydb = db.get("money").filter({user: msgauthor, serveur: serveurauthor}).find('money').value();
        var usermoney = Object.values(usermoneydb);
        var usermoneydbl = db.get("profil").filter({user: msgauthor, serveur: serveurauthor}).find('user').value();
        var profile = Object.values(usermoneydbl);

        if(profile[5] == 0.1){
            db.get("money").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, money: usermoney[2] += 2}).write();
        }else if(profile[5] == 1.1){
            db.get("money").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, money: usermoney[2] += 3}).write();
        }else if(profile[5] == 2.1){
            db.get("money").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, money: usermoney[2] += 4}).write();
        }else if(profile[5] == 3.1){
            db.get("money").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, money: usermoney[2] += 5}).write();
        }else if(profile[5] == 4.1){
            db.get("money").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, money: usermoney[2] += 6}).write();
        }else if(profile[5] == 5.1){
            db.get("money").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, money: usermoney[2] += 7}).write();
        }else if(profile[5] == 6.1){
            db.get("money").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, money: usermoney[2] += 8}).write();
        }else if(profile[5] == 7.1){
            db.get("money").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, money: usermoney[2] += 9}).write();
        }else if(profile[5] == 8.1){
            db.get("money").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, money: usermoney[2] += 10}).write();
        }else if(profile[5] == 9.1){
            db.get("money").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, money: usermoney[2] += 11}).write();
        }else if(profile[5] == 10.1){
            db.get("money").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, money: usermoney[2] += 12}).write();
        }
    }

    if(message.content === prefix + "xp"){
        var xp = db.get("xp").filter({user: msgauthor, serveur: serveurauthor}).find('xp').value()
        var xpfinal = Object.values(xp);
        let xpEmbed = new Discord.RichEmbed()
        .setColor('#990000')
        .setTitle(`Voici l'xp de ${message.author.username}`)
        .addField("XP:", `${xpfinal[2]} xp`)
        .addField("Level:", xpfinal[3] -= 0.1)
        .setFooter("C'est en développement :D !")
        message.channel.send(xpEmbed);
    }

    if(message.content === prefix + "youtube"){
        message.channel.send("https://www.youtube.com/channel/UCFCk6NvGBYXbtt_G_Rli9yw?&ab_channel=gamecellant")
    }

    if(message.content === prefix + "nul"){
        random();

        if(randum == 0){
            console.log(randum)
            message.channel.send("L'escargot de Bourgogne (Helix Pomatia) très consommé en France, n'est pas récolté en Bourgogne. Ceux qui se trouvent dans vos assiettes viennent des pays de l'Est comme la Hongrie, la Roumanie et plus particulièrement la Pologne.")
        }

        if(randum == 1){
            console.log(randum)
            message.channel.send("La longueur de la frontière chinoise est de 22722 km. Celle de la France est de 4139 Km.")
        }

        if(randum == 2){
            console.log(randum)
            message.channel.send("La chèvre de M. Seguin s'appelle Blanquette.")
        }

        if(randum == 3){
            console.log(randum)
            message.channel.send(`Les personnes dites "Sapiosexuelles" ne sont pas attirées par le charme ou le physique de leur partenaire, mais par leur intelligence. Le nom vient de "sapiens" en latin, qui signifie l'intelligence.`)
        }

        if(randum == 4){
            console.log(randum)
            message.channel.send(`Le mot "Avion" fut créé en 1875 par Clément Ader pour désigner sa série d'appareils volants. Mais ce n'est qu'en 1911 que le terme est utilisé pour désigner les aéroplanes militaires et devient commun lors de la Première Guerre Mondiale.`)
        }

        if(randum == 5){
            console.log(randum)
            message.channel.send(`Le 4 mai de chaque année est la journée internationale Star Wars. C'est à l'origine d'un jeu de mot de la citation culte de Maître Yoda, "May the force be with you", réinterprétée par des fans en "May the fourth (4th) be with you".`)
        }

        if(randum == 6){
            console.log(randum)
            message.channel.send(`"Tribunal Vivant" est un personnage de Marvel. C'est une entité cosmique omnipotente, chargée de maintenir l'équilibre cosmique. C'est la seconde entité la plus puissante de l'univers Marvel après "Celui-qui-est-au-dessus-de-tout".`)
        }

        if(randum == 7){
            console.log(randum)
            message.channel.send(`Un Britannique, Dan Magness, détient le record du monde de jonglages avec un ballon de football, tenant 24 heures sans le laisser toucher le sol.`)
        }

        if(randum == 8){
            console.log(randum)
            message.channel.send(`Depuis les JO de Barcelone en 1992, des préservatifs sont distribués aux athlètes pendant les jeux. Pour les Jeux Olympiques de Londres, 150 000 préservatifs ont été distribués, soit une moyenne de 15 par athlète.`)
        }

        if(randum == 9){
            console.log(randum)
            message.channel.send(`Les sondes spatiales Pioneer, lancées en 1972 et 1973 furent les premiers objets construits par l'homme à quitter le système solaire. Elles contiennent une plaque avec un message pictural de l'humanité à destination d'éventuels extraterrestres.`)
        }

        if(randum == 10){
            console.log(randum)
            message.channel.send(`Les abeilles Corses ont la langue plus longue que celle de leurs cousines du continent, mais elles ont aussi les poils plus courts.`)
        }

        if(randum == 11){
            console.log(randum)
            message.channel.send(`La grande mosquée de Paris a été financée par la France. La décision de la construire est prise après la Première Guerre mondiale pour rendre hommage aux 100000 morts musulmans qui avaient combattu pour la France.`)
        }

        if(randum == 12){
            console.log(randum)
            message.channel.send(`Le poids des gants de boxe est indiqué en once (noté oz et 1 once équivaut à environ 28g) et varie entre 6 et 18 oz. Pour de la boxe française, un individu avec un poids entre 63 et 79Kg utilisera des gants de 10oz (soit 283,5 g).`)
        }

        if(randum == 13){
            console.log(randum)
            message.channel.send(`Le jour de la prise de la Bastille, le 14 juillet 1789, était un mardi.`)
        }

        if(randum == 14){
            console.log(randum)
            message.channel.send(`L'hôtel restaurant "Arbez", situé aux Rousses dans le Jura, est à cheval sur la frontière Franco-Suisse. La délimitation passe au milieu du lit de la suite matrimoniale, vous pouvez donc dormir une jambe en Suisse et l'autre en France.`)
        }

        if(randum == 15){
            console.log(randum)
            message.channel.send(`Pour le droit français jusqu'en 1994, pratiquer la voyance était un délit prévu au Code Pénal. Aujourd'hui le chiffre d'affaire annuel pour les professionnels de la voyance et de l'occulte est évalué à 3 milliards d'euros.`)
        }
    }

    if(message.content.startsWith(prefix + "avatar")){

        let msgauthor = message.author;

        if(message.mentions.users.size === 0) {
            let embed1 = new Discord.RichEmbed()
            .setColor("#F00000")
            .setTitle(`Avatar de **${message.author.username}**`)
            .setImage(msgauthor.avatarURL)
            message.channel.send(embed1);
        }
    }

    if(message.content === prefix + "papier"){

        var msgauthor = message.author.tag;

        if(!db.get("pcc_score").find({user: msgauthor}).value()){
            db.get("pcc_score").push({user: msgauthor, score: 100.1}).write();
        }

        var scoredb = db.get("pcc_score").filter({user: msgauthor}).find('score').value();
        var score = Object.values(scoredb);

        //var msgauthore = message.author.id;
        //if(!db.get("pcc_score").find({user: msgauthore}).value()){
          //db.get("pcc_score").find({user: msgauthor}).assign({user: msgauthor, score: scoredb[1], id: msgauthore}).write();
        //}

        PapierCiseauCaillou();

        if(randum == 0){
            message.reply("<:papier:461292939604262912> \nÉgalité !")
        }

        if(randum == 1){
            db.get("pcc_score").find({user: msgauthor}).assign({user: msgauthor, score: score[1] -= 1}).write();
            message.reply(":scissors: \nVous avez **perdu** !")
        }

        if(randum == 2){
            db.get("pcc_score").find({user: msgauthor}).assign({user: msgauthor, score: score[1] += 1}).write();

            message.reply("<:caillou:461292911695495199> \nVous avez **gagné** !")
        }

        if(randum == 3){
            db.get("pcc_score").find({user: msgauthor}).assign({user: msgauthor, score: score[1] += 1}).write();

            message.reply("<:caillou:461292911695495199> \nVous avez **gagné** !")
        }
    }

    if(message.content === prefix + "ciseaux"){

        var msgauthor = message.author.tag;

        if(!db.get("pcc_score").find({user: msgauthor}).value()){
            db.get("pcc_score").push({user: msgauthor, score: 100.1}).write();
        }

        var scoredb = db.get("pcc_score").filter({user: msgauthor}).find('score').value();
        var score = Object.values(scoredb);

        //var msgauthore = message.author.id;
        //if(!db.get("pcc_score").find({user: msgauthore}).value()){
          //db.get("pcc_score").find({user: msgauthor}).assign({user: msgauthor, score: scoredb[1], id: msgauthore}).write();
        //}

        PapierCiseauCaillou();

        if(randum == 0){
            db.get("pcc_score").find({user: msgauthor}).assign({user: msgauthor, score: score[1] += 1}).write();

            message.reply("<:papier:461292939604262912> \nVous avez **gagné** !")
        }

        if(randum == 1){
            message.reply(":scissors: \nÉgalité !")
        }

        if(randum == 2){
            db.get("pcc_score").find({user: msgauthor}).assign({user: msgauthor, score: score[1] -= 1}).write();

            message.reply("<:caillou:461292911695495199> \nVous avez **perdu** !")
        }

        if(randum == 3){
            db.get("pcc_score").find({user: msgauthor}).assign({user: msgauthor, score: score[1] += 1}).write();

            message.reply("<:papier:461292939604262912> \nVous avez **gagné** !")
        }
    }

    if(message.content === prefix + "caillou" || message.content === prefix + "cailloux"){

        var msgauthor = message.author.tag;

        if(!db.get("pcc_score").find({user: msgauthor}).value()){
            db.get("pcc_score").push({user: msgauthor, score: 100.1}).write();
        }

        var scoredb = db.get("pcc_score").filter({user: msgauthor}).find('score').value();
        var score = Object.values(scoredb);

        //var msgauthore = message.author.id;
        //if(!db.get("pcc_score").find({user: msgauthore}).value()){
          //db.get("pcc_score").find({user: msgauthor}).assign({user: msgauthor, score: scoredb[1], id: msgauthore}).write();
        //}

        PapierCiseauCaillou();

        if(randum == 0){
            db.get("pcc_score").find({user: msgauthor}).assign({user: msgauthor, score: score[1] -= 1}).write();

            message.reply("<:papier:461292939604262912> \nVous avez **perdu** !")
        }

        if(randum == 1){
            db.get("pcc_score").find({user: msgauthor}).assign({user: msgauthor, score: score[1] += 1}).write();

            message.reply(":scissors: \nVous avez **gagné** !")
        }

        if(randum == 2){
            message.channel.send("<:caillou:461292911695495199> \nÉgalité !")
        }

        if(randum == 3){
            db.get("pcc_score").find({user: msgauthor}).assign({user: msgauthor, score: score[1] += 1}).write();

            message.reply(":scissors: \nVous avez **gagné** !")
        }
    }

    if(message.content.startsWith(prefix + "score")){

        var msgauthor = message.author.tag;
        var member = message.mentions.members.first();

        if(!db.get("pcc_score").find({user: msgauthor}).value()){
            db.get("pcc_score").push({user: msgauthor, score: 100.1}).write();
        }
        
        var scoredb = db.get("pcc_score").filter({user: msgauthor}).find('score').value();
        var score = Object.values(scoredb);
        var userscore = score[1] - 0.1;

        let embed = new Discord.RichEmbed()
        .setColor("#F00000")
        .addField(`Voici le score de ${message.author.tag} :`, `${userscore} de score`)
        .setFooter("Le score est de 100 par défaut !")
        message.channel.send(embed);

    }

    if(message.content.startsWith(prefix + "money")){

        var msgauthor = message.author.id;
        var serveurauthor = message.guild.id;
        var member = message.mentions.members.first();

        var money = db.get("money").filter({serveur: serveurauthor, user : msgauthor}).find('money').value();
        var moneyfinal = Object.values(money);

        if(member){
            msgauthor = message.mentions.members.first().id;
            money = db.get("money").filter({serveur: serveurauthor, user : msgauthor}).find('money').value();
            moneyfinal = Object.values(money);
            let b = message.mentions.users.first();
            let embed = new Discord.RichEmbed()
            .setColor('#990000')
            .setTitle(`Voici l'argent de **${b.tag}**`)
            .addField("Money:", moneyfinal[2]/100 + "µ")
            .setFooter("C'est en développement :D !")
            message.channel.send(embed);
        }else{
            let embed = new Discord.RichEmbed()
            .setColor('#990000')
            .setTitle(`Voici l'argent de **${message.author.tag}**`)
            .addField("Money:", moneyfinal[2]/100 + "µ")
            .setFooter("C'est en développement :D !")
            message.channel.send(embed);
        }
    }

    if(message.content.startsWith(prefix + "personnage")){

        var msgauthor = message.author.id;
        var serveurauthor = message.guild.id;
        let personnage = message.content.split(prefix + "personnage ")[1];

        if(!personnage) return message.channel.send("Les personnages disponnible sont : **Aurora** , **Pouxi** , **Tartanpion** , **Pantouflor**");

        if(!db.get("pvp").find({user: msgauthor, serveur: serveurauthor}).value()){
            db.get("pvp").push({serveur : serveurauthor, user: msgauthor, potion: 5}).write();
        }

        var pvp = db.get("pvp").filter({user: msgauthor, serveur: serveurauthor}).find('potion').value();
        var pvpfinal = Object.values(pvp);
        var userxpdb = db.get("xp").filter({user: msgauthor, serveur: serveurauthor}).find('xp').value();
        var userxp = Object.values(userxpdb);

        if(personnage === "Aurora"){
            message.channel.send("Vous avez choisi **Aurora** !")
            db.get("pvp").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: "Aurora", Level: userxp[3], Classe: "Archer", vie: 110.1, ennemie: "Moblin"}).write();
        }

        if(personnage === "Pouxi"){
            message.channel.send("Vous avez choisi **Pouxi** !")
            db.get("pvp").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: "Pouxi", Level: userxp[3], Classe: "Mage", vie: 150.1, ennemie: "Moblin"}).write();
        }

        if(personnage === "Tartanpion"){
            message.channel.send("Vous avez choisi **Tartanpion** !")
            db.get("pvp").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: "Tartanpion", Level: userxp[3], Classe: "Alchimiste", vie: 90.1, ennemie: "Moblin"}).write();
        }

        if(personnage === "Pantouflor"){
            message.channel.send("Vous avez choisi **Pantouflor** !")
            db.get("pvp").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: "Pantouflor", Level: userxp[3], Classe: "Esprit", vie: 250.1, ennemie: "Moblin"}).write();
        }
    }

    if(message.content.startsWith(prefix + "description")){

        var msgauthor = message.author.id;
        var serveurauthor = message.guild.id;
        var userxpdb = db.get("xp").filter({user: msgauthor, serveur: serveurauthor}).find('xp').value();
        var userxp = Object.values(userxpdb);

        if(!db.get("pvp").find({user: msgauthor, serveur: serveurauthor}).value()){
            return message.channel.send("Vous n'avez pas choisi de personages, pour en choisir un faites `/personnage` !");
        }

        var pvp = db.get("pvp").filter({user: msgauthor, serveur: serveurauthor}).find('personnage').value()
        var pvpfinal = Object.values(pvp);
        let pvpEmbed = new Discord.RichEmbed()
        .setColor('#990000')
        .setTitle(`Voici le personnage qu'a choisi ${message.author.username}`)
        .addField("Nom:", `${pvpfinal[3]}`)
        .addField("level:", `${userxp[3] - 0.1}`)
        .addField("Classe :", `${pvpfinal[5]}`)
        .addField("Vie :", `${pvpfinal[6] -= 0.1}`)
        .addField("Potion de vie :", `${pvpfinal[2]}`)
        .setFooter("C'est en développement :D !")
        message.channel.send(pvpEmbed);
    }

    if(message.content.startsWith(prefix + "attaque")){

        var msgauthor = message.author.id;
        var serveurauthor = message.guild.id;

        if(!db.get("pvp").find({user: msgauthor, serveur: serveurauthor}).value()){
            return message.channel.send("Vous n'avez pas choisi de personages, pour en choisir un faites `/personnage` !");
        }

        if(!db.get("mob").find({id: 1, user: msgauthor, serveur: serveurauthor}).value()){
            db.get("mob").push({id: 1, user: msgauthor, serveur: serveurauthor, mob: "Moblin", level: 1, vie: 65.1, attaque: 15}).write();
        }

        if(!db.get("mob").find({id: 2, user: msgauthor, serveur: serveurauthor}).value()){
            db.get("mob").push({id: 2, user: msgauthor, serveur: serveurauthor, mob: "Plante pirahna", level: 1, vie: 90.1, attaque: 10}).write();
        }

        if(!db.get("mob").find({id: 3, user: msgauthor, serveur: serveurauthor}).value()){
            db.get("mob").push({id: 3, user: msgauthor, serveur: serveurauthor, mob: "Bloops", level: 1, vie: 90.1, attaque: 15}).write();
        }

        if(!db.get("mob").find({id: 4, user: msgauthor, serveur: serveurauthor}).value()){
            db.get("mob").push({id: 4, user: msgauthor, serveur: serveurauthor, mob: "Cheep-Cheep", level: 1, vie: 50.1, attaque: 20}).write();
        }

        if(!db.get("mob").find({id: 5, user: msgauthor, serveur: serveurauthor}).value()){
            db.get("mob").push({id: 5, user: msgauthor, serveur: serveurauthor, mob: "Xhampi", level: 2, vie: 100.1, attaque: 15}).write();
        }

        if(!db.get("mob").find({id: 6, user: msgauthor, serveur: serveurauthor}).value()){
            db.get("mob").push({id: 6, user: msgauthor, serveur: serveurauthor, mob: "Bulborbe", level: 2, vie: 130.1, attaque: 10}).write();
        }

        if(!db.get("attaque").find({attaque: "flèches empoisonnées"}).value()){
            db.get("attaque").push({classes : "Archer", attaque: "flèches empoisonnées", dégâts: 15}).write();
        }

        if(!db.get("attaque").find({attaque: "foudre"}).value()){
            db.get("attaque").push({classes : "Mage", attaque: "foudre", dégâts: 10}).write();
        }

        if(!db.get("attaque").find({attaque: "potion"}).value()){
            db.get("attaque").push({classes: "toutes", attaque: "potion", dégâts: 30, cost : 1}).write();
        }

        if(!db.get("attaque").find({attaque: "flèches de feu", user: msgauthor, serveur: serveurauthor}).value()){
            db.get("attaque").push({user: msgauthor,  serveur: serveurauthor, classes: "Archer", attaque: "flèches de feu", dégâts: 20, utilisation: 5}).write();
        }

        if(!db.get("attaque").find({attaque: "boule de feu", user: msgauthor, serveur: serveurauthor}).value()){
            db.get("attaque").push({user: msgauthor,  serveur: serveurauthor, classes: "Mage", attaque: "boule de feu", dégâts: 20, utilisation: 5}).write();
        }

        if(!db.get("attaque").find({attaque: "etreinte de la mort", user: msgauthor, serveur: serveurauthor}).value()){
            db.get("attaque").push({user: msgauthor,  serveur: serveurauthor, classes: "Alchimiste", attaque: "etreinte de la mort", dégâts: 30, utilisation: 2}).write();
        }

        if(!db.get("attaque").find({attaque: "acide"}).value()){
            db.get("attaque").push({user: msgauthor,  serveur: serveurauthor, classes: "Alchimiste", attaque: "acide", dégâts: 10}).write();
        }

        if(!db.get("attaque").find({attaque: "empoisonnement", user: msgauthor, serveur: serveurauthor}).value()){
            db.get("attaque").push({user: msgauthor,  serveur: serveurauthor, classes: "Alchimiste", attaque: "empoisonnement", dégâts: 15, utilisation: 7}).write();
        }

        var userxpdb = db.get("xp").filter({user: msgauthor, serveur: serveurauthor}).find('xp').value();
        var userxp = Object.values(userxpdb);
        var money = db.get("money").filter({serveur: serveurauthor, user : msgauthor}).find('money').value();
        var moneyfinal = Object.values(money);
        var feuF = db.get("attaque").filter({attaque: "flèches de feu", user: msgauthor, serveur: serveurauthor}).find('attaque').value();
        var feuFfinal = Object.values(feuF)
        var pvp = db.get("pvp").filter({user: msgauthor, serveur: serveurauthor}).find('personnage').value();
        var pvpfinal = Object.values(pvp);
        var mort = db.get("attaque").filter({attaque: "etreinte de la mort", user: msgauthor, serveur: serveurauthor}).find('attaque').value();
        var mortfinal = Object.values(mort);
        var acide = db.get("attaque").filter({attaque: "acide"}).find('dégâts').value();
        var acidefinal = Object.values(acide);
        var poison = db.get("attaque").filter({attaque: "empoisonnement", user: msgauthor, serveur: serveurauthor}).find('dégâts').value();
        var poisonfinal = Object.values(poison);
        var poisonF = db.get("attaque").filter({attaque: "flèches empoisonnées"}).find('dégâts').value();
        var poisonFfinal = Object.values(poisonF);
        var foudreB = db.get("attaque").filter({attaque: "foudre"}).find('dégâts').value();
        var foudreBfinal = Object.values(foudreB);
        var feuB = db.get("attaque").filter({attaque: "boule de feu", user: msgauthor, serveur: serveurauthor}).find('attaque').value();
        var feuBfinal = Object.values(feuB);
        var potion = db.get("attaque").filter({attaque: "potion"}).find('dégâts').value();
        var popofinal = Object.values(potion);
        let texte = message.content.split(prefix + "attaque ")[1];

        if(pvpfinal[7] === "Moblin"){
            db.get("pvp").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: pvpfinal[3], Level: userxp[3], Classe: pvpfinal[5], vie: pvpfinal[6], ennemie: "Moblin"}).write();
            var mob = db.get("mob").filter({id: 1}).find('vie').value();
            var mobfinal = Object.values(mob);
        }else if(pvpfinal[7] === "Plante pirahna"){
            db.get("pvp").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: pvpfinal[3], Level: userxp[3], Classe: pvpfinal[5], vie: pvpfinal[6], ennemie: "Plante pirahna"}).write();
            var mob = db.get("mob").filter({id: 2}).find('vie').value();
            var mobfinal = Object.values(mob);
        }else if(pvpfinal[7] === "Bloops"){
            db.get("pvp").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: pvpfinal[3], Level: userxp[3], Classe: pvpfinal[5], vie: pvpfinal[6], ennemie: "Bloops"}).write();
            var mob = db.get("mob").filter({id: 3}).find('vie').value();
            var mobfinal = Object.values(mob);
        }else if(pvpfinal[7] === "Cheep-Cheep"){
            db.get("pvp").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: pvpfinal[3], Level: userxp[3], Classe: pvpfinal[5], vie: pvpfinal[6], ennemie: "Cheep-Cheep"}).write();
            var mob = db.get("mob").filter({id: 4}).find('vie').value();
            var mobfinal = Object.values(mob);
        }else if(pvpfinal[7] === "Xhampi"){
            db.get("pvp").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: pvpfinal[3], Level: userxp[3], Classe: pvpfinal[5], vie: pvpfinal[6], ennemie: "Xhampi"}).write();
            var mob = db.get("mob").filter({id: 5}).find('vie').value();
            var mobfinal = Object.values(mob);
        }else if(pvpfinal[7] === "Bulborbe"){
            db.get("pvp").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: pvpfinal[3], Level: userxp[3], Classe: pvpfinal[5], vie: pvpfinal[6], ennemie: "Bulborbe"}).write();
            var mob = db.get("mob").filter({id: 6}).find('vie').value();
            var mobfinal = Object.values(mob);
        }

        if(texte === "Moblin"){
            db.get("pvp").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: pvpfinal[3], Level: userxp[3], Classe: pvpfinal[5], vie: pvpfinal[6], ennemie: "Moblin"}).write();
            var mob = db.get("mob").filter({id: 1}).find('vie').value();
            var mobfinal = Object.values(mob);
            message.channel.send("Votre ennemie sera le **Moblin** !")
        }else if(texte === "Plante pirahna"){
            db.get("pvp").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: pvpfinal[3], Level: userxp[3], Classe: pvpfinal[5], vie: pvpfinal[6], ennemie: "Plante pirahna"}).write();
            var mob = db.get("mob").filter({id: 2}).find('vie').value();
            var mobfinal = Object.values(mob);
            message.channel.send("Votre ennemie sera la **Plante pirahna** !")
        }else if(texte === "Bloops"){
            db.get("pvp").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: pvpfinal[3], Level: userxp[3], Classe: pvpfinal[5], vie: pvpfinal[6], ennemie: "Bloops"}).write();
            var mob = db.get("mob").filter({id: 3}).find('vie').value();
            var mobfinal = Object.values(mob);
            message.channel.send("Votre ennemie sera le **Bloops** !")
        }else if(texte === "Cheep-Cheep"){
            db.get("pvp").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: pvpfinal[3], Level: userxp[3], Classe: pvpfinal[5], vie: pvpfinal[6], ennemie: "Cheep-Cheep"}).write();
            var mob = db.get("mob").filter({id: 4}).find('vie').value();
            var mobfinal = Object.values(mob);
            message.channel.send("Votre ennemie sera le **Cheep-Cheep** !")
        }else if(texte === "Xhampi"){
            db.get("pvp").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: pvpfinal[3], Level: userxp[3], Classe: pvpfinal[5], vie: pvpfinal[6], ennemie: "Xhampi"}).write();
            var mob = db.get("mob").filter({id: 5}).find('vie').value();
            var mobfinal = Object.values(mob);
            message.channel.send("Votre ennemie sera le **Xhampi** !")
        }else if(texte === "Bulborbe"){
            db.get("pvp").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: pvpfinal[3], Level: userxp[3], Classe: pvpfinal[5], vie: pvpfinal[6], ennemie: "Bulborbe"}).write();
            var mob = db.get("mob").filter({id: 6}).find('vie').value();
            var mobfinal = Object.values(mob);
            message.channel.send("Votre ennemie sera le **Bulborbe** !")
        }

        
        if(!texte){
            message.channel.send("Pour savoir l'attaque de votre personnage, faites `/<nom du perso>`, un combat, défaite ou victoire, coûte 1µ !")
            message.channel.send("Pour choisir votre ennemie, faites `/attaque <nom>`, le **Moblin** et la **Plante pirahna** sont disponibles en tant qu'ennemie !");
            return;
        }

        if(mobfinal[5] <= 1){
            message.channel.send("Vous avez gagné, vous avez donc gagné **2**µ !")
            db.get("money").find({user: msgauthor, serveur: serveurauthor}).assign({serveur: serveurauthor, user: msgauthor, money: moneyfinal[2] += 200}).write();
            
            if(pvpfinal[7] === "Moblin"){
                message.channel.send("Vous avez tué le **Moblin** !")
                db.get("mob").find({id : 1}).assign({id: 1, user: msgauthor, serveur: serveurauthor, mob: "Moblin", level: 1, vie: 65.1, attaque: 15}).write();
            }else if(pvpfinal[7] === "Plante pirahna"){
                message.channel.send("Vous avez tué la **Plante pirahna** !")
                db.get("mob").find({id : 2}).assign({id: 2, user: msgauthor, serveur: serveurauthor, mob: "Plante pirahna", level: 1, vie: 90.1, attaque: 10}).write();
            }else if(pvpfinal[7] === "Bloops"){
                message.channel.send("Vous avez tué le **Bloops** !")
                db.get("mob").find({id : 3}).assign({id: 3, user: msgauthor, serveur: serveurauthor, mob: "Bloops", level: 1, vie: 90.1, attaque: 15}).write();
            }else if(pvpfinal[7] === "Cheep-Cheep"){
                message.channel.send("Vous avez tué le **Cheep-Cheep** !")
                db.get("mob").find({id : 4}).assign({id: 4, user: msgauthor, serveur: serveurauthor, mob: "Cheep-Cheep", level: 1, vie: 50.1, attaque: 25}).write();
            }else if(pvpfinal[7] === "Xhampi"){
                message.channel.send("Vous avez tué le **Xhampi** !")
                db.get("mob").find({id : 5}).assign({id: 5, user: msgauthor, serveur: serveurauthor, mob: "Xhampi", level: 2, vie: 100.1, attaque: 15}).write();
            }else if(pvpfinal[7] === "Bulborbe"){
                message.channel.send("Vous avez tué le **Bulborbe** !")
                db.get("mob").find({id : 6}).assign({id: 6, user: msgauthor, serveur: serveurauthor, mob: "Bulborbe", level: 2, vie: 130.1, attaque: 10}).write();
            }
    
            
                db.get("attaque").find({serveur: serveurauthor, user: msgauthor, attaque: "flèches de feu"}).assign({user: msgauthor, serveur: serveurauthor, classes: feuFfinal[2], attaque: feuFfinal[3], dégâts: feuFfinal[4], utilisation: 5}).write();
                db.get("attaque").find({serveur: serveurauthor, user: msgauthor, attaque: "etreinte de la mort"}).assign({user: msgauthor,  serveur: serveurauthor, classes: mortfinal[2], attaque: mortfinal[3], dégâts: mortfinal[4], utilisation: 2}).write();
                db.get("attaque").find({serveur: serveurauthor, user: msgauthor, attaque: "empoisonnement"}).assign({user: msgauthor, serveur: serveurauthor, classes: poisonfinal[2], attaque: poisonfinal[4], dégâts: poisonfinal[5], utilisation: 7}).write();
                db.get("attaque").find({serveur: serveurauthor, user: msgauthor, attaque: "boule de feu"}).assign({user: msgauthor, serveur: serveurauthor, classes: feuBfinal[2], attaque: feuBfinal[3], dégâts: feuBfinal[4], utilisation: 5}).write();
                return;
        }

        if(pvpfinal[6] <= 1){
            message.channel.send("Vous avez perdu, vous avez donc perdu vos **1**µ")
            db.get("money").find({user: msgauthor, serveur: serveurauthor}).assign({serveur: serveurauthor, user: msgauthor, money: moneyfinal[2] -= 100}).write();
            
            if(pvpfinal[7] === "Moblin"){
                message.channel.send("Le **Moblin** vous a tué !")
                db.get("mob").find({id : 1}).assign({id: 1, user: msgauthor, serveur: serveurauthor, mob: "Moblin", level: 1, vie: 65.1, attaque: 15}).write();
            }else if(pvpfinal[7] === "Plante pirahna"){
                message.channel.send("La **Plante pirahna** vous a tué !")
                db.get("mob").find({id : 2}).assign({id: 2, user: msgauthor, serveur: serveurauthor, mob: "Plante pirahna", level: 1, vie: 90.1, attaque: 10}).write();
            }else if(pvpfinal[7] === "Bloops"){
                message.channel.send("Le **Bloops** vous a tué !")
                db.get("mob").find({id : 3}).assign({id: 3, user: msgauthor, serveur: serveurauthor, mob: "Bloops", level: 1, vie: 90.1, attaque: 15}).write();
            }else if(pvpfinal[7] === "Cheep-Cheep"){
                message.channel.send("Le **Cheep-Cheep** vous a tué !")
                db.get("mob").find({id : 4}).assign({id: 4, user: msgauthor, serveur: serveurauthor, mob: "Cheep-Cheep", level: 1, vie: 50.1, attaque: 25}).write();
            }else if(pvpfinal[7] === "Xhampi"){
                message.channel.send("Le **Xhampi** vous a tué !")
                db.get("mob").find({id : 5}).assign({id: 5, user: msgauthor, serveur: serveurauthor, mob: "Xhampi", level: 2, vie: 100.1, attaque: 15}).write();
            }else if(pvpfinal[7] === "Bulborbe"){
                message.channel.send("Le **Bulborbe** vous a tué !")
                db.get("mob").find({id : 6}).assign({id: 6, user: msgauthor, serveur: serveurauthor, mob: "Bulborbe", level: 2, vie: 130.1, attaque: 10}).write();
            }

            message.channel.send("Achetez la `régénération` au shop !")
    
                db.get("attaque").find({serveur: serveurauthor, user: msgauthor, attaque: "flèches de feu"}).assign({user: msgauthor, serveur: serveurauthor, classes: feuFfinal[2], attaque: feuFfinal[3], dégâts: feuFfinal[4], utilisation: 5}).write();
                db.get("attaque").find({serveur: serveurauthor, user: msgauthor, attaque: "etreinte de la mort"}).assign({user: msgauthor,  serveur: serveurauthor, classes: mortfinal[2], attaque: mortfinal[3], dégâts: mortfinal[4], utilisation: 2}).write();
                db.get("attaque").find({serveur: serveurauthor, user: msgauthor, attaque: "empoisonnement"}).assign({user: msgauthor, serveur: serveurauthor, classes: poisonfinal[2], attaque: poisonfinal[4], dégâts: poisonfinal[5], utilisation: 7}).write();
                db.get("attaque").find({serveur: serveurauthor, user: msgauthor, attaque: "boule de feu"}).assign({user: msgauthor, serveur: serveurauthor, classes: feuBfinal[2], attaque: feuBfinal[3], dégâts: feuBfinal[4], utilisation: 5}).write();
                return;
        }


        if(pvpfinal[3] === "Aurora"){

            if(mobfinal[5] <= 0){
                return;
            }else{

            if(texte === "flèches empoisonnées"){

                

                    db.get("attaque").find({attaque: "flèches empoisonnées"}).assign({classes: "Archer", attaque: "flèches empoisonnées", dégâts: 15}).write();
                    db.get("mob").find({id: mobfinal[0]}).assign({id: mobfinal[0], mob: mobfinal[3], level: mobfinal[4], vie: mobfinal[5] -= poisonFfinal[2], attaque: mobfinal[6] }).write();
                    db.get("pvp").find({user: msgauthor, serveur: serveurauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: pvpfinal[3], Level: userxp[3], Classe: pvpfinal[5], vie: pvpfinal[6] -= mobfinal[6]}).write();
                    if(pvpfinal[7] === "Moblin"){
                        message.channel.send("Vous infligez **15** de dégâts au Moblin !")
                        message.channel.send("Le Moblin vous a infligé **15** de dégâts !")
                    }else if(pvpfinal[7] === "Plante pirahna"){
                        message.channel.send("Vous infligez **15** de dégâts à la Plante pirahna !")
                        message.channel.send("La Plante pirahna vous a infligé **10** de dégâts !")
                    }else if(pvpfinal[7] === "Bloops"){
                        message.channel.send("Vous infligez **15** de dégâts au Bloops !")
                        message.channel.send("Le Bloops vous a infligé **15** de dégâts !")
                    }else if(pvpfinal[7] === "Cheep-Cheep"){
                        message.channel.send("Vous infligez **15** de dégâts au Cheep-Cheep !")
                        message.channel.send("Le Moblin vous a infligé **20** de dégâts !")
                    }else if(pvpfinal[7] === "Xhampi"){
                        message.channel.send("Vous infligez **15** de dégâts au Xhampi !")
                        message.channel.send("Le Xhampi vous a infligé **15** de dégâts !")
                    }else if(pvpfinal[7] === "Bulborbe"){
                        message.channel.send("Vous infligez **15** de dégâts au Bulbore !")
                        message.channel.send("Le Bulborbe vous a infligé **10** de dégâts !")
                    }
                
            }

            if(texte === "potion"){

                

                    if(pvpfinal[2] > 0){

                        db.get("pvp").find({user: msgauthor, serveur: serveurauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2] -= popofinal[3], personnage: pvpfinal[3], Level: pvpfinal[4], Classe: pvpfinal[5], vie: pvpfinal[6] += popofinal[2]}).write();
                        message.channel.send("Vous avez récupéré **30** pv !")
                        db.get("mob").find({id: mobfinal[0]}).assign({id: mobfinal[0], mob: mobfinal[3], level: mobfinal[4], vie: mobfinal[5], attaque: mobfinal[6] }).write();
                        db.get("pvp").find({user: msgauthor, serveur: serveurauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: pvpfinal[3], Level: userxp[3], Classe: pvpfinal[5], vie: pvpfinal[6] += popofinal[2] -= mobfinal[3]}).write();
                        if(pvpfinal[7] === "Moblin"){
                            message.channel.send("Le Moblin vous a infligé **15** de dégâts !")
                        }else if(pvpfinal[7] === "Plante pirahna"){
                            message.channel.send("La Plante pirahna vous a infligé **10** de dégâts !")
                        }else if(pvpfinal[7] === "Bloops"){
                            message.channel.send("Le Bloops vous a infligé **15** de dégâts !")
                        }else if(pvpfinal[7] === "Cheep-Cheep"){
                            message.channel.send("Le Moblin vous a infligé **20** de dégâts !")
                        }else if(pvpfinal[7] === "Xhampi"){
                            message.channel.send("Le Xhampi vous a infligé **15** de dégâts !")
                        }else if(pvpfinal[7] === "Bulborbe"){
                            message.channel.send("Le Bulborbe vous a infligé **10** de dégâts !")
                        }

                    }else{ 

                        return message.channel.send("Vous n'avez plus de potion !");
                    }
                   
            }

            

                if(texte === "flèches de feu"){

                    if(feuFfinal[5] <= 0){
                        return;
                    }else{

                        db.get("attaque").find({attaque: "flèches de feu"}).assign({user: msgauthor, serveur: serveurauthor, classes: feuFfinal[2], attaque: feuFfinal[3], dégâts: feuFfinal[4], utilisation: feuFfinal[5] -= 1}).write();
                        db.get("mob").find({id: mobfinal[0]}).assign({id: mobfinal[0], mob: mobfinal[3], level: mobfinal[4], vie: mobfinal[5] -= feuFfinal[4], attaque: mobfinal[6] }).write();
                        db.get("pvp").find({user: msgauthor, serveur: serveurauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: pvpfinal[3], Level: userxp[3], Classe: pvpfinal[5], vie: pvpfinal[6] -= mobfinal[6]}).write();
                        if(pvpfinal[7] === "Moblin"){
                            message.channel.send("Vous infligez **20** de dégâts au Moblin !")
                            message.channel.send("Le Moblin vous a infligé **15** de dégâts !")
                        }else if(pvpfinal[7] === "Plante pirahna"){
                            message.channel.send("Vous infligez **20** de dégâts à la Plante pirahna !")
                            message.channel.send("La Plante pirahna vous a infligé **10** de dégâts !")
                        }else if(pvpfinal[7] === "Bloops"){
                            message.channel.send("Vous infligez **20** de dégâts au Bloops !")
                            message.channel.send("Le Bloops vous a infligé **15** de dégâts !")
                        }else if(pvpfinal[7] === "Cheep-Cheep"){
                            message.channel.send("Vous infligez **20** de dégâts au Cheep-Cheep !")
                            message.channel.send("Le Moblin vous a infligé **20** de dégâts !")
                        }else if(pvpfinal[7] === "Xhampi"){
                            message.channel.send("Vous infligez **20** de dégâts au Xhampi !")
                            message.channel.send("Le Xhampi vous a infligé **15** de dégâts !")
                        }else if(pvpfinal[7] === "Bulborbe"){
                            message.channel.send("Vous infligez **20** de dégâts au Bulbore !")
                            message.channel.send("Le Bulborbe vous a infligé **10** de dégâts !")
                        }
                    }
                }
            }
            

        }else if(pvpfinal[3] === "Pouxi"){

            if(texte === "potion"){

                if(mobfinal[5] <= 0){
                    return;
                }else{

                    if(pvpfinal[2] > 0){
                        db.get("pvp").find({user: msgauthor, serveur: serveurauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2] -= popofinal[3], personnage: pvpfinal[3], Level: pvpfinal[4], Classe: pvpfinal[5], vie: pvpfinal[6] += popofinal[2]}).write();
                        message.channel.send("Vous avez récupéré **30** pv !")
                        db.get("mob").find({id: 1}).assign({id: 1, mob: mobfinal[3], level: mobfinal[4], vie: mobfinal[5], attaque: mobfinal[6] }).write();
                        db.get("pvp").find({user: msgauthor, serveur: serveurauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: pvpfinal[3], Level: userxp[3], Classe: pvpfinal[5], vie: pvpfinal[6] -= mobfinal[6]}).write();
                        if(pvpfinal[7] === "Moblin"){
                            message.channel.send("Le Moblin vous a infligé **15** de dégâts !")
                        }else if(pvpfinal[7] === "Plante pirahna"){
                            message.channel.send("La Plante pirahna vous a infligé **10** de dégâts !")
                        }else if(pvpfinal[7] === "Bloops"){
                            message.channel.send("Le Bloops vous a infligé **15** de dégâts !")
                        }else if(pvpfinal[7] === "Cheep-Cheep"){
                            message.channel.send("Le Moblin vous a infligé **20** de dégâts !")
                        }else if(pvpfinal[7] === "Xhampi"){
                            message.channel.send("Le Xhami vous a infligé **15** de dégâts !")
                        }else if(pvpfinal[7] === "Bulborbe"){
                            message.channel.send("Le Bulborbe vous a infligé **10** de dégâts !")
                        }
                    }else{ 

                        return message.channel.send("Vous n'avez plus de potion !");

                    }
                }
            }

            

                if(texte === "boule de feu"){

                    if(feuBfinal[5] <= 0){
                        return;
                    }else{

                        db.get("attaque").find({attaque: "boule de feu"}).assign({user: msgauthor, serveur: serveurauthor, classes: feuBfinal[2], attaque: feuBfinal[3], dégâts: feuBfinal[4], utilisation: feuBfinal[5] -= 1}).write();
                        db.get("mob").find({id: mobfinal[0]}).assign({id: mobfinal[0], user: msgauthor, serveur: serveurauthor, mob: mobfinal[3], level: mobfinal[4], vie: mobfinal[5] -= feuBfinal[4], attaque: mobfinal[6] }).write();
                        db.get("pvp").find({user: msgauthor, serveur: serveurauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: pvpfinal[3], Level: userxp[3], Classe: pvpfinal[5], vie: pvpfinal[6] -= mobfinal[6]}).write();
                        if(pvpfinal[7] === "Moblin"){
                            message.channel.send("Vous infligez **20** de dégâts au Moblin !")
                            message.channel.send("Le Moblin vous a infligé **15** de dégâts !")
                        }else if(pvpfinal[7] === "Plante pirahna"){
                            message.channel.send("Vous infligez **20** de dégâts à la Plante pirahna !")
                            message.channel.send("La Plante pirahna vous a infligé **10** de dégâts !")
                        }else if(pvpfinal[7] === "Bloops"){
                            message.channel.send("Vous infligez **20** de dégâts au Bloops !")
                            message.channel.send("Le Bloops vous a infligé **15** de dégâts !")
                        }else if(pvpfinal[7] === "Cheep-Cheep"){
                            message.channel.send("Vous infligez **20** de dégâts au Cheep-Cheep !")
                            message.channel.send("Le Moblin vous a infligé **20** de dégâts !")
                        }else if(pvpfinal[7] === "Xhampi"){
                            message.channel.send("Vous infligez **20** de dégâts au Xhampi !")
                            message.channel.send("Le Xhampi vous a infligé **15** de dégâts !")
                        }else if(pvpfinal[7] === "Bulborbe"){
                            message.channel.send("Vous infligez **20** de dégâts au Bulbore !")
                            message.channel.send("Le Bulborbe vous a infligé **10** de dégâts !")
                        }
                    }
                }

                if(texte === "foudre"){
                    db.get("attaque").find({attaque: "foudre"}).assign({classes: foudreBfinal[0], attaque: foudreBfinal[1], dégâts: foudreBfinal[2]}).write();
                    db.get("mob").find({id: mobfinal[0]}).assign({id: mobfinal[0], mob: mobfinal[3], level: mobfinal[4], vie: mobfinal[5] -= foudreBfinal[2], attaque: mobfinal[6] }).write();
                    db.get("pvp").find({user: msgauthor, serveur: serveurauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: pvpfinal[3], Level: userxp[3], Classe: pvpfinal[5], vie: pvpfinal[6] -= mobfinal[6]}).write();
                    if(pvpfinal[7] === "Moblin"){
                        message.channel.send("Vous infligez **10** de dégâts au Moblin !")
                        message.channel.send("Le Moblin vous a infligé **15** de dégâts !")
                    }else if(pvpfinal[7] === "Plante pirahna"){
                        message.channel.send("Vous infligez **10** de dégâts à la Plante pirahna !")
                        message.channel.send("La Plante pirahna vous a infligé **10** de dégâts !")
                    }else if(pvpfinal[7] === "Bloops"){
                        message.channel.send("Vous infligez **10** de dégâts au Bloops !")
                        message.channel.send("Le Bloops vous a infligé **15** de dégâts !")
                    }else if(pvpfinal[7] === "Cheep-Cheep"){
                        message.channel.send("Vous infligez **10** de dégâts au Cheep-Cheep !")
                        message.channel.send("Le Moblin vous a infligé **20** de dégâts !")
                    }else if(pvpfinal[7] === "Xhampi"){
                        message.channel.send("Vous infligez **10** de dégâts au Xhampi !")
                        message.channel.send("Le Xhampi vous a infligé **15** de dégâts !")
                    }else if(pvpfinal[7] === "Bulborbe"){
                        message.channel.send("Vous infligez **10** de dégâts au Bulbore !")
                        message.channel.send("Le Bulborbe vous a infligé **10** de dégâts !")
                    }
                }
            
        }else if(pvpfinal[3] === "Tartanpion"){

            if(mobfinal[5] <= 0){
                return
            }else{

                if(texte === "potion"){

                    if(pvpfinal[2] > 0){
                        db.get("pvp").find({user: msgauthor, serveur: serveurauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2] -= popofinal[3], personnage: pvpfinal[3], Level: pvpfinal[4], Classe: pvpfinal[5], vie: pvpfinal[6] += popofinal[2]}).write();
                        message.channel.send("Vous avez récupéré **30** pv !")
                        db.get("mob").find({id: 1}).assign({id: 1, mob: mobfinal[3], level: mobfinal[4], vie: mobfinal[5], attaque: mobfinal[6] }).write();
                        db.get("pvp").find({user: msgauthor, serveur: serveurauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: pvpfinal[3], Level: userxp[3], Classe: pvpfinal[5], vie: pvpfinal[6] -= mobfinal[6]}).write();
                        if(pvpfinal[7] === "Moblin"){
                            message.channel.send("Le Moblin vous a infligé **15** de dégâts !")
                        }else if(pvpfinal[7] === "Plante pirahna"){
                            message.channel.send("La Plante pirahna vous a infligé **10** de dégâts !")
                        }else if(pvpfinal[7] === "Bloops"){
                            message.channel.send("Le Bloops vous a infligé **15** de dégâts !")
                        }else if(pvpfinal[7] === "Cheep-Cheep"){
                            message.channel.send("Le Moblin vous a infligé **20** de dégâts !")
                        }else if(pvpfinal[7] === "Xhampi"){
                            message.channel.send("Le Xhami vous a infligé **15** de dégâts !")
                        }else if(pvpfinal[7] === "Bulborbe"){
                            message.channel.send("Le Bulborbe vous a infligé **10** de dégâts !")
                        }
                    }else{ 

                        return message.channel.send("Vous n'avez plus de potion !");

                    }
                }

                    if(texte === "acide"){
                        db.get("attaque").find({attaque: "acide"}).assign({user: msgauthor, serveur: serveurauthor, classes: acidefinal[2], attaque: acidefinal[3], dégâts: acidefinal[4]}).write();
                        db.get("mob").find({id: mobfinal[0]}).assign({id: mobfinal[0], user: msgauthor, serveur: serveurauthor, mob: mobfinal[3], level: mobfinal[4], vie: mobfinal[5] -= acidefinal[4], attaque: mobfinal[6] }).write();
                        db.get("pvp").find({user: msgauthor, serveur: serveurauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: pvpfinal[3], Level: userxp[3], Classe: pvpfinal[5], vie: pvpfinal[6] -= mobfinal[6]}).write();
                    if(pvpfinal[7] === "Moblin"){
                        message.channel.send("Vous infligez **10** de dégâts au Moblin !")
                        message.channel.send("Le Moblin vous a infligé **15** de dégâts !")
                    }else if(pvpfinal[7] === "Plante pirahna"){
                        message.channel.send("Vous infligez **10** de dégâts à la Plante pirahna !")
                        message.channel.send("La Plante pirahna vous a infligé **10** de dégâts !")
                    }else if(pvpfinal[7] === "Bloops"){
                        message.channel.send("Vous infligez **10** de dégâts au Bloops !")
                        message.channel.send("Le Bloops vous a infligé **15** de dégâts !")
                    }else if(pvpfinal[7] === "Cheep-Cheep"){
                        message.channel.send("Vous infligez **10** de dégâts au Cheep-Cheep !")
                        message.channel.send("Le Moblin vous a infligé **20** de dégâts !")
                    }else if(pvpfinal[7] === "Xhampi"){
                        message.channel.send("Vous infligez **10** de dégâts au Xhampi !")
                        message.channel.send("Le Xhampi vous a infligé **15** de dégâts !")
                    }else if(pvpfinal[7] === "Bulborbe"){
                        message.channel.send("Vous infligez **10** de dégâts au Bulbore !")
                        message.channel.send("Le Bulborbe vous a infligé **10** de dégâts !")
                    }
                }

                if(texte === "etreinte de la mort"){
                    if(mortfinal[5] <= 0){
                        return message.channel.send("Vous ne pouvez plus l'utiliser !")
                    }else{
                    
                        db.get("attaque").find({attaque: "etreinte de la mort"}).assign({user: msgauthor, serveur: serveurauthor, classes: mortfinal[2], attaque: mortfinal[3], dégâts: mortfinal[4], utilisation: mortfinal[5] -= 1}).write();
                        db.get("mob").find({id: mobfinal[0]}).assign({id: mobfinal[0], user: msgauthor, serveur: serveurauthor, mob: mobfinal[3], level: mobfinal[4], vie: mobfinal[5] -= mortfinal[4], attaque: mobfinal[6] }).write();
                        db.get("pvp").find({user: msgauthor, serveur: serveurauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: pvpfinal[3], Level: userxp[3], Classe: pvpfinal[5], vie: pvpfinal[6] -= mobfinal[6]}).write();
                        if(pvpfinal[7] === "Moblin"){
                            message.channel.send("Vous infligez **30** de dégâts au Moblin !")
                            message.channel.send("Le Moblin vous a infligé **15** de dégâts !")
                        }else if(pvpfinal[7] === "Plante pirahna"){
                            message.channel.send("Vous infligez **30** de dégâts à la Plante pirahna !")
                            message.channel.send("La Plante pirahna vous a infligé **10** de dégâts !")
                        }else if(pvpfinal[7] === "Bloops"){
                            message.channel.send("Vous infligez **30** de dégâts au Bloops !")
                            message.channel.send("Le Bloops vous a infligé **15** de dégâts !")
                        }else if(pvpfinal[7] === "Cheep-Cheep"){
                            message.channel.send("Vous infligez **30** de dégâts au Cheep-Cheep !")
                            message.channel.send("Le Moblin vous a infligé **20** de dégâts !")
                        }else if(pvpfinal[7] === "Xhampi"){
                            message.channel.send("Vous infligez **30** de dégâts au Xhampi !")
                            message.channel.send("Le Xhampi vous a infligé **15** de dégâts !")
                        }else if(pvpfinal[7] === "Bulborbe"){
                            message.channel.send("Vous infligez **30** de dégâts au Bulbore !")
                            message.channel.send("Le Bulborbe vous a infligé **10** de dégâts !")
                        }
                    }
                }

                if(texte === "empoisonnement"){
                    if(poisonfinal[5] <= 0){
                        return message.channel.send("Vous ne pouvez plus l'utiliser !");
                    }else{
                    
                        db.get("attaque").find({attaque: "etreinte de la mort"}).assign({user: msgauthor, serveur: serveurauthor, classes: poisonfinal[2], attaque: poisonfinal[3], dégâts: poisonfinal[4], utilisation: poisonfinal[5] -= 1}).write();
                        db.get("mob").find({id: mobfinal[0]}).assign({id: mobfinal[0], user: msgauthor, serveur: serveurauthor, mob: mobfinal[3], level: mobfinal[4], vie: mobfinal[5] -= poisonfinal[4], attaque: mobfinal[6] }).write();
                        db.get("pvp").find({user: msgauthor, serveur: serveurauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: pvpfinal[3], Level: userxp[3], Classe: pvpfinal[5], vie: pvpfinal[6] -= mobfinal[6]}).write();
                        if(pvpfinal[7] === "Moblin"){
                            message.channel.send("Vous infligez **15** de dégâts au Moblin !")
                            message.channel.send("Le Moblin vous a infligé **15** de dégâts !")
                        }else if(pvpfinal[7] === "Plante pirahna"){
                            message.channel.send("Vous infligez **15** de dégâts à la Plante pirahna !")
                            message.channel.send("La Plante pirahna vous a infligé **10** de dégâts !")
                        }else if(pvpfinal[7] === "Bloops"){
                            message.channel.send("Vous infligez **15** de dégâts au Bloops !")
                            message.channel.send("Le Bloops vous a infligé **15** de dégâts !")
                        }else if(pvpfinal[7] === "Cheep-Cheep"){
                            message.channel.send("Vous infligez **15** de dégâts au Cheep-Cheep !")
                            message.channel.send("Le Moblin vous a infligé **20** de dégâts !")
                        }else if(pvpfinal[7] === "Xhampi"){
                            message.channel.send("Vous infligez **15** de dégâts au Xhampi !")
                            message.channel.send("Le Xhampi vous a infligé **15** de dégâts !")
                        }else if(pvpfinal[7] === "Bulborbe"){
                            message.channel.send("Vous infligez **15** de dégâts au Bulbore !")
                            message.channel.send("Le Bulborbe vous a infligé **10** de dégâts !")
                        }
                    }
                }
            }}
    }

    if(message.content.startsWith(prefix + "shop")){

        var msgauthor = message.author.id;
        var serveurauthor = message.guild.id;

        if(!db.get("shop").find({objet: "potion"}).value()){
            db.get("shop").push({id: 1, objet: "potion", cost: 200, valeur: 1}).write();
        }

        if(!db.get("shop").find({objet: "régénération"}).value()){
            db.get("shop").push({id: 2, objet: "régénération", cost: 100}).write();
        }

        if(!db.get("money").find({user: msgauthor}).value()){
            db.get("money").push({serveur: serveurauthor, user: msgauthor, money: 1000}).write();
        }

        if(!db.get("pvp").find({user: msgauthor, serveur: serveurauthor}).value()){
            message.channel.send("Faites `/personnage <nom>` pour avoir un personnage et pouvoir acheter au shop !")
        }

        var money = db.get("money").filter({serveur: serveurauthor, user : msgauthor}).find('money').value();
        var moneyfinal = Object.values(money);
        var popo = db.get("shop").filter({objet: "potion"}).find('cost').value();
        var popofinal = Object.values(popo);
        var regen = db.get("shop").filter({objet: "régénération"}).find('cost').value();
        var regenfinal = Object.values(regen);
        var pvp = db.get("pvp").filter({user: msgauthor, serveur: serveurauthor}).find('personnage').value();
        var pvpfinal = Object.values(pvp);
        let texte = message.content.split(prefix + "shop ")[1];

        if(!texte){ 
            let embed = new Discord.RichEmbed()
            .setColor("#F00000")
            .setTitle("Voici les objets du shop !")
            .addField("**potion** :", "coût : 2µ")
            .addField("**régénération** :", "coût: 3µ")
            .setFooter("C'est en développement, alors proposez moi des objets, armes, armures.... ainsi que leur nom !")
            message.channel.send(embed)
            return;
        }

        if(texte === "potion"){
            db.get("shop").find({id: 1}).assign({id: 1, objet: "potion", cost: 200, valeur: 1}).write();
            db.get("money").find({user: msgauthor, serveur: serveurauthor}).assign({user: msgauthor, serveur: serveurauthor, money: moneyfinal[2] -= popofinal[2]}).write();
            db.get("pvp").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2] += popofinal[3], personnage: pvpfinal[3], Level: pvpfinal[4], Classe: pvpfinal[5], vie: pvpfinal[6]}).write();
            message.channel.send("Vous avez acheté une potion !")
        }

        if(texte === "régénération"){
            db.get("shop").find({id: 2}).assign({id: 2, objet: "régénération", cost: 100}).write();
            db.get("money").find({user: msgauthor, serveur: serveurauthor}).assign({user: msgauthor, serveur: serveurauthor, money: moneyfinal[2] -= regenfinal[2]}).write();
            message.channel.send("Vous vous êtes régénéré !");

            if(pvpfinal[3] === "Aurora"){
                db.get("pvp").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: "Aurora", Level: pvpfinal[4], Classe: "Archer", vie: 110.1, ennemie: pvpfinal[7]}).write();
            }else if(pvpfinal[3] === "Pouxi"){
                db.get("pvp").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2] , personnage: "Pouxi", Level: pvpfinal[4], Classe: "Mage", vie: 150.1, ennemie: pvpfinal[7]}).write();
            }else if(pvpfinal[3] === "Tartanpion"){
                db.get("pvp").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: "Tartanpion", Level: pvpfinal[4], Classe: "Alchimiste", vie: 90.1, ennemie: pvpfinal[7]}).write();
            }else if(pvpfinal[3] === "Pantouflor"){
                db.get("pvp").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, potion: pvpfinal[2], personnage: "Pantouflor", Level: pvpfinal[4], Classe: "Esprit", vie: 250.1, ennemie: pvpfinal[7]}).write();
            }
        }
    }

    if(message.content.startsWith(prefix + "stats")){

        var msgauthor = message.author.tag;
        var serveurauthor = message.guild.name;
        var userxpdb = db.get("xp").filter({user: msgauthor, serveur: serveurauthor}).find('xp').value();
        var userxp = Object.values(userxpdb);

        if(!db.get("pvp").find({user: msgauthor, serveur: serveurauthor, Level: userxp[3]}).value()){
            message.channel.send("Faites `/personnage <nom>` pour avoir un personnage !")
            return;
        }

        var pvp = db.get("pvp").filter({user: msgauthor, serveur: serveurauthor}).find('personnage').value();
        var pvpfinal = Object.values(pvp);

        let embed = new Discord.RichEmbed()
        .setColor("#F00000")
        .setTitle("Voici votre statue !")
        .addField("Nom :", pvpfinal[3])
        .addField("Vie :", `${pvpfinal[6]}`)
        .addField("Potion :", `${pvpfinal[2]}`)
        .setFooter("Un inventaire arrivera plus tard !")
        message.channel.send(embed)
    }

    if(message.content.startsWith(prefix + "Aurora")){
        let embed = new Discord.RichEmbed()
        .setColor("#F00000")
        .setTitle("Voici les attaques d'**Aurora** !")
        .addField("flèches empoisonnées", "Inflige 15 de dégâts")
        .addField("flèches de feu", "Inflige 20 de dégâts, s'utilise 5 fois !")
        .addField("potion", "Rend 30 de vie")
        .setFooter("D'autres attaques arriveront !")
        message.channel.send(embed);
    }

    if(message.content.startsWith(prefix + "Pouxi")){
        let embed = new Discord.RichEmbed()
        .setColor("#F00000")
        .setTitle("Voici les attaques de **Pouxi** !")
        .addField("boule de feu", "Inflige 20 de dégâts, s'utilise 5 fois !")
        .addField("foudre", "Inflige 10 de dégâts")
        .addField("potion", "Rend 30 de vie")
        .setFooter("D'autres attaques arriveront !")
        message.channel.send(embed);
    }

    if(message.content === prefix + "profil"){

        var msgauthor = message.author.id;
        var serveurauthor = message.guild.id;

        if(!db.get("profil").find({serveur: serveurauthor, user: msgauthor}).value()){
            db.get("profil").push({serveur: serveurauthor, user: msgauthor, intelligence: 0.1, force: 0.1, popularite: 0.1, larbin: 0.1, travail: "Au chômage"}).write()
        }

        var usermoneydb = db.get("money").filter({user: msgauthor, serveur: serveurauthor}).find('money').value();
        var usermoney = Object.values(usermoneydb);
        var usermoneydbl = db.get("profil").filter({user: msgauthor, serveur: serveurauthor}).find('user').value();
        var profile = Object.values(usermoneydbl);

        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle('**Voici votre profil** :')
        .addField(":moneybag: ○ Argent : ", usermoney[2] / 100 + "µ")
        .addField(":bulb: ○ Intelligence : ", profile[2] - 0.1)
        .addField(":muscle: ○ Force : ", profile[3] - 0.1)
        .addField(":family_mwgb: ○ Popularité : ", profile[4] - 0.1)
        .addField(":bust_in_silhouette: ○ Larbins : ", profile[5] - 0.1)
        .addField(":tools: Métier :", profile[6])
        message.channel.send(embed)
    } 

    if(message.content === prefix + "id"){
        var id = message.author.id;
        console.log(id)
        
    }

    if(!message.content.startsWith(prefix)) return;

     var args = message.content.substring(prefix.length).split(" ");

    switch(args[0].toLocaleLowerCase()){
        case "learn":

        if(!db.get("profil").find({serveur: serveurauthor, user: msgauthor}).value()){
            db.get("profil").push({serveur: serveurauthor, user: msgauthor, intelligence: 0.1, force: 0.1, popularite: 0.1, larbin: 0.1, travail: "Au chômage"}).write()
        }

        var usermoneydb = db.get("money").filter({user: msgauthor, serveur: serveurauthor}).find('money').value();
        var usermoney = Object.values(usermoneydb);
        var usermoneydbl = db.get("profil").filter({user: msgauthor, serveur: serveurauthor}).find('user').value();
        var profile = Object.values(usermoneydbl);

        if(usermoney[2] > 500){
            db.get("profil").find({user: msgauthor, serveur: serveurauthor}).assign({serveur: serveurauthor, user: msgauthor, intelligence: profile[2] += 2.5, force: profile[3], popularite: profile[4], larbin: profile[5]}).write();
            db.get("money").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, money: usermoney[2] -= 500}).write();
            message.channel.send("Vous avez gagné **2,5** d'intelligence, mais vous avez perdu **5**µ !")
        }else{
            return message.channel.send("Vous n'avez pas assez d'argent !")
        }

        break;

        case "bodybuild":

        if(!db.get("profil").find({serveur: serveurauthor, user: msgauthor}).value()){
            db.get("profil").push({serveur: serveurauthor, user: msgauthor, intelligence: 0.1, force: 0.1, popularite: 0.1, larbin: 0.1, travail: "Au chômage"}).write()
        }

        var usermoneydb = db.get("money").filter({user: msgauthor, serveur: serveurauthor}).find('money').value();
        var usermoney = Object.values(usermoneydb);
        var usermoneydbl = db.get("profil").filter({user: msgauthor, serveur: serveurauthor}).find('user').value();
        var profile = Object.values(usermoneydbl);

        if(usermoney[2] > 500){
            db.get("profil").find({user: msgauthor, serveur: serveurauthor}).assign({serveur: serveurauthor, user: msgauthor, intelligence: profile[2], force: profile[3] += 2, popularite: profile[4], larbin: profile[5]}).write();
            db.get("money").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, money: usermoney[2] -= 500}).write();
            message.channel.send("Vous avez gagné **2** de force, mais vous avez perdu **5**µ !")
        }else{
            return message.channel.send("Vous n'avez pas assez d'argent !")
        }

        break;

        case "speak":

        if(!db.get("profil").find({serveur: serveurauthor, user: msgauthor}).value()){
            db.get("profil").push({serveur: serveurauthor, user: msgauthor, intelligence: 0.1, force: 0.1, popularite: 0.1, larbin: 0.1, travail: "Au chômage"}).write()
        }

        var usermoneydb = db.get("money").filter({user: msgauthor, serveur: serveurauthor}).find('money').value();
        var usermoney = Object.values(usermoneydb);
        var usermoneydbl = db.get("profil").filter({user: msgauthor, serveur: serveurauthor}).find('user').value();
        var profile = Object.values(usermoneydbl);

        if(usermoney[2] > 500){
            db.get("profil").find({user: msgauthor, serveur: serveurauthor}).assign({serveur: serveurauthor, user: msgauthor, intelligence: profile[2], force: profile[3], popularite: profile[4] += 1, larbin: profile[5]}).write();
            db.get("money").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, money: usermoney[2] -= 500}).write();
            message.channel.send("Vous avez gagné **1** de popularité, mais vous avez perdu **5**µ !")
        }else{
            return message.channel.send("Vous n'avez pas assez d'argent !")
        }

        break;
        case "metier":

        var msgauthor = message.author.id;
        var serveurauthor = message.guild.id;

        if(!db1.get("travail").find({serveur: serveurauthor, user : msgauthor}).value()){
            db1.get("trvail").push({serveur: serveurauthor, user: msgauthor, travail: "Au chômage"}).write()
        }

        if(!db.get("profil").find({serveur: serveurauthor, user: msgauthor}).value()){
            db.get("profil").push({serveur: serveurauthor, user: msgauthor, intelligence: 0.1, force: 0.1, popularite: 0.1, larbin: 0.1, travail: "Au chômage"}).write()
        }

        const args = message.content.split(' ').slice(1);
        var usermoneydbl = db.get("profil").filter({user: msgauthor, serveur: serveurauthor}).find('user').value();
        var profile = Object.values(usermoneydbl);

        if(args[0] == "join"){
            
            if(args[1] == "Professeur"){
                if(profile[2] >= 8 && profile[3] >= 3 && profile[4] >= 2){
                    db.get("profil").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, intelligence: profile[2], force: profile[3], popularite: profile[4], larbin: profile[5], travail: "Professeur"}).write()
                }else{
                    return message.channel.send("Vous n'avez pas les compétences requise !")
                }
            }else if(args[1] == "Pompier"){
                if(profile[2] >= 4 && profile[3] >= 7 && profile[4] >= 5){
                    db.get("profil").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, intelligence: profile[2], force: profile[3], popularite: profile[4], larbin: profile[5], travail: "Pompier"}).write()
                }else{
                    return message.channel.send("Vous n'avez pas les compétences requise !")
                }
            }else if(args[1] == "Boulanger"){
                if(profile[2] >= 5 && profile[3] >= 6 && profile[4] >= 9){
                    db.get("profil").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, intelligence: profile[2], force: profile[3], popularite: profile[4], larbin: profile[5], travail: "Boulanger"}).write()
                }else{
                    return message.channel.send("Vous n'avez pas les compétences requise !")
                }
            }else if(args[1] == "Ingénieur"){
                if(profile[2] >= 9 && profile[3] >= 2 && profile[4] >= 3){
                    db.get("profil").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, intelligence: profile[2], force: profile[3], popularite: profile[4], larbin: profile[5], travail: "Ingénier"}).write()
                }else{
                    return message.channel.send("Vous n'avez pas les compétences requise !")
                }
            }else if(args[1] == "Eboueur"){
                if(profile[2] >= 3 && profile[3] >= 4 && profile[4] >= 2){
                    db.get("profil").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, intelligence: profile[2], force: profile[3], popularite: profile[4], larbin: profile[5], travail: "Eboueur"}).write()
                }else{
                    return message.channel.send("Vous n'avez pas les compétences requise !")
                }
            }else if(args[1] == "Sportif"){
                if(profile[2] >= 1 && profile[3] >= 8 && profile[4] >= 8){
                    db.get("profil").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, intelligence: profile[2], force: profile[3], popularite: profile[4], larbin: profile[5], travail: "Sportif"}).write()
                }else{
                    return message.channel.send("Vous n'avez pas les compétences requise !")
                }
            }else if(args[1] == "Serveur"){
                if(profile[2] >= 4 && profile[3] >= 6 && profile[4] >= 7){
                    db.get("profil").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, intelligence: profile[2], force: profile[3], popularite: profile[4], larbin: profile[5], travail: "Serveur"}).write()
                }else{
                    return message.channel.send("Vous n'avez pas les compétences requise !")
                }
            }else if(args[1] == "Gamer"){
                if(profile[2] >= 3 && profile[3] >= 2 && profile[4] >= 0){
                    db.get("profil").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, intelligence: profile[2], force: profile[3], popularite: profile[4], larbin: profile[5], travail: "Gameur"}).write()
                }else{
                    return message.channel.send("Vous n'avez pas les compétences requise !")
                }
            }

        }else{
            console.log("no")
        }
        break;


        case "larbin":

        if(!db.get("profil").find({serveur: serveurauthor, user: msgauthor}).value()){
            db.get("profil").push({serveur: serveurauthor, user: msgauthor, intelligence: 0.1, force: 0.1, popularite: 0.1, larbin: 0.1, travail: "Au chômage"}).write()
        }

        var usermoneydb = db.get("money").filter({user: msgauthor, serveur: serveurauthor}).find('money').value();
        var usermoney = Object.values(usermoneydb);
        var usermoneydbl = db.get("profil").filter({user: msgauthor, serveur: serveurauthor}).find('user').value();
        var profile = Object.values(usermoneydbl);

        if(usermoney[2] > 1000 && profile[5] == 0.1){
            db.get("profil").find({user: msgauthor, serveur: serveurauthor}).assign({serveur: serveurauthor, user: msgauthor, intelligence: profile[2], force: profile[3], popularite: profile[4], larbin: profile[5] += 1}).write();
            db.get("money").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, money: usermoney[2] -= 1000}).write();
            message.channel.send("Vous avez acheté **1** un larbin, mais vous avez perdu **10**µ !")
        }else if(usermoney[2] > 1500 && profile[5] == 1.1){
            db.get("profil").find({user: msgauthor, serveur: serveurauthor}).assign({serveur: serveurauthor, user: msgauthor, intelligence: profile[2], force: profile[3], popularite: profile[4], larbin: profile[5] += 1}).write();
            db.get("money").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, money: usermoney[2] -= 1500}).write();
            message.channel.send("Vous avez acheté **1** un larbin, mais vous avez perdu **15**µ !")
        }else if(usermoney[2] > 2000 && profile[5] == 2.1){
            db.get("profil").find({user: msgauthor, serveur: serveurauthor}).assign({serveur: serveurauthor, user: msgauthor, intelligence: profile[2], force: profile[3], popularite: profile[4], larbin: profile[5] += 1}).write();
            db.get("money").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, money: usermoney[2] -= 2000}).write();
            message.channel.send("Vous avez acheté **1** un larbin, mais vous avez perdu **20**µ !")
        }else if(usermoney[2] > 2500 && profile[5] == 3.1){
            db.get("profil").find({user: msgauthor, serveur: serveurauthor}).assign({serveur: serveurauthor, user: msgauthor, intelligence: profile[2], force: profile[3], popularite: profile[4], larbin: profile[5] += 1}).write();
            db.get("money").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, money: usermoney[2] -= 2500}).write();
            message.channel.send("Vous avez acheté **1** un larbin, mais vous avez perdu **25**µ !")
        }else if(usermoney[2] > 3000 && profile[5] == 4.1){
            db.get("profil").find({user: msgauthor, serveur: serveurauthor}).assign({serveur: serveurauthor, user: msgauthor, intelligence: profile[2], force: profile[3], popularite: profile[4], larbin: profile[5] += 1}).write();
            db.get("money").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, money: usermoney[2] -= 3000}).write();
            message.channel.send("Vous avez acheté **1** un larbin, mais vous avez perdu **30**µ !")
        }else if(usermoney[2] > 3500 && profile[5] == 5.1){
            db.get("profil").find({user: msgauthor, serveur: serveurauthor}).assign({serveur: serveurauthor, user: msgauthor, intelligence: profile[2], force: profile[3], popularite: profile[4], larbin: profile[5] += 1}).write();
            db.get("money").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, money: usermoney[2] -= 3500}).write();
            message.channel.send("Vous avez acheté **1** un larbin, mais vous avez perdu **35**µ !")
        }else if(usermoney[2] > 4000 && profile[5] == 6.1){
            db.get("profil").find({user: msgauthor, serveur: serveurauthor}).assign({serveur: serveurauthor, user: msgauthor, intelligence: profile[2], force: profile[3], popularite: profile[4], larbin: profile[5] += 1}).write();
            db.get("money").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, money: usermoney[2] -= 4000}).write();
            message.channel.send("Vous avez acheté **1** un larbin, mais vous avez perdu **40**µ !")
        }else if(usermoney[2] > 4500 && profile[5] == 7.1){
            db.get("profil").find({user: msgauthor, serveur: serveurauthor}).assign({serveur: serveurauthor, user: msgauthor, intelligence: profile[2], force: profile[3], popularite: profile[4], larbin: profile[5] += 1}).write();
            db.get("money").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, money: usermoney[2] -= 4500}).write();
            message.channel.send("Vous avez acheté **1** un larbin, mais vous avez perdu **45**µ !")
        }else if(usermoney[2] > 5000 && profile[5] == 8.1){
            db.get("profil").find({user: msgauthor, serveur: serveurauthor}).assign({serveur: serveurauthor, user: msgauthor, intelligence: profile[2], force: profile[3], popularite: profile[4], larbin: profile[5] += 1}).write();
            db.get("money").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, money: usermoney[2] -= 5000}).write();
            message.channel.send("Vous avez acheté **1** un larbin, mais vous avez perdu **50**µ !")
        }else if(usermoney[2] > 5500 && profile[5] == 9.1){
            db.get("profil").find({user: msgauthor, serveur: serveurauthor}).assign({serveur: serveurauthor, user: msgauthor, intelligence: profile[2], force: profile[3], popularite: profile[4], larbin: profile[5] += 1}).write();
            db.get("money").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, money: usermoney[2] -= 5500}).write();
            message.channel.send("Vous avez acheté **1** un larbin, mais vous avez perdu **55**µ !")
        }else{
            return message.channel.send("Vous n'avez pas assez d'argent !")
        }

        break;
    }

    if(message.content.startsWith(prefix + "8ball")){
        let texte = message.content.split(prefix + "8ball")[1];
        if(!texte) return message.channel.send("Le but c'est de poser une question ... :8ball:");

        var réponse = ["Évidemment, ça se demande même pas !","Oui !","Non !","Trop bien !","Trop nul !","Pourquoi pas ?","Tu es sûr ?","Mais t'es qui toi ?", "Peut-être ?", "Je sais pas ?"];

        var ball_embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription("Voici ma commande 8ball :")
        .addField( "Question :", texte )
        .addField( "Réponse :", réponse[Math.round(Math.random() * réponse.length)])
        .setFooter("8ball - By Gamecellant")
        message.channel.sendEmbed(ball_embed)
    }

    if(message.content.startsWith(prefix + "retest")) {
        t1[message.author.id] ? coolDown() : action() || (t1[message.author.id] = Date.now())
        function coolDown() {
            if(Date.now() - t1[message.author.id] > cooldown) {
                action()
                t1[message.author.id] = Date.now()
            }
            else {
                message.channel.send(`Attendez au moins ${cooldown/1000} secondes entre chaque commande !`)
            }
        }
        function action() {
            t1[message.author.id] = Date.now()
            message.channel.send("La commande a bien été exécutée !")
        }
    
    }

    if(message.content === prefix + "t"){
        Trésor()
        chrono()

        var usermoneydb = db.get("money").filter({user: msgauthor, serveur: serveurauthor}).find('money').value();
        var usermoney = Object.values(usermoneydb);

        function Lol() {
            if(t2) { //on vérifie que t1 existe déjà
                if(Date.now() - t2 > cooldown2) { //si la différence entre maintenant et t1 est supérieur au cooldown, alors le cooldown est passé
                    if(usermoney[2] > 200){
                        db.get("money").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, money: usermoney[2] - 200 + randum}).write();
                        message.channel.send("Vous avez gagné **" + randum / 100 + "**µ !")
                    }else{
                        message.channel.send("Vous n'avez pas assez d'argent, il faut **5**µ !")
                    } //on entreprend l'action que tu veux
                    t2 = Date.now() //on définit t1 pour pouvoir calculer le prochain cooldown
                }
                else {
                    message.channel.send(`encore ${(cooldown2 - (Date.now() - t2))/1000} secondes avant la fin du cooldown`) 
                }
            }
            else { //si t1 est null, la commande n'a pas encore été utilisée
                if(usermoney[2] > 200){
                    db.get("money").find({serveur: serveurauthor, user: msgauthor}).assign({serveur: serveurauthor, user: msgauthor, money: usermoney[2] - 200 + randum}).write();
                    message.channel.send("Vous avez gagné **" + randum / 100 + "**µ !")
                }else{
                    message.channel.send("Vous n'avez pas assez d'argent, il faut **5**µ !")
                } //on entreprend l'action que tu veux
                t2 = Date.now() //on définit t1 pour pouvoir calculer le prochain cooldown
            }
        }
    }
});

client.on("messageReactionAdd", (message, user) => {
    if(message.message.author.bot){
        switch (message._emoji.name) {
            case"👺":
            console.log("gobelin")
            break;

            case"🐵":
            console.log("singe")
            break;

            case"🐢":
            console.log("tortue")
            break;
        }
    }
});

function random(min, max) {
    min = Math.ceil(0);
    max = Math.floor(15)
    randum = Math.floor(Math.random() * (max - min +1) + min);
}

function PapierCiseauCaillou(min, max) {
    min = Math.ceil(0);
    max = Math.floor(3)
    randum = Math.floor(Math.random() * (max - min +1) + min);
}

function Trésor(min, max) {
    min = Math.ceil(100);
    max = Math.floor(300)
    randum = Math.floor(Math.random() * (max - min +1) + min);
}

function chrono() {
    const tempsMs = Date.now() - t2
    return [Math.round(tempsMs % 60000/1000), Math.floor(tempsMs % 3600000/60000), Math.floor(tempsMs/3600000)].map(x => (x < 10 ? "0" : "") + x)
}

client.login(process.env.lol);
