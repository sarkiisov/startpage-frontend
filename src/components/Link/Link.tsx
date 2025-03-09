import { useMemo } from 'react'
import { LinkProps } from './Link.types'
import classes from './Link.module.css'

export const Link = ({ href, icon, title }: LinkProps) => {
  const iconComponent = useMemo(() => {
    if (icon.type === 'FAVICON') {
      return <img src={icon.url} />
    }
    if (icon.type === 'PLACEHOLDER') {
      return (
        <div
          style={{ background: icon.color, textAlign: 'center', verticalAlign: 'center' }}
          className={classes.placeholder}
        >
          <span>{title[0].toUpperCase()}</span>
        </div>
      )
    }
  }, [icon, title])

  return (
    <div className={classes.root}>
      <a className={classes.anchor} href={href} />
      <div className={classes.icon}>{iconComponent}</div>
      <div className={classes.title}>{title}</div>
    </div>
  )
}
