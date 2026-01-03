import { arrayHelper,filterOutHelper, gistHelper, githubRepositoryHelper, listBlockHelper, sourceHutHelper } from './template/handlebars.js'
import { gists, pullRequests, repositories } from './graphql/data.js'
import { readFile, writeFile } from 'node:fs/promises'
import Handlebars from 'handlebars'


Handlebars.registerHelper('list', listBlockHelper)
Handlebars.registerHelper('array', arrayHelper)
Handlebars.registerHelper('filterout', filterOutHelper)
Handlebars.registerHelper('gist', gistHelper)
Handlebars.registerHelper('repo', githubRepositoryHelper)
Handlebars.registerHelper('srht', sourceHutHelper)

const template = await readFile('README.template.md', 'utf8')
const renderedReadme = Handlebars.compile(template)({ gists, repositories, pullRequests })

await writeFile('README.md', renderedReadme, 'utf8')
