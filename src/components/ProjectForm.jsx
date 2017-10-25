import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/monokai';

const stateUnsaved = {}

window.x = function() {
    console.log(stateUnsaved);
}

export class ProjectForm extends Component {

    state = {
        not_saved: false,
        fields: {
            id: "",
            name: "",
            description: "",
            code: ""
        }
    }

    static propTypes = {
        onSubmit: propTypes.func.isRequired
    }

    componentWillMount() {
        const {id='', name='', description='', code=''} = this.props.project;
        this.setState({...this.state, fields: {id, name, description, code}});

        let key = this.props.project.id || '';
        if (stateUnsaved[key]) {
            this.setState(stateUnsaved[key]);
        }
    }

    onSubmit = (evt) => {
        stateUnsaved[this.state.fields.id] = undefined;
        const project = {...this.state.fields}
        let result = this.props.onSubmit(project);
        evt.preventDefault();
    }

    onChangeField = (name) => {
        return (evt) => {
            let state = { ...this.state};
            state.fields[name] = typeof evt == "string" ? evt: evt.target.value;
            this.setState(state);
            stateUnsaved[this.state.fields.id] = this.state;
        }
    }
    
    render() {
      return (
        <div>
            <form className="ui form" onSubmit={this.onSubmit}>
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <input name="name" onChange={this.onChangeField("name")} value={this.state.fields.name} />
                </div>
                <div className="field">
                    <label htmlFor="description">Description</label>
                    <input name="description"  onChange={this.onChangeField("description")} value={this.state.fields.description} />
                </div>

                <div className="field">
                    <label htmlFor="code">Code</label>

                    <AceEditor
                        mode="javascript"
                        theme="monokai"
                        name="code"
                        onChange={this.onChangeField("code")}
                        fontSize={14}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        value={this.state.fields.code}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: false,
                            showLineNumbers: true,
                            tabSize: 2,
                        }}/>
                </div>
                <button className="ui button primary" type="submit">Submit</button>

            </form>
        </div>
      );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { project={} } =  ownProps;
    return {
        project
    }
};


export default connect(mapStateToProps, null)(ProjectForm);
