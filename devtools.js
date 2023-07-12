function log(o) {
  chrome.devtools.inspectedWindow.eval(`console.log(${JSON.stringify(o)})`);
}

chrome.devtools.network.onRequestFinished.addListener((request) => {
  const headers = request.response.headers;
  const header = headers.find((header) => header.name === "content-type");
  if (header?.value.includes("text/event-stream")) {
    request.getContent((content, encoding) => {
      log(JSON.stringify({ content, encoding }));
    });
  }
});
