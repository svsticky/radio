# R.A.D.I.O.

R.A.D.I.O., or Random Afkorting voor Digitale Informatie Overdrager is a small
utility for Study Association Sticky that displays next activities and some parter
ads. This is intended for hosting on the domain `radio.stickyutrecht.nl` and for
display on a HDTV.

## Dev setup

The minimal dev environment to enable live-editing React components.

### Usage

```
npm install
npm start
open http://localhost:3000
```

Now edit `scripts/App.js` to make your changes. As you make a change, reloading
your browser won't be neccessary.

### Dependencies

* React
* Webpack
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* [jsx-loader](https://github.com/petehunt/jsx-loader)
* [react-hot-loader](https://github.com/gaearon/react-hot-loader)

### Resources

* [Demo video](http://vimeo.com/100010922)
* [react-hot-loader on Github](https://github.com/gaearon/react-hot-loader)
* [Integrating JSX live reload into your workflow](http://gaearon.github.io/react-hot-loader/)
* Ping dan_abramov on Twitter or #reactjs IRC

## Contributing

So you want to contribute? Awesome! You are most welcome to. We do however have our
own pecularities, please try to follow them. It will be much obliged and will smoothen
over the process greatly.

### Branching strategy

The history of this project includes a lot of unnecessary merge commits, which aren't
that pretty. Currently we have a contributing procedure that needs to be followed:

1. Want to work on something? Create a topic branch.
1. Push the topic branch to GitHub when you want to show something.
1. Open a pull request. Gather feedback. Improve the patch.
1. Wait for the PR to be merged into `master`. Then update local history.

Please make sure to write a descriptive commit message. [Here][commit-messages] you
can find some tips for better commit messages.

 [commit-messages]:http://robots.thoughtbot.com/5-useful-tips-for-a-better-commit-message

### Example contributing flow

```bash
# Create and checkout a new branch for the contribution
$ git checkout -b doc/contributing-guidelines
# Make your changes
$ vim README.md
# Commit changes
$ git add . && git commit -m "Draft contributing guidelines"
# Push the branch to GitHub
$ git push origin doc/contributing-guidelines
```

Now open a pull request and wait for feedback. If you need to make any more changes,
simply create new commits and push these to GitHub.

When the feature is merged by @martijncasteel, you can get the changes by pulling
from GitHub.

```bash
# Make sure we're on master
$ git checkout master
# Get the changes from GitHub, this should NEVER, EVER introduce a merge conflict
$ git pull origin master
```

### Branch naming

Try to be descriptive. Use the following prefixes for the names depending on the type
of work:

 - `feature/` for new features.
 - `bug/` for bugfixes.
 - `doc/` for documentation.
 - `test/` for testing.
 - `debt/` for refactoring and enhancements.

## License

```
ConstipatedKoala is licensed under the GPLv3 license.

Copyright (C) 2014 Dan Abramov, Arian van Putten, Laurens Duijvesteijn

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
```

