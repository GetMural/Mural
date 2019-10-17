# MacOSX

(https://stackoverflow.com/questions/40523307/brew-install-docker-does-not-include-docker-engine#answer-43365425)

`brew cask install docker`

- Press `⌘ + Space` to bring up Spotlight Search and enter Docker to launch Docker.
- In the Docker needs privileged access dialog box, click OK.
- Enter password and click OK.
- Click on the docker whale icon in the status menu and wait for it to show Docker is running

Open file `docker-compose.yaml` in an editor
Look for the line under the comment `# electron Mural user data folder`
Replace `/Users/naaro/Library/Application Support/mural` with your electron user data folder path.

In a terminal inside the Mural directory run
`docker-compose up`
