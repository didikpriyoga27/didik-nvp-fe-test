export type IHeaderComponent =
  | "logo"
  | "search"
  | "cart"
  | "dark-mode-toggle"
  | "language-toggle"
  | "wagmi";

export interface IHeaderComponentProps {
  hiddenComponent?: IHeaderComponent[];
}
