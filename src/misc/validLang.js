const languages = require(`${__dirname}/languageMap.json`);

let languageMap = Object.keys(languages)
	.filter(key => languages[key].codemirrorMode && languages[key].extensions)
	.reduce((prev, key) => {
		let data = languages[key];
		data.extensions.forEach(ext => prev.exts[ext.substring(1)] = data.codemirrorMode);
		if(!prev.modes[data.codemirrorMode]) prev.modes[data.codemirrorMode] = data.extensions[0].substring(1);
		return prev;
	}, { modes: {}, exts: {} });

module.exports = lang => {
	let extension;
	if(languageMap.ext[lang]) {
		extension = lang;
		lang = languageMap.ext[lang];
	} else if(languageMap.modes[lang]) {
		extension = languageMap.modes[lang];
	} else {
		return false;
	}

	return { codemirror: lang, extension };
};
