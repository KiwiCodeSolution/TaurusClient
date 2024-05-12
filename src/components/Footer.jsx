import { useState } from "react";
import { ArrowUp } from "../icons/iconComponent";
import ContactList from "./ContactList";
import NavBar from "./NavBar";
import SocIcons from "./SocIcons";
import Button from "./UI/Button";
import Logo from "./UI/Logo";
import logoKiwiCode from "/images/LogoKiwiCode.png";
import Overlay from "./UI/modal/Overlay";
import Form from "./Form";
import TermsOfService from "./TermsOfService";
import PrivacyPolicy from "./PrivacyPolicy";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalTermsOpen, setIsModalTermsOpen] = useState(false);
  const [isModalPolicyOpen, setIsModalPolicyOpen] = useState(false);

  return (
    <footer className="min-w-[360px] xl:w-full bg-dark-bg">
      <section className="wrapper pt-12 xl:py-10 border_custom relative">
        <div className="flex flex-col xl:flex-row gap-x-[87px] justify-between">
          <Logo />

          <NavBar sectionType={"footer"} />

          <div className="flex mt-8 md:hidden w-full justify-between">
            <ContactList />
            <div className="w-[160px] xl:w-[186px] flex flex-col gap-y-[29px]">
              <p className="w-full text-sm">Слідкуйте за нами в соціальних мережах</p>
              <SocIcons />
            </div>
          </div>
          <Button
            style={"transparent"}
            clickFn={() => setIsModalOpen(true)}
            btnClass={"w-full my-8 xl:hidden xl:my-0"}
          >
            Зв&apos;язатись
          </Button>

          <div className="hidden xl:flex justify-between">
            <ContactList />
          </div>
          <div className="hidden xl:flex w-[186px] flex-col gap-y-[29px]">
            <p className="w-full">Слідкуйте за нами в соціальних мережах</p>
            <SocIcons />
            <Button style={"transparent"} clickFn={() => setIsModalOpen(true)}>
              Зв&apos;язатись
            </Button>
          </div>

          <Button style={"round"} btnClass={"absolute top-12 right-3 xl:relative"}>
            <a href="#header" className="w-full h-full p-2 flex justify-center items-center">
              <ArrowUp />
            </a>
          </Button>
        </div>
      </section>
      <section className="wrapper pt-[22px] pb-4 border_custom">
        <div className="w-full relative">
          <p className="w-full text-sm text-center flex flex-wrap gap-x-[2px] items-center justify-center mb-3 xl:mb-1">
            Використовуючи цей сайт, ви погоджуєтесь з{" "}
            <button className="underline" onClick={() => setIsModalTermsOpen(true)}>
              Умовами обслуговування
            </button>{" "}
            та{" "}
            <button className="underline" onClick={() => setIsModalPolicyOpen(true)}>
              Політикою конфіденційності
            </button>
          </p>
          <p className="w-full text-sm xl:text-base text-center mb-3 xl:mb-0">
            <a href="https://www.linkedin.com/company/kiwicodesolution" target="_blank">
              © Copyright | KiWiCode Solution, 2024
            </a>
          </p>
          <img
            src={logoKiwiCode}
            alt="logo company KiwiCode Solutions"
            className="mx-auto xl:absolute xl:top-0 xl:left-0 w-[90px] h-[52px]"
          />
        </div>
        {isModalOpen && (
          <Overlay clickFn={() => setIsModalOpen(false)} componentName={"footer"}>
            <Form namePage="contacts" clickFn={() => setIsModalOpen(false)} />
          </Overlay>
        )}
        {isModalTermsOpen && (
          <Overlay clickFn={() => setIsModalTermsOpen(false)}>
            <TermsOfService />
          </Overlay>
        )}
        {isModalPolicyOpen && (
          <Overlay clickFn={() => setIsModalPolicyOpen(false)}>
            <PrivacyPolicy />
          </Overlay>
        )}
      </section>
    </footer>
  );
};

export default Footer;
