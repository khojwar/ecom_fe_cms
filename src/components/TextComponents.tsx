interface IDescriptionText {
    text: string;
    className?: string;
}

const TextComponents = ({text, className}: Readonly<IDescriptionText>) => {
  return (
    <div>
        <div className={`p-4 text-justify ${className}`}>
            <p>{text}</p>
        </div>
    </div>
  )
}

export default TextComponents