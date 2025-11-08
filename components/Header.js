import Link from 'next/link'; // Importa o componente <Link> para navegação

/*
  Este é o nosso primeiro componente React.
  É uma função que retorna JSX (que parece HTML).
*/
export default function Header() {
  return (
    // 'class' se torna 'className' em JSX
    <header className="bg-bg border-b border-secondary-200 sticky top-0 z-10">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            {/*
              Substituímos o <a> por <Link> para navegação otimizada no Next.js.
              Não usamos mais 'onclick'.
            */}
            <Link href="/" className="text-2xl font-bold text-primary-500 font-heading">
              ProduPop 🧭
            </Link>
          </div>
          {/* Links de Navegação */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-text hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            {/* O link para "Submeter POP" agora aponta para a rota /submissao */}
            <Link href="/submissao" className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 shadow-sm">
              Submeter POP
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}