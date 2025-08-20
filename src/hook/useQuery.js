import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export const useQuery = () => {
    const {search} = useLocation()
    // O [] é um array de dependencias
    return useMemo(() => new URLSearchParams(search), [search])
}