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


 statusEl.textContent = `${response.status} ${response.statusText}`.trim();
    statusEl.className = response.ok ? 'ok' : 'error';
    bodyEl.textContent = display;
  } catch (error) {
    statusEl.textContent = 'Network error';
    statusEl.className = 'error';
    bodyEl.textContent = String(error);
  }
}

document.querySelectorAll('button[data-path]').forEach((button) => {
  button.addEventListener('click', () => {
    callRoute(button.dataset.path, button.dataset.method ?? 'GET');
  });
});
