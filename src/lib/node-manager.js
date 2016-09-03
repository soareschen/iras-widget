import immutable from 'immutable'
import { valueSignal } from 'quiver-signal'
import { listen } from 'quiver-signal/method'

import { allNodes } from './tax-tags'

// manageAddedNodes :: EventSignal Node -> Signal List Node
export const manageAddedNodes = (addNodeEventSignal) => {
  let enteredNodes = immutable.List([allNodes.get(0)])
  const [nodeListSignal, nodeListSetter] = valueSignal(enteredNodes)

  addNodeEventSignal::listen(node => {
    enteredNodes = enteredNodes.push(node)
    nodeListSetter.setValue(enteredNodes)
  })

  return nodeListSignal
}
