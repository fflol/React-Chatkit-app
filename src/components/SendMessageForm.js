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
        this.setState({text:''})
    }

    render() {
        return (
            <form className='row mx-0' onSubmit={this.onSubmit}>
                <input style={{ height: '40px' }} className='form-control col-10' type="text" placeholder='' value={this.state.text} onChange={this.onChange} />
                <button className='btn btn-primary btn-sm col-2'>Send</button>
            </form>

        )
    }
}

export default SendMessageForm