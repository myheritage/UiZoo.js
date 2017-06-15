import React from 'react';
import _ from 'underscore';
import jsxToString from './jsx-to-string.js';
import Card from '../BibliothecaUI/Card';
import {previewFrameStyle} from './previewFrameStyle';
import Separator from '../BibliothecaUI/Separator';
import CodeCard from '../BibliothecaUI/CodeCard';
import ComponentParams from '../ComponentParams';
import ComponentExamples from '../ComponentExamples';
import './index.scss';

/**
 * @description
 * Review the current component
 * Choose props, example of see the source code
 */
export default class ComponentReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentProps: {}
        };
        this.updateParam = this.updateParam.bind(this);
        this.updateExample = this.updateExample.bind(this);
    }

    /**
     * Component mount, set default example
     */
    componentDidMount() {
        const componentDoc = this.props.documentations[this.props.componentName] || {};
        this.setDefaultExample(componentDoc);
    }

    /**
     * Set the default example, which is the first example
     * @return {boolean} if setting the example was a success
     */
    setDefaultExample(componentDoc) {
        if (componentDoc.example && componentDoc.example.length) {
            this.updateExample(componentDoc.example[0].description);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Reset componentProps if component has changed
     * @param {object} nextProps 
     */
    componentWillReceiveProps(nextProps) {
        if (this.props.componentName !== nextProps.componentName) {
            const componentDoc = nextProps.documentations[nextProps.componentName] || {};
            if(!this.setDefaultExample(componentDoc)) {
                this.setState({
                    componentProps: {}
                });
            }
        }
    }
    
    /**
     * Update when one of the params has changed
     * @param {event} e
     * @param {string} paramName
     * @param {any} value
     */
    updateParam(e, paramName, value) {
        let componentProps = _.extend({}, this.state.componentProps, {[paramName]: value});
        // clean undefined values
        _.keys(componentProps).forEach(key => typeof componentProps[key] === 'undefined' && delete componentProps[key]);
        this.setState({componentProps});
    }

    /**
     * Update the params by the example
     * @param {string} example
     */
    updateExample(example) {
        let error = null,
            CompiledNode = null;
        try {
            CompiledNode = this.props.compiler(example);
        } catch(e) {
            error = e;
        }
        // TODO: add name CompiledNode.type.name === this.props.documentation.name
        if (!error && CompiledNode && CompiledNode.type) {
            this.setState({
                componentProps: CompiledNode.props
            });
        } else {
            let errorMessage = error
                ? error
                : 'error in example';
            console.error(errorMessage);
        }
    }

    /**
     * Metadata - title, description, etc.
     * @param {object}
     * @param {string} name
     */
    renderComponentMetadata({description}, name) {
        return (
            <div>
                <h1 className="bibliotheca-component-name">
                    {!!name && name}
                    {!name && 'Welcome to Bibliotheca!'}
                </h1>
                <h3 className="bibliotheca-component-description">
                    {_.pluck(description, "description").join(". ")}
                    {!name && 'please select a component to view'}
                </h3>
            </div>
        );
    }

    /**
     * Content - the actual rendered component on review
     * @param {object}
     */
    renderComponentContent(componentContent) {
        return (
            <Card className="bibliotheca-component-content">
                {componentContent}
            </Card>
        );
    }

    /**
     * Possible params of the component on review
     * @param {object}
     */
    renderComponentParams({param: params = [], property: properties = []}, name) {
        params = [].concat(params, properties);
        params.forEach(param => {
            param.value = this.state.componentProps[param.name];
        });
        return (
            <div className="bibliotheca-component-params-section">
                <p className="bibliotheca-section-header">Params:</p>
                <ComponentParams componentName={name} params={params} onChange={this.updateParam}/>
            </div>
        );
    }

    /**
     * Possible examples of the component on review
     * @param {object}
     */
    renderComponentExamples({example = []}) {
        return (
            <div className="bibliotheca-component-examples-section">
                <p className="bibliotheca-section-header">Examples:</p>
                <ComponentExamples examples={example} onChange={this.updateExample}/>
            </div>
        );
    }

    /**
     * Source code of the component on review with chosen props
     * @param {object}
     */
    renderComponentSourceCode(componentContent) {
        const componentSourceCode = !!componentContent ? jsxToString(componentContent) : null;
        return (
            <div className="bibliotheca-component-source-code">
                <p className="bibliotheca-section-header">Source code:</p>
                <CodeCard>
                    {componentSourceCode}
                </CodeCard>
            </div>
        );
    }

    /**
     * Render the component by the provided documentation
     */
    render() {
        const componentDoc = this.props.documentations[this.props.componentName] || {};
        const ComponentNode = this.props.components[this.props.componentName] || null;
        const componentContent = ComponentNode ? <ComponentNode {...this.state.componentProps}/> : null;
        return (
            <div className="bibliotheca-component-review">
                {this.renderComponentMetadata(componentDoc, this.props.componentName)}
                <Separator/> {this.renderComponentContent(componentContent)}
                <Separator/> {this.renderComponentParams(componentDoc, this.props.componentName)}
                <Separator/> {this.renderComponentExamples(componentDoc)}
                <Separator/> {this.renderComponentSourceCode(componentContent)}
            </div>
        );
    }
}