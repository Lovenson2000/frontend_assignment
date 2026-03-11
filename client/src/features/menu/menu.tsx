import { useGetMenuItemsQuery } from "./menuApi"

export default function Menu() {
  const { data: items = [], error, isLoading, isFetching } = useGetMenuItemsQuery()

  if (isLoading) {
    return <div>Loading menu...</div>
  }

  if (error) {
    return <div>Failed to load menu.</div>
  }

  return (
    <section>
      <h2>Menu</h2>
      {isFetching ? <p>Refreshing menu...</p> : null}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </section>
  )
}
