export function hasError(form: any, name: string, error: string, submitted: boolean): boolean {
  const control = form.get(name);
  if (error) {
    return control.hasError(error) && (control.touched || submitted);
  } else {
    return control.errors && (control.touched || submitted);
  }
}

