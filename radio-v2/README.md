# Radio Version 2 - (WORK IN PROGRESS)

## Build and dev instructions

1. Install packages by running `npm install` or `yarn`;

2. Rename sample.env to .env;

3. Fill in the Contentful space_id and token;

4. Run the development server: `npm run dev` or `yarn dev`. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Changes in relation to v1

- [x] Version 1 contained a lot of react class components. These are for simplicity switched to react functional components (as React recommends trying Hooks in new code.

- [x] the libary 'fetch' is removed for the native fetch libary. The same applies for the `scroll into view` libary, which is also replaced for the native one.

- [x] added typescript

- [ ] v1 had a lot of babel and webpack setup, which is unnecessary for the scope of this project. A more modern approach is desired.

-[] A lot of cases (`case of`) are used to determine in which state the sytem is. Now adding a scene is as easy as adding a key and react component. Not all scences are implemented at this moment

```js
const SCENCES = {
  quotes: Quotes,
  boardText: BoardText,
  activities: Activities,
  advertisement: Ad,
  team: TeamSlide,
  announcements: Announcements,
};
```

- [ ] The teamSlide shows all our public github contributors. it would be nice if this page contained more: like our current objectives ect.

-[ ] announcements would be nice to show to the radio.

-[ ]

Question: at this moment, Next JS is used but maybe Vite or Create react app will do or Astro. And do we want to stick to react or switch to vue just as chroma?
