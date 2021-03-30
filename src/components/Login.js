import {useState} from 'react'
import {Link} from 'react-router-dom'

function Login(props) {

  const [emailVal, setEmailVal] = useState('')
  const [passVal, setPassVal] = useState('')

  function handleInput(evt) {
    if(evt.target.type === 'email') {
      setEmailVal(evt.target.value)
    } else {
      setPassVal(evt.target.value)
    }
  }


  return (
    <div>
      <h3>Please Login with email and password</h3>
      <form onSubmit={(evt) => {
        evt.preventDefault();
        props.loginPass(emailVal, passVal)
      }}>
        <input type='email' value={emailVal} onChange={handleInput} />
        <input type='password' value={passVal} onChange={handleInput} />
        <input type='submit' />
      </form>
      <button onClick={props.googleLogin}>Login with Google</button>

      {props.user && <Link to='/dashboard' >Go to Dashboard</Link>}
    </div>
  )
}

export default Login