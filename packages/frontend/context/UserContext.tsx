import React from "react";
import { User } from "shared/types";

const UserContext = React.createContext<User>({} as User);

export const useUserContext = () => React.useContext(UserContext);

export default UserContext;
