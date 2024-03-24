import { useForm, useFieldArray } from 'react-hook-form';
import { DevTool } from '@hookform/devtools'; // used to visualize the form data in dev environment

type FormValues = {
    username: string
    email: string
    channel: string
    social: {
        twatter: string,
        facebag: string
    }
    phoneNumbers: string[]
    extraPhNumbers: {
        number: string
    }[]
    age: number
    dob: Date
}

const PracticeForm = () => {
    const form = useForm<FormValues>({
        //The commented code shows how to fetch and load saved data as default values
        // defaultValues: async () => {
        //     const response = await fetch(
        //         "https://jsonplaceholder.typicode.com/users/1"
        //     );
        //     const data = await response.json();
        //     return {
        //         username: data.username,
        //         email: data.email,
        //         channel: "yoyoyouser"
        //     }
        // }
        defaultValues: {
            username: "DandySandy",
            email: "dandySandy@notyomamasemail.not",
            channel: "yoyoyousername",
            social: {
                twatter: "",
                facebag: "",
            },
            phoneNumbers: ["", ""],
            extraPhNumbers: [{ number: "" }],
            age: 0,
            dob: new Date()
        }
    });
    // const { name, ref, onChange, onBlur } = register("username")
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;

    const { fields, append, remove } = useFieldArray({
        name: 'extraPhNumbers',
        control
    })


    const onSubmit = (data: FormValues) => {
        console.log('Form submitted.', data)
    }

    return (
        <div className="formDiv">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className='form-control'>
                    <label htmlFor="username">Username</label>
                    {/* <input type="text" id="username" name={name} ref={ref} onChange={onChange} onBlur={onBlur} /> */}
                    <input type="text" id="username" {...register("username", {
                        required: {
                            value: true,
                            message: "Username is required"
                        }
                    })} />
                    <p className="error">{errors.username?.message}</p>
                </div>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" {...register("email", {
                        required: {
                            value: true,
                            message: "Email is required"
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9.!#$&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: "Invalid email format",
                        },
                        validate: {
                            notAdmin: (fieldValue) => {
                                return (
                                    fieldValue !== "admin@example.com" || "Enter a different email address"
                                );
                            },
                            notBlackListed: (fieldValue) => {
                                return !fieldValue.endsWith("baddomain.com") || "This domain is not supported"
                            }
                        }
                    })} />
                    <p className="error">{errors.email?.message}</p>
                </div>
                <div className='form-control'>
                    <label htmlFor="channel">Channel</label>
                    <input type="text" id="channel"  {...register("channel", {
                        required: {
                            value: true,
                            message: "Channel is required",
                        }
                    })} />
                    <p className="error">{errors.channel?.message}</p>
                </div>
                <div className='form-control'>
                    <label htmlFor="twatter">Twatter Handle</label>
                    <input type="text" id="twatter"  {...register("social.twatter", {
                        required: {
                            value: true,
                            message: "Twatter Handle is required...for some reason",
                        }
                    })} />
                    <p className="error">{errors.social?.twatter?.message}</p>
                </div>
                <div className='form-control'>
                    <label htmlFor="facebag">Facebag Profile</label>
                    <input type="text" id="facebag"  {...register("social.facebag", {
                        required: {
                            value: true,
                            message: "Facebag is required...for some reason",
                        }
                    })} />
                    <p className="error">{errors.social?.facebag?.message}</p>
                </div>
                <div className='form-control'>
                    <label htmlFor="primary-phone">Primary Phone Number</label>
                    <input type="text" id="primary-phone"  {...register("phoneNumbers.0", {
                        required: {
                            value: true,
                            message: "Primary phone number is required",
                        }
                    })} />
                    <p className="error">{errors.phoneNumbers ? errors?.phoneNumbers[0]?.message : null}</p>
                </div>
                <div className='form-control'>
                    <label htmlFor="secondary-phone">Secondary Phone Number</label>
                    <input type="text" id="secondary-phone"  {...register("phoneNumbers.1")} />
                </div>

                <div className='form-control'>
                    <label htmlFor="age">Age</label>
                    <input type="number" id="age"  {...register("age", {
                        valueAsNumber: true,
                        required: {
                            value: true,
                            message: "Age is required",
                        }
                    })} />
                    <p className="error">{errors.age?.message}</p>
                </div>

                <div className='form-control'>
                    <label htmlFor="dob">Date of Birth</label>
                    <input type="date" id="dob"  {...register("dob", {
                        valueAsDate: true,
                        required: {
                            value: true,
                            message: "Date of birth is required",
                        }
                    })} />
                    <p className="error">{errors.dob?.message}</p>
                </div>

                <div>
                    <label>List of Extra Numbers</label>
                    <div>
                        {fields.map((field, index) => {
                            return (
                                <div className="form-control" key={field.id}>
                                    <input
                                        type="text"
                                        {...register(`extraPhNumbers.${index}.number` as const)}
                                    />
                                    {
                                        index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}>
                                                Remove Number
                                            </button>
                                        )
                                    }
                                </div>
                            );
                        })}
                        <button
                            type="button"
                            onClick={() => append({ number: "" })}>
                            Add Extra Number
                        </button>
                    </div>
                </div>

                <button>Submit</button>

            </form>
            <DevTool control={control} />
        </div>
    );
};

export default PracticeForm;
