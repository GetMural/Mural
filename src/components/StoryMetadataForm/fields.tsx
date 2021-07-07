import { Field } from 'components/MuralForm'
import { StoryMetdataState } from 'store/slices/storyMetadata'

const fields: Field<StoryMetdataState>[] = [
  {
    name: 'title',
    label: 'Title',
    rules: {
      required: 'Title is required',
    },
    helperText: (
      <span>
        The title metadata field is also responsible for the og (Open Graph)
        og:title property which is used by social media platforms such as
        Facebook and Twitter.',
      </span>
    ),
  },
  {
    name: 'description',
    label: 'Description',
    rules: {
      maxLength: 158,
      minLength: 120,
    },
    helperText: (
      <>
        The description metadata field is where you should describe your Mural
        story in between 120 to 158 characters. This length may seem arbitrary
        (and in some ways it is) - but this is ideal length of a string of text
        when displayed by search engines likesuch as Google or Duck Duck Go and
        Social media platforms such as Facebook, Twitter, or Mastodon.
        <br />
        The description metadata field is also responsible for the
        og:description output in your final Mural story.
      </>
    ),
  },
  {
    name: 'author',
    label: 'Author',
    placeholder: 'Your name',
    helperText: (
      <>
        The author field is where the author of the Mural story's name is
        entered.
      </>
    ),
  },
  {
    name: 'canonicalUrl',
    label: 'Canonical URL',
    type: 'url',
    placeholder: 'https://your-website.com',
    helperText: (
      <>
        If you know the final website address of your Mural story then this is
        where to enter that information.
      </>
    ),
  },
  {
    name: 'siteName',
    label: 'Site Name',
    helperText: (
      <>
        What is the name of your Mural story? Although they are often the same
        this does not have to be identical to the title metadata information.
      </>
    ),
  },
  {
    name: 'siteImage',
    label: 'Site Image',
    type: 'image',
    helperText: (
      <>
        This is where you should upload an image to represent your Mural story
        when it is displayed on social media platforms such as Facebook,
        Twitter, or Mastodon.
      </>
    ),
  },
  {
    name: 'monetizeStory',
    label: 'Monetize Story',
    type: 'checkbox',
    helperText: <>set up a digital wallet and monetize your content.</>,
  },
  { name: 'googleAnalyticsId', label: 'Google Analytics ID' },
  { name: 'rss_pingbkack', label: 'RSS pingbkack' },
]

export default fields
