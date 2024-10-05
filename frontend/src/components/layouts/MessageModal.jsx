import { useEffect } from 'react';
import { useMessage } from '../contexts/MessageContext';

const MessageModal = () => {
  const { message, showModal, messageType, hideMessage } = useMessage();

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        hideMessage();
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [showModal, hideMessage]);

  if (!showModal) return null;

  const getBackgroundColor = () => {
    switch (messageType) {
      case 'error':
        return 'red';
      case 'success':
        return 'green';
      case 'warning':
        return 'orange';
      default:
        return 'darkblue';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 130,
      left: 0,
      right: '17px',
      backgroundColor: getBackgroundColor(),
      color: 'white',
      padding: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <span>{message}</span>
      <span 
        style={{
          cursor: 'pointer', 
          position: 'absolute',
          right: '10px',
          fontSize: '20px',
          fontWeight: 'bold'
        }} 
        onClick={hideMessage}
      >
        &times;
      </span>
    </div>
  );
};

export default MessageModal;
