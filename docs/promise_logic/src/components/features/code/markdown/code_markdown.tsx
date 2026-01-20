'use client'
import { Check, Copy } from 'lucide-react';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';


export function CodeMarkdown({ content }: { content: string }) {

    const CodeBlock = ({ children, className }: { children: React.ReactNode; className?: string }) => {
        const [copied, setCopied] = useState(false);


        // 提取语言类型
        const language = React.isValidElement(children)
            ? ((children as React.ReactElement)
                .props as { className?: string })
                .className?.match(/language-(\w+)/)?.[1]
            : 'text';


        // 处理复制代码
        const handleCopy = () => {
            const getTextContent = (node: React.ReactNode): string => {
                if (typeof node === 'string') {
                    return node;
                }
                if (Array.isArray(node)) {
                    return node.map(getTextContent).join('');
                }

                if (React.isValidElement(node) && node.props) {
                    return getTextContent((node.props as React.PropsWithChildren).children);
                }

                return '';
            };

            const codeText = getTextContent(children);

            if (codeText) {
                // 复制代码到剪贴板
                navigator.clipboard.writeText(codeText).then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                }).catch(err => {
                    console.error('复制失败:', err);
                });
            }
        };



        return (
            <div className="relative group my-4 max-w-full">
                {/* 顶部栏：亮色/暗色主题切换 */}
                <div className={`flex justify-between items-center
           px-4 rounded-t-lg 
           min-w-0
           bg-white dark:bg-gray-900 p-2
           border border-gray-200 dark:border-gray-700 border-b-0`}>

                    {/* 语言标签 */}
                    <span className={`
            text-xs font-medium
            text-gray-800 dark:text-gray-200
             capitalize text-gray-500 dark:text-gray-400 truncate`}>
                        {language}
                    </span>
                    <button
                        onClick={handleCopy}
                        className="opacity-100 sm:opacity-0
                         sm:group-hover:opacity-100 sm:transition-opacity 
                        duration-300 bg-gray-100 dark:bg-gray-800 sm:hover:bg-gray-200 dark:sm:hover:bg-gray-700
                         rounded-md px-2 py-1 text-xs
                         font-medium text-gray-700 dark:text-gray-300 
                         flex items-center gap-1 flex-shrink-0"
                    >
                        {copied ? (
                            <>
                                <Check className="h-3 w-3" />
                                已复制
                            </>
                        ) : (
                            <>
                                <Copy className="h-3 w-3" />
                                复制
                            </>
                        )}
                    </button>
                </div>
                {/* 代码块容器：亮色/暗色主题切换 */}
                <div className={`
             rounded-b-lg
             min-w-0
             max-w-full
           bg-white dark:bg-gray-900/70
            overflow-x-auto
            border border-gray-200 dark:border-gray-700 overflow-hidden my-0`}>
                    {/* 代码内容 */}
                    <pre className={`m-0 !bg-transparent hljs ${className || ''} max-w-full`}>
                        {children}
                    </pre>
                </div>
            </div>
        );
    };

    return (
        <div className=" mb-12">
            <div className="prose  prose-slate max-w-none">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                        p: ({ className, ...props }) => <p className={`my-4 leading-relaxed ${className || ''}`} {...props} />,
                        h1: ({ className, ...props }) => <h1 className={`text-3xl font-bold mt-8 mb-4 ${className || ''}`} {...props} />,
                        h2: ({ className, ...props }) => <h2 className={`text-2xl font-bold mt-8 mb-3 ${className || ''}`} {...props} />,
                      
                        h3: ({ className, ...props }) => <h3 className={`text-xl font-bold mt-6 mb-2 ${className || ''}`} {...props} />,
                        h4: ({ className, ...props }) => <h4 className={`text-lg font-bold mt-5 mb-1 ${className || ''}`} {...props} />,
                        h5: ({ className, ...props }) => <h5 className={`text-base font-bold mt-4 mb-1 ${className || ''}`} {...props} />,
                        strong: ({ className, ...props }) => <strong className={`font-semibold ${className || ''}`} {...props} />,
                        table: ({ className, ...props }) => (
                            <table className={`w-full border border-border rounded-lg  ${className || ''}`} {...props} />
                        ),
                        th: ({ className, ...props }) => (
                            <th className={`px-4 py-2 border border-border bg-muted text-left font-semibold ${className || ''}`} {...props} />
                        ),
                        td: ({ className, ...props }) => (
                            <td className={`px-4 py-2 border border-border ${className || ''}`} {...props} />
                        ),
                        code: ({ className, ...props }) => {
                            const isInlineCode = !className?.includes('language');

                            return (
                                <code
                                    className={` text-muted-foreground font-mono  ${isInlineCode
                                        ? 'px-1 py-0.5 rounded text-sm '
                                        : className}`
                                    }
                                    {...props}
                                />
                            );
                        },
                        pre: ({ className, ...props }) => {
                            const children = props.children;
                            return <CodeBlock className={className}>{children}</CodeBlock>;
                        },
                        a: ({ ...props }) => <a
                            className="text-[#4A6FA5] hover:text-[#3A5F95] underline dark:text-blue-400 dark:hover:text-blue-300"
                            {...props} 
                            />
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    )
}