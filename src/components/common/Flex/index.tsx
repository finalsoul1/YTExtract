import { HTMLProps } from 'react'
import { cx } from '../../../utils/style'
import * as styles from './flex.css'

interface FlexProps extends HTMLProps<HTMLDivElement> {
  direction?: keyof typeof styles.directionVariants // flex-direction 속성 추가
  align?: keyof typeof styles.alignVariants
  justify?: keyof typeof styles.justifyVariants
}

export const Flex = ({
  direction = 'row',
  align = 'stretch',
  justify = 'start',
  className,
  ...props
}: FlexProps) => {
  return (
    <div
      className={cx(
        styles.flexBase,
        styles.directionVariants[direction],
        styles.alignVariants[align],
        styles.justifyVariants[justify],
        className,
      )}
      {...props}
    />
  )
}
