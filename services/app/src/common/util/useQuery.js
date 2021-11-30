import { useLocation } from "react-use";

export const useQuery = () => new URLSearchParams(useLocation().search);
