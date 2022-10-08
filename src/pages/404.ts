import React, { useEffect } from 'react'
import { history } from 'umi'

const Page404: React.FC = () => {
  useEffect(() => {
    history.replace('/')
  }, [])
  return null
}

export default Page404
