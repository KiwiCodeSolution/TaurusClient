import ContactList from "../../components/ContactList";
import MetaData from "../../components/MetaData";
import TitlePage from "../../components/TitlePage";

const Contacts = () => {
  return (
    <>
      <MetaData>Контакти ресторану</MetaData>
      <section className="section-wrapper">
        <img src="/images/contacts/contacts.png" alt="" className="w-full h-[416px] object-cover" />
        <div className="w-full mx-auto wrapper">
          <TitlePage>Контакти</TitlePage>
          <ContactList page={"contacts"} />
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2562.7167260775554!2d36.21933131218277!3d50.03540361704227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4127a6b4fc872d53%3A0x77496c48a3355262!2z0LLRg9C70LjRhtGPIDIzLdCz0L4g0KHQtdGA0L_QvdGPLCAzOSwg0KXQsNGA0LrRltCyLCDQpdCw0YDQutGW0LLRgdGM0LrQsCDQvtCx0LvQsNGB0YLRjCwgNjEwMDA!5e0!3m2!1suk!2sua!4v1708443738794!5m2!1suk!2sua"
          width="100%"
          height="370"
          allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </>
  );
};

export default Contacts;
