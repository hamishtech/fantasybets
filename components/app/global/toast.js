import React from "react";
import { useToast } from "@chakra-ui/react";

function Toast({ text, desc, status }) {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title: text,
          description: desc,
          status: status,
          duration: 4000,
          isClosable: true,
        })
      }
    >
      Show Toast
    </Button>
  );
}

export default Toast;
