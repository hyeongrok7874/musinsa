# musinsa

Provide ranking of musinsa.

## Usage

### package manager

```bash
$ npm install musinsa
$ yarn add musinsa
$ pnpm add musinsa
```

### import

```js
// ES Module
import { getDailyRanking, RankingType } from "musinsa";

// CommonJS
const { getDailyRanking, RankingType } = require("musinsa");
```

### RankingType

일일 랭킹의 타입입니다.

```ts
interface RankingType {
  img: string;
  brand: string;
  name: string;
  price: string;
  link: string;
}
```

return example

```js
[
  {
    img: 'https://image.msscdn.net/images/goods_img/20220412/2482269/2482269_1_125.jpg',
    brand: '노스페이스',
    name: 'NJ1DN75A 남성 1996 에코 눕시 자켓',
    price: '339,000원',
    link: 'https://www.musinsa.com/app/goods/2482269?loc=goods_rank'
  },
  ...
]
```

### getRanking

functions

- getNowRanking
- getDailyRanking
- getWeeklyRanking
- getMonthlyRanking
- get3MonthlyRanking

## example

```ts
const getRanking = async () => {
  try {
    const ranking: RankingType[] = await getDailyRanking();
  } catch (e) {
    // error handling
  }
};
```

## caution

cors 이슈로 인해 serverside 환경에서 사용이 가능합니다.

콘텐츠는 출처를 밝히고(무신사닷컴 표기 및 www.musinsa.com 링크 포함 필수) 비상업적인 용도에서만 활용하실 수 있습니다.

[무신사닷컴](https://www.musinsa.com/)
