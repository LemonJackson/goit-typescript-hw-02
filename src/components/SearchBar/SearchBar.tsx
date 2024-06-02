import { BsSearch } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { FormEvent } from "react";

import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch: (newQuery: string) => void;
}

export default function Searchbar({ onSearch }: SearchBarProps) {
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;

    const query = form.elements.namedItem("query") as HTMLInputElement;

    if (query.value.trim() === "") {
      toast.error("Please enter search name.", { position: "top-right" });
      return;
    }

    onSearch(query.value.trim());
    form.reset();
  };

  return (
    <div className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button className={css.btn}>
          <BsSearch className={css.icon} />
        </button>
        <input
          className={css.input}
          type="text"
          name="query"
          placeholder="Search image..."
        />
        <Toaster />
      </form>
    </div>
  );
}
