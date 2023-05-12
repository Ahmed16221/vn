import React, { createContext, useReducer, useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { profiles } from "../Queries/Queries";

const LOADING = "LOADING";
const ERROR = "ERROR";
const LIST_DATA = "LIST_DATA";

export const ListDataContext = createContext();
const initalState = {
  isLoading: false,
  error: "",
  isLoaded: false,
  listData: [],
  filter: "",
  setFilter: true,
  tempProfile:{}
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case LOADING:
      return { ...state, isLoading: true };
    case ERROR:
      return { ...state, error: payload };
    case LIST_DATA:
      return { ...state, listData: payload, isLoaded: true };
    case "GLOBALFILTER":
      return { ...state, filter: payload };
    case "APPLYGLOBALFILTER":
      return { ...state, listData: payload, setFilter: false };
    case "PROFILEMUATATION":
      return { ...state, updateProfile: payload };
      case "PROFILEDELETEMUATATION":
        return { ...state, deleteProfile: payload };
        case "PROFILEEDIT":
            return { ...state, tempProfile: payload };
            case "ADDPROFILE":
              return { ...state, addProfile: payload };

    default:
      throw new Error();
  }
};

const ListDataContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initalState);

  const [
    updateProfile,
    { loading: profileLoading, error: profileError, data: subOrderData },
  ] = useMutation(profiles.profileMutation, {
    onCompleted(data) {
        refetch()
    },
  });

  const [
    addProfile,
    { loading: profileAddLoading, error: profileAddError, data: additionData },
  ] = useMutation(profiles.addprofile, {
    onCompleted(data) {
        refetch()
    },
  });

  const [
    deleteProfile,
    { loading: profiledelLoading, error: profiledelError, data: profiledelData },
  ] = useMutation(profiles.deleteProfileMutation, {
    onCompleted(data) {
        refetch()
    },
  });

  useEffect(() => {
    dispatch({ type: "PROFILEMUATATION", payload: updateProfile });
    dispatch({ type: "PROFILEDELETEMUATATION", payload: deleteProfile });
    dispatch({ type: "ADDPROFILE", payload: addProfile });
  }, []);

  const [queryVariable, setQueryVariable] = useState({
    orderBy: { key: "is_verified", sort: "desc" },
    rows: 16,
    page: 0,
    searchString: "",
  });
  const { loading, error, data, refetch } = useQuery(profiles.getProfiles, {
    variables: queryVariable,
  });

  useEffect(() => {
    const tempSearchString = { ...queryVariable };
    tempSearchString["searchString"] = state.filter;

    setQueryVariable(tempSearchString);
  }, [state.filter]);

  useEffect(() => {
    if (data) {
      dispatch({ type: LIST_DATA, payload: data });
    }
    if (error) {
      dispatch({ type: ERROR, payload: error });
    }

    if (loading) {
      dispatch({ type: LOADING, payload: false });
    }
  }, [data]);

  return (
    <ListDataContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {props.children}
    </ListDataContext.Provider>
  );
};

export default ListDataContextProvider;
