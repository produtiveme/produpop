import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        {/* Carrega o script do Mermaid.js */}
        {/* Usamos 'beforeInteractive' para garantir que ele carregue cedo */}
        <script
          src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"
          strategy="beforeInteractive"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}