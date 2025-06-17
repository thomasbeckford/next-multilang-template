'use client'

import { FileCode } from 'lucide-react'
import { CodeEditor } from '@/components/animate-ui/components/code-editor'

export const CodeEditorDemo = () => {
  const code = `'use client';

import * as React from 'react';

type MyComponentProps = {
  myProps: string;
} & React.HTMLAttributes<HTMLDivElement>;

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ myProps, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        <p>My Component</p>
      </div>
    );
  },
);
MyComponent.displayName = 'MyComponent';

export { MyComponent, type MyComponentProps };
`

  console.log('code:', JSON.stringify(code))

  return (
    <CodeEditor
      cursor
      className="w-[640px] h-[480px]"
      lang="tsx"
      title="component.tsx"
      icon={<FileCode />}
      duration={15}
      delay={0.5}
      copyButton
      writing={false}
    >
      {code}
    </CodeEditor>
  )
}
