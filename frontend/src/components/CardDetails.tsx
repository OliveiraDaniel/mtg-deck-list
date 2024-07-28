import ManaCost from "./ManaCost";
import {CardDetailProps} from './../types/cardPropsReturn'

type Props = {
  card: CardDetailProps
}
  
const CardDetail = ({ card }: Props) => {
  return (
    <div className="card-detail">
      <div className="image">
        <h2>{card.name}</h2>
        <img src={card.image} alt={card.name} />
        <p>Lançamento: {new Date(card.released_at).toLocaleDateString('pt-BR')}</p>
      </div>
      <div className="description">
        <strong>Descrição:</strong> 
        <p>{card.printed_text}</p>
        <strong>Custo de mana:</strong>
        <ManaCost cost={card.mana_cost} />
        {card.power && (
          <>
            <strong>Força/Defesa:</strong> 
            <p>{card.power}/{card.toughness}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default CardDetail
  