import React from 'react'

class MessageList extends React.Component {
    render() {
        const height = document.documentElement.clientHeight - 40

        return (
            <ul className='overflow-auto pr-5'
                style={{ height: height }}
            >
                {this.props.messages.map((message, index) => {
                    const align = message.senderId === this.props.currentUsername ? 'right' : 'left'
                    return (
                        <li style={{textAlign: align}} key={index}>
                                <span style={{ fontWeight: 'bold' }}>{message.senderId}</span>
                                <p>{message.parts[0].payload.content}</p>
                                <br />
                        </li>)
                })}
            </ul>
        )
    }
}

export default MessageList