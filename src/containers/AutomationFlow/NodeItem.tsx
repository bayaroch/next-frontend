import { Box } from '@mui/material'
import React, { ReactNode } from 'react'
import { Handle, Position } from 'reactflow'

interface NodeComponentProps {
  data: { content: ReactNode }
  handleType: 'source' | 'target' | 'both'
  handlePosition: Position
  rightHandlePosition?: Position
}

export const NodeItem: React.FC<NodeComponentProps> = ({
  data,
  handleType,
  handlePosition,
  rightHandlePosition,
}) => {
  // eslint-disable-next-line no-console

  return (
    <Box
      sx={{
        borderRadius: '5px',
        background: 'white',
      }}
    >
      {(handleType === 'target' || handleType === 'both') && (
        <Handle
          type="target"
          position={handlePosition}
          style={{
            [handlePosition === Position.Left ? 'left' : 'right']: -5,
            top: '50%',
          }}
        />
      )}
      <Box sx={{ minWidth: 100, p: 1 }}>{data.content}</Box>
      {(handleType === 'source' || handleType === 'both') && (
        <Handle
          type="source"
          position={rightHandlePosition || handlePosition}
          style={{
            [rightHandlePosition === Position.Left ? 'left' : 'right']: -5,
            top: '50%',
          }}
        />
      )}
    </Box>
  )
}
