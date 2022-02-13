import { wsReducer, initialState } from './websocket'
import * as types from '../constants/websocket'


describe('Websocket reducer', () => {
  it('should return the initial state', () => {
    expect(
      wsReducer(undefined,{})
    ).toEqual(initialState)
  })

  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(
      wsReducer(
        {
          ...initialState,
          wsConnected: false
        },
        {
          type: types.WS_CONNECTION_SUCCESS
        }
      )
    ).toEqual({
      ...initialState,
      wsConnected: true
    })
  })

  it('should handle WS_CONNECTION_ERROR', () => {
    expect(
      wsReducer(
        {
          ...initialState,
          error: undefined,
          wsConnected: false
        },
        {
          type: types.WS_CONNECTION_ERROR,
          payload: {error: "error"}
        }
      )
    ).toEqual({
      ...initialState,
      error: {error: "error"},
      wsConnected: false
    })
  })

  it('should handle WS_CONNECTION_CLOSED', () => {
    expect(
      wsReducer(
        {
          ...initialState,
          wsConnected: true
        },
        {
          type: types.WS_CONNECTION_CLOSED
        }
      )
    ).toEqual({
      ...initialState,
      wsConnected: false
    })
  })

  it('should handle WS_GET_MESSAGE', () => {
    expect(
      wsReducer(
        {
          ...initialState,
          error: undefined,
          messages: [],
          wsConnected: true
        },
        {
          type: types.WS_GET_MESSAGE,
          payload: {message: "message"}
        }
      )
    ).toEqual({
      ...initialState,
      error: undefined,
      messages: [{message: "message"}],
      wsConnected: true
    })
  })

})