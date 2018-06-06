# IceAndFire

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code Setup

Clone the repository and then run `npm intall` in the directory to install all dependencies.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## The _maxItem 

This variable is present in the books, houses and characters component and it controls how many items from the array will be fetched incase they are urls. This is to prevent making too many call. Putting it as -1 will bypass the counter.
