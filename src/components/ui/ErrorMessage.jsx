export default function ErrorMessage({ message }) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <p className="text-red-400 font-medium">Something went wrong</p>
        <p className="text-gray-500 text-sm mt-1">{message}</p>
      </div>
    </div>
  )
}