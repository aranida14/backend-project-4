import * as path from 'node:path';
import * as os from 'node:os';
import * as fs from 'node:fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import nock from 'nock';
import loadPage from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

nock.disableNetConnect();

test('loadPage', async () => {
  // убедиться, что:
  //   внутри метода выполняется запрос на указанный url
  //   метод вернул верное имя файла
  //   файл по такому пути существует
  //   содержимое файла соответствует фикстуре
  const expected = await fs.readFile(getFixturePath('example.html'), 'utf8');
  const scope = nock('https://example.com/')
    .get('/page/to/download')
    .reply(200, expected);

  const tempDir = os.tmpdir();
  const filepath = await loadPage('https://example.com/page/to/download', tempDir);
  // console.log(filepath);
  expect(scope.isDone()).toBe(true);
  expect(filepath).toBe(path.join(tempDir, 'example-com-page-to-download.html'));
  await expect(fs.access(filepath)).resolves.not.toThrow();
  await expect(fs.readFile(filepath, 'utf8')).resolves.toBe(expected);
});
