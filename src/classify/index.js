const langData = {}, trains = {};
const fs = Promise.promisifyAll(require("fs"));

async function init() {
	let files = await fs.readdirAsync(`${__dirname}/files`);
	for(let fileName of files) {
		let content = await fs.readFileAsync(`${__dirname}/files/${fileName}`);
		train(fileName, content);
	}
}
init();

function getWords(code) {
	return code.split(/^a-z/i).filter(word => word);
}

function train(lang, code) {
	let trainCount = code.length / 750;

	if(!langData[lang]) langData[lang] = {};
	if(!trains[lang]) trains[lang] = trainCount;
	else trains[lang] += trainCount;

	getWords(code).forEach(word => {
		if(!langData[lang][word]) langData[lang][word] = 1;
		else langData[lang][word]++;
	});
}

function classify(code) {
	let totals = {};
	Object.keys(langData).forEach(lang => {
		totals[lang] = Math.log(trains[lang]) +
			getWords(code).map(word => Math.log(langData[lang][word])).reduce((a, b) => a + b, 0);
	});

	return Object.keys(totals).reduce((a, b) => totals[a] > totals[b] ? a : b);
}

module.exports = { train, classify };
