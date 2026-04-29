function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  invert = false,
  titleClassName = '',
  descriptionClassName = '',
}) {
  const textColor = invert ? 'text-white/70' : 'text-(--color-accent)'
  const descriptionColor = invert ? 'text-white/85' : 'text-(--color-muted)'
  const headingAlign = align === 'center' ? 'text-center' : 'text-left'

  return (
    <div className={`${headingAlign} stack-copy`}>
      <p className={`tracking-eyebrow text-sm font-semibold uppercase ${textColor}`}>
        {eyebrow}
      </p>
      <h2
        className={`text-display text-balance font-heading text-3xl leading-tight sm:text-[2.35rem] ${titleClassName}`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`text-pretty text-sm leading-7 ${descriptionColor} ${descriptionClassName}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}

export default SectionHeading

