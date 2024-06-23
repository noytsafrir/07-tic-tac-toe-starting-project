export default function Log({turns}){


    return <ol id="log">
        {turns.map(turn => <li key={`${turn.cell.row}${turn.cell.col}`}> {turn.player} selected {turn.cell.row},{turn.cell.col}</li>)}
    </ol>
}