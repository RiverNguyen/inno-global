interface TocItem {
  id: string
  text: string
  level: number
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export function buildTocFromHtml(initialHtml: string): { html: string; tocs: TocItem[] } {
  if (!initialHtml) {
    return { html: '', tocs: [] }
  }

  const parser = new DOMParser()
  const doc = parser.parseFromString(initialHtml, 'text/html')

  const tables = Array.from(doc.querySelectorAll('table'))

  tables.forEach((table) => {
    if (table.parentElement?.classList.contains('table-wrapper')) return

    const wrapper = doc.createElement('div')
    wrapper.className = 'table-wrapper'

    table.parentNode?.insertBefore(wrapper, table)
    wrapper.appendChild(table)
  })

  const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'))
  const usedIds = new Set<string>()

  headings.forEach((heading) => {
    if (heading.id) {
      usedIds.add(heading.id)
      return
    }

    const text = heading.textContent?.trim()
    if (!text) return

    const baseId = slugify(text)
    let id = baseId
    let i = 1

    while (usedIds.has(id)) {
      id = `${baseId}-${i++}`
    }

    heading.id = id
    usedIds.add(id)
  })

  const mappedTocs: TocItem[] = headings.map((heading) => ({
    id: heading.id,
    text: heading.textContent?.trim() || '',
    level: Number(heading.tagName.replace('H', '')),
  }))

  return {
    html: doc.body.innerHTML,
    tocs: mappedTocs,
  }
}

