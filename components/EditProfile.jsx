import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export default function EditProfile({ profile }) {
  const { register, handleSubmit } = useForm({ defaultValues: profile });
  const router = useRouter();

  const onSubmitForm = async (values) => {
    const config = {
      url: '/api/editProfile',
      method: 'POST',
      data: values,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios(config);
    if (response.status === 200) {
      router.reload();
    }
  };
  return (
    <div className="w-full max-w-4xl mx-auto z-20">
      <h1 className="text-2xl font-semibold text-gray-900">
        Edit your profile
      </h1>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            name="name"
            className="w-full bg-gray-100 text-gray-900 rounded-md h-12 pl-2 mt-3"
            placeholder="Enter your name"
            {...register('name', { required: true })}
          />
          <input
            type="text"
            name="slug"
            className="w-full bg-gray-100 text-gray-900 rounded-md h-12 pl-2 mt-3"
            placeholder="Enter your unique profile URL"
            {...register('slug', { required: true })}
          />
        </div>
        <textarea
          {...register('bio', { required: true })}
          className="w-full bg-gray-100 text-gray-900 rounded-md pl-2 mt-3"
          placeholder="A little bit about you"
          rows={4}
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            name="phone"
            className="w-full bg-gray-100 text-gray-900 rounded-md h-12 pl-2 mt-3"
            placeholder="Enter your phone number"
            {...register('phone')}
          />
          <input
            type="text"
            name="twitter"
            className="w-full bg-gray-100 text-gray-900 rounded-md h-12 pl-2 mt-3"
            placeholder="Enter your Twitter link"
            {...register('twitter')}
          />
          <input
            type="text"
            name="facebook"
            className="w-full bg-gray-100 text-gray-900 rounded-md h-12 pl-2 mt-3"
            placeholder="Enter your Facebook link"
            {...register('facebook')}
          />
          <input
            type="text"
            name="instagram"
            className="w-full bg-gray-100 text-gray-900 rounded-md h-12 pl-2 mt-3"
            placeholder="Enter your Instagram link"
            {...register('instagram')}
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-700 text-white rounded-md px-4 py-2 hover:bg-indigo-600 mt-4"
        >
          Edit The Profile
        </button>
      </form>
    </div>
  );
}
