interface ILogoProps {
  size: number;
}
export default function Logo({size}: ILogoProps) {
  return <img src={'/images/logo.svg'} alt={'Logo'} style={{width: `${size / 4}rem`}} />;
}
