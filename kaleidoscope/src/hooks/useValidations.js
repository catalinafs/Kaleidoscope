// React
import { useState } from 'react';

const useValidations = ({ initForm }) => {
    const [formError, setFormError] = useState(initForm);

    const accionValidations = (form, regex) => {
        const keys = Object.keys(form);

        for (let key of keys) {
            if (key === 'source' || key === 'visitorParkingAvailable') {
                setFormError((props) => ({
                    ...props,
                    [key]: ''
                }));
            } else {
                if (!form[key]) {
                    setFormError((props) => ({
                        ...props,
                        [key]: `El campo es requerido`
                    }));
                    return true;
                } else {
                    setFormError((props) => ({
                        ...props,
                        [key]: ''
                    }));
                }
            }

            if (!regex[key].test(form[key])) {
                setFormError((props) => ({
                    ...props,
                    [key]: 'El campo contiene caracteres invalidos o faltantes'
                }));
                return true;
            } else {
                setFormError((props) => ({
                    ...props,
                    [key]: ''
                }));
            }
        }
    }

    return { formError, accionValidations, setFormError };
}

export default useValidations;