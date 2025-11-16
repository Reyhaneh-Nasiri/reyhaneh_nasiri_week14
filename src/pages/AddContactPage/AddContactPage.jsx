import ContactForm from "@/components/ContactForm/ContactForm";
import { ContactsContext } from "@/components/context/ContactsContext";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import { memo, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AddContactPage = () => {
  const { showModal } = useModal();
  const { showToast } = useToast();
  const { setContacts } = useContext(ContactsContext);
  const navigate = useNavigate();

  const addHandler = (newContact) => {
    const id = Date.now();
    setContacts((prev) => [...prev, { id, ...newContact }]);
    navigate("/contact-list");
    showToast("Contact added successfully", "success");
  };

  const renderModal = (newContact) => {
    showModal(
      `Save Contact`,
      "Are you sure you want to save this contact?",
      "Save",
      () => addHandler(newContact)
    );
  };

  return (
    <ContactForm
      initialValues={{ name: "", email: "", phone: "", job: "" }}
      onSubmit={renderModal}
      onCancel={() => navigate("/contact-list")}
      buttonText="Save"
      title="Add"
    />
  );
};

export default memo(AddContactPage);
