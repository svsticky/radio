# radio

Random Afkorting voor Digitale Informatie Overdracht.
This is a plain React project that is used to display information on the TV screen in the Sticky room.
This information is read in from Koala and Contentful.

## Technology used

Radio is a plain React project.
To learn how to use react, all the documentation for that is on <https://facebook.github.io/react/>

## Build and dev instructions

1. Install packages by running `npm install`;

1. Rename sample.env to .env;

1. Fill in the Contentful space_id and token;

1. Run the development server: `npm run start`.

Dev server runs on <http://localhost:3000>.

## Release instructions

Put the transpiled js, html and css files in the dist/ folder:

``` bash
npm run build
```

Simply copy over the dist/ folder to the server to deploy.

On Linux this should be done by using:

``` bash
scp -r dist/ svsticky.nl:/var/www/commit/radio.svsticky.nl
```

When on Windows you need to use an SFTP client to connect to:

``` bash
sftp://commit@svsticky.nl
```

That's it. Happy hacking.
