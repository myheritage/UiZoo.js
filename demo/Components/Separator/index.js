import './index.scss';

/**
 * @description
 * Separator
 * A generic separator to be used between components
 *
 * @example
 * 1) default
 * <Separator/>
 *
 * 2) isBig
 * <Separator isBig={true}/>
 * 
 * @param {boolean} [isBig] more margin on top & bottom
 *
 */
export default function Separator({isBig}) {
    let style = {};
    if (isBig) {
        style.margin = '50px 0';
    }
    return <div className="primary-separator" style={style}/>;
}