type TitleProps = {
  title: string
  subtitle: string
}

export default function Title({ title, subtitle }: TitleProps) {
  return (
    <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
      <div className="sm:align-center sm:flex sm:flex-col">
        <h1 className="text-2xl font-extrabold text-primary sm:text-center sm:text-5xl">
          {title}
        </h1>
        <p className="max-w-2xl m-auto mt-5 text-lg text-black sm:text-center sm:text-xl">
          {subtitle}
        </p>
      </div>
    </div>
  )
}
