'use client'

export default function GlobalError({ error, reset }: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="w-full h-screen mx-auto pt-[30%] text-red-500 font-semibold">
          {error.message}
        </div>
        <button onClick={reset} className="mt-4 mx-auto bg-red-600 text-white px-4 py-2.5 rounded-md ">다시 시도</button>
      </body>
    </html>
  )
}