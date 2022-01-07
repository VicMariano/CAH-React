import { Button } from "./ButtonElements";
import classNames from "classnames";

export default function ButtonComponent({ buttonColor = 'white', text = '', onClick = null, disabled = false, type = 'button' }) {

    return (
        <div>
            <Button
                className={classNames(buttonColor)}
                onClick={onClick}
                type={type}
                disabled={disabled}
            >{text}</Button>
        </div>
    )
}