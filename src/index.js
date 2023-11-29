const loadPage = (url, outputDir = process.cwd()) => (
  Promise.resolve(`loadPage (${url}, ${outputDir}) says Hi`)
);

export default loadPage;
