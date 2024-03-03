import { readFile, writeFile } from 'node:fs/promises'
import Handlebars from 'handlebars'
import { listBlockHelper } from './template/handlebars.js'
import { gists } from './graphql/data.js'


Handlebars.registerHelper('list', listBlockHelper)

const template = await readFile('README.template.md', 'utf8')
const renderedReadme = Handlebars.compile(template)({ gists })

await writeFile('README.md', renderedReadme, 'utf8')
