import { primary } from "./colours";
import { large, medium, scale, small } from "./dimensions";

export const heading = {
    fontWeight: "200",
    fontSize: scale(18)
}

export const subtitle = {
    fontWeight: "300",
    fontSize: scale(10)
}

export const highlight =
{
    fontWeight: "400",
    fontSize: scale(24),
    color: primary
}

export const normal = {
    fontWeight: "300",
    fontSize: scale(14)
}

export const button = {
    fontWeight: "400",
    fontSize: scale(12)
}

export const buttonContainer = {
    borderWidth: 1,
    borderRadius: large,
    borderColor: primary,
    alignSelf: 'flex-end',
    paddingVertical: small,
    paddingHorizontal: medium
}