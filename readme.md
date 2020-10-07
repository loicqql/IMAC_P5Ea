# p5 template project

Forked from [https://github.com/Gaweph/p5-typescript-starter](https://github.com/Gaweph/p5-typescript-starter)

## Getting Started

You will need to have Node installed ([https://nodejs.org/](https://nodejs.org/))  
Download this repository and open it in your favorite IDE (I would **highly** recommend VS Code ([https://code.visualstudio.com/](https://code.visualstudio.com/)))  
Then open a terminal at the root of the folder (you can do it in VS Code by simply dragging up the bottom of the window) and type the following commands :

### Installing

Only type those commands the first time you use this template (-g means you install things globally)

```
npm i -g npm-run-all
```
```
npm i -g typescript
```
```
npm i -g browser-sync
```

And type this one each time you download the project from Github

```
npm i @types/p5 --save-dev
```

### Launching

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