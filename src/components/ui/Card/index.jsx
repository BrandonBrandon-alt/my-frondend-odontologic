const variants = {
  default: 'bg-[var(--color-background-light)] border border-[var(--color-secondary)] shadow-md',
  elevated: 'bg-[var(--color-background-light)] border border-[var(--color-secondary)] shadow-xl hover:shadow-2xl transition-shadow duration-300',
  outlined: 'bg-[var(--color-background-light)] border-2 border-[var(--color-accent)]'
};

{icon && (
  <div className="flex-shrink-0 text-[var(--color-accent)] text-3xl">
    {icon}
  </div>
)}

{title && (
  <h3 className="text-2xl font-bold text-[var(--color-text-dark)] mb-1">
    {title}
  </h3>
)}

{subtitle && (
  <p className="text-base text-[var(--color-secondary)]">
    {subtitle}
  </p>
)}

<div className="text-[var(--color-text-dark)] text-base">
  {children}
</div> 