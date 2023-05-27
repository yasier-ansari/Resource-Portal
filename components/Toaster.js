'use client'

// import { ToastContainer as ReactToastifyContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ToastContainer = () => {
//     const showToast = (message, type, duration, progress) => {
//         toast(message, {
//             type: type || 'default', // 'default', 'success', 'warning', 'error', or 'info'
//             autoClose: duration || 3000, // Duration in milliseconds, or set to false to keep open until manually closed
//             progress: progress || undefined, // Progress bar percentage (number from 0 to 100), or undefined to disable
//         });
//     };

//     return <ReactToastifyContainer />;
// };

// export default ToastContainer;



// version2
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Test = (message, toastType, closeDuration, progressBarHide, position, closeOnClick, theme) => {
    return toast(message, { hideProgressBar: progressBarHide | 'false', autoClose: closeDuration | '2000', type: toastType | 'success', closeOnClick: closeOnClick | 'true', position: position | 'top-center', theme: theme | 'light' })
}
