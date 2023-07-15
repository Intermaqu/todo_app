import { v4 as uuidv4 } from "uuid";

const getId = () => {
    return uuidv4().slice(-12);
};

export { getId };
