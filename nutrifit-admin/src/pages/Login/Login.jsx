import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import Icon from '../../assets/images/Icon.png'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simulate login logic here (you can add validation or API call)
    // If successful:
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm space-y-8 bg-white p-8 rounded-lg shadow-xl">
        <div>
          <img
            className="mx-auto h-20 w-auto"
            src={Icon}
            alt="Nutrifit"
          />
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
            Nutrifit Admin
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="mt-1 w-full border-b border-gray-300 bg-transparent px-1 py-2 placeholder-gray-400 text-sm focus:outline-none focus:border-indigo-500 focus:ring-0 transition duration-300 ease-in-out"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className="mt-1 w-full border-b border-gray-300 bg-transparent px-1 py-2 pr-10 placeholder-gray-400 text-sm focus:outline-none focus:border-indigo-500 focus:ring-0 transition duration-300 ease-in-out"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 hover:text-indigo-600"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 transition duration-200" />
                ) : (
                  <EyeIcon className="h-5 w-5 transition duration-200" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
              Forgot password?
            </a>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
