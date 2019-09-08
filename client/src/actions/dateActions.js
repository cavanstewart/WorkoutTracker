import { CHANGE_DATE } from "./types";

export const changeDate = (date) => {
    console.log(date)
    return {
        type: CHANGE_DATE, 
        payload: { date }
    };
}