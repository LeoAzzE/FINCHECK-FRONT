import { httpClient } from "../httpClient";

export async function remove(bankAccountsId: string) {
    const { data } = await httpClient.delete(
        `/bank-accounts/${bankAccountsId}`
    );

    return data;
}
