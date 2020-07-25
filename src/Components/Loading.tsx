import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { css } from '@emotion/core'

const Loading = () => {
  const [loading, setLoading] = React.useState<boolean>(true)

  return (
    <div style={{marginTop: 100}}>
      <ClipLoader
        size={100}
        color={"#123abc"}
        loading={loading}
      />
    </div>
  )
}

export default Loading