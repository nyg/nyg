import { readFile, writeFile } from 'node:fs/promises'

import Handlebars from 'handlebars'

import { gists, pullRequests, repositories } from './graphql/data.js'
import { arrayHelper,filterOutHelper, gistHelper, githubRepositoryHelper, listBlockHelper } from './template/handlebars.js'


Handlebars.registerHelper('list', listBlockHelper)
Handlebars.registerHelper('array', arrayHelper)
Handlebars.registerHelper('filterout', filterOutHelper)
Handlebars.registerHelper('gist', gistHelper)
Handlebars.registerHelper('repo', githubRepositoryHelper)

const template = await readFile('README.template.md', 'utf8')
const renderedReadme = Handlebars.compile(template)({ gists, repositories, pullRequests })

await writeFile('README.md', renderedReadme, 'utf8')
