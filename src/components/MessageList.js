import React from 'react'

class MessageList extends React.Component {

    render() {
        return (
            <ul>
                {this.props.messages.map((message, index) => {
                    return (
                        <li key={index}>
                            <div>
                                <span>{message.senderId}</span>
                                <p>{message.parts[0].payload.content}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

export default MessageList