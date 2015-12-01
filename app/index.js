'use strict';
var normalizeUrl = require('normalize-url');
var humanizeUrl = require('humanize-url');
var yeoman = require('yeoman-generator');
var _s = require('underscore.string');

module.exports = yeoman.generators.Base.extend({
	init: function () {
		var cb = this.async();

		this.prompt([{
			name: 'appName',
			message: 'What do you want to name your app?',
			default: this.appname.replace(/\s/g, '-'),
			filter: function (val) {
				return _s.slugify(val);
			}
		}], function (props) {
			var tpl = {
				appName: props.appName,
				classifiedAppName: _s.classify(props.appName),
				githubUsername: 'soixantecircuits',
				name: this.user.git.name(),
				email: this.user.git.email(),
				website: 'http://soixantecircuits.fr',
				humanizedWebsite: humanizeUrl('http://soixantecircuits.fr')
			};

			var mv = function (from, to) {
				this.fs.move(this.destinationPath(from), this.destinationPath(to));
			}.bind(this);

			this.fs.copyTpl(this.templatePath() + '/**', this.destinationPath(), tpl);
			mv('editorconfig', '.editorconfig');
			mv('gitattributes', '.gitattributes');
			mv('gitignore', '.gitignore');
			mv('_package.json', 'package.json');

			cb();
		}.bind(this));
	},
	install: function () {
		this.installDependencies({bower: false});
	}
});
