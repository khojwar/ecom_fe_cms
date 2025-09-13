interface IDescriptionText {
    text?: string;
}

const TextComponents = ({text}: Readonly<IDescriptionText>) => {
  return (
    <div>
        <div className="p-4 text-justify">
            <p>{text}</p>
        </div>
    </div>
  )
}

export default TextComponents