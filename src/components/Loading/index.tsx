import CircularProgress from '@material-ui/core/CircularProgress'
import React from 'react'

interface LoadingProps {}
const Loading: React.FC<LoadingProps> = () => {
  return (
    <>
      <CircularProgress color="secondary" />
    </>
  )
}
export default Loading
