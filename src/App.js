
import React, { useState } from 'react'
import './App.css'
import useUpdateUser from './useUpdateUser'

const App = (props) => {
  /*
   * Setting the initial state and update function
   */
  const {
    updating,
    updated,
    updateError,
    timedOut,
    updateUser,
  } = useUpdateUser({
    timeout: 12000,
  })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const onSubmit = (e) => {
    e.preventDefault()
    const params = { email, password }
    updateUser(user, params).then(function(value) {
    //updateUser('my-user-id123', params).then(function(value) {
      console.log(value);
      // expected output: 123
    });

  }
  const isInitial = !updating && !updated && !updateError && !timedOut
  const errMsg =
    updateError &&
    (updateError.message || 'An error occurred. Please try again later')
  return (
    <div className='container'>
      <h2>
        {isInitial && 'Update your email or password below'}
        {updating && 'Updating your profile...'}
        {updated && `${user}: Your profile has been updated`}
        {errMsg && <span className='error-txt'>{errMsg}</span>}
        {timedOut &&
          'We did not receive a response from the server. Please try again later'}
      </h2>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type='text'
            placeholder='User Id'
            name='user'
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}
export default App