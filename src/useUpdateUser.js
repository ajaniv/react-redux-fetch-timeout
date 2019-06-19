import { useReducer, useRef } from 'react'
import axios from 'axios'
const initialState = {
  updating: false,
  updated: false,
  updateError: null,
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'updating':
      return { ...initialState, updating: true }
    case 'updated':
      return { ...initialState, updated: true }
    case 'set-error':
      return { ...initialState, updateError: action.error }
    case 'timed-out':
      return { ...initialState, timedOut: true }
    default:
      return state
  }
}
const useUpdateUser = ({ timeout = 30000 }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const timeoutRef = useRef(null)
  const updateUser = async (userId, params) => {
    try {
      dispatch({ type: 'updating' })
      if (!userId) {
        throw new Error('userId is undefined')
      } else if (!params) {
        throw new Error('params is undefined')
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        dispatch({ type: 'timed-out' })
      }, timeout)
      //const url = `https://someapi.com/v1/api/user/${userId}/`
      const url = 'https://jsonplaceholder.typicode.com/users/1'
      const response = await axios.put(url, params)
      clearTimeout(timeoutRef.current)
      const updatedUser = response.data
      dispatch({ type: 'updated' })
      return updatedUser
    } catch (error) {
      clearTimeout(timeoutRef.current)
      dispatch({ type: 'set-error', error })
    }
  }
  return {
    ...state,
    updateUser,
  }
}
export default useUpdateUser