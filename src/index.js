import { gistHelper, githubRepositoryHelper, listBlockHelper, sourceHutHelper } from './template/handlebars.js'
import { gists, repositories } from './graphql/data.js'
import { readFile, writeFile } from 'node:fs/promises'
import Handlebars from 'handlebars'


Handlebars.registerHelper('list', listBlockHelper)
Handlebars.registerHelper('gist', gistHelper)
Handlebars.registerHelper('repo', githubRepositoryHelper)
Handlebars.registerHelper('srht', sourceHutHelper)

const template = await readFile('README.template.md', 'utf8')
const renderedReadme = Handlebars.compile(template)({ gists, repositories })

await writeFile('README.md', renderedReadme, 'utf8')
