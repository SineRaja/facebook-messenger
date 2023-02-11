import '../registerComponent/profile.css'
import Message from '../messageComponent/Message';
import logo from '../images/logo.jpg';
import React, { useEffect, useState } from 'react';
import { Button, FormControl, Input } from '@mui/material';
import db from '../firebase';
import firebase from 'firebase/compat/app';
import FlipMove from 'react-flip-move';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import './GroupChat.css'
import { useAuthValue } from '../AuthContext'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import LogoutIcon from '@mui/icons-material/Logout';


function Profile() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const { currentUser } = useAuthValue()

    //useState = variable in react
    //useEffect = run code on a condition in REACT

    useEffect(() => {
        // run once when the app component loads
        db.collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
            })
    }, [])

    useEffect(() => {
        //run code here...
        //if its blank inside [], this code runs ONCE when the app component loads..
        // setUsername(prompt('Please enter your name'))
        setUsername(currentUser?.email)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])//condition..

    const sendMessage = (event) => {
        event.preventDefault();

        db.collection('messages').add({
            message: input,
            username: username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        // all the logic to send a message goes from here
        // setMessages([...messages, {username: username, message: input}]);
        setInput('');
    }

    return (
        <div className="App">
            <div className="top_header_styling">
                <div>
                    <img src={logo} className="App-logo" alt="logo" />

                </div>
                <div>
                    <h2 className='login_header_style'>Software Measurement Quality Assurance <span className='span_design'> Group Chat </span></h2>

                </div>
                <div>
                    <span className='user_Name_display'> {username.replace('@gmail.com', '')} </span>
                    <Button size="small" color="error" onClick={() => signOut(auth)} type='submit' variant="contained" endIcon={<LogoutIcon />}>Sign Out </Button>
                </div>
            </div>

            <form className='app_form'>
                <FormControl className='app_formControl'>
                    <Input className='app_input' placeholder='Enter a message...' value={input} onChange={event => setInput(event.target.value)} />

                    <IconButton className='app_iconButton' color="primary" type='submit' onClick={sendMessage}>
                        <SendIcon />
                    </IconButton>

                    {/* <Button disabled={!input} variant="contained" type='submit' onClick={sendMessage} endIcon={<SendIcon />}>
              Send
            </Button> */}
                    {/* <Button disabled={!input} variant="contained" type='submit' onClick={sendMessage}>Send Message</Button> */}
                </FormControl>
            </form>

            <FlipMove className='flipmove_design'>
                {
                    messages.map(({ id, message }) => (
                        <Message key={id} username={username} message={message} />
                    ))
                }
            </FlipMove>

        </div>
    );

}

export default Profile
