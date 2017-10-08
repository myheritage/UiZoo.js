import React from 'react';
import _ from 'underscore';
import Card from '../UI/Card';
import Separator from '../UI/Separator';
import CodeCard from '../UI/CodeCard';
import Modal from '../UI/Modal';
import Tooltip from '../UI/Tooltip';
import ComponentParams from '../ComponentParams';
import ComponentExamples from '../ComponentExamples';
import jsxToString from '../../services/jsx-to-string';
import {hasErrors, reportError, getErrors} from '../../services/errorReporter';
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
            componentProps: {},
            showErrorIndicator: hasErrors(),
            isErrorModalOpen: false,
        };

        this.updateParam = this.updateParam.bind(this);
        this.updateExample = this.updateExample.bind(this);
        this.toggleErrorModal = this.toggleErrorModal.bind(this);

        const componentDoc = this.props.documentations[this.props.componentName] || {};
        this.setDefaultExample(componentDoc, true);
    }

    /**
     * @param {boolean} [newValue] 
     */
    toggleErrorModal(newValue = true) {
        this.setState(state => _.extend({}, state, {isErrorModalOpen: newValue}));
    }

    /**
     * Set the default example, which is the first example
     * @return {boolean} if setting the example was a success
     * @param {boolean} [isInConstructor]
     */
    setDefaultExample(componentDoc, isInConstructor = false) {
        if (componentDoc.example && componentDoc.example.length) {
            this.updateExample(componentDoc.example[0].description, isInConstructor);
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
            if (!this.setDefaultExample(componentDoc)) {
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
        let componentProps = _.extend({}, this.state.componentProps, { [paramName]: value });
        // clean undefined values
        _.keys(componentProps).forEach(key => typeof componentProps[key] === 'undefined' && delete componentProps[key]);
        this.setState({ componentProps });
    }

    /**
     * Update the params by the example
     * @param {string} example
     * @param {boolean} [isInConstructor]
     */
    updateExample(example, isInConstructor = false) {
        let error = null,
            CompiledNode = null;
        try {
            CompiledNode = this.props.compiler(example);
        } catch (e) {
            error = e;
        }
        if (!error && CompiledNode && CompiledNode.type) {
            this.shallowStateUpdate({componentProps: CompiledNode.props}, isInConstructor);
        } else {
            let errorMessage = error
                ? error
                : 'error in example';
            reportError(errorMessage);
            this.shallowStateUpdate({showErrorIndicator: true}, isInConstructor);
        }
    }

    /**
     * @param {object} stateFragment
     * @param {boolean} [isInConstructor] 
     */
    shallowStateUpdate(stateFragment = {}, isInConstructor = false) {
        if (isInConstructor) {
            this.state = _.extend({}, this.state, stateFragment);
        } else {
            this.setState(state => _.extend({}, state, stateFragment));
        }
    }

    renderErrorIndicator() {
        return (
            <Tooltip tooltip="Errors found!" isOpen>
                <div className="library-_-error-indicator" onClick={this.toggleErrorModal} />
            </Tooltip>
        );
    }

    /**
     * Metadata - title, description, etc.
     * @param {object}
     * @param {string} name
     */
    renderComponentMetadata({ description, module }, name) {
        return (
            <div>
                <p className="library-_-component-section">
                    {module && module[0].name}
                </p>
                <h1 className="library-_-component-name">
                    {!!name && name}
                    {!name && 'Welcome to UiZoo.js!'}
                </h1>
                {this.state.showErrorIndicator ? this.renderErrorIndicator() : null}
                <h3 className="library-_-component-description">
                    <pre>
                        {_.pluck(description, "description").join(". ")}
                        {!name && 'please select a component to view'}
                    </pre>
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
            <Card className="library-_-component-content">
                {componentContent}
            </Card>
        );
    }

    /**
     * Possible params of the component on review
     * @param {object}
     */
    renderComponentParams({ param: params = [], property: properties = [] }, name) {
        params = [].concat(params, properties);
        params.forEach(param => {
            param.value = this.state.componentProps[param.name];
        });
        return (
            <div className="library-_-component-params-section">
                <p className="library-_-section-header">Params:</p>
                <ComponentParams componentName={name} params={params} onChange={this.updateParam} />
            </div>
        );
    }

    /**
     * Possible examples of the component on review
     * @param {object}
     */
    renderComponentExamples({ example = [] }) {
        return (
            <div className="library-_-component-examples-section">
                <p className="library-_-section-header">Examples:</p>
                <ComponentExamples examples={example} onChange={this.updateExample} />
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
            <div className="library-_-component-source-code">
                <p className="library-_-section-header">Source code:</p>
                <CodeCard>
                    {componentSourceCode}
                </CodeCard>
            </div>
        );
    }

    /**
     * Renders the error modal
     */
    renderErrorModal() {
        return (
            <Modal
                title="Errors"
                isOpen={this.state.isErrorModalOpen}
                onChange={this.toggleErrorModal}
            >
                <ul style={{padding: '0 15px'}}>
                    {getErrors().map((message, i) => <li key={`error-index-${i}`}>{message}</li>)}
                </ul>
            </Modal>
        );
    }

    /**
     * Render the component by the provided documentation
     */
    render() {
        const componentDoc = this.props.documentations[this.props.componentName] || {};
        const ComponentNode = this.props.components[this.props.componentName] || null;
        const componentContent = ComponentNode ? <ComponentNode {...this.state.componentProps} /> : null;

        return (
            <div className="library-_-component-review">
                {this.renderErrorModal()}
                {this.renderComponentMetadata(componentDoc, this.props.componentName)}
                <Separator /> {this.renderComponentContent(componentContent)}
                <Separator /> {this.renderComponentParams(componentDoc, this.props.componentName)}
                <Separator /> {this.renderComponentExamples(componentDoc)}
                <Separator /> {this.renderComponentSourceCode(componentContent)}
            </div>
        );
    }
}