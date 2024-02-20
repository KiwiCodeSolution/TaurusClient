import PropTypes from "prop-types";

const ServiceItem = ({ item }) => {
  return (
    <ul className="flex flex-col w-[356px] h-[383px] p-0 text-lite-yellow mx-auto">
      <li className="mb-6 mx-auto">
        <img src={item.src} alt={item.alt} className="w-[261px] h-[261px] border border-base-brown object-contain" />
      </li>
      <li className="text-18 uppercase mb-2 text-center">{item.title}</li>
      <li className="text-14 text-center leading-[21px]">{item.subtitle}</li>
    </ul>
  );
};

ServiceItem.propTypes = {
  item: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
  }).isRequired,
};

export default ServiceItem;
