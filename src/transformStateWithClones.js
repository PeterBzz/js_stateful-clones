'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArray = [];
  const currentState = { ...state };

  for (const actionsKey in actions) {
    const { type, extraData, keysToRemove } = actions[actionsKey];

    switch (type) {
      case 'addProperties':
        Object.assign(currentState, extraData);
        stateArray.push({ ...currentState });
        break;
      case 'removeProperties':
        for (const keysToRemoveKey in keysToRemove) {
          delete currentState[keysToRemove[keysToRemoveKey]];
        }
        stateArray.push({ ...currentState });
        break;
      case 'clear':
        for (const stateKeys in currentState) {
          delete currentState[stateKeys];
        }
        stateArray.push({ ...currentState });
        break;
    }
  }

  return stateArray;
}

module.exports = transformStateWithClones;
