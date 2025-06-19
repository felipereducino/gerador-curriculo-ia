import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label"; // adjust path if needed

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, id, ...props }, ref) => {
    const textareaId = id;

    return (
      <div className="space-y-1">
        {label && <Label htmlFor={textareaId}>{label}</Label>}
        <textarea
          ref={ref}
          id={textareaId}
          data-slot="textarea"
          className={cn(
            "border-input placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex min-h-19.5 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
