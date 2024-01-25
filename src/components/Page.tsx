interface PageProps {
  children?: React.ReactNode
}

export default function Page({ children }: PageProps) {
  return (
    <div className="h-screen w-screen relative" style={{ pageBreakAfter: "always", pageBreakInside: "avoid"}}>
      { children }
    </div>
  )
}