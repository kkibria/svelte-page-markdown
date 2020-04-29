This is a sample todo list app using svelte + page.js + firebase + markdown. This template was inspired from a [fireship.io](https://fireship.io) article "[Svelte Realtime Todo List with Firebase](https://fireship.io/lessons/svelte-v3-overview-firebase/)" by [Jeff Delaney](https://fireship.io/contributors/jeff-delaney/).
You can use this template as a starter project for your svelte firebase app. 

# Setup
First go to firebase console and create a project ``my-svelte-todo-app`` and add a web app.
Set up and initialize firestore. Following firebase documentation.
Now lets get the coding started.
Copy this template using degit to copy template on your machine.
```bash
npx degit kkibria/svelte-page-blog my-svelte-blog-app
cd my-svelte-blog-app
```

## Add firebase to your code 
Use firebase cli to initialize your code. 
```bash
firebase init
```
First select a firebase project
```
? Are you ready to proceed? Yes
? Please select an option: Use an existing project
? Select a default Firebase project for this directory: my-svelte-todo-app-webapp (my-svelte-todo-app)
```
Now the rest of the settings as following,
```
? What file should be used for Firestore Rules? firestore.rules
? What file should be used for Firestore indexes? firestore.indexes.json
? What do you want to use as your public directory? public
? Configure as a single-page app (rewrite all urls to /index.html)? No
? File public/index.html already exists. Overwrite? No
```

## Firebase authentication

### google sign in
Enable the google sign-in in the authentication tab in firebase console for the project. In the enable dialog, expand the web SDK config.
Copy the Web client ID and save setting.  Lets say this value is ``somerandomstuff.apps.googleusercontent.com``. Uncomment ``google-signin-client_id`` meta tag and copy the client ID value into the ``build/index.html`` file in a meta tag.

```
<head>
  ...
  <meta name="google-signin-client_id" content="somerandomstuff.apps.googleusercontent.com" />
  ...
/head>
```

## Firestore
### Collection
The collection ``todos`` will be created by the app automatically since the rule will allow creating a `todo` document inside the collection. You can check the firestore contents in firebase console while the app is running.


## Tailwind
Tailwind has already added to the template using instruction from the article,
[Installating Svelte & Integrating Tailwind CSS (and PostCSS)](https://jackwhiting.co.uk/posts/setting-up-svelte-and-integrating-tailwind-css/). 

# Get started

Install the dependencies,

```bash
npm install
```
Start [Rollup](https://rollupjs.org),

```bash
npm run dev
```
Rollup will buiild the static files and at the this point files will be served with ``firebase serve``. Check ``rollup.config.js`` to see how it works. 
At this point you can debug the app.

## Building in production mode

To create an optimised version of the app:

```bash
npm run build
```

to serve locally use firebase cli,
```bash
firebase serve
```

## Deploying to firebase hosting
Use firebase cli,

```bash
firebase deploy
```
Your app is online now. The URL is provided at the end of deploy process. Open the URL in a browser to check.

> *Looking for a shareable component template? Go here --> [sveltejs/component-template](https://github.com/sveltejs/component-template)*\
> *Note that you will need to have [Node.js](https://nodejs.org) installed.*
