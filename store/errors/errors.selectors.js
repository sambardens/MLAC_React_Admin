import { useSelector } from "react-redux";

const Error = () => useSelector((state) => state.error.errorData);

export { Error };
