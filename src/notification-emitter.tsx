import React, { useCallback, useEffect, useState, memo } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const VERTICAL = 'top';
const HORIZONTAL = 'center';
const DURATION = 4000;

const NotificationEmitter = memo((props: {isOpen: boolean}) => {
    const [open, setOpen] = useState<boolean>(props.isOpen);

    useEffect(() => setOpen(props.isOpen), [props.isOpen]);
    const handleClose = useCallback(() => setOpen(false), [setOpen]);

    return (
        <Snackbar
            anchorOrigin={{ vertical: VERTICAL, horizontal: HORIZONTAL }}
            open={open}
            onClose={handleClose}
            autoHideDuration={DURATION}
        >
            <Alert severity="warning" color="warning">
                No such characters found
            </Alert>
        </Snackbar>
    );
});
export default NotificationEmitter;
