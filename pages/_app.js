import '@/styles/globals.css'; // Importa nossos estilos globais

// Importa as fontes que vamos usar do Google Fonts
import { Inter, Bricolage_Grotesque } from 'next/font/google';

// Configuração da fonte Inter (para textos)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Define uma variável CSS para a fonte
  display: 'swap',
});

// Configuração da Bricolage Grotesque (para títulos)
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage', // Define uma variável CSS para a fonte
  display: 'swap',
});

// Este é o componente principal do App
export default function App({ Component, pageProps }) {
  return (
    // Esta 'main' envolve todo o site e aplica as variáveis das fontes
    <main className={`${inter.variable} ${bricolage.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}