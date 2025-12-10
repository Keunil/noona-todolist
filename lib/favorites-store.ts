import useSWR from "swr"

const favoritesData: Set<string> = new Set()

export function useFavorites() {
  const { data, mutate } = useSWR("favorites", () => Array.from(favoritesData), {
    fallbackData: Array.from(favoritesData),
  })

  const toggleFavorite = (dealId: string) => {
    if (favoritesData.has(dealId)) {
      favoritesData.delete(dealId)
    } else {
      favoritesData.add(dealId)
    }

    const updatedFavorites = Array.from(favoritesData)
    mutate(updatedFavorites, { revalidate: false })
  }

  const isFavorite = (dealId: string) => {
    return data?.includes(dealId) || false
  }

  const removeAllFavorites = () => {
    favoritesData.clear()
    mutate([], { revalidate: false })
  }

  return {
    favorites: data || [],
    toggleFavorite,
    isFavorite,
    removeAllFavorites,
  }
}
