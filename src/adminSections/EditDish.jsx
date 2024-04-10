// import { useParams, useLocation } from "react-router-dom";
// import dishesStore from "../store/dishes.js";

// const EditDish = () => {
//   const { _id } = useParams();
//   const location = useLocation();
//   const dishes = dishesStore.dishes;

//   if (!_id) return <h3 className="text-beige ">Вибачте, сталася помилка</h3>;
//   if (!dishes) return <h2>Ми не отримали перелік страв. Спробуйте ще раз</h2>;

//   const currentDish = dishes.find(vacancy => vacancy._id === _id);
//   if (!currentDish) return <h2>У нас немає страви їз id:{_id}</h2>;

//   console.log(currentDish);

//   return (
//     <>
//       <div></div>
//     </>
//   );
// };

// export default EditDish;
