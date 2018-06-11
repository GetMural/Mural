# Mural

Mural is a tool for visual storytelling. It’s a program that helps you sequence your visual story, and then generates everything needed for that story to be displayed on most modern web browsers and served from any web server.

You can see the way your story will look, test out all of the elements, and make changes if necessary before it’s uploaded to the web.

When a story is made with Mural, its visual elements are displayed at full screen by default, letting the strength and richness of your work shine through. Images can be combined with sound, videos combined with text, and numerous other combinations are possible.

Mural uses the metaphor of a storyboard to lay out the different elements of your story. With Mural, you can easily rearrange the sequence of the different items that make up your story.

You don’t have to know how to code in order to use Mural. But if you do know how to code, you’ll appreciate being able to go into the web standard code that Mural generates and make the changes you want using standard tools.

Funding for Mural was provided in Round 3 of Google’s Digital News Initiative Prototype Fund.

Mural is released as open source under the GNU Affero General Public License. See Appendix 2 for the text of this license.

Mural is written in NodeJS and uses Electron. 

## Site Output

Once a Mural story is ready to be published, the user clicks the 'Download' button and the program sends a .ZIP file which contains all the files needed to publish the story on a standard web server (HTML, CSS, JavaScript and media files, in addition to the JSON file used by Mural internally). 

## Installation and running the app

So far it's as easy as `npm install` but you'll also need to have a global installation of ![cordova](https://cordova.apache.org/) to build the app outside of the context of the browser.

## Build dist index.html

From the command line run `npm run build`.  This will create the in public/dist/index.html which can be used as a standalone file.
