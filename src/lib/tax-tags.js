import immutable from 'immutable'

export const taxTree = immutable.fromJS([
  {
    tag: 'expense',
    children: [
      {
        tag: 'non-deductable',
        children: [
          {
            tag: 'fine'
          },
          {
            tag: 'deductable related to rental income'
          }
        ]
      },
      {
        tag: 'deductable'
      },
      {
        tag: 'capital allowance'
      }
    ]
  }
])

const yieldNodes = function*(nodes) {
  for(const node of nodes) {
    yield node
    const children = node.get('children')
    if(children) {
      yield* yieldNodes(children)
    }
  }
}

const fullIndexNode = (index, node) => {
  const tag = node.get('tag')
  for(let i=1; i<tag.length; i++) {
    const substring = tag.slice(0, i)
    const entry = index.get(substring)
    if(!entry) {
      index.set(substring, immutable.List([node]))
    } else {
      index.set(substring, entry.push(node))
    }
  }
}

const fullIndexNodes = (index, nodes) => {
  for(const node of nodes) {
    const children = node.get('children')
    fullIndexNode(index, node)
    if(children) fullIndexNodes(index, children)
  }
  return index
}

const indexNodes = (index, nodes) => {
  for(const node of nodes) {
    const children = node.get('children')
    index.set(node.get('tag'), node)
    if(children) indexNodes(index, children)
  }
  return index
}

export const allNodes = immutable.List([...yieldNodes(taxTree)])
export const tagIndex = immutable.Map(indexNodes(new Map(), taxTree))
export const autocompleteIndex = immutable.Map(fullIndexNodes(new Map(), taxTree))
