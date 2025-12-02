/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://produpop.com.br',
    generateRobotsTxt: true, // Gera o robots.txt também
    // Opcional: excluir páginas admin ou privadas
    // exclude: ['/server-sitemap.xml'], 
    robotsTxtOptions: {
        additionalSitemaps: [
            // Se tivermos sitemaps dinâmicos extras no futuro
        ],
    },
}
