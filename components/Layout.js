import Header from './Header'; // Importa o Header que acabamos de criar
import Footer from './Footer'; // Importa o Footer que acabamos de criar

/*
  Este componente recebe 'children' como uma propriedade.
  'children' é o conteúdo da página (ex: a lista de POPs ou o detalhe de um POP).
  
  Ele envolve o 'children' com o Header e o Footer.
*/
export default function Layout({ children }) {
  return (
    <>
      <Header />
      
      {/* 'children' será substituído pelo conteúdo da página */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      
      <Footer />
    </>
  );
}