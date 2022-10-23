import React from "react";
import { Input, Flex } from "@chakra-ui/react";

type Props = {
  id: string;
  label: string;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
};

export default function FormInput({
  id,
  label,
  value,
  setValue,
  placeholder,
  type,
  required,
}: Props) {
  return (
    <Flex direction="column" w="100%" p={4}>
      <label htmlFor={id}>{label}</label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
    </Flex>
  );
}
