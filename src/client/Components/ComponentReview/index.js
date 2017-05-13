import './index.scss';

import { Card, CardActions, CardHeader, CardMedia, CardText, CardTitle } from 'material-ui/Card';

import CodeCard from '../CodeCard';
import ComponentPreview from "../ComponentPreview";
import React from 'react';
import Separator from '../Separator';

/**
 * @export
 * @class ComponentReview
 * @extends {React.Component}

 * 
 */
export default class ComponentReview extends React.Component {
    render() {
        const documentation = {
            name: 'Separator',
            description: 'Separator description',
            section: 'Common/Separators',
            params: [{ name: 'blah', type: 'boolean' }]
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

                <Card className="component-content">
                    <CardHeader title="Content"/>
                    <CardText>
                        <ComponentPreview componentName={documentation.name}/>
                    </CardText>
                </Card>
                
                <Separator />


                <Card className="component-params">
                    <CardHeader title="Params"/>
                    <CardText>
                        the params
                    </CardText>
                </Card>

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