(function (React$1,redux,reactRouterRedux,immutable,ReactDOM,reactRedux,reactRouter,_$1) {
'use strict';

var React$1__default = 'default' in React$1 ? React$1['default'] : React$1;
var ReactDOM__default = 'default' in ReactDOM ? ReactDOM['default'] : ReactDOM;
_$1 = 'default' in _$1 ? _$1['default'] : _$1;

var SET_COMPONENT_SEARCH_FILTER = 'SET_COMPONENT_SEARCH_FILTER';

var COMPONENT_SEARCH_QUERY_FIELD = 'componentSearchQuery';

/**
 * Search reducer
 * This reducer will help us in all search related things in the Components Library
 * @param {Immutable} state - the old state
 * @param {string} type - the type of the action
 * @param {Object} payload - object of the search
 * @returns {Immutable}
 */
function searchReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : immutable.Map({});
    var _ref = arguments[1];
    var type = _ref.type,
        payload = _ref.payload;

    var newState = void 0;
    switch (type) {
        case SET_COMPONENT_SEARCH_FILTER:
            newState = state.set(COMPONENT_SEARCH_QUERY_FIELD, payload.searchQuery);
            break;
        default:
            newState = state;
    }
    return newState;
}

var reducer = redux.combineReducers({
    routing: reactRouterRedux.routerReducer,
    searches: searchReducer
});

var initialState = {};

var store = redux.createStore(reducer, initialState);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();











var toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

var PRIMITIVE_TYPES = ["object", "number", "boolean", "function", "string"];
var BOOLEAN_VALUES = [true, false];
var missingErrorTemplate = function missingErrorTemplate(section) {
    return section + "s section is missing!";
};

/**
 * Parses an dictionary of JSDDOC documentations
 * @param {Object} componentsDictionary
 */


/**
 * Parses a single component documentation
 * @param {string} componentDocumentation
 * @returns {Object} A parsed documentation object
 */
function parseSingleDoc(componentDocumentation) {
    var metaData = void 0;
    if (componentDocumentation) {
        // Regexp the matches groups for the description, example, and params(as multiple)

        // Get the regexp matches
        var regexResults = componentDocumentation.match(/(@description[^@]*)|(@example[^@]*)|(@param.*)/gmi);

        if (regexResults) {
            var _regexResults = toArray(regexResults),
                description = _regexResults[0],
                examples = _regexResults[1],
                params = _regexResults.slice(2);

            // Parse the documentation parts.


            metaData = {
                description: parseDescription(description),
                examples: parseExamples(examples),
                params: parseParams(params),
                invalid: {
                    description: getInvalidErrors(componentDocumentation, "Description"),
                    examples: getInvalidErrors(componentDocumentation, "Example"),
                    params: getInvalidErrors(componentDocumentation, "Param")

                }
            };
        }
    }

    return metaData;
}

function getInvalidErrors(documentation, sectionName) {
    return documentation.includes(sectionName.toLowerCase()) ? undefined : missingErrorTemplate(sectionName);
}

/**
 * Parses the description into fitting format
 * @param {string} descriptionString The descriptions part of the documentation
 */
function parseDescription(descriptionString) {
    return descriptionString.replace(/@description\s/, '') // Replace @description header
    .replace(/^\s*\*/gm, '') // Remove *
    .trim(); // Remove spaces.
}

/**
 * This will split to different examples based on a leading number (like 1), 2) .. )
 * @param {String} examplesString the example block
 * @returns {Array}
 */
function parseToExamples(examplesString) {
    var examples = [],
        currentExample = '',
        examplesRows = examplesString.split(/\s*$/gm);

    for (var i = 0, l = examplesRows.length; i < l; i++) {
        if (/^\s*\d\)/.exec(examplesRows[i])) {
            // check if it's a new example
            examples.push(currentExample);
            currentExample = examplesRows[i].replace(/^\s*\d\)/, '');
        } else {
            currentExample += examplesRows[i];
            if (i === examplesRows.length - 1) {
                // checks if it's the last line! should push to array
                examples.push(currentExample);
            }
        }
    }

    return examples;
}

/**
 * Parses example string into example arrays
 * @param {string} examplesString The examples part of the documentation
 */
function parseExamples(examplesString) {
    examplesString = examplesString.replace(/@example\s/, '') // Replace @example header
    .replace(/^\s*\*/gm, ''); // Remove *
    return parseToExamples(examplesString).filter(function (curr) {
        return curr;
    }) // Remove empty strings
    .map(function (curr) {
        return curr.trim();
    });
}

/**
 * Parses a json string, if parse passed return the value, if not return undefined
 * @param {string} str The json string
 * @returns {*} The parsed JS object
 */
function parseJsonString(str) {
    var value = void 0;
    try {
        value = JSON.parse(str);
    } catch (e) {}
    return value;
}

/**
 * Checks if a param has an optional value, returns an object describing the value definition
 * @param {string} paramNameString The param name section of the documentation
 * @returns {{name: *, defaultValue: *, isOptional: boolean}} The object describing the param optional defintions
 */
function getParamValueDefintiion(paramNameString) {
    // A regexp the finds groups matching [name="defaultValue"] as two groups
    var regexpGroups = /\[([^=]*)=*(.*)\]/g.exec(paramNameString);

    // If matched, get the splitted name and default value as a string

    var _ref = regexpGroups ? regexpGroups.slice(1) : [],
        _ref2 = slicedToArray(_ref, 2),
        name = _ref2[0],
        defaultValue = _ref2[1];

    // Returns an object describing the actual name of the param, the default value of the param, and if it's optional.


    return {
        name: name || paramNameString,
        defaultValue: defaultValue ? parseJsonString(defaultValue.replace(/'/g, "\"")) : undefined,
        isOptional: !!regexpGroups
    };
}

/**
 * Parses param strings into {type,name,value} objects
 * @param {string[]} paramsStringArray The param strings split into an array
 */
function parseParams(paramsStringArray) {
    return paramsStringArray.map(function (currParam) {
        var result = void 0;

        // This regexp splits the param line to 3 sections, type [param=defaultValue] description
        var paramGroups = /@param.*{([^}]+)}\s+([^\s]*)\s*(.*)/g.exec(currParam);

        if (paramGroups) {
            // Remove the @param header, and match type and name of current param.
            var _ref3 = paramGroups ? paramGroups.slice(1).map(function (curr) {
                return curr.trim();
            }) : [],
                _ref4 = slicedToArray(_ref3, 3),
                type = _ref4[0],
                name = _ref4[1],
                description = _ref4[2];

            // Remove quotes if exist
            // type = type.replace(/^["']|["']$/g, '');


            var variantValues = type.split("|").map(parseJsonString).filter(function (curr) {
                return curr;
            }),
                isTypeVariant = !_.contains(PRIMITIVE_TYPES, type.toLowerCase()),
                isBoolean = type.toLowerCase() === "boolean";

            // Treat boolean as variant with boolean values.
            if (isBoolean) {
                variantValues = BOOLEAN_VALUES;
            }

            result = {
                type: isTypeVariant ? "variant" : type,
                name: name,
                values: isTypeVariant || isBoolean ? variantValues : [],
                description: description
            };

            // Extend the result with optional default values.
            result = _.extend(result, getParamValueDefintiion(name));
        } else {
            result = {
                name: "invalid param",
                invalid: "param is invalid! " + paramsStringArray
            };
        }

        return result;
    });
}

function extractExampleParams(componentName, exampleString) {
    var result = [];

    var regexResults = void 0,
        children = [];
    var paramRegex = /((\w*)={\s*({[\s\S]*})*\s*}|(\w*)={(\[[\s\S]*?\])})|(\w*)=("[\s\S]*?")|(\w*)={([\s\S]*?)}/gm;
    var childrenRegex = /<(\w*)([\s\S]*?["}'\/]>|>)([\s\S]*)<\/\1>/gm;
    exampleString = exampleString.replace(/'/gm, "\"");

    while (regexResults = paramRegex.exec(exampleString.match(/<[\s\S]*?>/mg)[0])) {
        var _regexResults$filter$ = regexResults.filter(function (curr) {
            return curr;
        }).splice(-2),
            _regexResults$filter$2 = slicedToArray(_regexResults$filter$, 2),
            name = _regexResults$filter$2[0],
            value = _regexResults$filter$2[1];

        result.push({
            name: name,
            value: parseJsonString(value)
        });
    }

    while (regexResults = childrenRegex.exec(exampleString)) {
        children.push(regexResults[3].trim());
    }

    if (!(children.length === 1 && !/<.*>/gm.test(children[0]))) {
        children = children.map(function (currChild) {
            var childResult = [];
            var singleElementRegexp = /<(\w*)[\s\S]*?(\/>|\/\1>)/gm;
            var singleChildResults = void 0;
            while (singleChildResults = singleElementRegexp.exec(currChild)) {
                var _singleChildResults = singleChildResults,
                    _singleChildResults2 = slicedToArray(_singleChildResults, 2),
                    elementNode = _singleChildResults2[0],
                    elementName = _singleChildResults2[1];

                childResult.push({
                    name: elementName,
                    params: extractExampleParams(elementName, elementNode)
                });
            }

            return childResult;
        })[0];
    } else {
        children = children ? children[0] : null;
    }
    result.push({
        name: "children",
        value: children
    });

    return result;
}

var memoizedSingleParse = _$1.memoize(parseSingleDoc);

function getComponentMetaData(componentName) {
    if (componentName) {
        return memoizedSingleParse(window.clientData[componentName]);
    }
}

var VARIANT_FESTIVE = 'festive';
var VARIANTS = [VARIANT_FESTIVE];

var SIZE_XSMALL = 'xsmall';
var SIZE_SMALL = 'small';
var SIZE_MEDIUM = 'medium';
var SIZE_LARGE = 'large';
var SIZES = [SIZE_XSMALL, SIZE_SMALL, SIZE_MEDIUM, SIZE_LARGE];

var MH_BUTTON_BASE_CLASS = 'mh_button';
var MH_BUTTON_TYPE_BASE_CLASS = 'mh_button_type';
var MH_BUTTON_SIZE_BASE_CLASS = 'mh_button_size';
var MH_BUTTON_PRIMARY = 'primary'; // this is the inverse with transparent background
var MH_BUTTON_NOT_PRIMARY = 'default'; // this is the common use one
// those will override the default for the chosen variant
var MH_BUTTON_ROUNDED = 'rounded';
var MH_BUTTON_NOT_ROUNDED = 'not_rounded';

var OTHER_OPTION = {
    id: 'otherOption'
};
var BUTTON_PROPS = {
    size: SIZE_SMALL
};

var DEFAULT_ACTIVE_INDEX = -1;

/**
 * @description
 * Provide value to attach a dropdown beneath it
 * The dropdown options are the children of the component
 * Dropdown can have an active option - by passing showActive prop
 * There are callbacks for both index change and opening of the dropdown
 * Note: index change when showActive=false will be called on each click
 *
 * @example
 * 1) showing active index
 * <Dropdown value={'dropdown header [click me!]'} showActive={true} activeIndex={1}>
 *     <div>Element 0</div>
 *     <div>Default index 1</div>
 *     <div>Last element 2</div>
 * </Dropdown>
 *
 * 2) not showing active index
 * <Dropdown value={'Another dropdown header [click me!]'}>
 *     <div>Element 0</div>
 *     <div>Another element 1</div>
 *     <div>Last element 2</div>
 * </Dropdown>
 *
 * @param {*} value the element to attach this dropdown to
 * @param {Number} [activeIndex] preselected index, default as -1
 * @param {Function} [onIndexChange] callback to indicate an index was chosen
 * @param {Function} [onOpen] callback to indicate the dropdown was opened, good for activity reporting
 * @param {boolean} [showActive] should handle active index
 * @param {*} children direct nodes are the dropdown options
 */

var Dropdown = function (_Component) {
    inherits(Dropdown, _Component);

    /**
     * @param {Object} props
     */
    function Dropdown(props) {
        classCallCheck(this, Dropdown);

        var _this = possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

        _this.state = {
            activeIndex: props.activeIndex || DEFAULT_ACTIVE_INDEX,
            opened: false
        };
        return _this;
    }

    /**
     * Change activeIndex in state if props was changed
     * @param {Object} nextProps
     */


    createClass(Dropdown, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.activeIndex !== nextProps.activeIndex) {
                this.setState({ activeIndex: nextProps.activeIndex });
            }
        }

        /**
         * Toggle state of opened/closed
         */

    }, {
        key: 'toggle',
        value: function toggle() {
            var newOpenedState = !this.state.opened;
            this.setState({ opened: newOpenedState });
            if (this.props.onOpen && newOpenedState) {
                this.props.onOpen();
            }
        }

        /**
         * Close if opened
         */

    }, {
        key: 'closeDropdown',
        value: function closeDropdown() {
            if (this.state.opened) {
                this.setState({ opened: false });
            }
        }

        /**
         * Chose this index and close the dropdown
         * If showActive flag is on, will check that the index has changed
         * @param {Number} index
         */

    }, {
        key: 'choseIndex',
        value: function choseIndex(index) {
            if (!this.props.showActive || index !== this.state.activeIndex) {
                this.setState({ activeIndex: index });
                if (this.props.onIndexChange) {
                    this.props.onIndexChange(index);
                }
            }
            this.closeDropdown();
        }

        /**
         * Render a click-able dropdown option
         * @param {*} node
         * @param {Number} index
         */

    }, {
        key: 'renderDropdownOption',
        value: function renderDropdownOption(node, index) {
            var _this2 = this;

            return React.createElement(
                'li',
                { className: this.state.activeIndex == index && this.props.showActive ? 'active' : '',
                    key: 'dropdown_row_' + index,
                    onClick: function onClick() {
                        return _this2.choseIndex(index);
                    } },
                node
            );
        }

        /**
         * Render
         */

    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                value = _props.value,
                children = _props.children;

            var dropdownBody = React$1.Children.map(children, function (child, i) {
                return _this3.renderDropdownOption(child, i);
            });
            var dropdownClassName = 'dropdown_wrapper' + (this.state.opened ? ' opened' : '');

            return React.createElement(
                'div',
                { className: dropdownClassName, tabIndex: '0', onBlur: function onBlur() {
                        return _this3.closeDropdown();
                    } },
                React.createElement(
                    'div',
                    { className: 'dropdown_header', onClick: function onClick() {
                            return _this3.toggle();
                        } },
                    value
                ),
                React.createElement(
                    'ul',
                    { className: 'dropdown_body' },
                    dropdownBody
                )
            );
        }
    }]);
    return Dropdown;
}(React$1.Component);

Dropdown.propTypes = {
    value: React$1.PropTypes.node.isRequired,
    activeIndex: React$1.PropTypes.number,
    onIndexChange: React$1.PropTypes.func,
    onOpen: React$1.PropTypes.func,
    showActive: React$1.PropTypes.bool
};

/**
 * @description
 * MhButton is a *button* and should be handled with a function from the outside
 * Possible variant are in the constants
 *
 * @example
 * 1) variant: default
 *  <MhButton onClick={()=>console.log("click")} enabled={true}>
 *      Button text
 *  </MhButton>
 *
 * 2) variant: festive
 *  <MhButton variant={"festive"} onClick={()=>console.log("click")} enabled={true}>
 *      Button text festive
 *  </MhButton>
 *
 * @param {Function} [onClick] callback for clicking the button (when enabled)
 * @param {boolean} [enabled=true] pass false to disable the button, default is true
 * @param {"festive"} [variant] one of the sizes from the constants
 * @param {"xsmall"|"small"|"medium"|"large"} [size="medium"] one of the sizes from the constants
 * @param {boolean} [primary=false] is transparent with border, default to false
 * @param {boolean} [rounded] override the variant's default behaviour
 * @param {Array|Object} [children]
 *
 */
function MhButton(_ref) {
    var _onClick = _ref.onClick,
        enabled = _ref.enabled,
        variant = _ref.variant,
        size = _ref.size,
        primary = _ref.primary,
        rounded = _ref.rounded,
        children = _ref.children;

    return React.createElement(
        'button',
        {
            onClick: function onClick(e) {
                return enabled !== false && _onClick && _onClick(e);
            },
            className: getClass(variant, primary, rounded, size) + (enabled === false ? ' disabled' : '') },
        children
    );
}

function getClass(variant, primary, rounded, size) {
    return MH_BUTTON_BASE_CLASS + ' ' + getVariantClass(variant, primary) + getRoundedClass(rounded) + getSizeClass(size);
}

/**
 * @param {string} variant
 * @param {boolean} primary
 * @returns {string}
 */
function getVariantClass(variant, primary) {
    var className = MH_BUTTON_TYPE_BASE_CLASS;
    if (variant) {
        className += '_' + variant;
    }
    if (primary === true) {
        className += '_' + MH_BUTTON_PRIMARY;
    } else {
        className += '_' + MH_BUTTON_NOT_PRIMARY;
    }
    return className;
}

/**
 * @param {boolean} rounded
 * @returns {string}
 */
function getRoundedClass(rounded) {
    var className = '';
    if (rounded === false) {
        className += ' ' + MH_BUTTON_NOT_ROUNDED;
    } else if (rounded === true) {
        className += ' ' + MH_BUTTON_ROUNDED;
    }
    return className;
}

/**
 * @param {string} size
 * @returns {string}
 */
function getSizeClass(size) {
    var className = '';
    if (size) {
        className += ' ' + MH_BUTTON_SIZE_BASE_CLASS + '_' + size;
    }
    return className;
}

MhButton.propTypes = {
    variant: React$1.PropTypes.oneOf(VARIANTS),
    primary: React$1.PropTypes.bool,
    size: React$1.PropTypes.oneOf(SIZES),
    rounded: React$1.PropTypes.bool,
    enabled: React$1.PropTypes.bool,
    onClick: React$1.PropTypes.func
};

/**
 * @description
 * A button to be used as the dropdown value prop
 * will add a nice triangle to the button indicating a drop down, with an animation for opening
 *
 * Receives the same props as MhButton
 *
 * @example
 * <DropdownButton>
 *     Inner text
 * </DropdownButton>
 *
 * @param {Function} [onClick] callback for clicking the button (when enabled)
 * @param {boolean} [enabled=true] pass false to disable the button, default is true
 * @param {"festive"} [variant] one of the sizes from the constants
 * @param {"xsmall"|"small"|"medium"|"large"} [size="medium"] one of the sizes from the constants
 * @param {boolean} [primary=false] is transparent with border, default to false
 * @param {boolean} [rounded] override the variant's default behaviour
 * @param {Array|Object} [children]
 */
function DropdownButton(props) {
  return React.createElement(
    'div',
    { className: 'dropdown_button_wrapper' },
    React.createElement(MhButton, props)
  );
}

/**
 * @description
 * PaymentMethodSelector - Displays radio buttons to select between payment methods main options (like Credit Card / PayPal) to Other payment methods (like UnionPay, Qiwi Wallet)
 *
 * @example
 * 1) <PaymentMethodSelector mainOptions={[{"id": "credit_card", "name": "Credit Card"}, {"id": "paypal", "name": "Paypal"}]}
 *                           otherOptions={[{"id": "free", "name": "Free"}, {"id": "qiwiwallet", "name": "Qiwi Wallet"}]} otherOptionsTitle='Other payment methods' />
 * *
 * @param {Array} [mainOptions] array of objects {id, name}, will be displayed as radio button with text
 * @param {Array} [otherOptions] array of objects {id, name}, will be displayed in dropdown component
 * @param {String} [otherOptionsTitle] title for the other options dropdown (translated)
 * @param {Function} [onChange] callback for when an option is selected
 *
 */

var PaymentMethodSelector = function (_Component) {
    inherits(PaymentMethodSelector, _Component);

    /**
     * @param {Object} props
     */
    function PaymentMethodSelector(props) {
        classCallCheck(this, PaymentMethodSelector);

        var _this = possibleConstructorReturn(this, (PaymentMethodSelector.__proto__ || Object.getPrototypeOf(PaymentMethodSelector)).call(this, props));

        var otherOptionsTitle = props.otherOptionsTitle;
        _this.state = { selectedMainOption: {}, selectedOtherOption: _.extend({}, OTHER_OPTION, { name: otherOptionsTitle }) };
        if (props.mainOptions && props.mainOptions.length > 0) {
            _this.state.selectedMainOption = props.mainOptions[0];
            _this.onChangeCallback(_this.state.selectedMainOption);
        }
        return _this;
    }

    /**
     * update state with the selected main option
     * @param {Object} mainOption
     */


    createClass(PaymentMethodSelector, [{
        key: 'handleMainOptionChange',
        value: function handleMainOptionChange(mainOption) {
            this.setState({ selectedMainOption: mainOption });
            var selectedOption = mainOption;
            if (mainOption.id === OTHER_OPTION.id) {
                selectedOption = this.state.selectedOtherOption;
            }
            this.onChangeCallback(selectedOption);
        }
    }, {
        key: 'handleOtherOptionChange',
        value: function handleOtherOptionChange(otherOption) {
            this.setState({ selectedMainOption: OTHER_OPTION, selectedOtherOption: otherOption });
        }

        /**
         * On change callback
         * @param {Object} selectedOption
         */

    }, {
        key: 'onChangeCallback',
        value: function onChangeCallback(selectedOption) {
            if (this.props.onChange) {
                this.props.onChange(selectedOption.id);
            }
        }

        /**
         * Render a radio button with text
         * @param {Object} mainOption
         */

    }, {
        key: 'renderMainOption',
        value: function renderMainOption(mainOption) {
            var _this2 = this;

            return React.createElement(
                'label',
                { key: mainOption.id, className: 'main_option_item' },
                React.createElement('input', { type: 'radio', className: 'main_option_radio',
                    value: mainOption.id,
                    checked: this.state.selectedMainOption.id === mainOption.id,
                    onChange: function onChange() {
                        return _this2.handleMainOptionChange(mainOption);
                    } }),
                React.createElement(
                    'span',
                    { className: 'main_option_name' },
                    mainOption.name
                )
            );
        }
    }, {
        key: 'renderOtherOptions',
        value: function renderOtherOptions() {
            var _this3 = this;

            var otherOptions = this.props.otherOptions || [];
            var otherOptionsElements = otherOptions.map(function (otherOption) {
                return React.createElement(
                    'div',
                    { key: otherOption.id, 'data-automations': 'option-' + otherOption.id },
                    otherOption.name
                );
            });
            var otherButtonValue = this.state.selectedOtherOption.name;
            return React.createElement(
                'label',
                { key: OTHER_OPTION.id, className: 'main_option_item' },
                React.createElement('input', { type: 'radio', className: 'main_option_radio',
                    value: OTHER_OPTION.id,
                    checked: this.state.selectedMainOption.id === OTHER_OPTION.id,
                    onChange: function onChange() {
                        return _this3.handleMainOptionChange(OTHER_OPTION);
                    } }),
                React.createElement(
                    Dropdown,
                    { value: React.createElement(
                            DropdownButton,
                            BUTTON_PROPS,
                            otherButtonValue
                        ),
                        onIndexChange: function onIndexChange(index) {
                            return _this3.handleOtherOptionChange(_this3.props.otherOptions[index]);
                        } },
                    otherOptionsElements
                )
            );
        }

        /**
         * Render
         */

    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _props = this.props,
                mainOptions = _props.mainOptions,
                otherOptions = _props.otherOptions;

            var mainOptionsElements = mainOptions && mainOptions.length > 0 ? mainOptions.map(function (mainOption) {
                return _this4.renderMainOption(mainOption);
            }) : null;
            var otherOptionsElement = otherOptions && otherOptions.length > 0 ? this.renderOtherOptions() : null;
            return React.createElement(
                'div',
                { className: 'payment_method_selector' },
                mainOptionsElements,
                otherOptionsElement
            );
        }
    }]);
    return PaymentMethodSelector;
}(React$1.Component);

PaymentMethodSelector.propTypes = {
    mainOptions: React$1.PropTypes.arrayOf(React$1.PropTypes.shape({
        id: React$1.PropTypes.string,
        name: React$1.PropTypes.string
    })),
    otherOptions: React$1.PropTypes.arrayOf(React$1.PropTypes.shape({
        id: React$1.PropTypes.string,
        name: React$1.PropTypes.string
    })),
    otherOptionsTitle: React$1.PropTypes.string,
    onChange: React$1.PropTypes.func
};

var SIDE_TOP$1 = 'top';
var SIDE_BOTTOM$1 = 'bottom';
var ALIGNMENT_CENTER$1 = 'center';
var ALIGNMENT_START$1 = 'start';
var ALIGNMENT_END$1 = 'end';

var SIDE_TOP$$1 = SIDE_TOP$1;
var SIDE_BOTTOM$$1 = SIDE_BOTTOM$1;
var SIDES = [SIDE_TOP$$1, SIDE_BOTTOM$$1];

var ALIGNMENT_CENTER$$1 = ALIGNMENT_CENTER$1;
var ALIGNMENT_START$$1 = ALIGNMENT_START$1;
var ALIGNMENT_END$$1 = ALIGNMENT_END$1;
var ALIGNMENTS = [ALIGNMENT_CENTER$$1, ALIGNMENT_START$$1, ALIGNMENT_END$$1];

var TRIGGER_EVENT_CLICK = 'click';
var TRIGGER_EVENT_HOVER = 'hover';
var TRIGGER_EVENTS = [TRIGGER_EVENT_CLICK, TRIGGER_EVENT_HOVER];

/**
 * @description
 * Tooltip to be shown on hover or click events.
 * Wrap children to give them the tooltip upon them.
 *
 * Consider using the AutoLocationTooltip instead of directly using tooltip
 *
 * Note: the ".tooltip_wrapper" element is "display:block" by default,
 * you may want to override this in your stylesheet if relevant
 *
 * @example
 * 1) Top side tooltip
 * <Tooltip tooltip={'tooltip inner text!'} side="top" alignment="start" trigger="hover">
 *     <span>Text to open the tooltip upon</span>
 * </Tooltip>
 *
 * 2) Bottom side tooltip
 * <Tooltip tooltip={'tooltip inner text!'} side="bottom" alignment="start">
 *     <span>Text to open the tooltip upon</span>
 * </Tooltip>
 *
 * @param {*} [tooltip] tooltip inner content, can be text or elements
 * @param {"top"|"bottom"} [side="top"] the placements of the tooltip relative to the element
 * @param {"center"|"start"|"end"} [alignment="center"] the alignment of the tooltip relative to the element
 * @param {"click"|"hover"} [trigger="click"] trigger event, on mobile you should stick with click
 * @param {Function} [onTooltipOpen] callback for when the tooltip is opened
 * @param {Function} [onAfterTooltipOpen] callback for after the tooltip is opened
 * @param {Object} [children] the element/s to be triggering the tooltip appearance
 *
 */

var Tooltip = function (_Component) {
    inherits(Tooltip, _Component);

    function Tooltip(props) {
        classCallCheck(this, Tooltip);

        var _this = possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this, props));

        _this.state = { showTooltip: false };
        return _this;
    }

    /**
     * This is called when a props/state is changed and allow us to do some callback calling based on rules
     * @param {Object} nextProps
     * @param {Object} nextState
     */


    createClass(Tooltip, [{
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {
            if (this.props.onTooltipOpen && !this.state.showTooltip && nextState.showTooltip) {
                this.props.onTooltipOpen();
            }
        }

        /**
         * Hook for after an update
         * @param prevProps
         * @param prevState
         */

    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (this.props.onAfterTooltipOpen && !prevState.showTooltip && this.state.showTooltip) {
                this.props.onAfterTooltipOpen();
            }
        }

        /**
         * @returns {Object}
         */

    }, {
        key: 'getEventHandlers',
        value: function getEventHandlers() {
            var _this2 = this,
                _ref;

            var eventTriggerShow = void 0,
                eventTriggerHide = void 0;
            if (this.props.trigger === TRIGGER_EVENT_HOVER) {
                eventTriggerShow = 'onMouseOver';
                eventTriggerHide = 'onMouseLeave';
            } else {
                eventTriggerShow = 'onClick';
                eventTriggerHide = 'onBlur';
            }
            return _ref = {}, defineProperty(_ref, eventTriggerShow, function (e) {
                return _this2.setState({ showTooltip: true });
            }), defineProperty(_ref, eventTriggerHide, function (e) {
                return _this2.setState({ showTooltip: false });
            }), _ref;
        }

        /**
         * Render
         */

    }, {
        key: 'render',
        value: function render() {
            var tooltipSide = this.props.side || SIDE_TOP$$1;
            var tooltipAlignment = this.props.alignment || ALIGNMENT_CENTER$$1;
            var extraClasses = this.props.className ? ' ' + this.props.className : '';
            // tooltip must be wrapped in padded element for the hiding function (e.g onBlur) to not happen when moving the cursor
            // from outside the children to the tooltip_text
            var tooltip = this.state.showTooltip && this.props.tooltip ? React.createElement(
                'div',
                { className: 'tooltip_spacing_wrapper side_' + tooltipSide + ' alignment_' + tooltipAlignment + extraClasses },
                React.createElement(
                    'div',
                    { className: 'tooltip_body' },
                    this.props.tooltip
                )
            ) : null;
            var eventHandlers = this.getEventHandlers();

            return (// tab index is needed for the onBlur event to work
                React.createElement(
                    'div',
                    _extends({ className: 'tooltip_wrapper' }, eventHandlers, { tabIndex: '0' }),
                    tooltip,
                    this.props.children
                )
            );
        }
    }]);
    return Tooltip;
}(React$1.Component);

Tooltip.propTypes = {
    tooltip: React$1.PropTypes.node,
    side: React$1.PropTypes.oneOf(SIDES),
    alignment: React$1.PropTypes.oneOf(ALIGNMENTS),
    trigger: React$1.PropTypes.oneOf(TRIGGER_EVENTS),
    onTooltipOpen: React$1.PropTypes.func,
    onAfterTooltipOpen: React$1.PropTypes.func
};

var wrapperClassTemplate = function wrapperClassTemplate(gender, ageGroup) {
    return 'profile_photo gender_' + gender + ' age_group_' + ageGroup + ' style_circle';
};
var silhouetteClassTemplate = function silhouetteClassTemplate(gender, ageGroup) {
    return 'svg_silhouette svg_silhouette_' + gender + '_' + ageGroup;
};
var BORDER_LENGTH = 4;

/**
 * @description
 * Component for displaying profile photos
 *
 * @example
 * <ProfilePhoto photoUrl="http://vignette2.wikia.nocookie.net/rickandmorty/images/1/1e/Rick_and_morty_icon.png/revision/latest?cb=20150805041642"
 *    ageGroup="A"
 *    gender="M"
 *    size={96}/>
 *
 * @param {"M"|"F"|"U"} [gender="U"] The gender ("M" for male, "F" for female, "U" for Unknown).
 * @param {"A"|"C"} [ageGroup="A"] The age group ("A" for Adult, "C" for Child).
 * @param {String} [photoUrl] The photo url
 * @param {String|Number} [size=96] The photo size (width and height) - for example "100%", "83px" or simply 83. Int will be treated as pixels.
 *
 */
function ProfilePhoto(_ref) {
    var _ref$gender = _ref.gender,
        gender = _ref$gender === undefined ? 'U' : _ref$gender,
        _ref$ageGroup = _ref.ageGroup,
        ageGroup = _ref$ageGroup === undefined ? 'A' : _ref$ageGroup,
        photoUrl = _ref.photoUrl,
        _ref$size = _ref.size,
        size = _ref$size === undefined ? 96 : _ref$size;

    var sizeCss = typeof size === 'string' ? size : size + 'px';
    var photoSizeCss = typeof size === 'string' ? size - BORDER_LENGTH + 'px' : '100%';
    var wrapperClass = wrapperClassTemplate(gender, ageGroup);
    var silhouetteClass = silhouetteClassTemplate(gender, ageGroup);

    var wrapperStyle = {
        width: sizeCss,
        height: sizeCss
    };
    var photoStyle = {
        width: photoSizeCss,
        height: photoSizeCss,
        backgroundImage: photoUrl ? 'url(' + photoUrl + ')' : undefined
    };

    var photoElement = React.createElement('div', { className: photoUrl ? 'actual_photo' : silhouetteClass,
        style: photoStyle });

    return React.createElement(
        'div',
        { className: 'profile_photo_wrapper ' + wrapperClass, style: wrapperStyle },
        photoElement
    );
}

ProfilePhoto.propTypes = {
    photoUrl: React$1.PropTypes.string,
    size: React$1.PropTypes.oneOfType([React$1.PropTypes.string, React$1.PropTypes.number]),
    ageGroup: React$1.PropTypes.string,
    gender: React$1.PropTypes.string
};

var DEFAULT_PHOTO_SIZE = 96;

/**
 * @description Component for showing profile details card
 *
 * Children can be any component that uses DetailProperty for example:
 *
 * @example
 * <ProfileDetails name="Zvi Aaronsohn"
 *                 photoUrl='http://i.imgur.com/FeQU8rB.gif'
 *                 ageGroup="A"
 *                 gender="M">
 *         <DetailProperty value="1st cousin 3 times removed"/>
 *         <DetailProperty value="1876 - 1929"/>
 *         <CountryProperty field="From" countryCode="US"/>
 * </ProfileDetails>
 *
 *
 * @param {node} name The name of the individual
 * @param {String} [photoUrl] The url of the profile photo
 * @param {String} [ageGroup='A'] The individual's age group
 * @param {String} [gender="U"] The individual's gender
 * @param {Number} [photoSize=96] The photo size to display(square)
 * @param {React.Children} [children]

 */
function ProfileDetails(_ref) {
    var name = _ref.name,
        photoUrl = _ref.photoUrl,
        ageGroup = _ref.ageGroup,
        gender = _ref.gender,
        children = _ref.children,
        _ref$photoSize = _ref.photoSize,
        photoSize = _ref$photoSize === undefined ? DEFAULT_PHOTO_SIZE : _ref$photoSize;

    var childrenWrappers = React$1.Children.map(children, function (currChild) {
        return !!currChild ? React.createElement(
            "div",
            { className: "profile_detail_item" },
            currChild
        ) : null;
    });

    return React.createElement(
        "div",
        { className: "profile_details" },
        React.createElement(
            "div",
            { className: "profile_photo_container" },
            React.createElement(ProfilePhoto, { photoUrl: photoUrl,
                ageGroup: ageGroup,
                gender: gender,
                size: photoSize })
        ),
        React.createElement(
            "div",
            { className: "profile_details_container" },
            React.createElement(
                "h5",
                { className: "profile_name", "data-automations": "ProfileDetailsName" },
                name
            ),
            childrenWrappers
        )
    );
}

ProfileDetails.propTypes = {
    name: React$1.PropTypes.node.isRequired,
    photoUrl: React$1.PropTypes.string,
    ageGroup: React$1.PropTypes.string,
    gender: React$1.PropTypes.string,
    photoSize: React$1.PropTypes.number
};

var ALIGNMENT_ALIGN = 'align';

var ALIGNMENTS$1 = [ALIGNMENT_ALIGN];

/**
 * @description Component for showing a general detail property
 *
 * @example
 * 1) simple use
 * <DetailProperty field="From" value="USA"/>
 *
 * 2) Alignment - align
 * <DetailProperty field="Birth" value="1988" alignment="align" />
 *
 * @param {string} [field] The field to show on the property
 * @param {any} [value] The element to show in the value(could be JSX)
 * @param {"align"} [alignment] alignment style of the properties, providing an alignment will eliminate the ':" after the field name
 *
 */
function DetailProperty(_ref) {
    var field = _ref.field,
        value = _ref.value,
        alignment = _ref.alignment;

    var alignmentClassName = alignment ? ' alignment_' + alignment : '';
    var fieldSuffix = !alignmentClassName ? ':' : '';
    var fieldElement = field ? React.createElement(
        'span',
        { className: 'detail_field' },
        '' + field + fieldSuffix,
        '\xA0'
    ) : null;

    return value ? React.createElement(
        'div',
        { className: 'detail_property' + alignmentClassName },
        fieldElement,
        React.createElement(
            'span',
            { className: 'detail_value' },
            value
        )
    ) : null;
}

DetailProperty.propTypes = {
    field: React$1.PropTypes.string,
    value: React$1.PropTypes.node,
    alignment: React$1.PropTypes.oneOf(ALIGNMENTS$1)
};

/**
 * @description
 * IndividualDetails Component that shows profile details with some links
 *
 * @example
 *  <IndividualDetails name="Daniel Demidov"
 *                     individualId={133732342}
 *                     ageGroup="C"
 *                     gender="F"
 *                     relationship="Your mother"
 *                     lifeSpan="0 - 1337"
 *                     treeId=""
 *                     actions={[{'text': "View in tree", "link": "http://www.google.com"}, {'text': "View profile", "link": "http://www.google.com"}, {'text': "View records", "link": "http://www.google.com"}]}
 *                     photoUrl="https://pbs.twimg.com/profile_images/758948164497833985/nSjHep7V.jpg">
 *  </IndividualDetails>
 *
 * @param {String} name The name of the individual
 * @param {String} [photoUrl] The url of the profile photo
 * @param {String} [ageGroup='A'] The individual's age group
 * @param {String} [gender="U"] The individual's gender
 * @param {String} relationship The individual's relationship to the site manager
 * @param {String} lifeSpan The individual's life span
 * @param {Array} actions Action links to show under the profile details
 * @param {React.Children} [children]
 *
 */
function IndividualDetails(_ref) {
    var name = _ref.name,
        photoUrl = _ref.photoUrl,
        ageGroup = _ref.ageGroup,
        gender = _ref.gender,
        relationship = _ref.relationship,
        lifeSpan = _ref.lifeSpan,
        actions = _ref.actions,
        children = _ref.children;

    var actionLinks = actions && actions.map(function (_ref2, index) {
        var text = _ref2.text,
            link = _ref2.link;
        return React.createElement(
            "a",
            { className: "action_link", key: text, href: link },
            React.createElement(
                "span",
                { className: "action_text" },
                text
            )
        );
    });

    return React.createElement(
        ProfileDetails,
        { name: name,
            photoUrl: photoUrl,
            ageGroup: ageGroup,
            gender: gender },
        React.createElement(DetailProperty, { value: relationship }),
        React.createElement(DetailProperty, { value: lifeSpan }),
        children,
        React.createElement(
            "div",
            { className: "individual_actions" },
            actionLinks
        )
    );
}

IndividualDetails.propTypes = {
    name: React$1.PropTypes.string.isRequired,
    photoUrl: React$1.PropTypes.string,
    ageGroup: React$1.PropTypes.string,
    gender: React$1.PropTypes.string,
    photoSize: React$1.PropTypes.number,
    relationship: React$1.PropTypes.string,
    lifeSpan: React$1.PropTypes.string,
    actions: React$1.PropTypes.arrayOf(React$1.PropTypes.shape({
        text: React$1.PropTypes.string,
        link: React$1.PropTypes.string
    }))
};

/**
 * @description
 * IndividualCallout Component that shows profile details with some links in a callout
 *
 * @example
 *  <IndividualCallout name="Daniel Demidov"
 *                     individualId={133732342}
 *                     ageGroup="C"
 *                     gender="F"
 *                     relationship="Your mother"
 *                     lifeSpan="0 - 1337"
 *                     treeId=""
 *                     actions={[{'text': "View in tree", "link": "http://www.google.com"}, {'text': "View profile", "link": "http://www.google.com"}, {'text': "View records", "link": "http://www.google.com"}]}
 *                     photoUrl="https://pbs.twimg.com/profile_images/758948164497833985/nSjHep7V.jpg">
 *  </IndividualCallout>
 *
 * @param {String} name The name of the individual
 * @param {String} [photoUrl] The url of the profile photo
 * @param {String} [ageGroup='A'] The individual's age group
 * @param {String} [gender="U"] The individual's gender
 * @param {String} relationship The individual's relationship to the site manager
 * @param {String} lifeSpan The individual's life span
 * @param {Array}  actions Action links to show under the profile details
 * @param {"click"|"hover"} [trigger="click"] trigger event, on mobile you should stick with click
 * @param {Function} [onCalloutOpen] callback for when the tooltip is opened
 * @param {React.Children} [children]
 *
 */
function IndividualCallout(props) {
    var trigger = props.trigger,
        name = props.name,
        onCalloutOpen = props.onCalloutOpen;

    var individualDetails = React.createElement(IndividualDetails, props);

    return React.createElement(
        Tooltip,
        { className: "individual_callout",
            tooltip: individualDetails,
            trigger: trigger,
            onTooltipOpen: function onTooltipOpen() {
                return onCalloutOpen;
            } },
        name
    );
}

IndividualDetails.propTypes = {
    name: React$1.PropTypes.string.isRequired,
    photoUrl: React$1.PropTypes.string,
    ageGroup: React$1.PropTypes.string,
    gender: React$1.PropTypes.string,
    photoSize: React$1.PropTypes.number,
    relationship: React$1.PropTypes.string,
    lifeSpan: React$1.PropTypes.string,
    actions: React$1.PropTypes.arrayOf(React$1.PropTypes.shape({
        text: React$1.PropTypes.string,
        link: React$1.PropTypes.string
    })),
    onCalloutOpen: React$1.PropTypes.func,
    trigger: React$1.PropTypes.string
};

/**
 * Calculate location object for an element around a certain "zone" (represented by another element)
 * The returned location object includes side & alignment from possible constants in "locationConstants"
 *
 * @param {HTMLElement} element
 * @param {HTMLElement} zoneElement
 * @param {String} [preferredSide]
 * @param {String} [preferredAlignment]
 * @param {Number} [spacing]
 * @param {Object} [_window]
 * @returns {{side: String, alignment: String}}
 */
function getLocationForElementAroundZone(element, zoneElement) {
    var preferredSide = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : SIDE_TOP$1;
    var preferredAlignment = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ALIGNMENT_CENTER$1;
    var spacing = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    var _window = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : window;

    var newLocation = {
        side: preferredSide,
        alignment: preferredAlignment
    };

    if (element && zoneElement) {
        var rectProperties = getRectProperties(element);
        var zoneRectProperties = getRectProperties(zoneElement);
        var isRtl = _window.languageDirection === 'RTL';

        newLocation.side = getBestSide(rectProperties, zoneRectProperties, _window.innerHeight, spacing, preferredSide);
        newLocation.alignment = getBestAlignment(rectProperties, zoneRectProperties, _window.innerWidth, isRtl, spacing, preferredAlignment);
    }

    return newLocation;
}

/**
 * Check for the best side possible, regarding the preferred side and the available sides
 * @param {Object} rectProperties
 * @param {Object} zoneRectProperties
 * @param {Number} screenHeight
 * @param {Number} spacing
 * @param {String} preferredSide
 * @returns {String}
 */
function getBestSide(rectProperties, zoneRectProperties, screenHeight, spacing, preferredSide) {
    var canGoTop = zoneRectProperties.y - rectProperties.height - spacing > 0;
    var canGoBottom = zoneRectProperties.y2 + rectProperties.height + spacing < screenHeight;

    var side = preferredSide;
    // when both sides are available - use the preferred side
    if (canGoTop && !canGoBottom) {
        side = SIDE_TOP$1;
    }
    if (!canGoTop && canGoBottom) {
        side = SIDE_BOTTOM$1;
    }

    return side;
}

/**
 * Check for the best alignment possible, takes preferred alignment if possible
 * @param {Object} rectProperties
 * @param {Object} zoneRectProperties
 * @param {Number} screenWidth
 * @param {boolean} isRtl
 * @param {Number} spacing
 * @param {String} preferredAlignment
 * @returns {String}
 */
function getBestAlignment(rectProperties, zoneRectProperties, screenWidth, isRtl, spacing, preferredAlignment) {
    var alignment = preferredAlignment;
    var zoneCenter = (zoneRectProperties.x + zoneRectProperties.x2) / 2;
    var canGoCenter = zoneCenter - rectProperties.width / 2 - spacing > 0 && zoneCenter + rectProperties.width / 2 - spacing < screenWidth;
    var canGoStart = zoneRectProperties.x + rectProperties.width + spacing < screenWidth;
    var canGoEnd = zoneRectProperties.x2 - rectProperties.width - spacing > 0;

    // Switch start & end for RTL
    if (isRtl) {
        var _ref = [canGoEnd, canGoStart];
        canGoStart = _ref[0];
        canGoEnd = _ref[1];
    }

    // collect all alignments possibilities
    var possibleAlignments = [];
    if (canGoCenter) {
        possibleAlignments.push(ALIGNMENT_CENTER$1);
    }
    if (canGoStart) {
        possibleAlignments.push(ALIGNMENT_START$1);
    }
    if (canGoEnd) {
        possibleAlignments.push(ALIGNMENT_END$1);
    }

    // take preferred alignment (which is the default), if not possible - take the first one possible
    if (!_.contains(possibleAlignments, preferredAlignment) && possibleAlignments.length > 0) {
        alignment = possibleAlignments[0];
    }

    return alignment;
}

/**
 * Returns BoundingClientRect with width/height values
 * @param {HTMLElement} el
 * @returns {Object}
 */
function getRectProperties() {
    var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var props = {};
    if (el.getBoundingClientRect) {
        var rect = el.getBoundingClientRect();
        props = {
            x: rect.left,
            y: rect.top,
            x2: rect.right,
            y2: rect.bottom,
            width: rect.right - rect.left,
            height: rect.bottom - rect.top
        };
    }

    return props;
}

var SPACING = 5;

/**
 * @description
 * An auto-location version of the Tooltip. Responsive solution to the tooltip.
 * See Tooltip for more information - it uses the same props
 *
 * @example
 * <AutoLocationTooltip tooltip={'tooltip inner text!'} side="top" alignment="start" trigger="hover">
 *     <span>Text to open the tooltip upon</span>
 * </Tooltip>
 *
 * @param {*} [tooltip] tooltip inner content, can be text or elements
 * @param {"top"|"bottom"} [side="top"] preferred placement of the tooltip relative to the element
 * @param {"center"|"start"|"end"} [alignment="center"] preferred alignment of the tooltip relative to the element
 * @param {"click"|"hover"} [trigger="click"] trigger event, on mobile you should stick with click
 * @param {Function} [onTooltipOpen] callback for when the tooltip is opened
 * @param {Function} [onAfterTooltipOpen] callback for after the tooltip is opened
 * @param {Object} [children] the element/s to be triggering the tooltip appearance
 */

var AutoLocationTooltip = function (_Component) {
    inherits(AutoLocationTooltip, _Component);

    function AutoLocationTooltip(props) {
        classCallCheck(this, AutoLocationTooltip);

        var _this = possibleConstructorReturn(this, (AutoLocationTooltip.__proto__ || Object.getPrototypeOf(AutoLocationTooltip)).call(this, props));

        _this.state = {
            side: props.side || SIDE_TOP$$1,
            alignment: props.alignment || ALIGNMENT_CENTER$$1
        };
        return _this;
    }

    /**
     * Save dom element for calculating its location on tooltip body opening
     */


    createClass(AutoLocationTooltip, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.tooltipElement = ReactDOM.findDOMNode(this.tooltipRef);
        }

        /**
         * Fix the location (side & alignment) of the tooltip body around the tooltip element
         * Based on possible sides & alignments. Provided props is considered the preferred outcome, if possible they will be returned
         */

    }, {
        key: "updateTooltipLocation",
        value: function updateTooltipLocation() {
            // tooltip body exist in the DOM only after the tooltip is being opened
            var tooltipBody = this.tooltipElement ? this.tooltipElement.querySelector('.tooltip_body') : null;
            if (tooltipBody) {
                var preferredSide = this.props.side || SIDE_TOP$$1;
                var preferredAlignment = this.props.alignment || ALIGNMENT_CENTER$$1;
                var newState = getLocationForElementAroundZone(tooltipBody, this.tooltipElement, preferredSide, preferredAlignment, SPACING);

                // setState only if there is a change from the current state
                if (newState && (this.state.side !== newState.side || this.state.alignment !== newState.alignment)) {
                    this.setState(newState);
                }
            }
        }

        /**
         * Render
         */

    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            // extend the onAfterTooltipOpen hook with the autoLocation actions
            var currentOnAfterTooltipOpen = this.props.onAfterTooltipOpen;
            var onAfterTooltipOpen = function onAfterTooltipOpen() {
                _this2.updateTooltipLocation();
                currentOnAfterTooltipOpen && currentOnAfterTooltipOpen();
            };

            // Set the new side & alignment from the state
            var tooltipProps = _.extend({}, this.props, {
                onAfterTooltipOpen: onAfterTooltipOpen,
                side: this.state.side,
                alignment: this.state.alignment
            });

            return React.createElement(Tooltip, _extends({}, tooltipProps, { ref: function ref(_ref) {
                    return _this2.tooltipRef = _ref;
                } }));
        }
    }]);
    return AutoLocationTooltip;
}(React$1.Component);

AutoLocationTooltip.propTypes = Tooltip.propTypes;

var VARIANT_SIZE_SMALL = 'small';
var VARIANT_SIZE_MEDIUM = 'medium';
var VARIANT_SIZE_LARGE = 'large';
var VARIANTS$1 = [VARIANT_SIZE_SMALL, VARIANT_SIZE_MEDIUM, VARIANT_SIZE_LARGE];

var NUMBER_OF_LINES = 12; // need to change in the stylesheet accordingly
var BOX_DIM = 64; // height & width dimensions for the SVG view box
var LINE_Y1 = 14; // spacing radius from the center
var LINE_Y2 = 28; // length of the lines
// the width of the lines is determined in the stylesheet by the stroke-width

/**
 * get the transform for the SVG line values
 * @param {number} index
 * @returns {string}
 */
function getLineTransformValue(index) {
  return 'translate(' + BOX_DIM / 2 + ',' + BOX_DIM / 2 + ') rotate(' + index * 360 / NUMBER_OF_LINES + ')';
}

/**
 * @return {number}
 */
function getLineY1() {
  return LINE_Y1;
}

/**
 * @return {number}
 */
function getLineY2() {
  return LINE_Y2;
}

/**
 * @return {string}
 */
function getSvgViewBox() {
  return '0 0 ' + BOX_DIM + ' ' + BOX_DIM;
}

/**
 * @description
 * Common spinner animation by SVG + CSS (no JS animations at all)
 *
 * @example
 * 1) variant: default - medium
 *      <Spinner enabled={true}/>
 *
 * 2) variant: small
 *      <Spinner variant="small" enabled={true}/>
 *
 * 3) variant: large
 *      <Spinner variant="large" enabled={true}/>
 *
 * @param {"small"|"medium"|"large"} [variant] style variant from the constants of this component
 * @param {boolean} [enabled=false] whether the spinner will be visible and spinning

 */
function Spinner(_ref) {
    var variant = _ref.variant,
        enabled = _ref.enabled;

    var lines = getLines(),
        svgBoxDim = getSvgViewBox();
    return React.createElement(
        'div',
        { className: 'spinner_wrapper' + (variant ? ' ' + variant : '') + (enabled ? ' enabled' : ''), 'data-automations': 'spinner' },
        React.createElement(
            'svg',
            { viewBox: svgBoxDim },
            React.createElement(
                'g',
                null,
                lines
            )
        )
    );
}

/**
 * Get the lines for the Spinner
 * @returns {Array}
 */
function getLines() {
    var lines = [],
        y1 = getLineY1(),
        y2 = getLineY2();
    for (var i = 0; i < NUMBER_OF_LINES; i++) {
        lines.push(React.createElement('line', { key: i, y1: y1, y2: y2, transform: getLineTransformValue(i) }));
    }
    return lines;
}

Spinner.propTypes = {
    variant: React$1.PropTypes.oneOf(VARIANTS$1),
    enabled: React$1.PropTypes.bool
};

var VARIANT_SPACING_SMALL = 'small';
var VARIANT_SPACING_MEDIUM = 'medium';
var VARIANT_SPACING_LARGE = 'large';
var VARIANTS$2 = [VARIANT_SPACING_SMALL, VARIANT_SPACING_MEDIUM, VARIANT_SPACING_LARGE];

/**
 * @description
 * Separator
 * The generic separator to be used between components
 *
 * @example
 * 1) variant: default - medium
 * <PrimarySeparator />
 *
 * 2) variant:
 * <PrimarySeparator variant="small" />
 *
 * @param {"small"|"medium"|"large"} [variant] - variant from this component constants
 * @param {Array} [children]
 *
 */
function PrimarySeparator(_ref) {
    var variant = _ref.variant,
        children = _ref.children;

    return React.createElement(
        'div',
        { className: 'primary_separator' + (variant ? ' separator_' + variant : '') },
        children
    );
}

PrimarySeparator.propTypes = {
    variant: React$1.PropTypes.oneOf(VARIANTS$2)
};

/**
 * Helper function for extracting the url for a Photo object received from a Family Graph call
 * @param {{thumbnails: {url: String}[]}} photo of the kind FG_Model_MediaItem_Photo
 * @param {String|null} defaultValue
 * @returns {String|null}
 */
function extractPhotoUrl() {
    var photo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var photoUrl = defaultValue;
    if (photo && photo.thumbnails && photo.thumbnails[0]) {
        photoUrl = photo.thumbnails[0].url;
    }
    return photoUrl;
}

/**
 * This extends an object with a given service to a field name on its prototype
 * @param {Object} objectToExtend
 * @param {String} fieldName
 * @param {Function|Object|*} service
 */
var objectExtender = function (objectToExtend, fieldName, service) {
  objectToExtend.prototype[fieldName] = service;
};

/**
 * A translator service. Enables getting a key and a category and return the translated value.
 */
var Translator = function () {
    /**
     * @param {{string: {}}} categories List of available categories to choose from
     * @param {Console} logger Can be any logger, i.e. ConsoleReporter
     * @param {string} userGender M or F
     * @param {string=} defaultCategory Default category to check in this service unless overridden
     */
    function Translator(categories, logger, userGender) {
        var defaultCategory = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
        classCallCheck(this, Translator);

        this.categories = categories;
        this.logger = logger;
        this.userGender = userGender;
        this.defaultCategory = defaultCategory;
    }

    /**
     * @param {string} key The key to translate
     * @param {string=} categoryName A category to lookup the translation from. Defaults to the given category name in the constructor
     * @param {boolean=} checkGender When truthy, fallbacks to a gender aware string if could not find the requested translation
     * @returns {string} The value if found. If not, returns the given key as a fallback (will add gender aware to returned key if checkGender is truthy)
     */


    createClass(Translator, [{
        key: 'translate',
        value: function translate(key) {
            var categoryName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.defaultCategory;
            var checkGender = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            var value = key;
            var category = this.categories[categoryName];
            if (!category) {
                this.logger.warn('Category ' + categoryName + ' does not exist! categories are:', this.categories);
            } else if (category[key]) {
                // found the string
                value = category[key];
            } else if (checkGender) {
                // maybe the string is gender aware
                value = this.translateGender(key, categoryName);
            } else {
                // no such key found!
                this.logger.warn('Could not find key "' + key + '" in ' + categoryName, category);
            }

            return value;
        }

        /**
         * @param {string} key The key to translate
         * @param {string=} categoryName A category to lookup the translation from. Defaults to the given category name in the constructor
         * @param {object|Array} values An object that holds key-value translation values to replace OR an array that hold values that replace %1 %2 ...
         * @param {boolean=} checkGender When truthy, fallbacks to a gender aware string if could not find the requested translation
         * @returns {string} The value if found. If not, returns the given key as a fallback (will add gender aware to returned key if checkGender is truthy)
         */

    }, {
        key: 'translateValues',
        value: function translateValues(key) {
            var categoryName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.defaultCategory;
            var values = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var checkGender = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

            var translation = this.translate(key, categoryName, checkGender);

            // Run over each of the value keys and replace it with it's value
            if (_.isArray(values)) {
                for (var index = values.length; index > 0; index--) {
                    // need to traverse from end to start so that %11 is replaced before %1
                    // to eliminate catching %1 in %11
                    translation = translation.replace(new RegExp('%' + index, 'gm'), values[index - 1]);
                }
            } else {
                _.each(values, function (currValue, currKey) {
                    return translation = translation.replace(new RegExp('{' + currKey + '}', 'gm'), currValue);
                });
            }

            return translation;
        }

        /**
         * @param {string} key The key to translate
         * @param {string=} categoryName A category to lookup the translation from. Defaults to the given category name in the constructor
         * @returns {string} The value if found. If not, returns the given key with the user gender as a fallback
         */

    }, {
        key: 'translateGender',
        value: function translateGender(key) {
            var categoryName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.defaultCategory;

            return this.translate(key + ' ' + this.userGender, categoryName, false);
        }
    }]);
    return Translator;
}();

/** @type {Translator} translator singleton */
var translator = null;

/**
 * Object to extend with the translator service
 * This is a singleton that will be provided
 * @param {Translator} _translator
 */
function setTranslator(_translator) {
  translator = _translator;
}

/**
 * @returns {Translator}
 */
function getTranslator() {
  return translator;
}

/**
 * Object to extend with the translator service
 * @param {Object} objectToExtend
 */
function translatorExtend(objectToExtend) {
  objectExtender(objectToExtend, 'getTranslator', getTranslator);
}

var MAX_SITES_TO_SHOW = 3;

/**
 * @description
 * Show a Family Graph User model profile details
 * Usually be used in a Callout
 * Providing functions will allow the relevant call to actions, e.g provide onContact to have contact button, provide onInvite for invite, etc.
 * Note: make sure you provides "show_age" & "is_public" fields for correct fields/links
 *
 * @example
 * <MemberDetails user={{
 *      "id": "user-504896175",
 *      "name": "Noam El",
 *      "personal_photo": {
 *          "thumbnails": [{
 *              "url":"https://aboutme.imgix.net/background/users/n/o/a/noam.elboim_1465657839_61.jpg"
 *          }]
 *      },
 *      "gender": "M",
 *      "age_group": "A",
 *      "age_group_in_years": "20`s",
 *      "show_age": true,
 *      "link": "https://www.myheritage.com/member-504896175_1/noam-el",
 *      "is_public": true,
 *      "default_individual": {
 *          "id": "individual-235341227-1500003",
 *          "relationship": {
 *              "relationship_description": "This is you"
 *          },
 *          "link_in_tree": "https://www.myheritage.com/site-family-tree-235341227/el?rootIndivudalID=1500003&familyTreeID=1"
 *      },
 *      "memberships": {
 *          "data": [
 *              {
 *                  "site": {
 *                      "id": "site-235341227",
 *                      "name": "El Web Site1",
 *                      "link": "https://www.myheritage.com/site-235341227/el"
 *                  }
 *              },
 *              {
 *                  "site": {
 *                      "id": "site-235341228",
 *                      "name": "El Web Site2",
 *                      "link": "https://www.myheritage.com/site-235341228/el"
 *                  }
 *              },
 *              {
 *                  "site": {
 *                      "id": "site-235341229",
 *                      "name": "El Web Site3",
 *                      "link": "https://www.myheritage.com/site-235341229/el"
 *                  }
 *              },
 *              {
 *                  "site": {
 *                      "id": "site-235341230",
 *                      "name": "El Web Site4",
 *                      "link": "https://www.myheritage.com/site-235341230/el"
 *                  }
 *              }
 *          ]
 *      }
 * }} />
 *
 * @param {Object} user Family Graph User model
 * @param {Function} [onSiteView] function to handle when clicked to view site, will receive the url
 * @param {Function} [onAllSitesView] function to handle when clicked to view all sites, will receive the url
 * @param {Function} [viewProfile] function to handle when clicked to view profile, will receive the url
 * @param {Function} [viewTree] function to handle when clicked to view tree, will receive the url
 * @param {Function} [onInvite] function to handle when clicked to invite member
 * @param {Function} [onContact] function to handle when clicked to contact member
 * @param {Function} [onLoad] function to handle callout loading
 * @param {String} [contactSubject] contact subject to be overridden when contacting through this callout
 * @param {String} [contactPaywallReason] contact transaction scenario to be overridden when contacting through this callout
 * @param {String} [invitePaywallContext] invite transaction scenario to be overridden when inviting through this callout
 */

var MemberDetails = function (_Component) {
    inherits(MemberDetails, _Component);

    function MemberDetails() {
        classCallCheck(this, MemberDetails);
        return possibleConstructorReturn(this, (MemberDetails.__proto__ || Object.getPrototypeOf(MemberDetails)).apply(this, arguments));
    }

    createClass(MemberDetails, [{
        key: 'componentDidMount',

        /**
         * Component load successfully
         */
        value: function componentDidMount() {
            this.props.onLoad && this.props.onLoad();
        }

        /**
         * Set this user membership sites
         * Will only show first 3, and after 3 will show a "View all sites" link
         * @param {{data:Array}} memberships
         * @param {Function} onSiteView
         * @param {Function} onAllSitesView
         */

    }, {
        key: 'renderMemberSites',
        value: function renderMemberSites() {
            var memberships = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var onSiteView = arguments[1];
            var onAllSitesView = arguments[2];

            var translator = this.getTranslator();
            var sites = [];
            var userSitesNumber = memberships && memberships.data && memberships.data.length ? memberships.data.length : 0;

            if (userSitesNumber > 0) {
                sites = memberships.data.slice(0, MAX_SITES_TO_SHOW).map(function (membership) {
                    return membership.site ? React.createElement(
                        'a',
                        { className: 'member_site', key: membership.site.id,
                            onClick: function onClick() {
                                return onSiteView && onSiteView(membership.site.link);
                            } },
                        membership.site.name
                    ) : null;
                });
            }

            // should show view all sites
            if (userSitesNumber > MAX_SITES_TO_SHOW) {
                sites.push(React.createElement(
                    'a',
                    { className: 'member_all_sites', key: 'all-sites', onClick: function onClick() {
                            return onAllSitesView();
                        } },
                    translator.translate('NC View all sites', 'NewCallout')
                ));
            }
            return sites;
        }

        /**
         * Set this user special links for Viewing profile page and tree.
         * @param {String} [profileUrl]
         * @param {String} [treeUrl]
         * @param {Function} viewProfile
         * @param {Function} viewTree
         */

    }, {
        key: 'renderLinks',
        value: function renderLinks(profileUrl, treeUrl, viewProfile, viewTree) {
            var translator = this.getTranslator();
            var viewProfileLabel = translator.translate('NC View profile', 'NewCallout');
            var viewTreeLabel = translator.translate('NC View tree', 'NewCallout');
            return profileUrl || treeUrl ? React.createElement(
                'div',
                { className: 'member_details_links' },
                profileUrl && React.createElement(
                    'a',
                    { onClick: function onClick() {
                            return viewProfile && viewProfile(profileUrl);
                        } },
                    viewProfileLabel
                ),
                treeUrl && React.createElement(
                    'a',
                    { onClick: function onClick() {
                            return viewTree && viewTree(treeUrl);
                        } },
                    viewTreeLabel
                )
            ) : null;
        }

        /**
         * Render the bottom section where user can contact or invite
         * @param {Function} [onInvite]
         * @param {Function} [onContact]
         * @param {String} [contactSubject]
         * @param {String} [contactPaywallReason]
         * @param {String} [invitePaywallContext]
         */

    }, {
        key: 'renderBottom',
        value: function renderBottom(onInvite, onContact, contactSubject, contactPaywallReason, invitePaywallContext) {
            var translator = this.getTranslator();
            var inviteLabel = translator.translate('NC Invite', 'NewCallout');
            var contactLabel = translator.translate('NC Contact', 'NewCallout');
            return onInvite || onContact ? React.createElement(
                'div',
                { className: 'member_details_bottom' },
                onInvite && React.createElement(
                    'div',
                    { className: 'invite_member' },
                    React.createElement(
                        MhButton,
                        { size: SIZE_XSMALL, primary: true, onClick: function onClick() {
                                return onInvite(invitePaywallContext);
                            } },
                        React.createElement(
                            'span',
                            { 'data-automations': 'invite_button' },
                            inviteLabel
                        )
                    )
                ),
                onContact && React.createElement(
                    'div',
                    { className: 'contact_member' },
                    React.createElement(
                        MhButton,
                        { size: SIZE_XSMALL, onClick: function onClick() {
                                return onContact(contactSubject, contactPaywallReason);
                            } },
                        React.createElement(
                            'span',
                            { 'data-automations': 'contact_button' },
                            contactLabel
                        )
                    )
                )
            ) : null;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                user = _props.user,
                onContact = _props.onContact,
                onInvite = _props.onInvite,
                onSiteView = _props.onSiteView,
                onAllSitesView = _props.onAllSitesView,
                viewProfile = _props.viewProfile,
                viewTree = _props.viewTree,
                contactSubject = _props.contactSubject,
                contactPaywallReason = _props.contactPaywallReason,
                invitePaywallContext = _props.invitePaywallContext;

            var translator = this.getTranslator();
            var profileDetailsProps = {
                name: user.name,
                ageGroup: user.ageGroup,
                gender: user.gender,
                photoUrl: extractPhotoUrl(user.personal_photo)
            };
            var profileUrl = user.link && user.is_public ? user.link : null;
            var individual = user.default_individual || {};
            var relationship = individual.relationship && individual.relationship.relationship_description ? individual.relationship.relationship_description : null;
            var treeUrl = individual.link_in_tree || null;
            var age = user.age_group_in_years && user.show_age ? user.age_group_in_years : null;
            var ageLabel = translator.translateValues('NC Age label', 'NewCallout', { age: age });
            var sites = this.renderMemberSites(user.memberships, onSiteView, function () {
                return profileUrl && onAllSitesView && onAllSitesView(profileUrl);
            });
            var links = this.renderLinks(profileUrl, treeUrl, viewProfile, viewTree);
            var bottomDetails = this.renderBottom(onInvite, onContact, contactSubject, contactPaywallReason, invitePaywallContext);

            return React.createElement(
                'div',
                { className: 'member_details_wrapper' },
                React.createElement(
                    'div',
                    { className: 'member_details_content' },
                    React.createElement(
                        ProfileDetails,
                        profileDetailsProps,
                        React.createElement(
                            'div',
                            { className: 'member_details_inner' },
                            React.createElement(
                                'div',
                                { className: 'member_details_main_properties' },
                                relationship && React.createElement(DetailProperty, { value: relationship }),
                                age && React.createElement(DetailProperty, { value: ageLabel }),
                                sites
                            ),
                            links
                        )
                    )
                ),
                !!bottomDetails && React.createElement(PrimarySeparator, { variant: VARIANT_SPACING_SMALL }),
                bottomDetails
            );
        }
    }]);
    return MemberDetails;
}(React$1.Component);

translatorExtend(MemberDetails);

MemberDetails.propTypes = {
    user: React$1.PropTypes.object.isRequired,
    onSiteView: React$1.PropTypes.func,
    onAllSitesView: React$1.PropTypes.func,
    viewProfile: React$1.PropTypes.func,
    viewTree: React$1.PropTypes.func,
    onInvite: React$1.PropTypes.func,
    onContact: React$1.PropTypes.func,
    onLoad: React$1.PropTypes.func,
    contactSubject: React$1.PropTypes.string,
    contactPaywallReason: React$1.PropTypes.string,
    invitePaywallContext: React$1.PropTypes.string
};

/**
 * @description
 * ModalLayout is a classic layout for the modal, displaying header, body and footer.
 *
 * @example
 * 1)
 *  <ModalLayout header={'Header'} body={'Body'} footerContent={'Footer Content'} footerButtons={'Footer Buttons'} />
 *
 * @param {Object} [header] The modal header
 * @param {Object} [body] The modal body
 * @param {Object} [footerContent] The modal footer
 * @param {Object} [footerButtons] The modal footer buttons
 * @param {Function} [onCloseClicked] callback for closing the modal
 * @param {Array|Object} [children]
 *
 */

var ModalLayout = function (_Component) {
    inherits(ModalLayout, _Component);

    function ModalLayout() {
        classCallCheck(this, ModalLayout);
        return possibleConstructorReturn(this, (ModalLayout.__proto__ || Object.getPrototypeOf(ModalLayout)).apply(this, arguments));
    }

    createClass(ModalLayout, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                { className: 'modal_layout' },
                React.createElement(
                    'div',
                    { className: 'modal_header' },
                    React.createElement(
                        'button',
                        { type: 'button', className: 'close', 'aria-label': 'Close',
                            onClick: function onClick() {
                                return _this2.props.close();
                            } },
                        React.createElement(
                            'span',
                            { 'aria-hidden': 'true' },
                            '\xD7'
                        )
                    ),
                    React.createElement(
                        'h1',
                        null,
                        this.props.header
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'modal_body' },
                    this.props.body,
                    this.props.children
                ),
                React.createElement(
                    'div',
                    { className: 'modal_footer' },
                    React.createElement(
                        'div',
                        { className: 'modal_footer_content' },
                        this.props.footerContent
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal_footer_buttons' },
                        this.props.footerButtons
                    )
                )
            );
        }
    }]);
    return ModalLayout;
}(React$1.Component);

ModalLayout.propTypes = {
    header: React$1.PropTypes.node,
    body: React$1.PropTypes.node,
    footerContent: React$1.PropTypes.node,
    footerButtons: React$1.PropTypes.node
};

var SIZE_MEDIUM$1 = 'medium';
var SIZE_LARGE$1 = 'large';
var SIZES$1 = [SIZE_MEDIUM$1, SIZE_LARGE$1];

var BODY_CLASS_NAME = 'modal-open';

/**
 * Add class name from element
 * @param {HTMLElement} element
 * @param {String} className
 */
function addClassName(element, className) {
    if (isValidElement$1(element)) {
        element.classList.add(className);
    }
}

/**
 * Remove class name from element
 * @param {HTMLElement} element
 * @param {String} className
 */
function removeClassName(element, className) {
    if (isValidElement$1(element)) {
        element.classList.remove(className);
    }
}

/**
 * @param {String} className
 * @param {Object} _document
 */
function addClassNameToBody(className) {
    var _document = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    addClassName(_document.body, className);
}

/**
 * @param {String} className
 * @param {Object} _document
 */
function removeClassNameFromBody(className) {
    var _document = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    removeClassName(_document.body, className);
}

/**
 * Check if this is a valid
 * @param element
 * @returns {boolean}
 */
function isValidElement$1() {
    var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    return element && !!element.classList;
}

/**
 * @description
 * Modal is a generic modal for displaying data, with callback functions for opening and closing the modal, based on React Skylight
 * Use ref with "show" / "close" functions to control the modal
 *
 * @example
 * 1)
 *  <Modal showOverlay={true} closeOnOverlayClicked={true}>
 *      <ModalLayout header={'Header'} body={'Body'} footerContent={'Footer Content'} footerButtons={'Footer Buttons'} />
 *  </Modal>
 *
 * @param {Function} [onCloseClicked] callback for closing the modal
 * @param {Function} [onOverlayClicked] callback for clicking on the modal overlay
 * @param {Function} [afterClose] callback for after closing the modal
 * @param {Function} [afterOpen] callback for after opening the modal
 * @param {Function} [beforeClose] callback for before closing the modal
 * @param {Function} [beforeOpen] callback for before opening the modal
 * @param {boolean} [showOverlay=true] Should show overlay
 * @param {boolean} [closeOnOverlayClicked=true] Should close modal when overlay is clicked
 * @param {boolean} [isShown] Is the modal shown as default mode
 * @param {string} [className] added class name
 * @param {Array|Object} [children]
 */

/**
 * @param {Object} prevState
 * @param {Object} nextState
 */
var isOpening = function isOpening(prevState, nextState) {
    return !prevState.isVisible && nextState.isVisible;
};
/**
 * @param {Object} prevState
 * @param {Object} nextState
 */
var isClosing = function isClosing(prevState, nextState) {
    return prevState.isVisible && !nextState.isVisible;
};

var Modal = function (_Component) {
    inherits(Modal, _Component);

    function Modal(props) {
        classCallCheck(this, Modal);

        var _this = possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

        _this.state = { isVisible: _this.props.isShown };
        return _this;
    }

    /**
     * Call relevant "before" callbacks e.g. beforeOpen and beforeClose when about to update the component
     * @param {Object} nextProps
     * @param {Object} nextState
     */


    createClass(Modal, [{
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {
            if (isOpening(this.state, nextState) && this.props.beforeOpen) {
                this.props.beforeOpen();
            }

            if (isClosing(this.state, nextState) && this.props.beforeClose) {
                this.props.beforeClose();
            }
        }

        /**
         * Update the state according to props, if needed
         * @param {Object} nextProps
         */

    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.isShown !== nextProps.isShown) {
                this.setState({ isVisible: nextProps.isShown });
            }
        }

        /**
         * Call relevant "after" callbacks e.g. afterOpen and afterClose when finished to update the component
         * @param {Object} prevProps
         * @param {Object} prevState
         */

    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (isOpening(prevState, this.state)) {
                this.props.afterOpen && this.props.afterOpen();
                addClassNameToBody(BODY_CLASS_NAME);
            }

            if (isClosing(prevState, this.state)) {
                this.props.afterClose && this.props.afterClose();
                removeClassNameFromBody(BODY_CLASS_NAME);
            }
        }

        /**
         * Show the modal
         */

    }, {
        key: 'show',
        value: function show() {
            this.setState({ isVisible: true });
        }

        /**
         * Close the modal
         */

    }, {
        key: 'close',
        value: function close() {
            this.setState({ isVisible: false });
            if (this.props.onCloseClicked) {
                this.props.onCloseClicked();
            }
        }
    }, {
        key: 'onOverlayClicked',
        value: function onOverlayClicked() {
            if (this.props.closeOnOverlayClicked) {
                this.close();
            }

            if (this.props.onOverlayClicked) {
                this.props.onOverlayClicked();
            }
        }

        /**
         * Copy relevant callbacks to children
         */

    }, {
        key: 'copyCallbacksToChildren',
        value: function copyCallbacksToChildren() {
            var _this2 = this;

            return React$1.Children.map(this.props.children, function (child, i) {
                if (React$1.isValidElement(child) && typeof child.type === 'function') {
                    child = React$1.cloneElement(child, { close: function close() {
                            return _this2.close();
                        }, key: 'modal_children_' + i });
                }
                return child;
            });
        }

        /**
         * Returns the modal class name
         * @return {string}
         */

    }, {
        key: 'getClassName',
        value: function getClassName() {
            var className = 'modal_wrapper medium_modal';
            if (this.props.size) {
                className = 'modal_wrapper ' + this.props.size + '_modal';
            }
            if (this.props.className) {
                className += ' ' + this.props.className;
            }

            return className;
        }

        /**
         * Render
         */

    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var isVisible = this.state.isVisible;


            var overlay = void 0;
            if (this.props.showOverlay) {
                overlay = React.createElement('div', { className: 'modal_overlay', onClick: function onClick() {
                        return _this3.onOverlayClicked();
                    } });
            }

            var processedChildren = this.copyCallbacksToChildren();
            var className = this.getClassName();

            return isVisible ? React.createElement(
                'section',
                { className: className },
                overlay,
                React.createElement(
                    'div',
                    { className: 'modal_dialog' },
                    processedChildren
                )
            ) : null;
        }
    }]);
    return Modal;
}(React$1.Component);

Modal.propTypes = {
    afterClose: React$1.PropTypes.func,
    afterOpen: React$1.PropTypes.func,
    beforeClose: React$1.PropTypes.func,
    beforeOpen: React$1.PropTypes.func,
    onCloseClicked: React$1.PropTypes.func,
    onOverlayClicked: React$1.PropTypes.func,
    showOverlay: React$1.PropTypes.bool,
    closeOnOverlayClicked: React$1.PropTypes.bool,
    isShown: React$1.PropTypes.bool,
    size: React$1.PropTypes.oneOf(SIZES$1),
    className: React$1.PropTypes.string
};

/**
 * @description
 * Show an invite member modal.
 * The modal will not show automatically. In order to show the modal, add a ref={ref => {this.inviteMemberModal = ref} attribute
 * and call this.inviteMemberModal.show()
 *
 * @example
 * <InviteMemberModal memberName={"Haim Saban"} onInvite={() => alert('PowerRangers')} />
 *
 * @param {String} memberName name of member to invite
 * @param {Function} onInvite callback to execute when clicking the invite button
 * @param {boolean} [isShown]
 */

var InviteMemberModal = function (_Component) {
    inherits(InviteMemberModal, _Component);

    function InviteMemberModal() {
        classCallCheck(this, InviteMemberModal);
        return possibleConstructorReturn(this, (InviteMemberModal.__proto__ || Object.getPrototypeOf(InviteMemberModal)).apply(this, arguments));
    }

    createClass(InviteMemberModal, [{
        key: 'show',


        /**
         * Show the modal
         */
        value: function show() {
            this.modal && this.modal.show();
        }

        /**
         * Render the invite member section
         */

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var translator = this.getTranslator(),
                isShown = this.props.isShown;


            return React.createElement(
                Modal,
                { showOverlay: true, closeOnOverlayClicked: true, isShown: isShown, ref: function ref(modal) {
                        return _this2.modal = modal;
                    } },
                React.createElement(ModalLayout, { header: translator.translateValues('Invite member callout title', 'NewCallout', {}), body: React.createElement(
                        'div',
                        null,
                        translator.translateValues('invite individual to be a member of your family site', 'NewCallout', { member_full_name: this.props.memberName })
                    ), footerButtons: React.createElement(
                        'div',
                        null,
                        React.createElement(
                            MhButton,
                            { primary: true, onClick: function onClick() {
                                    return _this2.modal.close();
                                } },
                            translator.translate('NC Cancel', 'NewCallout')
                        ),
                        React.createElement(
                            MhButton,
                            { onClick: function onClick() {
                                    _this2.props.onInvite && _this2.props.onInvite();_this2.modal.close();
                                } },
                            translator.translate('Confirm', 'NewCallout')
                        )
                    ) })
            );
        }
    }]);
    return InviteMemberModal;
}(React$1.Component);

translatorExtend(InviteMemberModal);

InviteMemberModal.propTypes = {
    memberName: React$1.PropTypes.string,
    onInvite: React$1.PropTypes.func
};

/**
 * @description
 * Show a member Callout by providing an account id of the member wanted
 *
 * Dependencies:
 *  Translations:
 *      'Family' > 'New Callout'
 *  Data:
 *      'getMemberDetailsProperties' function (by memberCalloutFactory.js -> createMemberDetailsGetter)
 *      The override any function/data -> pass it (i.e to replace onLoad received from the factory, pass it as a prop here).
 *
 *      * It is possible to provide all the data from the outside.
 *        To do so - pass all the props, and skip 'getMemberDetailsProperties' function.
 *
 * @example
 * <MemberCallout trigger="hover" alignment="start" side="bottom" user={{
 *      "id": "user-504896175",
 *      "name": "Noam El",
 *      "personal_photo": {
 *          "thumbnails": [{
 *              "url":"https://aboutme.imgix.net/background/users/n/o/a/noam.elboim_1465657839_61.jpg"
 *          }]
 *      },
 *      "gender": "M",
 *      "age_group": "A",
 *      "age_group_in_years": "20`s",
 *      "show_age": true,
 *      "link": "https://www.myheritage.com/member-504896175_1/noam-el",
 *      "is_public": true,
 *      "default_individual": {
 *          "id": "individual-235341227-1500003",
 *          "relationship": {
 *              "relationship_description": "This is you"
 *          },
 *          "link_in_tree": "https://www.myheritage.com/site-family-tree-235341227/el?rootIndivudalID=1500003&familyTreeID=1"
 *      },
 *      "memberships": {
 *          "data": [
 *              {
 *                  "site": {
 *                      "id": "site-235341227",
 *                      "name": "El Web Site1",
 *                      "link": "https://www.myheritage.com/site-235341227/el"
 *                  }
 *              },
 *              {
 *                  "site": {
 *                      "id": "site-235341228",
 *                      "name": "El Web Site2",
 *                      "link": "https://www.myheritage.com/site-235341228/el"
 *                  }
 *              },
 *              {
 *                  "site": {
 *                      "id": "site-235341229",
 *                      "name": "El Web Site3",
 *                      "link": "https://www.myheritage.com/site-235341229/el"
 *                  }
 *              },
 *              {
 *                  "site": {
 *                      "id": "site-235341230",
 *                      "name": "El Web Site4",
 *                      "link": "https://www.myheritage.com/site-235341230/el"
 *                  }
 *              }
 *          ]
 *      }
 * }}>hover to open callout</MemberCallout>
 *
 * @param {String} [memberId] user id to load data on
 * @param {Object} [user] Family Graph User model
 * @param {Function} [getMemberDetailsProperties] function that return a Promise with the MemberDetails, create this function by
 * @param {Function} [onCalloutOpen] callback to indicate the callout was opened
 * @param {"click"|"hover"} [trigger="hover"]
 * @param {"top"|"bottom"} [side="top"] tooltip side
 * @param {"center"|"start"|"end"} [alignment="center"] tooltip alignment
 * @param {Function} [onSiteView] function to handle when clicked to view site, will receive the url
 * @param {Function} [onAllSitesView] function to handle when clicked to view all sites, will receive the url
 * @param {Function} [viewProfile] function to handle when clicked to view profile, will receive the url
 * @param {Function} [viewTree] function to handle when clicked to view tree, will receive the url
 * @param {Function} [onInvite] function to handle when clicked to invite member
 * @param {Function} [onContact] function to handle when clicked to contact member
 * @param {Function} [onLoad] function to handle callout loading
 * @param {String} [contactSubject] contact subject to be overridden when contacting through this callout
 * @param {String} [contactPaywallReason] contact transaction scenario to be overridden when contacting through this callout
 * @param {String} [invitePaywallContext] invite transaction scenario to be overridden when inviting through this callout
 * @param {*} children what to open the callout upon
 */

var MemberCallout = function (_Component) {
    inherits(MemberCallout, _Component);

    function MemberCallout(props) {
        classCallCheck(this, MemberCallout);

        var _this = possibleConstructorReturn(this, (MemberCallout.__proto__ || Object.getPrototypeOf(MemberCallout)).call(this, props));

        _this.state = { memberDetails: null };
        return _this;
    }

    /**
     * Handle Callout opening
     */


    createClass(MemberCallout, [{
        key: 'onCalloutOpen',
        value: function onCalloutOpen() {
            var _this2 = this;

            this.props.onCalloutOpen && this.props.onCalloutOpen();
            if (!this.state.memberDetails) {
                // user has provided data from the outside
                if (this.props.user) {
                    this.setState({ memberDetails: this.props });

                    // data hasn't provided - need to fetch data by member id
                } else if (this.props.getMemberDetailsProperties && this.props.memberId) {

                    // function never rejects - error is handled inside
                    this.props.getMemberDetailsProperties(this.props.memberId).then(function (memberDetails) {
                        _this2.setState({ memberDetails: _.extend(memberDetails, _this2.props) });
                    });
                }
            }
        }

        /**
         * Show the invite modal
         */

    }, {
        key: 'showInviteModal',
        value: function showInviteModal() {
            this.inviteMemberModal.show();
        }

        /**
         * Confirm in the inviteMemberModal
         */

    }, {
        key: 'inviteMemberModalConfirm',
        value: function inviteMemberModalConfirm() {
            this.state.memberDetails.onInvite && this.state.memberDetails.onInvite();
            this.setState({ memberDetails: _.extend({}, this.state.memberDetails, { onInvite: null }) });
        }

        /**
         * Render
         */

    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                _props$trigger = _props.trigger,
                trigger = _props$trigger === undefined ? TRIGGER_EVENT_HOVER : _props$trigger,
                side = _props.side,
                alignment = _props.alignment,
                user = _props.user,
                getMemberDetailsProperties = _props.getMemberDetailsProperties,
                children = _props.children;

            var calloutSpinner = React.createElement(Spinner, { variant: VARIANT_SIZE_MEDIUM, enabled: !this.state.memberDetails });
            var calloutContent = null;
            var modal = null;

            if (this.state.memberDetails) {
                var memberDetailsProps = this.state.memberDetails;
                if (this.state.memberDetails.onInvite) {
                    memberDetailsProps = _.extend({}, memberDetailsProps, { onInvite: function onInvite() {
                            return _this3.showInviteModal();
                        } });
                }
                calloutContent = React.createElement(MemberDetails, memberDetailsProps);
                var memberName = this.state.memberDetails.user ? this.state.memberDetails.user.name : null;
                modal = React.createElement(InviteMemberModal, { memberName: memberName,
                    onInvite: function onInvite() {
                        return _this3.inviteMemberModalConfirm();
                    }, ref: function ref(_ref) {
                        return _this3.inviteMemberModal = _ref;
                    } });
            }

            var shouldRenderCallout = !!user || !!getMemberDetailsProperties;

            // if showing callout, should remove href from child (if children is a single link)
            var processedChildren = children;
            if (React$1.isValidElement(processedChildren) && processedChildren.props && processedChildren.props.href) {
                processedChildren = React$1.cloneElement(processedChildren, { href: '#' });
            }

            return shouldRenderCallout ? React.createElement(
                'span',
                { className: 'member_callout' },
                React.createElement(
                    AutoLocationTooltip,
                    { tooltip: React.createElement(
                            'div',
                            null,
                            calloutSpinner,
                            calloutContent
                        ),
                        trigger: trigger,
                        side: side, alignment: alignment, onTooltipOpen: function onTooltipOpen() {
                            return _this3.onCalloutOpen();
                        } },
                    processedChildren
                ),
                modal
            ) : children;
        }
    }]);
    return MemberCallout;
}(React$1.Component);

MemberCallout.propTypes = {
    memberId: React$1.PropTypes.string,
    getMemberDetailsProperties: React$1.PropTypes.func,
    user: React$1.PropTypes.object,
    trigger: React$1.PropTypes.oneOf(TRIGGER_EVENTS),
    side: React$1.PropTypes.oneOf(SIDES),
    alignment: React$1.PropTypes.oneOf(ALIGNMENTS),
    onCalloutOpen: React$1.PropTypes.func,
    onSiteView: React$1.PropTypes.func,
    onAllSitesView: React$1.PropTypes.func,
    viewProfile: React$1.PropTypes.func,
    viewTree: React$1.PropTypes.func,
    onInvite: React$1.PropTypes.func,
    onContact: React$1.PropTypes.func,
    onLoad: React$1.PropTypes.func,
    contactSubject: React$1.PropTypes.string,
    contactPaywallReason: React$1.PropTypes.string,
    invitePaywallContext: React$1.PropTypes.string
};

var SINGLE_SELECTION = 'single';
var MULTIPLE_SELECTION = 'multiple';
var STATES = [SINGLE_SELECTION, MULTIPLE_SELECTION];

/**
 * @description
 * Accordion - common accordion with default colors
 * use close/open ref functions to close or open a specific panel
 *
 * @example
 * 1) single panel open
 * <Accordion panels={[{"title": "yossi", "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
 *                        {"title": "mai", "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "}]}
 *                        variant="single" hasStyle={true}>
 *  </Accordion>
 *
 * @param {Array} [panels]
 * @param {"single"|"multiple"} [variant]
 * @param {Function} [onChange] callback for change in the accordion, providing index and isOpened arguments
 * @param {boolean} [hasStyle=false]
 */

var Accordion = function (_Component) {
    inherits(Accordion, _Component);

    function Accordion(props) {
        classCallCheck(this, Accordion);

        var _this = possibleConstructorReturn(this, (Accordion.__proto__ || Object.getPrototypeOf(Accordion)).call(this, props));

        _this.state = { openedIndexes: [] };
        return _this;
    }

    /**
     * Toggle the opened index in a multiple-opened mode
     * @param {Number} i
     */


    createClass(Accordion, [{
        key: 'toggleIndex',
        value: function toggleIndex(i) {
            var shouldOpen = !this.state.openedIndexes[i];
            this.changeStateByIndex(i, shouldOpen);
            this.onChange(i, shouldOpen);
        }

        /**
         * Open the accordion's index
         */

    }, {
        key: 'open',
        value: function open(i) {
            this.changeStateByIndex(i, true);
        }

        /**
         * Close the accordion's index
         */

    }, {
        key: 'close',
        value: function close(i) {
            this.changeStateByIndex(i, false);
        }

        /**
         * Chose new state for index
         * @param {Number} i
         * @param {boolean} newValue
         */

    }, {
        key: 'changeStateByIndex',
        value: function changeStateByIndex(i, newValue) {
            var openedIndexes = this.state.openedIndexes.slice();
            var variant = this.props.variant;
            if (variant === SINGLE_SELECTION) {
                openedIndexes = [];
            }
            openedIndexes[i] = newValue;
            this.setState({ openedIndexes: openedIndexes });
        }

        /**
         * On change by toggling from the inside
         * @param {Number} i
         * @param {Boolean} isOpened
         */

    }, {
        key: 'onChange',
        value: function onChange(i, isOpened) {
            if (this.props.onChange) {
                this.props.onChange(i, isOpened);
            }
        }

        /**
         * Get a config for the panel, including the className and the onClick method
         * @param {Number} i
         * @returns {Object}
         */

    }, {
        key: 'getPanelConfig',
        value: function getPanelConfig(i) {
            var _this2 = this;

            return {
                className: this.state.openedIndexes[i] ? 'accordion_opened' : '',
                onClick: function onClick() {
                    return _this2.toggleIndex(i);
                }
            };
        }

        /**
         * Render panel
         * @param {Object} panel
         * @param {Number} i
         */

    }, {
        key: 'renderPanel',
        value: function renderPanel(panel, i) {
            var _getPanelConfig = this.getPanelConfig(i),
                className = _getPanelConfig.className,
                _onClick = _getPanelConfig.onClick;

            return React.createElement(
                'li',
                { key: 'accordion_row_' + i, className: 'accordion_row ' + className },
                React.createElement(
                    'div',
                    { className: 'title', onClick: function onClick() {
                            return _onClick(i);
                        } },
                    panel.title
                ),
                React.createElement(
                    'div',
                    { className: 'content' },
                    panel.content
                )
            );
        }

        /**
         * Render
         */

    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var panels = this.props.panels || [];
            var panelRows = panels.map(function (panel, i) {
                return _this3.renderPanel(panel, i);
            });
            return React.createElement(
                'div',
                { className: 'accordion_wrap' + (this.props.hasStyle ? ' accordion_component' : '') },
                React.createElement(
                    'ul',
                    null,
                    panelRows
                )
            );
        }
    }]);
    return Accordion;
}(React$1.Component);

Accordion.propTypes = {
    panels: React$1.PropTypes.arrayOf(React$1.PropTypes.shape({
        title: React$1.PropTypes.node,
        content: React$1.PropTypes.node
    })),
    variant: React$1.PropTypes.oneOf(STATES),
    hasStyle: React$1.PropTypes.bool,
    onChange: React$1.PropTypes.func
};

var CORNER_BUTTON_BASE_CLASS = 'corner_button';
var CORNER_BUTTON_DEFAULT = 'default'; // this is the common use one
var CORNER_BUTTON_ACTIVE = 'active'; // this is the active state

/**
 * @description
 * CornerButton is a *button* and should be handled with a function from the outside
 *
 * @example
 * 1) default
 *  <CornerButton onClick={()=>console.log("click")} active={false}>
 *      X
 *  </CornerButton>
 *
 *
 * @param {Function} [onClick] callback for clicking the button
 * @param {boolean} [active=false] pass true to reflect active state, default is false
 * @param {Array|Object} [children]
 *
 */
function CornerButton(_ref) {
    var onClick = _ref.onClick,
        active = _ref.active,
        children = _ref.children;

    return React.createElement(
        'div',
        {
            onClick: onClick,
            className: getClass$1(active) },
        React.createElement(
            'div',
            { className: 'corner_button_icon' },
            children
        ),
        React.createElement('div', { className: 'corner_button_triangle ' + (active === true ? CORNER_BUTTON_ACTIVE : '') })
    );
}

function getClass$1(active) {
    return CORNER_BUTTON_BASE_CLASS + ' ' + CORNER_BUTTON_DEFAULT + ' ' + (active === true ? CORNER_BUTTON_ACTIVE : '');
}

CornerButton.propTypes = {
    active: React$1.PropTypes.bool,
    onClick: React$1.PropTypes.func
};

/**
 * @description
 * NoteButton is a corner note *button*
 *
 * @example
 * 1) default
 *  <NoteButton onClick={()=>console.log("click")} />
 *
 *
 * @param {Boolean} [active] is the button active
 * @param {Boolean} [isMobile] is mobile - on mobile the tooltip is disabled
 * @param {Function} [onClick] callback for clicking the button
 *
 */

var NoteButton = function (_Component) {
    inherits(NoteButton, _Component);

    function NoteButton() {
        classCallCheck(this, NoteButton);
        return possibleConstructorReturn(this, (NoteButton.__proto__ || Object.getPrototypeOf(NoteButton)).apply(this, arguments));
    }

    createClass(NoteButton, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                active = _props.active,
                _onClick = _props.onClick,
                isMobile = _props.isMobile;

            var translator = this.getTranslator();
            var notesTextAdd = translator.translate('Add notes', 'DNAMatches');
            var notesTextView = translator.translate('View notes', 'DNAMatches');

            var cornerButton = React.createElement(
                CornerButton,
                { onClick: function onClick() {
                        return _onClick();
                    } },
                React.createElement('div', { className: 'note_icon' })
            );

            if (!isMobile) {
                cornerButton = React.createElement(
                    Tooltip,
                    { tooltip: active ? notesTextView : notesTextAdd,
                        side: SIDE_BOTTOM$$1,
                        alignment: ALIGNMENT_END$$1,
                        trigger: TRIGGER_EVENT_HOVER },
                    cornerButton
                );
            }

            return React.createElement(
                'div',
                { className: 'note_wrapper' + (active ? ' active' : '') },
                cornerButton
            );
        }
    }]);
    return NoteButton;
}(React$1.Component);

translatorExtend(NoteButton);

NoteButton.propTypes = {
    onClick: React$1.PropTypes.func
};

var VARIANT_EXPANDED = 'expanded'; // no side-borders on mobile for a full screen width card
var VARIANTS$3 = [VARIANT_EXPANDED];

/**
 * @description
 * Card with border and box-shadow
 *
 * @example
 * 1) variant: default
 *  <Card>
 *      <CardHeader>
 *          Header
 *      </CardHeader>
 *      <CardRow>
 *          Row 1
 *      </CardRow>
 *      <CardRow>
 *          Row 2
 *      </CardRow>
 *  </Card>
 *
 * 2) variant: expanded - no side-borders on mobile for full width card
 *  <Card variant="expanded">
 *      <CardRow>
 *          Row 1
 *      </CardRow>
 *      <CardRow>
 *          Row 2
 *      </CardRow>
 *  </Card>
 *
 * @param {"expanded"} [variant]
 * @param {String} [className]
 * @param {React.Children} [children]
 *
 */
function Card(_ref) {
    var variant = _ref.variant,
        children = _ref.children,
        className = _ref.className;

    var variantClass = variant ? ' ' + variant : '';
    var additionalClassName = className ? ' ' + className : '';
    return React.createElement(
        'div',
        { className: 'card_wrapper' + variantClass + additionalClassName },
        children
    );
}

Card.propTypes = {
    variant: React$1.PropTypes.oneOf(VARIANTS$3),
    className: React$1.PropTypes.string
};

/**
 * @description
 * Card column, like a table cell.
 * Should be used inside a CardRow component
 * The width will be divided equally between siblings CardCol components
 *
 * Single in a row:
 *  ******************************
 *  *          CardCol           *
 *  ******************************
 *
 * Two in a row:
 *  ******************************
 *  *   CardCol   |   CardCol    *
 *  ******************************
 *
 * Three in a row:
 *  *******************************
 *  * CardCol | CardCol | CardCol *
 *  *******************************
 *
 * @example
 *  <CardCol>
 *      <div>Info here</div>
 *  </CardCol>
 *
 * @param {React.Children} [children]
 *
 */
var CardCol = (function (_ref) {
  var children = _ref.children;
  return React.createElement(
    "div",
    { className: "card_col" },
    children
  );
});

/**
 * @description
 * Card row, like a table row.
 * Should always have at least one CardCol inside of it! content shouldn't be placed immediately as a child
 * between multiple CardRow components there will be added a separator
 *
 * Single in a row:
 *  ******************************
 *  *          CardRow           *
 *  ******************************
 *
 * Two siblings:
 *  ******************************
 *  *          CardRow           *
 *  *----------------------------*
 *  *          CardRow           *
 *  ******************************
 *
 * Three siblings:
 *  ******************************
 *  *          CardRow           *
 *  *----------------------------*
 *  *          CardRow           *
 *  *----------------------------*
 *  *          CardRow           *
 *  ******************************
 *
 * @example
 * <CardRow>
 *      <CardCol>Info here</CardCol>
 *      <CardCol>More info here</CardCol>
 * </CardRow>
 *
 * @param {Array} [children]
 *
 */
var CardRow = (function (_ref) {
  var children = _ref.children;
  return React.createElement(
    "div",
    { className: "card_row" },
    children
  );
});

/**
 * @description
 * Header row for the Card component
 * Acts like a CardRow
 *
 * @example
 * <CardHeader>
 *      <CardCol>Info here</CardCol>
 *      <CardCol>More info here</CardCol>
 * </CardHeader>
 *
 * @param {Array} [children]
 *
 */
function CardHeader(props) {
    return React.createElement(
        'div',
        { className: 'card_header' },
        React.createElement(CardRow, props)
    );
}

/**
 * @description
 * A card that can be closed by clicking on the header
 * A composition of Card & CardHeader components
 * Pass initialIsOpened prop to determine it's initial value open/close
 *
 * Use ref with open/close functions to control its behaviour from the outside
 *
 * @example
 * <CollapsibleCard header="click here to toggle card" initialIsOpened={true}>
 *     <CardRow>
 *         <CardCol>
 *            internals of the card internals of the card internals of the card internals of the card internals of the card internals of the card
 *         </CardCol>
 *     </CardRow>
 *     <CardRow>
 *         <CardCol>
 *            <MhButton>Random Button</MhButton>
 *         </CardCol>
 *     </CardRow>
 * </CollapsibleCard>
 *
 * @param {node} [header]
 * @param {boolean} [initialIsOpened=true]
 * @param {"expanded"} [variant]
 * @param {Function} [onChange]
 * @param {node} [children]
 */

var CollapsibleCard = function (_Component) {
    inherits(CollapsibleCard, _Component);

    function CollapsibleCard(props) {
        classCallCheck(this, CollapsibleCard);

        var _this = possibleConstructorReturn(this, (CollapsibleCard.__proto__ || Object.getPrototypeOf(CollapsibleCard)).call(this, props));

        var isOpened = typeof props.initialIsOpened !== 'undefined' ? props.initialIsOpened : true;
        _this.state = { isOpened: isOpened };
        return _this;
    }

    /**
     * Toggle the card
     */


    createClass(CollapsibleCard, [{
        key: 'toggle',
        value: function toggle() {
            var shouldOpen = !this.state.isOpened;
            this.updateIsOpened(shouldOpen);
            this.props.onChange && this.props.onChange(shouldOpen);
        }

        /**
         * Open the card
         */

    }, {
        key: 'open',
        value: function open() {
            this.updateIsOpened(true);
        }

        /**
         * Close the card
         */

    }, {
        key: 'close',
        value: function close() {
            this.updateIsOpened(false);
        }

        /**
         * Update the isOpedStat
         * @param {boolean} isOpened
         */

    }, {
        key: 'updateIsOpened',
        value: function updateIsOpened(isOpened) {
            this.setState({ isOpened: isOpened });
        }

        /**
         * Render
         */

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                children = _props.children,
                header = _props.header,
                variant = _props.variant;

            var stateClassName = this.state.isOpened ? ' is_opened' : '';

            return React.createElement(
                Card,
                { variant: variant, className: 'collapsible_card' + stateClassName },
                React.createElement(
                    'div',
                    { className: 'collapsible_card_header', onClick: function onClick() {
                            return _this2.toggle();
                        } },
                    React.createElement(
                        CardHeader,
                        null,
                        React.createElement(
                            CardCol,
                            null,
                            React.createElement('span', { className: 'collapsible_chevron' }),
                            header
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'collapsible_card_body' },
                    children
                )
            );
        }
    }]);
    return CollapsibleCard;
}(React$1.Component);

CollapsibleCard.propTypes = {
    header: React$1.PropTypes.node,
    initialIsOpened: React$1.PropTypes.bool,
    variant: React$1.PropTypes.string,
    onChange: React$1.PropTypes.func
};

/**
 * @description
 * Card mixin to wrap all direct children by rows easily
 *
 * A card with three children will looks something like so:
 *  ******************************
 *  *         First row          *
 *  *----------------------------*
 *  *        Second row          *
 *  *----------------------------*
 *  *         Last row           *
 *  ******************************
 *
 * @example
 *  <ColumnsCard>
 *     <div>First row</div>
 *     <div>Second Row</div>
 *     <div>Last row</div>
 *  </ColumnsCard>
 *
 * @param {React.Children} children
 *
 */
var ColumnsCard = (function (_ref) {
    var children = _ref.children;
    return React.createElement(
        Card,
        null,
        React$1.Children.map(children, function (child) {
            return React.createElement(
                CardRow,
                null,
                React.createElement(
                    CardCol,
                    null,
                    child
                )
            );
        })
    );
});

/**
 * @description
 * Card mixin for a split card to your liking.
 * For RTL it will be mirrored, so left -> right and etc.
 *
 * props mapping:
 *
 *  passing only top & bottom:
 *  ******************************
 *  *           top              *
 *  ******************************
 *  *          bottom            *
 *  ******************************
 *
 *  if no top or bottom, it will try to set the left/right props like, so:
 *  ******************************
 *  *   topLeft   *   topRight   *
 *  ******************************
 *  *  bottomLeft  * bottomRight *
 *  ******************************
 *
 *  you can mix between them and get nice visual output:
 *  ******************************
 *  *            top             *
 *  ******************************
 *  *  bottomLeft  * bottomRight *
 *  ******************************
 *
 *  if you pass only one of the specifics, it will get 100% width of the row:
 *  ******************************
 *  *          topLeft           *
 *  ******************************
 *  *  bottomLeft  * bottomRight *
 *  ******************************
 *
 * @example
 * 1) User passed specifics
 *  <SplitCard
 *      topLeft={"top left side"}
 *      topRight={"top right side"}
 *      bottomLeft={"bottom left side"}
 *      bottomRight={"bottom right side"}/>
 *
 * 2) User passed top instead of the top specifics
 *  <SplitCard
 *      top={"top side"}
 *      bottomLeft={"bottom left side"}
 *      bottomRight={"bottom right side"}/>
 *
 * 3) User passed bottom instead of the bottom specifics
 *  <SplitCard
 *      topLeft={"top left side"}
 *      topRight={"top right side"}
 *      bottom={"bottom side"} />
 *
 * 4) User passed bottom/top instead of specifics in both
 *  <SplitCard
 *      top={"top side"}
 *      bottom={"bottom side"} />
 *
 * @param {*} [top]
 * @param {*} [topLeft]
 * @param {*} [topRight]
 * @param {*} [bottom]
 * @param {*} [bottomLeft]
 * @param {*} [bottomRight]
 * @param {Array} [children]
 *
 */
function SplitCard(_ref) {
    var top = _ref.top,
        topLeft = _ref.topLeft,
        topRight = _ref.topRight,
        bottom = _ref.bottom,
        bottomLeft = _ref.bottomLeft,
        bottomRight = _ref.bottomRight,
        children = _ref.children;

    return React.createElement(
        Card,
        null,
        React.createElement(
            CardRow,
            null,
            getSection(top, topLeft, topRight)
        ),
        React.createElement(
            CardRow,
            null,
            getSection(bottom, bottomLeft, bottomRight)
        ),
        children
    );
}

/**
 * Determine which elements to set, upper/bottom or their specifics
 * @param {Object} topOrBottom
 * @param {Object} left
 * @param {Object} right
 * @returns {Array|Object}
 */
function getSection(topOrBottom, left, right) {
    var part = void 0;
    if (topOrBottom) {
        part = React.createElement(
            CardCol,
            null,
            topOrBottom
        );
    } else {
        part = [];
        if (left) {
            part.push(React.createElement(
                CardCol,
                { key: 'left' },
                left
            ));
        }
        if (right) {
            part.push(React.createElement(
                CardCol,
                { key: 'right' },
                right
            ));
        }
    }
    return part;
}

SplitCard.propTypes = {
    top: React$1.PropTypes.node,
    topLeft: React$1.PropTypes.node,
    topRight: React$1.PropTypes.node,
    bottom: React$1.PropTypes.node,
    bottomLeft: React$1.PropTypes.node,
    bottomRight: React$1.PropTypes.node
};

/**
 * @description
 * Card component that have two differentiated halves.
 * The division is only for the background and doesn't actually split the card to 2 different elements
 *
 * @example
 *  <TwoSidesCard>
 *      <CardRow>
 *          Row 1
 *      </CardRow>
 *      <CardRow>
 *          Row 2
 *      </CardRow>
 *  </TwoSidesCard>
 *
 * @param {"expanded"} [variant]
 * @param {React.Children} [children]
 *
 */
function TwoSidesCard(props) {
    return React.createElement(
        'div',
        { className: 'two_sides_card' },
        React.createElement(Card, props)
    );
}

TwoSidesCard.propTypes = {
    variant: React$1.PropTypes.oneOf(VARIANTS$3)
};

/**
 * @description
 * Component for showing circled icon
 *
 * @example
 * <CircledIcon symbol="i" onClick={()=>console.log("click")}/>
 *
 * @param {Function} [onClick] callback for clicking the icon
 * @param {string} [symbol] The icon text
 * @param {"small" | "medium" | "large"} [type] The icon type
 * @param {"primary" | "invert"} [theme] The icon theme
 */
function CircledIcon(_ref) {
    var _onClick = _ref.onClick,
        symbol = _ref.symbol,
        type = _ref.type,
        theme = _ref.theme;

    type = type ? type : 'small';
    theme = theme ? theme : 'primary';

    return React.createElement(
        'div',
        { className: 'circled_icon' + (type ? ' ' + type : '') + (theme ? ' ' + theme : ''),
            onClick: function onClick(e) {
                return _onClick && _onClick(e);
            } },
        symbol
    );
}

CircledIcon.propTypes = {
    symbol: React$1.PropTypes.string
};

var assetsDomain = window.ASSET_DOMAIN_ALIAS_GENERAL || 'd.mhcache.com';

/**
 * @description Service for getting flag icons
 */

var CountryIconService = function () {
  function CountryIconService() {
    classCallCheck(this, CountryIconService);
  }

  createClass(CountryIconService, [{
    key: 'getIconUrl',

    /**
     * Get the flag icon from country code
     * @param {string} countryCode The country's code(Example: US for USA)
     * @returns {string} The country's img url
     */
    value: function getIconUrl(countryCode) {
      return countryCode ? '//' + assetsDomain + '/FP/Assets/Images/Flags/' + countryCode + '.png' : undefined;
    }
  }]);
  return CountryIconService;
}();

/**
 * @description
 * Component for showing country flag icon
 *
 * @example
 * <CountryIcon countryCode="US"/>
 *
 * @param {string} [countryCode] The country code
 *
 */
function CountryIcon(_ref) {
    var countryCode = _ref.countryCode;

    var countryIconUrl = new CountryIconService().getIconUrl(countryCode);

    return React.createElement(
        "span",
        { className: "flag" },
        countryIconUrl && React.createElement("img", { src: countryIconUrl })
    );
}

CountryIcon.propTypes = {
    countryCode: React$1.PropTypes.string
};

/**
 * @description
 * Show information on a certain feature
 * This can be used for a section header for example
 *
 * @example
 *  <FeatureInformation
 *      icon="icon"
 *      title="Smart Matches"
 *      subtitle="We found 7 Smart Matches between you and Jonathan" />
 *
 * @param {*} icon
 * @param {*} title
 * @param {*} subtitle
 * @param {*} [tooltip]
 * @param {Array} [children]
 *
 * Dependencies:
 * In order to show the tooltip, the category Company > Popups (only three strings) should be added to the page
 */

var FeatureInformation = function (_Component) {
    inherits(FeatureInformation, _Component);

    function FeatureInformation() {
        classCallCheck(this, FeatureInformation);
        return possibleConstructorReturn(this, (FeatureInformation.__proto__ || Object.getPrototypeOf(FeatureInformation)).apply(this, arguments));
    }

    createClass(FeatureInformation, [{
        key: 'getTitle',


        /**
         * Returns the title after checking if a circle icon for the tooltip should ba added to it
         * @return {*}
         */
        value: function getTitle() {
            var _this2 = this;

            var title = this.props.title;
            var tooltip = this.props.tooltip;

            if (tooltip) {
                return React.createElement(
                    'div',
                    { className: 'feature_information_title' },
                    React.createElement(
                        'span',
                        null,
                        title
                    ),
                    React.createElement(
                        'span',
                        null,
                        React.createElement(CircledIcon, { onClick: function onClick() {
                                _this2.modal && _this2.modal.show();
                            }, symbol: '?' })
                    )
                );
            } else {
                return React.createElement(
                    'div',
                    { className: 'feature_information_title' },
                    title
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var translator = this.getTranslator();
            var _props = this.props,
                icon = _props.icon,
                title = _props.title,
                subtitle = _props.subtitle,
                tooltip = _props.tooltip,
                children = _props.children;


            return React.createElement(
                'div',
                { className: 'feature_information_wrapper' },
                icon && React.createElement(
                    'div',
                    { className: 'feature_information_icon' },
                    icon
                ),
                (title || subtitle) && React.createElement(
                    'div',
                    { className: 'feature_information' },
                    title && this.getTitle(),
                    subtitle && React.createElement(
                        'div',
                        { className: 'feature_information_subtitle' },
                        subtitle
                    )
                ),
                children,
                title && tooltip && React.createElement(
                    Modal,
                    { showOverlay: true, closeOnOverlayClicked: true, ref: function ref(_ref) {
                            _this3.modal = _ref;
                        } },
                    React.createElement(ModalLayout, {
                        header: title,
                        body: tooltip,
                        footerButtons: React.createElement(
                            MhButton,
                            { onClick: function onClick() {
                                    return _this3.modal && _this3.modal.close();
                                }, primary: true, size: SIZE_SMALL },
                            translator.translate('Close', 'Popups')
                        )
                    })
                )
            );
        }
    }]);
    return FeatureInformation;
}(React$1.Component);

translatorExtend(FeatureInformation);

FeatureInformation.propTypes = {
    icon: React$1.PropTypes.node,
    title: React$1.PropTypes.node,
    subtitle: React$1.PropTypes.node,
    tooltip: React$1.PropTypes.node
};

/**
 * @description
 * Component for showing a note editor
 *
 * @example
 * <NoteEditor saveClick={} placeholder={} test={} />
 *
 * @param {Function} [saveClick] save the note
 * @param {String} [text] the text of the note if exists
 * @param {Boolean} [modal] indicates if to open the editor in a separate modal (e.g. for mobile phones)
 * @param {Boolean} [isMobile] is mobile
 */

var NoteEditor = function (_Component) {
    inherits(NoteEditor, _Component);

    function NoteEditor(props) {
        classCallCheck(this, NoteEditor);

        var _this = possibleConstructorReturn(this, (NoteEditor.__proto__ || Object.getPrototypeOf(NoteEditor)).call(this, props));

        _this.state = { opened: false, saveTextModalOpened: false };
        _this.note_text = _this.note_text_original = props.text ? decodeURIComponent(props.text) : '';
        _this.openInModal = props.modal === true;
        return _this;
    }

    /**
     * Toggle editor
     * @param {Boolean} opened
     */


    createClass(NoteEditor, [{
        key: 'toggleEditor',
        value: function toggleEditor(opened) {
            if (_.isBoolean(opened)) {
                this.setState({ opened: opened });
            } else {
                this.setState({ opened: !this.state.opened });
            }
        }

        /**
         * Close editor
         */

    }, {
        key: 'closeEditor',
        value: function closeEditor() {
            if (this.note_text !== this.note_text_original && !this.props.modal) {
                // open save text modal
                this.setState({ saveTextModalOpened: true });
            } else {
                this.toggleEditor(false);
                this.note_text = this.note_text_original;
            }
        }

        /**
         * Update text
         * @param text
         */

    }, {
        key: 'updateText',
        value: function updateText(text) {
            this.note_text = text;
        }

        /**
         * Close save text modal
         * @param {Object} params
         */

    }, {
        key: 'closeSaveTextModal',
        value: function closeSaveTextModal(params) {
            this.setState({ saveTextModalOpened: false });

            if (params && params.resetEditor) {
                this.toggleEditor(false);
                this.note_text = this.note_text_original;
            }
        }

        /**
         * Save note text
         * @param {String} text
         */

    }, {
        key: 'saveNoteText',
        value: function saveNoteText(text) {
            this.props.saveClick(text);
            this.note_text_original = this.note_text;
        }

        /**
         * Returns the inline note editor markup
         * @return {*}
         */

    }, {
        key: 'getEditor',
        value: function getEditor() {
            var _this2 = this;

            var translator = this.getTranslator();
            var notesHeader = translator.translate('Notes', 'DNAMatches');
            var notePlaceholder = translator.translate('Add your notes here', 'DNAMatches');
            var cancel = translator.translate('Cancel', 'DNAManage');
            var save = translator.translate('Save notes', 'DNAMatches');

            return React.createElement(
                'div',
                { className: 'note_editor' },
                React.createElement(
                    'div',
                    { className: 'header' },
                    notesHeader
                ),
                React.createElement(
                    'div',
                    { className: 'notes_textarea' },
                    React.createElement('textarea', { 'data-automations': 'notes_textarea',
                        maxLength: '2000', rows: '5',
                        disabled: false,
                        placeholder: notePlaceholder,
                        defaultValue: this.note_text,
                        onChange: function onChange(el) {
                            return _this2.updateText(el.target.value);
                        } })
                ),
                React.createElement(
                    'div',
                    { className: 'notes_actions' },
                    React.createElement(
                        MhButton,
                        {
                            onClick: function onClick() {
                                return _this2.closeEditor();
                            },
                            variant: VARIANT_FESTIVE,
                            size: SIZE_XSMALL,
                            primary: true,
                            'data-automations': 'close_note_btn' },
                        cancel
                    ),
                    React.createElement(
                        MhButton,
                        {
                            onClick: function onClick() {
                                return _this2.saveNoteText(_this2.note_text);
                            },
                            variant: VARIANT_FESTIVE,
                            size: SIZE_XSMALL,
                            primary: true },
                        save
                    )
                ),
                React.createElement('div', { className: 'separator' })
            );
        }

        /**
         * Returns the modal note editor markup
         * @return {*}
         */

    }, {
        key: 'getModal',
        value: function getModal() {
            return React.createElement(
                Modal,
                { isShown: true, showOverlay: true, closeOnOverlayClicked: false },
                React.createElement(
                    'div',
                    { className: 'note_editor_modal' },
                    this.getEditor()
                )
            );
        }

        /**
         * Get save text modal buttons
         * @returns {*}
         */

    }, {
        key: 'getSaveTextModalButtons',
        value: function getSaveTextModalButtons() {
            var _this3 = this;

            var translator = this.getTranslator();
            var yesButton = translator.translate('Yes', 'DNAMatches');
            var noButton = translator.translate('No', 'DNAMatches');

            return React.createElement(
                'div',
                null,
                React.createElement(
                    MhButton,
                    {
                        onClick: function onClick() {
                            return _this3.closeSaveTextModal({ resetEditor: true });
                        },
                        variant: VARIANT_FESTIVE,
                        size: SIZE_XSMALL,
                        primary: true,
                        'data-automations': 'close_save_text_modal_btn' },
                    yesButton
                ),
                React.createElement(
                    MhButton,
                    {
                        onClick: function onClick() {
                            return _this3.closeSaveTextModal();
                        },
                        variant: VARIANT_FESTIVE,
                        size: SIZE_XSMALL,
                        primary: false },
                    noButton
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var translator = this.getTranslator();
            var saveTextModalHeader = translator.translate('Discard changes', 'DNAMatches');
            var saveTextModalDescription = translator.translate('Close without saving changes', 'DNAMatches');

            var opened = this.state.opened;
            var openInModal = this.openInModal;
            var saveTextModalOpened = this.state.saveTextModalOpened;

            return React.createElement(
                'div',
                null,
                opened ? openInModal ? this.getModal() : this.getEditor() : null,
                React.createElement(
                    Modal,
                    { isShown: saveTextModalOpened,
                        showOverlay: true,
                        closeOnOverlayClicked: false,
                        onCloseClicked: function onCloseClicked() {
                            return _this4.closeSaveTextModal();
                        } },
                    React.createElement(ModalLayout, {
                        header: saveTextModalHeader,
                        body: saveTextModalDescription,
                        footerButtons: this.getSaveTextModalButtons()
                    })
                )
            );
        }
    }]);
    return NoteEditor;
}(React$1.Component);

translatorExtend(NoteEditor);

NoteEditor.propTypes = {
    saveClick: React$1.PropTypes.func,
    text: React$1.PropTypes.string,
    modal: React$1.PropTypes.bool
};

/**
 * @description
 * Component for showing a text field
 *
 * @example
 * <TextField placeholder="nice!" onChange={() => console.log('very nice!');}/>
 *
 * @param {String} [placeholder] - the placeholder of the text field
 * @param {Function} [onChange]
 */
function TextField(_ref) {
    var placeholder = _ref.placeholder,
        _onChange = _ref.onChange;

    return React.createElement('input', { className: 'text_field',
        type: 'text',
        placeholder: placeholder,
        onChange: function onChange(e) {
            return _onChange(e);
        } });
}

TextField.propTypes = {
    placeholder: React$1.PropTypes.string,
    onChange: React$1.PropTypes.func
};

var VARIANT_TWO_IN_ROW = 'two_in_row';
var VARIANT_TWO_IN_ROW_LAST_EXPANDED = 'two_in_row_last_expanded';
var VARIANTS$4 = [VARIANT_TWO_IN_ROW, VARIANT_TWO_IN_ROW_LAST_EXPANDED];

/**
 * @description
 * Layout for displaying columns or elements
 * Variant can be provided for different behaviours of ordering the columns
 *
 * @example
 * 1) variant: default
 *  <ColumnsLayout>
 *     <ColumnsCard>
 *         <div>Information</div>
 *     </ColumnsCard>
 *     <ColumnsCard>
 *         <div>Information</div>
 *     </ColumnsCard>
 *  </ColumnsLayout>
 *
 * 2) variant: two_in_row - in sm+ screens it will show 2 child in a row as 50%, while the last one, if odd numbered, will be 100% width
 *  <ColumnsLayout variant="two_in_row">
 *     <ColumnsCard>
 *         <div>Information</div>
 *     </ColumnsCard>
 *     <ColumnsCard>
 *         <div>Information</div>
 *     </ColumnsCard>
 *     <ColumnsCard>
 *         <div>Information</div>
 *     </ColumnsCard>
 *  </ColumnsLayout>
 *
 * @param {"two_in_row"|"two_in_row_last_expanded"} [variant] style variant from the constants of this component
 * @param {Array} [children]
 *
 */
function ColumnsLayout(_ref) {
    var variant = _ref.variant,
        children = _ref.children;

    return React.createElement(
        'div',
        { className: 'columns_layout' + (variant ? ' ' + variant : '') },
        children
    );
}

ColumnsLayout.propTypes = {
    variant: React$1.PropTypes.oneOf(VARIANTS$4)
};

var TRANSLATION_CATAGORY = "Countries";

/**
 * @description Component for a country property item with a value of the given country name and flag
 * This component uses DetailProperty
 *
 * @example
 * <CountryProperty field="From" countryCode="US"/>
 *
 * @param {string} [field] The field to show on the property(should be given translated)
 * @param {string} [countryCode] The country's code(The component will translate for you)
 *
 */

var CountryProperty = function (_Component) {
    inherits(CountryProperty, _Component);

    function CountryProperty() {
        classCallCheck(this, CountryProperty);
        return possibleConstructorReturn(this, (CountryProperty.__proto__ || Object.getPrototypeOf(CountryProperty)).apply(this, arguments));
    }

    createClass(CountryProperty, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                field = _props.field,
                countryCode = _props.countryCode;

            var translator = this.getTranslator();
            var valueElement = countryCode ? React.createElement(
                "span",
                { className: "country_property_value" },
                translator.translate(countryCode, TRANSLATION_CATAGORY),
                React.createElement(CountryIcon, { countryCode: countryCode, alt: countryCode })
            ) : null;

            return React.createElement(DetailProperty, { field: field, value: valueElement });
        }
    }]);
    return CountryProperty;
}(React$1.Component);

CountryProperty.propTypes = {
    field: React$1.PropTypes.string,
    countryCode: React$1.PropTypes.string
};

translatorExtend(CountryProperty);

/**
 * @description Component for showing a general detail property
 *
 * @example
 * <LinkProperty field="From" text="Google" link="http://www.google.com"/>
 *
 * @param {string} [field] The field to show on the property
 * @param {node} [text] The text to show in the value
 * @param {string} link The link to redirect when clicking the text
 *
 */
function LinkProperty(_ref) {
    var field = _ref.field,
        text = _ref.text,
        link = _ref.link;

    var linkElement = React.createElement(
        "a",
        { href: link },
        text
    );
    return React.createElement(DetailProperty, { field: field, value: linkElement });
}

LinkProperty.propTypes = {
    field: React$1.PropTypes.string,
    text: React$1.PropTypes.node,
    link: React$1.PropTypes.string
};

var VARIANT_LINK = 'link';
var VARIANT_FESTIVE$1 = 'festive';
var VARIANTS$5 = [VARIANT_LINK, VARIANT_FESTIVE$1];

/**
 * @description
 * Create a blurred version of this text. Pass exposed value as true to disable the blur
 *
 * @example
 * 1) variant: default
 *  <BlurryText>
 *      blurry text here
 *  </BlurryText>
 *
 *  2) variant: link
 *  <BlurryText variant="link">
 *      Link blurry text here
 *  </BlurryText>
 *
 *  3) variant: festive
 *  <BlurryText variant="festive">
 *      Festive blurry text here
 *  </BlurryText>
 *
 * @param {"link"|"festive"} [variant] for different colors of blurry text
 * @param {boolean} [exposed]
 * @param {Array|Object} [children]
 *
 */
function BlurryText(_ref) {
    var variant = _ref.variant,
        exposed = _ref.exposed,
        children = _ref.children;

    var variantClass = variant ? ' ' + variant : '';
    var exposedClass = exposed ? ' exposed' : '';
    return React.createElement(
        'div',
        { className: 'blurry_text' + variantClass + exposedClass },
        children
    );
}

BlurryText.propTypes = {
    variant: React$1.PropTypes.oneOf(VARIANTS$5)
};

var ID_SEPARATOR = '-';

/**
 * Helper function for extracting the account id for a User object received from a Family Graph call
 * @param {{id: String} | Object} user of the kind FG_Model_User
 * @param {String} defaultValue
 * @return {String}
 */
function extractUserId(user) {
    var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    user = user || {};
    return extractCellFromId(user.id, 'user', 1) || defaultValue;
}

/**
 * Helper function for extracting the dna match id for a DnaMatch object received from a Family Graph call
 * @param {{id: String}} dnaMatch of the kind FG_Model_Dna_DnaMatch
 * @param {String} defaultValue
 * @return {String}
 */


/**
 * Helper function for extracting the dna kit id for a DnaKit object received from a Family Graph call
 * @param {{id: String}} dnaKit of the kind FG_Model_Dna_DnaKit
 * @param {String} defaultValue
 * @return {String}
 */


/**
 * Extract a part of the id
 * for example for the id: "user-1234" this will return
 *      extractCellFromId("user-1234", "user", 1) => "1234"
 *      extractCellFromId("user-1234", "individual", 1) => null
 *
 * @param {String} id
 * @param {String} objectType
 * @param {Number} cellIndex
 * @returns {String}
 */
function extractCellFromId() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var objectType = arguments[1];
    var cellIndex = arguments[2];

    var result = null;
    if (id) {
        var idParts = id.split(ID_SEPARATOR);
        if (!objectType || objectType === idParts[0]) {
            result = idParts[cellIndex];
        }
    }
    return result;
}

// components
var BUTTON_PROPS$1 = {
    variant: VARIANT_FESTIVE,
    size: SIZE_SMALL
};

/**
 * @description
 * Contact single or multiple members by providing a list of FamilyGraph User objects
 * Will filter the current logged in user from the contact list if it was received.
 *
 * @example
 * 1) Multiple contact - dropdown button
 * <ContactMatch users={[{"id": "user-111", "name": "Zelda"}, {"id": "user-777", "name": "Link"}]}
 *      currentUserAccountId={'555'}
 *      matchName={"Yossi"}
 *      contactMember={() => console.log('contact')} />
 *
 * 2) single contact - single button
 * <ContactMatch users={[{"id": "user-111", "name": "Zelda"}, {"id": "user-555", "name": "Link"}]}
 *      currentUserAccountId={'555'}
 *      matchName={"Link"}
 *      contactMember={() => console.log('contact')} />
 *
 * @param {Array} users array of Family Graph User objects
 * @param {String} matchName the name of the match which will be in the contact title
 * @param {Function} contactMember the function which will do the actual contacting
 * @param {String} [currentUserAccountId] logged in user account id
 * @param {Number} [contactUpgradeReason] transaction scenario to be passed if user reaches pay wall upon contacting
 */

var ContactMatch = function (_Component) {
    inherits(ContactMatch, _Component);

    function ContactMatch() {
        classCallCheck(this, ContactMatch);
        return possibleConstructorReturn(this, (ContactMatch.__proto__ || Object.getPrototypeOf(ContactMatch)).apply(this, arguments));
    }

    createClass(ContactMatch, [{
        key: 'renderSingleContact',

        /**
         * Render a single contact button for a single contact option
         * @param {Function} onContactByIndex
         * @param {*} contactButtonValue
         */
        value: function renderSingleContact(onContactByIndex, contactButtonValue) {
            return React.createElement(
                MhButton,
                _extends({}, BUTTON_PROPS$1, { onClick: function onClick() {
                        return onContactByIndex(0);
                    } }),
                React.createElement(
                    'span',
                    {
                        'data-automations': 'ContactButton' },
                    contactButtonValue
                )
            );
        }

        /**
         * Render dropdown for multiple contact options
         * @param {Function} onContactByIndex
         * @param {*} contactButtonValue
         * @param {Array} contactUsers
         */

    }, {
        key: 'renderMultipleContact',
        value: function renderMultipleContact(onContactByIndex, contactButtonValue) {
            var contactUsers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

            var translator = this.getTranslator();
            var contactOptions = contactUsers.map(function (contactUser) {
                return React.createElement(
                    'div',
                    { key: 'account-id-' + contactUser.accountId, 'data-automations': 'ContactMatch' },
                    translator.translateValues('Contact with', 'DNAMatches', { contact_name: contactUser.name })
                );
            });
            return React.createElement(
                Dropdown,
                { value: React.createElement(
                        DropdownButton,
                        BUTTON_PROPS$1,
                        React.createElement(
                            'span',
                            { 'data-automations': 'ContactButton' },
                            contactButtonValue
                        )
                    ),
                    onIndexChange: onContactByIndex },
                contactOptions
            );
        }

        /**
         * @param {Function} contactMember
         * @param {Array} contactUsers
         * @param {String} matchName
         * @param {Number} contactUpgradeReason
         * @returns {Function}
         */

    }, {
        key: 'createOnContactByIndex',
        value: function createOnContactByIndex(contactMember, contactUsers, matchName, contactUpgradeReason) {
            var translator = this.getTranslator();
            return function (i) {
                return contactMember && contactMember(contactUsers[i].accountId, translator.translateValues('Contact member subject', 'DNAMatches', { profile_name: matchName }), contactUpgradeReason);
            };
        }

        /**
         * @param {Array} users fg users array
         * @param accountIdsToFilter account ids to remove from the being contacted
         * @returns {Array}
         */

    }, {
        key: 'getContactUsers',
        value: function getContactUsers(users) {
            var accountIdsToFilter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            var idsToFilter = [].concat(accountIdsToFilter);
            var contactUsers = [];

            var _loop = function _loop(i, l) {
                var id = extractUserId(users[i]);
                if (id && _.findIndex(idsToFilter, function (idToFilter) {
                    return idToFilter == id;
                }) === -1) {
                    idsToFilter.push(id);
                    contactUsers.push({ accountId: id, name: users[i].name });
                }
            };

            for (var i = 0, l = users.length; i < l; i++) {
                _loop(i, l);
            }
            return contactUsers;
        }

        /**
         * Render
         */

    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                users = _props.users,
                currentUserAccountId = _props.currentUserAccountId,
                matchName = _props.matchName,
                contactMember = _props.contactMember,
                contactUpgradeReason = _props.contactUpgradeReason;

            var translator = this.getTranslator();
            var contactButtonValue = translator.translateGender('Contact', 'DNAMatches');
            var contactUsers = this.getContactUsers(users, [currentUserAccountId]);
            var onContactByIndex = this.createOnContactByIndex(contactMember, contactUsers, matchName, contactUpgradeReason);
            var singleContact = this.renderSingleContact(onContactByIndex, contactButtonValue);
            var multipleContact = this.renderMultipleContact(onContactByIndex, contactButtonValue, contactUsers);

            return contactUsers.length > 0 ? React.createElement(
                'div',
                { className: 'contact_match_section' },
                contactUsers.length == 1 && singleContact,
                contactUsers.length > 1 && multipleContact
            ) : null;
        }
    }]);
    return ContactMatch;
}(React$1.Component);

translatorExtend(ContactMatch);

ContactMatch.propTypes = {
    users: React$1.PropTypes.array.isRequired,
    matchName: React$1.PropTypes.string.isRequired,
    contactMember: React$1.PropTypes.func,
    currentUserAccountId: React$1.PropTypes.string,
    contactUpgradeReason: React$1.PropTypes.number
};

var VARIANTS$6 = { VARIANT_HIDE_MATCHS: 'hide_matches_list', VARIANT_SHOW_MATCHS: 'show_matches_list' };
var DEFAULT_VARIANT = VARIANTS$6.VARIANT_HIDE_MATCHS;

/**
 * @description Component for showing ethnicity information based on DnaKits
 *
 * @example
 * <EthnicityInfo ethnicitiesCount={5}
 *                mainEthnicityName="Central American"
 *                mainEthnicityPercentage={25}
 *                onEstimateClick={() => this.onEstimateClick()}/>
 *
 * @param {number} [ethnicitiesCount] The number of ethnicities to display
 * @param {string} [mainEthnicityName] The name of the main ethnicity
 * @param {number} [mainEthnicityPercentage] The percentage of the main ethnicity
 * @param {function} [onEstimateClick] The action to call when clicking the estimation button.
 * @param {"festive"} [buttonVariant]
 */

var EthnicityInfo = function (_Component) {
    inherits(EthnicityInfo, _Component);

    function EthnicityInfo() {
        classCallCheck(this, EthnicityInfo);
        return possibleConstructorReturn(this, (EthnicityInfo.__proto__ || Object.getPrototypeOf(EthnicityInfo)).apply(this, arguments));
    }

    createClass(EthnicityInfo, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                ethnicitiesCount = _props.ethnicitiesCount,
                mainEthnicityName = _props.mainEthnicityName,
                mainEthnicityPercentage = _props.mainEthnicityPercentage,
                onEstimateClick = _props.onEstimateClick,
                _props$buttonVariant = _props.buttonVariant,
                buttonVariant = _props$buttonVariant === undefined ? VARIANT_FESTIVE : _props$buttonVariant;

            var translator = this.getTranslator();

            return React.createElement(
                "div",
                { className: "ethnicity_info_container" },
                React.createElement(
                    "h5",
                    { className: "ethnicity_info_header" },
                    translator.translateValues('Your DNA traces back multiple', 'DNAHub', { number: ethnicitiesCount })
                ),
                React.createElement(
                    "div",
                    { className: "ethncitiy_info_body" },
                    React.createElement(
                        "div",
                        { className: "main_ethnicity" },
                        React.createElement(
                            "span",
                            { className: "main_ethnicity_name" },
                            mainEthnicityName
                        ),
                        React.createElement(
                            "span",
                            { className: "main_ethnicity_percantage" },
                            mainEthnicityPercentage,
                            "%"
                        )
                    ),
                    React.createElement(
                        "span",
                        { className: "ethnicity_remaining" },
                        translator.translateValues('More region', 'DNAHub', { number: ethnicitiesCount - 1 })
                    ),
                    React.createElement(
                        "span",
                        { className: "ethnicity_estimation_button" },
                        React.createElement(
                            MhButton,
                            { variant: buttonVariant,
                                size: SIZE_SMALL,
                                onClick: function onClick() {
                                    return onEstimateClick();
                                } },
                            translator.translate('View Full Estimate', 'DNAHub')
                        )
                    )
                )
            );
        }
    }]);
    return EthnicityInfo;
}(React$1.Component);

translatorExtend(EthnicityInfo);

EthnicityInfo.propTypes = {
    ethnicitiesCount: React$1.PropTypes.number,
    mainEthnicityName: React$1.PropTypes.string,
    mainEthnicityPercentage: React$1.PropTypes.number,
    onEstimateClick: React$1.PropTypes.func,
    buttonVariant: React$1.PropTypes.oneOf(VARIANTS)
};

var DNA_MATCH_PHOTO_SIZE = 50;

/**
 * @description
 * Render the single match item
 *
 * @example
 * <DnaMatchItem key={1}
 *               name="Alex Turner"
 *               ageGroup="A"
 *               gender="M"
 *               photoUrl="https://s-media-cache-ak0.pinimg.com/originals/57/19/ab/5719ab1932e42dee12ae485a4f2c4b80.jpg"
 *               relationships={[{'type': 1, 'relationship_degree':'Father'},{'type':2, 'relationship_degree':'1st Cousin'}]}/>
 *
 * @param {String} name The name of the matched individual
 * @param {String} [photoUrl] The individual's profile photo
 * @param {String} [ageGroup] The individual's age group
 * @param {String} [gender] The individual's gender
 * @param {Array} [relationships] The individual's relationship
 *
 */

var DnaMatchItem = function (_Component) {
    inherits(DnaMatchItem, _Component);

    function DnaMatchItem() {
        classCallCheck(this, DnaMatchItem);
        return possibleConstructorReturn(this, (DnaMatchItem.__proto__ || Object.getPrototypeOf(DnaMatchItem)).apply(this, arguments));
    }

    createClass(DnaMatchItem, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                name = _props.name,
                photoUrl = _props.photoUrl,
                ageGroup = _props.ageGroup,
                gender = _props.gender,
                relationships = _props.relationships;

            var translator = this.getTranslator();

            return React.createElement(
                "div",
                { className: "dna_match_container" },
                React.createElement(
                    Card,
                    null,
                    React.createElement(ProfileDetails, { name: name,
                        photoUrl: photoUrl,
                        ageGroup: ageGroup,
                        gender: gender,
                        photoSize: DNA_MATCH_PHOTO_SIZE })
                ),
                translator.translate('Possible relationship', "DNAMatches") + ':'
            );
        }
    }]);
    return DnaMatchItem;
}(React$1.Component);

translatorExtend(DnaMatchItem);

DnaMatchItem.propTypes = {
    name: React$1.PropTypes.string,
    photoUrl: React$1.PropTypes.string,
    ageGroup: React$1.PropTypes.string,
    gender: React$1.PropTypes.string,
    relationships: React$1.PropTypes.array
};

/**
 * @description
 * Component for showing a list of DNA Matches in a row.
 *
 * @example
 * <DnaMatchesList matches={matches}
 *                 onViewMatchesClick={() => onViewDnaMatchesClick()}/>
 *
 * @param {number} [limit=3]
 * @param {Array} [matches] The wanted variant of the card, can be one of values on constants file
 * @param {Function} [onViewMatchesClick] The name of the matched individual
 */

var DnaMatchesList = function (_Component) {
    inherits(DnaMatchesList, _Component);

    function DnaMatchesList() {
        classCallCheck(this, DnaMatchesList);
        return possibleConstructorReturn(this, (DnaMatchesList.__proto__ || Object.getPrototypeOf(DnaMatchesList)).apply(this, arguments));
    }

    createClass(DnaMatchesList, [{
        key: "renderMatchCard",

        /**
         * Render a single match
         * @param match The wanted match to render
         */
        value: function renderMatchCard(match) {
            var person = match.other_dna_kit.member || match.other_dna_kit.individual;
            var personalPhoto = person.personal_photo ? person.personal_photo.thumbnails[0].url : '';
            return React.createElement(DnaMatchItem, { key: match.id,
                name: person.name,
                ageGroup: person.ageGroup,
                gender: person.gender,
                photoUrl: personalPhoto,
                relationships: match.refined_dna_relationships });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var matchesLimit = this.props.limit || 3;
            var _props = this.props,
                matches = _props.matches,
                onViewMatchesClick = _props.onViewMatchesClick;

            var translator = this.getTranslator();
            var matchElements = matches ? matches.filter(function (currMatch) {
                return currMatch.other_dna_kit.member || currMatch.other_dna_kit.individual;
            }).slice(0, matchesLimit).map(function (currMatch) {
                return _this2.renderMatchCard(currMatch);
            }) : [];
            return React.createElement(
                "div",
                { className: "matches_list_wrapper" },
                React.createElement(
                    "h5",
                    { className: "matches_list_header" },
                    translator.translate('Your DNA Matches', 'DNAMatches')
                ),
                React.createElement(
                    "div",
                    { className: "matches_list_container" },
                    matchElements
                ),
                React.createElement(
                    MhButton,
                    { variant: VARIANT_FESTIVE,
                        size: SIZE_SMALL,
                        primary: true,
                        onClick: function onClick() {
                            return onViewMatchesClick();
                        } },
                    translator.translateValues('View DNA Match', 'DNAHub', { number: matchElements.length })
                )
            );
        }
    }]);
    return DnaMatchesList;
}(React$1.Component);

translatorExtend(DnaMatchesList);

DnaMatchesList.propTypes = {
    limit: React$1.PropTypes.number,
    matches: React$1.PropTypes.arrayOf(React$1.PropTypes.shape({
        name: React$1.PropTypes.string,
        photoUrl: React$1.PropTypes.string,
        ageGroup: React$1.PropTypes.string,
        gender: React$1.PropTypes.gender,
        relationships: React$1.PropTypes.array
    })),
    onViewMatchesClick: React$1.PropTypes.func
};

/**
 * @description
 * Component for showing a dna kit match results in a nice card
 *
 * @example
 * <DnaKitCard
 *                  variant="hide_matches_list"
 *                  name="Eddie Vedder"
 *                  photoUrl="https://www.biography.com/.image/c_fill,cs_srgb,dpr_1.0,g_face,h_300,q_80,w_300/MTE4MDAzNDEwNzcyNTI2NjA2/eddie-vedder-9542540-1-402.jpg"
 *                  countryCode="US"
 *                  matches={["matcheeess", "another matcch"]}
 *                  mainEthnicityName="Central American"
 *                  mainEthnicityPercentage={90}
 *                  ageGroup="A"
 *                  gender="M"
 *                  kitSerial="MH-shalalala"
 *                  ethnicitiesCount={5}/>
 *
 * @param {"hide_matches_list"|"show_matches_list"} [variant="hide_matches_list"] The wanted variant of the card, can be one of values on constants file
 * @param {string} [name] The name of the matchd individual
 * @param {string} [ageGroup] The age group oif the individual
 * @param {string} [gender] The gender of the individual
 * @param {string} [photoUrl] The photo profile of the individual
 * @param {string} [countryCode] The country code of the individual's country
 * @param {string} [kitSerial] The dna kit serial
 * @param {number} ethnicitiesCount The ethnicities found in the kit
 * @param {string} mainEthnicityName The main ethnicity name
 * @param {number} mainEthnicityPercentage The main ethnicity percentage
 * @param {string} [relationship] The relationship of the individual
 * @param {Array}  [matches] The matches found in the kit
 */

var DnaKitCard = function (_Component) {
    inherits(DnaKitCard, _Component);

    function DnaKitCard(props) {
        classCallCheck(this, DnaKitCard);
        return possibleConstructorReturn(this, (DnaKitCard.__proto__ || Object.getPrototypeOf(DnaKitCard)).call(this, props));
    }

    /**
     * Renders the profile details section of the card
     * @param {string} name The name of the kit's individual
     * @param {string} ageGroup The individual's age group
     * @param {string} gender The individual's gender
     * @param {string} photoUrl The individual's profile photo url
     * @param {string} countryCode The individual's country code
     * @param {string} kitSerial The dna kit serial
     * @param {string} relationship The individual's relationship
     */


    createClass(DnaKitCard, [{
        key: 'renderProfileDetails',
        value: function renderProfileDetails(name, ageGroup, gender, photoUrl, countryCode, kitSerial, relationship) {
            var translator = this.getTranslator();
            return React.createElement(
                ProfileDetails,
                { name: name,
                    ageGroup: ageGroup,
                    gender: gender,
                    photoUrl: photoUrl },
                React.createElement(DetailProperty, { value: relationship }),
                React.createElement(CountryProperty, { field: translator.translate("From", "DNAMatches"), countryCode: countryCode }),
                React.createElement(DetailProperty, { field: translator.translate("Kit", "DNAMatches"), value: kitSerial })
            );
        }

        /**
         * Renders the ethnicity info section of the component
         * @param {number} ethnicitiesCount The number of ethnicities to display
         * @param {string} mainEthnicityName The main ethnicity name
         * @param {number} mainEthnicityPercentage The main ethnicity percentage
         * @param {function} onEstimationClick The action to invoke to clicking estimation button
         */

    }, {
        key: 'renderEthnicityInfo',
        value: function renderEthnicityInfo(ethnicitiesCount, mainEthnicityName, mainEthnicityPercentage, onEstimationClick) {
            return React.createElement(EthnicityInfo, { ethnicitiesCount: ethnicitiesCount,
                mainEthnicityName: mainEthnicityName,
                mainEthnicityPercentage: mainEthnicityPercentage,
                onEstimateClick: function onEstimateClick() {
                    return onEstimationClick();
                } });
        }

        /**
         * Render match section when hiding match list
         * @param {number} matchCount The number of matches found
         */

    }, {
        key: 'renderMatchSection',
        value: function renderMatchSection(matchCount) {
            return React.createElement(
                'span',
                { className: 'dna_matches_section' },
                React.createElement(
                    'h5',
                    { className: 'dna_matches_label' },
                    'Dna Matches'
                ),
                React.createElement(
                    'span',
                    { className: 'dna_matches_button' },
                    React.createElement(
                        MhButton,
                        { variant: VARIANT_FESTIVE,
                            size: SIZE_SMALL,
                            primary: true },
                        'View ' + matchCount + ' DNA Matches'
                    )
                )
            );
        }

        /**
         * Renders the match section when showing match list
         * @param {Array} matches The matches found on the kit
         * @param {function} onViewDnaMatchesClick The action to invoke when clicking The view matches button
         */

    }, {
        key: 'renderMatchListSection',
        value: function renderMatchListSection(matches, onViewDnaMatchesClick) {
            return React.createElement(DnaMatchesList, { matches: matches,
                onViewMatchesClick: function onViewMatchesClick() {
                    return onViewDnaMatchesClick();
                } });
        }

        /**
         * Renders the component when hide matches variant is selected
         * @param profileDetails The profile detail section to insert
         * @param ethnicityInfo The ethnicity information section to insert
         * @param matches The matches found in the kit
         */

    }, {
        key: 'renderHideMatchesVariant',
        value: function renderHideMatchesVariant(profileDetails, ethnicityInfo, matches) {
            var matchesSection = this.renderMatchSection(matches ? matches.length : 0);

            return React.createElement(
                ColumnsCard,
                null,
                profileDetails,
                ethnicityInfo,
                matchesSection
            );
        }

        /**
         * Renders the component when show matches variant is selected
         * @param {ProfileDetails} profileDetails The profile details section to insert
         * @param {EthnicityInfo} ethnicityInfo The ethnicity information section to insert
         * @param {Array} matches
         * @param {function} onViewDnaMatchesClick
         */

    }, {
        key: 'renderShowMatchesVariant',
        value: function renderShowMatchesVariant(profileDetails, ethnicityInfo, matches, onViewDnaMatchesClick) {
            var matchesSection = this.renderMatchListSection(matches, onViewDnaMatchesClick);

            return React.createElement(SplitCard, { topLeft: profileDetails,
                topRight: ethnicityInfo,
                bottom: matchesSection });
        }

        /**
         * Get the wanted renderer function by the wanted variant
         * @param {string} variant The wanted variant
         * @return {function} The wanted variant renderer
         */

    }, {
        key: 'getRendererByVariant',
        value: function getRendererByVariant(variant) {
            var renderer = void 0;
            switch (variant) {
                case VARIANTS$6.VARIANT_SHOW_MATCHS:
                    renderer = this.renderShowMatchesVariant;break;
                case VARIANTS$6.VARIANT_HIDE_MATCHS:
                    renderer = this.renderHideMatchesVariant;break;
            }
            return renderer.bind(this);
        }

        /**
         * Renders the component
         */

    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                name = _props.name,
                ageGroup = _props.ageGroup,
                gender = _props.gender,
                photoUrl = _props.photoUrl,
                countryCode = _props.countryCode,
                kitSerial = _props.kitSerial,
                ethnicitiesCount = _props.ethnicitiesCount,
                mainEthnicityName = _props.mainEthnicityName,
                mainEthnicityPercentage = _props.mainEthnicityPercentage,
                onEstimationClick = _props.onEstimationClick,
                onViewDnaMatchesClick = _props.onViewDnaMatchesClick,
                relationship = _props.relationship,
                matches = _props.matches,
                _props$variant = _props.variant,
                variant = _props$variant === undefined ? DEFAULT_VARIANT : _props$variant;

            // Render the profile section

            var profileDetails = this.renderProfileDetails(name, ageGroup, gender, photoUrl, countryCode, kitSerial, relationship);

            // Render the ethnicity section
            var ethnicityInfo = this.renderEthnicityInfo(ethnicitiesCount, mainEthnicityName, mainEthnicityPercentage, onEstimationClick);

            // Get the renderer of the wanted variant.
            var wantedVariantComponentRenderer = this.getRendererByVariant(variant);

            // Render the component with the wanted variant and insert the sections.
            return wantedVariantComponentRenderer(profileDetails, ethnicityInfo, matches, onViewDnaMatchesClick);
        }
    }]);
    return DnaKitCard;
}(React$1.Component);

translatorExtend(DnaKitCard);

DnaKitCard.propTypes = {
    variant: React$1.PropTypes.oneOf(_$1.values(VARIANTS$6)),
    name: React$1.PropTypes.string.isRequired,
    ageGroup: React$1.PropTypes.string,
    gender: React$1.PropTypes.string,
    photoUrl: React$1.PropTypes.string,
    countryCode: React$1.PropTypes.string,
    kitSerial: React$1.PropTypes.string,
    ethnicitiesCount: React$1.PropTypes.number.isRequired,
    mainEthnicityName: React$1.PropTypes.string.isRequired,
    mainEthnicityPercentage: React$1.PropTypes.number.isRequired,
    relationship: React$1.PropTypes.string,
    matches: React$1.PropTypes.array
};

/**
 * Extract the family graph tree id from this dna_kit will return null if no tree was found
 * @param {Object} kit
 * @returns {String|null} e.g 'tree-121255-1'
 */
function getTreeIdFromKit() {
    var kit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var tree = getTreeFromKit(kit) || {};
    return tree.id || null;
}

/**
 * @param {Object} kit
 * @returns {Object} Family Graph User model
 */
function getTreeManagerFromKit() {
    var kit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var tree = getTreeFromKit(kit) || {};
    return tree.site && tree.site.creator ? tree.site.creator : {};
}

/**
 * @param {Object} kit
 * @returns {Object|null} Family Graph Tree model
 */
function getTreeFromKit() {
    var kit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var individual = getIndividualFromKit(kit) || {};
    return individual.tree || null;
}

/**
 * @param {Object} kit
 * @returns {Object|null} Family Graph Individual model
 */
function getIndividualFromKit() {
    var kit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return kit.member && kit.member.default_individual ? kit.member.default_individual : kit.individual || null;
}

/**
 * @param kit
 * @param defaultValue
 * @returns {*}
 */
function extractUser() {
    var kit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var user = defaultValue;
    if (kit.member) {
        user = kit.member;
    } else if (kit.individual && kit.individual.membership && kit.individual.membership.user) {
        user = kit.individual.membership.user;
    }

    return user;
}

/**
 * Replace a single token in a translation with JSX element
 * This will return an array of React Children to be put directly in an element
 * Note: the element you provided will have some "key" to allow it to be in an array
 * @param {String} translation
 * @param {String} token of the kind {\w+}
 * @param {*} value a JSX element
 * @returns {Array}
 */
function replaceValueJsx(translation, token, value) {
    return transformToJsx(translation, '{' + token + '}', value);
}

/**
 * Will split the translation and return an array of JSX to be used inside an element
 * element's "key" prop is handled as well to work as array in React
 * @param {String} translation
 * @param {String|RegExp} token to replace with the JSX value
 * @param {*} value a JSX element
 * @returns {Array}
 */
function transformToJsx(translation, token, value) {
    var childElements = [];
    var translationPieces = translation ? translation.split(token) : [];

    translationPieces.forEach(function (piece, i) {
        childElements.push(piece);
        var currValue = value;
        if (React$1.isValidElement(value)) {
            currValue = React$1.cloneElement(value, { key: i });
        }
        i < translationPieces.length - 1 && childElements.push(currValue);
    });

    // remove last empty string that can occur when the token is in the end of the sentence
    if (childElements.length && childElements[childElements.length - 1] === '') {
        childElements.pop();
    }

    return childElements;
}

// components
/**
 * @description
 * Show This match profile details
 * if isOtherMatch is true, will show the other side of the match profile, including contact logic
 *
 * @example
 * <MatchProfileDetails kit={ {"member": {"id":"user-123", "relationship": {"relationship_description":"Brother"},
 *  "name":"Joseph Yossuf", "gender": "M", "age_group_in_years":"20\"s", "country_code":"SV"},
 *  "submitter":{"id":"user-456", "name":"Uploader Name"}} }
 * currentUserAccountId='555' contactUpgradeReason={153} isOtherMatch={true} />
 *
 * @param {Object} kit
 * @param {String} currentUserAccountId
 * @param {boolean} [isOtherMatch=true] indicate that this is the other side of the match
 * @param {Number} [contactUpgradeReason] billing transaction scenario to be used when contacting
 * @param {Function} [contactMember] function for using with contact member (e.g window.contactMember)
 * @param {Number} [photoSize]
 * @param {boolean} [showDefaultProfileDetailsProperties=true] should show default fields: age, country, dna managed by.
 *                                                              relationship is always shown.
 * @param {node} [extraProfileDetailsProperties] extra properties to add to the profile details
 * @param {Function} [getMemberDetailsProperties] get member details to be given to member callout
 * @param {Object} [children]
 */

var MatchProfileDetails = function (_Component) {
    inherits(MatchProfileDetails, _Component);

    function MatchProfileDetails() {
        classCallCheck(this, MatchProfileDetails);
        return possibleConstructorReturn(this, (MatchProfileDetails.__proto__ || Object.getPrototypeOf(MatchProfileDetails)).apply(this, arguments));
    }

    createClass(MatchProfileDetails, [{
        key: 'renderManagedBy',

        /**
         * @param {Object} kit
         * @param {boolean} kitSubmitterIsCurrentUser
         * @param {Function} getMemberDetailsProperties
         * @param {String} contactSubject
         */
        value: function renderManagedBy(kit, kitSubmitterIsCurrentUser, getMemberDetailsProperties, contactSubject) {
            var translator = this.getTranslator();
            var submitter = kit.submitter || {};
            var submitterId = extractUserId(submitter, '');

            var managedBy = void 0;
            if (kitSubmitterIsCurrentUser) {
                managedBy = React.createElement(
                    'div',
                    { className: 'kit_managed_by' },
                    translator.translate('DNA managed by you', 'DNAMatches')
                );
            } else {
                var managerElement = React.createElement(
                    MemberCallout,
                    { memberId: submitterId,
                        getMemberDetailsProperties: getMemberDetailsProperties,
                        contactSubject: contactSubject },
                    React.createElement(
                        'a',
                        { className: 'manage_by_name', 'data-automations': 'KitManagedBy',
                            href: submitter.link },
                        submitter.name
                    )
                );
                var managedByName = replaceValueJsx(translator.translate('DNA managed by', 'DNAMatches'), 'manager_link', managerElement);

                managedBy = React.createElement(
                    'div',
                    { className: 'kit_managed_by' },
                    managedByName
                );
            }

            return managedBy;
        }

        /**
         * Show just name or a callout if its a member & other match
         * @param {String} name
         * @param {boolean} isOtherMatch
         * @param {String|Number} [memberId]
         * @param {Function} getMemberDetailsProperties
         * @param {String} contactSubject
         * @param {String} profilePageLink
         */

    }, {
        key: 'renderProfileName',
        value: function renderProfileName(name, isOtherMatch, memberId, getMemberDetailsProperties, contactSubject, profilePageLink) {
            return isOtherMatch && memberId ? React.createElement(
                MemberCallout,
                { memberId: memberId,
                    getMemberDetailsProperties: getMemberDetailsProperties,
                    contactSubject: contactSubject },
                React.createElement(
                    'a',
                    { className: 'profile_name', 'data-automations': 'ProfileNameCallout', href: profilePageLink },
                    name
                )
            ) : name;
        }

        /**
         * @param {Array} users
         * @param {String|Number} currentUserAccountId
         * @param {String} matchName
         * @param {Number} contactUpgradeReason
         */

    }, {
        key: 'renderContactMatch',
        value: function renderContactMatch(users, currentUserAccountId, matchName, contactUpgradeReason) {
            return React.createElement(ContactMatch, { users: users, currentUserAccountId: currentUserAccountId, matchName: matchName,
                contactUpgradeReason: contactUpgradeReason, contactMember: this.props.contactMember });
        }

        /**
         * Render function
         */

    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                _props$kit = _props.kit,
                kit = _props$kit === undefined ? {} : _props$kit,
                currentUserAccountId = _props.currentUserAccountId,
                contactUpgradeReason = _props.contactUpgradeReason,
                _props$isOtherMatch = _props.isOtherMatch,
                isOtherMatch = _props$isOtherMatch === undefined ? true : _props$isOtherMatch,
                _props$photoSize = _props.photoSize,
                photoSize = _props$photoSize === undefined ? 96 : _props$photoSize,
                _props$showDefaultPro = _props.showDefaultProfileDetailsProperties,
                showDefaultProfileDetailsProperties = _props$showDefaultPro === undefined ? true : _props$showDefaultPro,
                _props$extraProfileDe = _props.extraProfileDetailsProperties,
                extraProfileDetailsProperties = _props$extraProfileDe === undefined ? null : _props$extraProfileDe,
                getMemberDetailsProperties = _props.getMemberDetailsProperties,
                children = _props.children;


            var translator = this.getTranslator();
            var profile = kit.member || kit.individual || {};
            var profileRelationship = getRelationshipFromProfile(profile);
            var profilePhoto = getPhotoUrlFromProfile(profile);
            var submitterAccountId = extractUserId(kit.submitter);
            var matchAccountId = extractUserId(extractUser(kit));
            var treeManager = getTreeManagerFromKit(kit) || {};
            var contactSubject = translator.translateValues('Contact member subject', 'DNAMatches', { profile_name: profile.name });
            var matchIsCurrentUser = currentUserAccountId == matchAccountId;
            var matchIsKitManager = submitterAccountId && submitterAccountId == matchAccountId;
            var kitSubmitterIsCurrentUser = submitterAccountId && submitterAccountId == currentUserAccountId;
            var profileName = this.renderProfileName(profile.name, isOtherMatch, matchAccountId, getMemberDetailsProperties, contactSubject, profile.link);
            var managedBy = isOtherMatch && !matchIsKitManager ? this.renderManagedBy(kit, kitSubmitterIsCurrentUser, getMemberDetailsProperties, contactSubject) : null;
            var contactMatch = isOtherMatch && !matchIsCurrentUser ? this.renderContactMatch([kit.member, treeManager, kit.submitter], currentUserAccountId, profile.name, contactUpgradeReason) : null;

            return React.createElement(
                'div',
                { className: 'match_profile_details_wrapper',
                    'data-automations': 'MatchProfileDetails' + (isOtherMatch ? 'Other' : '') },
                React.createElement(
                    'div',
                    { className: 'match_profile_details' },
                    React.createElement(
                        ProfileDetails,
                        { name: profileName, ageGroup: profile.age_group, gender: profile.gender,
                            photoUrl: profilePhoto, photoSize: photoSize },
                        React.createElement(
                            'div',
                            { className: 'match_profile_details_relationship' },
                            profileRelationship && React.createElement(DetailProperty, { value: profileRelationship.relationship_description })
                        ),
                        showDefaultProfileDetailsProperties && React.createElement(
                            'div',
                            { className: 'default_profile_details_properties' },
                            !matchIsCurrentUser && React.createElement(DetailProperty, { field: translator.translate('Age', 'DNAMatches'),
                                value: profile.age_group_in_years }),
                            React.createElement(CountryProperty, { field: translator.translate('From', 'DNAMatches'),
                                countryCode: profile.country_code }),
                            managedBy
                        ),
                        extraProfileDetailsProperties
                    ),
                    children
                ),
                contactMatch
            );
        }
    }]);
    return MatchProfileDetails;
}(React$1.Component);

translatorExtend(MatchProfileDetails);

/**
 * @param {Object} profile
 * @returns {String|null}
 */
function getRelationshipFromProfile() {
    var profile = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var relationship = null;
    if (profile.relationship) {
        relationship = profile.relationship;
    } else if (profile.default_individual && profile.default_individual.relationship) {
        relationship = profile.default_individual.relationship;
    }
    return relationship;
}

/**
 * @param {Object} profile
 * @returns {String|null}
 */
function getPhotoUrlFromProfile() {
    var profile = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return extractPhotoUrl(profile.personal_photo);
}

MatchProfileDetails.propTypes = {
    kit: React$1.PropTypes.object.isRequired,
    currentUserAccountId: React$1.PropTypes.string.isRequired,
    contactUpgradeReason: React$1.PropTypes.number,
    isOtherMatch: React$1.PropTypes.bool,
    contactMember: React$1.PropTypes.func,
    showDefaultProfileDetailsProperties: React$1.PropTypes.bool,
    extraProfileDetailsProperties: React$1.PropTypes.object,
    getMemberDetailsProperties: React$1.PropTypes.func
};

/**
 * Format numbers with comma-separated thousands and custom decimal places.
 *
 * Format numbers with a specific precision:
 *      number = 13.2435
 *      precision = 3
 *      result = 13.244
 *
 * Control if to pad with trailing zeros:
 *      number = 13.2
 *      precision = 2
 *      zero padding = true
 *      result = 13.20
 *
 *      number = 13.2
 *      precision = 2
 *      zero padding = false
 *      result = 13.2
 *
 * Use extra precision for numbers smaller than 1:
 *      number = 0.05
 *      precision = 1
 *      extra precision = true
 *      result = 0.05
 *
 *      number = 0.05
 *      precision = 1
 *      extra precision = false
 *      result = 0.1
 *
 * DEPENDENCIES
 * Set these values on the window:
 *      window.numberFormatData.decimal - for decimal separator (number = 100, decimal = '.' -> result = 100.00)
 *      window.numberFormatData.thousands - for thousands separator (number = 1000, thousands = ',' -> result = 1,000)
 *
 * See unit-test for more examples.
 *
 * @param {number} number
 * @param {number} precision (optional) default is 0
 * @param {boolean} padWithZeros (optional) indicating if need to pad with zeros up to the given precision, default is true
 * @param {boolean} useExtraPrecisionForSmallNumbers (optional) indicating if need to have extra precision for numbers close to zero (e.g. 0.123 with precision 1 will be 0.12 and not 0.1), default is false
 * @param {Object} _window (optional)
 */
function formatNumber(number) {
    var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var padWithZeros = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var useExtraPrecisionForSmallNumbers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    var _window = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : window;

    var numberFormatData = getNumberFormatData(_window);
    precision = getPrecisionForSmallNumber(number, precision, useExtraPrecisionForSmallNumbers);

    var formattedNumber = roundNumber(number, precision).toFixed(precision);
    if (!padWithZeros) {
        // remove trailing zeros
        formattedNumber = parseFloat(formattedNumber).toString();
    }

    var hasDecimal = formattedNumber.indexOf('.') > 0;
    return formattedNumber.replace('.', numberFormatData.decimal).replace(regularExpressions[hasDecimal], '$&' + numberFormatData.thousands);
}

/**
 * Shorthand for formatNumber with one precision digit and zero padding
 * @param {number} number
 * @param {boolean} useExtraPrecisionForSmallNumbers
 * @param {object} _window
 * @return {string}
 */
function formatNumberWithOnePrecisionDigit(number) {
    var useExtraPrecisionForSmallNumbers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var _window = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;

    return formatNumber(number, 1, true, useExtraPrecisionForSmallNumbers, _window);
}

// Regular expression by number having a decimal point
var regularExpressions = {
    true: new RegExp('\\d(?=(\\d{3})+\\D)', 'g'), // For number with precision, for example: 15.24
    false: new RegExp('\\d(?=(\\d{3})+$)', 'g') };

/**
 * Returns the number formatting data that exists on the window object
 * @param {Object} window
 * @return {{decimal: string, thousands: string}}
 */
function getNumberFormatData(window) {
    var decimal = '.';
    var thousands = ',';
    if (!window.numberFormatData || !window.numberFormatData.decimal || !window.numberFormatData.thousands) {
        console.error('Need to set window.numberFormatData.decimal and window.numberFormatData.thousands');
    } else {
        decimal = window.numberFormatData.decimal;
        thousands = window.numberFormatData.thousands;
    }

    return {
        decimal: decimal,
        thousands: thousands
    };
}

/**
 * Calculates the needed precision according to the given number and settings
 * @param {number} number
 * @param {number} precision
 * @param {boolean} extraPrecisionForSmallNumbers
 * @return {number}
 */
function getPrecisionForSmallNumber(number, precision, extraPrecisionForSmallNumbers) {
    if (Math.abs(number) < 1 && number !== 0 && extraPrecisionForSmallNumbers) {

        // calculating threshold:
        //
        // when precision is 1, numbers that are >= 0.1 still make sense with one decimal digit
        // but for numbers that are smaller than 0.1, for example 0.05, if we don't add an extra decimal digit, they will
        // round up to 0.1 or down to 0 and we lose information.
        //
        // when precision is 1, although we want to add an extra decimal digit for numbers that are smaller than 0.1
        // we can do that only for numbers that are actually smaller then 0.095. why? because if we add an extra decimal
        // digit to 0.095, we will get 0.10 (0.095 with two decimal digits is 0.10) and this is worse
        // than the original 0.1 that we could have gotten if we didn't add the extra decimal digit.
        // so, only numbers that are smaller than 0.095 can get an extra decimal digit.
        // 0.094 will become 0.09 which is better than 0.1

        var smallNumberThreshold = 0.95 * Math.pow(10, -precision);
        if (Math.abs(number) < smallNumberThreshold) {
            precision++;
        }
    }

    return precision;
}

/**
 * Returns a rounded number according to the given precision
 * @param {number} number
 * @param {number} precision
 * @return {number}
 */
function roundNumber(number, precision) {
    var coefficient = Math.pow(10, precision);
    return Math.round(number * coefficient) / coefficient;
}

/**
 * @description
 * Show the dna match quality modal.
 * The modal will not show automatically. In order to show the modal, add a ref={ref => {this.dnaMatchQualityModal = ref;} attribute
 * and call this.dnaMatchQualityModal.show()
 *
 * @example
 * <MatchQualityModal />
 *
 * @param {boolean} [isShown]
 * @param {function} [afterOpen]
 */

var MatchQualityModal = function (_Component) {
    inherits(MatchQualityModal, _Component);

    function MatchQualityModal() {
        classCallCheck(this, MatchQualityModal);
        return possibleConstructorReturn(this, (MatchQualityModal.__proto__ || Object.getPrototypeOf(MatchQualityModal)).apply(this, arguments));
    }

    createClass(MatchQualityModal, [{
        key: 'show',


        /**
         * Show the modal
         */
        value: function show() {
            this.modal && this.modal.show();
        }

        /**
         * Render the match quality section
         */

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var translator = this.getTranslator();
            var _props = this.props,
                isShown = _props.isShown,
                afterOpen = _props.afterOpen;


            return React.createElement(
                Modal,
                { showOverlay: true, closeOnOverlayClicked: true, size: SIZE_LARGE$1, ref: function ref(_ref) {
                        _this2.modal = _ref;
                    }, isShown: isShown, afterOpen: afterOpen },
                React.createElement(ModalLayout, {
                    header: translator.translate('DNA match quality', 'DNAMatches'),
                    body: React.createElement(
                        'div',
                        { className: 'dna_match_quality_modal' },
                        React.createElement('div', { dangerouslySetInnerHTML: { __html: translator.translate('This section contains', 'DNAMatches') } }),
                        React.createElement('br', null),
                        React.createElement('div', { className: 'icon shared_dna' }),
                        React.createElement('div', { dangerouslySetInnerHTML: { __html: translator.translate('Shared DNA shows', 'DNAMatches') } }),
                        React.createElement('br', null),
                        React.createElement('div', { className: 'icon shared_segments' }),
                        React.createElement('div', { dangerouslySetInnerHTML: { __html: translator.translate('Shared segments description', 'DNAMatches') } }),
                        React.createElement('br', null),
                        React.createElement('div', { className: 'icon largest_segment' }),
                        React.createElement('div', { dangerouslySetInnerHTML: { __html: translator.translate('Largest segment description', 'DNAMatches') } })
                    ),
                    footerButtons: React.createElement(
                        MhButton,
                        { onClick: function onClick() {
                                return _this2.modal && _this2.modal.close();
                            }, primary: true, size: SIZE_SMALL },
                        translator.translate('Close', 'DNAMatches')
                    )
                })
            );
        }
    }]);
    return MatchQualityModal;
}(React$1.Component);

translatorExtend(MatchQualityModal);

MatchQualityModal.propTypes = {
    isShown: React$1.PropTypes.bool,
    afterOpen: React$1.PropTypes.func
};

/**
 * @description
 * Show this match quality details, including Centimorgan length, percentages and etc.
 *
 * @example
 * <MatchQualityDetails
 *      percentageOfSharedSegments={15.5}
 *      totalSharedSegmentsLengthInCm={150}
 *      totalSharedSegments={8}
 *      largestSharedSegmentLengthInCm={44.45}/>
 *
 * @param {Number} percentageOfSharedSegments
 * @param {Number} totalSharedSegmentsLengthInCm
 * @param {Number} totalSharedSegments
 * @param {Number} largestSharedSegmentLengthInCm
 * @param {Function} [onMatchQualityModalOpen]
 */

var MatchQualityDetails = function (_Component) {
    inherits(MatchQualityDetails, _Component);

    function MatchQualityDetails() {
        classCallCheck(this, MatchQualityDetails);
        return possibleConstructorReturn(this, (MatchQualityDetails.__proto__ || Object.getPrototypeOf(MatchQualityDetails)).apply(this, arguments));
    }

    createClass(MatchQualityDetails, [{
        key: 'openDnaMatchQualityModal',


        /**
         * Opens the dna match quality modal
         */
        value: function openDnaMatchQualityModal() {
            this.dnaMatchQualityModal.show();
            this.props.onMatchQualityModalOpen();
        }

        /**
         * Render the match quality section
         */

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                percentageOfSharedSegments = _props.percentageOfSharedSegments,
                totalSharedSegmentsLengthInCm = _props.totalSharedSegmentsLengthInCm,
                totalSharedSegments = _props.totalSharedSegments,
                largestSharedSegmentLengthInCm = _props.largestSharedSegmentLengthInCm;


            var translator = this.getTranslator();

            return React.createElement(
                'div',
                { className: 'match_quality_details' },
                React.createElement(
                    'div',
                    { className: 'match_quality_header' },
                    translator.translate('DNA match quality', 'DNAMatches'),
                    React.createElement(CircledIcon, { onClick: function onClick() {
                            return _this2.openDnaMatchQualityModal();
                        }, symbol: '?' })
                ),
                React.createElement(
                    'div',
                    { className: 'match_quality' },
                    React.createElement(
                        'div',
                        { className: 'shared_dna', 'data-automations': 'QualitySharedDna' },
                        React.createElement(
                            'span',
                            { className: 'match_quality_value' },
                            React.createElement(
                                'span',
                                { 'data-automations': 'QualitySharedDnaPer' },
                                formatNumberWithOnePrecisionDigit(percentageOfSharedSegments)
                            ),
                            React.createElement(
                                'span',
                                { className: 'match_quality_value_inner' },
                                React.createElement(
                                    'span',
                                    {
                                        className: 'percentage_sign' },
                                    '%'
                                ),
                                " (",
                                React.createElement(
                                    'span',
                                    { 'data-automations': 'QualitySharedDnaTotal' },
                                    formatNumberWithOnePrecisionDigit(totalSharedSegmentsLengthInCm)
                                ),
                                React.createElement(
                                    'span',
                                    { className: 'centimorgan_sign' },
                                    " cM"
                                ),
                                ")"
                            )
                        ),
                        React.createElement(
                            'span',
                            {
                                className: 'match_quality_label' },
                            translator.translate('Shared DNA', 'DNAMatches')
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'shared_segments', 'data-automations': 'QualitySharedSegments' },
                        React.createElement(
                            'span',
                            { className: 'match_quality_value', 'data-automations': 'QualitySharedSegmentsTotal' },
                            totalSharedSegments
                        ),
                        React.createElement(
                            'span',
                            {
                                className: 'match_quality_label' },
                            translator.translate('Shared segments', 'DNAMatches')
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'largest_segment', 'data-automations': 'QualityLargestSegment' },
                        React.createElement(
                            'span',
                            { className: 'match_quality_value' },
                            React.createElement(
                                'span',
                                { 'data-automations': 'QualityLargestSegmentTotal' },
                                formatNumberWithOnePrecisionDigit(largestSharedSegmentLengthInCm)
                            ),
                            React.createElement(
                                'span',
                                { className: 'centimorgan_sign' },
                                ' cM'
                            )
                        ),
                        React.createElement(
                            'span',
                            {
                                className: 'match_quality_label' },
                            translator.translate('Largest segment', 'DNAMatches')
                        )
                    )
                ),
                React.createElement(MatchQualityModal, { ref: function ref(modal) {
                        return _this2.dnaMatchQualityModal = modal;
                    } })
            );
        }
    }]);
    return MatchQualityDetails;
}(React$1.Component);

translatorExtend(MatchQualityDetails);

MatchQualityDetails.propTypes = {
    percentageOfSharedSegments: React$1.PropTypes.number,
    totalSharedSegmentsLengthInCm: React$1.PropTypes.number,
    totalSharedSegments: React$1.PropTypes.number,
    largestSharedSegmentLengthInCm: React$1.PropTypes.number,
    onMatchQualityModalOpen: React$1.PropTypes.func
};

var FEMALE = 'F';

/**
 * @description
 * A sentence for describing a DNA Match tree details
 * Translations dependencies:
 *  - 'Family' > 'FromCountries' category
 *  - if not overriding the category by 'translatedCategory' prop: 'Family' > 'DNASingleMatch' category
 *
 * @example
 * 1) Anchor is the tree manager
 * <MatchedFamilyTreeDetails memberId={111} treeManagerId={111} gender="F" treeIndividualCount={15} treeManagerCountryCode="SV"
 *      matchName="Yossi Kapusi" viewTreeUrl="https://coolors.co/" />
 *
 * 2) Anchor is not the tree manager
 * <MatchedFamilyTreeDetails memberId={111} treeManagerId={555} gender="F" treeIndividualCount={15} treeManagerCountryCode="SV"
 *      matchName="Yossi Kapusi" viewTreeUrl="https://coolors.co/" />
 *
 * 3) Special phrasing for 1 individual case
 * <MatchedFamilyTreeDetails memberId={111} treeManagerId={555} gender="F" treeIndividualCount={1} treeManagerCountryCode="SV"
 *      matchName="Yossi Kapusi" viewTreeUrl="https://coolors.co/" />
 *
 * @param {String|Number} [memberId]
 * @param {String|Number} [treeManagerId]
 * @param {String} [gender]
 * @param {Number} [treeIndividualCount]
 * @param {String} [treeManagerCountryCode]
 * @param {String} [matchName]
 * @param {String} [viewTreeUrl] will add View Tree call to action if url was provided
 * @param {String} [translatedCategory="DNAMatches"]
 * @param {Function} [onViewTree]
 *
 */

var MatchedFamilyTreeDetails = function (_Component) {
    inherits(MatchedFamilyTreeDetails, _Component);

    function MatchedFamilyTreeDetails() {
        classCallCheck(this, MatchedFamilyTreeDetails);
        return possibleConstructorReturn(this, (MatchedFamilyTreeDetails.__proto__ || Object.getPrototypeOf(MatchedFamilyTreeDetails)).apply(this, arguments));
    }

    createClass(MatchedFamilyTreeDetails, [{
        key: 'renderManagerName',


        /**
         * @param {String|Number} treeManagerName
         * @param {String} treeManagerLink
         * @param {String} treeManagerId
         * @param {Function} getMemberDetailsProperties
         * @param {String} contactSubject
         */
        value: function renderManagerName(treeManagerName, treeManagerLink, treeManagerId, getMemberDetailsProperties, contactSubject) {
            return treeManagerId ? React.createElement(
                MemberCallout,
                { memberId: treeManagerId,
                    getMemberDetailsProperties: getMemberDetailsProperties,
                    contactSubject: contactSubject },
                React.createElement(
                    'a',
                    { className: 'tree_manager', 'data-automations': 'TreeManagerCallout', href: treeManagerLink },
                    treeManagerName
                )
            ) : treeManagerName;
        }

        /**
         * Render component
         */

    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                memberId = _props.memberId,
                treeManagerId = _props.treeManagerId,
                treeManagerName = _props.treeManagerName,
                treeManagerLink = _props.treeManagerLink,
                gender = _props.gender,
                treeIndividualCount = _props.treeIndividualCount,
                treeManagerCountryCode = _props.treeManagerCountryCode,
                matchName = _props.matchName,
                onViewTree = _props.onViewTree,
                viewTreeUrl = _props.viewTreeUrl,
                _props$translatedCate = _props.translatedCategory,
                translatedCategory = _props$translatedCate === undefined ? 'DNASingleMatch' : _props$translatedCate,
                getMemberDetailsProperties = _props.getMemberDetailsProperties;


            var translator = this.getTranslator();
            var contactSubject = translator.translateValues('Contact member subject', 'DNAMatches', { profile_name: matchName });

            var appearsInTreeKey = getAppearsInTreeKey(memberId, treeManagerId, gender, treeIndividualCount, treeManagerCountryCode);
            var fromManagerCountry = treeManagerCountryCode ? translator.translate(treeManagerCountryCode, 'FromCountries') : '';
            var translationValues = {
                match_name: matchName,
                people_number: treeIndividualCount,
                from_manager_country: fromManagerCountry
            };
            var managerName = this.renderManagerName(treeManagerName, treeManagerLink, treeManagerId, getMemberDetailsProperties, contactSubject);
            var familyTreeDetails = replaceValueJsx(translator.translateValues(appearsInTreeKey, translatedCategory, translationValues), 'manager_link', managerName);
            var viewTreeCallToAction = viewTreeUrl ? React.createElement(
                'a',
                { className: 'view_tree', href: viewTreeUrl, onClick: function onClick(e) {
                        e.preventDefault();onViewTree && onViewTree();
                    },
                    'data-automations': 'TreeDetailsViewTree' },
                translator.translateGender('View tree', translatedCategory)
            ) : null;

            return React.createElement(
                'div',
                { className: 'matched_family_tree_details' },
                familyTreeDetails,
                viewTreeCallToAction
            );
        }
    }]);
    return MatchedFamilyTreeDetails;
}(React$1.Component);

function getAppearsInTreeKey(memberId, treeManagerId, gender, treeIndividualCount, treeManagerCountryCode) {
    var key = '';
    if (treeIndividualCount == 1) {
        if (memberId && memberId == treeManagerId && gender === FEMALE) {
            key = 'Appears in a tree with one person female manager';
        } else if (memberId && memberId == treeManagerId) {
            key = 'Appears in a tree with one person male manager';
        } else if (treeManagerCountryCode && gender === FEMALE) {
            key = 'Appears in a tree with one person F';
        } else if (treeManagerCountryCode) {
            key = 'Appears in a tree with one person M';
        } else if (gender === FEMALE) {
            key = 'Appears in a tree with one person no country F';
        } else {
            key = 'Appears in a tree with one person no country M';
        }
    } else {
        if (memberId && memberId == treeManagerId && gender === FEMALE) {
            key = 'Appears in a tree female manager';
        } else if (memberId && memberId == treeManagerId) {
            key = 'Appears in a tree male manager';
        } else if (treeManagerCountryCode && gender === FEMALE) {
            key = 'Appears in a tree F';
        } else if (treeManagerCountryCode) {
            key = 'Appears in a tree M';
        } else if (gender === FEMALE) {
            key = 'Appears in a tree no country F';
        } else {
            key = 'Appears in a tree no country M';
        }
    }
    return key;
}

translatorExtend(MatchedFamilyTreeDetails);

MatchedFamilyTreeDetails.propTypes = {
    memberId: React$1.PropTypes.oneOfType([React$1.PropTypes.number, React$1.PropTypes.string]),
    treeManagerId: React$1.PropTypes.oneOfType([React$1.PropTypes.number, React$1.PropTypes.string]),
    treeManagerName: React$1.PropTypes.string,
    treeManagerLink: React$1.PropTypes.string,
    gender: React$1.PropTypes.string,
    treeIndividualCount: React$1.PropTypes.number,
    treeManagerCountryCode: React$1.PropTypes.string,
    matchName: React$1.PropTypes.string,
    viewTreeUrl: React$1.PropTypes.string,
    translatedCategory: React$1.PropTypes.string,
    onViewTree: React$1.PropTypes.func,
    getMemberDetailsProperties: React$1.PropTypes.func
};

var COUNTRIES_SEPARATOR = ', ';

/**
 * Returns a comma separated list of countries, states or provinces taken from the given locations
 * @param {[{country: string, state_or_province: string}]} locations
 * @return {string}
 */


/**
 * Returns a comma separated list of countries taken from the given locations
 * @param {[{country: string, state_or_province: string}]} locations
 * @return {string}
 */
function getCountriesAggregation(locations) {
    if (!locations || !locations.length) {
        return '';
    }

    return _.uniq(_.pluck(locations, 'country')).join(COUNTRIES_SEPARATOR);
}

var SURNAMES_SEPARATOR = ', ';

/**
 * @description
 * Show list of surnames on both sides
 *
 * @example
 * <SharedSurnamesList surnamesList={{
 *      "count": 5,
 *      "data": [
 *          {
 *   			"surnames": [
 *   				"Neches",
 *                 	"Neces"
 *   			],
 *   			"other_surnames": [
 *   				"Neces"
 *   			],
 *               "countries": [
 *                 	{
 *                 		"country": "Israel",
 *                 	}
 *             	],
 *               "other_countries": [
 *               	{
 *                 		"country": "USA",
 *                 		"state_or_province": "California"
 *                 	}
 *               ]
 *   		},
 *         	{
 *               "surnames": [
 *                   "Elboim"
 *               ],
 *               "other_surnames": [],
 *               "countries": [
 *                   {
 *                       "country": "Israel",
 *                   }
 *               ],
 *               "other_countries": []
 *           },
 *           {
 *               "surnames": [],
 *               "other_surnames": [
 *                   "Avrahamof"
 *               ],
 *               "countries": [],
 *               "other_countries": [
 *                   {
 *                       "country": "Israel",
 *                   }
 *               ]
 *           },
 *           {
 *               "surnames": [
 *                   "Marcus"
 *               ],
 *               "other_surnames": [
 *                   "Marcus"
 *               ],
 *               "countries": [
 *                   {
 *                       "country": "Israel",
 *                   },
 *                   {
 *                       "country": "USA",
 *                 		 "state_or_province": "California"
 *                   }
 *               ],
 *               "other_countries": [
 *                   {
 *                       "country": "USA",
 *                 		 "state_or_province": "California"
 *                   }
 *               ]
 *           },
 *           {
 *               "surnames": [
 *                   "Karp"
 *               ],
 *               "other_surnames": [],
 *               "countries": [
 *                   {
 *                       "country": "USA",
 *                 		 "state_or_province": "California"
 *                   }
 *               ],
 *               "other_countries": []
 *           }
 *   	]
 * }} />
 *
 * @param {Object} surnamesData
 */

var SharedSurnamesList = function (_Component) {
    inherits(SharedSurnamesList, _Component);

    function SharedSurnamesList() {
        classCallCheck(this, SharedSurnamesList);
        return possibleConstructorReturn(this, (SharedSurnamesList.__proto__ || Object.getPrototypeOf(SharedSurnamesList)).apply(this, arguments));
    }

    createClass(SharedSurnamesList, [{
        key: "renderCell",

        /**
         * @param {Array} [surnames]
         * @param {Array} [countries]
         * @param {String} [className]
         * @param {String} [dataAutomations]
         */
        value: function renderCell(surnames, countries) {
            var className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
            var dataAutomations = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

            return React.createElement(
                "span",
                { className: "shared_surname_list_cell" + className, "data-automations": dataAutomations },
                surnames && surnames.length > 0 && React.createElement(
                    "span",
                    null,
                    React.createElement(
                        "span",
                        { className: "surname_list", "data-automations": "SurnamesList" },
                        surnames.join(SURNAMES_SEPARATOR)
                    ),
                    countries && countries.length > 0 && React.createElement(
                        "span",
                        { className: "countries_list", "data-automations": "CountriesList" },
                        "(",
                        getCountriesAggregation(countries),
                        ")"
                    )
                )
            );
        }

        /**
         * @param {Object} surnameObj
         * @param {Number} i
         */

    }, {
        key: "renderRow",
        value: function renderRow(surnameObj, i) {
            var isHighlighted = surnameObj.surnames && surnameObj.surnames.length > 0 && surnameObj.other_surnames && surnameObj.other_surnames.length > 0;
            return React.createElement(
                "div",
                { className: "shared_surname_list_row" + (isHighlighted ? ' highlighted' : ' not_highlighted'),
                    "data-automations": "SharedSurnamesListRow",
                    key: "surname-list-row-" + i },
                this.renderCell(surnameObj.surnames, surnameObj.countries, '', 'SurnameListCell'),
                this.renderCell(surnameObj.other_surnames, surnameObj.other_countries, ' other_cell', 'OtherSurnameListCell')
            );
        }

        /**
         * Render
         */

    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props$surnamesList = this.props.surnamesList,
                surnamesList = _props$surnamesList === undefined ? {} : _props$surnamesList;

            var surnamesData = surnamesList.data || [];

            return surnamesData.length > 0 ? React.createElement(
                "div",
                { className: "shared_surnames_list" },
                surnamesData.map(function (surnameObj, index) {
                    return _this2.renderRow(surnameObj, index);
                })
            ) : null;
        }
    }]);
    return SharedSurnamesList;
}(React$1.Component);

SharedSurnamesList.propTypes = {
    surnamesList: React$1.PropTypes.object
};

var PHOTO_SIZE = 48;

/**
 * @description
 * Show the AllSharedSurnamesModal
 * Showing comparison of two lists of surnames
 * surnamesList is the FG connection FG_Model_Dna_DnaMatch/FG_Model_Dna_SurnameMatch with the argument filter=all
 *
 * @example
 *  <AllSharedSurnamesModal
 *  surnamesList={{
 *      "count": 5,
 *      "data": [
 *          {
 *   			"surnames": [
 *   				"Neches",
 *                 	"Neces"
 *   			],
 *   			"other_surnames": [
 *   				"Neces"
 *   			],
 *               "countries": [
 *                 	{
 *                 		"country": "Israel",
 *                 		"country_code": "IL"
 *                 	}
 *             	],
 *               "other_countries": [
 *               	{
 *                 		"country": "United State",
 *                 		"country_code": "US"
 *                 	}
 *               ]
 *   		},
 *         	{
 *               "surnames": [
 *                   "Elboim"
 *               ],
 *               "other_surnames": [],
 *               "countries": [
 *                   {
 *                       "country": "Israel",
 *                       "country_code": "IL"
 *                   }
 *               ],
 *               "other_countries": []
 *           },
 *           {
 *               "surnames": [],
 *               "other_surnames": [
 *                   "Avrahamof"
 *               ],
 *               "countries": [],
 *               "other_countries": [
 *                   {
 *                       "country": "Israel",
 *                       "country_code": "IL"
 *                   }
 *               ]
 *           },
 *           {
 *               "surnames": [
 *                   "Marcus"
 *               ],
 *               "other_surnames": [
 *                   "Marcus"
 *               ],
 *               "countries": [
 *                   {
 *                       "country": "Israel",
 *                       "country_code": "IL"
 *                   },
 *                   {
 *                       "country": "United State",
 *                       "country_code": "US"
 *                   }
 *               ],
 *               "other_countries": [
 *                   {
 *                       "country": "United State",
 *                       "country_code": "US"
 *                   }
 *               ]
 *           },
 *           {
 *               "surnames": [
 *                   "Karp"
 *               ],
 *               "other_surnames": [],
 *               "countries": [
 *                   {
 *                       "country": "United State",
 *                       "country_code": "US"
 *                   }
 *               ],
 *               "other_countries": []
 *           }
 *   	]
 * }} />
 *
 * @param {Array} surnamesList
 * @param {boolean} [isShown]
 * @param {function} [afterOpen]
 */

var AllSharedSurnamesModal = function (_Component) {
    inherits(AllSharedSurnamesModal, _Component);

    function AllSharedSurnamesModal() {
        classCallCheck(this, AllSharedSurnamesModal);
        return possibleConstructorReturn(this, (AllSharedSurnamesModal.__proto__ || Object.getPrototypeOf(AllSharedSurnamesModal)).apply(this, arguments));
    }

    createClass(AllSharedSurnamesModal, [{
        key: "show",

        /**
         * Show the modal
         */
        value: function show() {
            this.modal && this.modal.show();
        }

        /**
         * @param {Object} profile
         * @param {String} propertyValue
         */

    }, {
        key: "renderProfileDetails",
        value: function renderProfileDetails(profile, propertyValue) {
            return React.createElement(
                CardCol,
                null,
                React.createElement(
                    ProfileDetails,
                    {
                        name: profile.name || '',
                        photoSize: PHOTO_SIZE,
                        photoUrl: extractPhotoUrl(profile.personal_photo),
                        gender: profile.gender,
                        ageGroup: profile.age_group
                    },
                    React.createElement(DetailProperty, { value: propertyValue })
                )
            );
        }

        /**
         * Render
         */

    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                surnamesList = _props.surnamesList,
                isShown = _props.isShown,
                afterOpen = _props.afterOpen,
                currentUserSiteId = _props.currentUserSiteId,
                currentUserTreeId = _props.currentUserTreeId,
                ancestorsGenerations = _props.ancestorsGenerations,
                _props$match = _props.match,
                match = _props$match === undefined ? {} : _props$match;


            var translator = this.getTranslator();
            var kit = match.dna_kit || {};
            var otherKit = match.other_dna_kit || {};
            var profile = kit.member || kit.individual || {};
            var otherProfile = otherKit.member || otherKit.individual || {};
            var treeId = getTreeIdFromKit(kit);
            var yourTreeId = "tree-" + currentUserSiteId + "-" + currentUserTreeId;
            var inTreeKey = treeId === yourTreeId ? 'In your tree' : "In profile name tree " + (profile.gender == 'F' ? 'F' : 'M');

            return React.createElement(
                Modal,
                {
                    showOverlay: true,
                    closeOnOverlayClicked: true,
                    size: SIZE_LARGE$1,
                    ref: function ref(_ref) {
                        return _this2.modal = _ref;
                    },
                    isShown: isShown,
                    afterOpen: afterOpen,
                    className: "all_shared_surnames_modal"
                },
                React.createElement(ModalLayout, {
                    header: translator.translate('All ancestral surnames', 'DNASingleMatch'),
                    body: React.createElement(
                        "div",
                        { className: "all_shared_surnames_body", "data-automations": "AllSharedSurnamesModal" },
                        React.createElement(
                            TwoSidesCard,
                            null,
                            React.createElement(
                                CardHeader,
                                null,
                                this.renderProfileDetails(profile, translator.translateValues(inTreeKey, 'DNASingleMatch', { name: profile.first_name })),
                                this.renderProfileDetails(otherProfile, translator.translate('In matching tree', 'DNASingleMatch'))
                            ),
                            React.createElement(SharedSurnamesList, { surnamesList: surnamesList })
                        )
                    ),
                    footerContent: React.createElement(
                        "div",
                        { className: "surnames_tracing_back" },
                        translator.translateValues('Ancestral surname tracing X generations', 'DNASingleMatch', { ancestors_generations_number: ancestorsGenerations })
                    ),
                    footerButtons: React.createElement(
                        MhButton,
                        {
                            onClick: function onClick() {
                                return _this2.modal && _this2.modal.close();
                            },
                            primary: true,
                            size: SIZE_SMALL,
                            variant: VARIANT_FESTIVE
                        },
                        translator.translate('Close', 'DNAMatches')
                    )
                })
            );
        }
    }]);
    return AllSharedSurnamesModal;
}(React$1.Component);

translatorExtend(AllSharedSurnamesModal);

AllSharedSurnamesModal.propTypes = {
    surnamesList: React$1.PropTypes.object,
    match: React$1.PropTypes.object,
    isShown: React$1.PropTypes.bool,
    afterOpen: React$1.PropTypes.func,
    currentUserSiteId: React$1.PropTypes.string,
    currentUserTreeId: React$1.PropTypes.number,
    ancestorsGenerations: React$1.PropTypes.number
};

/**
 * Checks if we mark possible relationships on the relationship chart
 * @param {Array} relationships
 * @param {Object} relationshipTypes
 * @returns {Boolean}
 */
function isAnyRelationshipMarkedOnTheChart() {
    var relationships = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var relationshipTypes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var isAnyRelationshipMarkedOnTheChart = true,
        relationshipTypesNotMarked = [relationshipTypes.RELATIONSHIP_TYPE_SELF_TWIN, relationshipTypes.RELATIONSHIP_TYPE_SIBLINGS, relationshipTypes.RELATIONSHIP_TYPE_HALF_SIBLINGS, relationshipTypes.RELATIONSHIP_TYPE_SELF, relationshipTypes.RELATIONSHIP_TYPE_TWIN];
    var markedRelationshipsOnTheChart = _.filter(relationships, function (relationship) {
        return !_.contains(relationshipTypesNotMarked, relationship.relationship_type);
    });
    if (markedRelationshipsOnTheChart.length === 0) {
        isAnyRelationshipMarkedOnTheChart = false;
    }

    return isAnyRelationshipMarkedOnTheChart;
}

/**
 * @param {Array} relationships
 * @param {Object} relationshipTypes
 * @returns {Array}
 */
function getHighlightedRelationshipsClasses() {
    var relationships = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var relationshipTypes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var highlightedRelationships = [];
    if (relationships && relationships.length) {
        var relationshipTypesToClasses = getRelationshipTypesToClasses(relationshipTypes),
            relationshipClasses = [],
            classes = void 0,
            relationshipType = void 0;

        for (var i = 0, l = relationships.length; i < l; i++) {
            relationshipType = relationships[i].relationship_type;
            classes = relationshipTypesToClasses[relationshipType] || [];
            relationshipClasses = relationshipClasses.concat(classes);
        }
        highlightedRelationships = relationshipClasses;
    }
    return highlightedRelationships;
}

/**
 * return a mapping for relationship types to stylesheet classes
 * Those classes will become elements to be shown on the chart, based on the relationship types there are linked to
 * IMPORTANT: Those constants are from the php controller which eventually are constants in CfgDnaKit
 * @return {Object}
 */
function getRelationshipTypesToClasses() {
    var _ref;

    var relationshipTypes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return _ref = {}, defineProperty(_ref, relationshipTypes.RELATIONSHIP_TYPE_PARENT_CHILD, ['possible_parent', 'possible_child']), defineProperty(_ref, relationshipTypes.RELATIONSHIP_TYPE_UNCLE_NEPHEW, ['possible_uncle']), defineProperty(_ref, relationshipTypes.RELATIONSHIP_TYPE_GRANDPARENT_GRANDCHILD, ['possible_grandparent', 'possible_grandchild']), defineProperty(_ref, relationshipTypes.RELATIONSHIP_TYPE_GREAT_GRANDPARENT_GREAT_GRANDCHILD, ['possible_great_grandparent']), defineProperty(_ref, relationshipTypes.RELATIONSHIP_TYPE_GREAT_UNCLE_GREAT_NEPHEW, ['possible_great_uncle']), defineProperty(_ref, relationshipTypes.RELATIONSHIP_TYPE_FIRST_COUSINS, ['possible_1st_cousin']), defineProperty(_ref, relationshipTypes.RELATIONSHIP_TYPE_FIRST_COUSINS_ONCE_REMOVED, ['possible_1st_cousin_once_removed_1', 'possible_1st_cousin_once_removed_2']), defineProperty(_ref, relationshipTypes.RELATIONSHIP_TYPE_FIRST_COUSINS_TWICE_REMOVED, ['possible_1st_cousin_twice_removed_1', 'possible_1st_cousin_twice_removed_2']), defineProperty(_ref, relationshipTypes.RELATIONSHIP_TYPE_SECOND_COUSINS, ['possible_2nd_cousin']), defineProperty(_ref, relationshipTypes.RELATIONSHIP_TYPE_THIRD_COUSINS, ['possible_3rd_cousin']), defineProperty(_ref, relationshipTypes.RELATIONSHIP_TYPE_SECOND_COUSINS_ONCE_REMOVED, ['possible_2nd_cousin_once_removed_1', 'possible_2nd_cousin_once_removed_2']), defineProperty(_ref, relationshipTypes.RELATIONSHIP_TYPE_SECOND_COUSINS_TWICE_REMOVED, ['possible_2nd_cousin_twice_removed_1', 'possible_2nd_cousin_twice_removed_2']), defineProperty(_ref, relationshipTypes.RELATIONSHIP_TYPE_THIRD_COUSINS_ONCE_REMOVED, ['possible_3rd_cousin_once_removed_1', 'possible_3rd_cousin_once_removed_2']), defineProperty(_ref, relationshipTypes.RELATIONSHIP_TYPE_FOURTH_COUSINS, ['possible_4th_cousin']), defineProperty(_ref, relationshipTypes.RELATIONSHIP_TYPE_FIFTH_COUSINS, ['possible_5th_cousin']), _ref;
}

/**
 * @param {Translator} translator
 * @returns {function(String, Number?): string}
 */
function getFormatLabelFunction(translator) {
    return function (key) {
        var maxLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 45;
        return ellipsisLabel(capitalizeLabel(translator.translate(key, 'DNAMatchesRelationships2')), maxLength);
    };
}

/**
 * @param {String} key
 * @returns {string}
 */
function capitalizeLabel() {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return key.charAt(0).toUpperCase() + key.slice(1);
}

/**
 * @param {String} key
 * @param {Number} maxLength
 * @returns {string}
 */
function ellipsisLabel(key, maxLength) {
    var ellipsisToken = '...';
    return key && maxLength && key.length > maxLength && maxLength > ellipsisToken.length ? key.slice(0, maxLength - ellipsisToken.length) + ellipsisToken : key;
}

/**
 * @description
 * Show DNA relationships chart explaining the various possible relationships
 *
 * @example
 * <RelationshipsChart
 *          relationships={[{"relationship_type": 9}, {"relationship_type": 11}, {"relationship_type": 12}, {"relationship_type": 14}]}
 *          relationshipTypesConstants={{
 *              "RELATIONSHIP_TYPE_PARENT_CHILD": 1,
 *              "RELATIONSHIP_TYPE_UNCLE_NEPHEW": 2,
 *              "RELATIONSHIP_TYPE_GRANDPARENT_GRANDCHILD": 3,
 *              "RELATIONSHIP_TYPE_GREAT_GRANDPARENT_GREAT_GRANDCHILD": 4,
 *              "RELATIONSHIP_TYPE_GREAT_UNCLE_GREAT_NEPHEW": 5,
 *              "RELATIONSHIP_TYPE_FIRST_COUSINS": 6,
 *              "RELATIONSHIP_TYPE_FIRST_COUSINS_ONCE_REMOVED": 7,
 *              "RELATIONSHIP_TYPE_FIRST_COUSINS_TWICE_REMOVED": 8,
 *              "RELATIONSHIP_TYPE_SECOND_COUSINS": 9,
 *              "RELATIONSHIP_TYPE_THIRD_COUSINS": 11,
 *              "RELATIONSHIP_TYPE_SECOND_COUSINS_ONCE_REMOVED": 12,
 *              "RELATIONSHIP_TYPE_SECOND_COUSINS_TWICE_REMOVED": 14,
 *              "RELATIONSHIP_TYPE_THIRD_COUSINS_ONCE_REMOVED": 15,
 *              "RELATIONSHIP_TYPE_FOURTH_COUSINS": 16,
 *              "RELATIONSHIP_TYPE_FIFTH_COUSINS": 17
 *      }}/>
 *
 * @param {Array} relationships values to show in the data, structured with objects that have a relationship_type field
 * @param {Array} relationshipTypesConstants mapping of relationship_type values to strings
 *
 */

var RelationshipsChart = function (_Component) {
    inherits(RelationshipsChart, _Component);

    function RelationshipsChart(props) {
        classCallCheck(this, RelationshipsChart);

        var _this = possibleConstructorReturn(this, (RelationshipsChart.__proto__ || Object.getPrototypeOf(RelationshipsChart)).call(this, props));

        _this.initLabels();
        return _this;
    }
    /**
     * Init the labels to be calculated once only
     */


    createClass(RelationshipsChart, [{
        key: 'initLabels',
        value: function initLabels() {
            var formatLabel = getFormatLabelFunction(this.getTranslator());
            this.labels = [{ className: 'chart_col_0 chart_row_5', value: formatLabel('Parent') }, { className: 'chart_you chart_row_6', value: formatLabel('You relationship', 6).toUpperCase() }, { className: 'chart_col_0 chart_row_7', value: formatLabel('Child') }, { className: 'chart_col_0 chart_row_8', value: formatLabel('Grandchild') }, { className: 'chart_col_1 chart_row_5', value: formatLabel('Uncle or aunt') }, { className: 'chart_col_1 chart_row_6', value: formatLabel('1st cousin U') }, { className: 'chart_col_1 chart_row_7', value: formatLabel('1st cousin once removed U') }, { className: 'chart_col_1 chart_row_8', value: formatLabel('1st cousin twice removed U') }, { className: 'chart_col_2 chart_row_4', value: formatLabel('Great uncle or great aunt') }, { className: 'chart_col_2 chart_row_5', value: formatLabel('1st cousin once removed U') }, { className: 'chart_col_2 chart_row_6', value: formatLabel('2nd cousin U') }, { className: 'chart_col_2 chart_row_7', value: formatLabel('2nd cousin once removed U') }, { className: 'chart_col_2 chart_row_8', value: formatLabel('2nd cousin twice removed U') }, { className: 'chart_col_3 chart_row_3', value: formatLabel('Great grand uncle or aunt') }, { className: 'chart_col_3 chart_row_4', value: formatLabel('1st cousin twice removed U') }, { className: 'chart_col_3 chart_row_5', value: formatLabel('2nd cousin once removed U') }, { className: 'chart_col_3 chart_row_6', value: formatLabel('3rd cousin U') }, { className: 'chart_col_3 chart_row_7', value: formatLabel('3rd cousin once removed U') }, { className: 'chart_col_3 chart_row_8', value: formatLabel('3rd cousin twice removed U') }, { className: 'chart_col_4 chart_row_2', value: formatLabel('Great great grand uncle or aunt') }, { className: 'chart_col_4 chart_row_3', value: formatLabel('1st cousin thrice removed U') }, { className: 'chart_col_4 chart_row_4', value: formatLabel('2nd cousin twice removed U') }, { className: 'chart_col_4 chart_row_5', value: formatLabel('3rd cousin once removed U') }, { className: 'chart_col_4 chart_row_6', value: formatLabel('4th cousin U') }, { className: 'chart_col_4 chart_row_7', value: formatLabel('4th cousin once removed U') }, { className: 'chart_col_4 chart_row_8', value: formatLabel('4th cousin twice removed U') }, { className: 'chart_col_5 chart_row_1', value: formatLabel('3rd great grand uncle or aunt') }, { className: 'chart_col_5 chart_row_2', value: formatLabel('1st cousin 4 times removed U') }, { className: 'chart_col_5 chart_row_3', value: formatLabel('2nd cousin thrice removed U') }, { className: 'chart_col_5 chart_row_4', value: formatLabel('3rd cousin twice removed U') }, { className: 'chart_col_5 chart_row_5', value: formatLabel('4th cousin once removed U') }, { className: 'chart_col_5 chart_row_6', value: formatLabel('5th cousin U') }, { className: 'chart_col_5 chart_row_7', value: formatLabel('5th cousin once removed U') }, { className: 'chart_col_5 chart_row_8', value: formatLabel('5th cousin twice removed U') }, { className: 'chart_grandparent chart_row_4', value: formatLabel('Grandparent', 75) }, { className: 'chart_great_grandparent chart_row_3', value: formatLabel('Great grandparent', 75) }, { className: 'chart_great_great_grandparent chart_row_2', value: formatLabel('Great great grandparent', 75) }, { className: 'chart_3_great_grandparent chart_row_1', value: formatLabel('3rd great grandparent', 75) }, { className: 'chart_4_great_grandparent chart_row_0', value: formatLabel('4th great grandparent', 75) }];
        }

        /**
         * @param {{className: String, value: String}} label
         */

    }, {
        key: 'renderLabel',
        value: function renderLabel(label) {
            return React.createElement(
                'span',
                { key: label.className, className: label.className },
                React.createElement(
                    'span',
                    null,
                    label.value
                )
            );
        }

        /**
         * @param {Array} highlightedRelationshipsClasses
         */

    }, {
        key: 'renderHighlightedRelationshipsElements',
        value: function renderHighlightedRelationshipsElements() {
            var highlightedRelationshipsClasses = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            return highlightedRelationshipsClasses.map(function (highlightedRelationshipClass) {
                return React.createElement('span', { key: highlightedRelationshipClass, className: highlightedRelationshipClass });
            });
        }

        /**
         * Render
         */

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                relationships = _props.relationships,
                relationshipTypesConstants = _props.relationshipTypesConstants;

            var labels = (this.labels || []).map(function (label) {
                return _this2.renderLabel(label);
            });
            var highlightedRelationshipsClasses = getHighlightedRelationshipsClasses(relationships, relationshipTypesConstants);
            var highlightedRelationshipsElements = this.renderHighlightedRelationshipsElements(highlightedRelationshipsClasses);

            return React.createElement(
                'div',
                { className: 'relation_degree_chart_wrapper' },
                React.createElement(
                    'div',
                    { className: 'dna_matches_relationship_chart' },
                    React.createElement('div', { className: 'relation_degree_chart' }),
                    React.createElement(
                        'div',
                        { className: 'relation_degree_chart_labels' },
                        labels
                    ),
                    highlightedRelationshipsElements && highlightedRelationshipsElements.length > 0 && React.createElement(
                        'div',
                        { className: 'possible_indicator' },
                        highlightedRelationshipsElements
                    )
                )
            );
        }
    }]);
    return RelationshipsChart;
}(React$1.Component);

translatorExtend(RelationshipsChart);

RelationshipsChart.propTypes = {
    relationships: React$1.PropTypes.array.isRequired,
    relationshipTypesConstants: React$1.PropTypes.object.isRequired
};

/**
 * Maximum degrees for tan() formula
 * @type {number}
 */
var MAX_TAN_DEGREE = 90;
/**
 * @type {string}
 */
var HIDDEN_CLASS_SUFFIX = '_hidden';
/**
 * @type {{maxWidth: Number, heightUnit: Number, degrees: Number, className: String, floatSide: String}}
 */
var DEFAULT_LINE_OPTIONS = {
    maxWidth: 1000,
    heightUnit: 10,
    degrees: 45,
    className: 'text_clip_path',
    floatSide: 'right'
};

/**
 * This class helps with alternatives to css clip-path (which is only supported in the current newest chrome browsers [circa August 16'])
 * Note that you need to add styling accordingly!! There is a scss mixin to help you out
 * This should be an instance for only
 *          *one shape for instance!*
 * create more instances of this class multiple usages
 */
var TextClipPathService = function () {
    /**
     * @param {Object} _document
     */
    function TextClipPathService() {
        var _document = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

        classCallCheck(this, TextClipPathService);

        this._document = _document;
        this._element = null;
        this._firstElement = null;
        this._clipPathElements = []; // point of reference for adding elements above it
    }

    // LINE SHAPE
    // ==========
    // This will create

    /**
     * @param {Node} elem
     * @param {
     *          {
     *              maxWidth: Number,
     *              heightUnit: Number,
     *              degrees: Number,
     *              className: String
     *              floatSide: String
     *          }
     * } [options]          maxWidth (pixels) -  will set the max width for the line,
     *                      heightUnit (pixels) - will set the "stairs" height, setting this to very low amounts can make the line more precise but can affect performance
     *                      degrees (0-89.999) - 0 is a flat line, 89.99 is doing nothing really as it will just be next to the element
     *                      className - class to add for each part of the line
     *                      floatSide ("left"|"right") float style content. rtl should have right, ltr left, but of course you may use the same for both.
     */


    createClass(TextClipPathService, [{
        key: 'createLine',
        value: function createLine(elem) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (elem) {
                this._element = elem;
                this._clipPathElements = this.createElementsForLine(options);
                this._firstElement = elem.firstChild;
                this._heightUnit = options.heightUnit || DEFAULT_LINE_OPTIONS.heightUnit;
                this._className = options.className || DEFAULT_LINE_OPTIONS.className;
                for (var i = 0, l = this._clipPathElements.length; i < l; i++) {
                    this.appendBeforeElement(this._clipPathElements[i]);
                }
            }
        }

        /**
         * @param {Object} [options]
         * @returns {Array}
         */

    }, {
        key: 'createElementsForLine',
        value: function createElementsForLine() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var _$extend = _.extend({}, DEFAULT_LINE_OPTIONS, options),
                maxWidth = _$extend.maxWidth,
                heightUnit = _$extend.heightUnit,
                degrees = _$extend.degrees,
                className = _$extend.className,
                floatSide = _$extend.floatSide;

            var elements = [];
            if (degrees < MAX_TAN_DEGREE) {
                for (var width = 0; width < maxWidth; width += heightUnit * this.getTanDeg(degrees)) {
                    var iElem = this._document.createElement('i');
                    iElem.style.height = heightUnit + 'px';
                    iElem.style.width = width + 'px';
                    iElem.style.float = floatSide;
                    iElem.style.clear = 'both';
                    iElem.className = className;
                    elements.push(iElem);
                }
            }
            return elements;
        }

        // END OF LINE SHAPE FUNCTIONS
        // ===========================

        /**
         * @param {Node} newElem
         */

    }, {
        key: 'appendBeforeElement',
        value: function appendBeforeElement(newElem) {
            if (this._element) {
                if (this._firstElement) {
                    this._element.insertBefore(newElem, this._firstElement);
                } else {
                    this._element.appendChild(newElem);
                }
            }
        }

        /**
         * Mark the ones that are outside of the elements to have a _hidden class
         * @param {Number} heightLimit
         */

    }, {
        key: 'markOutsideOfHeightLimit',
        value: function markOutsideOfHeightLimit(heightLimit) {
            var height = 0;
            for (var i = 0, l = this._clipPathElements.length; i < l; i++) {
                height += this._heightUnit;
                if (height > heightLimit) {
                    this._clipPathElements[i].className = '' + this._className + HIDDEN_CLASS_SUFFIX;
                } else if (this._clipPathElements[i].className !== this._className) {
                    this._clipPathElements[i].className = this._className;
                }
            }
        }

        /**
         * Tan in degrees
         * Use to determine the length of Y based on X:
         *     /|
         *    /a|
         *   /  | X
         *  /   |
         * /    |
         * ------
         *   Y
         * tan(a) = Y/X
         * X * tan(a) = Y
         *
         * @param {Number} deg
         * @returns {number}
         */

    }, {
        key: 'getTanDeg',
        value: function getTanDeg(deg) {
            var inRad = deg * Math.PI / 180;
            return Math.tan(inRad);
        }
    }]);
    return TextClipPathService;
}();

/**
 * Helper class for registering events on elements
 */
var EventsContainerService = function () {
    function EventsContainerService() {
        classCallCheck(this, EventsContainerService);

        this.container = [];
    }

    /**
     * @param {HTMLElement} element
     * @param {String} eventName
     * @param {Function} eventFn
     */


    createClass(EventsContainerService, [{
        key: 'addEvent',
        value: function addEvent(element, eventName, eventFn) {
            if (element && element.addEventListener && eventName && typeof eventFn === 'function') {
                this.container.push({ element: element, eventName: eventName, eventFn: eventFn });
                element.addEventListener(eventName, eventFn);
            }
        }

        /**
         * remove all the listeners
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            for (var i = 0, l = this.container.length; i < l; i++) {
                this.container[i].element.removeEventListener(this.container[i].eventName, this.container[i].eventFn);
            }
        }
    }]);
    return EventsContainerService;
}();

/**
 * Create a line instance with bound events for resizing the window
 * @param {HTMLElement} element
 * @param {{
 *              maxWidth: Number,
 *              heightUnit: Number,
 *              degrees: Number,
 *              className: String
 *              floatSide: String
 *          }} [options] see TextClipPathService.createLine for more info, and DEFAULT_LINE_OPTIONS in the same service for the defaults
 * @param {Object} [_window]
 * @returns {{destroy: function}}
 */
function createLine(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _window = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;

    var height = element.offsetHeight;
    var clipPathService = new TextClipPathService();
    clipPathService.createLine(element, options);
    clipPathService.markOutsideOfHeightLimit(height);
    var eventsContainerService = new EventsContainerService();

    // binding window resize event
    var bindSize = function bindSize() {
        var newHeight = element.offsetHeight;
        if (height !== newHeight) {
            height = newHeight;
            clipPathService.markOutsideOfHeightLimit(height);
        }
    };
    eventsContainerService.addEvent(_window, 'resize', _window._.throttle(bindSize));

    return {
        destroy: function destroy() {
            return eventsContainerService.destroy();
        }
    };
}

/**
 * Receive the "return value" of createLine and unbind its events by it
 * @param  {{destroy: Function}} destroyPromise
 */
function destroyLine(destroyPromise) {
    destroyPromise && destroyPromise.destroy && destroyPromise.destroy();
}

/**
 * Show DNA Matches relationships header between two matches, decide on the version of the header based on the relationships
 * For multiple it will show plural version
 * For cousins range it will show plural as well (even though there is only one relationship)
 * @param {Array} [relationships] array of FG_Model_Dna_DnaMatchRelationship
 * @param {Number} cousinsTypeMinimum
 * @returns {string}
 */


/**
 * @param {String} relationship
 * @returns {string}
 */


/**
 * Get Estimated Relationship To translation, regarding you/not you and female/male
 * @param {{gender: String}} profile
 * @param {boolean} [profileIsCurrentUser=false]
 * @param {boolean} [withBold=true]
 * @returns {string}
 */


/**
 * Get relationships complete text
 * A formatted text of the complete relationships separated by commas
 * @param {Array} completeRelationships
 * @returns {string}
 */
function getRelationshipsCompleteText() {
    var completeRelationships = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var text = '';

    // Make sure we reject objects with no relationship degree string in it
    var relations = _.reject(completeRelationships, function (relation) {
        return !relation.relationship_degree;
    });

    _.each(relations, function (relation, index) {
        if (relation.relationship_degree) {
            text += relation.relationship_degree;
            if (relations.length > 1 && index < relations.length - 1) {
                text += ', ';
            }
        }
    });

    return text;
}

/**
 * Checks if the refined is lesser or different then the complete set of possible relationships
 * To indicate there is a difference between them
 * @param {Array} completeRelationships
 * @param {Array} refinedRelationships
 * @param {String} [exactRelationship]
 * @returns {Boolean}
 */
function isRefinedRelationsDifferentFromComplete() {
    var completeRelationships = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var refinedRelationships = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var exactRelationship = arguments[2];

    var completeDnaRelationships = _.pluck(completeRelationships, 'relationship_type'),
        refinedDnaRelationships = _.pluck(refinedRelationships, 'relationship_type');
    // exact relationship is filled, then we showed it on the match
    // or
    //  A n B !== B  =>  A !== B
    return !!exactRelationship || _.intersection(refinedDnaRelationships, completeDnaRelationships).length !== completeDnaRelationships.length;
}

/**
 * @description
 * Show a modal describing the possible relationships this match have
 *
 * @example
 * <PossibleRelationshipsModal
 *      completeRelationships={[{"relationship_type": 9}, {"relationship_type": 11}, {"relationship_type": 12}, {"relationship_type": 14}]}
 *      relationshipTypesConstants={{
 *          "RELATIONSHIP_TYPE_PARENT_CHILD": 1,
 *          "RELATIONSHIP_TYPE_UNCLE_NEPHEW": 2,
 *          "RELATIONSHIP_TYPE_GRANDPARENT_GRANDCHILD": 3,
 *          "RELATIONSHIP_TYPE_GREAT_GRANDPARENT_GREAT_GRANDCHILD": 4,
 *          "RELATIONSHIP_TYPE_GREAT_UNCLE_GREAT_NEPHEW": 5,
 *          "RELATIONSHIP_TYPE_FIRST_COUSINS": 6,
 *          "RELATIONSHIP_TYPE_FIRST_COUSINS_ONCE_REMOVED": 7,
 *          "RELATIONSHIP_TYPE_FIRST_COUSINS_TWICE_REMOVED": 8,
 *          "RELATIONSHIP_TYPE_SECOND_COUSINS": 9,
 *          "RELATIONSHIP_TYPE_THIRD_COUSINS": 11,
 *          "RELATIONSHIP_TYPE_SECOND_COUSINS_ONCE_REMOVED": 12,
 *          "RELATIONSHIP_TYPE_SECOND_COUSINS_TWICE_REMOVED": 14,
 *          "RELATIONSHIP_TYPE_THIRD_COUSINS_ONCE_REMOVED": 15,
 *          "RELATIONSHIP_TYPE_FOURTH_COUSINS": 16,
 *          "RELATIONSHIP_TYPE_FIFTH_COUSINS": 17
 * }}/>
 *
 * @param {Array} [completeRelationships] e.g. dna_match.complete_dna_relationships
 * @param {Array} [refinedRelationships] e.g. dna_match.refined_dna_relationships
 * @param {Object} [relationshipTypesConstants]
 * @param {String} [exactRelationship]
 * @param {boolean} [isShown]
 * @param {Function} [afterOpen]
 */

var PossibleRelationshipsModal = function (_Component) {
    inherits(PossibleRelationshipsModal, _Component);

    function PossibleRelationshipsModal() {
        classCallCheck(this, PossibleRelationshipsModal);
        return possibleConstructorReturn(this, (PossibleRelationshipsModal.__proto__ || Object.getPrototypeOf(PossibleRelationshipsModal)).apply(this, arguments));
    }

    createClass(PossibleRelationshipsModal, [{
        key: 'show',

        /**
         * Show the modal
         */
        value: function show() {
            this.modal && this.modal.show();
        }

        /**
         * Open the modal
         */

    }, {
        key: 'onModalOpen',
        value: function onModalOpen() {
            this.textClipPathLine = createLine(this.relationshipText, { maxWidth: 900, degrees: 60 });
            this.props.afterOpen && this.props.afterOpen();
        }

        /**
         * Remove event listeners
         */

    }, {
        key: 'onModalClose',
        value: function onModalClose() {
            destroyLine(this.textClipPathLine);
        }

        /**
         * Render the modal body
         */

    }, {
        key: 'renderModalBody',
        value: function renderModalBody() {
            var _this2 = this;

            var translator = this.getTranslator();
            var _props = this.props,
                completeRelationships = _props.completeRelationships,
                refinedRelationships = _props.refinedRelationships,
                relationshipTypesConstants = _props.relationshipTypesConstants,
                exactRelationship = _props.exactRelationship;

            var relationshipsCompleteText = getRelationshipsCompleteText(completeRelationships);

            var weHaveFoundParagraph = completeRelationships && completeRelationships.length > 0 ? replaceValueJsx(translator.translate('We have found the following', 'DNAMatches'), 'relationships', React.createElement(
                'b',
                null,
                relationshipsCompleteText
            )) : null;

            var markedOnTheChartParagraph = isAnyRelationshipMarkedOnTheChart(completeRelationships, relationshipTypesConstants) ? translator.translate('mark in the diagram', 'DNAMatches') : null;

            var refinedDifferentFromCompleteParagraph = isRefinedRelationsDifferentFromComplete(completeRelationships, refinedRelationships, exactRelationship) ? translator.translate('Every DNA Match', 'DNAMatches') : null;
            return React.createElement(
                'div',
                { className: 'possible_relationships_modal' },
                React.createElement(
                    'div',
                    { className: 'relationship_modal_body', ref: function ref(div) {
                            return _this2.relationshipText = div;
                        } },
                    weHaveFoundParagraph,
                    React.createElement('br', null),
                    !!markedOnTheChartParagraph && React.createElement('br', null),
                    markedOnTheChartParagraph,
                    !!refinedDifferentFromCompleteParagraph && React.createElement('br', null),
                    refinedDifferentFromCompleteParagraph
                ),
                React.createElement(RelationshipsChart, { relationships: completeRelationships,
                    relationshipTypesConstants: relationshipTypesConstants })
            );
        }

        /**
         * Render the match quality section
         */

    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var translator = this.getTranslator();
            var modalBody = this.renderModalBody();
            var isShown = this.props.isShown;


            return React.createElement(
                Modal,
                { showOverlay: true, closeOnOverlayClicked: true, size: SIZE_LARGE$1, isShown: isShown,
                    ref: function ref(_ref) {
                        _this3.modal = _ref;
                    },
                    afterOpen: function afterOpen() {
                        return _this3.onModalOpen();
                    },
                    afterClose: function afterClose() {
                        return _this3.onModalClose();
                    } },
                React.createElement(ModalLayout, {
                    header: translator.translate('Possible relationship details', 'DNAMatches'),
                    body: modalBody,
                    footerButtons: React.createElement(
                        MhButton,
                        { onClick: function onClick() {
                                return _this3.modal && _this3.modal.close();
                            }, primary: true, size: SIZE_SMALL },
                        translator.translate('Close', 'DNAMatches')
                    )
                })
            );
        }
    }]);
    return PossibleRelationshipsModal;
}(React$1.Component);

translatorExtend(PossibleRelationshipsModal);

PossibleRelationshipsModal.propTypes = {
    completeRelationships: React$1.PropTypes.array,
    refinedRelationships: React$1.PropTypes.array,
    relationshipTypesConstants: React$1.PropTypes.object,
    exactRelationship: React$1.PropTypes.string,
    isShown: React$1.PropTypes.bool,
    afterOpen: React$1.PropTypes.func
};

var PROFILE_PHOTO_SIZE = 75;

/**
 * @description
 * Show Shared Match Profile between two DNA kits.
 *
 * @example
 *  <SharedMatchProfile matchSide="0.7% (39.8 cM)" otherMatchSide="10.7% (502.9 cM)"
 *      profilePhotoUrl='https://i.imgur.com/miq1LV9.png' profileAgeGroup='A' profileGender='M' profileName="Rick Grimes">
 *  </SharedMatchProfile>
 *
 * @param {*} matchSide
 * @param {*} otherMatchSide
 * @param {String} [profilePhotoUrl]
 * @param {String} [profileAgeGroup]
 * @param {String} [profileGender]
 * @param {String} profileName
 * @param {Function} [onProfileNameClick]
 */
function SharedMatchProfile(_ref) {
    var matchSide = _ref.matchSide,
        otherMatchSide = _ref.otherMatchSide,
        profilePhotoUrl = _ref.profilePhotoUrl,
        profileAgeGroup = _ref.profileAgeGroup,
        profileGender = _ref.profileGender,
        profileName = _ref.profileName,
        onProfileNameClick = _ref.onProfileNameClick;

    return React.createElement(
        'div',
        { className: 'shared_match_profile' },
        React.createElement(
            'div',
            { className: 'shared_match_profile_inner' },
            React.createElement(
                'div',
                { className: 'dna_match_side' },
                matchSide
            ),
            React.createElement(ProfilePhoto, { photoUrl: profilePhotoUrl, ageGroup: profileAgeGroup, gender: profileGender,
                size: PROFILE_PHOTO_SIZE }),
            React.createElement(
                'div',
                { className: 'other_dna_match_side' },
                otherMatchSide
            )
        ),
        React.createElement(
            'a',
            { className: 'shared_profile_name', 'data-automations': 'SharedMatchProfileName',
                onClick: function onClick() {
                    return onProfileNameClick && onProfileNameClick();
                } },
            profileName
        )
    );
}

SharedMatchProfile.propTypes = {
    matchSide: React$1.PropTypes.node.isRequired,
    otherMatchSide: React$1.PropTypes.node.isRequired,
    profilePhotoUrl: React$1.PropTypes.string,
    profileAgeGroup: React$1.PropTypes.string,
    profileGender: React$1.PropTypes.string,
    profileName: React$1.PropTypes.node.isRequired,
    onProfileNameClick: React$1.PropTypes.func
};

/**
 * Get shared surnames explanatory description key
 * @param {boolean} profileIsCurrentUser
 * @param {boolean} otherProfileIsCurrentUser
 * @param {Number} surnamesCount
 * @returns {string}
 */


/**
 * Get no shared surnames explanatory description key for creating a tree
 * @param {boolean} profileIsCurrentUser
 * @param {boolean} otherProfileIsCurrentUser
 * @returns {string}
 */


/**
 * Get no shared surnames explanatory description key for waiting to recalculation
 * @param {boolean} profileIsCurrentUser
 * @param {boolean} otherProfileIsCurrentUser
 * @returns {string}
 */


/**
 * Get no shared surnames explanatory description key
 * @param {boolean} profileIsCurrentUser
 * @param {boolean} otherProfileIsCurrentUser
 * @returns {string}
 */


/**
 * @param {Number} ancestorsCount
 * @param {Number} surnamesCount
 * @returns {string}
 */
function getSharedSurnamesMoreAncestorsTranslationKey(ancestorsCount, surnamesCount) {
    var key = 'Plus more ancestor with multiple surnames';
    if (ancestorsCount === 1) {
        if (surnamesCount === 1) {
            key = 'Plus one more ancestor with surname';
        } else {
            key = 'Plus one more ancestor with multiple surnames';
        }
    } else {
        if (surnamesCount === 1) {
            key = 'Plus more ancestor with surname';
        }
    }

    return key;
}

/**
 * @param {array} surnamesData
 * @param {string} prefix
 * @returns {Array}
 */

var PROFILE_PHOTO_SIZE$1 = 75;
var INDIVIDUALS_IN_CARD = 5;
var SURNAMES_SEPARATOR$1 = ', ';

/**
 * @description
 * Show shared surname comparison
 * Showing both sides of the surname, with variations for writing this surname
 *
 * @param {function} onToggle callback for collapse changing
 * @param {array} surnames list of possible surnames variations for this surname
 * @param {array} individualAncestors ancestors of "your" side presented by FG individuals
 * @param {array} otherIndividualAncestors ancestors of the other side presented by FG individuals
 * @param {boolean} profileIsCurrentUser
 * @param {boolean} otherProfileIsCurrentUser
 * @param {boolean} [initialIsOpened=true] should the collapse be opened by default or close
 * @param {string} profileName
 * @param {string} otherProfileName
 */

var SharedSurnameComparison = function (_Component) {
    inherits(SharedSurnameComparison, _Component);

    function SharedSurnameComparison(props) {
        classCallCheck(this, SharedSurnameComparison);

        var _this = possibleConstructorReturn(this, (SharedSurnameComparison.__proto__ || Object.getPrototypeOf(SharedSurnameComparison)).call(this, props));

        _this.collapsibleCard = null;
        _this.otherCollapsibleCard = null;
        return _this;
    }

    /**
     * @param {boolean} isOpened
     */


    createClass(SharedSurnameComparison, [{
        key: "onSurnameChange",
        value: function onSurnameChange(isOpened) {
            var fnName = isOpened ? 'open' : 'close';
            this.collapsibleCard && this.collapsibleCard[fnName]();
            this.otherCollapsibleCard && this.otherCollapsibleCard[fnName]();
            this.props.onToggle && this.props.onToggle(isOpened);
        }

        /**
         * @param {Array} surnames
         * @param {Object} individual
         * @param {String} relationshipDescription
         * @param {boolean} profileIsYou
         * @param {String} profileName
         */

    }, {
        key: "renderIndividualDetails",
        value: function renderIndividualDetails(surnames, individual, relationshipDescription, profileIsYou, profileName) {
            var translator = this.getTranslator();

            var name = individual.name;
            for (var i = 0, l = surnames.length; i < l; i++) {
                if (name.indexOf(surnames[i]) !== -1) {
                    name = transformToJsx(name, new RegExp(surnames[i] + '(?!\\w)'), React.createElement(
                        "b",
                        { "data-automations": "EmphasisedSharedSurname" },
                        surnames[i]
                    ));
                    break;
                }
            }

            var relationshipTranslationKey = profileIsYou ? 'Your relationship to' : 'Relation of';
            var relationship = translator.translateValues(relationshipTranslationKey, 'Relationships2', {
                person: profileName,
                relationship: relationshipDescription.charAt(0).toLowerCase() + relationshipDescription.slice(1)
            });

            return React.createElement(
                "div",
                { className: "individual_details", key: individual.id },
                React.createElement(
                    ProfileDetails,
                    {
                        name: name,
                        gender: individual.gender,
                        ageGroup: individual.age_group,
                        photoSize: PROFILE_PHOTO_SIZE$1,
                        photoUrl: extractPhotoUrl(individual.personal_photo) },
                    React.createElement(
                        "div",
                        { className: "individual_details_relationship" },
                        relationship
                    )
                )
            );
        }

        /**
         * @param {String} refNamespace the string name to save the ref on the this
         * @param {boolean} initialIsOpened
         * @param {array} surnames
         * @param {boolean} profileIsCurrentUser
         * @param {String} profileName
         * @param {Array} individuals
         * @param {String} individualsAddedClass css class to be added for the individuals
         * @param {Number} individualsNotShownCount the count of individuals that were not shown (for + X more ancestors)
         * @param {String} dataAutomationsPrefix
         */

    }, {
        key: "renderCard",
        value: function renderCard(refNamespace, initialIsOpened, surnames, profileIsCurrentUser, profileName, individuals, individualsAddedClass, individualsNotShownCount, dataAutomationsPrefix) {
            var _this2 = this;

            var translator = this.getTranslator();
            var surnamesList = surnames.join(SURNAMES_SEPARATOR$1);
            var individualsNotShownTranslationKey = getSharedSurnamesMoreAncestorsTranslationKey(individualsNotShownCount, surnames.length);

            return React.createElement(
                CollapsibleCard,
                {
                    variant: VARIANT_EXPANDED,
                    initialIsOpened: initialIsOpened,
                    onChange: function onChange(isOpened) {
                        return _this2.onSurnameChange(isOpened);
                    },
                    header: React.createElement(
                        "span",
                        { className: "surname_name_list", "data-automations": dataAutomationsPrefix + "SurnameNameList" },
                        surnamesList
                    ),
                    ref: function ref(_ref) {
                        return _this2[refNamespace] = _ref;
                    } },
                React.createElement(
                    "div",
                    { className: "shared_surnames_individuals" + individualsAddedClass,
                        "data-automations": dataAutomationsPrefix + "SurnameIndividuals" },
                    individuals.map(function (relationship) {
                        return _this2.renderIndividualDetails(surnames, relationship.individual, relationship.relationship_description, profileIsCurrentUser, profileName);
                    }),
                    individualsNotShownCount > 0 && React.createElement(
                        "div",
                        { className: "individual_details plus_more_ancestors" },
                        replaceValueJsx(translator.translateValues(individualsNotShownTranslationKey, 'DNASingleMatch', { ancestors_count: individualsNotShownCount }), 'surnames', React.createElement(
                            "b",
                            null,
                            surnamesList
                        ))
                    )
                )
            );
        }

        /**
         * Render
         */

    }, {
        key: "render",
        value: function render() {
            var _props = this.props,
                _props$surnames = _props.surnames,
                surnames = _props$surnames === undefined ? [] : _props$surnames,
                _props$individualAnce = _props.individualAncestors,
                individualAncestors = _props$individualAnce === undefined ? {} : _props$individualAnce,
                _props$otherIndividua = _props.otherIndividualAncestors,
                otherIndividualAncestors = _props$otherIndividua === undefined ? {} : _props$otherIndividua,
                _props$initialIsOpene = _props.initialIsOpened,
                initialIsOpened = _props$initialIsOpene === undefined ? true : _props$initialIsOpene,
                _props$profileIsCurre = _props.profileIsCurrentUser,
                profileIsCurrentUser = _props$profileIsCurre === undefined ? false : _props$profileIsCurre,
                _props$otherProfileIs = _props.otherProfileIsCurrentUser,
                otherProfileIsCurrentUser = _props$otherProfileIs === undefined ? false : _props$otherProfileIs,
                _props$profileName = _props.profileName,
                profileName = _props$profileName === undefined ? '' : _props$profileName,
                _props$otherProfileNa = _props.otherProfileName,
                otherProfileName = _props$otherProfileNa === undefined ? '' : _props$otherProfileNa;


            var individuals = (individualAncestors.data || []).slice(0, INDIVIDUALS_IN_CARD);
            var otherIndividuals = (otherIndividualAncestors.data || []).slice(0, INDIVIDUALS_IN_CARD);
            var individualsAddedClass = individuals.length < otherIndividuals.length ? ' show_last_border' : '';
            var otherIndividualsAddedClass = otherIndividuals.length < individuals.length ? ' show_last_border' : '';
            var individualsNotShownCount = individualAncestors.count - individuals.length;
            var otherIndividualsNotShownCount = otherIndividualAncestors.count - otherIndividuals.length;

            return React.createElement(
                "div",
                { className: "shared_surnames_comparison", "data-automations": "SharedSurnamesComparison" },
                this.renderCard('collapsibleCard', initialIsOpened, surnames, profileIsCurrentUser, profileName, individuals, individualsAddedClass, individualsNotShownCount, ''),
                React.createElement("div", { className: "collapsible_cards_separator" }),
                this.renderCard('otherCollapsibleCard', initialIsOpened, surnames, otherProfileIsCurrentUser, otherProfileName, otherIndividuals, otherIndividualsAddedClass, otherIndividualsNotShownCount, 'Other')
            );
        }
    }]);
    return SharedSurnameComparison;
}(React$1.Component);

translatorExtend(SharedSurnameComparison);

SharedSurnameComparison.propTypes = {
    onToggle: React$1.PropTypes.func,
    surnames: React$1.PropTypes.array,
    individualAncestors: React$1.PropTypes.object,
    otherIndividualAncestors: React$1.PropTypes.object,
    profileIsCurrentUser: React$1.PropTypes.bool,
    otherProfileIsCurrentUser: React$1.PropTypes.bool,
    initialIsOpened: React$1.PropTypes.bool,
    profileName: React$1.PropTypes.string,
    otherProfileName: React$1.PropTypes.string
};

var IMMEDIATE_FAMILY_PARENTS = 'parents';
var IMMEDIATE_FAMILY_SIBLINGS = 'siblings';
var IMMEDIATE_FAMILY_SPOUSES = 'spouses';
var IMMEDIATE_FAMILY_CHILDREN = 'children';

var RELATIONSHIP_FATHER = 'father';
var RELATIONSHIP_MOTHER = 'mother';
var RELATIONSHIP_PARENT = 'parent';

var RELATIONSHIP_BROTHER = 'brother';
var RELATIONSHIP_SISTER = 'sister';
var RELATIONSHIP_SIBLING = 'sibling';

var RELATIONSHIP_HUSBAND = 'husband';
var RELATIONSHIP_WIFE = 'wife';
var RELATIONSHIP_PARTNER = 'partner';
var RELATIONSHIP_EX_HUSBAND = 'ex-husband';
var RELATIONSHIP_EX_WIFE = 'ex-wife';
var RELATIONSHIP_EX_PARTNER = 'ex-partner';

var RELATIONSHIP_SON = 'son';
var RELATIONSHIP_DAUGHTER = 'daughter';
var RELATIONSHIP_CHILD = 'child';

/**
 * Service for aggregating immediate family members into groups
 */

var ImmediateFamilyAggregationService = function () {

    /**
     * @param {Translator} translator
     */
    function ImmediateFamilyAggregationService(translator) {
        classCallCheck(this, ImmediateFamilyAggregationService);

        this.translator = translator;
    }

    /**
     * Returns the immediate family aggregation
     * @param immediateFamily
     * @return {Object}
     */


    createClass(ImmediateFamilyAggregationService, [{
        key: 'getImmediateFamilyAggregation',
        value: function getImmediateFamilyAggregation(immediateFamily) {
            var _$pick;

            var immediateFamilyGroups = this.getImmediateFamilyGroups(immediateFamily);

            return _.pick((_$pick = {}, defineProperty(_$pick, IMMEDIATE_FAMILY_PARENTS, this.getParents(immediateFamilyGroups[IMMEDIATE_FAMILY_PARENTS])), defineProperty(_$pick, IMMEDIATE_FAMILY_SIBLINGS, this.getSiblings(immediateFamilyGroups[IMMEDIATE_FAMILY_SIBLINGS])), defineProperty(_$pick, IMMEDIATE_FAMILY_SPOUSES, this.getSpouses(immediateFamilyGroups[IMMEDIATE_FAMILY_SPOUSES])), defineProperty(_$pick, IMMEDIATE_FAMILY_CHILDREN, this.getChildren(immediateFamilyGroups[IMMEDIATE_FAMILY_CHILDREN])), _$pick), function (value) {
                return value !== null;
            });
        }

        /**
         * Returns groups of immediate family members
         * @param {Object} immediateFamily
         * @return {Object}
         */

    }, {
        key: 'getImmediateFamilyGroups',
        value: function getImmediateFamilyGroups(immediateFamily) {
            var _ref;

            var parents = [],
                siblings = [],
                spouses = [],
                children = [];

            _.each(immediateFamily, function (familyMember) {
                switch (familyMember.relationship_type) {

                    case RELATIONSHIP_FATHER:
                    case RELATIONSHIP_MOTHER:
                    case RELATIONSHIP_PARENT:
                        parents.push(familyMember);
                        break;

                    case RELATIONSHIP_BROTHER:
                    case RELATIONSHIP_SISTER:
                    case RELATIONSHIP_SIBLING:
                        siblings.push(familyMember);
                        break;

                    case RELATIONSHIP_HUSBAND:
                    case RELATIONSHIP_WIFE:
                    case RELATIONSHIP_PARTNER:
                    case RELATIONSHIP_EX_HUSBAND:
                    case RELATIONSHIP_EX_WIFE:
                    case RELATIONSHIP_EX_PARTNER:
                        spouses.push(familyMember);
                        break;

                    case RELATIONSHIP_SON:
                    case RELATIONSHIP_DAUGHTER:
                    case RELATIONSHIP_CHILD:
                        children.push(familyMember);
                        break;
                }
            });

            return _ref = {}, defineProperty(_ref, IMMEDIATE_FAMILY_PARENTS, parents), defineProperty(_ref, IMMEDIATE_FAMILY_SIBLINGS, siblings), defineProperty(_ref, IMMEDIATE_FAMILY_SPOUSES, spouses), defineProperty(_ref, IMMEDIATE_FAMILY_CHILDREN, children), _ref;
        }

        /**
         * Returns the parents label and text
         * @param parents
         * @return {Array}
         */

    }, {
        key: 'getParents',
        value: function getParents(parents) {
            var _this = this;

            var parentsNames = _.map(parents, function (parent) {
                return _this.getFamilyMemberName(parent, true);
            });

            if (parentsNames.length == 1) {
                return {
                    label: this.translator.translate('Relatives ' + parents[0].relationship_type, 'Individuals'),
                    text: parentsNames[0]
                };
            } else if (parentsNames.length > 1) {
                return {
                    label: this.translator.translate('Relatives parents', 'Individuals'),
                    text: this.getRelativesListText(parentsNames)
                };
            } else {
                return null;
            }
        }

        /**
         * Returns the siblings label and text
         * @param siblings
         * @return {Array}
         */

    }, {
        key: 'getSiblings',
        value: function getSiblings(siblings) {
            var _this2 = this;

            var siblingNames = _.map(siblings, function (sibling) {
                return _this2.getFamilyMemberName(sibling, false);
            });

            if (siblingNames.length) {
                return {
                    label: this.getSiblingsLabel(siblings),
                    text: siblingNames.length == 1
                    // Anna
                    ? siblingNames[0]
                    // Anna, Billy and Cindy
                    : this.getRelativesListText(siblingNames)
                };
            } else {
                return null;
            }
        }

        /**
         * Returns the spouses label and text
         * @param spouses
         * @return {Array}
         */

    }, {
        key: 'getSpouses',
        value: function getSpouses(spouses) {
            var _this3 = this;

            var spousesNames = _.map(spouses, function (spouse) {
                return _this3.getFamilyMemberName(spouse, true);
            });

            if (spousesNames.length == 1) {
                return {
                    label: this.translator.translate('Relatives ' + spouses[0].relationship_type.replace('-', ' '), 'Individuals'),
                    text: spousesNames[0]
                };
            } else if (spousesNames.length > 1) {
                return {
                    label: this.translator.translate('Relatives partners', 'Individuals'),
                    text: this.getRelativesListText(spousesNames)
                };
            } else {
                return null;
            }
        }

        /**
         * Returns the children label and text
         * @param children
         * @return {Array}
         */

    }, {
        key: 'getChildren',
        value: function getChildren(children) {
            var _this4 = this;

            var childrenNames = _.map(children, function (child) {
                return _this4.getFamilyMemberName(child, false);
            });

            if (childrenNames.length) {
                return {
                    label: this.getChildrenLabel(children),
                    text: childrenNames.length == 1
                    // Anna
                    ? childrenNames[0]
                    // Anna, Billy and Cindy
                    : this.getRelativesListText(childrenNames)
                };
            } else {
                return null;
            }
        }

        /**
         * Returns the family member name
         * @param {Object} familyMember
         * @param {boolean} useLongName
         * @return {string}
         */

    }, {
        key: 'getFamilyMemberName',
        value: function getFamilyMemberName(familyMember, useLongName) {
            return useLongName ? familyMember.individual.name : familyMember.individual.first_name;
        }

        /**
         * Returns the text for a family members list
         * @param familyMembersNames
         * @return {string}
         */

    }, {
        key: 'getRelativesListText',
        value: function getRelativesListText(familyMembersNames) {
            return this.translator.translateValues('Relatives list', 'Individuals', [familyMembersNames.slice(0, -1).join(', '), familyMembersNames.splice(-1, 1).pop()]);
        }

        /**
         * Returns the label for the list of siblings
         * @param {Array} siblings
         * @return {string}
         */

    }, {
        key: 'getSiblingsLabel',
        value: function getSiblingsLabel(siblings) {
            var label = '';
            var siblingsGender = this.getFamilyMembersGender(siblings);

            switch (siblingsGender) {
                case 'U':
                    label = this.translator.translate('Relatives sibling', 'Individuals');
                    break;

                case 'UU':
                    label = this.translator.translate('Relatives siblings', 'Individuals');
                    break;

                case 'F':
                    label = this.translator.translate('Relatives sister', 'Individuals');
                    break;

                case 'FF':
                    label = this.translator.translate('Relatives sisters', 'Individuals');
                    break;

                case 'M':
                    label = this.translator.translate('Relatives brother', 'Individuals');
                    break;

                case 'MM':
                    label = this.translator.translate('Relatives brothers', 'Individuals');
                    break;

                default:
                    if (siblings.length == 1) {
                        label = this.translator.translate('Relatives sibling', 'Individuals');
                    } else {
                        label = this.translator.translate('Relatives siblings', 'Individuals');
                    }
            }

            return label;
        }

        /**
         * Returns the label for the list of children
         * @param {Array} children
         * @return {string}
         */

    }, {
        key: 'getChildrenLabel',
        value: function getChildrenLabel(children) {
            var label = '';
            var childrenGender = this.getFamilyMembersGender(children);

            switch (childrenGender) {
                case 'U':
                    label = this.translator.translate('Relatives child', 'Individuals');
                    break;

                case 'UU':
                    label = this.translator.translate('Relatives children', 'Individuals');
                    break;

                case 'F':
                    label = this.translator.translate('Relatives daughter', 'Individuals');
                    break;

                case 'FF':
                    label = this.translator.translate('Relatives daughters', 'Individuals');
                    break;

                case 'M':
                    label = this.translator.translate('Relatives son', 'Individuals');
                    break;

                case 'MM':
                    label = this.translator.translate('Relatives sons', 'Individuals');
                    break;

                default:
                    if (children.length == 1) {
                        label = this.translator.translate('Relatives child', 'Individuals');
                    } else {
                        label = this.translator.translate('Relatives children', 'Individuals');
                    }
            }

            return label;
        }

        /**
         * Returns a string that represents the genders of given family members list
         * When there's only one family member in the list, this will return either M, F or U which also indicates there's only one family member
         * Where there several family members in the list, this will return either MM, FF or UU which indicates the list has several members and that they
         * all have the same gender or mixed gender
         * @param {Array} familyMembers
         * @return {string}
         */

    }, {
        key: 'getFamilyMembersGender',
        value: function getFamilyMembersGender(familyMembers) {
            return familyMembers.reduce(function (familyMembersGender, familyMember) {
                var gender = familyMember.individual.gender;
                if (familyMembersGender == null) {
                    // this is the first family member, set the family members gender with the current one
                    familyMembersGender = gender;
                } else {
                    // this is not the family member
                    if (familyMembersGender == gender || familyMembersGender == '' + gender + gender) {
                        // the family members still have the same gender
                        familyMembersGender = '' + gender + gender;
                    } else {
                        // this family members have mixed genders
                        familyMembersGender = 'UU';
                    }
                }

                return familyMembersGender;
            }, null);
        }
    }]);
    return ImmediateFamilyAggregationService;
}();

/**
 * Aggregates immediate family members into groups
 * Each family member in the given immediate family list should have the following json structure:
 * {
 *   relationship_type,
 *   individual {
 *     name
 *     first_name
 *     gender
 *   }
 * }
 * @param {Array} immediateFamily
 * @param {Translator} translator
 * @return {Array}
 */
function getImmediateFamilyAggregation(immediateFamily, translator) {
  return new ImmediateFamilyAggregationService(translator).getImmediateFamilyAggregation(immediateFamily);
}

/**
 * @description
 * Relatives
 *
 * @example
 * <IndividualRelatives relatives={[{"individual": {"name": "Michel Obama"}, "relationship_description": "Wife"}]} />
 *
 * @param {Array} relatives
 * @param {Function} [onToggle]
 */

var IndividualRelatives = function (_Component) {
    inherits(IndividualRelatives, _Component);

    function IndividualRelatives(props) {
        classCallCheck(this, IndividualRelatives);

        var _this = possibleConstructorReturn(this, (IndividualRelatives.__proto__ || Object.getPrototypeOf(IndividualRelatives)).call(this, props));

        _this.state = {
            toggleRelatives: false
        };
        return _this;
    }

    createClass(IndividualRelatives, [{
        key: 'renderDetailProperty',


        /**
         * Composition on the DetailProperty component
         * @param {String} [event]
         * @param {String} value
         * @param {String|Number} key
         */
        value: function renderDetailProperty(event, value, key) {
            return React.createElement(DetailProperty, { field: event, value: value, alignment: ALIGNMENT_ALIGN,
                key: 'individual-relatives-' + key });
        }

        /**
         * Change toggle text
         * @param index
         * @param state
         */

    }, {
        key: 'onToggle',
        value: function onToggle(index, state) {
            if (state !== this.state.toggleRelatives) {
                this.setState({ toggleRelatives: state });
                this.props.onToggle && this.props.onToggle(state);
            }
        }

        /**
         * Open the accordion on index 0
         */

    }, {
        key: 'open',
        value: function open() {
            this.Accordion && this.Accordion.open(0);
            this.setState({ toggleRelatives: true });
        }

        /**
         * Close the accordion on index 0
         */

    }, {
        key: 'close',
        value: function close() {
            this.Accordion && this.Accordion.close(0);
            this.setState({ toggleRelatives: false });
        }

        /**
         * Render the component
         */

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var translator = this.getTranslator();
            var _props$relatives = this.props.relatives,
                relatives = _props$relatives === undefined ? [] : _props$relatives;

            var aggregatedRelatives = getImmediateFamilyAggregation(relatives, translator);
            var title = translator.translate(this.state.toggleRelatives ? 'Details hide relatives' : 'Details show relatives', 'DNASingleMatch');
            var content = _.values(aggregatedRelatives).map(function (relative, index) {
                return _this2.renderDetailProperty(relative.label.replace(':', ''), relative.text, index);
            });
            var panels = [{ title: title, content: content }];

            return React.createElement(
                'div',
                { className: 'individual_relatives_wrapper', 'data-automations': 'IndividualRelatives' },
                React.createElement(Accordion, { panels: panels, onChange: function onChange(index, state) {
                        return _this2.onToggle(index, state);
                    }, ref: function ref(_ref) {
                        return _this2.Accordion = _ref;
                    } })
            );
        }
    }]);
    return IndividualRelatives;
}(React$1.Component);

translatorExtend(IndividualRelatives);

IndividualRelatives.propTypes = {
    relatives: React$1.PropTypes.array.isRequired
};

var EVENT_BIRTH = 'BIRT';

/**
 * Order FamilyGraph Events to show first birth then the rest
 * @param eventA
 * @param eventB
 * @returns {number}
 */
function sortByBirthEvent() {
    var eventA = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var eventB = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var compareRank = 0; // 0 doesn't change
    if (eventB.event_type === EVENT_BIRTH) {
        compareRank = 1; // 1 change event B to be before A
    } else if (eventA.event_type === EVENT_BIRTH) {
        compareRank = -1; // -1 change event A to be before B
    }
    return compareRank;
}

/**
 * @description
 * Show Events and relatives of an individual
 * Supporting to show only Birth & Death events currently
 *
 * Dependent on Family > EventsAndFacts category for the event names
 *
 * @example
 *  <ExtendedIndividualDetails
 *      individual={{
 *          "name": "Barack Obama",
 *           "age_group": "A",
 *           "gender": "M",
 *           "personal_photo":{"thumbnails": [{"url":"https://i.imgur.com/ZWsj4.jpg"}]}
 *           ,"relationship": {"relationship_description": "Your 1st cousin"},
 *           "immediate_family": {"data": [
 *                  {"individual": {"name": "Michel Obama"}, "relationship_description": "Wife"}
 *            ]},
 *           "events": {"data": [
 *              {"event_type": "DEAT", "date":{"date": "2120"}, "place": "Washington National Cathedral"},
 *              {"event_type": "BIRT", "date": {"date": "1961-08-04"}, "place": "Hawaii, USA"}
 *           ]}
 *      }}>
 *  </ExtendedIndividualDetails>
 *
 * @param {Object} individual FG_Model_TreeItem_Individual object
 * @param {Number} [photoSize]
 */

var ExtendedIndividualDetails = function (_Component) {
    inherits(ExtendedIndividualDetails, _Component);

    function ExtendedIndividualDetails() {
        classCallCheck(this, ExtendedIndividualDetails);
        return possibleConstructorReturn(this, (ExtendedIndividualDetails.__proto__ || Object.getPrototypeOf(ExtendedIndividualDetails)).apply(this, arguments));
    }

    createClass(ExtendedIndividualDetails, [{
        key: 'renderDetailProperty',

        /**
         * Composition on the DetailProperty component
         * @param {String} [event]
         * @param {String} value
         * @param {String|Number} key
         */
        value: function renderDetailProperty(event, value, key) {
            return React.createElement(DetailProperty, { field: event, value: value, alignment: ALIGNMENT_ALIGN,
                key: 'individual-details-' + key });
        }

        /**
         * Composition for the Relatives section
         * @param {Array} relatives
         */

    }, {
        key: 'renderToggleRelatives',
        value: function renderToggleRelatives(relatives) {
            return React.createElement(
                'div',
                { className: 'relatives_toggle' },
                React.createElement(IndividualRelatives, { relatives: relatives })
            );
        }

        /**
         * Formatting the event_type, date & place
         * @param {String} [event_type]
         * @param {{date: String}} [date]
         * @param {String} [place]
         * @param {Number} index
         */

    }, {
        key: 'renderEventDetailProperty',
        value: function renderEventDetailProperty(_ref, index) {
            var event_type = _ref.event_type,
                date = _ref.date,
                place = _ref.place;

            var translator = this.getTranslator();
            var dateValue = '',
                separator = '';
            if (date && date.date) {
                dateValue += date.date.split('-')[0];
            }
            if (dateValue && place) {
                separator = ', ';
            }

            var value = React.createElement(
                'span',
                { 'data-automations': 'ExtendedIndividualDetailsEvent-' + event_type },
                React.createElement(
                    'span',
                    { 'data-automations': 'ExtendedIndividualDetailsEventDate' },
                    dateValue
                ),
                React.createElement(
                    'span',
                    null,
                    separator
                ),
                React.createElement(
                    'span',
                    { 'data-automations': 'ExtendedIndividualDetailsEventPlace' },
                    place
                )
            );

            return event_type && (dateValue || place) ? this.renderDetailProperty(translator.translate(event_type, 'EventsAndFacts'), value, index) : null;
        }

        /**
         * Render
         */

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                _props$individual = _props.individual,
                individual = _props$individual === undefined ? {} : _props$individual,
                photoSize = _props.photoSize;

            var photoUrl = extractPhotoUrl(individual.personal_photo);

            var relationship = individual.relationship && individual.relationship.relationship_description ? this.renderDetailProperty(null, individual.relationship.relationship_description, 'rel') : null;

            var relatives = individual.immediate_family && individual.immediate_family.data ? this.renderToggleRelatives(individual.immediate_family.data) : null;

            var events = individual.events && individual.events.data ? individual.events.data.sort(sortByBirthEvent).map(function (lifeEvent, index) {
                return _this2.renderEventDetailProperty(lifeEvent, index);
            }) : null;

            return React.createElement(
                'div',
                { className: 'extended_individual_details', 'data-automations': 'ExtendedIndividualDetails' },
                React.createElement(
                    ProfileDetails,
                    { name: individual.name, photoUrl: photoUrl, ageGroup: individual.age_group,
                        gender: individual.gender, photoSize: photoSize },
                    React.createElement(
                        'span',
                        { 'data-automations': 'ExtendedIndividualDetailsRelationship' },
                        relationship
                    ),
                    React.createElement(
                        'div',
                        { className: 'smart_match_details_events' },
                        events
                    ),
                    relatives
                )
            );
        }
    }]);
    return ExtendedIndividualDetails;
}(React$1.Component);

translatorExtend(ExtendedIndividualDetails);

ExtendedIndividualDetails.propTypes = {
    individual: React$1.PropTypes.shape({
        name: React$1.PropTypes.string,
        age_group: React$1.PropTypes.string,
        personal_photo: React$1.PropTypes.object,
        relationship: React$1.PropTypes.object,
        immediate_family: React$1.PropTypes.object,
        events: React$1.PropTypes.shape({
            data: React$1.PropTypes.arrayOf(React$1.PropTypes.shape({
                event_type: React$1.PropTypes.string,
                date: React$1.PropTypes.object,
                place: React$1.PropTypes.string
            }))
        })
    }),
    photoSize: React$1.PropTypes.number
};

/**
 * @description
 * Show A matched individual with the details of the match
 * is the matched confirmed, new, and a button for "Review match"
 *
 * This is dependent on Family > SmartMatching category
 *
 * @example
 *  <MatchedIndividualDetails
 *      individual={{
 *          "name": "Barack Obama",
 *           "gender": "M",
 *           "personal_photo":{"thumbnails": [{"url":"https://i.imgur.com/ZWsj4.jpg"}]},
 *           "events": {"data": [
 *              {"event_type": "DEAT", "date":{"date": "2120"}, "place": "Washington National Cathedral"}
 *           ]}
 *      }}>
 *  </MatchedIndividualDetails>
 *
 * @param {Object} individual FG_Model_TreeItem_Individual object
 * @param {boolean} [isNew] is the match "new"
 * @param {boolean} [isConfirmed] is the match status "confirmed"
 * @param {boolean} [isRounded] Should the ReviewMatch button be rounded, like in a DNA page
 * @param {function} [onReviewMatch] callback for pressing the ReviewMatch button
 * @param {string} [reviewMatchUrl] url for pressing the ReviewMatch button
 * @param {Number} [photoSize]
 */

var MatchedIndividualDetails = function (_Component) {
    inherits(MatchedIndividualDetails, _Component);

    function MatchedIndividualDetails() {
        classCallCheck(this, MatchedIndividualDetails);
        return possibleConstructorReturn(this, (MatchedIndividualDetails.__proto__ || Object.getPrototypeOf(MatchedIndividualDetails)).apply(this, arguments));
    }

    createClass(MatchedIndividualDetails, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                _props$individual = _props.individual,
                individual = _props$individual === undefined ? {} : _props$individual,
                _props$isNew = _props.isNew,
                isNew = _props$isNew === undefined ? false : _props$isNew,
                _props$isConfirmed = _props.isConfirmed,
                isConfirmed = _props$isConfirmed === undefined ? false : _props$isConfirmed,
                _props$isRounded = _props.isRounded,
                isRounded = _props$isRounded === undefined ? false : _props$isRounded,
                photoSize = _props.photoSize,
                onReviewMatch = _props.onReviewMatch,
                reviewMatchUrl = _props.reviewMatchUrl;

            var translator = this.getTranslator();

            return React.createElement(
                'div',
                { className: 'matched_individual_details', 'data-automations': 'MatchedIndividualDetails' },
                React.createElement(
                    'div',
                    { className: 'match_profile_details' },
                    React.createElement(ExtendedIndividualDetails, { individual: individual, photoSize: photoSize })
                ),
                !!onReviewMatch && React.createElement(
                    'div',
                    { className: 'review_match' },
                    React.createElement(
                        'a',
                        { href: reviewMatchUrl, onClick: function onClick(e) {
                                return e.preventDefault();
                            } },
                        React.createElement(
                            MhButton,
                            { size: SIZE_SMALL, rounded: isRounded,
                                onClick: onReviewMatch },
                            React.createElement(
                                'span',
                                { 'data-automations': 'ReviewMatch' },
                                translator.translate('Review match', 'SmartMatching')
                            )
                        )
                    )
                ),
                isNew && React.createElement(
                    'span',
                    { className: 'new_match', 'data-automations': 'SmartMatchesNewMatch' },
                    translator.translate('Match status new', 'SmartMatching')
                ),
                !isNew && isConfirmed && React.createElement(
                    'span',
                    { className: 'confirmed_match', 'data-automations': 'SmartMatchesConfirmedMatch' },
                    React.createElement(
                        'div',
                        { className: 'confirmed_icon' },
                        React.createElement('div', { className: 'inner_v_icon' })
                    ),
                    translator.translate('Match status confirmed', 'SmartMatching')
                )
            );
        }
    }]);
    return MatchedIndividualDetails;
}(React$1.Component);

translatorExtend(MatchedIndividualDetails);

MatchedIndividualDetails.propTypes = {
    individual: React$1.PropTypes.shape({
        name: React$1.PropTypes.string,
        age_group: React$1.PropTypes.string,
        personal_photo: React$1.PropTypes.object,
        relationship: React$1.PropTypes.object,
        events: React$1.PropTypes.shape({
            data: React$1.PropTypes.arrayOf(React$1.PropTypes.shape({
                event_type: React$1.PropTypes.string,
                date: React$1.PropTypes.object,
                place: React$1.PropTypes.string
            }))
        })
    }),
    onReviewMatch: React$1.PropTypes.func,
    reviewMatchUrl: React$1.PropTypes.string,
    photoSize: React$1.PropTypes.number
};

/* THIS FILE IS AUTOMATICALLY GENERATED BY GULP WATCH-COMPONENTS */
var componentContainer = { PaymentMethodSelector: PaymentMethodSelector, IndividualCallout: IndividualCallout, MemberCallout: MemberCallout, Accordion: Accordion, Spinner: Spinner, CornerButton: CornerButton, MhButton: MhButton, NoteButton: NoteButton, Card: Card, CardCol: CardCol, CardHeader: CardHeader, CardRow: CardRow, CollapsibleCard: CollapsibleCard, ColumnsCard: ColumnsCard, SplitCard: SplitCard, TwoSidesCard: TwoSidesCard, Dropdown: Dropdown, DropdownButton: DropdownButton, CircledIcon: CircledIcon, CountryIcon: CountryIcon, FeatureInformation: FeatureInformation, NoteEditor: NoteEditor, TextField: TextField, ColumnsLayout: ColumnsLayout, AutoLocationTooltip: AutoLocationTooltip, Modal: Modal, ModalLayout: ModalLayout, Tooltip: Tooltip, IndividualDetails: IndividualDetails, MemberDetails: MemberDetails, InviteMemberModal: InviteMemberModal, ProfileDetails: ProfileDetails, ProfilePhoto: ProfilePhoto, CountryProperty: CountryProperty, DetailProperty: DetailProperty, LinkProperty: LinkProperty, PrimarySeparator: PrimarySeparator, BlurryText: BlurryText, ContactMatch: ContactMatch, DnaKitCard: DnaKitCard, DnaMatchItem: DnaMatchItem, DnaMatchesList: DnaMatchesList, EthnicityInfo: EthnicityInfo, MatchProfileDetails: MatchProfileDetails, MatchQualityDetails: MatchQualityDetails, MatchedFamilyTreeDetails: MatchedFamilyTreeDetails, AllSharedSurnamesModal: AllSharedSurnamesModal, MatchQualityModal: MatchQualityModal, PossibleRelationshipsModal: PossibleRelationshipsModal, RelationshipChart: RelationshipsChart, SharedMatchProfile: SharedMatchProfile, SharedSurnameComparison: SharedSurnameComparison, SharedSurnamesList: SharedSurnamesList, ExtendedIndividualDetails: ExtendedIndividualDetails, IndividualRelatives: IndividualRelatives, MatchedIndividualDetails: MatchedIndividualDetails };

var PAGE_BASE_URI = '/Utility/component-library';

function isDefaultProp(defaultProps, key, value) {
    if (!defaultProps) {
        return false;
    }
    return defaultProps[key] === value;
}

function stringifyObject(object, opts) {
    var result = void 0;
    if (Array.isArray(object)) {
        result = object.map(function (item) {
            return stringifyObject(item);
        });
    } else if (object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object') {
        result = {};
        Object.keys(object).map(function (key) {
            var value = object[key];
            if (React$1__default.isValidElement(value)) {
                value = jsxToString(value, opts);
            } else if (Array.isArray(value)) {
                value = value.map(function (item) {
                    return stringifyObject(item, opts);
                });
            } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
                value = stringifyObject(value, opts);
            } else if (typeof value === 'function') {
                value = opts.useFunctionCode ? opts.functionNameOnly ? item.name.toString() : item.toString() : '...';
            }
            result[key] = value;
        });
    } else {
        result = object;
    }
    return result;
}

var _JSX_REGEXP = /"<.+>"/g;

function serializeItem(item, options) {
    var delimit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var result = void 0;
    if (typeof item === 'string') {
        result = delimit ? '\'' + item + '\'' : item;
    } else if (typeof item === 'number' || typeof item === 'boolean') {
        result = '' + item;
    } else if (Array.isArray(item)) {
        var indentation = new Array(options.spacing + 1).join(' ');
        var delimiter = delimit ? ', ' : '\n' + indentation;
        var items = item.map(function (i) {
            return serializeItem(i, options);
        }).join(delimiter);
        result = delimit ? '[' + items + ']' : '' + items;
    } else if (React$1__default.isValidElement(item)) {
        result = jsxToString(item, options);
    } else if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
        result = JSON.stringify(stringifyObject(item, options));
        // remove string quotes from embeded JSX values
        result = result.replace(_JSX_REGEXP, function (match) {
            return match.slice(1, match.length - 1);
        });
    } else if (typeof item === 'function') {
        result = options.useFunctionCode ? options.functionNameOnly ? item.name.toString() : item.toString() : '...';
    }
    return result;
}

function jsxToString(component, options) {

    var baseOpts = {
        displayName: component.type.displayName || component.type.name || component.type,
        ignoreProps: [],
        keyValueOverride: {},
        spacing: 0,
        detectFunctions: false
    };

    var opts = _.extend({}, baseOpts, options);

    var componentData = {
        name: opts.displayName
    };

    delete opts.displayName;

    if (component.props) {
        var indentation = new Array(opts.spacing + 3).join(' ');
        componentData.props = Object.keys(component.props).filter(function (key) {
            return key !== 'children' && !isDefaultProp(component.type.defaultProps, key, component.props[key]) && opts.ignoreProps.indexOf(key) === -1;
        }).map(function (key) {
            var value = void 0;

            if (typeof opts.keyValueOverride[key] === 'function') {
                value = opts.keyValueOverride[key](component.props[key]);
            } else if (opts.keyValueOverride[key]) {
                value = opts.keyValueOverride[key];
            } else {
                value = serializeItem(component.props[key], _.extend({}, opts, { key: key }));
            }

            if (typeof value !== 'string' || value[0] !== "'") {
                value = '{' + value + '}';
            }
            return key + '=' + value;
        }).join('\n' + indentation);
        if (component.key) {
            componentData.props += 'key=\'' + component.key + '\'';
        }

        if (componentData.props.length > 0) {
            componentData.props = ' ' + componentData.props;
        }
    }

    if (component.props.children) {
        opts.spacing += 2;
        var _indentation = new Array(opts.spacing + 1).join(' ');
        if (Array.isArray(component.props.children)) {
            componentData.children = component.props.children.reduce(function (a, b) {
                return a.concat(b);
            }, []) // handle Array of Arrays
            .filter(function (child) {
                return child;
            }).map(function (child) {
                return serializeItem(child, opts, false);
            }).join('\n' + _indentation);
        } else {
            componentData.children = serializeItem(component.props.children, opts, false);
        }
        return '<' + componentData.name + componentData.props + '>\n' + ('' + _indentation + componentData.children + '\n') + (_indentation.slice(0, -2) + '</' + componentData.name + '>');
    } else {
        return '<' + componentData.name + componentData.props + ' />';
    }
}

/**
 * @description
 * Selectors for a component in the Component Library
 * Will show different selectors for different options of each parameter
 *
 * @example
 * <LibraryComponentSelectors currentComponentName={'Spinner'}
 *      componentMetaData={{values: [1,2,3], name: 'variant', type: 'number', isOptional: true, description: 'Spinner desc'}}
 *      componentProps={variant: 1, enabled: true} />
 *
 * @param {String} currentComponentName
 * @param {Object} componentMetaData
 * @param {Object} componentProps
 *
 */

var LibraryComponentSelectors = function (_Component) {
    inherits(LibraryComponentSelectors, _Component);

    function LibraryComponentSelectors() {
        classCallCheck(this, LibraryComponentSelectors);
        return possibleConstructorReturn(this, (LibraryComponentSelectors.__proto__ || Object.getPrototypeOf(LibraryComponentSelectors)).apply(this, arguments));
    }

    createClass(LibraryComponentSelectors, [{
        key: 'getComponentPropertySelectors',

        /**
         * @param {Object} componentMetaData
         */
        value: function getComponentPropertySelectors() {
            var _this2 = this;

            var componentMetaData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            return (componentMetaData.params || []).filter(function (_ref) {
                var type = _ref.type;
                return type.toLowerCase() !== 'function';
            }).map(function (_ref2) {
                var values = _ref2.values,
                    name = _ref2.name,
                    type = _ref2.type,
                    isOptional = _ref2.isOptional,
                    description = _ref2.description;

                if (type.toLowerCase() === 'boolean') {
                    values = [true, false];
                } else if (name.toLowerCase() === 'children') {
                    values = null;
                }
                return React.createElement(
                    'div',
                    { key: _this2.props.currentComponentName + '-' + name },
                    React.createElement(
                        Tooltip,
                        { tooltip: description, trigger: TRIGGER_EVENT_HOVER, alignment: ALIGNMENT_START$$1 },
                        React.createElement(
                            'h3',
                            null,
                            name,
                            isOptional ? '' : '*',
                            ':'
                        )
                    ),
                    values && values.length ? _this2.getSelector(name, values) : _this2.getAnyTypeSelector(name)
                );
            });
        }

        /**
         * @param {String} selectorName
         * @param {Object} options
         */

    }, {
        key: 'getSelector',
        value: function getSelector(selectorName, options) {
            var _this3 = this;

            var defaultOption = React.createElement(
                'div',
                { className: this.props.componentProps[selectorName] === undefined ? 'selected' : '',
                    onClick: function onClick() {
                        return _this3.props.onPropChange(selectorName, undefined);
                    } },
                'default'
            );
            var selectorOptions = (options || []).map(function (option) {
                return React.createElement(
                    'div',
                    { key: option.toString(),
                        className: _this3.props.componentProps[selectorName] === option ? 'selected' : '',
                        onClick: function onClick() {
                            return _this3.props.onPropChange(selectorName, option);
                        } },
                    option.toString()
                );
            });

            return React.createElement(
                'div',
                { className: 'selection_group' },
                defaultOption,
                selectorOptions
            );
        }

        /**
         * @returns {XML}
         */

    }, {
        key: 'getAnyTypeSelector',
        value: function getAnyTypeSelector(propName) {
            var _this4 = this;

            var _onChange = _$1.debounce(function (value) {
                return _this4.props.onPropChange(propName, _this4.getParsedValueFromInput(value));
            }, 150);
            return React.createElement('input', { type: 'text', placeholder: 'string, array, etc', key: this.currentComponentName,
                defaultValue: this.props.componentProps[propName],
                onChange: function onChange(e) {
                    return _onChange(e.target.value);
                } });
        }

        /**
         * Tries to turn the string to JSON.parse array|int|object
         * @param {String} inputValue
         * @returns {*}
         */

    }, {
        key: 'getParsedValueFromInput',
        value: function getParsedValueFromInput(inputValue) {
            var val = void 0; // try to transform the user input to elements
            try {
                val = JSON.parse(inputValue);
            } catch (err) {
                val = inputValue;
            }
            return val;
        }

        /**
         * Render
         */

    }, {
        key: 'render',
        value: function render() {
            var componentMetaData = this.props.componentMetaData;
            var componentPropertySelectors = this.getComponentPropertySelectors(componentMetaData);
            return React.createElement(
                'div',
                { className: 'component_selectors' },
                componentPropertySelectors && componentPropertySelectors.length ? componentPropertySelectors : 'No params.'
            );
        }
    }]);
    return LibraryComponentSelectors;
}(React$1.Component);

// Components used in page
var LibraryViewArea = function (_React$Component) {
    inherits(LibraryViewArea, _React$Component);

    function LibraryViewArea() {
        classCallCheck(this, LibraryViewArea);
        return possibleConstructorReturn(this, (LibraryViewArea.__proto__ || Object.getPrototypeOf(LibraryViewArea)).apply(this, arguments));
    }

    createClass(LibraryViewArea, [{
        key: 'getCurrentComponentFrame',

        /**
         * @param {React.Component.node} Node - it must be capitalized for JSX to render it
         * @returns {XML}
         */
        value: function getCurrentComponentFrame(Node) {
            return React$1__default.createElement(
                'div',
                { className: 'component_frame' },
                React$1__default.createElement(
                    Card,
                    null,
                    React$1__default.createElement(
                        'div',
                        { className: 'component_live_example' },
                        React$1__default.createElement(Node, this.props.componentProps)
                    )
                )
            );
        }

        /**
         * @param {Object} componentMetaData
         * @returns {XML}
         */

    }, {
        key: 'getComponentExamples',
        value: function getComponentExamples() {
            var _this2 = this;

            var componentMetaData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var examples = (componentMetaData.examples || []).map(function (example, i) {
                return React$1__default.createElement(
                    'div',
                    { key: i, className: 'component_example_code' },
                    React$1__default.createElement(
                        MhButton,
                        { className: 'show_example_button', size: SIZE_XSMALL, variant: VARIANT_FESTIVE, primary: true, onClick: function onClick() {
                                return _this2.showExample(componentMetaData, example);
                            } },
                        'Show Example'
                    ),
                    React$1__default.createElement(
                        'pre',
                        null,
                        example
                    )
                );
            });
            return React$1__default.createElement(
                'div',
                { className: 'component_examples' },
                this.getSectionHeader("Examples:", componentMetaData.invalid && componentMetaData.invalid.examples),
                examples && examples.length ? examples : 'No examples... Maybe you should make some?'
            );
        }

        /**
         * @param {Object} componentMetaData
         * @param {String} exampleString
         */

    }, {
        key: 'showExample',
        value: function showExample(componentMetaData, exampleString) {
            var _this3 = this;

            var exampleParams = extractExampleParams(this.props.currentComponentName, exampleString);

            componentMetaData.params.forEach(function (_ref) {
                var name = _ref.name,
                    value = _ref.value;

                _this3.props.onPropChange(name, value);
            });

            exampleParams.forEach(function (_ref2) {
                var name = _ref2.name,
                    value = _ref2.value;

                _this3.props.onPropChange(name, value);
            });
        }

        /**
         * @param {String} sectionText
         * @param {Object} sectionInvalidMetadata
         */

    }, {
        key: 'getSectionHeader',
        value: function getSectionHeader(sectionText, sectionInvalidMetadata) {
            var sectionHeaderClass = 'section_header' + (sectionInvalidMetadata ? ' invalid' : '');
            var headerText = sectionInvalidMetadata || sectionText;

            return React$1__default.createElement(
                'h3',
                { className: sectionHeaderClass },
                headerText
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var componentMetaData = this.props.componentMetaData;
            var Node = void 0,
                stringifyNode = void 0;
            if (componentContainer[this.props.currentComponentName]) {
                Node = componentContainer[this.props.currentComponentName];
                var props = _.omit(this.props.componentProps, function (val) {
                    return val === undefined;
                });
                stringifyNode = jsxToString(React$1__default.createElement(Node, props));
            } else {
                Node = function Node() {
                    return React$1__default.createElement(WelcomeToLibrary, null);
                };
            }
            var currentComponentFrame = this.getCurrentComponentFrame(Node);
            var componentExamples = this.getComponentExamples(componentMetaData);
            var componentSubtitle = componentMetaData ? componentMetaData.description : "The component doesn't have documentation!";
            var componentSubtitleClass = 'component_subtitle' + (componentMetaData ? "" : " invalid");
            var paramSectionHeader = this.getSectionHeader("Params:", componentMetaData ? componentMetaData.invalid.params : undefined);

            return React$1__default.createElement(
                'div',
                { className: 'view_area' },
                React$1__default.createElement(
                    'h1',
                    { className: 'component_title' },
                    this.props.currentComponentName ? this.props.currentComponentName : 'Component Library'
                ),
                React$1__default.createElement(
                    'h3',
                    { className: componentSubtitleClass },
                    React$1__default.createElement(
                        'pre',
                        null,
                        componentSubtitle
                    )
                ),
                currentComponentFrame,
                React$1__default.createElement(
                    'div',
                    { className: 'component_code_wrapper' },
                    React$1__default.createElement(
                        'h3',
                        null,
                        'Code:'
                    ),
                    React$1__default.createElement(
                        'div',
                        { className: 'component_example_code' },
                        React$1__default.createElement(
                            'pre',
                            null,
                            stringifyNode
                        )
                    )
                ),
                React$1__default.createElement(PrimarySeparator, { variant: VARIANT_SPACING_SMALL }),
                paramSectionHeader,
                React$1__default.createElement(LibraryComponentSelectors, this.props),
                React$1__default.createElement(PrimarySeparator, { variant: VARIANT_SPACING_SMALL }),
                componentExamples
            );
        }
    }]);
    return LibraryViewArea;
}(React$1__default.Component);

function WelcomeToLibrary() {
    return React$1__default.createElement(
        'p',
        { className: 'welcome_to_library' },
        'Welcome to the Component Library!',
        React$1__default.createElement('br', null),
        'Choose a component from the side to begin.'
    );
}

/**
 * @description
 * List of the library available components, with options to filter out specific component names
 *
 * @example
 * 1) You can make LibrarySideBar connected to the store:
 * <LibrarySideBar  location={window.location}
 *                  componentSearchQuery={store.getState('searchQuery')}
 *                  performComponentSearch={(changeEvent) => {
 *                      dispatch(searchQueryAction('searchQuery'))
 *                  }} />
 *
 * 2) You can make LibrarySideBar connected to a state:
 * <LibrarySideBar  location={window.location}
 *                  componentSearchQuery={this.state.searchQuery}
 *                  performComponentSearch={this.setState('searchQuery')} />
 *
 * @param {Location} location The location of the user
 * @param {String} componentSearchQuery The search query we will filter components by
 * @param {Function} performComponentSearch How the function of perform component searching behaves
 */

var LibrarySideBar = function (_React$Component) {
    inherits(LibrarySideBar, _React$Component);

    function LibrarySideBar() {
        classCallCheck(this, LibrarySideBar);
        return possibleConstructorReturn(this, (LibrarySideBar.__proto__ || Object.getPrototypeOf(LibrarySideBar)).apply(this, arguments));
    }

    createClass(LibrarySideBar, [{
        key: 'shouldFilterComponent',

        /**
         * Checks if we should filter the component
         *
         * @param {String} componentName
         * @returns {boolean}
         */
        value: function shouldFilterComponent(componentName) {
            var searchQuery = this.props.componentSearchQuery && this.props.componentSearchQuery.toLowerCase();

            var searchQueryEmpty = !this.props.componentSearchQuery;
            var nameMatchesSearchTerm = componentName.toLowerCase().includes(searchQuery);

            return searchQueryEmpty || nameMatchesSearchTerm;
        }

        /**
         * Renders the component side bar items
         *
         * @returns {Array}
         */

    }, {
        key: 'renderComponentSideBarItems',
        value: function renderComponentSideBarItems() {
            var _this2 = this;

            var selectedComponentName = this.getSelectedComponentName(this.props.location);
            return _.keys(componentContainer).filter(this.shouldFilterComponent.bind(this)).map(function (componentName) {
                return _this2.renderComponentSideBarItem(selectedComponentName, componentName);
            });
        }

        /**
         * Renders a component side bar item
         *
         * @param {String} currentComponentName
         * @param {String} componentName
         * @returns {Element}
         */

    }, {
        key: 'renderComponentSideBarItem',
        value: function renderComponentSideBarItem(currentComponentName, componentName) {
            return React$1__default.createElement(
                'div',
                { key: componentName,
                    className: 'component_list_link' + (currentComponentName === componentName ? ' selected' : '') },
                React$1__default.createElement(
                    reactRouter.Link,
                    { className: 'component_name',
                        to: PAGE_BASE_URI + '/' + componentName },
                    componentName
                )
            );
        }

        /**
         * @param {Object} locationObj
         * @returns {string}
         */

    }, {
        key: 'getSelectedComponentName',
        value: function getSelectedComponentName(locationObj) {
            var loc = locationObj.pathname.replace(PAGE_BASE_URI, '').replace('/', '');
            return loc.charAt(0).toUpperCase() + loc.slice(1);
        }

        /**
         * Render
         */

    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var componentsList = this.renderComponentSideBarItems();
            return React$1__default.createElement(
                'div',
                { className: 'side_panel' },
                React$1__default.createElement('div', { className: 'library_icon' }),
                React$1__default.createElement(
                    'div',
                    { className: 'search_box' },
                    React$1__default.createElement(TextField, { placeholder: 'Search for component',
                        onChange: function onChange(e) {
                            return _this3.props.performComponentSearch(e);
                        } })
                ),
                componentsList
            );
        }
    }]);
    return LibrarySideBar;
}(React$1__default.Component);

LibrarySideBar.propTypes = {
    location: React$1__default.PropTypes.object,
    performComponentSearch: React$1__default.PropTypes.func,
    componentSearchQuery: React$1__default.PropTypes.string
};

/**
 * Performs a component search action
 *
 * @param {String} searchQuery - the search query you want to search a component by
 * @returns {Object}
 */
function performComponentSearchAction(searchQuery) {
    return {
        type: SET_COMPONENT_SEARCH_FILTER,
        payload: {
            searchQuery: searchQuery
        }
    };
}

var mapStateToProps = function mapStateToProps(state) {
    return {
        componentSearchQuery: state.searches.get('componentSearchQuery')
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        performComponentSearch: function performComponentSearch(changeEvent) {
            dispatch(performComponentSearchAction(changeEvent.target.value));
        }
    };
};

var SearchableLibrarySideBar = reactRedux.connect(mapStateToProps, mapDispatchToProps)(LibrarySideBar);

// Containers
/**
 * Component Library Application
 */

var App = function (_React$Component) {
    inherits(App, _React$Component);

    /**
     * @param {Object} props
     */
    function App(props) {
        classCallCheck(this, App);

        var _this = possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.currentComponentName = _this.getCurrentComponentName(_this.props.location);
        _this.state = { componentProps: _this.getCurrentComponentDefaultProps() };
        return _this;
    }

    /**
     * @param {Object} newProps
     */


    createClass(App, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            var newComponentName = this.getCurrentComponentName(newProps.location);
            if (newComponentName !== this.currentComponentName) {
                this.currentComponentName = newComponentName;
                this.setState({ componentProps: this.getCurrentComponentDefaultProps() });
            }
        }

        /**
         * Gets the component's param default values.
         * @param {Object} componentMetadata The component metadata
         * @returns {*} An object mapping parameter name to it's default value.
         */

    }, {
        key: 'getComponentDefaults',
        value: function getComponentDefaults(componentMetadata) {
            var defaultValues = void 0;

            defaultValues = componentMetadata.params.reduce(function (defaultsObject, currParam) {
                return currParam.defaultValue !== undefined ? _.extend(defaultsObject, defineProperty({}, currParam.name, currParam.defaultValue)) : defaultsObject;
            }, {});

            return defaultValues;
        }

        /**
         * @returns {Object}
         */

    }, {
        key: 'getCurrentComponentDefaultProps',
        value: function getCurrentComponentDefaultProps() {
            var _this2 = this;

            var defaultProps = {};
            var componentMetaData = getComponentMetaData(this.currentComponentName);
            if (componentMetaData) {
                defaultProps = this.getInitialProps(componentMetaData);
                componentMetaData.params.filter(function (_ref) {
                    var type = _ref.type;
                    return type.toLowerCase() === 'function';
                }).forEach(function (_ref2) {
                    var name = _ref2.name;

                    defaultProps[name] = function () {
                        console.log(this.currentComponentName + ' - ' + name + ' was executed with ', arguments);
                    }.bind(_this2);
                });
            }
            return defaultProps;
        }
    }, {
        key: 'getInitialProps',
        value: function getInitialProps(componentMetaData) {
            var _this3 = this;

            var result = void 0;
            var firstExampleProps = componentMetaData.examples && componentMetaData.examples.length > 0 && extractExampleParams(this.currentComponentName, componentMetaData.examples[0]);

            if (firstExampleProps) {
                result = firstExampleProps.reduce(function (propObject, currProp) {
                    var propValue = currProp.value;

                    if (Array.isArray(propValue)) {
                        propValue = _this3.parseCodeToJsx(propValue);
                    }

                    return Object.assign(propObject, defineProperty({}, currProp.name, propValue));
                }, {});
            } else {
                result = this.getComponentDefaults(componentMetaData) || {};
            }

            return result;
        }

        /**
         * @param {Object} locationObj
         * @returns {string}
         */

    }, {
        key: 'getCurrentComponentName',
        value: function getCurrentComponentName(locationObj) {
            var loc = locationObj.pathname.replace(PAGE_BASE_URI, '').replace('/', '');
            return loc.charAt(0).toUpperCase() + loc.slice(1);
        }

        /**
         * @param {String} propName
         * @param {*} value
         */

    }, {
        key: 'onPropChange',
        value: function onPropChange(propName, value) {
            if (Array.isArray(value)) {
                value = this.parseCodeToJsx(value);
            }
            this.setState({ componentProps: Object.assign(this.state.componentProps, defineProperty({}, propName, value)) });
        }

        /**
         * @param { {name: string, props: {name: string, value: *}[]} } elements
         * @returns {Array}
         */

    }, {
        key: 'parseCodeToJsx',
        value: function parseCodeToJsx() {
            var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var jsxArr = [];
            if (Array.isArray(elements)) {
                for (var i = 0, l = elements.length; i < l; i++) {
                    var Node = componentContainer[elements[i].name] || (elements[i].name && elements[i].params ? elements[i].name : null // fallback is for div/span etc.
                    );
                    if (Node) {
                        var props = (elements[i].params || []).reduce(function (last, next) {
                            return _.extend(last, defineProperty({}, next.name, next.value));
                        }, {});
                        props.children = props.children && props.children.length ? this.parseCodeToJsx(props.children) : [];
                        jsxArr.push(React$1__default.createElement(Node, _extends({ key: i }, props)));
                    }
                }
                // Fallback for not converting anything to JSX
                if (jsxArr.length === 0) {
                    jsxArr = elements;
                }
            } else {
                jsxArr.push(elements);
            }
            return jsxArr;
        }

        /**
         * @returns {XML}
         */

    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var componentMetaData = getComponentMetaData(this.currentComponentName);

            return React$1__default.createElement(
                'div',
                { className: 'component_library' },
                React$1__default.createElement(SearchableLibrarySideBar, { location: this.props.location }),
                React$1__default.createElement(LibraryViewArea, {
                    onPropChange: function onPropChange(propName, value) {
                        return _this4.onPropChange(propName, value);
                    },
                    componentMetaData: componentMetaData,
                    currentComponentName: this.currentComponentName,
                    componentProps: this.state.componentProps })
            );
        }
    }]);
    return App;
}(React$1__default.Component);

var root = document.getElementById('component-library');

var translateMock = function translateMock(key, cat, values) {
    return '"' + key + '"' + (cat ? ', "' + cat + '"' : '') + (values && _.keys(values).length > 0 ? ', ' + JSON.stringify(values) : '');
};
setTranslator({ translate: translateMock, translateValues: translateMock, translateGender: translateMock });

ReactDOM__default.render(React$1__default.createElement(
    reactRedux.Provider,
    { store: store },
    React$1__default.createElement(
        reactRouter.Router,
        { history: reactRouter.browserHistory },
        React$1__default.createElement(reactRouter.Route, { path: '/*', component: App })
    )
), root);

}(React,Redux,ReactRouterRedux,Immutable,ReactDOM,ReactRedux,ReactRouter,_));
