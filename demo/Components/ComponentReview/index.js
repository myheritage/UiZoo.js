import React from 'react';
import Card from '../Card';
import CodeCard from '../CodeCard';
import Separator from '../Separator';
import './index.scss';

/**
 * @name ComponentReview
 * @description this is super meta dude
 * @example
 */
export default class ComponentReview extends React.Component {
    render () {
        const documentation = {
            name: 'Separator',
            description: 'Separator description',
            section: 'Common/Separators',
            params: [{name: 'blah', type: 'boolean'}]
        };
        const components = {
            'Common/Separators/Separator': Separator,
        }
        return (
            <div className="component-review">
                <p className="component-section">{documentation.section.replace('/', ' > ')}</p>
                <h1 className="component-name">{documentation.name}</h1>
                <h3 className="component-description">{documentation.description}</h3>
                <Separator/>

                <Card className="component-content">
                    component content
                </Card>
                <Separator/>
                
                <div className="component-params">
                    <p className="section-header">Params:</p>
                    the params
                </div>
                <Separator/>

                <div className="component-examples">
                    <p className="section-header">Examples:</p>
                    <CodeCard>
                        <pre>code</pre>
                    </CodeCard>
                </div>
                <Separator/>

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