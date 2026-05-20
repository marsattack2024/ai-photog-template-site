interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, className = "", id, ...props }: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-xs uppercase tracking-widest text-(--color-muted)"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={`w-full border border-(--color-border) bg-transparent px-4 py-3 text-sm text-(--color-ink) outline-none transition-colors duration-200 focus:border-(--color-accent) ${
          error ? "border-red-400" : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-(--color-error)">{error}</p>}
    </div>
  );
}
