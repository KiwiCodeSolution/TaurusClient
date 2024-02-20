import { ArrowUp } from "../icons/iconComponent";
import ContactList from "./ContactList";
import NavBar from "./NavBar";
import SocIcons from "./SocIcons";
import Button from "./UI/Button";
import Logo from "./UI/Logo";
import logoKiwiCode from "/images/LogoKiwiCode.png";

const Footer = () => {
  return (
    <footer className="w-full">
      <section className="wrapper py-10 border_custom">
        <ul className="flex gap-x-[87px] justify-between">
          <li>
            <Logo />
          </li>
          <li>
            <NavBar sectionType={"footer"} />
          </li>
          <li>
            <ContactList />
          </li>
          <li className="w-[186px] flex flex-col gap-y-[29px]">
            <p className="w-full">Слідкуйте за нами в соціальних мережах</p>
            <SocIcons />
            <Button style={"transparent"}>Зв&apos;язатись</Button>
          </li>
          <li>
            <Button style={"round"}>
              <a href="#header" className="w-full h-full p-2 flex justify-between items-center">
                <ArrowUp />
              </a>
            </Button>
          </li>
        </ul>
      </section>
      <section className="wrapper pt-[22px] pb-4 border_custom">
        <div className="w-full relative">
          <p className="text-sm text-center mb-1">
            Використовуючи цей сайт, ви погоджуєтесь з{" "}
            <a href="#" className="underline">
              Умовами обслуговування
            </a>{" "}
            та{" "}
            <a href="#" className="underline">
              Політикою конфіденційності
            </a>
          </p>
          <p className="text-base text-center">
            <a href="#">© KiWiCode Solution, 2024</a>
          </p>
          <img
            src={logoKiwiCode}
            alt="logo company KiwiCode Solutions"
            className="absolute top-0 left-0 w-[90px] h-[52px]"
          />
        </div>
      </section>
    </footer>
  );
};

export default Footer;
