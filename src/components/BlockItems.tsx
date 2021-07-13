import { List, ListItem, ListItemText } from '@material-ui/core'
import useRouter from 'hooks/useRouter'
import { useAppSelector } from 'store/hooks'

export default function BlockItems() {
  const items = useAppSelector((state) => state.story.items)
  const selecteditemIndex = useAppSelector(
    (state) => state.navigation.view?.args?.index
  )
  const { goTo } = useRouter()
  return (
    <div>
      <List>
        {items &&
          items.map((item, i) => (
            <ListItem
              button
              key={i}
              selected={
                Number.isInteger(selecteditemIndex) && selecteditemIndex === i
              }
              onClick={() =>
                goTo({ view: { name: 'item', args: { item, index: i } } })
              }
            >
              <ListItemText primary={item.type} secondary={item.title} />
            </ListItem>
          ))}
      </List>
    </div>
  )
}
