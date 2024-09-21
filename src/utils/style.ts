export const cx = (...classNames: (string | undefined | null | false)[]) => {
  return classNames.filter(Boolean).join(' ')
}
