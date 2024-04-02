import Handlebars from 'handlebars'


const compare = (items) => {
   const [a, b] = items
   if (!b) {
      return a
   } else if (Number.isFinite(a) && Number.isFinite(b)) {
      return a - b
   } else {
      return String(a).localeCompare(String(b))
   }
}

export const listBlockHelper = function (context, options) {
   const { sortBy: field, direction = 'asc', top: length } = options.hash
   const items = (a, b) => !field ? [a] : (direction == 'desc' ? [b, a] : [a, b])
   const fieldOf = items => items.map(item => !field ? item : field.split('.').reduce((obj, prop) => obj[prop], item))
   return context
      .toSorted((a, b) => compare(fieldOf(items(a, b))))
      .slice(0, length)
      .map(item => options.fn(item))
      .join('')
}

export const gistHelper = function (context, options) {

   const render = gist => {
      const name = Handlebars.escapeExpression(gist.files[0].name)
      const desc = Handlebars.escapeExpression(gist.description)
      const stars = options.hash.showStars !== false && gist.stargazerCount > 0
         ? ` <sup>${gist.stargazerCount}☆</sup>`
         : ''
      return new Handlebars.SafeString(`[**\`${name}\`**](${gist.url})${stars} — *${desc}*`)
   }

   const gistWithFileName = options.data.root.gists.filter(gist => gist.files[0].name === context)[0]
   const gistWithName = options.data.root.gists.filter(gist => gist.name === context)[0]

   if (gistWithFileName) {
      return render(gistWithFileName)
   }
   else if (gistWithName) {
      return render(gistWithName)
   }
   else {
      return `Error: no gist found with information: ${context}`
   }
}

export const sourceHutHelper = function (options) {
   const name = Handlebars.escapeExpression(options.hash.name)
   const desc = Handlebars.escapeExpression(options.hash.description)
   const owner = Handlebars.escapeExpression(options.hash.owner)
   return new Handlebars.SafeString(`[**\`${name}\`**](https://git.sr.ht/~${owner}/${name}) — *${desc}*`)
}
