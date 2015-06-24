'use strict';
var packageJson = require('./package.json');
var banner = '/**\n' +
  '* ' + packageJson.name + ' v' + packageJson.version + '\n' +
  '* Homepage : ' + packageJson.homepage + '\n' +
  '* Author : ' + packageJson.author + '\n' +
  '* Copyright 2015\n' +
  '* Licensed under ' + packageJson.license + '\n' +
  '*/\n';

var concat = require('broccoli-concat');
var funnel = require('broccoli-funnel');
var compileLess = require('broccoli-less-single');
var mergeTrees = require('broccoli-merge-trees');
var uglifyJavaScript = require('broccoli-uglify-js');

var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefixPlugin = new LessPluginAutoPrefix({
  browsers: ['last 2 versions', 'ie 10']
});

var bowerFiles = funnel('bower_components');
var publicFolder = funnel('public');
var projectFiles = funnel('app');
var scriptFiles = funnel(projectFiles, {
  srcDir: 'scripts'
});
var lessFiles = funnel(projectFiles, {
  srcDir: 'styles'
});
var less = compileLess(lessFiles, 'app.less', 'app.css', {
  plugins: [autoprefixPlugin]
});
var concatenatedLess = concat(less, {
  inputFiles: [
    'app.css'
  ],
  outputFile: '/' + packageJson.name + '.css',
  header: banner
});

var lessMin = compileLess(lessFiles, 'app.less', 'app.min.css', {
  compress: true,
  plugins: [autoprefixPlugin]
});
var concatenatedLessMin = concat(lessMin, {
  inputFiles: [
    'app.min.css'
  ],
  outputFile: '/' + packageJson.name + '.min.css',
  header: banner
});

var theme = compileLess(lessFiles, 'theme.less', 'theme.css', {
  plugins: [autoprefixPlugin]
});
var themeConcatenatedLess = concat(theme, {
  inputFiles: [
    'theme.css'
  ],
  outputFile: '/' + packageJson.name + '-theme.css',
  header: banner
});

var themeLessMin = compileLess(lessFiles, 'theme.less', 'theme.min.css', {
  compress: true,
  plugins: [autoprefixPlugin]
});
var themeConcatenatedLessMin = concat(themeLessMin, {
  inputFiles: [
    'theme.min.css'
  ],
  outputFile: '/' + packageJson.name + '-theme.min.css',
  header: banner
});

var concatenatedScripts = concat(scriptFiles, {
  inputFiles: [
    'app.js'
  ],
  outputFile: '/' + packageJson.name + '.js',
  header: banner
});
var concatenatedScriptsMin = concat(scriptFiles, {
  inputFiles: [
    'app.js'
  ],
  outputFile: '/' + packageJson.name + '.min.js',
  header: banner
});

var uglifyScripts = uglifyJavaScript(concatenatedScriptsMin, {
  compress: true,
  mangle: true
});

var uglifyScriptsBanner = concat(uglifyScripts, {
  inputFiles: [
    packageJson.name + '.min.js'
  ],
  outputFile: '/' + packageJson.name + '.min.js',
  header: banner
});

module.exports = mergeTrees([
  bowerFiles,
  publicFolder,
  concatenatedLess,
  concatenatedLessMin,
  themeConcatenatedLess,
  themeConcatenatedLessMin,
  concatenatedScripts,
  uglifyScriptsBanner
]);
