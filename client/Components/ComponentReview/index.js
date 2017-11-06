import React, {isValidElement, Component} from 'react';
import _ from 'underscore';
import Card from '../UI/Card';
import Separator from '../UI/Separator';
import CodeCard from '../UI/CodeCard';
import Modal from '../UI/Modal';
import Tooltip from '../UI/Tooltip';
import ComponentParams from '../ComponentParams';
import ParamSelectorJSX from '../ComponentParams/ParamSelector/ParamSelectorJSX';
import ComponentExamples from '../ComponentExamples';
import jsxToString from '../../services/jsx-to-string';
import { hasErrors, reportError, getErrors } from '../../services/errorReporter';
import compileExample from '../../services/compileExample';
import extractJSDocExample from '../../services/extractJSDocExample';

import './index.scss';

/**
 * @description
 * Review the current component
 * Choose props, example of see the source code
 */
export default class ComponentReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            compiledNode: null,
            componentProps: {},
            showErrorIndicator: hasErrors(),
            isErrorModalOpen: false,
        };

        this.updateParam = this.updateParam.bind(this);
        this.updateExample = this.updateExample.bind(this);
        this.toggleErrorModal = this.toggleErrorModal.bind(this);

        const example = this.extractJSDocExample(props);
            
        this.setDefaultExample(example, true, props);
    }

    /**
     * @param {boolean} [newValue] 
     */
    toggleErrorModal(newValue = true) {
        this.setState(state => _.extend({}, state, { isErrorModalOpen: newValue }));
    }

    /**
     * Set the default example, which is the first example
     * @return {boolean} if setting the example was a success
     * @param {boolean} [isInConstructor]
     * @param {object} [props]
     */
    setDefaultExample(example, isInConstructor = false, props = this.props) {
        if (example) {
            this.updateExample(example, isInConstructor, props);
        }
    }

    /**
     * Extracts the wanted jsdoc example by props
     * @param {Object} props 
     */
    extractJSDocExample(props = this.props) {
        return extractJSDocExample(
            props.documentations[props.componentName], 
            props.exampleIndex);
            
    }

    /**
     * Reset componentProps if component has changed
     * @param {object} nextProps 
     */
    componentWillReceiveProps(nextProps) {
        if (this.props.componentName !== nextProps.componentName) {
            const example = this.extractJSDocExample(nextProps);
            if (example) {
                this.setDefaultExample(example, false, nextProps);
            } else {
                this.shallowStateUpdate({ componentProps: {}, compiledNode: null});
            }
        }
        const showErrorIndicator = hasErrors();
        if (showErrorIndicator !== this.state.showErrorIndicator) {
            this.shallowStateUpdate({showErrorIndicator});
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
        this.shallowStateUpdate({ componentProps });
    }

    /**
     * Update the params by the example
     * @param {string} example
     * @param {boolean} [isInConstructor]
     * @param {object} [props]
     */
    updateExample(example, isInConstructor = false, props = this.props) {
        const compiledExample = compileExample(example, props.compiler);
        if (!compiledExample) {
            this.shallowStateUpdate({ showErrorIndicator: true }, isInConstructor);
        } else {
            let componentProps = {};
            let compiledNode = null;
            // checks if the root of the example is the current component, will put it "as-is" if yes
            if (compiledExample.type && compiledExample.type === props.components[props.componentName]) {
                componentProps = compiledExample.props || {};
            } else {
                compiledNode = compiledExample;
            }
            this.shallowStateUpdate({ componentProps, compiledNode}, isInConstructor);
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
        const { goToUrl } = this.props;
        const moduleName = module && module[0].name;

        return (
            <div>
                <div className="library-_-component-section">
                    <span className="library-_-component-section-name"
                        onClick={() => goToUrl(moduleName)}>
                        {moduleName}
                    </span>
                </div>
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
                <ComponentParams
                    componentName={name}
                    params={params}
                    onChange={this.updateParam}
                    compiler={this.props.compiler}
                    exampleIndex={this.props.exampleIndex}
                />
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
                <ComponentExamples
                    examples={example}
                    changeExampleIndexInUrl={this.props.changeExampleIndexInUrl}
                    onChange={this.updateExample}
                />
            </div>
        );
    }

    /**
     * Source code of the component on review with chosen props
     * @param {object}
     * @param {boolean} [isEditable]
     */
    renderComponentSourceCode(componentContent, isEditable) {
        const componentSourceCode = !!componentContent && isValidElement(componentContent) ? jsxToString(componentContent) : null;
        return (
            <div className="library-_-component-source-code" key="source-code">
                <p className="library-_-section-header">{isEditable ? 'Editable code' : 'Source code'}:</p>
                <CodeCard>
                    {isEditable
                        ? <ParamSelectorJSX
                                selectedValue={componentSourceCode}
                                compiler={this.props.compiler}
                                onChange={(e, compiledNode) => this.shallowStateUpdate({compiledNode}, false)}
                                forceOnlyJSX
                          />
                        : componentSourceCode}
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
                <ul style={{ padding: '0 15px' }}>
                    {getErrors().map((message, i) => <li key={`error-index-${i}`}>{message}</li>)}
                </ul>
            </Modal>
        );
    }

    /**
     * Decide what to render, either predefined compiled example (compiledNode)
     * or build the Component from the props and return <ComponentNode {...props} />
     */
    getComponentContent() {
        if (this.state.compiledNode !== null) {
            return this.state.compiledNode;
        }
        const ComponentNode = this.props.components[this.props.componentName];
        return (ComponentNode ? <ComponentNode {...this.state.componentProps} /> : null);
    }

    /**
     * Render the component by the provided documentation
     */
    render() {
        const componentDoc = this.props.documentations[this.props.componentName] || {};
        const componentContent = this.getComponentContent();
        const shouldShowEditableSource = this.state.compiledNode !== null;

        return (
            <div className="library-_-component-review" key={`review-for-${this.props.componentName}`}>
                {this.renderErrorModal()}
                {this.renderComponentMetadata(componentDoc, this.props.componentName)}
                <Separator /> {this.renderComponentContent(componentContent)}
                <Separator /> 
                {shouldShowEditableSource
                    ? this.renderComponentSourceCode(componentContent, true)
                    : this.renderComponentParams(componentDoc, this.props.componentName)
                }
                <Separator /> {this.renderComponentExamples(componentDoc)}
                {!shouldShowEditableSource && <div><Separator />{this.renderComponentSourceCode(componentContent, false)}</div>}
            </div>
        );
    }
}

ComponentReview.defaultProps = {
    exampleIndex: 0,
};