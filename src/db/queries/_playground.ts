import { getRndEmployerId } from './employer';

(async () => {
  const result = await getRndEmployerId();
  console.log(result);
})();
