export default function GameBoard({onSelectCell, board}){
    
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}> 
                                <button onClick={() => onSelectCell(rowIndex, colIndex)} 
                                disabled={playerSymbol !== null}> 
                                    {playerSymbol}</button>
                                
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}