import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

interface AlertToastProps {
  showAlert: boolean;
  onCloseAlert?: () => void;
  duration?: number;
  alertMsg: string;
}

function AlertToast({ showAlert, alertMsg, onCloseAlert, duration }: AlertToastProps) {
  const [showAlertState, setShowAlertState] = useState(showAlert);
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={showAlertState}
      autoHideDuration={duration ?? 6000}
      onClose={() => {
        setShowAlertState(false);
        onCloseAlert?.();
      }}
    >
      <Alert key={`alert-toast-${alertMsg.replace(' ', '')}`} severity='error' variant='filled'>
        {alertMsg}
      </Alert>
    </Snackbar>
  );
}

export default AlertToast;
