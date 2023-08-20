"use client";
import { Highlight, themes } from "prism-react-renderer";
import { useEffect, useState } from "react";

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock = ({ code, language }: CodeBlockProps) => {
  const [codeBlock, setCodeBlock] = useState<string>();
  const [lang, setLang] = useState<string>();

  useEffect(() => {
    setCodeBlock(code);
    setLang(language);
  }, [code, language]);
 
  return (
    codeBlock && (
      <div className="bg-[#011627] p-2 overflow-auto rounded-md">
        <Highlight
          theme={themes.jettwaveDark}
          code={codeBlock as string}
          language={lang as string}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre style={style} className="font-mono p-4">
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line })}
                  style={{ marginBottom: 0, marginTop: 0 }}
                >
                  <span className="mr-4 text-sm text-gray-500">{i + 1}</span>
                  {line.map((token, key) => (
                    <span
                      key={key}
                      {...getTokenProps({ token })}
                      className="no-margin"
                    />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    )
  );
};

export default CodeBlock;
