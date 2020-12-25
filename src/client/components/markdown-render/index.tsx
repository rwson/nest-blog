import katex from 'katex';

export default {
  inlineCode: ({ children }) => {
    if (/^\$\$(.*)\$\$/.test(children)) {
      const html = katex.renderToString(children.replace(/^\$\$(.*)\$\$/, '$1'), {
        throwOnError: false,
      });
      return <code dangerouslySetInnerHTML={{ __html: html }} />
    }
    return children;
  },
  code: ({ language, value, children }) => {
    if (language && language.toLocaleLowerCase() === 'katex') {
      const html = katex.renderToString(value, {
        throwOnError: false
      });
      return (
        <pre>
          <code dangerouslySetInnerHTML={{ __html: html }} />
        </pre>
      );
    }
    const props = {
      className: language ? `language-${language}` : '',
    }
    return (
      <pre {...props}>
        <code {...props}>{value}</code>
      </pre>
    );
  }
};