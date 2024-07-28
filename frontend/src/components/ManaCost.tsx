type ManaCostProps = {
  cost: string;
}

const ManaCost = ({ cost }: ManaCostProps) => {
  const manaSymbols: { [key: string]: string } = {
    G: 'Green',
    W: 'White',
    U: 'Blue',
    B: 'Black',
    R: 'Red'
  }

  const renderManaSymbol = (symbol: string) => {
    if (symbol === '{' || symbol === '}') {
      return null;
    }
    
    const color = manaSymbols[symbol as keyof typeof manaSymbols] || 'grey';
    if (/\d/.test(symbol)) {
      return (
        <span 
          key={symbol} 
          className="mana-symbol mana-symbol-number"
        >
          {symbol}
        </span>
      );
    }

    return (
      <span 
        key={symbol} 
        className={`mana-symbol mana-symbol-${color.toLowerCase()}`}
      >
        {symbol}
      </span>
    );
  }

  const processManaCost = (cost: string) => {
    return cost
      .replace(/[{}]/g, '')
      .split('')
      .map(symbol => renderManaSymbol(symbol))
  }

  return (
    <div className="mana-cost">
      {processManaCost(cost)}
    </div>
  );
}

export default ManaCost;
