import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import axios from 'axios';

const loadPage = (url, outputDir = process.cwd()) => {
  // console.log(outputDir);
  const pageUrl = new URL(url);
  const { protocol } = pageUrl;
  const nameWithoutProtocol = pageUrl.href.replace(`${protocol}//`, '');
  const filename = `${nameWithoutProtocol.replace(/[^0-9a-zA-Z]/g, '-')}.html`;
  const filepath = path.join(outputDir, filename);
  return axios({
    method: 'get',
    url,
    responseType: 'text',
  })
    .then((response) => fs.writeFile(filepath, response.data))
    .then(() => filepath);
};

export default loadPage;
