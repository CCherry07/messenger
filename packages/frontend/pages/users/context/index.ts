import React from "react";
import { User } from "shared/types";

const UsersContext = React.createContext<User>({} as User);

export const useUsersContext = () => React.useContext(UsersContext);

export default UsersContext;
