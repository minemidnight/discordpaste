const langData = {}, trains = {};
const fs = Promise.promisifyAll(require("fs"));
const validLang = require(`${__dirname}/validLang.js`);

async function init() {
	let files = await fs.readdirAsync(`${__dirname}/files`);
	for(let file of files) {
		let content = await fs.readFileAsync(`${__dirname}/files/${file}`, "utf8");
		train(file, content);
	}
}
init();

function getWords(code) {
	return code.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, "").split(/[^a-zA-Z]/).filter(word => word);
}

function train(lang, code) {
	let trainCount = code.length / 1000;

	if(!langData[lang]) langData[lang] = {};
	if(!trains[lang]) trains[lang] = trainCount;
	else trains[lang] += trainCount;

	let tempData = {};
	getWords(code).forEach(word => {
		if(!tempData[word]) tempData[word] = 1;
		else tempData[word]++;
	});

	langData[lang] = Object.assign(langData[lang], tempData);
}

function classify(code) {
	let totals = {};
	Object.keys(langData).forEach(lang => {
		totals[lang] = Math.log(trains[lang]) +
			getWords(code).map(word => {
				if(langData[lang][word]) return Math.log(langData[lang][word]);
				else return 0;
			}).reduce((a, b) => a + b, 0);
	});

	return validLang(Object.keys(totals).reduce((a, b) => totals[a] > totals[b] ? a : b)).extension;
}

module.exports = { train, classify };
