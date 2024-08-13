import PropTypes from "prop-types";
import { observer } from "mobx-react";

const UserItem = observer(({ user }) => {
  const { username, role, active } = user;

  const status = active ? "користувач активний" : "доступ призупинено";

  return (
    <article
      className={`w-full min-h-[71px] px-6 border-b border-base-brown border-dashed text-sm text-beige `}
    >
      <div className={`w-full h-[71px] flex items-center gap-x-6 overflow-hidden `}>
        <p className="w-1/3">{username}</p>
        <p className="w-1/3">{role}</p>
        <p className="w-1/3">{status}</p>
      </div>
    </article>
  );
});

UserItem.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserItem;
