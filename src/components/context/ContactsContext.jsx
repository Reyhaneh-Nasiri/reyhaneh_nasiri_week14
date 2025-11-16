import { createContext, useEffect, useMemo, useState } from "react";

export const ContactsContext = createContext();

const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem("contacts")) || []
  );
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [contacts, favorites]);

  const value = useMemo(
    () => ({
      contacts,
      setContacts,
      favorites,
      setFavorites,
    }),
    [contacts, favorites]
  );
  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
};

export default ContactsProvider;
