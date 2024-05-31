'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

interface SearchModalProps {
    searchModal: boolean;
    setSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchModal: React.FC<SearchModalProps> = ({
    searchModal,
    setSearchModal,
}) => {
    const router = useRouter();
    const [input, setInput] = useState("");

    useEffect(() => {
        if (searchModal) {
            const handleKeyPress = (e: KeyboardEvent) => {
                if (e.key === "Enter") {
                    // router.push({ pathname: "/search", query: { key: input } });
                    setSearchModal(false);
                }
                if (e.key === "Escape") {
                    setSearchModal(false);
                }
            };

            document.getElementById("searchModal")?.focus();
            document.addEventListener("keydown", handleKeyPress);

            return () => {
                document.removeEventListener("keydown", handleKeyPress);
            };
        }
    }, [searchModal, input, router, setSearchModal]);

    return (
        <div className={`search-modal ${searchModal ? "open" : ""}`}>
            <button
                onClick={() => setSearchModal(false)}
                className="search-close"
            >
                <IoCloseCircleOutline />
            </button>
            <input
                type="text"
                className="form-input"
                id="searchModal"
                placeholder="Type and hit enter..."
                onChange={(e) => setInput(e.target.value)}
            />
        </div>
    );
};

export default SearchModal;
