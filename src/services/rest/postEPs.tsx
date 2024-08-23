import { ApplyLoanParams } from "../../constants/entities";
import { baseURL } from "../../constants/env"

export const postApplyLoan = async ({ name, email, amount, purpose }: ApplyLoanParams) => {
    try {
        const response = await fetch(baseURL + '/apply-loan', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                full_name: name,
                email: email,
                loan_amount: amount,
                loan_purpose: purpose
            }),
        });
        const json = await response.json()
        return json
    } catch (error) {
        console.error(error)
    }
};