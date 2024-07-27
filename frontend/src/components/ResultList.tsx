type ResultListProps = {
    results: { id: number, name: string }[]
  }
  
  const ResultList = ({ results }: ResultListProps) => {
    return (
      <div>
        {results.map(result => (
          <div key={result.id} className="card">
            <h2>{result.name}</h2>
            <p>ID: {result.id}</p>
          </div>
        ))}
      </div>
    )
  }
  
  export default ResultList
  