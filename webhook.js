const discord = require('discord.js');

module.exports = class Webhook {
	constructor(url) {
		this.setup(url);
	}
	
	/**
	  * @params Hello
	*/

	setup(url) {
		this.url = url;

		this.id = url.substring(33, 51);
		this.token = url.slice(52);

		this.webhook = new discord.WebhookClient(this.id, this.token);
	}

	setUsername(name) {
		if (typeof name !== 'string') throw new Error('Cannot read property of ' + name);
		
		this.username = name;
		return this;
	}

	setIcon(icon) {
		if (typeof icon !== 'string') throw new TypeError('Cannot read property of ' + icon);
		if (!icon.endsWith('.png') && !icon.endsWith('.jpg')) throw new TypeError('Cannot read property of ' + icon);

		this.icon = icon;
		return this;
	}

	async send(text, options = {}) {
		let embed = {
			embed: options
		};
		try {
			if (typeof text === 'object') {
				embed = {
					embed: text
				};
				let json = embed.embed;
				await this.webhook
					.send({
						embeds: [json],
						username: this.username ? this.username : this.name,
						avatarURL: this.icon ? this.icon : null
					})
					.catch(err => {
						throw new Error(err.message);
					});
			} else if (typeof text === 'string') {
				let json = embed.embed;
				await this.webhook.send(text, {
					embeds: [json],
					username: this.username ? this.username : this.name,
					avatarURL: this.icon ? this.icon : null
				});
			}
		} catch (error) {
			console.log(error);
			throw new Error(
				error.message + ' : ' + error.fileName + ' > ' + error.lineNumber
			);
		}
	}
};
