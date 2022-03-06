import Background from '@/components/layouts/Background'

export default function Page_500() {
  return (
    <div className="h-full home relative">
      <Background />
      <div className="h-full flex items-center justify-center">
        <h2 className="text-2xl font-semibold text-secondary">
          Sorry... Something wrong. Please try again.
        </h2>
      </div>
    </div>
  )
}