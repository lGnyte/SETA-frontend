// components/ModalWrapper.tsx
import React from 'react';
import Modal from 'react-modal';

interface ModalWrapperProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

Modal.setAppElement('#root'); // Adjust this to match your app's root

const ModalWrapper: React.FC<ModalWrapperProps> = ({ isOpen, onClose, children }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Modal"
            style={{
                content: {
                    inset: '40px',
                    padding: '20px',
                    borderRadius: '12px',
                    maxWidth: '500px',
                    margin: 'auto',
                },
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
            }}
        >
            <button onClick={onClose} style={{ float: 'right' }}>✖</button>
            <div>{children}</div>
        </Modal>
    );
};

export default ModalWrapper;
