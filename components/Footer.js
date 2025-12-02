/*
  Componente de Rodapé.
  Note como ele é simples: apenas uma função que retorna JSX.
*/
export default function Footer() {
  return (
    <footer className="flex flex-col items-center py-8 mt-12 border-t border-secondary-200">
      <img src="/logo.svg" alt="ProduPop Logo" className="h-8 w-auto mb-2 opacity-80" />
      <p className="text-sm text-gray-500">ProduPop - Um produto ProdutiveMe</p>
    </footer>
  );
}