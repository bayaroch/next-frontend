import React from 'react'
import Box from '@mui/material/Box'

interface HamburgerProps {
  open: boolean
  setOpen: (v: boolean) => void
}

const Hamburger: React.FC<HamburgerProps> = ({ open, setOpen }) => {
  return (
    <>
      <Box
        className={`hamburger hamburger--slider js-hamburger ${
          open ? 'is-active' : ''
        }`}
        onClick={() => setOpen(!open)}
        component="div"
      >
        <Box className="hamburger-box" component="div">
          <Box className="hamburger-inner" component="div"></Box>
        </Box>
      </Box>
    </>
  )
}

Hamburger.defaultProps = {
  open: false,
}

export default Hamburger
