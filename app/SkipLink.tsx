'use client'

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      style={{ position: 'absolute', left: '-9999px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}
      onFocus={(e) => {
        e.currentTarget.style.cssText =
          'position:fixed;top:12px;left:12px;padding:8px 16px;background:var(--bg);color:var(--text-primary);border:2px solid var(--text-primary);border-radius:8px;z-index:9999;width:auto;height:auto;'
      }}
      onBlur={(e) => {
        e.currentTarget.style.cssText =
          'position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;'
      }}
    >
      Skip to main content
    </a>
  )
}
