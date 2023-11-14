export default function Icon({
  name,
  fill = true,
  size = 36,
}: {
  name: string;
  fill?: boolean;
  size?: number;
}) {
  return (
    <span
      className={`material-symbols-outlined ${fill ? 'fill' : ''}`}
      style={{ fontSize: size, maxWidth: '50px', overflow: 'hidden' }}
    >
      {name}
    </span>
  );
}
