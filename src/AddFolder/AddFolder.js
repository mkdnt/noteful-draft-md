import React, { Component } from 'react';
import NotefulForm from '../NotefulForm/NotefulForm';
import ApiContext from '../ApiContext';
import PropTypes from 'prop-types'
import config from '../config';

export class AddFolder extends Component {
    static defaultProps = {
        history: {
            push: () => {}
        },
    }

    static propTypes = {
    onSubmit: PropTypes.func,
    onClick: PropTypes.func,
    folder: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string.isRequired
    }),
    note: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      modified: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      onDeleteNote: PropTypes.func
    })
  }
    static contextType = ApiContext;

handleSubmit(event) {
    event.preventDefault();
    const folder = {
        name: event.target['new-folder-name'].value
    }
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(folder => {
        this.context.addFolder(folder)
        this.props.history.push(`/folder/${folder.id}`)
      })
      .catch(error => {
        console.error({ error })
      })
}    

handleClickCancel = () => {
  this.props.history.push('/')
}

    render() {
        return (
            <section>
            <h2>Add New Folder</h2>
            <NotefulForm onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="new-folder-name">
                        Folder Name
                    </label>
                    <input type='text' id='new-folder-name' name='new-folder-name'/>
                </div>
                <div>
                    <button type='submit'>
                        Add
                    </button>
                    <button onClick={this.handleClickCancel}>
                        Cancel
                    </button>
                </div>
            </NotefulForm>
            </section>
        )
    }
}

export default AddFolder
