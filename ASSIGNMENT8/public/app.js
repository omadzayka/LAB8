const statusEI = document.querySelector('#status');
const bodyEI = document.querySelector('#body');

async function callRoute(path, method) {
    statusEI.textContent = `Calling ${method} ${path} ...`;
    bodyEI.textContent = '';

    try {
    const response = await fetch(path, { method });
    const text = await response.text();

    // Pretty-print JSON; fall back to raw text if it isn't JSON
    let display = text;
    try {
      display = JSON.stringify(JSON.parse(text), null, 2);
    } catch {
      // not JSON, keep the raw text
    }

}