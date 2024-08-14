import { InputProps, SelectProps } from "../../../Input"
import { Resource } from "../types"

type FieldBaseProps<K extends string> = {
    _type: K,
    _id: string
    label: string
}

export type DriveFieldProps = FieldBaseProps<"drive"> & Omit<InputProps, "id" | "key">  
export type CheckboxFieldProps = FieldBaseProps<"checkbox"> & Omit<InputProps, "id" | "key">  
export type TextFieldProps = FieldBaseProps<"text"> & Omit<InputProps, "id" | "key">
export type SelectFieldProps = FieldBaseProps<"select"> & { options: string[] } & Omit<SelectProps<string>, "id" | "key" >

export type FieldProps = DriveFieldProps | TextFieldProps | SelectFieldProps;

export type FormResource = Resource<"form", {
    fields: (DriveFieldProps | TextFieldProps | SelectFieldProps)[]
}>

