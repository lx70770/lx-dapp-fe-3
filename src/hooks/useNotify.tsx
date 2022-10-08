import { notification } from 'antd'
import { ConfigProps } from 'antd/es/notification/index'
import { Fragment } from 'react'
import styles from './notification.less'

type NotifyType = 'success' | 'error'

export default function useNotify() {
  const DURATION = 3
  const config: ConfigProps = {
    closeIcon: <i></i>,
    duration: DURATION,
    placement: 'topRight',
  }

  function makeConfig(type: NotifyType, desc = '') {
    let s = desc.substring(0, 50)
    if (s.length < desc.length) {
      s = s + '...'
    }
    const NotifyContent = (
      <Fragment>
        <div className={styles.container}>{s}</div>
      </Fragment>
    )

    return {
      ...config,
      className: styles.notification,
      description: NotifyContent,
      message: null,
    }
  }

  return {
    success: (title: string) => {
      return notification.open(makeConfig('success', title))
    },
    error: (title: string, desc?: string, hash?: string) => {
      return notification.open(makeConfig('error', title))
    },
    destory: () => notification.destroy(),
  }
}
