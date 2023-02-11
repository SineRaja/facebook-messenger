// import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
// import { FormControl, Input } from '@mui/material';
import './App.css';
// import Message from './Message';
// import db from './firebase';
// import firebase from 'firebase/compat/app';
// import FlipMove from 'react-flip-move';
// import SendIcon from '@mui/icons-material/Send';
// import { IconButton } from '@mui/material';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Register from './registerComponent/Register'
import VerifyEmail from './verifyComponent/VerifyEmail';
import Login from './loginComponent/Login'
import GroupChat from './groupChatComponent/GroupChat';
import {AuthProvider} from './AuthContext'
import {auth} from './firebase'
import {onAuthStateChanged} from 'firebase/auth'
import PrivateRoute from './PrivateRoute'
import {Navigate} from 'react-router-dom'


function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])

  return (
    <Router>
      <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
        <Routes>
          <Route exact path='/' element={
            <PrivateRoute>
              <GroupChat/>
            </PrivateRoute>
          }/>
          <Route path="/login" element={
            !currentUser?.emailVerified 
            ? <Login/>
            : <Navigate to='/' replace/>
          } />
          <Route path="/register" element={
            !currentUser?.emailVerified 
            ? <Register/>
            : <Navigate to='/' replace/>
          } />
          <Route path='/verify-email' element={<VerifyEmail/>} /> 
        </Routes>  
      </AuthProvider>
  </Router>
  );
}

// function App() {
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [username, setUsername] = useState('');

//   //useState = variable in react
//   //useEffect = run code on a condition in REACT

//   useEffect(() => {
//     // run once when the app component loads
//     db.collection('messages')
//       .orderBy('timestamp', 'desc')
//       .onSnapshot(snapshot => {
//         setMessages(snapshot.docs.map(doc => ({id:doc.id, message: doc.data()})))
//       })
//   }, [])

//   useEffect(() => {
//     //run code here...
//     //if its blank inside [], this code runs ONCE when the app component loads..
//     setUsername(prompt('Please enter your name'))

//   }, [])//condition..

//   const sendMessage = (event) => {
//     event.preventDefault();

//     db.collection('messages').add({
//       message: input,
//       username: username,
//       timestamp: firebase.firestore.FieldValue.serverTimestamp()
//     })

//     // all the logic to send a message goes from here
//     // setMessages([...messages, {username: username, message: input}]);
//     setInput('');
//   }

//   return (
//     <div className="App">
//         <img src={logo} className="App-logo" alt="logo" />
//         <h2>Welcome {username}</h2>
//         <form className='app_form'>
//           <FormControl className='app_formControl'>
//             <Input className='app_input' placeholder='Enter a message...' value={input} onChange={event => setInput(event.target.value)} />
            
//             <IconButton className='app_iconButton' color="primary" type='submit' onClick={sendMessage}>
//               <SendIcon />
//             </IconButton>
            
//             {/* <Button disabled={!input} variant="contained" type='submit' onClick={sendMessage} endIcon={<SendIcon />}>
//               Send
//             </Button> */}
//              {/* <Button disabled={!input} variant="contained" type='submit' onClick={sendMessage}>Send Message</Button> */}
//           </FormControl>
//         </form>


//         <FlipMove>
//           {
//             messages.map(({id, message})=> (
//               <Message key={id} username={username} message={message} />
//             ))
//           }
//         </FlipMove>

//     </div>
//   );
// }

export default App;
