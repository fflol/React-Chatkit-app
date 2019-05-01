import React from 'react'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
// import TypingIndicator from './components/TypingIndicator'
import WhosOnlineList from './components/WhosOnlineList'
import { ChatManager, TokenProvider } from '@pusher/chatkit-client/react-native'

class ChatScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            messages: [],
            currentRoom: {},
            currentUser: {},
            usersWhoAreTyping: [],
            // scrollHeight: ''
        }        
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    componentDidMount() {
        this.ul = document.querySelector('ul.overflow-auto');
        this.timerID = setInterval(() => {
            this.scrollToBottom()
        }, 1000);

        const chatManager = new ChatManager({
            instanceLocator: 'v1:us1:dcb23730-193e-4b92-8186-ffc227c1077d',
            userId: this.props.currentUsername,
            tokenProvider: new TokenProvider({
                url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/dcb23730-193e-4b92-8186-ffc227c1077d/token'
            }),
        })

        chatManager
            .connect()
            .then(currentUser => {
                this.setState({ currentUser: currentUser })
                return currentUser.subscribeToRoomMultipart({
                    roomId: '31216441',
                    hooks: {
                        onMessage: message => {
                            this.setState({
                                messages: [...this.state.messages, message]
                            })
                        },
                        onUserStartedTyping: user => {
                            this.setState({
                                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
                            })
                        },
                        onUserStoppedTyping: user => {
                            this.setState({
                                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                                    username => username !== user.name
                                )
                            })
                        },
                        onUserCameOnline: () => this.forceUpdate(),
                        onUserwentOffline: () => this.forceUpdate(),
                        onUserJoined: () => this.forceUpdate(),
                    },
                })
            })
            .then(currentRoom => { this.setState({ currentRoom: currentRoom }) })
            .catch(error => console.log(error))
    }

    scrollToBottom() {
        this.ul && (this.ul.scrollTop = 100000)
    }

    sendMessage = (text) => {
        this.state.currentUser.sendMessage({
            roomId: this.state.currentRoom.id,
            text: text
        })
    }

    sendTypingEvent = () => {
        this.state.currentUser
            .isTypingIn({ roomId: this.state.currentRoom.id })
            .catch(error => console.log(error))
    }


    render() {
        return (
            <div className='container'>
                <div className='row' style={{ height: '100vh' }}>
                    <div className='col-sm-3 p-0'>
                        <WhosOnlineList users={this.state.currentRoom.users} />
                    </div>
                    <div className='col-sm-9 p-0' style={{ height: '100vh' }}>
                        <MessageList currentUsername={this.props.currentUsername} usersWhoAreTyping={this.state.usersWhoAreTyping} messages={this.state.messages} />
                        {/* <TypingIndicator  /> */}

                        <SendMessageForm onSubmit={this.sendMessage} onChange={this.sendTypingEvent} />
                    </div>
                </div >
            </div>

        )
    }
}

export default ChatScreen