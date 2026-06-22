const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

let newHtml = html;

// Swap in the navigation (Desktop)
newHtml = newHtml.replace(
    /<li><a href="#certifications">Certificates<\/a><\/li>\s*<li><a href="#projects">Projects<\/a><\/li>/,
    '<li><a href="#projects">Projects</a></li>\n                <li><a href="#certifications">Certificates</a></li>'
);

// Swap in the navigation (Mobile)
newHtml = newHtml.replace(
    /<li><a href="#certifications" class="mobile-link">Certificates<\/a><\/li>\s*<li><a href="#projects" class="mobile-link">Projects<\/a><\/li>/,
    '<li><a href="#projects" class="mobile-link">Projects</a></li>\n            <li><a href="#certifications" class="mobile-link">Certificates</a></li>'
);

// Extract sections
const certStart = newHtml.indexOf('<!-- 5.5 All Certifications (Span 12) -->');
const projStart = newHtml.indexOf('<!-- 6. Massive Center Showcase: 6 Project Gallery (Span 12) -->');
const contactStart = newHtml.indexOf('<!-- 7. Contact Form (Span 8) & Bottom Stats (Span 4) -->');

if (certStart !== -1 && projStart !== -1 && contactStart !== -1) {
    const beforeCert = newHtml.substring(0, certStart);
    const certBlock = newHtml.substring(certStart, projStart);
    const projBlock = newHtml.substring(projStart, contactStart);
    const afterContact = newHtml.substring(contactStart);
    
    // Now swap them: beforeCert + projBlock + certBlock + afterContact
    const finalHtml = beforeCert + projBlock + certBlock + afterContact;
    fs.writeFileSync('index.html', finalHtml);
    console.log('Swapped successfully!');
} else {
    console.log('Could not find section markers.', { certStart, projStart, contactStart });
}
