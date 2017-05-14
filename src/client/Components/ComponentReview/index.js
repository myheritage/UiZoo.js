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
        const documentation = {
            name: 'Separator',
            description: 'Separator description',
            section: 'Common/Separators',
            params: [
                { name: 'blah', type: 'boolean', description: 'blah description text', optional: false },
                { name: 'blah2', type: 'string', options: ['option1', 'option2'], description: 'blah2 description text', optional: true },
            ],
        };
        const components = {
            'Common/Separators/Separator': Separator,
        }
        
        return (
            <div className="component-review">
                <p className="component-section">{documentation.section.replace('/', ' > ')}</p>
                <h1 className="component-name">{documentation.name}</h1>
                <h3 className="component-description">{documentation.description}</h3>
                <Separator />

                <Card className="component-content" style={previewFrameStyle}>
                    <CardText>
                        <ComponentPreview componentName={documentation.name} params={this.state.componentParams}/>
                    </CardText>
                </Card>
                <Separator />


                <div className="component-params-section">
                    <p className="section-header">Params:</p>
                    <ComponentParams params={documentation.params}/>
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