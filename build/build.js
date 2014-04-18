#! /usr/bin/env node

var fs = require("fs");
var UglifyJS = require("uglify-js");

var topFile = 'jquip.intro.js';
var mainFile = 'jquip.js';
var bottomFile = 'jquip.outro.js';

String.prototype.startsWith = function (str){
	return this.indexOf(str) === 0;
};

var srcDir = '../src', targetDir = '../dist', allJsMap = {}, allMinJsMap = {};
var files = fs.readdirSync(srcDir);
files.forEach(function(file) { 
	if (file.charAt(0) == ".") return;
	var srcPath = srcDir + '/' + file, 
		targetPath = targetDir + '/' + file.replace('.js', '.min.js');
	var js = fs.readFileSync(srcPath).toString('utf-8');

	var minJs;
	if(file != topFile && file != bottomFile) {
		minJs = UglifyJS.minify(js, {fromString: true}).code;
	}

	console.log("writing " + file);
	if (file.startsWith("jquip") && !file.startsWith("jquip.q-"))
	{
		allJsMap[file] = js;	
		if(file != topFile && file != bottomFile) {
			allMinJsMap[file] = minJs;
		}
	}
	if(file != topFile && file != bottomFile) {
		fs.writeFileSync(targetPath, minJs);
	}
});

//write /dist/jquip.all.js
var allJs = allJsMap[topFile];
allJs += allJsMap[mainFile] + ";";
for (var file in allJsMap) {
	if (file == topFile || file == mainFile || file == bottomFile) continue;
	allJs += allJsMap[file] + ";";
}
allJs += allJsMap[bottomFile] + ";";
fs.writeFileSync(targetDir + '/jquip.all.js', allJs);

//write /dist/jquip.all.min.js
var allJs = fs.readFileSync(targetDir + '/jquip.all.js').toString('utf-8');
var allMinJs = UglifyJS.minify(allJs, {fromString: true}).code;
fs.writeFileSync(targetDir + '/jquip.all.min.js', allMinJs);
