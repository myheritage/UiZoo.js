import React from 'react';
import _ from 'underscore';
import {Card, CardText} from 'material-ui';
import {previewFrameStyle} from './previewFrameStyle';
import Separator from '../Separator';
import CodeCard from '../CodeCard';
import ComponentPreview from '../ComponentPreview';
import ComponentParams from '../ComponentParams';
import ComponentExamples from '../ComponentExamples';
import './index.scss';

/**
 * @description
 * Review the current component
 */
export default class ComponentReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentParams: {}
        };
        this.updateParam = this.updateParam.bind(this);
        this.updateExample = this.updateExample.bind(this);
    }

    updateParam(e, paramName, value) {
        let componentParams = _.extend({}, this.state.componentParams, {[paramName]: value});
        this.setState({componentParams});
    }

    updateExample(example) {
        console.log(example);
    }

    render() {
        const componentDoc = this.props.documentation || {};
        const {name, params = [], examples = [], section = '', description} = componentDoc;
        const sectionParts = section.split("/"); // TODO: Support "windows" paths
        
        return (
            <div className="component-review">
                <p className="component-section">{sectionParts.join(" > ")}</p>
                <h1 className="component-name">
                    {!!name && name}
                    {!name && 'Welcome to Bibliotheca!'}
                </h1>
                <h3 className="component-description">
                    {description}
                    {!name && 'please select a component to view'}
                </h3>
                <Separator/>

                <Card className="component-content" style={previewFrameStyle}>
                    <CardText>
                        {!!name && <ComponentPreview
                            componentName={name}
                            params={this.state.componentParams}/>}
                    </CardText>
                </Card>
                <Separator/>

                <div className="component-params-section">
                    <p className="section-header">Params:</p>
                    <ComponentParams
                        params={params}
                        onChange={this.updateParam}/>
                </div>
                <Separator/>

                <div className="component-examples-section">
                    <p className="section-header">Examples:</p>
                    <ComponentExamples
                        examples={examples}
                        onChange={this.updateExample}/>
                </div>
                <Separator/>

                <div className="component-source-code">
                    <p className="section-header">Code:</p>
                    <CodeCard>
                        source code
                    </CodeCard>
                </div>
            </div>
        );
    }
}