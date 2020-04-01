"use strict";

function insertLinksIntoScript({
  html,
  hrefs
}) {
  if (hrefs.length === 0) {
    return html;
  }

  var insertScriptText = '(function(){window.onload=function(){var b=[xxxxx];var a=document.createDocumentFragment();b.forEach(function(c){var d=document.createElement(\"link\");d.setAttribute(\"rel\",\"prefetch\");d.setAttribute(\"href\",c);a.appendChild(d)});document.body.appendChild(a)}})();';

  if (html.includes('</body>')) {
    const hrefStr = hrefs.reduce((t, href) => {
      return t + ',\"' + href + '\"';
    }, '');
    insertScriptText = insertScriptText.replace('xxxxx', hrefStr.slice(1));
    return html.replace('</body>', `<script>${insertScriptText}</script></body>`);
  }
}

module.exports = insertLinksIntoScript;
