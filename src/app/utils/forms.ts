import { FormGroup } from "@angular/forms"

export const getFormErrors = (formGroup: FormGroup): string => {
  const controls = Object.keys(formGroup.controls)
  const passwordMinLength = formGroup.get("password")?.errors?.["minlength"]?.requiredLength

  const getError = (controlName: string) => {
    const errorMessages: Record<string, string> = {
      email: "Por favor, ingrese un correo electrónico válido",
      required: "Campo requerido",
      passwordsNotMatch: "Las contraseñas no coinciden",
      invalid: "Campo inválido",
      minlength: `El campo '${controlName}' debe tener al menos ${passwordMinLength} caracteres`,
      maxlength: `El campo '${controlName}' no puede tener más de ${passwordMinLength} caracteres`,
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
