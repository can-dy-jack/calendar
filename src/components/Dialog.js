

export default function Dialog({ children, show }) {
  return (
    <div style={{
      display: show ? "block" : "none"
    }}>
      <div className="body">
        {children}
      </div>
    </div>
  )
}
