interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({ label, error, className = "", id, ...props }: TextareaProps) {
  const textareaId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={textareaId}
        className="text-xs uppercase tracking-widest text-(--color-muted)"
      >
        {label}
      </label>
      <textarea
        id={textareaId}
        className={`w-full resize-y border border-(--color-border) bg-transparent px-4 py-3 text-sm text-(--color-ink) outline-none transition-colors duration-200 focus:border-(--color-accent) min-h-[120px] ${
          error ? "border-red-400" : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-(--color-error)">{error}</p>}
    </div>
  );
}
