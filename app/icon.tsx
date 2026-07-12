import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

// Brand blue from logo
const BLUE = '#3452CA'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left spine — the vertical backbone of the bracket */}
          <polygon points="0,5 7,2 7,28 0,25" fill={BLUE} />

          {/* Top arm — diagonal parallelogram going upper-right (3-D top face) */}
          <polygon points="7,2 23,0 27,4 11,6" fill={BLUE} />

          {/* Bottom arm — diagonal parallelogram going lower-right (3-D bottom face) */}
          <polygon points="7,28 11,24 27,26 23,30" fill={BLUE} />

          {/* Bottom-right accent — the small separate mark visible in the logo */}
          <polygon points="17,21 23,18 27,22 21,25" fill={BLUE} />
        </svg>
      </div>
    ),
    { ...size },
  )
}
