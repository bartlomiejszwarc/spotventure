export default function Background() {
  return (
    // <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
    //   <rect fill='#ffffff' width='24' height='24' />
    //   <defs>
    //     <linearGradient id='a' x1='0' x2='0' y1='0' y2='1' gradientTransform='rotate(129,0.5,0.5)'>
    //       <stop offset='0' stopColor='#064E3B' />
    //       <stop offset='1' stopColor='#8E2793' />
    //     </linearGradient>
    //   </defs>
    //   <pattern id='b' width='35' height='35' patternUnits='userSpaceOnUse'>
    //     <circle fill='#ffffff' cx='17.5' cy='17.5' r='17.5' />
    //   </pattern>
    //   <rect width='100%' height='100%' fill='url(#a)' />
    //   <rect width='100%' height='100%' fill='url(#b)' fillOpacity='0.03' />
    // </svg>
    <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
      <rect fill='#ffffff' width='24' height='24' />
      <defs>
        <linearGradient id='a' x1='0' x2='0' y1='0' y2='1' gradientTransform='rotate(118,0.5,0.5)'>
          <stop offset='0' stop-color='#34D399' />
          <stop offset='1' stop-color='#E879F9' />
        </linearGradient>
      </defs>
      <pattern id='b' width='29' height='29' patternUnits='userSpaceOnUse'>
        <circle fill='#ffffff' cx='14.5' cy='14.5' r='14.5' />
      </pattern>
      <rect width='100%' height='100%' fill='url(#a)' />
      <rect width='100%' height='100%' fill='url(#b)' fill-opacity='0.05' />
    </svg>
  );
}
