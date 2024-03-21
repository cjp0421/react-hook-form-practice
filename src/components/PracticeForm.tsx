import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools'; // used to visualize the form data in dev environment

type FormValues = {
    username: string
    email: string
    channel: string
}

const PracticeForm = () => {
    const form = useForm<FormValues>();
    const { register, control, handleSubmit } = form;
    // const { name, ref, onChange, onBlur } = register("username")

    const onSubmit = (data: FormValues) => {
        console.log('Form submitted.', data)
    }

    return (
        <div className="formDiv">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <label htmlFor="username">Username</label>
                {/* <input type="text" id="username" name={name} ref={ref} onChange={onChange} onBlur={onBlur} /> */}
                <input type="text" id="username" {...register("username")} />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" {...register("email")} />

                <label htmlFor="channel">Channel</label>
                <input type="text" id="channel"  {...register("channel")} />

                <button>Submit</button>
            </form>
            <DevTool control={control} description={"this ties the devtools to the form"} />
        </div>
    );
};

export default PracticeForm;
