import React from "react";
import { Input, Flex, FormLabel } from "@chakra-ui/react";

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
}: Props) {
  return (
    <Flex direction="column" w="100%" p={4}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        bg={"white"}
        color={"teal.800"}
        required={true}
      />
    </Flex>
  );
}
