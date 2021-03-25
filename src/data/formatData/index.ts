import data from "../data.json"

export interface User {
    id: string;
    name: string;
    children: object;
    level: number;
    isChecked: boolean;
    father: string;
}

let count = -1;
const formatChildren: any = (user: User) => {
    if (Array.isArray(user) && user.length === 0) {
        return true;
    }
    if (Array.isArray(user) && count < user.length) {
        user.forEach((children: any) => {
            children.children = Object.values(children.children);
        })
        count = 0;
        return formatChildren(user[count].children)
    } else {
        count++
        if ((Object.keys(user.children)).length !== 0) {
            user.children = Object.values(user.children);
        } else {
            return true
        }
    }

    return formatChildren(user.children);
}
let newData = Object.values(data)

newData.forEach((elt: any) => {
    elt.determinated = true;
})

formatChildren(newData);

export default newData;
