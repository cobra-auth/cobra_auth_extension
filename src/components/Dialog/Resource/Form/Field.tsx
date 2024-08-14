import { twMerge } from "../../../utils"
import { CheckboxInput, SelectInput, TextInput } from "../../../Input"
import { Label } from "../../../Label"
import { FieldProps, DriveFieldProps, SelectFieldProps, TextFieldProps, CheckboxFieldProps } from "./types"

export function FormField(props: FieldProps) {
    switch (props._type) {
        case "drive": return <DriveField {...props} />
        case "text": return <TextField {...props} />
        case "select": return <SelectField {...props} />
    }
}

export function DriveField({ label, _id, _type, ...props }: DriveFieldProps) {
    return (
        <div className="flex flex-col gap-1" data-type={_type}>
            <Label htmlFor={_id}>{label}</Label>
            <TextInput  {...props} pattern="^https:\/\/drive\.google\.com\/drive\/folders\/.*" id={_id} name={_id} datatype={_type} />
        </div>
    )
}

export function TextField({ label, _id, _type, ...props }: TextFieldProps) {
    return (
        <div className="flex flex-col gap-1" data-type={_type}>
            <Label htmlFor={_id}>{label}</Label>
            <TextInput {...props} id={_id} name={_id} key={_type} datatype={_type} />
        </div>
    )
}

export function SelectField({ label, _id, _type, className, ...props }: SelectFieldProps) {
    return (
        <div className="flex flex-col gap-1" data-type={_type}>
            <Label htmlFor={_id}>{label}</Label>
            <SelectInput {...props} name={_id} id={_id} className={twMerge('w-full grow', className)} datatype={_type} />
        </div>
    )
}

export function CheckboxField({ label, _id, _type, ...props }: CheckboxFieldProps) {
    return (
        <div className="flex flex-col"  data-type={_type}>
            <CheckboxInput id={_id} name={_id} {...props}  datatype={_type}>
                <Label htmlFor={_id} className="cursor-pointer pl-1 h-full flex items-center">{label}</Label>
            </CheckboxInput>
        </div>
    )
}