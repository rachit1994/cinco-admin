import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

export class AddSettings extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            playStoreLink: '',
            appStoreLink: '',
            terms: EditorState.createEmpty(),
            about: EditorState.createEmpty()
        }
    }
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    render() {
        return (
            <div>
                <TextField
                    label='play store link'
                    onChange={this.handleChange('playStoreLink')}
                />
                <TextField
                    label='apple app store link'
                    onChange={this.handleChange('appStoreLink')}
                />
                <Editor
                    editorState={this.state.terms}
                    editorStyle={{ border: 'solid 1px #eee', padding: 5 }}
                    onEditorStateChange={(editorState) => this.setState({ terms: editorState })}
                />
            </div>
        )
    }
}

export default AddSettings;