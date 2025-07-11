import React from "react";
import { highlight } from "sugar-high";
import Heading from "./components/Heading";
import Links from "./components/Links";

const components = {
  h1: (props) => (
    <div className="text-center max-w-2xl mx-auto">
      <div className="hidden lg:block">
        <Heading size={6}>{props.children}</Heading>
      </div>
      <div className="lg:hidden">
        <Heading size={3}>{props.children}</Heading>
      </div>
    </div>
  ),
  h2: (props) => (
    <div className="text-center max-w-xl mx-auto">
      <div className="hidden lg:block">
        <Heading size={5}>{props.children}</Heading>
      </div>
      <div className="lg:hidden">
        <Heading size={2}>{props.children}</Heading>
      </div>
    </div>
  ),
  h3: (props) => (
    <div className="text-center max-w-xl mx-auto">
      <div className="hidden lg:block">
        <Heading size={4}>{props.children}</Heading>
      </div>
      <div className="lg:hidden">
        <Heading size={2}>{props.children}</Heading>
      </div>
    </div>
  ),
  h4: (props) => (
    <h4
      className="text-center text-lg max-w-lg mx-auto text-subtext"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="text-gray-800 dark:text-zinc-300 list-disc pl-5 space-y-1"
      {...props}
    />
  ),
  a: ({ href, children, ...props }) => {
    if (href?.startsWith("/")) {
      return (
        <Links uri={href} {...props}>
          {children}
        </Links>
      );
    }
    if (href?.startsWith("#")) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }) => {
    const codeHTML = highlight(children);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
  Table: ({ data }) => (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props) => (
    <blockquote
      className="ml-[0.075em] border-l-3 border-gray-300 pl-4 text-gray-700 dark:border-zinc-600 dark:text-zinc-300"
      {...props}
    />
  ),
};

export function useMDXComponents() {
  return components;
}
