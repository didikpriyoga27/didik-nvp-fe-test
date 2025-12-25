export interface Option {
  label: string;
  value: string;
}

export interface ISelectComponentProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: Option[];
}
