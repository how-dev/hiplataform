export const determinated = (determinated: boolean = true, action: { type: string; value: boolean }) => {
    switch (action.type) {
        case "Switch":
            return action.value;
        default:
            return determinated;
    }
};
