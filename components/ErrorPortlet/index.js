import React from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import { Portlet, PortletContent } from 'components';

// Material helpers
import { withStyles, Typography } from '@material-ui/core';

// Component styles
const styles = () => ({
    image: {
        display: 'inline-block',
        marginBottom: '5px',
        width: '40%',
        textAlign: 'center',
        justifyItems: 'center',
    },
    row: {
        textAlign: 'center',
        justifyItems: 'center',
        padding: '50px',
    },
    text: {
        marginTop: '30px',
        textAlign: 'center',
        fontWeight: 'bold',
    }
});


const ErrorPortlet = (props) => {
    const { classes, className, error, rowCount } = props;

    const rootClassName = classNames(classes.root, className);

    if (error) return (
        // 
        <div className="mt-4 flex items-center justify-center">
            <div className="flex-row">
                <img src="/folder.png" alt="" />
                <span className="text-lg font-semibold flex items-center justify-center">Server sedang maintenance atau tidak bisa terhubung.</span>
            </div>
        </div>
    );

    if (rowCount === 0 || rowCount === undefined) return (
        // <Portlet className={rootClassName}>
        //     <PortletContent className={classes.row}>
        //         <img
        //             alt="Under development"
        //             className={classes.image}
        //             src="/images/empty.png"
        //         />
        //         <Typography variant="subtitle1" className={classes.text}>
        //             There are no users
        // </Typography>
        //     </PortletContent>
        // </Portlet>
        <div className="mt-4 flex items-center justify-center">
            <div className="flex-row">
                <img src="/folder.png" alt="" />
                <span className="text-lg font-semibold flex items-center justify-center">Tidak ada data tersedia.</span>
            </div>
        </div>
    );
};

ErrorPortlet.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    error: PropTypes.object,
    rowCount: PropTypes.number
};

export default withStyles(styles)(ErrorPortlet);