const TermsOfService = () => {
  return (
    <div className="px-10">
      <h1 className="text-[30px] mt-3 mb-8 text-center font-bold uppercase">Умови обслуговування:</h1>
      <ol>
        <li className="list-decimal mb-5">
          <h2 className="font-bold">Використання сайту:</h2>
          <ul>
            <li className="list-disc ml-5 mb-2">
              Використання цього сайту означає Вашу згоду з усіма умовами обслуговування.
            </li>
            <li className="list-disc ml-5">
              Інформація на сайті призначена виключно для загального ознайомлення та не є офертою.
            </li>
          </ul>
        </li>
        <li className="list-decimal mb-5">
          <h2 className="font-bold">Бронювання та Замовлення:</h2>
          <ul>
            <li className="list-disc ml-5 mb-2">
              Бронювання та замовлення на сайті підтверджують Вашу згоду з умовами обслуговування.
            </li>
            <li className="list-disc ml-5 mb-2">
              При бронюванні столика або замовленні страв необхідно надати правильні контактні дані.
            </li>
            <li className="list-disc ml-5">
              Ми залишаємо за собою право скасувати бронювання або замовлення у разі неправильного введення інформації
              або в разі технічних неполадок.
            </li>
          </ul>
        </li>
        <li className="list-decimal mb-5">
          <h2 className="font-bold">Скасування бронювання або замовлення:</h2>
          <ul>
            <li className="list-disc ml-5 mb-2">
              Ви можете скасувати бронювання або замовлення, повідомивши нас заздалегідь.
            </li>
            <li className="list-disc ml-5">
              Будь ласка, дотримуйтеся встановлених строків для скасування, щоб уникнути можливих штрафів.
            </li>
          </ul>
        </li>
        <li className="list-decimal mb-5">
          <h2 className="font-bold">Відмова від відповідальності:</h2>
          <ul>
            <li className="list-disc ml-5">
              Ми не несемо відповідальності за будь-які збитки або незручності, пов&apos;язані з неправильним введенням
              інформації або технічними неполадками.
            </li>
          </ul>
        </li>
        <li className="list-decimal">
          <h2 className="font-bold">Зміни умов:</h2>
          <ul>
            <li className="list-disc ml-5">
              Ми можемо змінювати ці умови час від часу. Будь ласка, періодично переглядайте їх для отримання оновленої
              інформації.
            </li>
          </ul>
        </li>
      </ol>
    </div>
  );
};

export default TermsOfService;
