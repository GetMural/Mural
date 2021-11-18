import { Box, Typography } from '@mui/material'
import Input from 'components/StoryForm/Input'
import Image from 'components/StoryForm/Image'

export default function StoryMetadataForm() {
  return (
    <>
      <Typography variant="h2">Story Metadata</Typography>
      <form>
        <Box my={4}>
          <Input
            name="metadata.title"
            label="Title"
            autoFocus
            helperText={
              <>
                The title metadata field is also responsible for the og (Open
                Graph) og:title property. What you write here will appear as the title when shared on social media platforms
                such as Facebook and Twitter.
              </>
            }
            rules={{ required: true }}
          />
        </Box>
        <Box my={4}>
          <Input
            name="metadata.description"
            label="Description"
            helperText={
              <>
                The description metadata field is where you should describe your
                Mural story in between 120 to 158 characters. This length may
                seem arbitrary (and in some ways it is) - but this is ideal
                length of a string of text when displayed by search engines
                likesuch as Google or Duck Duck Go and social media platforms
                such as Facebook, Twitter, or Mastodon.
                <br />
                The description metadata field is also the og:description text that is displayed on social media when a user shares your story.
              </>
            }
            rules={{ maxLength: 158, minLength: 120 }}
          />
        </Box>
        <Box my={4}>
          <Input
            name="metadata.author"
            label="Author"
            placeholder="Your name"
            helperText={
              <>
                Use this field for the name of the Mural story's author.
              </>
            }
          />
        </Box>
        <Box my={4}>
          <Input
            name="metadata.canonicalUrl"
            label="Canonical URL"
            placeholder="https://your-website.com"
            helperText={
              <>
                If you know the final URL of your Mural story, then
                this is where to enter that information.
              </>
            }
          />
        </Box>
        <Box my={4}>
          <Input
            name="metadata.siteName"
            label="Site Name"
            helperText={
              <>
                What is the name of your Mural story? Although they are often
                the same, this does not have to be identical to the title
                metadata information.
              </>
            }
          />
        </Box>
        <Box my={4}>
          <Image
            name="metadata.siteImage"
            label="Site Image"
            helperText={
              <>
                This is where you should upload an image to represent your Mural
                story when it is displayed on social media platforms such as
                Facebook, Twitter, or Mastodon.
              </>
            }
          />
        </Box>
        <Box my={4}>
          <Input
            name="metadata.extraHeader"
            label="Extra Headers - Leave Blank For Defaults"
            multiline
            helperText={
              <>
                To embed other fonts, copy a code like
                <br />
                <code>
                  {`<link
                    href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&display=swap"
                    rel="stylesheet"
                  />`}
                </code>
              </>
            }
          />
        </Box>
        <Box my={4}>
          <Input
            name="metadata.mainFont"
            label="Main font (all body/intro text) CSS rules"
            multiline
            helperText={
              <>
                CSS rules to specify families
                <br />
                <code>font-family: 'Roboto Slab', serif;</code>
              </>
            }
          />
        </Box>
        <Box my={4}>
          <Input
            name="metadata.headerFont"
            label="Headers font (titles/subtitles) embed - Leave blank for defaults"
            multiline
            helperText={
              <>
                CSS rules to specify families
                <br />
                <code>font-family: 'Roboto Slab', serif;</code>
              </>
            }
          />
        </Box>
        <Box my={4}>
          <Input
            name="metadata.extraCss"
            label="Extra CSS - Leave blank for defaults"
            multiline
            helperText={
              <>
                Add some custom CSS to your story. CSS will be included in a{' '}
                {`<style>`} tag in the document {`<head>`}
                Example:
                <br />
                <code>{`.my-class { text-align: left; }`}</code>
              </>
            }
          />
        </Box>
        <Box my={4}>
          <Input
            name="metadata.googleAnalyticsId"
            label="Paste your Google Analytics ID here"
          />
        </Box>
        <Box my={4}>
          <Input name="metadata.rssPingbkack" label="RSS pingback" />
        </Box>
      </form>
    </>
  )
}
