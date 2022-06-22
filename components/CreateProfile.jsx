import { useForm } from 'react-hook-form';

export default function CreateProfile({ onSubmit }) {
  const { register, handleSubmit } = useForm();

  return (
    <div className="w-full max-w-4xl mx-auto z-20 mt-12 px-3 md:px-1">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Create your profile
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            name="name"
            className="w-full ring-1 ring-gray-300 text-gray-900 rounded-md h-12 pl-2 mt-3"
            placeholder="Enter your name"
            {...register('name', { required: true })}
          />
          <input
            type="text"
            name="slug"
            className="w-full ring-1 ring-gray-300 text-gray-900 rounded-md h-12 pl-2 mt-3"
            placeholder="Enter your username"
            {...register('slug', { required: true })}
          />
        </div>
        <textarea
          {...register('bio', { required: true })}
          className="w-full ring-1 ring-gray-300 text-gray-900 rounded-md pl-2 mt-3"
          placeholder="A little bit about you"
          rows={4}
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            name="phone"
            className="w-full ring-1 ring-gray-300 text-gray-900 rounded-md h-12 pl-2 mt-3"
            placeholder="Enter your phone number"
            {...register('phone')}
          />
          <input
            type="text"
            name="twitter"
            className="w-full ring-1 ring-gray-300 text-gray-900 rounded-md h-12 pl-2 mt-3"
            placeholder="Enter your Twitter link"
            {...register('twitter')}
          />
          <input
            type="text"
            name="facebook"
            className="w-full ring-1 ring-gray-300 text-gray-900 rounded-md h-12 pl-2 mt-3"
            placeholder="Enter your Facebook link"
            {...register('facebook')}
          />
          <input
            type="text"
            name="instagram"
            className="w-full ring-1 ring-gray-300 text-gray-900 rounded-md h-12 pl-2 mt-3"
            placeholder="Enter your Instagram link"
            {...register('instagram')}
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-700 text-white rounded-md px-4 py-2 hover:bg-indigo-600 mt-4"
        >
          Create a Profile
        </button>
      </form>
    </div>
  );
}
