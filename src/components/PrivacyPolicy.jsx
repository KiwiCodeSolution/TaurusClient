const PrivacyPolicy = () => {
  return (
    <div className="px-10">
      <h1 className="text-[30px] mt-3 mb-8 text-center font-bold uppercase">Політика конфіденційності:</h1>
      <ol>
        <li className="list-decimal mb-5">
          <h2 className="font-bold">Збір інформації:</h2>
          <ul>
            <li className="list-disc ml-5 mb-2">
              Ми збираємо інформацію, яку Ви надаєте під час бронювання, замовлення або заповнення форм зворотного
              зв&apos;язку.
            </li>
            <li className="list-disc ml-5">
              Ми також можемо автоматично збирати інформацію про Ваше використання сайту за допомогою кукі-файлів та
              інших технологій.
            </li>
          </ul>
        </li>
        <li className="list-decimal mb-5">
          <h2 className="font-bold">Використання інформації:</h2>
          <ul>
            <li className="list-disc ml-5 mb-2">
              Ми використовуємо Ваші особисті дані для обробки бронювань та замовлень та для забезпечення якісного
              обслуговування.
            </li>
            <li className="list-disc ml-5">
              Ми можемо використовувати Ваші контактні дані для надсилання повідомлень щодо бронювань, замовлень або
              акційних пропозицій.
            </li>
          </ul>
        </li>
        <li className="list-decimal mb-5">
          <h2 className="font-bold">Поширення інформації:</h2>
          <ul>
            <li className="list-disc ml-5">
              Ми не розголошуємо Ваші особисті дані третім сторонам без Вашого згоди, крім випадків, передбачених
              законом або для виконання наших послуг.
            </li>
          </ul>
        </li>
        <li className="list-decimal mb-5">
          <h2 className="font-bold">Безпека:</h2>
          <ul>
            <li className="list-disc ml-5">
              Ми прикладаємо всі можливі зусилля для захисту Ваших особистих даних від несанкціонованого доступу або
              розголошення.
            </li>
          </ul>
        </li>
        <li className="list-decimal">
          <h2 className="font-bold">Сторонні сервіси:</h2>
          <ul>
            <li className="list-disc ml-5">
              Зверніть увагу, що наш сайт може містити посилання на сторонні сайти, на які не поширюється наша політика
              конфіденційності.
            </li>
          </ul>
        </li>
      </ol>
    </div>
  );
};

export default PrivacyPolicy;
