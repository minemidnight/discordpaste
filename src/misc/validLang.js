const languages = require(`${__dirname}/languageMap.json`);

let languageMap = Object.keys(languages)
	.filter(key => languages[key].codemirrorMode && languages[key].extensions)
	.reduce((prev, key) => {
		let data = languages[key];
		data.extensions.forEach(ext => prev[ext.substring(1)] = data.codemirrorMode);
		prev[data.codemirrorMode] = data.extensions[0].substirng(1);
		return prev;
	}, {});

module.exports = lang => {
	lang = languageMap[lang];
	if(!lang) return false;

	let extension = typeof lang === "string" ? lang : languageMap[lang];
	return { codemirror: lang, extension };
};
