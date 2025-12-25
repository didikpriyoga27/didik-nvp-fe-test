import { ISelectComponentProps } from "./type";

/**
 * A basic select component.
 *
 * The component takes an `options` property that is an array of objects
 * with `label` and `value` properties, and renders a `select` element
 * with options for each item in the `options` array. The component also
 * takes any other props that are valid for a `select` element.
 *
 * The component renders a default option with the text "Select an option".
 *
 * @example
 * <SelectComponent options={[{ label: "Apple", value: "apple" }, { label: "Banana", value: "banana" }]} />
 *
 * @param {ISelectComponentProps} props - The props for the component.
 * @param {Option[]} [props.options=[]] - The options to render.
 */
const SelectComponent = ({ options = [], ...props }: ISelectComponentProps) => {
  return (
    <select
      className="bg-gray-200 dark:bg-gray-800 rounded-full px-4 py-2"
      {...props}
    >
      <option value="">Select an option</option>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default SelectComponent;
