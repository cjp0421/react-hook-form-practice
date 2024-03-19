import React from 'react';
import { useForm } from 'react-hook-form';

const PracticeForm = () => {
    const form = useForm();
    const { register } = form;
    const { name, ref, onChange, onBlur } = register("username")

    return (
        <div className="formDiv">
            <form>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />

                <label htmlFor="channel">Channel</label>
                <input type="text" id="channel" name="channel" />

                <button>Submit</button>
            </form>
        </div>
    );
};

export default PracticeForm;
