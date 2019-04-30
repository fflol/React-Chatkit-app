import React from 'react'

class UsernameForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: ''
        }
    }

    onChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.onSubmit(this.state.username)
    }

    render() {
        return (
            <div className='container mt-5'>
                <h1 className='mt-5'>the Council of li’l Tibet in Exile</h1>
                <form className='mt-4' onSubmit={this.onSubmit}>
                    <input className='form-control' type="text" placeholder='Your alias...' onChange={this.onChange} />
                </form>

            </div>
        )
    }
}

export default UsernameForm