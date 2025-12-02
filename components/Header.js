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
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="ProduPop Logo" className="h-10 w-auto" />
              <span className="text-2xl font-bold text-primary-500 font-heading">ProduPop</span>
            </Link>
          </div>
          {/* Links de Navegação */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-text hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <a
              href="https://produtive.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Conheça o Produ
            </a>

          </div>
        </div>
      </nav>
    </header>
  );
}