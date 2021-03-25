import { changeDet } from "./action";

export const changeDetThunk = (value: boolean) => (dispatch: (changeDet: {value: boolean}) => any, setState: () => any) => {
    dispatch(changeDet(value));
}
