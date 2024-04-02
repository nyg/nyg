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
   const render = gist => new Handlebars.SafeString(`[**\`${gist.files[0].name}\`**](${gist.url}) — *${gist.description}*`)
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
