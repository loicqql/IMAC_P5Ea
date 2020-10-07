# p5 template project

Forked from [https://github.com/Gaweph/p5-typescript-starter](https://github.com/Gaweph/p5-typescript-starter)

## Getting Started

### Installing

Only type those commands the first time you use this template (*-g* means you install things globally)

```
npm i -g npm-run-all
```
```
npm i -g typescript
```
```
npm i -g browser-sync
```

And type this one each time you clone the project from Github

```
npm i @types/p5 --save-dev
```

### Usage

```
npm start
```

A local version will now be running on [localhost:3000](http://localhost:3000)

### Publishing online

#### Using GitHub Pages

Create a new repository and commit
    * the *build* folder
    * *index.html*
    * *p5.min.js*
    * *p5.sound.min.js* if you are using this library

Then in the **Settings** of your repository, under **GitHub Pages** set Source to *main* and click Save.
You can now see the url to your sketch under **GitHub Pages** ! (it might take a few minutes to be published online)