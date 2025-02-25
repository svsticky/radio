# radio

Random Afkorting voor Digitale Informatie Overdracht.

This is a [Vite](https://vite.dev/) + [React](https://react.dev/) project that is used to display information on the TV
screen in the Sticky room. This information is read in from Koala (for activities), GitHub (for recent commits)
and Contentful (for advertisements, board messages, etc.), and displays things like upcoming activities and peculiar quotes.

## Installation

### Prerequisites

We recommend installing the [Docker engine](https://docs.docker.com/engine/), as well as [Visual studio code](https://code.visualstudio.com/) with the [Devcontainers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension.

### How to install

1.  Clone this repository to a location you prefer.
2.  Then, open the clone repository in Visual Studio Code or some other IDE out there, as long as the IDE has support for the Devcontainers extension
3.  Open the project in a dev containter. The default shortcut for this in VS Code is: <kbd>CTRL</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>, and then typing `open folder in container`. You may have to select the project folder.
    > [!NOTE] > **If you open the project in a dev container for the first time**, note that the initial installation may take a while. Docker is essentially creating a mini pc inside your pc, which can be up to 2gb of files to download. Please do not close your editor, but wait untill the left bottom part of your editor states `Dev Container: Radio - SV Sticky`. It is then you can proceed on to step 4.
4.  Open a terminal in the dev container. You can do this by pressing `Terminal` (in the hotbar), then `New terminal`. Alternatively, you can use the default keybinds: <kbd>CTRL</kbd>+(<kbd>Shift</kbd>)+<kbd>\`</kbd>.
5.  Finally, you need to provide your local installation of radio with some secrets.

    1.  Copy `sample.env` to `.env`.
    2.  Fill in all the missing secrets in `.env`. If you do not have access to them, feel free to ask some member of the ITCrowd for them!

## Usage

To start the radio, run `npm run dev`. That's all! Visit <http://localhost:5173>,
and if you provided all the right secrets, you'll see the radio running.
Also check <http://localhost:5173/?internal=true> to see the quotes and board ads.

### npm commands

Lets quickly display all posible ways to run and build radio:

```bash
npm run dev     # Starts a dev-server with linting and hot-reload capabilities!
npm run lint    # Check if your code adhires to all of our standards
npm run build   # Compile the website
npm run preview # Do not rebuild nor change any files, just host the compiled files
```

We work with React, and react compiles your website into the `dist` folder.
Running `npm run build` generates the `dist` folder, and running `npm run preview` hosts the files in the `dist` folder locally.
Please note that `npm run preview` does not recompile! It also fails if you have no `dist` folder yet.

Running `npm run dev` starts a developer enviroment, which does not compile anything, and instead
interprets your code in real time with hot-reloading; Vite will automatically reload your browser when you change any file.

### Keybinds

Press <kbd>ArrowRight</kbd> or <kbd>ArrowDown</kbd> to increment by one state.

That's it. Happy hacking!
