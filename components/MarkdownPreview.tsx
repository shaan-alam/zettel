import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";

interface MarkdownPreviewProps {
  title: string | undefined;
  body: string | undefined;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ title, body }) => {
  return (
    <div className="markdown-preview px-4 py-2 overflow-auto leading-7 [&>*]:my-4 [&>h1]:text-6xl [&>h2]:text-5xl [&>h3]:text-4xl [&>h4]:text-3xl [&>h5]:text-3xl [&>h6]:text-2xl [&>h1]:my-6 [&>h2]:my-6 [&>h3]:my-6 [&>h4]:my-6 [&>h5]:my-6 [&>h6]:my-6 [&>h1]:font-bold [&>h2]:font-bold [&>h3]:font-bold [&>h4]:font-bold [&>h5]:font-bold [&>h6]:font-bold  dark:[&>*]:text-white">
      <h6>{title}</h6>
      {/* @ts-ignore */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ children, href, ...props }: any) => {
            return (
              <a href={href} className="text-blue-500">
                {children}
              </a>
            );
          },
          code: ({ ...props }: any) => {
            return (
              <CodeBlock
                code={props.children[0]}
                language={'tsx'}
              />
            );
          },
          img: ({ ...props }: any) => {
            return <img src={props.src} alt={props.alt} className="my-4" />;
          },
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;
