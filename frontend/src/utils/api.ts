import axios from 'axios'
import { Card } from '../types/card'

const ScryfallApiUrl = 'https://api.scryfall.com/cards/search'

export const fetchCards = async (searchQuery: string) => {
  try {
    const response = await axios.get(ScryfallApiUrl, {
      params: { q: `${searchQuery+ ` unique:prints lang:pt`}`}
    })

    if (response.data && response.data.data && response.data.data.length > 0) {
      const cards = response.data.data
      const jsonObject = cards.map((card: Card) => ({
        id: card.id,
        name: card.printed_name,
        image: card.image_uris.large.split('?')[0],
        released_at: card.released_at,
        printed_text: card.printed_text,
        mana_cost: card.mana_cost,
        power: card.power,
        toughness: card.toughness
      }))
      return jsonObject
    } else {
      throw new Error('Nenhum resultado encontrado para sua busca.')
    }
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error)
    throw new Error('Erro ao buscar dados da API. Tente novamente mais tarde.')
  }
}
