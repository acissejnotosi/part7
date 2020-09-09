import notificationReducer from './notificationReducer'
import deepFreeze from 'deep-freeze'

describe('notificationReducer', () => {
  test('returns new state with action SHOW', () => {
    console.log("entrou");
    const state = []
    const action = {
      type: 'SHOW',
      data: {message: 'the app state is in redux store'}
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)
    console.log(newState);
    expect(newState).toHaveLength(31)
    expect(newState).toEqual(action.data.message);
  })
})