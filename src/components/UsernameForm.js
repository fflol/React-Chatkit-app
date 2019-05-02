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
                <form className='mt-4 row' onSubmit={this.onSubmit}>
                    <input className='form-control col-sm-9 m-1' type="text" placeholder='Your alias...' onChange={this.onChange} />
                    <button className='btn btn-primary btn-sm col-sm-2 m-1'>Enter</button>
                </form>

            </div>
        )
    }
}

export default UsernameForm