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
  - `sensitive` shortcode for hiding opted-out content
  - `blurred` shortcode that can be unblurred by the user, with initial blur state based on content preference
  - Force users to click an "I am an adult" checkbox for mature rated websites