import './index.scss';

import { Card, CardText } from 'material-ui/Card';
import {previewFrameStyle} from './previewFrameStyle';

import CodeCard from '../CodeCard';
import ComponentPreview from '../ComponentPreview';
import ComponentParams from '../ComponentParams'
import React from 'react';
import Separator from '../Separator';

/**
 * @export
 * @class ComponentReview
 * @extends {React.Component}
 */
export default class ComponentReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {componentParams: {}};
    }
    render() {
        const componentDoc = this.props.documentation;

        const sectionParts = componentDoc.section.split("/");
        const componentName = componentDoc.name;

        return (
            <div className="component-review">
                <p className="component-section">{sectionParts.join(" > ")}</p>
                <h1 className="component-name">{componentName}</h1>
                <h3 className="component-description">{this.props.documentation.description}</h3>
                
                <Separator />

                <Card className="component-content" style={previewFrameStyle}>
                    <CardText>
                        <ComponentPreview componentName={componentName}/>
                    </CardText>
                </Card>
                <Separator />


                <div className="component-params-section">
                    <p className="section-header">Params:</p>
                    <ComponentParams params={this.props.documentation.params}/>
                </div>
                <Separator />

                <div className="component-examples">
                    <p className="section-header">Examples:</p>
                    <CodeCard>
                        <pre>code</pre>
                    </CodeCard>
                </div>
                <Separator />

                <div className="component-source-code">
                    <p className="section-header">Code:</p>
                    <CodeCard>
                        <pre>code</pre>
                    </CodeCard>
                </div>
            </div>
        );
    }
}