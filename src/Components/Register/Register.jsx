import React, { useState } from 'react'
import { api } from "../../helpers/api/api"
import { v4 as uuidv4 } from 'uuid';
import prefixArray from "../../assets/prefixByCountries"
import ErrorMessage from '../ErrorMessage/ErrorMessage';


const CODE_LIST = prefixArray.map((country) => { return country.code });

const PAGE_NAME = {
    phone: "phone",
    verify: "verify",
    submit: "rest-details"
};

function Register() {
    const [errorMessage, setErrorMessage] = useState({ telephone: false, prefix: false, submit: false })
    const [data, setData] = useState({})
    const [pageState, setPageState] = useState(PAGE_NAME.phone);
    const PHONE_REGEX = /^[0-9]{10}$/;

    const handleError = (field, boolean) => {
        setErrorMessage({ ...errorMessage, [field]: boolean });
    }
    const goForward = () => {
        switch (pageState) {
            case PAGE_NAME.phone:
                setPageState(PAGE_NAME.verify);
                break;
            case PAGE_NAME.verify:
                setPageState(PAGE_NAME.submit);
                break;
            case PAGE_NAME.submit:

                console.log("submit");
                break;

            default:
                break;
        }
    };


    const updateData = (field, e) => {
        handleError(field, false)
        setData({ ...data, [field]: e.target.value, })
    }
    const earaseData = (field) => {
        handleError(field, true)
        setData({ ...data, [field]: "" })
    }

    const validateInput = (e, field) => {
        switch (field) {
            case "telephone":
                if (PHONE_REGEX.test(e.target.value)) {
                    updateData(field, e)
                } else {
                    earaseData(field)
                }

                break;
            case "prefix":
                if (CODE_LIST.includes(e.target.value)) {
                    updateData(field, e)
                } else {
                    earaseData(field)
                }
                break;
            case "createCode":
                if ((Boolean(data.telephone && data.prefix))) {
                    const dataForFetch = {
                        id: uuidv4(),
                        type: "CallAgent",
                        telephone: `+${data.prefix}${data.telephone}`
                    }
                    createCodeToken(dataForFetch)

                    console.log("🚀 ~ file: Register.jsx ~ line 73 ~ validateInput ~ createCode")
                }
                break;

            default:
                break;
        }

    }

    const createCodeToken = async (data) => {
        try {

            const res = await api.regRequestCode(data)
            const requestingCode = await api.regCreateCode(res.data["@id"])
            requestingCode.status === 200 && goForward()
        } catch (e) {
            console.log("🚀 ~ file: Register.jsx ~ line 100 ~ createCodeToken ~ e", e)

        }
    }
    return (
        <div className="register-conatiner">

            {pageState === PAGE_NAME.phone &&
                <>
                    <h1>
                        verify your phone
                    </h1>
                    <div className="flex-column">
                        <input onChange={(e) => validateInput(e, "prefix")} type="text" name="phoneprefix" list="countrycode" />
                        <datalist id="countrycode">
                            <option value="">select country code</option>
                            {prefixArray.map(({ code, country }) => {
                                return <option value={code}>{`${country} ${code}`}</option>
                            })}
                        </datalist>
                        {errorMessage.prefix && <ErrorMessage text="required field, please select from the list" />}
                        <input onChange={(e) => { validateInput(e, "telephone") }} type="text" name="phone" />
                        {errorMessage.telephone && <ErrorMessage text="required field, please enter a valid phone number" />}


                        <button onClick={(e) => { validateInput(e, "createCode") }} className="submit-button">Send me a code</button>
                    </div>
                </>
            }
            {pageState === PAGE_NAME.verify &&
                <>
                    <h1>
                        verify your phone
                    </h1>
                    <div className="flex">
                        <input className="vreify verify1" type="number" />
                        <input className="vreify verify1" type="number" />
                        <input className="vreify verify1" type="number" />
                        <input className="vreify verify1" type="number" />

                        {errorMessage.prefix && <ErrorMessage text="required field, please select from the list" />}



                    </div>
                    <button onClick={(e) => { validateInput(e, "createCode") }} className="submit-button">Verify</button>
                </>
            }



        </div>
    )
}

export default Register