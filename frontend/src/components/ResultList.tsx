import React, { useState } from 'react'
import CardDetail from '../components/CardDetails'

type ResultListProps = {
  results: { id: string; name: string, image: string, released_at: string, printed_text: string, mana_cost: string, power: string, toughness: string }[]
}

const ResultList = ({ results }: ResultListProps) => {
  const [selectedCard, setSelectedCard] = useState<{ id: string, name: string, image: string, released_at: string, printed_text: string, mana_cost: string, power: string, toughness: string} | null>(null)

  const handleCardClick = (card: { id: string, name: string, image: string, released_at: string, printed_text: string, mana_cost: string, power: string, toughness: string }) => {
    setSelectedCard(card)
  }

  const handleCloseModal = () => {
    setSelectedCard(null)
  }

  return (
    <div>
      <ul>
        {results.map((result) => {
          const dataObj = new Date(result.released_at)
          return (
            <li key={result.id} className="card" onClick={() => handleCardClick(result)}>
              <div>
                <h2>{result.name}</h2>
                <img src={result.image} alt={result.name} />
                <p>Lançamento: {dataObj.toLocaleDateString('pt-BR')}</p>
              </div>
            </li>
          )
        })}
      </ul>

      {selectedCard && (
        <Modal onClose={handleCloseModal}>
          <CardDetail card={selectedCard} />
        </Modal>
      )}
    </div>
  )
}

const Modal = ({ children, onClose }: { children: React.ReactNode, onClose: () => void }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-button"><span>+</span></button>
        {children}
      </div>
    </div>
  )
}

export default ResultList
