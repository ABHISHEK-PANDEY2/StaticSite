import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { APP_NAME } from 'constants/app.constant'

import LOGO_SRC_PATH_DARK from '../../assets/images/logo/logo.png'

const Logo = (props) => {
    let { type, mode, gutter, className, imgClass, style, logoWidth, path } =
        props
    if(path === undefined){
        path = LOGO_SRC_PATH_DARK
    }
    return (
        <div
            className={classNames('logo', className, gutter)}
            style={{
                ...style,
                ...{ width: logoWidth },
                marginTop: '30px',
                marginBottom: '20px',
                width:'80%'
            }}
        >
            <img className={imgClass} src={path} alt={`${APP_NAME} logo`} />
        </div>
    )
}

Logo.defaultProps = {
    mode: 'light',
    type: 'full',
    logoWidth: 'auto',
}

Logo.propTypes = {
    mode: PropTypes.oneOf(['light', 'dark']),
    type: PropTypes.oneOf(['full', 'streamline']),
    gutter: PropTypes.string,
    imgClass: PropTypes.string,
    logoWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Logo
