import { boolean, date, number, object, string } from "valibot";

export const CreateDateBlockSchema = object({
    officeId: number(),
    date: date(),
    description: string(), 
    active: boolean(),
})

export const ResponseDateBlockSchema = object({
    availabilityBlockId: number(),
})

