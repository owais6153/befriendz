import { useController } from "react-hook-form";

function CheckboxGroup({ options, control, name, indexKey, value }) {
  const { field } = useController({
    name,
    control,
    defaultValue: [],
  });
  return options.map((option, index) => (
    <label
      className={`p-3 cursor-pointer px-6 rounded-t-3xl ${
        field.value.includes(option[indexKey])
          ? "bg-[#0493A3] text-white"
          : "bg-[#F5F5F5]"
      }`}
      key={index}
    >
      <input
        type="checkbox"
        id="choose-me"
        className="peer hidden"
        name={name}
        value={option[indexKey]}
        checked={field.value.includes(option[indexKey])}
        onChange={(e) => {
          const ckvalue = e.target.value;
          const isChecked = e.target.checked;
          if (isChecked) {
            field.onChange([...field.value, ckvalue]);
          } else {
            field.onChange(field.value.filter((v) => v !== ckvalue));
          }
        }}
      />
      {option[value]}
    </label>
  ));

}
export default CheckboxGroup;
