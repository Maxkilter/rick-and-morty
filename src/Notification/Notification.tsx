import React, { useCallback, useEffect, useState, memo } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const VERTICAL = 'top';
const HORIZONTAL = 'center';
const DURATION = 4000;

const Notification = memo((props: {isOpen: boolean; message: string}) => {
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
                {props.message}
            </Alert>
        </Snackbar>
    );
});
export default Notification;
