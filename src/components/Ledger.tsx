import TextArea from "./TextArea";

interface LedgerProps {
  columns: number;
  rows: number;
  digits: number;
  finalColumnDigits?: number;
}

interface LedgerRowProps {
  columns: number;
  digits: number;
  finalColumnDigits?: number;
}

const LedgerDigitsGroup = ({ digits }: { digits: number}) => {
  const digitWidth = 0.8; // rem
  
  return (
    <div className={`flex gap-0.5 h-5`}>
      {Array.from({ length: digits }).map((_, i) => (
        <div key={i} className="bg-slate-100" style={{ width: `${digitWidth}rem`}} />
      ))}
      <div className="bg-slate-100" style={{ width: `${digitWidth * 2}rem`}} />
    </div>
  )
}

const LedgerRow = ({ columns, digits, finalColumnDigits }: LedgerRowProps) => {
  return (
    <tr className="break-inside-avoid">
      <td className="border border-slate-400"></td>
      <td className="border border-slate-400"></td>
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="border border-slate-400">
          <LedgerDigitsGroup digits={i + 1 === columns ? finalColumnDigits ?? digits : digits} />
        </td>
      ))}
    </tr>
  )
}

export default function Ledger({ columns, rows, digits, finalColumnDigits }: LedgerProps) {
  return (
      <div className="prose">
        <table className="w-full border-collapse border border-slate-400 font-mono tracking-wider font-normal text-sm">
          <thead>
            <th className="text-left border border-slate-400 px-2 py-1" style={{ minWidth: "1in" }}>Date</th>
            <th className="text-left border border-slate-400 px-2 py-1 w-full">Transaction</th>
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="text-left border border-slate-400"></th>
            ))}
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, i) => (
              <LedgerRow key={i} columns={columns} digits={digits} finalColumnDigits={finalColumnDigits} />
            ))}
          </tbody>
        </table>
      </div>
  )
}