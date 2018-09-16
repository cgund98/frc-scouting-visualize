# FRC Scouting - Github Pages Edition

This is the 'client' version of FRC Scouting that runs on Github Pages, so anyone can view the data.

Demo available at https://cgund98.github.io/frc-scouting-visualize

## Prerequisites

1.  An OS with bash.  I use Ubuntu LTS.

## Setup

The GHP version and the local version of the app are closely dependent on one another.  
1.  Make a clone of the repo and make sure in settings, the branch used by GHP is gh-pages (the auto-generated one).
2.  You will need both apps and to clone them in the same directory.  I keep my apps as `~/Coding/frc-scouting` and `~/Coding/frc-scouting-visualize`.
3.  Change `auto-deloy.sh` to use the correct URL.  It should be `http://<your-username>.github.io/<repo_name>/`.  I *think* the slash at the end is important.
4.  Run `auto-deploy.sh` to make sure it works.  

## Development server

Run `ng serve --base-href=http://localhost:4200/` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

If you have any suggestions, feel free to [contact me](mailto:gundlachcallum@gmail.com)!  Take a look through the code if you want, though comments are fairly sparse as I worked on this project all by myself.  

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.1.
