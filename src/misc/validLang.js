const languages = require(`${__dirname}/languageMap.json`);

let languageMap = Object.keys(languages)
	.filter(key => languages[key].codemirrorMode && languages[key].extensions)
	.reduce((prev, key) => {
		let data = languages[key];
		data.extensions.forEach(ext => prev.exts[ext.substring(1)] = data.codemirrorMode);
		prev.modes[data.codemirrorMode] = data.extensions[0].substirng(1);
		return prev;
	}, { modes: {}, exts: {} });

module.exports = lang => {
	let mapValue = languageMap.exts[lang], extension;
	if(!mapValue) lang = extension = languageMap.modes[lang];
	else extension = languageMap.modes[mapValue];

	if(!lang) return false;
	return { codemirror: lang, extension };
};
