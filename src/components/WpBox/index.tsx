/* eslint-disable no-console */
import HtmlParser from '@components/HtmlParser'
import { Box, BoxProps, Skeleton } from '@mui/material'
import React, { useEffect } from 'react'
import useWp from 'utils/hooks/useWp'

interface WpContentProps extends BoxProps {
  id: string
  lineCount?: number
}

const WpBox: React.FC<WpContentProps> = ({ id, lineCount = 6, ...rest }) => {
  const { data, fetchPage, clear, isLoading } = useWp(id)

  useEffect(() => {
    fetchPage(id)
    return () => clear()
  }, [id])

  const renderSkeleton = () => {
    return Array(lineCount)
      .fill(0)
      .map((_, index) => (
        <Skeleton
          key={index}
          animation="wave"
          height={20}
          style={{ marginBottom: 6 }}
        />
      ))
  }

  return (
    <Box {...rest}>
      <Box className="wp-content">
        {isLoading
          ? renderSkeleton()
          : data && <HtmlParser content={data.content} />}
      </Box>
    </Box>
  )
}

export default WpBox
