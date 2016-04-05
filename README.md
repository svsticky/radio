# radio

Random afkorting voor digitaal informatie overdrager. Dit is een React project
dat activiteiten uit Koala inleest en deze weergeeft. De intentie is dat dit
op de TV in de Sticky kamer gebeurt.

# Technology used
Radio is a plain React project. To learn how to use react, all the documentation for that is on https://facebook.github.io/react/

# Build and dev instructions

install packages
```
$ npm install
```
Run the development server:

```
$ npm run start
```

Dev server runs on [http://localhost:3000].

# Release instructions

Build the js file used for deployment. This will bundle all files together in a single `dist/bundle.js` file. Which is loaded in `index.html`
```
$ npm run build
```

Simply copy over the dist/ folder to the sticky server to deploy. If you change the CSS or index.html you need to scp those over too.

On Linux this should be done by using:
```
$ scp -r dist/ index.html style.css svsticky.nl:/var/www/commit/radio.svsticky.nl
```

When on Windows you need to use an SFTP client to connect to
```
sftp://commit@svsticky.nl
```
That's it. happy hacking.
