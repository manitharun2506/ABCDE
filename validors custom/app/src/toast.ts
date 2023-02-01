import * as Toaast from 'toastify-js';

const toast = (message: string, isError: boolean) => {
  Toaast({
    text: message,
    duration: 2000,
    close: true,
    gravity: 'top', // `top` or `bottom`
    position: 'right', // `left`, `center` or `right`

    style: {
      background: isError
        ? 'linear-gradient(to right,#00A693, #00A693, #00A693)'
        : 'linear-gradient(to right,#DD0004, #FF0000, #DD0004)',
    },
  }).showToast();
};
export default toast;
