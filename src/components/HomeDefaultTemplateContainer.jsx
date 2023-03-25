export default function HomeDefaultTemplateContainer(props) {
    return (
        <>
            <h2 className={`text-xl font-bold py-2`}>{props.title}</h2>
            <div className={`flex gap-4 overflow-x-auto px-0 py-4`}>
                {props.children}
            </div>
        </>
    )
}