const ayarlar = {
    token: "Müthiş Gizli Bot Tokeni",
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


const sayfalar = [//Sayfaların içeriklerini burdan ekleyebilir veya düzenleyebilirsiniz.
    "Sayfa içeriği \n\n> **Gosmac**",
    ":cat: Kedileri Severim \n\n> **Gosmac**",
    ":watermelon: Karpuz Güzeldir! \n\n> **Gosmac**"
]


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
        .setFooter(`Sayfa 1 / ${sayfalar.length}`)
		message.channel.send({embed, buttons:[sol, sağ]});
	}

});

client.on('clickButton', async button => {

if (button.id === "sağ") {
    let sayfa = button.message.embeds[0].footer.text.split(" ")//Embed üzerinden sayfa değerini alıyoruz.
    sayfa[1]++
    if (sayfa[1] == sayfalar.length+1) {
        sayfa[1] = 1
    }
    button.message.embeds[0].footer.text = `Sayfa ${sayfa[1]} / ${sayfalar.length}`//Embedin footerini yeniliyoruz.
    button.message.embeds[0].description = sayfalar[sayfa[1]-1]//Embedin description kısmını yeniliyoruz.
    button.message.edit({embed: button.message.embeds[0]})//Son olarak embedi editliyoruz.
    await button.reply.defer();
}


if (button.id === "sol") {
    let sayfa = button.message.embeds[0].footer.text.split(" ")
    sayfa[1]-- //Yukarıdaki "sağ" butondan tek farkı sayfa parametresini azaltıyoruz.
    if (sayfa[1] == 0) {
        sayfa[1] = sayfalar.length
    }
    button.message.embeds[0].footer.text = `Sayfa ${sayfa[1]} / ${sayfalar.length}`
    button.message.embeds[0].description = sayfalar[sayfa[1]-1]
    button.message.edit({embed: button.message.embeds[0]})
    await button.reply.defer();
}

})
