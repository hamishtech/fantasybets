import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useUserDBContext } from "../../../context/UserDBContext";
import Toast from "../global/toast";

const SetNickName = ({ isOpen, userDB, setIsOpen }) => {
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const [nickName, setNickName] = useState("");
  const [validationErr, setValidationErr] = useState(false);
  const [toast, setToast] = useState(false);
  const [userDBFromContext, setUserDBFromContext] = useUserDBContext();

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Set Your Nickname</ModalHeader>
          <ModalBody pb={6}>
            <FormControl
              onSubmit={() => {
                console.log("submitted");
              }}
            >
              <FormLabel>
                Nickname{" "}
                <Text color='red.500' fontSize='sm'>
                  {validationErr
                    ? "Error: invalid (longer than 3 chars)"
                    : null}
                </Text>
              </FormLabel>
              <Input
                value={nickName}
                onChange={(e) => {
                  setNickName(e.target.value);
                  setValidationErr(false);
                }}
                ref={initialRef}
                placeholder='Nickname'
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                if (!nickName || nickName.length <= 3) {
                  setValidationErr(true);
                }
                const newUser = userDB;
                newUser.nickName = nickName;
                axios
                  .put(`../api/users/${userDB._id}`, newUser)
                  .then((res) => {
                    console.log(res);
                    setUserDBFromContext(res.data.updatedUser);
                    res.data.opStatus ? setIsOpen(false) : setToast(true);
                  })
                  .catch((err) => console.log(err));
              }}
              colorScheme='blue'
              mr={3}
            >
              Save
            </Button>
            {toast ? (
              <Toast
                status={"error"}
                title={"Error occured"}
                desc={"An issue occurred when setting your username"}
              />
            ) : null}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SetNickName;
