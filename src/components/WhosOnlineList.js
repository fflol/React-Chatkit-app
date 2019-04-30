import React from 'react'

class WhosOnlineList extends React.Component {
    render() {        
        if (this.props.users) {
            return (
                <ul className='bg-dark text-white d-none d-sm-block px-4 py-5' style={{ height: '100vh' }}>
                    {this.props.users.map((user, index) => {
                        const onlineStatus = user.presence.state === 'online' ? 'online' : 'offline' 
                        return <li className={onlineStatus} key={index}>{user.name}</li>
                    })}
                </ul>
            )
        } else {
            return <p>Loading...</p>
        }
    }
}

export default WhosOnlineList