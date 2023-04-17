
export const enum ToastStatus {
  success = 'success',
  error = 'error',
  warning = 'warning',
  info = 'info',
}


export function customToast(toast: any, title: string, description: string, status: ToastStatus) {

  return toast({
    title: title,
    description: description,
    status: status,
    isClosable: true,
  })

}


