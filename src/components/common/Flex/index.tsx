import { HTMLProps } from 'react'
import { cx } from '../../../utils/style'
import * as styles from './flex.css'

interface FlexProps extends HTMLProps<HTMLDivElement> {
  direction?: keyof typeof styles.directionVariants
  align?: keyof typeof styles.alignVariants
  justify?: keyof typeof styles.justifyVariants
  gap?: keyof typeof styles.gapVariants
}

export const Flex = ({
  direction = 'row',
  align = 'stretch',
  justify = 'start',
  gap = 'default',
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
        styles.gapVariants[gap],
        className,
      )}
      {...props}
    />
  )
}
