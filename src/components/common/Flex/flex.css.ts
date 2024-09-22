import { style, styleVariants } from '@vanilla-extract/css'

export const flexBase = style({
  display: 'flex',
})

export const directionVariants = styleVariants({
  row: { flexDirection: 'row' },
  column: { flexDirection: 'column' },
  'row-reverse': { flexDirection: 'row-reverse' },
  'column-reverse': { flexDirection: 'column-reverse' },
})

export const alignVariants = styleVariants({
  start: { alignItems: 'flex-start' },
  end: { alignItems: 'flex-end' },
  center: { alignItems: 'center' },
  stretch: { alignItems: 'stretch' },
  baseline: { alignItems: 'baseline' },
})

export const justifyVariants = styleVariants({
  start: { justifyContent: 'flex-start' },
  end: { justifyContent: 'flex-end' },
  center: { justifyContent: 'center' },
  between: { justifyContent: 'space-between' },
  around: { justifyContent: 'space-around' },
  evenly: { justifyContent: 'space-evenly' },
})

export const gapVariants = styleVariants({
  xsmall: { gap: 2 },
  small: { gap: 4 },
  default: { gap: 8 },
  large: { gap: 16 },
  xlarge: { gap: 24 },
})
