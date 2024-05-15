import { observer } from "mobx-react-lite";
import TitlePage from "../../adminSections/TitlePage";
import MetaData from "../../components/MetaData";
import { useState } from "react";
import Button from "../../components/UI/Button";
import SearchBar from "../../adminSections/SearchBar";
import { Archive, ArrowBack } from "../../icons/iconComponent";
import MessageItem from "../../adminSections/MessageItem";

const FeedbackPage = observer(() => {
  const [filter, setFilter] = useState("");
  const [isArchive, setIsArchive] = useState(false);

  const toggleStateArchive = () => {
    setIsArchive(!isArchive);
  };
  return (
    <>
      <MetaData>Повідомлення</MetaData>
      <section className="w-[980px] mx-auto h-screen admin relative">
        <TitlePage style={""}>{!isArchive ? "Повідомлення" : "Архів Повідомлень"}</TitlePage>
        <div className="w-full mt-[18px] flex justify-between items-center px-8">
          {!isArchive ? (
            <>
              <SearchBar clickFn={setFilter} />

              <Button style={"archive"} clickFn={toggleStateArchive}>
                <Archive className={"fill-beige"} />
                Архів
              </Button>
            </>
          ) : (
            <>
              <button
                className="flex gap-x-2 back text-beige hover:text-base-yellow items-center"
                onClick={toggleStateArchive}
              >
                <ArrowBack className={"fill-beige"} />
                Повернутись
              </button>
              <SearchBar clickFn={setFilter} />
            </>
          )}
        </div>
        <div className="w-[916px] h-[37px] py-2 pl-2 pr-[60px] flex mx-auto items-center gap-x-6 justify-between bg-base-brown text-beige text-14 mt-[15px]">
          <p className="w-[117px]">Дата і час</p>
          <p className="w-[168px]">Замовник</p>
          <p className="w-[342px]">Повідомлення</p>
          <p className="w-[120px]">Статус</p>
        </div>

        <div className="w-full h-[calc(100%-400px)] mx-auto overflow-y-auto pt-[18px] px-8">
          <MessageItem />
        </div>
      </section>
    </>
  );
});

export default FeedbackPage;
