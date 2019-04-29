import React from 'react'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import TypingIndicator from './components/TypingIndicator'
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
        }
    }

    componentDidMount() {
        const chatManager = new ChatManager({
            instanceLocator: 'v1:us1:dcb23730-193e-4b92-8186-ffc227c1077d',
            userId: this.props.currentUsername,
            tokenProvider: new TokenProvider({
                url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/dcb23730-193e-4b92-8186-ffc227c1077d/token'
            })
        })

        chatManager
            .connect()
            .then(currentUser => {
                console.log(currentUser)
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
            <div style={{
                display: 'flex',
                height: '100vh'
            }}>
                <div style={{
                    width: '30%',
                    backgroundColor: 'tomato'
                }}>
                    <WhosOnlineList users={this.state.currentRoom.users} />
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <h1>Chat</h1>
                    <div style={{ flex: 1 }}>
                        <MessageList messages={this.state.messages} />
                    </div>
                    <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
                    <SendMessageForm onSubmit={this.sendMessage} onChange={this.sendTypingEvent} />
                </div>
            </div >
        )
    }
}

export default ChatScreen