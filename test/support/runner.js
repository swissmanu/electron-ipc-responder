const Jasmine = require('jasmine')
const SpecReporter = require('jasmine-spec-reporter')

const jasmine = new Jasmine()

jasmine.addReporter(new SpecReporter())
jasmine.loadConfig({
  spec_dir: 'test/',
  'spec_files': [
    '*.js',
    '**/*.js'
  ],
  'stopSpecOnExpectationFailure': false,
  'random': false
})

jasmine.execute()
