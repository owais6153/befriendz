import { Disclosure } from "@headlessui/react";

function DisclosureWrapper(props) {
  const { header, children } = props;
  return (
    <Disclosure>
      <Disclosure.Button className="py-2 w-full">{header}</Disclosure.Button>
      <Disclosure.Panel className="text-gray-500 w-full">
        {children}
      </Disclosure.Panel>
    </Disclosure>
  );
}

export default DisclosureWrapper;
