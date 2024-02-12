import Logo from "./UI/Logo";

const Footer = () => {
  return (
    <footer className="w-full fixed bottom-0 left-0">
      <section className="wrapper py-10 border_custom">
        <ul className="flex gap-x-[87px] justify-between">
          <li>
            <Logo />
          </li>
          <li>adress</li>
          <li>mail</li>
          <li>socicons</li>
          <li>buttonup</li>
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
