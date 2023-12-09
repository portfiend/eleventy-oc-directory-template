This is an [Eleventy](https://www.11ty.dev/) template designed for a original characters directory. More specifically, it can include information on characters, locations, stories, and whatever else you want. This repository draws inspiration from [Toyhouse](https://toyhou.se/), various [Neocities](https://neocities.org/) websites, and some layout inspiration from [Dreamwidth](https://www.dreamwidth.org/).

## Installation

You will need a few things to get started with this template, namely:
- Node.js
- GitHub account (optional)
- Git (optional)
- A text editor of choice (I use [Visual Studio Code](https://code.visualstudio.com/)!)

### 1. Install Node.js

This can be done with any method of choice. Node can be downloaded directly at [nodejs.org](https://nodejs.org/en) or with a version manager like [nvm](https://github.com/nvm-sh/nvm) (that's [nvm-windows](https://github.com/coreybutler/nvm-windows) for you Windows users.)

### 2. Get the code in this repository

#### 2a: I have a GitHub account (Optional)
I recommend creating your own repository with the "Use this template" button at the top of this repository. This allows you to use Git to manage your website's version history.

#### 2b: I have Git

[Git](https://git-scm.com/) is a great way to manage updates for your repository. Git allows you to see the full history of changes to your code, which is great for debugging or figuring out how you did something several months ago. GitHub also allows you to create [actions](https://docs.github.com/en/actions), such as uploading your website to your hosting provider of choice automatically every time you make a new change to Git.

If you have Git, you can download the files to your computer by opening a command line in your directory of choice (e.g. `Documents/Projects/`) and enter this into the command bar:

```
git clone https://github.com/portfiend/eleventy-oc-directory-template.git
```

...or replace that link with the HTTPS/SSH link to your personal repository, which can be found in the "Code" dropdown button at the top of the repository.

#### 2c: I don't have Git

This repository's files can be downloaded as a .ZIP file through the "Code" dropdown at the top. Underneath the "Clone" section should be a button that says "Download ZIP".

Make sure to extract these files, because it's pretty hard to edit files when they're in a zipped folder!

### 3. Set up your Node environment and run the project

Now that you have your files, open your project directory in a command line (e.g. `Documents/Projects/eleventy-oc-directory-template/`) and type `npm i`. This should install all dependencies that allow you to run the project.

Once you have your dependencies, type `npm start` in the command line to serve a **live server** of this template. You can view your website by typing `localhost:8080` in your browser's address bar! Alternatively, you can type `npm build` to run a one-time generation of your project files, but this can't be viewed through your browser.

Eleventy projects work by taking your source files - including "template" files such as `.njk`, `.html`, or `.md`, data files, assets (`.css`, `.js`, `.png`, etc...), and then uses all of these combined to generate a complete website. This repository outputs your files to a folder called `build`. The contents of the `build` folder can then be uploaded to any website host of choice, such as Neocities.

The [Eleventy](https://www.11ty.dev/) website contains extensive documentation to using the static site generator. In the future I would like to create proper tutorials for navigating this project.

## Features

- Fully customizable template; everything you see here can be modified
- Pages can be given an "id" property and retrieved from this id, great for linking pages to other pages without knowing their URL
- Widgets that can be used to display content in special ways, such as:
  - **Tabbed views:** Click on the navigation buttons to flip between tabs.
    - Tab lists (navigation) and tab panels (content) can be placed wherever you want.
    - A tab may have 0 to infinite number of panels.
    - Tabbed views can be nested!
- Content warning options, with support for the following:
  - Dialog modal on first visit to opt in/out of sensitive content
  - `blurred` shortcode that can be unblurred by the user, with initial blur state based on content preference
  - Force users to click an "I am an adult" checkbox for mature-rated websites
  - Users are capable of changing their content filters at any time via the sidebar
- Responsive base stylesheet that should (?) work on both desktop and mobile devices
- Tag pages for categorizing pages and navigating between pages with shared tags
- [`@mdit/plugin-attrs`](https://mdit-plugins.github.io/attrs.html) for adding attributes to Markdown elements
- [`markdown-it-div`](https://www.npmjs.com/package/markdown-it-div) for creating divs in Markdown without HTML
- [`@grimlink/eleventy-plugin-sass`](https://www.npmjs.com/package/@grimlink/eleventy-plugin-sass) for arguably more readable stylesheets

## Suggested Uses

These features will not be added to the template project, but if you're learning Eleventy and looking for ways to improve your skills, I recommend trying these things!

- Generate an [RSS feed](https://www.11ty.dev/docs/plugins/rss/) of your newest pages.
  - The RSS specification can be found [here](https://www.rssboard.org/rss-specification).
- Add new namespaces to fit your needs - Species, Organizations, Animals, Languages, Lore, Worlds, etc.
  - Namespaces are defined in `src/_data/namespaces.json`.
    - Adding a new namespace to this file automatically adds it to sidebars, tag pages, and page footers.
  - Create a directory to hold your new namespace's files.
    - Make sure to include the data `.json` file!
  - Optionally, create templates and add them to the `page_templates` folder.
- Change the way your website shows in embeds (e.g. Discord) using HTML meta tags.
  - There's a [plugin for this](https://www.npmjs.com/package/eleventy-plugin-metagen), too!
- Create a GitHub action to automatically deploy your site changes to your web host of choice.

## TODO

If you have any issues / bugs / etc., feel free to open a GitHub issue for it!

- Developer guides
  - Content warning documentation
  - Tabbed pane documentation