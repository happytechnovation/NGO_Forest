import { cn } from '@/lib/cn';

const fieldBase =
  'w-full rounded-xl border border-forest-200 bg-white px-4 py-3 text-sm text-forest-900 placeholder:text-muted/60 focus:border-leaf-500 focus:outline-none focus:ring-2 focus:ring-leaf-200 transition';

export function FormField({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-forest-800">
        {label} {required && <span className="text-leaf-600">*</span>}
      </label>
      {children}
    </div>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(fieldBase, props.className)} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(fieldBase, 'resize-y', props.className)} />;
}
