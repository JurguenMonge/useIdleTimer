import { useEffect } from "react";
import Sweet from "sweetalert2";

const useIdleTimer = (
  timeoutDuration,
  onIdle,
  titleSweetAlert,
  textSweetAlert,
  warningTime = 60000,
  sweetAlertOptions = {
    position: "center",
    icon: "info",
    confirmButtonText: "Ok",
    timer: 3000,
  }
) => {
  useEffect(() => {
    let timeoutId = null;
    let warningId = null;
    let hasWarned = false;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      clearTimeout(warningId);

      timeoutId = setTimeout(onIdle, timeoutDuration);
      warningId = setTimeout(() => {
        if (!hasWarned) {
          hasWarned = true;

          const optionsToUse = {
            ...sweetAlertOptions,
            ...(sweetAlertOptions.timer !== 0 ? { timer: sweetAlertOptions.timer } : {})
          };

          Sweet.fire({
            title: titleSweetAlert,
            text: textSweetAlert,
            position: optionsToUse.position,
            icon: optionsToUse.icon,
            showConfirmButton: true,
            confirmButtonText: optionsToUse.confirmButtonText,
            ...(optionsToUse.timer !== undefined && { timer: optionsToUse.timer }) 
          });
        }
      }, timeoutDuration - warningTime);
    };

    resetTimer();

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("touchstart", resetTimer);
    window.addEventListener("touchmove", resetTimer);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(warningId);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
      window.removeEventListener("touchmove", resetTimer);
    };
  }, [
    timeoutDuration,
    onIdle,
    titleSweetAlert,
    textSweetAlert,
    warningTime,
    sweetAlertOptions,
  ]);
};

export default useIdleTimer;
