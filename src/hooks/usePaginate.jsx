import { createContext, useContext } from "react";

export const PaginateContext = createContext(null);
export default function usePaginate() {
    return useContext(PaginateContext);
}