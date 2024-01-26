import { twMerge } from "tailwind-merge";

interface TextAreaProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string;
}

export default function TextArea({ label, className, ...props }: TextAreaProps) {
  return (
    <div {...props} className={twMerge('flex items-start border-slate-400 w-full px-2 bg-slate-100 py-1', className)}>
      <span className='inline-block font-mono tracking-wider font-medium text-sm'>{label}</span>
    </div>
  )
}