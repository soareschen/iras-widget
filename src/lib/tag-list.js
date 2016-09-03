import React from 'react'

import { renderSignal } from 'quiver-view'
import { valueSignal } from 'quiver-signal'

// renderTagList :: Signal List Node -> (Signal Pair Vdom a, EventSignal Node)
export const renderTagList = nodeListSignal => {
  const [selectedNodeSignal, nodeSetter] = valueSignal()

  const spva = renderSignal(nodeListSignal, nodeList => {
    const tagList = nodeList.map(node => {
      return [
        <span className='tag'
          onClick={() => nodeSetter.setValue(node)}
        >
          { node.get('tag') }
        </span>,
        <span className='tag-separator'>
          &nbsp;
        </span>
      ]
    })

    return (
      <div className='tags'>
        { tagList }
      </div>
    )
  })

  return [spva, selectedNodeSignal]
}
