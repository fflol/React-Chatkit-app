import React from 'react'


class SendMessageForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    }

    onChange = (e) => {
        this.setState({
            text: e.target.value
        })
        this.props.onChange()
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.onSubmit(this.state.text)
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input style={{ height: '40px' }} className='form-control' type="text" placeholder='' onChange={this.onChange} />
            </form>

        )
    }
}

export default SendMessageForm