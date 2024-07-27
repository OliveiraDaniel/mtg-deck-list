import axios from 'axios'
import { Card } from '../types/card'

const ScryfallApiUrl = 'https://api.scryfall.com/cards/search'

export const fetchCards = async (searchQuery: string) => {
  try {
    const response = await axios.get(ScryfallApiUrl, {
      params: { q: searchQuery }
    })

    if (response.data && response.data.data && response.data.data.length > 0) {
      const cards = response.data.data
      const jsonObject = cards.map((card: Card) => ({
        cardmarket_id: card.cardmarket_id,
        name: card.name,
        image: card.image_uris.small.split('?')[0],
      }))

      console.log('jsonObjectjsonObjectjsonObject', jsonObject)

      return jsonObject
    } else {
      throw new Error('Nenhum resultado encontrado para sua busca.')
    }
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error)
    throw new Error('Erro ao buscar dados da API. Tente novamente mais tarde.')
  }
}
