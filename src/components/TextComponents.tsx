interface IDescriptionText {
    text: string;
    className?: string;
}

const TextToPrint = ({text}: Readonly<IDescriptionText>) => {
    return (
        <div>
            <p>{text}</p>
        </div>
    )
}

const TextComponents = ({text, className}: Readonly<IDescriptionText>) => {
  return (
    <div>
        <div className={`p-4 text-justify ${className}`}>
            <TextToPrint text={text} />
        </div>
    </div>
  )
}

export default TextComponents