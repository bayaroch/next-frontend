import * as React from 'react'
import Avatar, { AvatarProps } from '@mui/material/Avatar'
import _ from 'lodash'
import { stringToColor } from 'utils/helper/common.helper'

const stringToAvatar = (props: AvatarProps, alt?: string, src?: string) => {
  const { sx, ...rest } = props
  if (!_.isEmpty(src) && src) {
    return {
      src: src,
      ...rest,
      sx: { ...sx, backgroundColor: '#fff' },
    }
  }

  if (alt) {
    return {
      ...rest,
      sx: {
        ...sx,
        bgcolor: stringToColor(alt),
      },
      children: props.children ? props.children : `${alt?.split(' ')[0][0]}`,
    }
  }
  return props
}

const StringAvatar: React.FC<AvatarProps> = (props) => {
  const { alt, src, ...rest } = props
  return <Avatar {...stringToAvatar(rest, alt, src)} />
}

export default StringAvatar
