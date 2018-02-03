# Storyteller Standalone

An attempt at creating a simple to use interface for the Storyteller long-form storytelling project as created and funded by Sourcefabric.

## Dashboard

The dashboard should be able to create entries from scratch or be able to populate fields from an existing Storyteller project.

Each type of possible storyteller entry should be catered for. MVP should be a single type.

So far the Storyteller editor supports the following types:

* Full page video background
* The text centred
* Image Background
* Slideshow Horizontal
* Video Full Page

## Site Output

On site generation the build process should copy the contents of the src folder, story json (for sharing and editing after the fact), images, video, and audio (no idea yet) ~~along with the php (urgh)~~ and js files to a new folder in sites with the name of the project.  

## Installation and running the app

So far it's as easy as `npm install` but you'll also need to have a global installation of ![cordova](https://cordova.apache.org/) to build the app outside of the context of the browser.

## Build dist index.html

From the command line run `npm run build`.  This will create the in public/dist/index.html which can be used as a standalone file.
