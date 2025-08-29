import { FormGroup } from "@angular/forms"

export const getFormErrors = (formGroup: FormGroup): string => {
  const controls = Object.keys(formGroup.controls)

  const getError = (controlName: string) => {
    const formMinLenght = formGroup.get(controlName)?.errors?.["minlength"]?.requiredLength
    const formMaxLenght = formGroup.get(controlName)?.errors?.["maxlength"]?.requiredLength
    const errorMessages: Record<string, string> = {
      email: "Por favor, ingrese un correo electrónico válido",
      required: "Campo requerido",
      passwordsNotMatch: "Las contraseñas no coinciden",
      invalid: "Campo inválido",
      minlength: `El campo '${controlName}' debe tener al menos ${formMinLenght} caracteres`,
      maxlength: `El campo '${controlName}' no puede tener más de ${formMaxLenght} caracteres`,
    }
    const firstErrorKey = Object.keys(formGroup.get(controlName)?.errors || {})[0]
    return errorMessages[firstErrorKey] || "Error desconocido"
  }

  for (const controlName of controls) {
    const control = formGroup.get(controlName)
    if (control?.errors) {
      return getError(controlName)
    }
  }
  return ""
}
