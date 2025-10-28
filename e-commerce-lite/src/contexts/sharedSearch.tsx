import { createContext, useContext} from "react";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context)
    throw new Error("useSearch must be used within a SearchProvider");
  return context;
};
