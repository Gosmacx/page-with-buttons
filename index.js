const ayarlar = {
    token: "",
    prefix: "!"
}
const Discord = require("discord.js")
const client = new Discord.Client
const btn = require('discord-buttons');
btn(client)
client.login(ayarlar.token)


client.on('ready', () => {
   console.log("Hazırım")
})


client.on('message', message => {
	if (!message.content.startsWith(ayarlar.prefix) || message.author.bot) return; // Mesaj içeriği öne ek ile başlamazsa geri dön.

	const args = message.content.slice(ayarlar.prefix.length).trim().split(/ +/);// Parametler.
	const command = args.shift().toLowerCase();// Komut

	if (command === 'sayfa') {

        let sağ = new btn.MessageButton()
        .setID("sağ")
        .setLabel(">>")
        .setStyle("blurple");
        let sol = new btn.MessageButton()
        .setID("sol")
        .setLabel("<<")
        .setStyle("blurple");

        let embed = new Discord.MessageEmbed()
        .setTitle("Sayfalı Embed")
        .setDescription("Sayfa içeriği \n\n> **Gosmac**")
        .setFooter("Sayfa 1 / 3")
		message.channel.send({embed, buttons:[sol, sağ]});
	}
});

client.on('clickButton', async button => {

    let sağ = new btn.MessageButton()
    .setID("sağ")
    .setLabel(">>")
    .setStyle("blurple");
    let sol = new btn.MessageButton()
    .setID("sol")
    .setLabel("<<")
    .setStyle("blurple");

if (button.id === "sağ") {

    let sayfa = button.message.embeds[0].footer.text.split(" ")
    sayfa[1]++
    if (sayfa[1] == 4) {
        sayfa[1] = 1
    }
    button.message.embeds[0].footer.text = `Sayfa ${sayfa[1]} / 3`

    if (sayfa[1] == 1) {
        button.message.embeds[0].description = "Sayfa içeriği \n\n> **Gosmac**"
    }else if (sayfa[1] == 2) {
        button.message.embeds[0].description = ":cat: Kedileri Severim \n\n> **Gosmac**"
    } else if (sayfa[1] == 3) {
        button.message.embeds[0].description = ":watermelon: Karpuz Güzeldir! \n\n> **Gosmac**"
    }

    button.message.edit({embed: button.message.embeds[0], buttons:[sol, sağ]})
    button.defer();
}

if (button.id === "sol") {

    let sayfa = button.message.embeds[0].footer.text.split(" ")
    sayfa[1]--
    if (sayfa[1] == 0) {
        sayfa[1] = 3
    }

    button.message.embeds[0].footer.text = `Sayfa ${sayfa[1]} / 3`
    
    if (sayfa[1] == 1) {
        button.message.embeds[0].description = "Sayfa içeriği \n\n> **Gosmac**"
    }else if (sayfa[1] == 2) {
        button.message.embeds[0].description = ":cat: Kedileri Severim \n\n> **Gosmac**"
    } else if (sayfa[1] == 3) {
        button.message.embeds[0].description = ":watermelon: Karpuz Güzeldir! \n\n> **Gosmac**"
    }

    button.message.edit({embed: button.message.embeds[0], buttons:[sol, sağ]})
    button.defer();
}

})
