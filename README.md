# radio

Random Afkorting voor Digitale Informatie Overdracht.

This is a Vite + React project that is used to display information on the TV
screen in the Sticky room. This information is read in from Koala and Contentful,
and contains things like upcoming activities and peculiar quotes.

## Installation

### Prequisites

Radio requires you to have some Node package manager installed on your device. This README assumes that
you have NPM installed, but anything will work really.

See [the official documentation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/)
on how to install NPM, if you would like to use that one.

### How to install

1. Clone this repository to a location you prefer.
2. Then, enter the cloned repository with your terminal, or open visual studio code or some other IDE
   in there, as long as you have a command-line open in the folder of your clone of radio.
3. In that commandline, simply run `npm install`!
4. Finally, you need to provide your local installation of radio with some secrets.

   1. Copy `sample.env` to `.env`.
   2. Fill in all the missing secrets in `.env`.

      If you do not have access to them, feel free to ask for them! However, you might not need them.
      The secrets are only required to fetch content for the 'internal' pages, meant only for inside
      the Sticky room: those visible only when you add `?internal=true` to the URL.

      If, at the moment, you are not interested in those pages, you can just provide gibberish
      secrets everywhere, and radio will work!

## Usage

To start the radio, run `npm run dev`. That's all!

Also check <http://localhost:5173/?internal=true> to see the quotes and board ads.

### NPM scripts

Lets quickly display all posible ways to run and build radio:

```bash
npm run dev     # Starts a dev-server with linting and hot-reload capabilities!
npm run lint    # Check if your code adhires to all of our standards
npm run build   # Compile the website
npm run preview # Do not rebuild nor change any files, just host the compiled files
```

We work with React, and react compiles your website into the `dist` folder. Thus,
npm build and preview generate the `dist` folder and host them, respectively.
`npm run preview` does not recompile! It also fails if you have no `dist` folder yet.

`npm run dev` starts a developer enviroment, which does not compile anything, and instead
interprets your code in-real-time with hot-reloading. It also shows linter warnings inside
your browser, which can be hidden by pressing `esc`.

## Release instructions

As explained earlier, React compiles the website to static html, js and css files in the
`dist` folder. Thus, to publish the latest changes, you simply need to replace the `dist`
folder on the server with your local `dist` folder, in any way imaginable.

### Compilation

To generate the compiled code and saturate (and create) the `dist` folder, run:

```bash
npm run build
```

You might want to preview what has been compiled, to double check the compilation:

```bash
npm run preview
```

### Distribution

There are many ways one can replace the contents of the `dist` folder on the server
with your local `dist` folder's contents. For instance, you could travel to germany,
ask the server maintainers kindly to plug in your USB stick and copy over your files.
However, you could of course also do the following (on linux/WSL):

```bash
scp -r dist/* svsticky.nl:/var/www/commit/radio.svsticky.nl
```

When on Windows you need to use an SFTP client and connect to `sftp://commit@svsticky.nl`.

Both commands above require that you have the correct SSH keys to connect to our server.

That's it. Happy hacking!
