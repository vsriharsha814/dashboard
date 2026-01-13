import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
          borderRadius: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 90,
              fontWeight: 700,
              color: 'white',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            SH
          </div>
          <div
            style={{
              width: 120,
              height: 4,
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: 2,
              marginTop: 8,
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

