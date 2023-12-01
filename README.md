This is an [Eleventy](https://www.11ty.dev/) template designed for a original characters directory. More specifically, it can include information on characters, locations and projects ("settings"), and whatever else you want. This repository draws inspiration from [Toyhouse](https://toyhou.se/), various [Neocities](https://neocities.org/) websites, and some layout inspiration from [Dreamwidth](https://www.dreamwidth.org/).

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
  - TODO: Page for configuring content preferences at any time
  - `blurred` shortcode that can be unblurred by the user, with initial blur state based on content preference
  - Force users to click an "I am an adult" checkbox for mature rated websites
- [`@mdit/plugin-attrs`](https://mdit-plugins.github.io/attrs.html) for adding attributes to Markdown elements
- [`markdown-it-div`](https://www.npmjs.com/package/markdown-it-div) for creating divs in Markdown without HTML

## Suggested Uses

These features will not be added to the template project, but if you're learning Eleventy and looking for ways to improve your skills, I recommend trying these things!

- Generate an [RSS feed](https://www.11ty.dev/docs/plugins/rss/) of your newest pages.
  - The RSS specification can be found [here](https://www.rssboard.org/rss-specification).
- Add new namespaces to fit your needs - Species, Organizations, Animals, Languages, Lore, etc.
  - Namespaces are defined in `src/_data/namespaces.json`.
    - Adding a new namespace to this file automatically adds it to sidebars, tag pages, and page footers.
  - Create a directory to hold your new namespace's files.
    - Make sure to include the data `.json` file!
  - Optionally, create templates and add them to the `page_templates` folder.
- Change the way your website shows in embeds (e.g. Discord) using HTML meta tags.
  - There's a [plugin for this](https://www.npmjs.com/package/eleventy-plugin-metagen), too!