import React, { ReactNode, useState } from 'react'
import { Modal, Box } from '@mui/material'

interface InfoModalProps {
  children: ReactNode // The trigger element (what user clicks on)
  content: ReactNode // Content to show in the modal
}

const InfoModal: React.FC<InfoModalProps> = ({ children, content }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    border: 0,
    borderRadius: 0.5,
    outline: 0,
  }

  return (
    <>
      <Box
        onClick={handleOpen}
        sx={{
          cursor: 'pointer',
          '&:hover': { color: 'primary.main', transition: 'all 0.5s ease' },
        }}
      >
        {children}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="info-modal"
        aria-describedby="info-modal-description"
      >
        <Box sx={modalStyle}>{content}</Box>
      </Modal>
    </>
  )
}

export default InfoModal
