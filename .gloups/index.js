var fs   = require('fs'),
    path = require('path');
module.exports = function(opt, inquirer) {

    /**
     * We will create a new partial from a custom template in your ./gloups directory
     * @param  {Object} data Object from your prompt inquirer or custom object
     * @param  {object} opt  An Helper from gloups
     */
    var build = function(data, opt) {
        try {
            // Grab the content of your basic partial
            var content = fs.readFileSync(opt.dir + data.generator + path.sep + 'index.html', 'utf8');
            // Write this new partial to your dest folder
            fs.writeFileSync(opt.app + "src" + path.sep + "partials" + path.sep + data.name + '.html', content);
            opt.success('The view ' + data.name + ' is created');
        }catch(e) {
            opt.error(e);
        }
    }

    // Launch inquirer, a prompt to retreive some informations
    if(opt.args.length === 1) {
        inquirer.prompt([
          {
            type : "list",
            name : "generator",
            message : "Choose a generator :",
            choices : ["partial"]
          },
          {
            type : "input",
            name : "name",
            message : "Name of this generator :"
          },
        ], function(answers) {
            build(answers, opt);
        });
    }

    // Fast method to create a view gloups generator [generator]:[name] => gloups generator partial:test
    if(opt.args.length > 1 && opt.args[1].split(':').length === 2) {
        build({
            name : opt.args[1].split(':')[1],
            generator : opt.args[1].split(':')[0]
        },opt);
    }
}