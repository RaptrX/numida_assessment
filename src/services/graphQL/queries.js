import { gql } from '@apollo/client';

export const GET_LOAN_PRODUCTS = gql`
{
  loanProducts {
    id
    name
    interestRate
    maximumAmount
  }
}
`

export const GET_LOAN_APPLICATIONS = gql`
{
  loanApplications {
    id
    fullName
    email
    loanAmount
    loanPurpose
  }
}
`