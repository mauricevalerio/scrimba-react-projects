export default function HomeDefaultTemplateContainer(props) {
    return (
        <>
            <h2 className="text-xl uppercase font-bold py-2">{props.title}</h2>
            <div className="flex gap-4 items-center overflow-x-auto py-4">
                {props.children}
            </div>
        </>
    )
}