import BoxedText from "./boxed-text"

const MainHeader = () => {
  return (
    <section>
      <div className="flex flex-col gap-figma-inside-gap"> 
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-figma-inside-gap">
            <h1 className="font-semibold italic">
              sagar tamang ~ <span className="text-xs inline-flex align-bottom leading-4">सागर तामाङ</span>
            </h1>
            <div className="font-semibold italic text-sm">
              <BoxedText text={"product,ai,research,web,design,elt"} />
            </div>
            <p className="italic">
              i <span className="not-italic font-medium">build</span> <span className="underline">fast</span>
            </p>
            <p className="sr-only">
              @sagar_builds
            </p>
          </div>
          <div className="text-right">
            <p className="font-normal italic">
              ಬೆಂಗಳೂರು
            </p>
            <p className="font-normal italic">
              Bangalore, India
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainHeader