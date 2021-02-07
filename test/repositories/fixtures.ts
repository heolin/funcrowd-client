import axios, { AxiosResponse } from "axios";


export type ActionType = "get" | "post";
export enum PromiseOutcome {
    reject,
    resolve
}

export function mockedAxiosFixture(action: ActionType, outcome: PromiseOutcome, expectedValue: Object) {
    const mockedAxios = jest.spyOn(axios, action);
    
    if (outcome == PromiseOutcome.resolve)
        mockedAxios.mockReturnValue(
            Promise.resolve({ data: expectedValue } as AxiosResponse)
        );
    else
        mockedAxios.mockReturnValue(
            Promise.reject({ data: expectedValue } as AxiosResponse)
        );
    return mockedAxios;
}
