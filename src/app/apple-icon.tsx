import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#8b6bc9',
        border: '12px solid #000000',
        boxShadow: '10px 10px 0 #000000',
        color: '#000000',
        fontSize: 110,
        fontWeight: 700,
        fontFamily: 'DM Sans, Arial, Helvetica, sans-serif',
        lineHeight: 1,
      }}
    >
      R
    </div>,
    {
      ...size,
    },
  );
}
