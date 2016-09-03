import React from 'react'
import immutable from 'immutable'
import { valueSignal, eventSignal } from 'quiver-signal'
import { renderSignal } from 'quiver-view'

// renderAddTagForm :: (Map String Node) -> (Map String Node) -> (Signal Pair Vdom a)
export const renderAddTagForm = (tagIndex, autocompleteIndex) => {
  // autocompleteSignal :: Signal List String
  const [autocompleteSignal, autocompleteSetter] = valueSignal(immutable.List())

  // addTagEventSignal :: EventSignal TagNode
  const [addTagEventSignal, emitAddTag] = eventSignal()

  const onInputChange = ev => {
    const inputTag = ev.target.value
    const autocompleteList = autocompleteIndex.get(inputTag)

    if(autocompleteList) {
      autocompleteSetter.setValue(autocompleteList)
    } else {
      autocompleteSetter.setValue(immutable.List())
    }
  }

  const onFormSubmit = ev => {
    ev.preventDefault()
    const inputTag = ev.target.querySelector('#input-tag').value
    console.log('add tag event:', ev, inputTag)
    const node = tagIndex.get(inputTag)
    if(node) emitAddTag(node)
  }

  const formSpva = renderSignal(autocompleteSignal,
    autocompleteList => {
      const suggestions = autocompleteList.map(
        node => {
          return <option value={node.get('tag')} />
        })

      const vdom =
        <form className='addTag' onSubmit={onFormSubmit}>
          <label>Add a tag:</label>
          <input id='input-tag' list='autocomplete-tags' onChange={onInputChange} />
          <datalist id='autocomplete-tags'>
            { suggestions }
          </datalist>
          <button type='submit'>Add Tag</button>
        </form>

      return vdom
    })

  return [formSpva, addTagEventSignal]
}
