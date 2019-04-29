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
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type="text" placeholder='' onChange={this.onChange} />
                    <input type="submit"/>
                </form>

            </div>
        )
    }
}

export default SendMessageForm