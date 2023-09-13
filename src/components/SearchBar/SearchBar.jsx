import { Input } from "components/Input/Input";
import s from "./styles.module.css";
import { Search as SearchIcon } from "react-bootstrap-icons";
export const SearchBar = ({ onTextChange, placeholder }) => {
    return (
        <>
            <SearchIcon size={25} className={s.icon} />
            <Input
                onChange={(e) => onTextChange(onTextChange)}
                placeholder={placeholder}
            />
        </>
    );
};
