const fs = require('fs');
let content = fs.readFileSync('components/About.tsx', 'utf8');

const startTag = '{/* Slideshow 3D graphic block */}';
const endTag = '        <div>';
const startIndex = content.indexOf(startTag);
const endIndex = content.indexOf(endTag, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
    // Remove the graphic block
    content = content.substring(0, startIndex) + content.substring(endIndex);
}

// Update the grid wrapper
content = content.replace(
    '<div style={{ maxWidth: 1200, margin: "auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="about-grid">',
    '<div style={{ maxWidth: 900, margin: "auto" }}>'
);

// Remove the unused react imports
content = content.replace('import { useState, useEffect } from "react";\n', '');

// Remove the state and functions
const stateStart = content.indexOf('const [currentSlide');
const stateEnd = content.indexOf('return (', stateStart);
if (stateStart !== -1 && stateEnd !== -1) {
    content = content.substring(0, stateStart) + content.substring(stateEnd);
}

// Remove the style block at the end
const styleStart = content.indexOf('<style>{`');
const styleEnd = content.indexOf('`}</style>') + 10;
if (styleStart !== -1 && styleEnd !== -1) {
    content = content.substring(0, styleStart) + content.substring(styleEnd);
}

fs.writeFileSync('components/About.tsx', content);
