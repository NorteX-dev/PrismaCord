## PrismaCord

#### A fresh new way to build your Discord bots using JavaScript or Typescript.

----

## Usage Example
```js
const { PrismaClient } = require("prismacord");
const client = new PrismaClient();

client.on("ready", () => {
  console.log("The bot is ready!");
});

client.login(process.env.TOKEN);
```

## Contributors
- [NorteX](https://github.com/NorteX-dev)
- [ChrisSch](https://github.com/ChrisSch-dev)
- [Ghost](https://github.com/idk)
- [Kangurp](https://github.com/Kangurp)

## Contributing
- Clone the repo: `git clone <link pending>`
- Install dependencies using: `yarn install`
- Run TypeScript compiler using `tsc --watch` or enable recompiling TS on changes in your IDE
- Test the package using a test bot using `yarn test`
