import React from 'react'
import immutable from 'immutable'
import { constantSignal } from 'quiver-signal'
import { renderSmCspvc } from 'quiver-view'

import { tagIndex, autocompleteIndex } from './tax-tags'
import { renderAddTagForm } from './add-tag'
import { manageAddedNodes } from './node-manager'
import { renderTagList } from './tag-list'
import { renderSelectedNode } from './tag-tree'

export const renderApp = () => {
  const [formSpva, addNodeEventSignal] = renderAddTagForm(tagIndex, autocompleteIndex)

  const nodeListSignal = manageAddedNodes(addNodeEventSignal)
  const [tagListSpva, selectedNodeSignal] = renderTagList(nodeListSignal)
  const tagTreeSpva = renderSelectedNode(selectedNodeSignal)

  const combinedSpva = immutable.Map({
    addTagForm: formSpva,
    tagList: tagListSpva,
    tagTree: tagTreeSpva
  })

  return renderSmCspvc(constantSignal(), combinedSpva,
    (_, mpva) => {
      const [addTagVdom] = mpva.get('addTagForm')
      const [tagListVdom] = mpva.get('tagList')
      const [tagTreeVdom] = mpva.get('tagTree')

      const appVdom =
        <div className='app'>
          { addTagVdom }
          { tagListVdom }
          { tagTreeVdom }
        </div>

      return appVdom
    })
}
