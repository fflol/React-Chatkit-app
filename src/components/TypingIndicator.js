import React from 'react'

class TypingIndicator extends React.Component {
    render() {
        if (this.props.usersWhoAreTyping.length === 0) return (
        <p style={{height: '30px'}}></p>
        ) 
        else if(this.props.usersWhoAreTyping.length === 1) return (
        <p style={{height: '30px'}}>{this.props.usersWhoAreTyping[0]} is typing...</p>
        )
        else return (
            <p style={{height: '30px'}}>{this.props.usersWhoAreTyping.join(' and ')} are typing...</p>
        )
    }     
}

export default TypingIndicator