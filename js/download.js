import { getPortfolioHTML } from './generator.js';

export function setupDownload() {
    document.getElementById('download-btn').addEventListener('click', downloadPortfolio);
}

function downloadPortfolio() {
    const portfolioContent = document.getElementById('portfolio-preview').innerHTML;
    const style = document.querySelector('style').outerHTML;
    
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Professional Portfolio</title>
    ${style}
</head>
<body>
    ${portfolioContent}
</body>
</html>`;
    
    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'professional-portfolio.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}