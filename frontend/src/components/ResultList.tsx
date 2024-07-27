import React from 'react'

type ResultListProps = {
  results: { id: number; name: string, cardmarket_id: number, image: string }[]
}

const ResultList: React.FC<ResultListProps> = ({ results }) => {
  return (
    <ul>
      {results.map((result) => {
        console.log('Rendering result:', result) // Adiciona um log para depuração
        return (
          <li key={result.id} className="card">
            <div key={result.cardmarket_id}>
              <h2>{result.name}</h2>
              <img src={result.image} alt={result.name} />
              <p>ID: {result.cardmarket_id}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default ResultList
