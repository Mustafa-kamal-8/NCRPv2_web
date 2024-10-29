import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    bgcolor: 'background.paper',
    borderRadius: "0.75rem",
    p: 4,
};

interface BasicModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function BasicModal({ open, onClose, children }: BasicModalProps) {

    return (
        <div>
            <Modal
                open={ open }
                onClose={ onClose }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={ { overflow: "auto" } }
            >
                <Box sx={ style }>
                    <Button onClick={ onClose } color="primary">
                        Close
                    </Button>
                    { children }
                </Box>
            </Modal>
        </div>
    );
}
