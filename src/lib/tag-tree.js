import React from 'react'
import { renderSignal } from 'quiver-view'

// renderTagTree :: TagNode -> Vdom
const renderTagTree = (node) => {
  const tag = node.get('tag')
  const children = node.get('children')

  if(!children) {
    return (
      <div className='leaf-tag'>
        { tag }
      </div>
    )
  } else {
    const childrenVdoms = [...children.map(renderTagTree)]
    return (
      <div className='tag-tree'>
        <div className='main-tag'>
          { tag }
        </div>
        <div className='children-tags'>
          { childrenVdoms }
        </div>
      </div>
    )
  }
}

// renderSelectedNode :: Signal Node -> Signal Pair Vdom a
export const renderSelectedNode = selectedNodeSignal =>
  renderSignal(selectedNodeSignal, node => {
    if(!node) {
      return (
        <div className='no-node-selected'>
          Click a tag to view its tree
        </div>
      )
    } else {
      return renderTagTree(node)
    }
  })
