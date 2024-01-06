import React from 'react'
import { ActionProps, FormProps, TextInputProps } from '../types/Form'
import { useFormContext } from 'react-hook-form'

const Form: React.FC<FormProps> & {
    TextInput: React.FC<TextInputProps>
    Action: React.FC<ActionProps>
} = ({ children, onSubmit, ...props }) => {
  return (
    <form {...props} onSubmit={ onSubmit } className="flex-column md:flex gap-2 w-full justify-items-center items-center">
        { children }
    </form>
  )
}

const TextInput: React.FC<TextInputProps> = (props) => {
    const { register } = useFormContext()

    return (
        <input 
            {...register(props.name, props.validator)}
            type="text" 
            placeholder={props.placeholder}
            className={props.className}
            defaultValue={props.default}
            disabled={props.disabled}
        />
    )
}

const Action: React.FC<ActionProps> = ({ children, ...props }) => {
    return (
        <button {...props} className="btn md:btn-md bg-secondary text-primary hover:bg-secondary/[0.8]" {...props}>
            { children }
        </button>
    )
}

Form.TextInput = TextInput
Form.Action = Action

export default Form