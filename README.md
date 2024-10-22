# useIdleTimer

A React hook to handle user inactivity and display a warning before logging out.

## Installation

You can install `use-idle-timer` using npm:

```
    npm install use-idle-timer
```

Or using yarn

```
    yarn add use-idle-timer
```

## Usage

```javascript
import React from "react";
import { useNavigate } from "react-router-dom";

//Hook
import useIdleTimer from "use-idle-timer";

export default function Layout() {
  const navigate = useNavigate();

  const handleIdle = () => {
    console.log("Session expired");
    sessionStorage.clear();
    navigate("/");
  };

  /*If you want to use the hook with the default sweetalert 
    ( sweetAlertOptions = {
        position: "center",
        icon: "info",
        confirmButtonText: "Ok",
        timer: 3000,
    })
  */
  useIdleTimer(
    80000, // Duration(ms) before user is considered inactive
    handleIdle, // Function called when the user is inactive
    "Inactive Session", // Title of the SweetAlert
    "Your session will expire in 60 seconds if you do not interact with the system.", // Message of the SweetAlert
    60000 // Time to show the warning before the session expires (ms)
  );

  // Another way to use the hook by customizing the sweetalert
  useIdleTimer(
    60000,
    handleIdle,
    "Inactive Session",
    "Your session will expire in 60 seconds if you do not interact with the system..",
    30000,
    //Config of sweetalert
    {
      position: "center",
      icon: "info",
      confirmButtonText: "Aceptar",
      timer: 20000, // If you set the timer to 0 then the sweetalert will not have a timer
    }
  );

  return (
    <div>
      {/* Content of your component */}
      <h1>Welcome to the Layout</h1>
    </div>
  );
}
```

## Props

```
useIdleTimer(timeoutDuration, onIdle, titleSweetAlert, textSweetAlert, warningTime, sweetAlertOptions)
```

- timeoutDuration (number): Duration in milliseconds before the user is considered inactive.
- onIdle (function): The function that is called when the user is inactive.
- titleSweetAlert (string): The title of the SweetAlert shown when the user is inactive.
- textSweetAlert (string): The message of the SweetAlert displayed.
- warningTime (number): Duration in milliseconds before the warning is shown.
- sweetAlertOptions (object): Additional options to customize the SweetAlert (optional).

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Author

[Jurguen Monge](https://github.com/JurguenMonge)

## Acknowledgments

- React - The JavaScript library used.
- SweetAlert2 - For displaying elegant alerts.
